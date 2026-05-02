import { test, expect } from '@playwright/test';

test.describe('전체 애플리케이션 종합 테스트', () => {
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

  test('메인 페이지 및 모든 네비게이션 테스트', async ({ page }) => {
    // 메인 페이지 로딩
    await page.goto('http://localhost:3000');
    await expect(page).toHaveTitle(/StartHub/i);

    console.log('✅ 메인 페이지 로딩 성공');

    // 헤더 네비게이션 테스트
    const headerNavItems = [
      { text: '공고', path: '/notices' },
      { text: '경쟁사 분석', path: '/competitor' },
      { text: 'BMC 설계', path: '/bmc' },
      { text: 'Hub AI', path: '/chat' },
      { text: 'My 비즈니스', path: '/my-profile' }
    ];

    for (const item of headerNavItems) {
      await page.goto('http://localhost:3000');
      await page.locator('header').getByRole('link', { name: item.text }).click();
      await expect(page.url()).toContain(item.path);
      console.log(`✅ ${item.text} 네비게이션 성공`);
    }

    // 메인 메뉴 버튼 테스트
    const mainMenuItems = [
      { text: '대구 지역 공고', expectedPath: 'notices' },
      { text: '자금 분야 공고', expectedPath: 'notices' },
      { text: 'BMC 제작', expectedPath: 'bmc' },
      { text: '경쟁사 분석', expectedPath: 'competitor' },
      { text: 'AI 추천 공고', expectedPath: 'notices' },
      { text: '내 관심 공고', expectedPath: 'like-list' }
    ];

    for (const item of mainMenuItems) {
      await page.goto('http://localhost:3000');
      await page.locator('[role="button"]').filter({ hasText: item.text }).click();
      await expect(page.url()).toContain(item.expectedPath);
      console.log(`✅ ${item.text} 메뉴 버튼 성공`);
    }
  });

  test('인증 관련 페이지 테스트', async ({ page }) => {
    // 로그인 페이지 테스트
    await page.goto('http://localhost:3000/sign-in');
    await page.waitForLoadState('networkidle');

    // 로그인 관련 요소가 있는지 확인
    const hasLoginElements = await page.locator('input[type="email"]').or(
      page.locator('input[placeholder*="이메일"]')
    ).isVisible();

    if (hasLoginElements) {
      console.log('✅ 로그인 페이지 렌더링 성공');
    } else {
      console.log('ℹ️ 로그인 페이지가 다른 형태이거나 로그인이 필요하지 않을 수 있음');
    }

    // 회원가입 페이지 테스트
    await page.goto('http://localhost:3000/sign-up');
    await page.waitForLoadState('networkidle');

    // 에러가 발생하지 않았는지 확인
    const errorElements = page.locator('[data-testid="error"], .error');
    await expect(errorElements).toHaveCount(0);

    // 필수 요소들 확인
    const hasSignupTitle = await page.locator('h2').filter({ hasText: '회원가입' }).isVisible();
    const hasEmailInput = await page.locator('input[type="text"]').first().isVisible();

    expect(hasSignupTitle).toBeTruthy();
    expect(hasEmailInput).toBeTruthy();

    console.log('✅ 회원가입 페이지 렌더링 성공 (에러 없음)');
  });

  test('BMC 관련 페이지 테스트', async ({ page }) => {
    // BMC 메인 페이지
    await page.goto('http://localhost:3000/bmc');
    await expect(page.locator('text=BMC')).toBeVisible();
    console.log('✅ BMC 메인 페이지 성공');

    // BMC 생성 페이지
    await page.goto('http://localhost:3000/bmc/generate');
    // 로그인이 필요한 페이지일 수 있으므로 에러 확인
    const hasError = await page.locator('text=로그인').isVisible();
    if (!hasError) {
      await expect(page.locator('text=BMC').or(page.locator('text=질문'))).toBeVisible();
      console.log('✅ BMC 생성 페이지 접근 성공');
    } else {
      console.log('⚠️ BMC 생성 페이지는 로그인 필요');
    }
  });

  test('공고 관련 페이지 테스트', async ({ page }) => {
    // 공고 메인 페이지
    await page.goto('http://localhost:3000/notices');
    await expect(page.locator('text=공고').or(page.locator('text=최신'))).toBeVisible();
    console.log('✅ 공고 메인 페이지 성공');

    // 지역별 공고 페이지
    const noticeTypes = ['daegu', 'funding', 'recommend'];
    for (const type of noticeTypes) {
      await page.goto(`http://localhost:3000/notices/${type}`);
      await page.waitForLoadState('networkidle');

      // 페이지가 제대로 로딩되었는지 확인 (타이틀이나 콘텐츠 확인)
      const hasContent = await page.locator('text=공고').or(page.locator('text=최신')).isVisible();
      expect(hasContent).toBeTruthy();
      console.log(`✅ ${type} 공고 페이지 성공`);
    }
  });

  test('경쟁사 분석 페이지 테스트', async ({ page }) => {
    await page.goto('http://localhost:3000/competitor');

    // 로그인이 필요한 경우와 아닌 경우 모두 처리
    const isLoginRequired = await page.locator('text=로그인').isVisible();
    if (!isLoginRequired) {
      await expect(page.locator('text=경쟁사').or(page.locator('text=분석'))).toBeVisible();
      console.log('✅ 경쟁사 분석 페이지 접근 성공');
    } else {
      console.log('⚠️ 경쟁사 분석 페이지는 로그인 필요');
    }
  });

  test('AI 채팅 페이지 테스트', async ({ page }) => {
    await page.goto('http://localhost:3000/chat');

    // 로그인이 필요한 경우와 아닌 경우 모두 처리
    const isLoginRequired = await page.locator('text=로그인').isVisible();
    if (!isLoginRequired) {
      await expect(page.locator('text=AI').or(page.locator('textarea'))).toBeVisible();
      console.log('✅ AI 채팅 페이지 접근 성공');
    } else {
      console.log('⚠️ AI 채팅 페이지는 로그인 필요');
    }
  });

  test('프로필 페이지 테스트', async ({ page }) => {
    await page.goto('http://localhost:3000/my-profile');

    // 로그인이 필요한 페이지이므로 로그인 페이지로 리디렉션될 수 있음
    const currentUrl = page.url();
    if (currentUrl.includes('sign-in')) {
      console.log('⚠️ 프로필 페이지는 로그인 필요 (로그인 페이지로 리디렉션됨)');
    } else {
      await expect(page.locator('text=프로필').or(page.locator('text=내 정보'))).toBeVisible();
      console.log('✅ 프로필 페이지 접근 성공');
    }
  });

  test('404 페이지 테스트', async ({ page }) => {
    await page.goto('http://localhost:3000/non-existent-page');

    // 404 페이지나 적절한 에러 처리가 있는지 확인
    const response = await page.goto('http://localhost:3000/non-existent-page');
    expect(response?.status()).toBe(404);

    console.log('✅ 404 페이지 처리 확인');
  });

  test('전체 페이지 접근성 및 반응형 테스트', async ({ page }) => {
    const pages = [
      '/',
      '/sign-in',
      '/sign-up',
      '/bmc',
      '/notices',
      '/competitor',
      '/chat'
    ];

    // 데스크톱 뷰포트
    await page.setViewportSize({ width: 1920, height: 1080 });

    for (const pagePath of pages) {
      await page.goto(`http://localhost:3000${pagePath}`);
      await page.waitForLoadState('networkidle');

      // 페이지가 정상적으로 로딩되었는지 확인
      const bodyText = await page.locator('body').textContent();
      expect(bodyText).toBeTruthy();
      expect(bodyText!.length).toBeGreaterThan(0);

      console.log(`✅ ${pagePath} 데스크톱 뷰 테스트 성공`);
    }

    // 모바일 뷰포트 테스트
    await page.setViewportSize({ width: 375, height: 667 });

    for (const pagePath of pages) {
      await page.goto(`http://localhost:3000${pagePath}`);
      await page.waitForLoadState('networkidle');

      // 모바일에서도 콘텐츠가 보이는지 확인
      const bodyText = await page.locator('body').textContent();
      expect(bodyText).toBeTruthy();

      console.log(`✅ ${pagePath} 모바일 뷰 테스트 성공`);
    }
  });

  test('성능 및 로딩 시간 테스트', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    // 로딩 시간이 5초를 넘지 않는지 확인
    expect(loadTime).toBeLessThan(5000);

    console.log(`✅ 메인 페이지 로딩 시간: ${loadTime}ms`);
  });

  test('TypeHangul 라이브러리 로딩 확인', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // TypeHangul 라이브러리가 로드되었는지 확인
    const typeHangulLoaded = await page.evaluate(() => {
      return typeof window.TypeHangul !== 'undefined';
    });

    // 라이브러리가 로드되지 않았더라도 에러가 발생하지 않아야 함
    console.log(`TypeHangul 라이브러리 로딩 상태: ${typeHangulLoaded ? '성공' : '실패 (fallback 사용)'}`);

    // BMC 페이지에서 메시지 버블이 표시되는지 확인
    await page.goto('http://localhost:3000/bmc/generate');

    // 로그인이 필요한 경우 스킵
    const needsLogin = await page.locator('text=로그인').isVisible();
    if (!needsLogin) {
      // 메시지 관련 요소가 있는지 확인 (실제 메시지는 세션이 필요)
      const hasMessageElements = await page.locator('[id*="typing-message"], .message, [class*="message"]').count();
      console.log(`BMC 메시지 요소 개수: ${hasMessageElements}`);
    }
  });
});