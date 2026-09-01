<script setup lang="ts">
interface Props {
  /** Stagger within a grid. Keep each step ≤60ms and the total ≤300ms. */
  delay?: number
  /** Root element tag, so a reveal wrapper never breaks a list or grid. */
  as?: string
}

const { delay = 0, as = 'div' } = defineProps<Props>()

const root = ref<HTMLElement | null>(null)

/**
 * `undefined` means "no `data-reveal` attribute", which is what the prerendered
 * HTML ships: content is visible before hydration and stays visible if JS never
 * runs. Only once mounted — proof that JS *can* reveal it again — does this
 * switch to `hidden`.
 */
const revealState = ref<'hidden' | 'shown'>()

const { stop } = useIntersectionObserver(
  root,
  ([entry]) => {
    if (!entry?.isIntersecting) return
    revealState.value = 'shown'
    stop() // Reveal is a one-shot; re-animating on scroll-back feels unstable.
  },
  { threshold: 0.15 },
)

onMounted(() => {
  const rect = root.value?.getBoundingClientRect()

  // Content already painted on screen must never blink out to fade back in, so
  // it skips the hidden state entirely rather than animating on arrival.
  if (!rect || rect.top < window.innerHeight) {
    revealState.value = 'shown'
    stop()
    return
  }

  revealState.value = 'hidden'
})
</script>

<template>
  <component
    :is="as"
    ref="root"
    :data-reveal="revealState"
    :style="delay ? { transitionDelay: `${delay}ms` } : undefined"
  >
    <slot />
  </component>
</template>
