# Tailwind CSS 마이그레이션 계획 및 가이드

**프로젝트**: startHub-web  
**목표**: styled-components → Tailwind CSS 마이그레이션  
**기간**: 2일 (48시간)  
**현재 상태**: Tailwind 패키지 설치됨, styled-components 66개 파일 사용 중

---

## 📋 마이그레이션 현황

### 현재 스타일링 시스템

- **주요 라이브러리**: `styled-components` (v6.1.18)
- **스타일 파일**: 약 66개의 `style.ts` 파일
- **구조**:
  - `src/shared/ui/*/style.ts` - UI 컴포넌트 스타일
  - `src/entities/*/ui/*/style.ts` - 엔티티별 스타일
  - `src/styles/pages/*.ts` - 페이지 전체 스타일
  - `src/widgets/*/style.ts` - 위젯 스타일
  - `src/app/index.css` - 글로벌 리셋

### 이미 설치된 패키지

✅ `tailwindcss` (v4.2.4)  
✅ `@tailwindcss/postcss` (v4.2.4)  
✅ `postcss` (v8.5.13)  
✅ `autoprefixer` (v10.5.0)  
✅ `clsx` (v2.1.1) - 클래스 합치기용

---

## 🎯 마이그레이션 전략

### 방식: 점진적 마이그레이션 (Incremental)

한 번에 모든 파일을 변환하면 위험하므로, **우선순위 기반 단계적 진행**

### 우선순위 그룹핑

| Phase           | 그룹                   | 파일 수 | 난이도      | 예상 시간 |
| --------------- | ---------------------- | ------- | ----------- | --------- |
| 1️⃣ **Day 1 AM** | 설정 + 유틸            | -       | -           | 30분      |
| 1️⃣ **Day 1 AM** | 공유 UI (기본)         | 15개    | ⭐ Low      | 4시간     |
| 1️⃣ **Day 1 PM** | 공유 UI (복잡)         | 10개    | ⭐⭐ Medium | 3시간     |
| 2️⃣ **Day 2 AM** | 페이지/위젯/엔티티     | 25개    | ⭐⭐ Medium | 4시간     |
| 2️⃣ **Day 2 PM** | 글로벌 스타일 + 테스트 | -       | ⭐ Low      | 2시간     |

---

## 📅 Day 1 (첫째 날) - 기반 구축

### AM (오전) - 4시간

#### 1단계: Tailwind 설정 (30분)

```bash
# 1. tailwind.config.ts 생성
# 2. postcss.config.js 생성
# 3. src/app/globals.css 생성 (Tailwind directives)
# 4. index.css 통합
```

**작성할 파일**:

- `tailwind.config.ts` - Tailwind 커스텀 설정
- `postcss.config.js` - PostCSS 설정
- `src/app/globals.css` - 글로벌 Tailwind 스타일

#### 2단계: 유틸리티 함수 (30분)

```typescript
// src/shared/utils/cn.ts - clsx 기반 클래스 합치기
export const cn = (...classes: (string | undefined | null | false)[]): string =>
  classes.filter(Boolean).join(" ");
```

#### 3단계: 기본 UI 컴포넌트 변환 (3시간)

**쉬운 파일부터 시작 (기본 스타일만)**:

- `src/shared/ui/Button/style.ts` (1개 파일)
- `src/shared/ui/Card/style.ts` (1개 파일)
- `src/shared/ui/Badge/style.ts` (1개 파일)
- 등 총 15개 파일 (작은 컴포넌트)

**변환 방식**:

```typescript
// Before (styled-components)
export const Container = styled.div`
  display: flex;
  padding: 16px;
  border-radius: 8px;
  background-color: #f5f5f5;
`;

// After (Tailwind className)
export const Container = "flex p-4 rounded-lg bg-gray-100";
```

### PM (오후) - 3시간

#### 4단계: 중급 UI 컴포넌트 변환 (3시간)

**조금 더 복잡한 스타일** (조건부 스타일, 복잡한 레이아웃):

