<template>
  <section
    id="top"
    aria-labelledby="hero-heading"
    class="relative flex items-center py-section md:min-h-[85svh]"
  >
    <div class="mx-auto w-full max-w-content px-6 md:px-8">
      <UiReveal>
        <UiTerminalLine
          user="mathijs"
          host="mdegouw"
          command="whoami"
          cursor
        />

        <h1
          id="hero-heading"
          class="mt-6 text-display leading-[1.05] font-semibold tracking-tight text-ink"
        >
          Mathijs de Gouw
        </h1>

        <p class="mt-4 text-lg text-ink-muted md:text-xl">
          System and Network Engineer
        </p>

        <p class="mt-6 max-w-[65ch] leading-relaxed text-ink-muted">
          I design, run and automate the infrastructure other people's work sits
          on: from the switch to the server, with a focus on reliability, security, and enough scripting that I only have to solve a thing once.
        </p>

        <p class="mt-8 flex items-center gap-2 font-mono text-sm text-ink-subtle">
          <UiStatusDot />
          status: open to interesting problems
        </p>

        <div class="mt-10 flex flex-wrap gap-3">
          <UiButton href="#experience">
            View experience
          </UiButton>
          <UiButton
            href="#contact"
            variant="ghost"
          >
            Get in touch
          </UiButton>
        </div>
      </UiReveal>
    </div>

    <p
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 bottom-6 mx-auto hidden max-w-content px-6 font-mono text-xs text-ink-subtle md:block md:px-8"
    >
      scroll ↓
    </p>
  </section>
</template>
