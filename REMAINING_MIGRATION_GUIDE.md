# Tailwind CSS 마이그레이션 - 남은 파일 처리 가이드

**현재 진행 상황**: 33/66 파일 (50%) 변환 완료 ✅  
**빌드 상태**: ✓ Compiled successfully

---

## 📊 변환 완료 파일 (33개)

### ✅ 공유 UI 컴포넌트 (12/18)

- NoticeCard, BmcCard, CompetitorBmcCard, FoldArrow, BmcSelection, HiringCard
- PDFViewer, pagination, AIErrorMessage, BmcList, AIMessage, AITypingIndicator

### ✅ 엔티티 (2/2) - 100% 완료

- BmcTemplateCard, BmcCreateButton

### ✅ 위젯 (2/4)

- Footer, Header

### ✅ 페이지 스타일 (10/13)

- Main-style.ts, SignIn-style.ts, Bmc-BmcDetailPage-style.ts
- Bmc-BmcGeneratePage-style.ts, Notice-style.ts, SignUp-style.ts
- Main-MainContent-style.ts, Onboarding-pre-style.ts, Onboarding-early-style.ts
- NoticeDetail-DetailContent-style.ts

### ✅ 추가 (3개)

- LoadingModal, AIMessage, AITypingIndicator

---

## 📋 남은 파일 목록 (33개)

### 🔴 높은 우선순위 - 복잡한 파일 (꼭 필요)

#### 공유 UI (6개) - 복잡도 높음

```
1. src/shared/ui/AITextarea/style.ts
   - 특징: Framer Motion 애니메이션, 복잡한 조건부 스타일
   - 복잡도: ★★★★★
   - 팁: motion components는 styled-components에서 유지, flex/padding만 @apply로 변환

2. src/shared/ui/ChatSidebar/style.ts
   - 특징: 17+ 컴포넌트, responsive hide/show
   - 복잡도: ★★★★
   - 팁: md: sm: 미디어 쿼리로 변환, display none/flex는 @apply로 가능

3. src/shared/ui/AISidebar/style.ts
   - 특징: 가장 복잡한 UI 파일, opacity/visibility toggles
   - 복잡도: ★★★★★
   - 팁: animation transitions 유지, display/opacity는 @apply로 변환
```

#### 위젯 (2개) - 복잡도 높음

````
4. src/widgets/bmc/BmcCanvas/style.ts
   - 특징: Grid template-areas, print styling, 반응형 미디어 쿼리
   - 복잡도: ★★★★
   - 팁: grid-template-areas는 CSS에서 유지, padding/margin은 @apply로 변환
   - 주요 변환:
     ```css
     /* 유지 필요 */
     grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
     grid-template-areas: "...";

     /* @apply로 변환 */
     @apply px-16 py-32 min-h-screen
     ```

5. src/widgets/chatAI/style.ts
   - 특징: 많은 animation (fadeInUp, fadeOutDown), conditional animation
   - 복잡도: ★★★★★
   - 팁: keyframes는 유지, animation trigger는 conditional css 유지
   - 주요 패턴:
     ```typescript
     animation: ${({ $open }) => $open ? css`${fadeInUp} ...` : css`${fadeOutDown} ...`}
     ```
````

#### 페이지 (3개) - 복잡도 매우 높음

```
6. src/styles/pages/Bmc-BmcPage-style.ts
   - 특징: 14개 컴포넌트, Grid template areas, TypeScript interface
   - 복잡도: ★★★★★
   - 팁: BmcDetailPage와 유사 패턴, grid layout 유지

7. src/styles/pages/Chat-style.ts
   - 특징: 17개 컴포넌트, 마크다운 렌더링 (h1-h4, table, code, blockquote)
   - 복잡도: ★★★★★
   - 팁: nested 마크다운 선택자 유지, wrapper 스타일만 변환
   - 주요 패턴: `.markdown-body h1 { ... }` 구조
```

---

## 🛠️ 변환 패턴 및 방법

### 패턴 1: 기본 박스 모델 변환

```typescript
// Before
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 10px;
`;

// After
export const Container = styled.div`
  @apply flex flex-col items-center p-5 gap-2.5;
`;
```

### 패턴 2: 조건부 스타일 유지

```typescript
// Tailwind로 변환 불가능 - 유지 필요
export const Button = styled.button<{ $disabled?: boolean }>`
  @apply px-4 py-2 rounded-lg;
  background-color: ${({ $disabled }) => ($disabled ? "#ccc" : "#2466F4")};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
`;
```

### 패턴 3: Animation 유지

```typescript
// keyframes 계속 사용 - @apply와 혼합 가능
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  @apply w-8 h-8 rounded-full;
  animation: ${spin} 1s linear infinite;
