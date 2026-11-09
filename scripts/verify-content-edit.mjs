// Build an isolated copy so the actual portfolio content is never overwritten.
import assert from 'node:assert/strict';
import { cp, mkdtemp, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const temporary = await mkdtemp(join(tmpdir(), 'portfolio-content-check-'));
const astro = JSON.parse(await readFile(join(root, 'node_modules/astro/package.json'), 'utf8'));
const cli = join(root, 'node_modules/astro', astro.bin.astro);
const dataFile = join(temporary, 'src/data/portfolio.json');
try {
  for (const entry of ['src', 'public', 'astro.config.mjs', 'tsconfig.json', 'package.json'])
    await cp(join(root, entry), join(temporary, entry), { recursive: true });
  await symlink(join(root, 'node_modules'), join(temporary, 'node_modules'), 'dir');
  const content = JSON.parse(await readFile(dataFile, 'utf8'));
  const sample = structuredClone(content.projects[0]);
  sample.slug = 'temporary-content-check';
  sample.title = 'Temporary content check';
  sample.charts = [];
  content.projects.push(sample);
  await writeFile(dataFile, JSON.stringify(content));
  let build = spawnSync(process.execPath, [cli, 'build', '--ignore-lock'], {
    cwd: temporary, env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' }, encoding: 'utf8',
  });
  assert.equal(build.status, 0, `Fourth-record build failed:\n${build.stdout}\n${build.stderr}`);
  assert((await readFile(join(temporary, 'dist/index.html'), 'utf8')).includes(sample.title), 'Fourth entry missing from home.');
  assert((await readFile(join(temporary, `dist/projects/${sample.slug}/index.html`), 'utf8')).includes(sample.title), 'Fourth page missing.');
  console.log('A fourth record generated both a home entry and a detail page from the data file alone.');

  // Exercise the actual build gate, not just a unit call to the validator.
  sample.slug = content.projects[0].slug;
  await writeFile(dataFile, JSON.stringify(content));
  build = spawnSync(process.execPath, [cli, 'build', '--ignore-lock'], {
    cwd: temporary, env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' }, encoding: 'utf8',
  });
  assert.notEqual(build.status, 0, 'Duplicate slugs should fail the build.');
  assert.match(build.stdout + build.stderr, /duplicate value/i);
  console.log('A duplicate slug stops the build with a content error. Original content remains unchanged.');
} finally {
  await rm(temporary, { recursive: true, force: true });
}
