# Pages 폴더 이름 변경 (2026-05-02)

## 문제
Next.js가 `src/pages` 폴더를 자동으로 Pages Router로 인식하여 빌드 오류 발생
- App Router 사용 중인데 Pages Router로 오인식
- 컴포넌트 파일들이 페이지로 처리됨

## 해결
`src/pages` → `src/page-components`로 폴더명 변경

## 변경사항
1. 폴더명 변경: `mv src/pages src/page-components`
2. Import 경로 업데이트: `@/pages/` → `@/page-components/`
3. tsconfig.json paths 업데이트
4. 총 42개 파일의 import 경로 수정

## 결과
✅ 빌드 성공
✅ Vercel 배포 가능