<script setup lang="ts">
const activeSectionId = useActiveSection()

// The header is chrome-free over the hero and only grows a hairline once the
// page has moved — the single piece of scroll-reactive styling on the site.
const { y: scrollY } = useWindowScroll()
const isScrolled = computed(() => scrollY.value > 8)

const colorMode = useColorMode()

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <header
    class="sticky top-0 z-50 h-16 border-b bg-ground/80 backdrop-blur-md transition-colors duration-(--duration-fast)"
    :class="isScrolled ? 'border-line' : 'border-transparent'"
  >
    <div class="mx-auto flex h-full max-w-content items-center justify-between gap-4 px-6 md:px-8">
      <a
        href="#top"
        class="rounded-sm font-mono text-sm text-ink transition-colors duration-(--duration-fast) hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        ~/mathijs
      </a>

      <nav
        aria-label="Sections"
        class="hidden md:block"
      >
        <ul class="flex items-center gap-6">
          <li
            v-for="section in siteSections"
            :key="section.id"
          >
            <a
              :href="`#${section.id}`"
              :aria-current="activeSectionId === section.id ? 'true' : undefined"
              class="rounded-sm text-sm transition-colors duration-(--duration-fast) hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              :class="activeSectionId === section.id
                ? 'font-medium text-accent underline underline-offset-8'
                : 'text-ink-muted'"
            >
              {{ section.label }}
            </a>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-1">
        <!-- The stored preference is unknown at prerender time, so rendering
             the icon on the server would guarantee a hydration mismatch. -->
        <ClientOnly>
          <button
            type="button"
            class="flex size-11 items-center justify-center rounded-sm text-ink-muted transition-colors duration-(--duration-fast) hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            :aria-label="`Switch to ${colorMode.value === 'dark' ? 'light' : 'dark'} theme`"
            @click="toggleColorMode"
          >
            <Icon
              :name="colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon'"
              class="size-5"
              aria-hidden="true"
            />
          </button>
          <template #fallback>
            <span class="size-11" />
          </template>
        </ClientOnly>

        <TheMobileNav
          :active-section-id="activeSectionId"
          class="md:hidden"
        />
      </div>
    </div>
  </header>
</template>
