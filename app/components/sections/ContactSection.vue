<script setup lang="ts">
/**
 * There is no server behind this site, so contact is a `mailto:` link rather
 * than a form. Adding a third-party form endpoint is a decision for the owner.
 */
</script>

<template>
  <UiSection
    id="contact"
    label="Contact"
    heading="Get in touch"
    lead="Have I piqued your interest? Send me a message."
    variant="centered"
  >
    <div class="flex flex-col items-center gap-8 text-center">
      <a
        :href="`mailto:${contactEmail}`"
        class="rounded-sm font-mono text-xl break-all text-accent transition-colors duration-(--duration-fast) hover:text-accent-dim focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:text-2xl"
      >
        {{ contactEmail }}
      </a>

      <dl class="flex flex-col items-center gap-2 font-mono text-sm text-ink-subtle">
        <div class="flex items-center gap-2">
          <UiStatusDot />
          <dt class="sr-only">
            Availability
          </dt>
          <dd>status: open to interesting problems</dd>
        </div>
        <div class="flex items-center gap-2">
          <dt>response:</dt>
          <dd>usually within a working day</dd>
        </div>
      </dl>

      <ul class="flex flex-wrap items-center justify-center gap-3">
        <li
          v-for="link in socialLinks"
          :key="link.href"
        >
          <UiButton
            :href="link.href"
            variant="ghost"
            external
          >
            <Icon
              :name="link.icon"
              class="size-4"
              aria-hidden="true"
            />
            {{ link.label }}
          </UiButton>
        </li>
      </ul>
    </div>
  </UiSection>
</template>
