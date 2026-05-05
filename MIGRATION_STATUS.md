# Next.js Migration Status

## 📅 작업 일자: 2026-04-27 ~ 2026-05-02

## ✅ 완료된 작업

### 1. Next.js 기본 설정
- [x] package.json Next.js 의존성 설치
  - next@14.2.18
  - React 18.3.1로 다운그레이드 (Next.js 호환성)
  - eslint-config-next 추가
- [x] next.config.js 생성 및 설정
  - Styled Components SSR 지원
  - SVG 처리를 위한 SVGR 설정
  - API 프록시 설정
- [x] tsconfig.json Next.js용 설정으로 업데이트
  - Path alias 유지
  - Next.js 플러그인 추가
- [x] .gitignore Next.js 빌드 파일 추가
  - .next/
  - out/
  - next-env.d.ts

### 2. App Router 구조 생성 (FSD 아키텍처 준수)
- [x] src/app/ 디렉토리 생성
- [x] layout.tsx - 루트 레이아웃
- [x] providers.tsx - React Query, Styled Components 프로바이더
- [x] src/lib/registry.tsx - Styled Components SSR 레지스트리

### 3. 마이그레이션 완료된 페이지 ✅ (22/22 완료!) 🎉
- [x] `/` - 메인 페이지
- [x] `/sign-in` - 로그인 페이지
- [x] `/sign-up` - 회원가입 페이지
- [x] `/bmc` - BMC 목록 페이지
- [x] `/bmc/[id]` - BMC 상세 페이지
- [x] `/bmc/generate` - BMC 생성 페이지
- [x] `/notices` - 공지사항 목록 페이지
- [x] `/notices/[type]` - 공지사항 타입별 목록
- [x] `/notice/[id]` - 공지사항 상세
- [x] `/onboarding` - 온보딩 메인
- [x] `/onboarding/early-startup` - 초기 스타트업 온보딩
- [x] `/onboarding/pre-startup` - 예비 창업자 온보딩
- [x] `/my-profile` - 내 프로필
- [x] `/my-profile-edit` - 프로필 수정
- [x] `/oauth/callback` - OAuth 콜백
- [x] `/oauth/fail` - OAuth 실패
- [x] `/like-list` - 좋아요 목록
- [x] `/competitor` - 경쟁사 분석 목록
- [x] `/competitor/create` - 경쟁사 생성
- [x] `/competitor/analysis` - 경쟁사 분석
- [x] `/competitor/bmc-selection` - BMC 선택
- [x] `/chat` - AI 채팅

### 4. 개발 환경 테스트
- [x] npm run dev 정상 실행 확인
- [x] http://localhost:3001 접속 가능

### 5. Vercel 배포 빌드 오류 해결 (2026-05-02)
- [x] TypeScript strict mode 오류 해결
  - useParams, useSearchParams, usePathname null 처리
  - 옵셔널 체이닝 적용 (9개 파일)
- [x] 이미지 StaticImageData 타입 오류 수정
  - .src 속성 접근 처리 (3개 파일)
- [x] TypeScript import 확장자 오류 수정
- [x] 불필요한 파일 제거
  - App.tsx (Next.js에서 불필요)
  - main.tsx (Next.js에서 불필요)
  - vite.config.ts (Next.js에서 불필요)
- [x] SVG 파일명 특수문자 제거 (default=business.svg → default-business.svg)
- [x] npm run build 성공 확인
- [x] 빌드 오류 해결 문서화 (VERCEL_BUILD_ISSUES.md)

### 6. 추가 기능 구현
- [x] BMC 페이지 TypeHangul → react-type-animation 마이그레이션
- [x] BMC 메시지 플리커링 이슈 해결
- [x] BMC API 실패시 fallback 질문 처리
- [x] 회원가입 폼 안정성 개선
- [x] Playwright E2E 테스트 작성 (34/45 테스트 통과)

## 🔄 진행 중인 작업
- 없음

## ❌ 남은 작업

### 1. ~~페이지 마이그레이션~~ ✅ 완료! (2026-05-02)
모든 22개 페이지 마이그레이션 완료

### 2. ~~라우팅 및 네비게이션~~ ✅ 완료!
- [x] React Router 완전 제거 (의존성 제거 완료)
- [x] next/link로 모든 Link 컴포넌트 교체
- [x] useRouter (React Router) → useRouter (Next.js) 교체
- [x] 동적 라우트 파라미터 처리 (params.id 등)

### 3. 인증 및 미들웨어
- [ ] middleware.ts 생성
- [ ] 인증이 필요한 페이지 보호
- [ ] 로그인 리다이렉션 처리

### 4. API 및 데이터 페칭
- [ ] 서버 컴포넌트 적용 (SEO 중요 페이지)
- [ ] React Query → 서버 컴포넌트 + 클라이언트 캐싱 전환
- [ ] API Routes 필요시 구현

### 5. 최적화
- [ ] Image 컴포넌트로 이미지 최적화
- [ ] 동적 임포트 적용
- [ ] 메타데이터 설정 (각 페이지별)

### 6. 스타일링 (다른 개발자 담당 예정)
- [ ] Styled Components → Tailwind CSS 마이그레이션

### 7. ~~빌드 및 배포~~ ✅ 완료!
- [x] npm run build 테스트 ✅ 성공
- [x] Vercel 배포 설정 (이미 배포 중)
- [x] 환경변수 마이그레이션 (이미 설정됨)
- [x] 도메인 설정 (start-hub.kr 이미 연결됨)

## 📝 주요 변경사항

### 폴더 구조 변경
```
Before (React + Vite):
src/
  pages/        # 페이지 컴포넌트
  app/
    router.tsx  # React Router 설정

After (Next.js):
src/
  app/          # Next.js App Router
    page.tsx    # 라우팅 페이지
  pages/        # 기존 페이지 컴포넌트 (재사용)
```

### 라우팅 방식 변경
- React Router DOM → Next.js App Router
- 파일 기반 라우팅 시스템
- 동적 라우트: `[param]` 폴더 구조

## ⚠️ 주의사항

1. **'use client' 디렉티브**: 클라이언트 컴포넌트에 필수
2. **React 버전**: 19.0.0 → 18.3.1 (Next.js 호환성)
3. **Path Alias**: tsconfig.json 설정 유지됨
4. **Styled Components**: 임시 SSR 지원만 구현 (추후 Tailwind 마이그레이션)
5. **빌드 파일**: .next/ 폴더는 git에서 제외
6. **Next.js 14 Router Hooks**: 모두 null을 반환할 수 있으므로 옵셔널 체이닝 필수
7. **이미지 import**: StaticImageData 타입이므로 .src 속성 접근 필요
8. **TypeScript imports**: 파일 확장자 제거 필요

## 🚀 다음 작업 시작하기

```bash
# 개발 서버 시작
npm run dev

# 빌드 테스트
npm run build

# 프로덕션 실행
npm start
```

## 📊 진행률
- 전체 페이지: **22/22 완료 (100%)** ✅
- 핵심 기능: 기본 설정 완료, **빌드 성공** ✅
- 페이지 마이그레이션: **완료**

## 🔧 트러블슈팅 문서
- `VERCEL_BUILD_ISSUES.md` - Vercel 배포 빌드 오류 해결 가이드
- 모든 빌드 오류 해결 완료 (2026-05-02)