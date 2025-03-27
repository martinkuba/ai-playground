import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 90 * 1000,
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    launchOptions: {
      // slowMo: 500
    }
  },
  reporter: [["list"], ["@midscene/web/playwright-report"]],
});

