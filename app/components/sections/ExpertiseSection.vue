<script setup lang="ts">
interface ExpertiseArea {
  icon: string
  title: string
  description: string
  tags: string[]
}

const expertiseAreas: ExpertiseArea[] = [
  {
    icon: 'lucide:network',
    title: 'Networking',
    description: 'Switching, routing, firewalls and wireless. Designing the segments, then proving traffic goes where I said it would.',
    tags: ['VLANs', 'VXLAN', 'Routing', 'BGP', 'OSPF', 'Firewalls', 'VPN', 'Wi-Fi'],
  },
  {
    icon: 'lucide:server',
    title: 'Systems & infrastructure',
    description: 'Linux and Windows, hypervisors, storage and the directory services everything else authenticates against.',
    tags: ['Linux', 'Windows Server', 'VMware', 'Proxmox', 'Active Directory', 'Entra ID', 'OIDC', 'SAML'],
  },
  {
    icon: 'lucide:terminal',
    title: 'Automation & scripting',
    description: 'Programming is how I avoid doing a thing twice. Config management and scripts, so a change lands the same way everywhere.',
    tags: ['Ansible', 'PowerShell', 'Python', 'Bash', 'PHP'],
  },
  {
    icon: 'lucide:workflow',
    title: 'DevOps & delivery',
    description: 'Pipelines, containers and infrastructure described in a repository rather than in someone\'s memory.',
    tags: ['Git', 'CI/CD', 'Docker', 'Terraform', 'OpenTofu'],
  },
  {
    icon: 'lucide:activity',
    title: 'Monitoring & observability',
    description: 'Knowing before the user does. Metrics, syslog and alerts tuned to wake a human only when a human is needed.',
    tags: ['Zabbix', 'CheckMK', 'Grafana', 'Prometheus', 'SNMP', 'Syslog'],
  },
  {
    icon: 'lucide:shield-check',
    title: 'Security & resilience',
    description: 'Segmentation, patching, least privilege, and backups that have actually been restored from at least once.',
    tags: ['Segmentation', 'MFA', 'OAuth2', 'Patching', 'Backup'],
  },
]

// 60ms per card, capped at 300ms total — past that a grid feels slow to load.
const revealDelay = (index: number) => Math.min(index * 60, 300)
</script>

<template>
  <UiSection
    id="expertise"
    label="Expertise"
    heading="What I actually do"
    lead="Six things I get called for. They overlap, and that is the point — most incidents live where the network, a server and somebody's automation meet."
  >
    <ul class="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
      <UiReveal
        v-for="(area, index) in expertiseAreas"
        :key="area.title"
        as="li"
        :delay="revealDelay(index)"
        class="h-full"
      >
        <UiCard
          as="article"
          class="flex h-full flex-col"
        >
          <Icon
            :name="area.icon"
            class="size-6 text-accent"
            aria-hidden="true"
          />

          <h3 class="mt-4 text-title font-medium text-ink">
            {{ area.title }}
          </h3>

          <p class="mt-2 flex-1 leading-relaxed text-ink-muted">
            {{ area.description }}
          </p>

          <ul class="mt-5 flex flex-wrap gap-2">
            <li
              v-for="tag in area.tags"
              :key="tag"
            >
              <UiTag>{{ tag }}</UiTag>
            </li>
          </ul>
        </UiCard>
      </UiReveal>
    </ul>
  </UiSection>
</template>