- `src/shared/ui/Modal/style.ts`
- `src/shared/ui/Form/style.ts`
- `src/widgets/Header/style.ts`
- 등 총 10개 파일

**조건부 스타일 처리**:

```typescript
// Before (styled-components with props)
export const StatusBadge = styled.span<{ status: string }>`
  padding: 8px 12px;
  background-color: ${props => props.status === 'active' ? '#00ff00' : '#ff0000'};
`;

// After (Tailwind with utility)
interface StatusBadgeProps {
  status: 'active' | 'inactive';
}

const getStatusClass = (status: string) =>
  status === 'active' ? 'bg-green-500' : 'bg-red-500';

// 컴포넌트에서 사용
<span className={cn('px-3 py-2', getStatusClass(status))}>
```

---

## 📅 Day 2 (둘째 날) - 마무리

### AM (오전) - 4시간

#### 5단계: 페이지/위젯/엔티티 스타일 변환 (3시간)

**복잡한 레이아웃 파일**:

- `src/styles/pages/*.ts` (15개)
- `src/widgets/*/style.ts` (5개)
- `src/entities/*/ui/*/style.ts` (10개)

**변환 체크리스트**:

- [ ] Flexbox/Grid 레이아웃 변환
- [ ] 반응형 스타일 (`md:`, `lg:`, `sm:` 등) 적용
- [ ] 미디어 쿼리 → Tailwind 반응형 접두사
- [ ] 애니메이션 → Tailwind animation 또는 CSS 별도 유지

#### 6단계: 동적 스타일 마이그레이션 (1시간)

styled-components의 props 기반 동적 스타일을 Tailwind로:

```typescript
// 전략: cn() 유틸과 조건부 로직 활용
const buttonClass = cn(
  "px-4 py-2 rounded-lg font-semibold",
  variant === "primary" && "bg-blue-500 text-white",
  variant === "secondary" && "bg-gray-200 text-gray-900",
  size === "sm" && "text-sm",
  size === "lg" && "text-lg px-6 py-3",
  disabled && "opacity-50 cursor-not-allowed",
);
```

### PM (오후) - 2시간

#### 7단계: 글로벌 스타일 최적화 (1시간)

- `src/app/index.css` 통합
- `globals.css` 최종 정리
- Tailwind 커스텀 설정 최적화 (색상, 폰트 등)

#### 8단계: 테스트 및 빌드 검증 (1시간)

```bash
# 빌드 확인
npm run build

# 타입 체크
npm run type-check

# E2E 테스트 (필요시)
npm run test:e2e
```

---

## 🛠 구체적 변환 가이드

### 1. 기본 스타일 변환

```typescript
// Before
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

// After
export const Container =
  "flex flex-col gap-4 p-5 bg-white rounded-xl shadow-md";
```

### 2. 반응형 스타일 변환

```typescript
// Before
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

// After
export const Grid =
  "grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 md:gap-3";
```

### 3. 조건부 스타일 변환

