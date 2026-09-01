<script setup lang="ts">
const buildDate = useRuntimeConfig().public.buildDate
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-line">
    <div class="mx-auto max-w-content px-6 py-12 md:px-8 md:py-16">
      <div class="grid gap-10 md:grid-cols-3 md:gap-6">
        <div>
          <p class="font-mono text-sm text-ink">
            ~/mathijs
          </p>
          <p class="mt-3 max-w-[40ch] text-sm leading-relaxed text-ink-muted">
            System, Network and DevOps Engineer in the Netherlands. Networks,
            servers, and the automation that keeps them consistent.
          </p>
        </div>

        <nav aria-label="Footer">
          <p class="font-mono text-label tracking-[0.15em] text-ink-subtle uppercase">
            Sections
          </p>
          <ul class="mt-4 flex flex-col gap-2">
            <li
              v-for="section in siteSections"
              :key="section.id"
            >
              <a
                :href="`#${section.id}`"
                class="rounded-sm text-sm text-ink-muted transition-colors duration-(--duration-fast) hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {{ section.label }}
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <p class="font-mono text-label tracking-[0.15em] text-ink-subtle uppercase">
            Elsewhere
          </p>
          <ul class="mt-4 flex flex-col gap-2">
            <li
              v-for="link in socialLinks"
              :key="link.href"
            >
              <a
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-sm text-sm text-ink-muted transition-colors duration-(--duration-fast) hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <Icon
                  :name="link.icon"
                  class="size-4"
                  aria-hidden="true"
                />
                {{ link.label }}
              </a>
            </li>
            <li>
              <a
                :href="`mailto:${contactEmail}`"
                class="inline-flex items-center gap-2 rounded-sm text-sm text-ink-muted transition-colors duration-(--duration-fast) hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <Icon
                  name="lucide:mail"
                  class="size-4"
                  aria-hidden="true"
                />
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ currentYear }} Mathijs de Gouw</p>
        <p class="font-mono">
          build: {{ buildDate }} · nuxt · static · github pages
        </p>
      </div>
    </div>
  </footer>
</template>
