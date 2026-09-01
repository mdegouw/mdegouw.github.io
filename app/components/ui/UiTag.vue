<script setup lang="ts">
interface Props {
  /** `primary` for the skills worth noticing, `secondary` for the rest. */
  variant?: 'primary' | 'secondary'
}

const { variant = 'secondary' } = defineProps<Props>()

const variantClasses = {
  primary: 'bg-accent-wash text-accent',
  secondary: 'border border-line bg-surface-alt text-ink-subtle',
} as const
</script>

<template>
  <span
    class="inline-block rounded-sm px-2 py-0.5 font-mono text-xs"
    :class="variantClasses[variant]"
  >
    <slot />
  </span>
</template>
