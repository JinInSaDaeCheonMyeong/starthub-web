import { defineConfig, devices } from '@playwright/test';

/**
 * Tailwind Migration-Safe Configuration
 *
 * 이 설정은 향후 Tailwind CSS 마이그레이션과 충돌하지 않도록
 * 설계되었습니다.
 */

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Firefox, Safari는 필요시 추가
  ],

  // webServer는 이미 실행 중인 서버 사용
});