import { defineVitestConfig } from '@nuxt/test-utils/config'

/**
 * Component/unit tests only. Anything that needs a real browser belongs in
 * `tests/e2e/` under Playwright.
 *
 * The `nuxt` environment gives tests auto-imports, `#app` composables and the
 * project's aliases, so component tests import the same way app code does.
 */
export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        domEnvironment: 'happy-dom',
      },
    },
    include: ['tests/unit/**/*.{test,spec}.ts'],
    globals: true,
    coverage: {
      reporter: ['text', 'html'],
      reportsDirectory: './tests/.vitest/coverage',
      include: ['app/**/*.{vue,ts}'],
      exclude: ['app/**/*.d.ts'],
    },
  },
})
