import { test, expect } from '@playwright/test';

test.describe('Next.js 마이그레이션 테스트', () => {
  test.beforeEach(async ({ page }) => {
    // 콘솔 에러 감지
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.error('브라우저 콘솔 에러:', msg.text());
      }
    });

    // 네트워크 에러 감지
    page.on('response', (response) => {
      if (response.status() >= 400) {
        console.error(`HTTP 에러: ${response.status()} - ${response.url()}`);
      }
    });
  });

  test('메인 페이지 로딩 및 스타일 확인', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // 페이지가 로딩되었는지 확인
    await expect(page).toHaveTitle(/StartHub/i);

    // 헤더가 존재하는지 확인
    await expect(page.locator('header')).toBeVisible();

    // 로고 SVG가 보이는지 확인
    await expect(page.locator('header svg').first()).toBeVisible();

    // 메인 메뉴가 6개 있는지 확인 (대구 지역, 자금 분야, BMC, 경쟁사, AI 추천, 내 관심)
    const menuButtons = page.locator('[role="button"]');
    await expect(menuButtons).toHaveCount(6);

    // 배너가 보이는지 확인
    const banner = page.locator('text=더 나은 스타트허브를 위해 피드백을 남겨주세요');
    await expect(banner).toBeVisible();

    console.log('✅ 메인 페이지 기본 요소들이 정상적으로 로딩됨');
  });

  test('로그인 버튼 클릭 테스트', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // 로그인 버튼 찾기 (헤더의 버튼만)
    const loginButton = page.locator('header').getByRole('button', { name: '로그인' });
    await expect(loginButton).toBeVisible();

    // 로그인 버튼 클릭
    await loginButton.click();

    // 로그인 페이지로 이동했는지 확인
    await expect(page).toHaveURL(/.*sign-in.*/);

    console.log('✅ 로그인 버튼 클릭이 정상적으로 작동함');
  });

  test('네비게이션 링크 테스트', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // 상단 네비게이션 링크들 테스트
    const navLinks = [
      { text: '공고', expectedUrl: /.*notices.*/ },
      { text: '경쟁사 분석', expectedUrl: /.*competitor.*/ },
      { text: 'BMC 설계', expectedUrl: /.*bmc.*/ },
      { text: 'Hub AI', expectedUrl: /.*chat.*/ },
      { text: 'My 비즈니스', expectedUrl: /.*my-profile.*/ }
    ];

    for (const link of navLinks) {
      // 메인 페이지로 다시 이동
      await page.goto('http://localhost:3000');

      // 링크 클릭 (헤더의 링크만)
      await page.locator('header').getByRole('link', { name: link.text }).click();

      // URL 확인
      await expect(page).toHaveURL(link.expectedUrl);

      console.log(`✅ ${link.text} 링크가 정상적으로 작동함`);
    }
  });

  test('메인 메뉴 버튼 테스트', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // 메인 메뉴 버튼들 테스트
    const menuItems = [
      { text: '대구 지역 공고', expectedUrl: /.*notices.*daegu.*/ },
      { text: 'BMC 제작', expectedUrl: /.*bmc.*/ },
      { text: '경쟁사 분석', expectedUrl: /.*competitor.*/ }
    ];

    for (const item of menuItems) {
      // 메인 페이지로 다시 이동
      await page.goto('http://localhost:3000');

      // 메뉴 버튼 클릭 (메인 메뉴 영역에서만)
      await page.locator('[role="button"]').filter({ hasText: item.text }).click();

      // URL 확인
      await expect(page).toHaveURL(item.expectedUrl);

      console.log(`✅ ${item.text} 메뉴가 정상적으로 작동함`);
    }
  });

  test('스타일 적용 확인', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // 헤더의 배경색이 설정되어 있는지 확인
    const header = page.locator('header').first();
    const headerStyles = await header.evaluate((el) => getComputedStyle(el));

    // 배경색이 투명하지 않은지 확인 (스타일이 적용되었는지)
    expect(headerStyles.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');

    // 로고 SVG가 올바른 크기인지 확인
    const logo = page.locator('header svg').first();
    const logoStyles = await logo.evaluate((el) => getComputedStyle(el));
    expect(logoStyles.width).not.toBe('auto'); // SVG가 크기가 설정되어 있는지 확인

    console.log('✅ 스타일이 정상적으로 적용됨');
  });

  test('React Router 에러 감지', async ({ page }) => {
    let hasRouterError = false;

    // 콘솔 에러 감지
    page.on('console', (msg) => {
      if (msg.type() === 'error' && (
        msg.text().includes('useContext') ||
        msg.text().includes('Router') ||
        msg.text().includes('basename')
      )) {
        hasRouterError = true;
        console.error('React Router 에러 감지:', msg.text());
      }
    });

    await page.goto('http://localhost:3000');

    // 로그인 버튼 클릭 시도
    try {
      const loginButton = page.locator('header').getByRole('button', { name: '로그인' });
      if (await loginButton.isVisible()) {
        await loginButton.click();
      }
    } catch (error) {
      console.error('로그인 버튼 클릭 시 에러:', error);
    }

    // 잠시 대기하여 에러가 발생할 시간을 줌
    await page.waitForTimeout(2000);

    expect(hasRouterError).toBe(false);

    console.log('✅ React Router 에러가 없음');
  });
});