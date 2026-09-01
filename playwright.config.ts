import { defineConfig, devices } from '@playwright/test'

// Deliberately not 3000. A `nuxt dev` server there would be picked up by
// `reuseExistingServer` and silently tested instead of the artefact — and a dev
// server can never satisfy the smoke spec, which asserts production robots.txt.
const PORT = Number(process.env.E2E_PORT ?? 4173)
const baseURL = process.env.E2E_BASE_URL ?? `http://localhost:${PORT}`

const serve = `npx serve .output/public --listen ${PORT} --no-clipboard`

// CI builds once and shares `.output/public` between jobs, so E2E serves the
// exact artefact that gets deployed instead of rebuilding it.
const command = process.env.E2E_SKIP_BUILD ? serve : `npm run generate && ${serve}`

/**
 * E2E runs against the *generated static output* (`.output/public`) — byte for
 * byte what GitHub Pages serves. Testing the dev server instead would hide the
 * whole class of bugs that only appear after prerendering: hydration mismatches,
 * routes that never got crawled, `window`-at-module-scope crashes, missing
 * assets.
 *
 * `reuseExistingServer` is on locally, but the port is 4173, not 3000: it may
 * reuse an already-serving artefact, never a dev server. CI always builds
 * fresh.
 */
export default defineConfig({
  testDir: './tests/e2e',
  outputDir: './tests/.playwright/results',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 30_000,
  expect: { timeout: 5_000 },

  reporter: process.env.CI
    ? [['github'], ['html', { outputFolder: './tests/.playwright/report', open: 'never' }]]
    : [['list'], ['html', { outputFolder: './tests/.playwright/report', open: 'never' }]],

  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  webServer: {
    command,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    // The design is mobile-first; regressions at this width are easy to miss.
    { name: 'mobile-chrome', use: { ...devices['Pixel 7'] } },
  ],
})
