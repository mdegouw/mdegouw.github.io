<script setup lang="ts">
const description = 'Mathijs de Gouw — System and Network Engineer in the Netherlands. Networking, infrastructure and automation: switching, firewalls, Linux, Windows Server and Ansible.'

useSeoMeta({
  title: 'System & Network Engineer',
  description,
  ogTitle: 'Mathijs de Gouw — system & network engineer',
  ogDescription: description,
  ogImage: '/images/og-default.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <HeroSection />
    <ExpertiseSection />
    <ExperienceSection />
    <ProjectsSection />
    <AboutSection />
    <ContactSection />
  </div>
</template>
