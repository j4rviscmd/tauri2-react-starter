# tauri2-react-starter

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![Built with Tauri](https://img.shields.io/badge/Built%20with-Tauri-24C8DB)
![React + Vite + TS](https://img.shields.io/badge/React%20%2B%20Vite-TypeScript-2ea44f)
[![CI](https://github.com/<owner>/<repo>/actions/workflows/ci.yml/badge.svg)](https://github.com/<owner>/<repo>/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/<owner>/<repo>?label=release)](https://github.com/<owner>/<repo>/releases)

## Directory Structure (Co-location)

We use a **feature-based, co-located** folder strategy.

```txt
src/
  ├── app/                      # Application wiring
  │   ├── routes/               # React Router v7 route definitions
  │   ├── providers/            # Global providers
  │   ├── store/                # Redux store configuration
  │   └── layout/               # App-level layout
  ├── pages/                    # Route-level screens
  │   ├── todo/
  │   │   └── index.tsx
  │   └── login/
  │       └── index.tsx
  ├── features/                 # Feature modules
  │   ├── tasks/
  │   │   ├── ui/               # TaskCard, TaskList, TaskDetailPanel, etc.
  │   │   ├── model/            # todoSlice, todoThunks, todoSelectors
  │   │   ├── hooks/            # useTodo, useTodoInit, useTaskDrag
  │   │   ├── api/              # firestoreApi
  │   │   ├── lib/              # taskUtils, lexoSafe
  │   │   ├── types.ts
  │   │   └── index.ts          # Public API
  │   ├── auth/
  │   │   ├── ui/
  │   │   ├── model/
  │   │   ├── hooks/
  │   │   ├── api/
  │   │   └── index.ts
  │   └── calendar/
  │       ├── ui/
  │       ├── hooks/
  │       ├── api/
  │       └── index.ts
  ├── shared/                   # Shared resources
  │   ├── ui/                   # shadcn/ui (after components.json update)
  │   ├── hooks/                # useToast, useMediaQuery, etc.
  │   ├── animate-ui/           # animate-ui components
  │   ├── design-system/        # Glassmorphism primitives
  │   ├── lib/                  # cn(), helper, etc.
  │   ├── api/                  # Shared API infrastructure
  │   ├── config/               # Environment variables, constants
  │   └── types/                # Shared type definitions
  └── index.tsx                 # Entry point
```

### Directory Responsibilities

#### `src/app/`

Application wiring at the root level. This is where the application is assembled:
routing definitions, global providers, store setup, and app-wide layout.

- `src/app/routes/`
  React Router v7 **route objects** live here (the mapping from paths to pages/layouts).

- `src/app/providers/`
  Global providers (e.g., Redux `<Provider>`, router provider, theming, etc.).

- `src/app/store/`
  Redux Toolkit store configuration (`configureStore`), root reducer setup, and
  app-wide store-related wiring.

- `src/app/layout/`
  App-level layout components (application shell, navigation layout, etc.).

#### `src/pages/`

Route-level screens. Pages should mainly **compose** features and shared UI.
Keep business logic/state inside `features/`.

- `src/pages/<page>/index.tsx`
  A page entry component. Use a directory per page to co-locate page-only code
  (small helpers, styles, tests) without leaking it into `features/`.

#### `src/features/`

Reusable product features (user-facing behavior). Each feature co-locates its
Redux logic, API calls, and UI.

A typical feature folder contains:

- `ui/` — feature-specific UI components
- `model/` — Redux Toolkit slice, thunks, selectors
- `api/` — feature-specific API functions
- `lib/` — internal utilities for the feature
- `types.ts` — feature-local types (optional; create `types/` if it grows)
- `index.ts` — feature **public API** (recommended entry point for imports)

#### `src/shared/`

Reusable, non-domain-specific building blocks used across the app.

- `shared/ui/`
  App-wide reusable UI primitives and small wrappers/adapters (including wrappers
  around third-party UI components such as **magic-ui**).

- `shared/lib/`
  Generic utilities (e.g., `cn()`, formatting, validation helpers).

- `shared/api/`
  Shared API infrastructure (fetch wrapper, base client configuration, etc.).

- `shared/hooks/`
  Reusable React hooks (e.g., `useToast`, `useMediaQuery`, `useLocalStorage`).

- `shared/config/`
  App configuration, constants, environment wrappers.

- `shared/types/`
  Cross-cutting types shared by multiple features.

### Import Rules (to keep boundaries clear)

- `pages` may import from `features` and `shared`.
- `features` must not import from `pages`.
- Avoid importing directly from other `features`. Prefer composition in `pages`,
  or move truly generic parts into `shared`.
- Prefer importing from a feature’s `index.ts` (public API) instead of deep paths.

### Path Aliases

- `@/app/*`
- `@/pages/*`
- `@/features/*`
- `@/shared/*`
