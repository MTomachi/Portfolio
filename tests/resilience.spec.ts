import { test, expect } from '@playwright/test';
import data from '../src/data/portfolio.json' with { type: 'json' };

const base = (process.env.BASE_PATH || '/Portfolio').replace(/\/$/, '');

test('home and all case studies have no browser errors or missing local resources', async ({ page }) => {
  const errors: string[] = [];
  const missing: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => {
    if (response.url().startsWith('http://127.0.0.1:4321') && response.status() >= 400)
      missing.push(`${response.status()} ${response.url()}`);
  });
  for (const path of ['/', ...data.projects.map(project => `/projects/${project.slug}/`)]) {
    await page.goto(`${base}${path}`);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-preferences]')).toBeVisible();
  }
  expect(errors).toEqual([]);
  expect(missing).toEqual([]);
});

test('blocked screenshots leave the case study readable and keyboard navigation intact', async ({ page }) => {
  await page.route('**/images/*.png', route => route.abort());
  await page.goto(`${base}/projects/todo-list/`);
  const screenshot = page.locator('#project-preview img');
  await expect(screenshot).toHaveAttribute('alt', /To-do List Application/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('To-do List Application');
  await expect(page.locator('#results')).toContainText('source');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await page.getByRole('link', { name: 'All projects', exact: false }).click();
  await expect(page).toHaveURL(new RegExp(`${base}/#projects$`));
});

test('the generated error page has usable navigation and is excluded from indexing', async ({ page }) => {
  await page.goto(`${base}/404.html`);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('A small detour.');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await page.getByRole('link', { name: /Back to projects/ }).click();
  await expect(page.locator('#projects')).toBeInViewport();
});

test('dark case studies retain readable layouts with enlarged text and no missing résumé links', async ({ page }) => {
  await page.setViewportSize({ width: 640, height: 360 });
  for (const project of data.projects) {
    await page.goto(`${base}/projects/${project.slug}/`);
    await page.getByRole('combobox', { name: 'Theme', exact: true }).selectOption('dark');
    await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)).toBe(false);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    if (!data.contact.resume)
      await expect(page.getByRole('link', { name: /résumé|resume/i })).toHaveCount(0);
  }
});
