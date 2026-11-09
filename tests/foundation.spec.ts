import { test, expect } from '@playwright/test';
import data from '../src/data/portfolio.json' with { type: 'json' };

const base = (process.env.BASE_PATH || '/Portfolio').replace(/\/$/, '');
const site = process.env.SITE_URL || 'https://mtomachi.github.io';

test('home and every case study are available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    const home = await page.goto(`http://127.0.0.1:4321${base}/`);
    expect(home?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/David\s*Maxwell/);
    const sections = ['.hero', '#projects', '#skills', '#about', '#contact'];
    for (const selector of sections) await expect(page.locator(selector)).toBeVisible();
    const order = await page.evaluate(selectors => {
      const elements = selectors.map(selector => document.querySelector(selector)!);
      return elements.slice(1).every((element, index) =>
        Boolean(elements[index].compareDocumentPosition(element) & Node.DOCUMENT_POSITION_FOLLOWING));
    }, sections);
    expect(order).toBe(true);

    for (const group of data.skills) {
      await expect(page.locator('#skills')).toContainText(group.category);
      for (const skill of group.items) {
        await expect(page.locator('#skills')).toContainText(skill.name);
        await expect(page.locator('#skills')).toContainText(skill.description);
        for (const slug of skill.projectSlugs) {
          await expect(page.locator(`#skills a[href="${base}/projects/${slug}/"]`).first()).toBeVisible();
        }
      }
    }

    for (const project of data.projects) {
      const response = await page.goto(`http://127.0.0.1:4321${base}/projects/${project.slug}/`);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole('heading', { level: 1, name: project.title })).toBeVisible();
      if (project.dataKind === 'synthetic') await expect(page.getByText('Synthetic data', { exact: true }).first()).toBeVisible();
      if (project.status === 'in-progress') await expect(page.getByText('In progress', { exact: true }).first()).toBeVisible();
      if (project.status === 'unfinished') await expect(page.getByText('Unfinished', { exact: true }).first()).toBeVisible();
    }
  } finally {
    await context.close();
  }
});

test('canonical metadata and generated assets respect the GitHub Pages base path', async ({ page }) => {
  for (const path of ['/', ...data.projects.map(project => `/projects/${project.slug}/`)]) {
    await page.goto(`${base}${path}`);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new URL(`${base}${path}`, site).href);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S/);
    await expect(page).toHaveTitle(/David Maxwell/);
    const assets = await page.locator('link[rel="stylesheet"][href], link[rel="icon"][href], script[src]').evaluateAll(elements =>
      elements.map(element => element.getAttribute('href') || element.getAttribute('src')!));
    expect(assets.length).toBeGreaterThan(1);
    for (const asset of new Set(assets)) {
      const url = new URL(asset, page.url());
      expect(url.origin).toBe(new URL(page.url()).origin);
      expect(url.pathname.startsWith(`${base}/`)).toBe(true);
      const response = await page.request.get(url.href);
      expect(response.status(), url.pathname).toBe(200);
      const contentType = response.headers()['content-type'];
      if (url.pathname.endsWith('.css')) expect(contentType).toContain('text/css');
      if (url.pathname.endsWith('.js')) expect(contentType).toMatch(/javascript/);
      if (url.pathname.endsWith('.svg')) expect(contentType).toContain('image/svg+xml');
    }
  }
});