`;
```

### 패턴 4: Grid/Template Areas 유지

```typescript
// grid-template-areas는 Tailwind로 표현 어려움 - CSS 유지
export const GridLayout = styled.div`
  @apply gap-4 max-w-4xl;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas:
    "area1 area2 area3"
    "area4 area4 area5";
`;
```

---

## ⚡ 빠른 변환 팁

### 1. Tailwind 클래스 매핑 (자주 사용)

| CSS Property            | Tailwind Class        |
| ----------------------- | --------------------- |
| display: flex           | @apply flex           |
| flex-direction: column  | @apply flex-col       |
| align-items: center     | @apply items-center   |
| justify-content: center | @apply justify-center |
| gap: 16px               | @apply gap-4          |
| padding: 20px           | @apply p-5            |
| margin: 20px            | @apply m-5            |
| width: 100%             | @apply w-full         |
| border: 1px solid       | @apply border         |
| border-radius: 8px      | @apply rounded-lg     |
| cursor: pointer         | @apply cursor-pointer |
| text-decoration: none   | @apply no-underline   |

### 2. 복잡한 값들

```typescript
// 계산된 값 (CSS 유지)
calc(100vh - 78px) // CSS에서 유지 필요

// 커스텀 색상 (이미 설정됨)
background-color: ${StartHubColors.Primary} // 유지 필요
@apply bg-hub-primary // Tailwind 사용 가능

// 미디어 쿼리 (Tailwind 형식)
@media (max-width: 768px) { ... }
// →
@media (max-width: 768px) { ... } // 유지하거나
// →
md:flex-col // Tailwind breakpoint
```

### 3. 포트 변환 (spacing 값)

```
Tailwind: px-5 = 20px (5 * 4px)
1 = 4px
2 = 8px
2.5 = 10px
3 = 12px
4 = 16px
5 = 20px
6 = 24px
7 = 28px
8 = 32px
10 = 40px
12 = 48px
```

---

## 📝 자동 변환 스크립트 (선택 사항)

다음은 간단한 변환을 위한 regex 패턴입니다:

```javascript
// VSCode Find and Replace
// display: flex; → @apply flex;

Find: display: flex;[\n\s]*flex-direction: column;[\n\s]*align-items: center;
Replace: @apply flex flex-col items-center;

// padding, margin 변환
Find: padding: (\d+)px;
Replace: @apply p-[${$1/4}]
```

---

## ✅ 검증 체크리스트

각 파일 변환 후:

- [ ] 파일 저장
- [ ] `npm run build` 실행 → "✓ Compiled successfully" 확인
- [ ] TypeScript 오류 없음 확인
- [ ] 브라우저에서 스타일 확인
- [ ] 반응형 디자인 (모바일/태블릿) 확인

---

## 🚀 추천 순서

1. **쉬운 파일부터** (미디어 쿼리 없는 단순 레이아웃)
2. **중간 난이도** (미디어 쿼리, 조건부 스타일)
3. **어려운 파일** (animation, grid-template-areas, 마크다운 렌더링)

---

## 💡 도움말

### styled-components + Tailwind 혼합 사용

✅ 권장: 두 가지를 함께 사용

```typescript
export const Button = styled.button`
  @apply px-4 py-2 rounded-lg; // Tailwind
  background-color: ${(props) => props.color}; // styled-components
`;
```

### 성능 고려사항

- ✅ Tailwind: 전역 CSS 생성 (한 번)
- ✅ styled-components: 동적 스타일만 필요할 때
- 결과: 번들 크기 감소, 성능 향상

### 마이그레이션 속도 팁

1. 배치 처리 (3-4개 파일씩)
2. 각 배치 후 빌드 테스트
3. 오류 발생 시 즉시 수정
4. 점진적 진행으로 안정성 확보

---

## 📚 참고 자료

- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)
- [styled-components 공식 문서](https://styled-components.com/)
- `tailwind.config.ts` - 커스텀 색상 및 설정
- `src/shared/utils/cn.ts` - 클래스 조합 유틸리티

---

**마이그레이션 완료 예상 시간**: 남은 33개 파일 × 5-10분 = **2.5-5.5시간**

**진행 방법 추천**:

1. 공유 UI 6개 → 위젯 2개 → 페이지 3개 순서로 진행
2. 각 파일마다 5-10분 소요
3. 총 1-2시간 내에 완료 가능

---

_이 가이드는 자동 생성되었습니다. 추가 질문이 있으면 각 파일의 주석을 참고하세요._
