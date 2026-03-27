<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
const tabs = [
  { to: '/practice', label: '字母練習' },
  { to: '/grammar', label: '變化規則' },
  { to: '/vocabulary', label: '單字練習' }
];
</script>

<template>
  <nav data-testid="route-tabs" class="route-tabs flex items-center gap-1">
    <RouterLink
      v-for="tab in tabs"
      :key="tab.to"
      :to="tab.to"
      class="route-tab-link rounded border px-2 py-1 text-xs font-medium transition-colors sm:text-sm"
      :class="route.path === tab.to ? 'border-clay bg-clay text-white' : 'border-clay/20 bg-white/75 text-ink hover:bg-sand/70'"
    >
      {{ tab.label }}
    </RouterLink>
  </nav>
</template>
