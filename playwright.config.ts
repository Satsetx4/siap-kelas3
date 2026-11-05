import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: 'tests/e2e',
  use: { baseURL: 'http://localhost:4173', trace: 'retain-on-failure' },
  webServer: { command: 'npm.cmd run build:e2e && npm.cmd run preview -- --port 4173 --strictPort', url: 'http://localhost:4173', reuseExistingServer: true, timeout: 180_000 },
  projects: [
    { name: 'hp', use: { ...devices['Pixel 5'], viewport: { width: 360, height: 760 } } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
  ],
});
