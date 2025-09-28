// @ts-check
import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // Ignora artefactos
  { ignores: ['dist', 'node_modules', 'eslint.config.mjs'] },

  // Reglas base
  eslint.configs.recommended,

  // Reglas TS con type-check
  ...tseslint.configs.recommendedTypeChecked,

  // Prettier
  eslintPluginPrettierRecommended,

  // Opciones globales
  {
    languageOptions: {
      globals: { ...globals.node, ...globals.jest },
      parserOptions: {
        project: './tsconfig.eslint.json',     // <- importante
        tsconfigRootDir: import.meta.dirname,
      },
      sourceType: 'module',
    },
  },

  // Reglas generales
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
    },
  },

  // ⚠️ Desactiva chequeo estricto en test para evitar falsos positivos con supertest, etc.
  {
    files: ['test/**/*.ts'],
    ...tseslint.configs.recommended, // sin type-check pesado
    rules: {
      '@typescript-eslint/no-unsafe-*': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
    },
  },

  // ⚠️ Relaja solo el seed
  {
    files: ['src/prisma/seed.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
    },
  },
)
