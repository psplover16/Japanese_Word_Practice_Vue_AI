<script setup lang="ts">
import { seionYoonRows } from '@/modules/practice/data/specialSyllableData';
</script>

<template>
  <section class="section-card space-y-2">
    <h2 class="text-sm font-semibold text-ink">清音拗音：由 i 段假名接上小や・ゆ・よ，整體要一口氣連讀。</h2>
    <div class="table-shell">
      <table class="fixed-grid-table text-xs">
        <thead>
          <tr>
            <th class="kana-header border-b border-clay/10 px-2 py-2"></th>
            <th class="kana-header border-b border-l border-clay/10 px-2 py-2">や / ヤ<br />ya</th>
            <th class="kana-header border-b border-l border-clay/10 px-2 py-2">ゆ / ユ<br />yu</th>
            <th class="kana-header border-b border-l border-clay/10 px-2 py-2">よ / ヨ<br />yo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in seionYoonRows" :key="row.label">
            <th class="kana-header border-b border-clay/10 px-2 py-2">{{ row.label }}</th>
            <td v-for="value in row.values" :key="value" class="border-b border-l border-clay/10 px-2 py-2 text-center">
              {{ value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
