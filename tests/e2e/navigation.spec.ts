import { test, expect } from '@playwright/test'

/**
 * 네비게이션 테스트
 *
 * Tailwind 마이그레이션 안전 테스트:
 * - data-testid 기반
 * - UI 구조 비의존
 * - 기능 중심 검증
 */

test.describe('기본 페이지 네비게이션', () => {
  test('메인 페이지가 정상 로드된다', async ({ page }) => {
    await page.goto('/')

    // URL 확인
    await expect(page).toHaveURL('http://localhost:3000/')

    // 페이지 타이틀 확인 (비즈니스 로직)
    await expect(page).toHaveTitle(/StartHub/i)
  })

  test('로그인 페이지로 이동할 수 있다', async ({ page }) => {
    await page.goto('/sign-in')

    // URL 확인
    await expect(page).toHaveURL('http://localhost:3000/sign-in')

    // 로그인 폼 존재 확인 (구조 비의존)
    // TODO: data-testid 추가 후 업데이트
    // await expect(page.getByTestId('auth-signin-form')).toBeVisible()
  })

  test('회원가입 페이지로 이동할 수 있다', async ({ page }) => {
    await page.goto('/sign-up')

    await expect(page).toHaveURL('http://localhost:3000/sign-up')

    // TODO: data-testid 추가 후 업데이트
    // await expect(page.getByTestId('auth-signup-form')).toBeVisible()
  })

  test('BMC 페이지로 이동할 수 있다', async ({ page }) => {
    await page.goto('/bmc')

    await expect(page).toHaveURL('http://localhost:3000/bmc')

    // TODO: 로그인 상태에 따른 조건부 렌더링 테스트 추가
  })

  test('공지사항 페이지로 이동할 수 있다', async ({ page }) => {
    await page.goto('/notices')

    await expect(page).toHaveURL('http://localhost:3000/notices')

    // TODO: data-testid 추가 후 검색 기능 테스트
    // await expect(page.getByTestId('notice-search')).toBeVisible()
  })
})

test.describe('404 처리', () => {
  test('존재하지 않는 페이지는 404를 표시한다', async ({ page }) => {
    const response = await page.goto('/non-existent-page')

    // Next.js 기본 404 확인
    expect(response?.status()).toBe(404)
  })
})