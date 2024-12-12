import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { configs as tsConfigs } from '@typescript-eslint/eslint-plugin'; // Import TypeScript ESLint configs

export default [
  {
    ignores: ['dist'],
  },
  {
    extends: [
      js.configs.recommended,          // JavaScript recommended rules
      tsConfigs.recommended,           // TypeScript ESLint recommended rules
      tsConfigs['recommended-requiring-type-checking'], // Type-aware rules
    ],
    files: ['**/*.{ts,tsx}'],           // Lint all TypeScript files
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,          // Use browser globals
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // React hooks rules
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];
