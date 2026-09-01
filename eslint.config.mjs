// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

/**
 * Nuxt generates the base flat config (Vue + TypeScript + Nuxt rules, aware of
 * this project's dirs and auto-imports). Everything below is a deliberate
 * project override — keep it short and justify each rule.
 */
export default withNuxt(
  {
    name: 'mdegouw/rules',
    rules: {
      // Vue: enforce naming and ordering that keeps components predictable.
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/component-options-name-casing': ['error', 'PascalCase'],
      'vue/custom-event-name-casing': ['error', 'camelCase'],
      'vue/define-macros-order': ['error', {
        order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'],
      }],
      'vue/block-order': ['error', {
        order: ['script', 'template', 'style'],
      }],
      // Prefer typed, explicit component contracts.
      'vue/require-default-prop': 'error',
      'vue/no-required-prop-with-default': 'error',
      // Self-closing is the house style for void elements and empty components.
      'vue/html-self-closing': ['error', {
        html: { void: 'always', normal: 'always', component: 'always' },
      }],
      'vue/max-attributes-per-line': ['error', { singleline: 3 }],

      // TypeScript: unused vars are errors, but `_`-prefixed args are intentional.
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
      // NOTE: `consistent-type-imports` is deliberately NOT enabled — it needs
      // type-aware linting, which roughly triples lint time for little gain on
      // a site this size. `npm run typecheck` covers correctness; the
      // `import type { ... }` convention is documented in CLAUDE.md.

      // Ship no debug output; `console.warn`/`console.error` stay allowed.
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
    },
  },
  {
    name: 'mdegouw/tests',
    files: ['tests/**/*.ts', '**/*.spec.ts', '**/*.test.ts'],
    rules: {
      // Test doubles and fixtures legitimately need looser typing.
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
    },
  },
)
