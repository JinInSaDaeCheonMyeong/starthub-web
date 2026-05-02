# Vercel 배포 빌드 오류 해결 가이드

## 발생한 문제들과 해결 방안

### 1. 메인 문제: App.tsx 모듈 오류
```
./src/app/App.tsx:2:20 Type error: Cannot find module '@/app/router'
```

**해결 방법:**
- `/src/app/App.tsx` 파일 삭제 (Next.js에서 불필요)
- `/src/main.tsx` 파일도 삭제 (Next.js에서 불필요)

### 2. TypeScript 엄격 모드 오류들

#### A. useParams() 및 useSearchParams() null 처리
**문제:** Next.js 14에서 이들 Hook이 null을 반환할 수 있음

**해결된 파일들:**
- `/src/features/auth/oauth/model/useOAuthCallback.ts:19`
- `/src/features/bmc/detail/hooks/useBmcData.ts:8`
- `/src/pages/Callback/OAuthFail.tsx:11`
- `/src/pages/Chat/index.tsx:28`
- `/src/pages/Competitor/Create/index.tsx:41`
- `/src/pages/CompetitorAnalysis/index.tsx:10`
- `/src/pages/NoticeDetail/index.tsx:9-10`
- `/src/pages/NoticeListUp/index.tsx:37-38`

**해결 패턴:**
```typescript
// 기존 (오류)
const { id } = useParams();
const sessionIdParam = searchParams.get("sessionId");

// 수정 후
const params = useParams();
const id = params?.id;
const sessionIdParam = searchParams?.get("sessionId");
```

#### B. 이미지 StaticImageData 타입 오류
**문제:** Next.js에서 이미지 import시 StaticImageData 객체 반환

**해결된 파일들:**
- `/src/features/profile/users/profileForm/ui/NotMyPage/index.tsx:8`
- `/src/shared/ui/Banner/index.tsx:6`
- `/src/shared/ui/CompetitorBmcCard/index.tsx:23`

**해결 패턴:**
```typescript
// 기존 (오류)
<img src={NoUser} />

// 수정 후
<img src={NoUser.src} />
```

#### C. 파일 확장자 import 오류
**문제:** TypeScript에서 `.ts` 확장자 명시적 import 금지

**해결된 파일:**
- `/src/features/bmc/stepNavigate/ui/index.tsx:2-3`

**해결 방법:**
```typescript
// 기존 (오류)
import * as I from "@/assets/icons/bmc/index.ts";
import { useBmcStore } from "@/entities/bmc/model/useBmcStore.ts";

// 수정 후
import * as I from "@/assets/icons/bmc/index";
import { useBmcStore } from "@/entities/bmc/model/useBmcStore";
```

#### D. 잘못된 배열 구조분해
**문제:** useSearchParams()가 배열이 아니라 객체 반환

**해결된 파일:**
- `/src/pages/Competitor/Create/index.tsx:38`

**해결 방법:**
```typescript
// 기존 (오류)
const [searchParams] = useSearchParams();

// 수정 후
const searchParams = useSearchParams();
```

#### E. usePathname() null 처리
**문제:** usePathname()도 null을 반환할 수 있음

**해결된 파일:**
- `/src/shared/ui/Layout/index.tsx:19`

**해결 방법:**
```typescript
// 기존 (오류)
const path = pathname;

// 수정 후
const path = pathname || '';
```

#### F. 불필요한 Vite/React 설정 파일 제거
**제거된 파일들:**
- `/src/app/App.tsx` (Next.js에서 불필요)
- `/src/main.tsx` (Next.js에서 불필요)
- `vite.config.ts` (Next.js에서 불필요)

### 3. 빌드 성공 확인 명령어
```bash
npm run build
```

**✅ 최종 결과:** 빌드 성공! TypeScript 컴파일 완료됨

### 4. 경고 사항
- Google Fonts CSS 최적화 실패 경고는 빌드에 영향 없음
- style 폴더들이 페이지로 인식되는 경고는 기능에 영향 없음
- TypeScript 오류는 반드시 모두 해결해야 빌드 성공

### 5. 앞으로 주의사항
1. Next.js 14에서는 모든 라우터 Hook이 null을 반환할 수 있으므로 항상 옵셔널 체이닝 사용
2. 이미지 import시 `.src` 속성 접근 필수
3. TypeScript import에서 파일 확장자 제거
4. Next.js App Router에서는 `App.tsx`나 `main.tsx` 불필요

## 최종 상태
모든 TypeScript 오류 해결 완료. Vercel 배포 준비 완료.