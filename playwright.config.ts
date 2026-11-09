import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'node:fs';

process.env.BASE_PATH ??= '/Portfolio';
const base = process.env.BASE_PATH.replace(/\/$/, '');
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ||
  (existsSync('/opt/brave.com/brave/brave') ? '/opt/brave.com/brave/brave' : undefined);

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  workers: 2,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:4321',
    trace: 'retain-on-failure',
    launchOptions: { executablePath },
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run preview -- --port 4321 --ignore-lock',
    url: `http://127.0.0.1:4321${base}/`,
    reuseExistingServer: false,
    timeout: 30000,
  },
});
