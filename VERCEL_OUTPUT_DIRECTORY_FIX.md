# Vercel Output Directory 설정 문제 해결 (2026-05-02)

## 🚨 문제
```
Error: No Output Directory named "dist" found after the Build completed.
Configure the Output Directory in your Project Settings.
Alternatively, configure vercel.json#outputDirectory.
```

## ✅ 해결 방법

### 방법 1: vercel.json 설정 (완료)
```json
{
  "framework": "nextjs",
  "functions": {
    "api/[...path].js": {
      "maxDuration": 30
    }
  }
}
```

### 방법 2: Vercel 대시보드에서 설정 변경

**Vercel 프로젝트 설정을 확인해주세요:**

1. **Vercel Dashboard** → **프로젝트 선택** → **Settings** 탭
2. **General** 섹션에서 다음 설정 확인:
   - **Framework Preset**: `Next.js` 선택
   - **Build Command**: `npm run build` (기본값)
   - **Output Directory**: **비워두거나** `.next` 입력
   - **Install Command**: `npm install` (기본값)

3. **Next.js 프로젝트의 경우 Output Directory는 비워두는 것이 권장됩니다**
   - Next.js는 `.next` 폴더를 자동으로 사용
   - `dist` 폴더는 일반적으로 SPA나 정적 사이트용

### 방법 3: Environment Variables 확인
- `NEXT_PUBLIC_API_URL` 등 필요한 환경변수가 설정되어 있는지 확인

## 🔍 확인 사항

- ✅ `package.json`에 올바른 scripts 설정
- ✅ `next.config.js` 파일 존재
- ✅ `vercel.json`에 `"framework": "nextjs"` 추가
- ✅ 모든 페이지가 성공적으로 빌드됨 (22/22)

## 🎯 예상 결과
이 설정들로 Vercel 배포가 성공해야 합니다. 만약 여전히 문제가 있다면 Vercel 대시보드에서 **Output Directory를 완전히 비워두세요**.