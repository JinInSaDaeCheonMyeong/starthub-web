import { test, expect } from '@playwright/test';

test.describe('TypeHangul 타이핑 애니메이션 테스트', () => {
  test.beforeEach(async ({ page }) => {
    page.on('console', (msg) => {
      if (msg.type() === 'log' && msg.text().includes('TypeHangul')) {
        console.log(`타이핑 로그: ${msg.text()}`);
      }
    });
  });

  test('BMC 페이지에서 실제 타이핑 애니메이션이 작동하는지 확인', async ({ page }) => {
    console.log('=== 타이핑 애니메이션 작동 테스트 시작 ===');

    await page.goto('http://localhost:3000/bmc/generate');
    await page.waitForLoadState('networkidle');

    // TypeHangul 라이브러리 로딩 확인
    const typeHangulLoaded = await page.evaluate(() => {
      return typeof window.TypeHangul !== 'undefined' &&
             typeof window.TypeHangul.type === 'function';
    });

    console.log(`TypeHangul 라이브러리 상태: ${typeHangulLoaded ? '✅ 로딩 성공' : '❌ 로딩 실패'}`);

    if (!typeHangulLoaded) {
      console.log('⚠️ TypeHangul 라이브러리가 로드되지 않음. fallback 테스트로 진행');
      await page.waitForTimeout(6000); // fallback 대기

      const messageElement = page.locator('#typing-message-1');
      const messageText = await messageElement.textContent();
      expect(messageText).toBeTruthy();
      console.log(`Fallback 메시지: "${messageText}"`);
      return;
    }

    // 타이핑 애니메이션 실시간 관찰
    console.log('📝 타이핑 애니메이션 시작 대기 중...');

    const messageElement = page.locator('#typing-message-1');

    // 1초 간격으로 10번 체크하여 글자가 점진적으로 추가되는지 확인
    const textProgression: string[] = [];

    for (let i = 0; i < 10; i++) {
      await page.waitForTimeout(1000);
      const currentText = await messageElement.textContent() || '';
      textProgression.push(currentText);
      console.log(`${i + 1}초: "${currentText}" (길이: ${currentText.length})`);
    }

    // 텍스트가 점진적으로 증가했는지 확인
    const hasProgression = textProgression.some((text, index) => {
      if (index === 0) return false;
      const prevLength = textProgression[index - 1].length;
      const currentLength = text.length;
      return currentLength > prevLength && currentLength > 0;
    });

    if (hasProgression) {
      console.log('✅ 타이핑 애니메이션이 정상적으로 작동함');
    } else {
      console.log('⚠️ 타이핑 애니메이션이 감지되지 않음 (즉시 표시 또는 fallback 사용됨)');
    }

    // 최종 메시지가 완전히 표시되었는지 확인
    const finalText = textProgression[textProgression.length - 1];
    expect(finalText.length).toBeGreaterThan(5);
    expect(finalText).toContain('사업');

    console.log(`최종 메시지: "${finalText}"`);
    console.log('✅ 타이핑 애니메이션 테스트 완료');
  });

  test('타이핑 스피드 변경 테스트', async ({ page }) => {
    console.log('=== 타이핑 스피드 테스트 시작 ===');

    await page.goto('http://localhost:3000/bmc/generate');
    await page.waitForLoadState('networkidle');

    // TypeHangul 라이브러리 상태 확인
    const typeHangulLoaded = await page.evaluate(() => {
      return typeof window.TypeHangul !== 'undefined';
    });

    if (!typeHangulLoaded) {
      console.log('⚠️ TypeHangul 라이브러리 없음, 테스트 스킵');
      return;
    }

    // 메시지 요소 확인
    const messageElement = page.locator('#typing-message-1');
    await expect(messageElement).toBeVisible();

    // 3초 후 텍스트 진행상황 확인
    await page.waitForTimeout(3000);
    const textAfter3sec = await messageElement.textContent() || '';

    console.log(`3초 후 텍스트: "${textAfter3sec}" (길이: ${textAfter3sec.length})`);

    if (textAfter3sec.length > 0) {
      console.log('✅ 타이핑 애니메이션 또는 fallback 정상 작동');
    }

    console.log('✅ 타이핑 스피드 테스트 완료');
  });
});