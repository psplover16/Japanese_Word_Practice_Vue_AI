<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <h1 class="truncate text-base font-bold tracking-[0.08em] text-ink sm:text-lg">
    {{ title }}
  </h1>
</template>
