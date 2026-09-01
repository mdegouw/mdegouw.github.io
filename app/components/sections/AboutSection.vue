<script setup lang="ts">
interface SpecEntry {
  key: string
  value: string
}

const specSheet: SpecEntry[] = [
  { key: 'location', value: 'Netherlands' },
  { key: 'timezone', value: 'CET / CEST' },
  { key: 'focus', value: 'Networking' },
  { key: 'also', value: 'Systems, DevOps' },
  { key: 'languages', value: 'Dutch, English' },
  { key: 'status', value: 'open to interesting problems' },
]
</script>

<template>
  <UiSection
    id="about"
    label="About"
    heading="A bit more context"
  >
    <div class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
      <UiReveal class="max-w-[65ch]">
        <div class="flex flex-col gap-4 leading-relaxed text-ink-muted">
          <p>
            My work starts from a simple habit:
            I want to know how things work. As a kid that meant tinkering with computers;
            today it means digging into a problem until I understand the root cause well enough to fix it properly and prevent it from returning.
          </p>
          <p>
            Of everything I've worked on, the internet has held my interest the longest.
            I've always been drawn to the machinery behind it —
            the protocols that let independent networks agree on how to talk to each other,
            where the network figures out its own paths and reroutes around failures without anyone touching it.
            That fascination turned into a career as a network engineer.
          </p>
          <p>
            Much of my work begins with research.
            When I'm designing or working on a project,
            I dig into the relevant topics first so that the choices I make are grounded in a real understanding of the trade-offs.
          </p>
          <p>
            Alongside that, I keep a continuous watch on the wider landscape — evolving best practices,
            updated tooling, and alternative software that might serve my employer better than what we're running today.
            Staying current means I can bring options to the table early, rather than reacting once something becomes a problem.
          </p>
          <p>
            I write code, but as a means rather than the job. PowerShell, Python
            and Ansible, so a change I make once lands the same way on every box,
            and so the next person can read what I did instead of reconstructing
            it. I like infrastructure you can rebuild from a repository, changes
            that arrive as a reviewable diff, and alerts that go off before a
            user picks up the phone.
          </p>
        </div>
      </UiReveal>

      <UiReveal :delay="60">
        <dl class="rounded-md border border-line bg-surface p-6 font-mono text-sm">
          <div
            v-for="entry in specSheet"
            :key="entry.key"
            class="flex justify-between gap-4 border-b border-line py-2.5 first:pt-0 last:border-b-0 last:pb-0"
          >
            <dt class="text-ink-subtle">
              {{ entry.key }}
            </dt>
            <dd class="text-right text-ink">
              {{ entry.value }}
            </dd>
          </div>
        </dl>
      </UiReveal>
    </div>
  </UiSection>
</template>
