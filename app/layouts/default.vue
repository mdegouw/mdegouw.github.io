<template>
  <div class="min-h-svh bg-ground text-ink">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-ground"
    >
      Skip to content
    </a>

    <TheHeader />

    <main id="main">
      <slot />
    </main>

    <TheFooter />
  </div>
</template>
