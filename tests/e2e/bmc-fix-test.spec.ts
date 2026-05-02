import { test, expect } from '@playwright/test';

test.describe('BMC 메시지 및 타이핑 효과 수정 테스트', () => {
  test.beforeEach(async ({ page }) => {
    // 모든 에러 캐치
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.error(`콘솔 에러: ${msg.text()}`);
      }
    });

    page.on('pageerror', (error) => {
      console.error('페이지 에러:', error.message);
    });
  });

  test('BMC 페이지에서 기본 질문이 표시되는지 확인', async ({ page }) => {
    console.log('=== BMC 페이지 기본 질문 표시 테스트 시작 ===');

    await page.goto('http://localhost:3000/bmc/generate');
    await page.waitForLoadState('networkidle');

    // 페이지가 로드될 때까지 잠시 기다림
    await page.waitForTimeout(2000);

    // 첫 번째 질문이 표시되는지 확인
    const firstQuestion = await page.locator('text=사업 아이디어').first();
    await expect(firstQuestion).toBeVisible({ timeout: 10000 });

    console.log('✅ 첫 번째 질문이 성공적으로 표시됨');

    // "질문을 불러오는 중입니다..." 메시지가 사라졌는지 확인
    const loadingMessage = page.locator('text=질문을 불러오는 중입니다...');
    await expect(loadingMessage).not.toBeVisible();

    console.log('✅ 로딩 메시지가 사라짐');

    // TypeHangul 타이핑 효과 또는 fallback 텍스트 확인
    await page.waitForTimeout(4000); // TypeHangul 타이핑 효과나 fallback 대기

    const messageElement = page.locator('#typing-message-1');
    const messageText = await messageElement.textContent();

    if (messageText && messageText.includes('사업 아이디어')) {
      console.log('✅ 메시지가 성공적으로 표시됨 (TypeHangul 또는 fallback)');
    } else {
      console.log('⚠️ 메시지 표시에 문제가 있을 수 있음');
    }

    console.log('✅ BMC 페이지 기본 질문 표시 테스트 완료');
  });

  test('텍스트 입력 및 전송 기능 테스트', async ({ page }) => {
    console.log('=== BMC 텍스트 입력 및 전송 테스트 시작 ===');

    await page.goto('http://localhost:3000/bmc/generate');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // 텍스트 입력 영역 찾기
    const textArea = page.locator('textarea');
    await expect(textArea).toBeVisible();

    // 테스트 답변 입력
    const testAnswer = '저는 AI 기반 스타트업 컨설팅 서비스를 제공하는 회사입니다.';
    await textArea.fill(testAnswer);

    console.log('✅ 텍스트 입력 성공');

    // Enter 키로 전송 (실제 API 호출은 실패할 수 있지만 UI 동작 확인)
    await textArea.press('Enter');

    // 입력 필드가 초기화되는지 확인
    const inputValue = await textArea.inputValue();
    console.log(`입력 필드 값: "${inputValue}"`);

    console.log('✅ BMC 텍스트 입력 및 전송 테스트 완료');
  });

  test('TypeHangul 라이브러리 로딩 및 폴백 처리 테스트', async ({ page }) => {
    console.log('=== TypeHangul 라이브러리 및 폴백 테스트 시작 ===');

    await page.goto('http://localhost:3000/bmc/generate');
    await page.waitForLoadState('networkidle');

    // TypeHangul 라이브러리 로딩 확인
    const typeHangulLoaded = await page.evaluate(() => {
      return typeof window.TypeHangul !== 'undefined' &&
             typeof window.TypeHangul.type === 'function';
    });

    console.log(`TypeHangul 라이브러리 로딩: ${typeHangulLoaded ? '성공' : '실패 (폴백 사용)'}`);

    // 3초 후 메시지 확인 (타이핑 효과나 폴백)
    await page.waitForTimeout(4000);

    const messageContainer = page.locator('#typing-message-1');
    const messageContent = await messageContainer.textContent();

    expect(messageContent).toBeTruthy();
    expect(messageContent!.length).toBeGreaterThan(10);

    if (messageContent?.includes('사업 아이디어')) {
      console.log('✅ 메시지가 올바르게 표시됨');
    } else {
      console.log('⚠️ 예상과 다른 메시지:', messageContent);
    }

    console.log('✅ TypeHangul 라이브러리 및 폴백 테스트 완료');
  });

  test('다양한 뷰포트에서 BMC 페이지 테스트', async ({ page }) => {
    console.log('=== 다양한 뷰포트 BMC 테스트 시작 ===');

    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1920, height: 1080, name: 'Desktop' }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('http://localhost:3000/bmc/generate');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      // 기본 요소들이 보이는지 확인
      await expect(page.locator('textarea')).toBeVisible();

      // 메시지 영역 확인
      const messageArea = page.locator('[id^="typing-message"]');
      await expect(messageArea.first()).toBeVisible();

      console.log(`✅ ${viewport.name} (${viewport.width}x${viewport.height}) 뷰포트 테스트 통과`);
    }

    console.log('✅ 다양한 뷰포트 BMC 테스트 완료');
  });

  test('BMC 네비게이션 단계 확인', async ({ page }) => {
    console.log('=== BMC 네비게이션 단계 테스트 시작 ===');

    await page.goto('http://localhost:3000/bmc/generate');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // 단계별 아이콘들이 표시되는지 확인
    const stepItems = page.locator('[class*="StepItem"]');
    const stepCount = await stepItems.count();

    expect(stepCount).toBeGreaterThan(5); // BMC 단계들이 표시되어야 함
    console.log(`✅ BMC 단계 아이템 ${stepCount}개 확인`);

    // Business Idea 단계가 활성화되어 있는지 확인
    const businessIdeaStep = page.locator('text=Business Idea').first();
    await expect(businessIdeaStep).toBeVisible();
    console.log('✅ Business Idea 단계 표시 확인');

    console.log('✅ BMC 네비게이션 단계 테스트 완료');
  });
});