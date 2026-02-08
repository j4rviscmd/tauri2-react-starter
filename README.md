<!--
🤖 NOTICE FOR AI AGENTS:

This repository may be a fork of the tauri2-react-starter template.
Before attempting to run GitHub Actions workflows, you MUST:

1. ANALYZE WORKFLOW REQUIREMENTS:
   - Read `.github/workflows/*.yml` files
   - Identify all `secrets.*` references
   - List required GitHub Secrets for this repository

2. CONFIGURE BADGE URLS:
   - Replace `<owner>/<repo>` placeholders in badge URLs with actual repository path

3. SET UP SECRETS:
   - Navigate to repository Settings > Secrets and variables > Actions
   - Add each required secret identified in step 1

4. VERIFY CONFIGURATION:
   - Check that `src-tauri/tauri.conf.json` updater endpoints are configured correctly
   - Ensure all workflows can access required secrets

See "Release Setup (For Forked Repositories)" section below for detailed documentation.
-->

# tauri2-react-starter

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![Built with Tauri](https://img.shields.io/badge/Built%20with-Tauri-24C8DB)
![React + Vite + TS](https://img.shields.io/badge/React%20%2B%20Vite-TypeScript-2ea44f)
[![CI](https://github.com/<owner>/<repo>/actions/workflows/ci.yml/badge.svg)](https://github.com/<owner>/<repo>/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/<owner>/<repo>?label=release)](https://github.com/<owner>/<repo>/releases)
[![GitHub Downloads](https://img.shields.io/github/downloads/<owner>/<repo>/total?style=flat-square)](https://github.com/<owner>/<repo>/releases)

## Star this repo to keep me motivated ⭐

I build this in my spare time. Every star shows that my work is valued and keeps me going!

![Star](docs/images/star-github.gif)

<!--
  NOTE FOR TEMPLATE USERS:
  After cloning this template, replace <owner> and <repo> placeholders in:
  - Badge URLs above (CI, Release, Downloads)
  - GitHub Actions workflow files
  - Tauri configuration files (src-tauri/tauri.conf.json)
-->

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
- Prefer importing from a feature's `index.ts` (public API) instead of deep paths.

### Path Aliases

- `@/app/*`
- `@/pages/*`
- `@/features/*`
- `@/shared/*`

## Release Setup (For Forked Repositories)

This template includes Tauri's auto-update functionality and GitHub release notes
integration. After forking, configure the following:

### Required GitHub Secrets

| Secret Name                          | Description                                                 |
| ------------------------------------ | ----------------------------------------------------------- |
| `TAURI_SIGNING_PRIVATE_KEY`          | Private key for signing updates                             |
| `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` | Password for the private key (if set during key generation) |

### Configuration Files to Update

1. **`src-tauri/tauri.conf.json`** - Set `plugins.updater.pubkey` and update
   `endpoints` URL with your repository path
2. **`README.md`** - Replace `<owner>/<repo>` in badge URLs

### Environment Variables (Local Development)

For local development, create a `.env` file in the project root:

```bash
# .env
GITHUB_OWNER=your-username
GITHUB_REPO=your-repo-name
```

This enables fetching GitHub release notes during development. In production,
these values are automatically provided by GitHub Actions.

**Important**: The `.env` file is for local development only. It is **not**
included in production builds. Ensure GitHub Actions workflows can access
repository information (automatically configured in `.github/workflows/release.yml`).

### Documentation

- [Tauri Updater Plugin](https://v2.tauri.app/plugin/updater/) - Key generation
  and configuration
- [GitHub Actions](https://v2.tauri.app/distribute/pipelines/github/) - CI/CD
  setup

### Creating a Release

1. Update version in `package.json`, `src-tauri/tauri.conf.json`, and
   `src-tauri/Cargo.toml`
2. Create and push a tag: `git tag v0.1.0 && git push origin v0.1.0`
3. GitHub Actions builds and creates a draft release
4. Review and publish the release on GitHub
