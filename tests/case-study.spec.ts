import { test, expect } from '@playwright/test';
import rawData from '../src/data/portfolio.json' with { type: 'json' };
import type { Portfolio } from '../src/lib/validate-content';

const data = rawData as Portfolio;

const base = (process.env.BASE_PATH || '/Portfolio').replace(/\/$/, '');

const sections = [
  ['overview', 'Overview'],
  ['problem', 'Problem'],
  ['technologies', 'Technologies'],
  ['implementation', 'Implementation'],
  ['demonstration', 'Demonstration'],
  ['results', 'Results'],
  ['challenges', 'Challenges and improvements'],
  ['source-code', 'Source code'],
] as const;

test('case studies show their evidence, limitations, disclosures and available links', async ({ page }) => {
  for (const project of data.projects) {
    await page.goto(`${base}/projects/${project.slug}/`);
    for (const [, name] of sections) {
      await expect(page.getByRole('heading', { level: 2, name, exact: true })).toBeVisible();
    }
    await expect(page.locator('#overview')).toContainText(project.caseStudy.overview);
    await expect(page.locator('#demonstration')).toContainText(project.caseStudy.demonstration.description);
    if (project.dataKind === 'synthetic') await expect(page.getByRole('complementary', { name: 'Data disclosure' })).toContainText(/generated|synthetic/i);
    const source = page.locator('.case-links a').filter({ hasText: /Source code/i });
    if (project.links.github) {
      await expect(source.first()).toHaveAttribute('href', project.links.github);
      await expect(page.locator(`#source-code a[href="${project.links.github}"]`)).toBeVisible();
    }
    else await expect(source).toHaveCount(0);
    const demo = page.getByRole('link', { name: 'Live demo', exact: false });
    if (project.links.demo) await expect(demo.first()).toHaveAttribute('href', project.links.demo);
    else await expect(demo).toHaveCount(0);
    if (!project.links.github) {
      await expect(page.locator('#source-code')).toContainText(/unavailable|not.*available|not.*published|not.*provided|no.*repository/i);
    }
    // Missing resources must never become empty or placeholder links.
    await expect(page.locator('a:not([href]), a[href=""], a[href="#"]')).toHaveCount(0);
  }
});

test('to-do demonstration links to the real project screenshot', async ({ page }) => {
  await page.goto(`${base}/projects/todo-list/`);
  const image = page.locator(`img[src="${base}/images/todo-list.png"]`);
  await expect(image).toHaveCount(1);
  await expect(image).toBeVisible();
  await expect(image).toHaveAttribute('alt', /\S/);
  await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).complete && (element as HTMLImageElement).naturalWidth > 0)).toBe(true);
  await page.locator('#demonstration a[href="#project-preview"]').click();
  await expect(image).toBeInViewport();
});

test('CSV evidence presents reproducible sample calculations and their source excerpt', async ({ page }) => {
  await page.goto(`${base}/projects/csv-business-report/`);
  await expect(page.getByText('In progress', { exact: true }).first()).toBeVisible();
  const output = page.locator('#demonstration pre');
  await expect(output).toContainText('Total revenue: $4,005.00');
  await expect(output).toContainText('Total units sold: 24');
  await expect(output).toContainText('Duplicate rows removed: 0');
  const project = data.projects.find(project => project.slug === 'csv-business-report')!;
  expect(project.caseStudy.codeExample).not.toBeNull();
  await expect(page.locator('#implementation pre')).toHaveText(project.caseStudy.codeExample!.content);
  await expect(page.locator('#implementation')).toContainText(project.caseStudy.codeExample!.caption);
  await expect(page.locator('#demonstration')).toContainText(project.caseStudy.demonstration.output!.caption);
  await expect(page.locator('#results')).toContainText(/generated|synthetic/i);
  await expect(page.locator('#results')).toContainText(/(?:not|no).*(?:business (?:impact|outcomes|results)|real.company|real.business)/i);
});

