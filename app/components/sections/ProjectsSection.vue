<script setup lang="ts">
interface Project {
  name: string
  summary: string
  tags: string[]
  repositoryUrl?: string
  liveUrl?: string
}

const projects: Project[] = [
  {
    name: 'Datacenter Deployment',
    summary: 'Designed and built a two-site colocation platform at Previder: dark fiber between racks, a fully layer 3 VXLAN and MP-BGP EVPN fabric on Aruba, FortiGate at the edge, HPE Private Cloud Business Edition carrying the workloads.',
    tags: ['VXLAN', 'BGP EVPN', 'Aruba', 'FortiGate', 'HPE PCBE'],
  },
  {
    name: 'On-Prem to Colo Workload Migration',
    summary: 'Migrated ~220 production VMs from our own server room to the new colocation platform in a single month, with zero unplanned outages — waves sized so a failed cutover meant rolling back one service, not the business.',
    tags: ['Migration', 'VMware', 'Cutover Planning', 'Risk Management'],
  },
  {
    name: 'Own ISP',
    summary: 'Built the datacenter edge on our own ASN and address space, with two independent IP transit providers and BGP handling failover, so losing an upstream is a route withdrawal rather than an outage.',
    tags: ['BGP', 'AS203860', 'IPv6', 'RIPE', 'IP Transit', 'RPKI', 'ROA', 'IRR'],
  },
  {
    name: 'SD-WAN deployment',
    summary: 'Migrated four international sites off a carrier-managed MPLS IPVPN onto an SD-WAN overlay, trading fixed circuits for dual internet uplinks with policy-based failover and per-application routing.',
    tags: ['SD-WAN', 'MPLS migration', 'BGP', 'QoS', 'PBS'],
  },
  {
    name: 'Monitoring Solution',
    summary: 'Distributed CheckMK setup with a central instance in the datacenter and a remote instance per branch, so each site keeps monitoring itself when the link drops but everything still rolls up into one view. Agents are baked and updated centrally instead of being installed by hand. CheckMK infra is managed in Ansible, so a new site is a single playbook run away.',
    tags: ['CheckMK', 'SNMP', 'Distributed monitoring', 'Agent Bakery'],
  },
  {
    name: 'Patch management',
    summary: 'Rebuilt update management after WSUS was deprecated: Windows servers onboarded to Azure Arc and patched through Azure Update Manager, Ubuntu machines through Canonical Landscape. Two consoles instead of a spreadsheet, with patch state visible per host.',
    tags: ['Azure Arc', 'Azure Update Manager', 'Canonical Landscape', 'Ubuntu', 'Patching'],
  },
  {
    name: 'Azure landing zone for ERP',
    summary: 'Greenfield Azure landing zone for an ERP platform: network segmentation, backup and identity worked out against the Well-Architected Framework pillars before anything was migrated, with FortiGate-terminated connectivity to the datacenter.',
    tags: ['Azure', 'Well-Architected Framework', 'FortiGate', 'IPsec', 'ERP'],
  },
  {
    name: 'mdegouw.nl',
    summary: 'This site. Nuxt, statically generated, deployed to GitHub Pages by CI — nothing ships unless lint, types and both test layers are green.',
    tags: ['Nuxt', 'TypeScript', 'Tailwind', 'GitHub Actions'],
    repositoryUrl: 'https://github.com/mdegouw/mdegouw.github.io',
    liveUrl: 'https://mdegouw.nl',
  },
]
</script>

<template>
  <UiSection
    id="projects"
    label="Projects"
    heading="Things I have shipped"
    lead="With the exception of my own personal site, these are all projects that are actively used in production by various businesses. I have been involved in the design, build and operation of all of them."
  >
    <ul class="grid gap-4 md:grid-cols-2 md:gap-6">
      <UiReveal
        v-for="(project, index) in projects"
        :key="project.name"
        as="li"
        :delay="Math.min(index * 60, 300)"
        class="h-full"
      >
        <UiCard
          as="article"
          class="flex h-full flex-col"
        >
          <h3 class="text-title font-medium text-ink">
            {{ project.name }}
          </h3>

          <p class="mt-2 flex-1 leading-relaxed text-ink-muted">
            {{ project.summary }}
          </p>

          <ul class="mt-5 flex flex-wrap gap-2">
            <li
              v-for="tag in project.tags"
              :key="tag"
            >
              <UiTag>{{ tag }}</UiTag>
            </li>
          </ul>

          <p
            v-if="project.repositoryUrl || project.liveUrl"
            class="mt-5 flex flex-wrap gap-x-5 gap-y-2"
          >
            <a
              v-if="project.repositoryUrl"
              :href="project.repositoryUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-sm font-mono text-sm text-accent transition-colors duration-(--duration-fast) hover:text-accent-dim focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <Icon
                name="lucide:github"
                class="size-4"
                aria-hidden="true"
              />
              <span>repo<span class="sr-only"> for {{ project.name }}</span></span>
            </a>
            <a
              v-if="project.liveUrl"
              :href="project.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-sm font-mono text-sm text-accent transition-colors duration-(--duration-fast) hover:text-accent-dim focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <Icon
                name="lucide:external-link"
                class="size-4"
                aria-hidden="true"
              />
              <span>live<span class="sr-only"> site for {{ project.name }}</span></span>
            </a>
          </p>
        </UiCard>
      </UiReveal>
    </ul>
  </UiSection>
</template>
