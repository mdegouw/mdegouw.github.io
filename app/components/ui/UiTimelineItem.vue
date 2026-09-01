<script setup lang="ts">
interface Props {
  /** Mono date range, e.g. `2024 — present`. */
  period: string
  role: string
  organisation: string
  description: string
  tags?: string[]
  /** Stops the vertical connector, which must not dangle past the last entry. */
  isLast?: boolean
}

const { period, role, organisation, description, tags = [], isLast = false } = defineProps<Props>()
</script>

<template>
  <div
    class="relative pl-6 md:pl-8"
    :class="isLast ? 'pb-0' : 'pb-10 md:pb-12'"
  >
    <!-- The connector is centred under the dot: dot is 6px at left-0, so 3px. -->
    <span
      v-if="!isLast"
      aria-hidden="true"
      class="absolute top-3 bottom-0 left-[3px] w-px bg-line"
    />
    <span
      aria-hidden="true"
      class="absolute top-2 left-0 size-1.5 rounded-full bg-accent"
    />

    <div class="md:flex md:gap-8">
      <p class="font-mono text-sm text-ink-subtle md:w-40 md:shrink-0 md:pt-1">
        {{ period }}
      </p>

      <div class="mt-2 md:mt-0">
        <h3 class="text-title font-medium text-ink">
          {{ role }}
        </h3>
        <p class="mt-1 text-ink-muted">
          {{ organisation }}
        </p>
        <p class="mt-3 max-w-[65ch] leading-relaxed text-ink-muted">
          {{ description }}
        </p>

        <ul
          v-if="tags.length"
          class="mt-4 flex flex-wrap gap-2"
        >
          <li
            v-for="tag in tags"
            :key="tag"
          >
            <UiTag>{{ tag }}</UiTag>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
