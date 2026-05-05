# 🎯 Tailwind-Safe 테스트 컨벤션

## ⚠️ 중요: Tailwind CSS 마이그레이션 대비

이 문서는 향후 Tailwind CSS 마이그레이션 시에도 테스트가 깨지지 않도록 하는 규칙입니다.

## ✅ 반드시 따라야 할 규칙

### 1. Selector 규칙

#### ❌ 절대 사용 금지
```typescript
// 클래스명 기반 selector
await page.click('.btn-primary')
await page.locator('.card-container')

// DOM 구조 의존
await page.click('div > div > button')

// 스타일 속성 검증
await expect(element).toHaveCSS('background-color', 'blue')
```

#### ✅ 반드시 사용
```typescript
// data-testid 사용
await page.getByTestId('login-button').click()
await page.getByTestId('user-card').isVisible()

// Role 기반 selector (접근성도 개선)
await page.getByRole('button', { name: '로그인' }).click()
await page.getByRole('navigation').isVisible()

// Text 기반 (변경 가능성 낮은 경우만)
await page.getByText('회원가입').click()
```

### 2. data-testid 네이밍 규칙

```typescript
// 형식: [페이지]-[컴포넌트]-[액션]
data-testid="auth-login-button"
data-testid="bmc-card-delete"
data-testid="notice-list-item"
```

### 3. 테스트 작성 원칙

#### 사용자 플로우 중심
```typescript
test('사용자가 로그인할 수 있다', async ({ page }) => {
  // 1. 로그인 페이지 방문
  await page.goto('/sign-in')

  // 2. 폼 입력 (data-testid 사용)
  await page.getByTestId('auth-email-input').fill('user@test.com')
  await page.getByTestId('auth-password-input').fill('password123')

  // 3. 제출
  await page.getByTestId('auth-login-button').click()

  // 4. 결과 확인 (URL, 콘텐츠 존재 여부)
  await expect(page).toHaveURL('/dashboard')
  await expect(page.getByTestId('user-profile')).toBeVisible()
})
```

#### UI 세부사항 테스트 금지
```typescript
// ❌ BAD - Tailwind 변경 시 깨짐
expect(button).toHaveClass('bg-blue-500')
expect(container).toHaveCSS('display', 'flex')

// ✅ GOOD - 기능 테스트
expect(button).toBeEnabled()
expect(container).toBeVisible()
```

## 📝 실제 적용 예시

### 1. 컴포넌트에 data-testid 추가
```tsx
// src/features/auth/signIn/ui/SignInForm/index.tsx
export default function SignInForm() {
  return (
    <form data-testid="auth-signin-form">
      <input
        data-testid="auth-email-input"
        type="email"
        placeholder="이메일"
      />
      <input
        data-testid="auth-password-input"
        type="password"
        placeholder="비밀번호"
      />
      <button data-testid="auth-login-button">
        로그인
      </button>
    </form>
  )
}
```

### 2. 테스트 작성
```typescript
// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test'

test.describe('인증 플로우', () => {
  test('로그인 성공', async ({ page }) => {
    await page.goto('/sign-in')

    // data-testid로만 요소 선택
    const emailInput = page.getByTestId('auth-email-input')
    const passwordInput = page.getByTestId('auth-password-input')
    const loginButton = page.getByTestId('auth-login-button')

    await emailInput.fill('test@example.com')
    await passwordInput.fill('password123')
    await loginButton.click()

    // 성공 확인
    await expect(page).toHaveURL('/')
  })
})
```

## 🚨 체크리스트

테스트 작성 전 확인:
- [ ] data-testid를 사용했는가?
- [ ] 클래스명 selector를 사용하지 않았는가?
- [ ] DOM 구조에 의존하지 않았는가?
- [ ] 스타일/CSS 검증을 하지 않았는가?
- [ ] 사용자 관점에서 테스트했는가?

## 💡 팁

1. **Visual Regression 테스트는 별도로**
   - 스크린샷 비교는 Tailwind 후에 재설정
   - 핵심 기능 테스트와 분리

2. **API Mocking**
   - MSW 사용 시 스타일과 무관한 데이터만 검증

3. **접근성 테스트**
   - Role 기반 selector는 접근성도 개선

## 📌 이 규칙을 따르면

✅ Tailwind 마이그레이션 시 테스트 수정 최소화
✅ 유지보수 비용 감소
✅ 안정적인 CI/CD 파이프라인
✅ 개발자 간 일관성