import { test, expect } from '@playwright/test';
import data from '../src/data/portfolio.json' with { type: 'json' };

const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');

for (const width of [1440, 768, 390, 320]) {
  test(`project reel fits ${width}px and keeps direct project links`, async ({ page }) => {
    await page.setViewportSize({ width, height: 850 });
    await page.goto(`${base}/`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    expect(overflow).toBe(false);
    for (const project of data.projects) {
      const row = page.locator(`article#${project.slug}`);
      await expect(row).toBeVisible();
      await expect(row.getByRole('link', { name: /View project/i })).toHaveAttribute('href', `${base}/projects/${project.slug}/`);
      if (project.dataKind === 'synthetic') await expect(row.getByText('Synthetic data', { exact: true }).first()).toBeVisible();
      if (project.status === 'in-progress') await expect(row.getByText('In progress', { exact: true }).first()).toBeVisible();
    }
  });
}

test('keyboard can skip navigation and open a project', async ({ page }) => {
  await page.goto(`${base}/`);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  // Reach a real case-study link using only native keyboard traversal.
  for (let step = 0; step < 30; step++) {
    await page.keyboard.press('Tab');
    const destination = await page.evaluate(() => document.activeElement?.getAttribute('href'));
    if (destination === `${base}/projects/${data.projects[0].slug}/`) {
      await page.keyboard.press('Enter');
      await expect(page.getByRole('heading', { level: 1, name: data.projects[0].title })).toBeVisible();
      return;
    }
  }
  throw new Error('No project link was reachable with the keyboard.');
});

test('short viewport and enlarged text retain normal document scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 640, height: 360 });
  await page.goto(`${base}/`);
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)).toBe(false);
  await page.getByRole('link', { name: 'About', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'About me', exact: true })).toBeInViewport();
});
