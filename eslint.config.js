/**
 * ESLint flat configuration for Tauri 2 + React 19 + TypeScript project.
 *
 * Features:
 * - TypeScript support via typescript-eslint
 * - React Hooks rules enforcement
 * - React Fast Refresh optimization
 * - Prettier integration
 * - Animate-ui components excluded from linting
 *
 * @see https://eslint.org/docs/latest/use/configure/configuration-files
 */

import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist', 'src-tauri/target', 'node_modules']),
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['**/src/shared/ui/animate-ui/**'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      eslintConfigPrettier,
    ],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'react-refresh/only-export-components': [
        'error',
        {
          allowConstantExport: true,
          allowExportNames: [
            'buttonVariants',
            'useTheme',
            'useDataState',
            'DataStateValue',
          ],
        },
      ],
      'prettier/prettier': 'error',
    },
  },
])
