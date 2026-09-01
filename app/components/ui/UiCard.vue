<script setup lang="ts">
interface Props {
  /** `article` when the card is a discrete item (a project, a service). */
  as?: 'article' | 'div'
  /** Accent top rule, for the one card in a grid that deserves emphasis. */
  accent?: boolean
}

const { as = 'div', accent = false } = defineProps<Props>()
</script>

<template>
  <component
    :is="as"
    class="rounded-md border border-line bg-surface p-6 transition-colors duration-(--duration-fast) hover:border-line-strong hover:bg-surface-alt"
    :class="accent && 'border-t-2 border-t-accent'"
  >
    <slot />
  </component>
</template>
