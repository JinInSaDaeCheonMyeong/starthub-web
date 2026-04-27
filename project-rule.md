# StartHub FSD Architecture Rules (Next.js Migration)

> This document defines the folder structure, naming conventions, and code organization rules for the StartHub project.  
> AI agents MUST follow these rules strictly when generating or modifying any code.

---

## 1. Project Structure Overview

```
src/
  app/        # Routing & page entry (Next.js App Router)
  shared/     # Globally reusable code
  entities/   # Data-centric models + their display UI
  features/   # User action / business logic units
  widgets/    # Composed UI blocks (combining entities + features)
```

---

## 2. Layer Rules

### `app/`

- Purpose: Routing and page entry only (Next.js App Router)
- Each page file MUST be minimal — assemble components, no business logic
- ALLOWED: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`
- NOT ALLOWED: component files, hooks, or logic inside `app/`

```
✅ app/notice/page.tsx
✅ app/bmc/page.tsx

❌ app/notice/NoticeCard.tsx
❌ app/main/useMainLogic.ts
```

```tsx
// ✅ Correct page.tsx
export default function NoticePage() {
  return <NoticeList />
}
```

---

### `shared/`

- Purpose: Reusable code with NO domain-specific logic
- Sub-folders: `ui/`, `model/`, `lib/`, `config/`
- Rules: strictest layer — reject any domain-specific code

| Sub-folder | Purpose | ✅ Example | ❌ Example |
|---|---|---|---|
| `ui/` | Generic UI components | `Button.tsx`, `Input.tsx`, `Modal.tsx` | `NoticeCard.tsx`, `UserProfile.tsx` |
| `model/` | Generic hooks | `useToggle.ts`, `useDebounce.ts` | `useNotice.ts`, `useAuth.ts` |
| `lib/` | Pure utility functions | `formatDate.ts`, `cn.ts` | `noticeFormatter.ts` |
| `config/` | Global constants/config | `breakpoints.ts`, `theme.ts` | `noticeConfig.ts` |

---

### `entities/`

- Purpose: Data model definition + UI to display that data
- Sub-folders: `ui/`, `model/`, `api/`
- Rules: always domain-scoped (e.g., `entities/notice/`, `entities/user/`)

```
✅ entities/notice/ui/NoticeCard.tsx
✅ entities/notice/model/notice.ts
✅ entities/notice/api/getNotice.ts
✅ entities/user/model/user.ts

❌ entities/ui/Button.tsx       → belongs in shared/ui
❌ entities/hooks/useModal.ts   → belongs in shared/model
❌ entities/api/commonApi.ts    → no cross-domain API files
```

---

### `features/`

- Purpose: User action units — contains business logic
- Sub-folders: `ui/`, `model/`, `api/`
- Rules: named after user actions (e.g., `auth/login`, `like`, `search`)

```
✅ features/auth/model/useLogin.ts
✅ features/auth/ui/LoginForm.tsx
✅ features/auth/api/login.ts
✅ features/like/ui/LikeButton.tsx
✅ features/search/model/useSearch.ts

❌ features/ui/Button.tsx         → belongs in shared/ui
❌ features/constants/colors.ts   → belongs in shared/config
❌ features/api/commonApi.ts      → no cross-domain API files
```

---

### `widgets/`

- Purpose: Composed UI blocks combining entities and features
- Sub-folders: `ui/` only
- Rules: combines multiple pieces; no standalone primitives

```
✅ widgets/header/ui/Header.tsx
✅ widgets/sidebar/ui/Sidebar.tsx
✅ widgets/notice-list/ui/NoticeList.tsx

❌ widgets/Button.tsx    → too primitive
❌ widgets/useAuth.ts    → logic does not belong in widgets
```

---

## 3. Internal Folder Structure (per domain)

Every domain follows this base structure:

```
feature-name/
  ui/
  model/
  api/
  lib/       # optional: domain-specific utilities
```

### Full Example

```
entities/user/
  ui/
    user-card/
      index.tsx
      style.ts
  model/
    user.ts
  api/
    get-user/
      index.ts

features/auth/
  ui/
    login-form/
      index.tsx
      style.ts
  model/
    use-login/
      index.ts
  api/
    login/
      index.ts
```

---

## 4. File Naming Rules

### Folders: kebab-case

```
✅ user-card/
✅ use-login/
✅ get-user/

❌ UserCard/
❌ useLogin/
```

### Components: `index.tsx` + `style.ts` inside a folder

```
✅ user-card/
     index.tsx
     style.ts

❌ user-card/
     user-card.tsx    (redundant nesting)
     style2.ts        (multiple style files)
```

### Single-purpose files: flat file, no folder

```
✅ shared/lib/format-date.ts
✅ entities/notice/model/notice.ts

❌ shared/lib/format-date/index.ts   (unnecessary folder for a single function)
```

### `index.tsx` Rules

- ONE default export per file
- Must be the entry point of the component/hook, not a barrel re-export

```tsx
// ✅ Correct
export default function UserCard() {
  return <div>...</div>
}

// ❌ Incorrect — mixing multiple components
export const A = () => {}
export const B = () => {}
```

### `style.ts` Rules

- Style declarations ONLY — no logic, no API calls

```tsx
// ✅ Correct
import styled from 'styled-components'
export const Container = styled.div`display: flex;`

// ❌ Incorrect — contains logic
const data = fetchSomething()
export const Container = styled.div``
```

---

## 5. Function & Hook Naming Rules

### Hooks (React state/logic)

- MUST start with `use`, camelCase

```ts
✅ useLogin, useUserInfo, useDebounce, useToggle
❌ loginHook, getUserHook, UserHook
```

### API / Util functions

- MUST start with a verb, camelCase

```ts
// API
✅ getUser, createUser, updateUser, deleteUser
❌ userApi, callUser

// Util
✅ formatDate, parsePrice, calculateTotal
❌ dateFunc, priceThing, calc
```

### Event handlers (inside components)

- MUST use `handle` or `on` prefix

```ts
✅ handleClick, handleSubmit, onChangeInput
❌ click, submitData, inputChange
```

### Async functions

- Use action verbs; be explicit (`fetch`, `get`, `create`)

```ts
✅ getNoticeList, fetchUserData, createComment
❌ asyncData, loadStuff
```

### Forbidden names

```ts
❌ doSomething, handleThing, processData   // too vague
```

---

## 6. Layer Placement Decision Guide

When deciding where to place a file, answer these questions in order:

| Question | Yes → Place in |
|---|---|
| Reused across multiple domains with NO domain logic? | `shared/` |
| Represents a data model or its display UI? | `entities/` |
| Represents a user action or business logic? | `features/` |
| Combines multiple entities/features into a UI block? | `widgets/` |
| Page entry point only? | `app/` |

### Conflict Resolution

- When in doubt between `shared` and `entities` → use **`entities`**
- `shared` is the strictest layer — only truly generic code belongs here
- Structure is expected to evolve; refactor as patterns become clear

---

## 7. Core Principles (Summary)

1. `app/` — assemble only, no logic or UI definitions
2. `shared/` — strictest layer, zero domain-specific code
3. `entities/` — data + its representation
4. `features/` — user actions + business logic
5. `widgets/` — composed blocks from entities and features
6. Folder = one functional unit
7. `index` = entry point only, not a barrel file
8. Name → role must be obvious at a glance