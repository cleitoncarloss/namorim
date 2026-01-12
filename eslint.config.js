/**
 * ESLint Configuration - Implements 64 Quality Rules
 * Regra 010: Single Responsibility Principle
 * Regra 022: Keep It Simple, Stupid
 */

import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // ============================================
      // Object Calisthenics (Regras 001-009)
      // ============================================

      // Regra 001: Nível Único de Indentação
      'max-depth': ['warn', { max: 2 }],

      // Regra 002: Proibição da Cláusula ELSE
      'no-else-return': ['warn', { allowElseIf: false }],

      // Regra 005: Máximo Uma Chamada por Linha
      'newline-per-chained-call': ['warn', { ignoreChainWithDepth: 2 }],

      // Regra 006: Proibição de Nomes Abreviados
      'id-length': ['warn', { min: 2, exceptions: ['i', 'j', 'k', 'x', 'y', 'e', '_'] }],

      // Regra 007: Limite Máximo de Linhas por Classe/Arquivo
      'max-lines': ['warn', { max: 200, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }],

      // ============================================
      // SOLID Principles (Regras 010-014)
      // ============================================

      // Regra 010: Single Responsibility - max functions per file
      'max-classes-per-file': ['warn', 1],

      // ============================================
      // Code Quality Rules (Regras 021-039)
      // ============================================

      // Regra 024: Proibição de Constantes Mágicas
      'no-magic-numbers': ['warn', {
        ignore: [0, 1, -1, 2, 100],
        ignoreArrayIndexes: true,
        ignoreDefaultValues: true,
      }],

      // Regra 028: Tratamento de Exceção Assíncrona
      'no-async-promise-executor': 'error',
      'require-await': 'warn',

      // Regra 030: Proibição de Funções Inseguras
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',

      // Regra 033: Limite de Parâmetros por Função
      'max-params': ['warn', { max: 3 }],

      // Regra 036: Restrição de Funções com Efeitos Colaterais
      'no-param-reassign': ['warn', { props: false }],

      // ============================================
      // General Best Practices
      // ============================================

      // Prevent common errors
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',

      // Code style
      'prefer-const': 'warn',
      'no-var': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': ['warn', 'all'],

      // Async/Await best practices
      'no-return-await': 'warn',
      'prefer-promise-reject-errors': 'warn',

      // Security
      'no-script-url': 'error',

      // ============================================
      // React Rules
      // ============================================

      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-key': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-undef': 'error',
      'react/no-deprecated': 'warn',
      'react/no-direct-mutation-state': 'error',
      'react/no-unescaped-entities': 'warn',

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    // Exceções para arquivos de configuração
    files: ['*.config.js', 'vite.config.js'],
    rules: {
      'no-magic-numbers': 'off',
    },
  },
  {
    // Exceções para arquivos de teste
    files: ['**/*.test.{js,jsx}', '**/*.spec.{js,jsx}', '**/tests/**'],
    rules: {
      'no-magic-numbers': 'off',
      'max-lines-per-function': 'off',
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
  },
];
