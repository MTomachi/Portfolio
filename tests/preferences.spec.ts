import { test, expect } from '@playwright/test';
import data from '../src/data/portfolio.json' with { type: 'json' };

const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');
const storageKey = 'portfolio-preferences-v1';

test('native keyboard controls show focus and change both preferences', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference', colorScheme: 'light' });
  await page.goto(`${base}/`);
  const theme = page.getByRole('combobox', { name: 'Theme', exact: true });
  await expect(theme).toBeVisible();
  // Start at the document and reach preferences by normal Tab order.
  for (let step = 0; step < 20; step++) {
    await page.keyboard.press('Tab');
    if (await theme.evaluate(element => element === document.activeElement)) break;
  }
  await expect(theme).toBeFocused();
  const focusVisible = await theme.evaluate(element => {
    const style = getComputedStyle(element);
    return element.matches(':focus-visible') && style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0;
  });
  expect(focusVisible).toBe(true);
  await page.keyboard.press('End');
  await expect(theme).toHaveValue('dark');
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark');
  await page.keyboard.press('Tab');
  const motion = page.getByRole('checkbox', { name: 'Less motion', exact: true });
  await expect(motion).toBeFocused();
  await page.keyboard.press('Space');
  await expect(motion).toBeChecked();
  await expect(page.locator('.hero-main')).toHaveCSS('animation-name', 'none');
});

test('visible primary, muted and accent text meet normal-text contrast in both themes', async ({ page }) => {
  await page.goto(`${base}/`);
  for (const theme of ['light', 'dark']) {
    await page.getByRole('combobox', { name: 'Theme', exact: true }).selectOption(theme);
    for (const selector of ['.brand', '.hero-description', '.brand > span']) {
      await expect(page.locator(selector)).toBeVisible();
      const ratio = await page.locator(selector).evaluate(element => {
        const luminance = (color: string) => {
          const rgb = color.match(/^rgb\(([\d.]+),\s*([\d.]+),\s*([\d.]+)\)$/);
          if (!rgb) throw new Error(`Expected opaque computed RGB, got ${color}`);
          const linear = [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])].map(value => {
            const channel = value / 255;
            return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
          });
          return linear[0]! * 0.2126 + linear[1]! * 0.7152 + linear[2]! * 0.0722;
        };
        const foreground = luminance(getComputedStyle(element).color);
        const background = luminance(getComputedStyle(document.body).backgroundColor);
        return (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05);
      });
      expect(ratio, `${theme} ${selector} contrast`).toBeGreaterThanOrEqual(4.5);
    }
  }
});

test('theme selection persists through a case study and reload, then returns to the system', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'no-preference' });
  await page.goto(`${base}/`);
  const theme = page.getByRole('combobox', { name: 'Theme', exact: true });
  await expect(page.locator('[data-preferences]')).toBeVisible();
  await expect(theme).toHaveValue('system');
  await expect(page.locator('html')).not.toHaveAttribute('data-theme');

  await theme.selectOption('dark');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark');
  await page.locator(`#${data.projects[0].slug}`).getByRole('link', { name: /View project/i }).click();
  await expect(page.getByRole('heading', { level: 1, name: data.projects[0].title })).toBeVisible();
  await expect(theme).toHaveValue('dark');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(theme).toHaveValue('dark');

  await theme.selectOption('light');
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'light');
  await theme.selectOption('system');
  await expect(page.locator('html')).not.toHaveAttribute('data-theme');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark');
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'light');
});

test('Less motion persists and removes the decorative opening animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto(`${base}/`);
  const motion = page.getByRole('checkbox', { name: 'Less motion', exact: true });
  await expect(motion).not.toBeChecked();
  await expect(motion).toBeEnabled();
  await expect(page.locator('.hero-main')).not.toHaveCSS('animation-name', 'none');
  await motion.check();
  await expect(page.locator('html')).toHaveAttribute('data-less-motion', 'true');
  await expect(page.locator('.hero-main')).toHaveCSS('animation-name', 'none');
  await page.reload();
  await expect(motion).toBeChecked();
  await expect(page.locator('.hero-main')).toHaveCSS('animation-name', 'none');
  await motion.uncheck();
  await expect(page.locator('html')).not.toHaveAttribute('data-less-motion', 'true');
});

