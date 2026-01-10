# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A starter template for Tauri 2 + React 19 + TypeScript desktop applications.
Uses Redux Toolkit, React Router v7, shadcn/ui, and Tailwind CSS.

## Commands

### Development

```bash
# Start frontend dev server (Vite)
npm run dev

# Run as Tauri application (frontend + Rust backend)
npm run tauri dev

# Build frontend only
npm run build

# Build Tauri application for distribution
npm run tauri build
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Format with Prettier
npm run format
```

### Rust (src-tauri/)

```bash
# Check Rust code
cd src-tauri && cargo check

# Format Rust code
cd src-tauri && cargo fmt

# Lint Rust code
cd src-tauri && cargo clippy
```

## Architecture

### Frontend (src/)

Feature-based co-location architecture:

- **app/** - Application wiring (routes, providers, Redux store)
- **pages/** - Route-level page components (compose features/shared)
- **features/** - Feature modules (contains ui/model/api/lib)
- **shared/** - Shared resources (ui/lib/api/hooks)

### Import Rules

```txt
pages → features, shared ✓
features → shared ✓
features → features ✗ (compose in pages instead)
features → pages ✗
```

### Path Aliases

`@/`, `@/app/*`, `@/pages/*`, `@/features/*`, `@/shared/*`

### Backend (src-tauri/)

Tauri 2 Rust backend:

- `src/lib.rs` - Tauri command definitions and plugin setup
- Commands are defined with `#[tauri::command]` and registered in `invoke_handler`
- Plugins: `tauri-plugin-opener`, `tauri-plugin-store`

### State Management

Redux Toolkit + RTK Query:

- Slices: `features/*/model/*Slice.ts`
- RTK Query APIs: `features/*/api/*Api.ts`
- Tauri integration: `shared/api/tauriBaseQuery.ts` for calling Tauri commands via RTK Query

## Key Patterns

### shadcn/ui Components

```bash
# Always install via CLI (manual creation is prohibited)
npx shadcn@latest add <component>
```

Components are placed in `shared/ui/` (configured in `components.json`).

### Feature Module Structure

```txt
features/<name>/
  ├── ui/        # UI components
  ├── model/     # Redux slice, thunks, selectors
  ├── api/       # API functions (RTK Query, etc.)
  ├── lib/       # Utilities
  └── index.ts   # Public API (recommended entry point)
```

### Tauri Command Integration

Call Rust commands from frontend:

```typescript
import { invoke } from '@tauri-apps/api/core'
const result = await invoke<T>('command_name', { args })
```

Use `tauriBaseQuery` for RTK Query integration.

## Git Workflow

- Branch strategy: GitHub Flow
- Direct commits to main branch are prohibited (always use feature branches with PRs)
- Commit messages: Conventional Commits format

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite 7
- **Backend**: Rust, Tauri 2
- **State**: Redux Toolkit + RTK Query
- **Routing**: React Router v7 (HashRouter)
- **Styling**: Tailwind CSS, shadcn/ui (new-york style), Framer Motion
- **Linting**: ESLint + Prettier
