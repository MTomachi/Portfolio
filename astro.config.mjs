import { defineConfig } from 'astro/config';

// Repository names are case-sensitive in GitHub Pages project URLs.
// Environment overrides allow root-path checks and a future approved domain.
export default defineConfig({
  site: process.env.SITE_URL || 'https://mtomachi.github.io',
  base: process.env.BASE_PATH || '/Portfolio',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
