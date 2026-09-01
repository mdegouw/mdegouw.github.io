<script setup lang="ts">
interface Props {
  user: string
  host: string
  command: string
  /** Blinking block cursor. One per page — the hero owns it. */
  cursor?: boolean
}

const { user, host, command, cursor = false } = defineProps<Props>()
</script>

<template>
  <p class="font-mono text-sm md:text-base">
    <!-- The gaps are `&nbsp;` because Vue strips whitespace-only text nodes
         that contain a newline, which would join the prompt to the command. -->
    <span class="text-accent">{{ user }}@{{ host }}</span><span
      class="text-ink-subtle"
    >:~$&nbsp;</span><span class="text-ink">{{ command }}</span><span
      v-if="cursor"
      aria-hidden="true"
      class="animate-cursor-blink text-accent"
    >&nbsp;▋</span>
  </p>
</template>
