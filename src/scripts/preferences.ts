export {};

type Theme = 'system' | 'light' | 'dark';
interface Preferences { theme: Theme; lessMotion: boolean; }

const storageKey = 'portfolio-preferences-v1';
const root = document.documentElement;
const controls = document.querySelector<HTMLElement>('[data-preferences]');
const theme = document.querySelector<HTMLSelectElement>('#theme');
const motion = document.querySelector<HTMLInputElement>('#less-motion');
const motionHint = document.querySelector<HTMLElement>('#motion-hint');
const announcement = document.querySelector<HTMLElement>('[data-preference-status]');
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
const systemMotion = matchMedia('(prefers-reduced-motion: reduce)');

function readPreferences(): Preferences {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved && saved.length <= 200) {
      const value = JSON.parse(saved);
      if (value && ['system', 'light', 'dark'].includes(value.theme) && typeof value.lessMotion === 'boolean')
        return { theme: value.theme, lessMotion: value.lessMotion };
    }
  } catch { /* Keep working when the browser denies storage access. */ }
  return { theme: 'system', lessMotion: false };
}

const preferences = readPreferences();

function applyPreferences(): void {
  if (preferences.theme === 'system') delete root.dataset.theme;
  else root.dataset.theme = preferences.theme;
  if (preferences.lessMotion) root.dataset.lessMotion = 'true';
  else delete root.dataset.lessMotion;

  if (theme) theme.value = preferences.theme;
  if (motion) {
    motion.checked = systemMotion.matches || preferences.lessMotion;
    // A website preference must never override the device's reduced-motion choice.
    motion.disabled = systemMotion.matches;
  }
  if (motionHint) motionHint.hidden = !systemMotion.matches;

  const color = getComputedStyle(root).getPropertyValue('--bg').trim();
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color);
}

function savePreferences(): void {
  try { localStorage.setItem(storageKey, JSON.stringify(preferences)); }
  catch { /* The current page retains its in-memory choice. */ }
}

if (controls && theme && motion) {
  theme.addEventListener('change', () => {
    if (!['system', 'light', 'dark'].includes(theme.value)) return;
    preferences.theme = theme.value as Theme;
    applyPreferences();
    savePreferences();
    if (announcement) announcement.textContent = `Theme: ${theme.selectedOptions[0].textContent}.`;
  });
  motion.addEventListener('change', () => {
    preferences.lessMotion = motion.checked;
    applyPreferences();
    savePreferences();
    if (announcement) announcement.textContent = preferences.lessMotion ? 'Less motion enabled.' : 'Following your device motion preference.';
  });
  systemTheme.addEventListener('change', applyPreferences);
  systemMotion.addEventListener('change', applyPreferences);
  applyPreferences();
  controls.hidden = false;
}
