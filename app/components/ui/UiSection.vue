<script setup lang="ts">
interface Props {
  /** Anchor target. Must match an entry in `siteSections` to appear in the nav. */
  id: string
  label: string
  heading: string
  lead?: string
  /** `centered` narrows the column and centres the heading — Contact only. */
  variant?: 'default' | 'centered'
}

const { id, label, heading, lead = '', variant = 'default' } = defineProps<Props>()

const headingId = computed(() => `${id}-heading`)
</script>

<template>
  <section
    :id="id"
    :aria-labelledby="headingId"
    class="py-section"
  >
    <div
      class="mx-auto px-6 md:px-8"
      :class="variant === 'centered' ? 'max-w-2xl' : 'max-w-content'"
    >
      <UiReveal>
        <UiSectionHeading
          :label="label"
          :heading="heading"
          :heading-id="headingId"
          :lead="lead"
          :align="variant === 'centered' ? 'center' : 'start'"
        />
      </UiReveal>

      <div class="mt-10 md:mt-14">
        <slot />
      </div>
    </div>
  </section>
</template>