```typescript
// Before
export const Status = styled.div<{ active: boolean }>`
  padding: 8px 12px;
  color: ${(props) => (props.active ? "#00ff00" : "#ff0000")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
`;

// After
interface StatusProps {
  active: boolean;
}

const getStatusClass = ({ active }: StatusProps) =>
  cn(
    "px-3 py-2",
    active ? "text-green-500 font-bold" : "text-red-500 font-normal",
  );
```

### 4. 호버/포커스 상태 변환

```typescript
// Before
export const Button = styled.button`
  background: #007bff;
  color: white;

  &:hover {
    background: #0056b3;
  }

  &:active {
    transform: scale(0.98);
  }
`;

// After
export const Button =
  "bg-blue-500 text-white hover:bg-blue-700 active:scale-95 transition";
```

---

## 📊 파일 변환 체크리스트

### Day 1

- [ ] `tailwind.config.ts` 생성
- [ ] `postcss.config.js` 생성
- [ ] `src/app/globals.css` 생성
- [ ] `src/shared/utils/cn.ts` 생성
- [ ] 기본 UI 15개 파일 변환
- [ ] 중급 UI 10개 파일 변환

### Day 2

- [ ] 페이지 스타일 변환
- [ ] 위젯 스타일 변환
- [ ] 엔티티 UI 스타일 변환
- [ ] 글로벌 스타일 정리
- [ ] 빌드 테스트
- [ ] E2E 테스트 실행

---

## ⚠️ 주의사항

### 피해야 할 것

1. ❌ 모든 파일을 동시에 변환 (오류 추적 어려움)
2. ❌ styled-components 완전 제거 (먼저 병행 운영)
3. ❌ 커스텀 CSS 무시 (필요시 `@apply` 활용)
4. ❌ 테스트 없이 진행 (최소한 빌드 확인)

### 보존해야 할 것

1. ✅ 복잡한 애니메이션 (styled-components 유지 또는 별도 CSS)
2. ✅ 동적 계산 스타일 (JS 변수 필요시 `style` prop 사용)
3. ✅ 브라우저 호환성 (Tailwind의 autoprefixer 확인)

---

## 🔧 설정 파일 기본 구조

### tailwind.config.ts

```typescript
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 프로젝트 커스텀 색상
      },
      spacing: {
        // 커스텀 간격
      },
    },
  },
  plugins: [],
} satisfies Config;
```

### postcss.config.js

```javascript
export default {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### src/app/globals.css

```css
@import "tailwindcss";

/* 커스텀 글로벌 스타일 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  @apply bg-white text-gray-900;
}
```

---

## 📈 성공 지표

| 항목            | 목표                     |
| --------------- | ------------------------ |
| **파일 변환율** | 100% (66개 파일)         |
| **빌드 성공**   | ✅ `npm run build` 통과  |
| **타입 에러**   | 0개                      |
| **E2E 테스트**  | 모두 통과                |
| **성능**        | 번들 크기 감소 또는 유지 |

---

## 🚀 실행 명령어

### 설정 파일 생성 후

```bash
# 의존성 확인
npm list tailwindcss

# 빌드 테스트
npm run build

# 개발 서버 시작
npm run dev

# 타입 체크
npm run type-check
```

---

## 📝 마이그레이션 진행 기록

| 날짜     | 진행 상황       | 비고 |
| -------- | --------------- | ---- |
| Day 1 AM | 설정 + 기본 UI  | -    |
| Day 1 PM | 중급 UI         | -    |
| Day 2 AM | 페이지/위젯     | -    |
| Day 2 PM | 마무리 + 테스트 | -    |

---

## 💡 팁 및 트러블슈팅

### Tailwind 클래스가 먹지 않을 때

1. `tailwind.config.ts`의 `content` 경로 확인
2. PostCSS 설정 재확인
3. IDE 캐시 삭제 및 재시작

### 동적 클래스 생성 문제

```typescript
// ❌ 잘못된 방법 (Tailwind가 감지 불가)
const color = condition ? 'bg-red-500' : 'bg-blue-500';
className={`bg-${color}-500`}

// ✅ 올바른 방법 (모든 클래스를 미리 정의)
className={condition ? 'bg-red-500' : 'bg-blue-500'}
```

### styled-components와 Tailwind 혼용 시

```typescript
import styled from "styled-components";

// 필요한 부분만 styled-components 유지
export const ComplexAnimation = styled.div`
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

// 나머지는 Tailwind로
export const Container = "flex items-center justify-between";
```

---

## 📞 완료 후 체크

- [ ] 모든 styled-components 파일 변환 완료
- [ ] 빌드 성공 (`npm run build`)
- [ ] 개발 서버 정상 작동
- [ ] 타입 체크 통과
- [ ] E2E 테스트 통과
- [ ] 시각적 회귀 없음 (브라우저에서 확인)
- [ ] Bundle size 분석 (선택)