test('unfinished music project states the lost evidence without showing a substitute chart', async ({ page }) => {
  await page.goto(`${base}/projects/music-listening-dashboard/`);
  await expect(page.getByText('Unfinished', { exact: true }).first()).toBeVisible();
  await expect(page.locator('main')).toContainText(/original.*(?:code|source).*lost|(?:code|source).*lost/i);
  await expect(page.locator('#demonstration')).toContainText(/unavailable|not.*available|no.*demonstration|no.*working/i);
  await expect(page.locator('svg[role="img"], .chart-figure, #demonstration img')).toHaveCount(0);
  await expect(page.locator('.case-links a, #source-code a')).toHaveCount(0);
});

test('chart marks, table values, units and source agree without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const project of data.projects) {
    if (project.charts.length === 0) continue;
    await page.goto(`http://127.0.0.1:4321${base}/projects/${project.slug}/`);
    for (const chart of project.charts) {
      const figure = page.locator('figure').filter({ has: page.getByRole('heading', { name: chart.title, exact: true }) });
      await expect(figure.getByRole('img')).toBeVisible();
      await expect(figure).toContainText(chart.source);
      await expect(figure).toContainText(chart.unit);
      if (chart.illustrative) await expect(figure).toContainText('Illustrative synthetic example');
      await figure.getByText('View chart data', { exact: true }).click();
      const rows = figure.locator('tbody tr');
      await expect(rows).toHaveCount(chart.series.length);
      const marks = figure.locator('svg [data-value]');
      await expect(marks).toHaveCount(chart.series.length);
      for (const [index, point] of chart.series.entries()) {
        await expect(rows.nth(index).getByRole('rowheader')).toHaveText(point.label);
        await expect(marks.nth(index)).toHaveAttribute('data-label', point.label);
        await expect(marks.nth(index)).toHaveAttribute('data-value', String(point.value));
        const cell = rows.nth(index).getByRole('cell');
        await expect(cell).toHaveAttribute('data-value', String(point.value));
        expect(Number(await cell.textContent())).toBe(point.value);
      }
      if (chart.type === 'bar') {
        const heights = await marks.evaluateAll(elements => elements.map(element => element.getBoundingClientRect().height));
        const maximumHeight = Math.max(...heights);
        const maximumValue = Math.max(...chart.series.map(point => point.value));
        if (maximumValue > 0) {
          expect(maximumHeight).toBeGreaterThan(0);
          for (const [index, point] of chart.series.entries()) {
            if (point.value > 0) expect(heights[index]).toBeGreaterThan(0);
            expect(heights[index] / maximumHeight).toBeCloseTo(point.value / maximumValue, 4);
          }
        }
      }
    }
  }
  await context.close();
});

test('case-study navigation follows real section, next-project and home targets', async ({ page }) => {
  for (const [index, project] of data.projects.entries()) {
    await page.goto(`${base}/projects/${project.slug}/`);
    const contents = page.getByRole('navigation', { name: 'On this page' });
    for (const [id] of sections) {
      const link = contents.locator(`a[href="#${id}"]`);
      await link.click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(page.locator(`section#${id} > h2`)).toBeInViewport();
    }

    const next = data.projects[(index + 1) % data.projects.length];
    if (next.slug !== project.slug) {
      await page.getByRole('navigation', { name: 'Next project' }).getByRole('link').click();
      await expect(page).toHaveURL(new RegExp(`${base}/projects/${next.slug}/$`));
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(next.title);
    }
    await page.getByRole('link', { name: 'All projects', exact: false }).click();
    await expect(page).toHaveURL(new RegExp(`${base}/#projects$`));
    await expect(page.locator('#projects')).toBeInViewport();
  }
});

test('detail pages fit narrow phones', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  for (const project of data.projects) {
    await page.goto(`${base}/projects/${project.slug}/`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)).toBe(false);
  }
});
