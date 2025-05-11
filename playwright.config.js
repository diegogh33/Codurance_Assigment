import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.BASE_URL || "https://api.openweathermap.org";

export default defineConfig({
  testDir: "./tests",
  retries: 1,
  workers: 3,
  reporter: "html",
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: baseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "api",
      testDir: "tests/api/tests", // Point to your API tests directory
      use: {
        headless: true, // API tests don't require a browser UI
      },
    },
  ],
});
