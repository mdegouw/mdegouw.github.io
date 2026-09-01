<script setup lang="ts">
interface Props {
  /** Renders an `<a>`. Without it the element is a `<button type="button">`. */
  href?: string
  variant?: 'primary' | 'ghost'
  /** Opens in a new tab with the matching `rel`. Ignored without `href`. */
  external?: boolean
}

const { href = undefined, variant = 'primary', external = false } = defineProps<Props>()

const variantClasses = {
  primary: 'bg-accent text-ground font-medium hover:bg-accent-dim',
  ghost: 'border border-line text-ink hover:border-line-strong hover:bg-surface',
} as const

const isExternalLink = computed(() => Boolean(href) && external)
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :type="href ? undefined : 'button'"
    :target="isExternalLink ? '_blank' : undefined"
    :rel="isExternalLink ? 'noopener noreferrer' : undefined"
    class="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 py-2.5 text-sm transition-colors duration-(--duration-fast) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    :class="variantClasses[variant]"
  >
    <slot />
  </component>
</template>
