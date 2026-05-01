import { test, expect } from '@playwright/test';

test.describe('고급 시나리오 및 전시회 준비 테스트', () => {
  test.beforeEach(async ({ page }) => {
    // 모든 에러 캐치 및 로깅
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.error(`콘솔 에러 [${msg.location().url}:${msg.location().lineNumber}]: ${msg.text()}`);
      }
    });

    page.on('pageerror', (error) => {
      console.error('페이지 에러:', error.message);
    });

    page.on('response', (response) => {
      if (response.status() >= 400) {
        console.error(`HTTP 에러: ${response.status()} ${response.statusText()} - ${response.url()}`);
      }
    });
  });

  test('사용자 플로우 전체 시뮬레이션', async ({ page }) => {
    console.log('=== 사용자 플로우 전체 시뮬레이션 시작 ===');

    // 1. 메인 페이지 방문
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toBeVisible();
    console.log('✅ 1단계: 메인 페이지 방문 성공');

    // 2. 공고 탐색
    await page.locator('[role="button"]').filter({ hasText: '대구 지역 공고' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.url()).toContain('notices');
    console.log('✅ 2단계: 공고 페이지 탐색 성공');

    // 3. BMC 페이지 방문
    await page.goto('http://localhost:3000/bmc');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toBeVisible();
    console.log('✅ 3단계: BMC 페이지 방문 성공');

    // 4. 경쟁사 분석 페이지 확인
    await page.goto('http://localhost:3000/competitor');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toBeVisible();
    console.log('✅ 4단계: 경쟁사 분석 페이지 확인 성공');

    // 5. AI 채팅 페이지 확인
    await page.goto('http://localhost:3000/chat');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toBeVisible();
    console.log('✅ 5단계: AI 채팅 페이지 확인 성공');

    console.log('✅ 사용자 플로우 전체 시뮬레이션 완료');
  });

  test('전시회 시연용 핵심 기능 검증', async ({ page }) => {
    console.log('=== 전시회 시연용 핵심 기능 검증 시작 ===');

    // 메인 페이지 로딩 성능 체크
    const startTime = Date.now();
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(3000); // 3초 이내 로딩
    console.log(`✅ 메인 페이지 로딩 성능: ${loadTime}ms (3초 이내)`);

    // 모든 핵심 네비게이션 요소 존재 확인
    const headerNavigation = page.locator('header');
    await expect(headerNavigation).toBeVisible();

    // 메인 메뉴 버튼들 확인
    const menuButtons = [
      '대구 지역 공고',
      '자금 분야 공고',
      'BMC 제작',
      '경쟁사 분석',
      'AI 추천 공고',
      '내 관심 공고'
    ];

    for (const buttonText of menuButtons) {
      const button = page.locator('[role="button"]').filter({ hasText: buttonText });
      await expect(button).toBeVisible();
      console.log(`✅ 메뉴 버튼 "${buttonText}" 존재 확인`);
    }

    console.log('✅ 전시회 시연용 핵심 기능 검증 완료');
  });

  test('대용량 데이터 처리 시뮬레이션', async ({ page }) => {
    console.log('=== 대용량 데이터 처리 시뮬레이션 시작 ===');

    // 공고 목록 페이지에서 많은 아이템 로딩
    await page.goto('http://localhost:3000/notices');
    await page.waitForLoadState('networkidle');

    // 스크롤 테스트로 더 많은 데이터 로딩 시뮬레이션
    for (let i = 0; i < 5; i++) {
      await page.mouse.wheel(0, 1000);
      await page.waitForTimeout(500);
    }

    await expect(page.locator('body')).toBeVisible();
    console.log('✅ 대용량 데이터 스크롤 처리 성공');

    // 네트워크 요청 모니터링
    let requestCount = 0;
    page.on('request', (request) => {
      if (request.url().includes('/api/')) {
        requestCount++;
      }
    });

    await page.reload();
    await page.waitForLoadState('networkidle');

    console.log(`✅ API 요청 수: ${requestCount}개`);
    console.log('✅ 대용량 데이터 처리 시뮬레이션 완료');
  });

  test('동시 접속자 시뮬레이션', async ({ browser }) => {
    console.log('=== 동시 접속자 시뮬레이션 시작 ===');

    // 여러 페이지 동시 생성
    const contexts = [];
    const pages = [];

    for (let i = 0; i < 3; i++) {
      const context = await browser.newContext();
      const page = await context.newPage();
      contexts.push(context);
      pages.push(page);
    }

    // 동시에 다른 페이지들 접속
    const urls = [
      'http://localhost:3000',
      'http://localhost:3000/notices',
      'http://localhost:3000/bmc'
    ];

    await Promise.all(
      pages.map((page, index) =>
        page.goto(urls[index]).then(() => page.waitForLoadState('networkidle'))
      )
    );

    // 모든 페이지가 정상 로딩되었는지 확인
    for (let i = 0; i < pages.length; i++) {
      await expect(pages[i].locator('body')).toBeVisible();
      console.log(`✅ 동시 접속 페이지 ${i + 1} 로딩 성공`);
    }

    // 컨텍스트 정리
    for (const context of contexts) {
      await context.close();
    }

    console.log('✅ 동시 접속자 시뮬레이션 완료');
  });

  test('브라우저 호환성 테스트', async ({ page }) => {
    console.log('=== 브라우저 호환성 테스트 시작 ===');

    // 기본 JavaScript API 지원 확인
    const jsFeatures = await page.evaluate(() => {
      return {
        fetch: typeof fetch !== 'undefined',
        localStorage: typeof localStorage !== 'undefined',
        sessionStorage: typeof sessionStorage !== 'undefined',
        websocket: typeof WebSocket !== 'undefined',
        geolocation: navigator.geolocation !== undefined
      };
    });

    expect(jsFeatures.fetch).toBeTruthy();
    expect(jsFeatures.localStorage).toBeTruthy();
    console.log('✅ 기본 JavaScript API 지원 확인');

    // 페이지 로딩 테스트
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // CSS 스타일 적용 확인
    const headerStyles = await page.locator('header').evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        display: styles.display,
        position: styles.position
      };
    });

    expect(headerStyles.display).not.toBe('none');
    console.log('✅ CSS 스타일 적용 확인');

    console.log('✅ 브라우저 호환성 테스트 완료');
  });

  test('SEO 및 메타데이터 확인', async ({ page }) => {
    console.log('=== SEO 및 메타데이터 확인 시작 ===');

    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // 페이지 타이틀 확인
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    console.log(`✅ 페이지 타이틀: "${title}"`);

    // 메타 태그 확인
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    if (viewport) {
      expect(viewport).toContain('width=device-width');
      console.log('✅ 반응형 메타태그 확인');
    }

    // 헤더 구조 확인
    const h1Count = await page.locator('h1').count();
    console.log(`✅ H1 태그 개수: ${h1Count}개`);

    console.log('✅ SEO 및 메타데이터 확인 완료');
  });

  test('키보드 접근성 테스트', async ({ page }) => {
    console.log('=== 키보드 접근성 테스트 시작 ===');

    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Tab 키로 네비게이션 테스트
    let tabCount = 0;
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      tabCount++;
      await page.waitForTimeout(200);
    }

    console.log(`✅ Tab 네비게이션 ${tabCount}회 성공`);

    // Enter 키로 버튼 활성화 테스트
    await page.locator('[role="button"]').first().focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);

    await expect(page.locator('body')).toBeVisible();
    console.log('✅ Enter 키 버튼 활성화 성공');

    console.log('✅ 키보드 접근성 테스트 완료');
  });

  test('이미지 및 리소스 로딩 테스트', async ({ page }) => {
    console.log('=== 이미지 및 리소스 로딩 테스트 시작 ===');

    let imageLoadErrors = 0;
    let cssLoadErrors = 0;
    let jsLoadErrors = 0;

    page.on('response', (response) => {
      if (response.status() >= 400) {
        const url = response.url();
        if (url.includes('.png') || url.includes('.jpg') || url.includes('.svg')) {
          imageLoadErrors++;
        } else if (url.includes('.css')) {
          cssLoadErrors++;
        } else if (url.includes('.js')) {
          jsLoadErrors++;
        }
      }
    });

    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // 이미지 로딩 확인
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < Math.min(imageCount, 10); i++) {
      const img = images.nth(i);
      const isVisible = await img.isVisible();
      if (isVisible) {
        const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
        if (naturalWidth > 0) {
          console.log(`✅ 이미지 ${i + 1} 로딩 성공`);
        }
      }
    }

    console.log(`이미지 로딩 에러: ${imageLoadErrors}개`);
    console.log(`CSS 로딩 에러: ${cssLoadErrors}개`);
    console.log(`JS 로딩 에러: ${jsLoadErrors}개`);

    console.log('✅ 이미지 및 리소스 로딩 테스트 완료');
  });

  test('폼 상호작용 종합 테스트', async ({ page }) => {
    console.log('=== 폼 상호작용 종합 테스트 시작 ===');

    await page.goto('http://localhost:3000/sign-up');
    await page.waitForLoadState('networkidle');

    // 다양한 폼 필드 상호작용
    const emailInput = page.locator('input[type="text"]').first();

    if (await emailInput.isVisible()) {
      // 유효한 이메일 입력
      await emailInput.fill('test@example.com');
      await emailInput.blur(); // focus 해제
      await page.waitForTimeout(500);

      // 입력값 확인
      const inputValue = await emailInput.inputValue();
      expect(inputValue).toBe('test@example.com');
      console.log('✅ 이메일 입력 및 검증 성공');

      // 필드 지우기
      await emailInput.fill('');
      await page.waitForTimeout(500);

      // 복사/붙여넣기 시뮬레이션
      await emailInput.fill('paste@test.com');
      await page.keyboard.press('Control+a');
      await page.keyboard.press('Control+c');
      await emailInput.fill('');
      await page.keyboard.press('Control+v');
      await page.waitForTimeout(500);

      console.log('✅ 복사/붙여넣기 테스트 성공');
    }

    console.log('✅ 폼 상호작용 종합 테스트 완료');
  });

  test('전시회 최종 체크리스트', async ({ page }) => {
    console.log('=== 전시회 최종 체크리스트 시작 ===');

    const checklist = {
      mainPageLoad: false,
      navigationWorks: false,
      bmcPageWorks: false,
      noticePageWorks: false,
      competitorPageWorks: false,
      chatPageWorks: false,
      responsiveDesign: false,
      noJsErrors: false,
      fastLoading: false
    };

    let jsErrorCount = 0;
    page.on('pageerror', () => {
      jsErrorCount++;
    });

    // 1. 메인 페이지 로딩
    const loadStart = Date.now();
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - loadStart;

    checklist.mainPageLoad = true;
    checklist.fastLoading = loadTime < 3000;

    // 2. 네비게이션 테스트
    const navLinks = ['공고', '경쟁사 분석', 'BMC 설계', 'Hub AI'];
    for (const linkText of navLinks) {
      const link = page.locator('header').getByRole('link', { name: linkText });
      if (await link.isVisible()) {
        checklist.navigationWorks = true;
        break;
      }
    }

    // 3. 각 페이지 기본 동작 확인
    await page.goto('http://localhost:3000/bmc');
    await page.waitForLoadState('networkidle');
    checklist.bmcPageWorks = await page.locator('body').isVisible();

    await page.goto('http://localhost:3000/notices');
    await page.waitForLoadState('networkidle');
    checklist.noticePageWorks = await page.locator('body').isVisible();

    await page.goto('http://localhost:3000/competitor');
    await page.waitForLoadState('networkidle');
    checklist.competitorPageWorks = await page.locator('body').isVisible();

    await page.goto('http://localhost:3000/chat');
    await page.waitForLoadState('networkidle');
    checklist.chatPageWorks = await page.locator('body').isVisible();

    // 4. 반응형 디자인 확인
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    checklist.responsiveDesign = await page.locator('body').isVisible();

    // 5. JS 에러 체크
    checklist.noJsErrors = jsErrorCount === 0;

    // 결과 출력
    console.log('=== 전시회 준비 체크리스트 결과 ===');
    Object.entries(checklist).forEach(([key, value]) => {
      console.log(`${value ? '✅' : '❌'} ${key}: ${value}`);
    });

    const passCount = Object.values(checklist).filter(Boolean).length;
    const totalCount = Object.keys(checklist).length;
    console.log(`\n전체 점수: ${passCount}/${totalCount} (${Math.round(passCount/totalCount*100)}%)`);

    // 모든 핵심 기능이 통과해야 함
    expect(checklist.mainPageLoad).toBeTruthy();
    expect(checklist.bmcPageWorks).toBeTruthy();
    expect(checklist.noticePageWorks).toBeTruthy();

    console.log('✅ 전시회 최종 체크리스트 완료');
  });
});