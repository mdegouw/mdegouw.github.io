<script setup lang="ts">
interface Props {
  /** Mono eyebrow. Kept short — it is uppercased and tracked out. */
  label: string
  heading: string
  /** Wired to the section's `aria-labelledby`, so it must be unique. */
  headingId: string
  lead?: string
  align?: 'start' | 'center'
}

const { label, heading, headingId, lead = '', align = 'start' } = defineProps<Props>()
</script>

<template>
  <div
    class="flex flex-col gap-3"
    :class="align === 'center' && 'items-center text-center'"
  >
    <p class="font-mono text-label tracking-[0.15em] text-accent uppercase">
      {{ label }}
    </p>

    <h2
      :id="headingId"
      class="text-headline font-semibold tracking-tight text-ink"
    >
      {{ heading }}
    </h2>

    <p
      v-if="lead"
      class="max-w-[65ch] text-base leading-relaxed text-ink-muted md:text-lg"
      :class="align === 'center' && 'mx-auto'"
    >
      {{ lead }}
    </p>
  </div>
</template>