test('the operating-system motion setting wins over a saved animation preference', async ({ page }) => {
  await page.addInitScript(({ key }) => {
    localStorage.setItem(key, JSON.stringify({ theme: 'system', lessMotion: false }));
  }, { key: storageKey });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(`${base}/`);
  const motion = page.getByRole('checkbox', { name: 'Less motion', exact: true });
  await expect(motion).toBeChecked();
  await expect(motion).toBeDisabled();
  await expect(motion).toHaveAccessibleDescription(/system|operating|device/i);
  await expect(page.locator('.hero-main')).toHaveCSS('animation-name', 'none');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(motion).toBeEnabled();
  await expect(motion).not.toBeChecked();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(motion).toBeDisabled();
  await expect(page.locator('.hero-main')).toHaveCSS('animation-name', 'none');
});

for (const failure of ['getter', 'write'] as const) {
  test(`preferences remain usable when browser storage ${failure} is blocked`, async ({ page }) => {
    await page.addInitScript(({ failure }) => {
      if (failure === 'getter') {
        Object.defineProperty(window, 'localStorage', {
          configurable: true,
          get() { throw new DOMException('Storage blocked', 'SecurityError'); },
        });
      } else {
        Storage.prototype.setItem = () => { throw new DOMException('Storage full', 'QuotaExceededError'); };
      }
    }, { failure });
    await page.emulateMedia({ reducedMotion: 'no-preference', colorScheme: 'light' });
    await page.goto(`${base}/`);
    const theme = page.getByRole('combobox', { name: 'Theme', exact: true });
    const motion = page.getByRole('checkbox', { name: 'Less motion', exact: true });
    await theme.selectOption('dark');
    await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark');
    await motion.check();
    await expect(page.locator('.hero-main')).toHaveCSS('animation-name', 'none');
    await theme.selectOption('light');
    await expect(page.locator('html')).toHaveCSS('color-scheme', 'light');
    await motion.uncheck();
    await expect(motion).not.toBeChecked();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
}

for (const [name, raw] of [
  ['invalid JSON', '{broken-json'],
  ['invalid fields', JSON.stringify({ theme: 'sepia', lessMotion: 'yes' })],
  ['oversized state', JSON.stringify({ theme: 'dark', lessMotion: true, padding: 'x'.repeat(20000) })],
]) {
  test(`${name} falls back to usable system defaults`, async ({ page }) => {
    await page.addInitScript(({ key, raw }) => { localStorage.setItem(key, raw); }, { key: storageKey, raw });
    await page.emulateMedia({ reducedMotion: 'no-preference', colorScheme: 'light' });
    await page.goto(`${base}/`);
    await expect(page.getByRole('combobox', { name: 'Theme', exact: true })).toHaveValue('system');
    await expect(page.getByRole('checkbox', { name: 'Less motion', exact: true })).not.toBeChecked();
    await expect(page.locator('html')).not.toHaveAttribute('data-theme');
    await expect(page.locator('html')).toHaveCSS('color-scheme', 'light');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
}

test('without JavaScript, controls stay hidden while content and OS preferences still work', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, colorScheme: 'dark', reducedMotion: 'reduce' });
  const page = await context.newPage();
  try {
    await page.goto(`http://127.0.0.1:4321${base}/`);
    await expect(page.locator('[data-preferences]')).toBeHidden();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark');
    await expect(page.locator('.hero-main')).toHaveCSS('animation-name', 'none');
    await page.locator(`#${data.projects[0].slug}`).getByRole('link', { name: /View project/i }).click();
    await expect(page.getByRole('heading', { level: 1, name: data.projects[0].title })).toBeVisible();
  } finally {
    await context.close();
  }
});
