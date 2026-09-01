<script setup lang="ts">
interface ExperienceEntry {
  period: string
  role: string
  organisation: string
  description: string
  tags: string[]
}

// Newest first.
const experienceEntries: ExperienceEntry[] = [
  {
    period: '2024 — present',
    role: 'Network & DevOps Engineer',
    organisation: 'Aartsen',
    description: 'Network owner across 4 international sites. I design and deliver the technical side of company-wide projects — networking, infrastructure, security — and keep as much of it as possible in code rather than in someone\'s head.',
    tags: ['Windows', 'Linux', 'VMware', 'PowerShell', 'Entra ID', 'Azure', 'Terraform', 'Ansible', 'BGP', 'FortiNet', 'Aruba'],
  },
  {
    period: '2021 — 2024',
    role: 'Medior System & Network Administrator',
    organisation: 'Aartsen',
    description: 'Second line for the whole company: Windows and Linux servers and workstations, virtualisation, patching, backups, printers. Replaced recurring manual work with scheduled PowerShell — roughly 40+ recurring tasks that stopped needing a human.',
    tags: ['Windows', 'Linux', 'VMware', 'PowerShell', 'Veeam'],
  },
  {
    period: '2017 — 2021',
    role: 'Junior System & Network Administrator',
    organisation: 'IC10 / PSIS',
    description: 'First through third line for small businesses: workstations, servers, firewalls, and the phone call at 07:00. Where I learned that documentation is a feature and that nobody thanks you for the outage that did not happen.',
    tags: ['Windows', 'Linux', 'VMware', 'Networking'],
  },
]
</script>

<template>
  <UiSection
    id="experience"
    label="Experience"
    heading="Where I have been"
    lead="Nine years of keeping infrastructure up for people who only notice it when it is down."
  >
    <ol>
      <UiReveal
        v-for="(entry, index) in experienceEntries"
        :key="entry.period"
        as="li"
      >
        <UiTimelineItem
          :period="entry.period"
          :role="entry.role"
          :organisation="entry.organisation"
          :description="entry.description"
          :tags="entry.tags"
          :is-last="index === experienceEntries.length - 1"
        />
      </UiReveal>
    </ol>
  </UiSection>
</template>
