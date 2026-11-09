import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { portfolio } from '../src/lib/validate-content.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'dist');
const baseInput = process.env.BASE_PATH || '/Portfolio';
assert(baseInput.startsWith('/') && !/[?#\\]/.test(baseInput), 'BASE_PATH must be a URL path.');
const base = `${baseInput.replace(/\/+$/, '')}/`;
const origin = new URL(process.env.SITE_URL || 'https://mtomachi.github.io').origin;

async function filesAt(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(entry => entry.isDirectory()
    ? filesAt(join(directory, entry.name)) : [join(directory, entry.name)]));
  return nested.flat();
}

const files = await filesAt(output);
const htmlFiles = files.filter(file => file.endsWith('.html'));
const documents = new Map(await Promise.all(htmlFiles.map(async file => [file, await readFile(file, 'utf8')])));
for (const file of ['index.html', '404.html', ...portfolio.projects.map(project => `projects/${project.slug}/index.html`)])
  assert(documents.has(join(output, file)), `Missing generated page: ${file}`);

let references = 0;
for (const [file, html] of documents) {
  const route = relative(output, file).split(sep).join('/').replace(/index\.html$/, '');
  const pageUrl = new URL(`${base}${route}`, origin);
  for (const match of html.matchAll(/\b(?:href|src)=(?:"([^"]*)"|'([^']*)')/g)) {
    const attribute = (match[1] ?? match[2]).replaceAll('&amp;', '&');
    assert(attribute && attribute !== '#', `Empty destination in ${relative(output, file)}`);
    const url = new URL(attribute, pageUrl);
    if (url.protocol === 'mailto:') continue;
    assert(['https:', 'http:'].includes(url.protocol), `Unexpected URL scheme in ${attribute}`);
    if (url.origin !== origin) continue;
    assert(url.pathname.startsWith(base), `Destination escapes base ${base}: ${attribute}`);
    const local = decodeURIComponent(url.pathname.slice(base.length));
    let target = resolve(output, local);
    assert(target === output || target.startsWith(output + sep), `Destination escapes dist: ${attribute}`);
    const info = await stat(target).catch(() => null);
    assert(info, `Missing local destination ${attribute} in ${relative(output, file)}`);
    if (info.isDirectory()) target = join(target, 'index.html');
    assert((await stat(target)).isFile(), `Destination is not a file: ${attribute}`);
    if (url.hash && documents.has(target)) {
      const id = decodeURIComponent(url.hash.slice(1));
      const ids = new Set([...documents.get(target).matchAll(/\bid="([^"]+)"/g)].map(item => item[1]));
      assert(ids.has(id), `Missing anchor ${attribute} in ${relative(output, file)}`);
    }
    references++;
  }
}

const pending = [];
if (portfolio.profile.nameIsPlaceholder) pending.push('confirmed public name');
if (!portfolio.contact.email) pending.push('contact email');
for (const project of portfolio.projects)
  if (project.contentDraft) pending.push(`reviewed case study: ${project.title}`);
const bytes = (await Promise.all(files.map(async file => (await stat(file)).size))).reduce((sum, size) => sum + size, 0);
console.log(`Validated ${htmlFiles.length} static pages and ${references} local links/assets at ${base}.`);
console.log(`Static output: ${files.length} files, ${(bytes / 1024).toFixed(1)} KiB before compression.`);
console.log(pending.length ? `Content status: DRAFT. Pending: ${pending.join('; ')}.` : 'Content status: ready for final review.');
if (!portfolio.contact.resume) console.log('Résumé not supplied; its link is correctly omitted. This does not block the revised MVP.');
console.log('Local verification only. Deployment requires a separate release approval.');
if (process.argv.includes('--require-ready'))
  assert(!pending.length, 'Content is still a draft; use the pending list above before declaring version 1 complete.');
