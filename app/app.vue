<script setup lang="ts">
// Easter egg for whoever opens the inspector. Document-scoped, so it belongs
// here rather than in a layout or section — see `useTuxDance`.
useTuxDance()
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
