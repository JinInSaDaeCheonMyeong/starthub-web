# Vercel 빌드 오류 해결 (2026-05-02)

## 문제
Vercel PR 빌드 시 `Command "npm run build" exited with 1` 오류 발생

## 원인
pages 폴더 내부의 style.ts 파일들을 Next.js가 페이지 컴포넌트로 인식

```
Build optimization failed: found pages without a React Component as default export in
pages/Bmc/BmcPage/style
pages/Chat/style
... 등
```

## 해결 방법

### 1. style 파일들을 별도 폴더로 이동
```bash
# src/styles/pages 폴더 생성
mkdir -p src/styles/pages

# style 파일들 이동
mv src/pages/Chat/style.ts src/styles/pages/Chat-style.ts
mv src/pages/SignUp/style.ts src/styles/pages/SignUp-style.ts
# ... 13개 style 파일 모두 이동
```

### 2. import 경로 수정
```typescript
// 기존
import * as S from "./style";

// 수정 후
import * as S from "@/styles/pages/Chat-style";
```

### 3. 이동된 파일 목록
- Chat-style.ts
- SignUp-style.ts
- Notice-style.ts
- SignIn-style.ts
- NoticeDetail-DetailContent-style.ts
- Bmc-BmcDetailPage-style.ts
- Bmc-BmcGeneratePage-style.ts
- Bmc-BmcPage-style.ts
- Main-MainContent-style.ts
- Main-style.ts
- Onboarding-early-style.ts
- Onboarding-pre-style.ts
- Onboarding-style.ts

## 결과
- ✅ 빌드 성공
- ✅ Vercel 배포 가능
- ⚠️ 일부 페이지 프리렌더링 경고 (QueryClient 관련) - 기능에는 영향 없음