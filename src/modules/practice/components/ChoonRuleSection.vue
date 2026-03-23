<script setup lang="ts">
import { choonRuleRows } from '@/modules/practice/data/specialSyllableData';
</script>

<template>
  <section class="section-card space-y-2">
    <h2 class="text-sm font-semibold text-ink">長音規則：不同拼寫形式都在提醒同一個母音要拉長。</h2>
    <div class="grid gap-2 md:grid-cols-2">
      <article
        v-for="row in choonRuleRows"
        :key="row.label"
        class="rounded-lg border border-clay/15 bg-white/70 p-3"
      >
        <h3 class="text-center text-sm font-semibold text-ink">{{ row.label }}</h3>
        <div class="mt-2 space-y-1 text-center text-sm text-ink/80">
          <p v-for="value in row.values" :key="value">{{ value }}</p>
        </div>
      </article>
    </div>
  </section>
</template>
