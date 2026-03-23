<script setup lang="ts">
import { dakuonYoonRows } from '@/modules/practice/data/specialSyllableData';
</script>

<template>
  <section class="section-card space-y-2">
    <h2 class="text-sm font-semibold text-ink">合拗音：濁音與半濁音接上小や・ゆ・よ時，也要視為一個連續音節。</h2>
    <div class="table-shell">
      <table class="fixed-grid-table text-xs">
        <thead>
          <tr>
            <th class="kana-header border-b border-clay/10 px-2 py-2"></th>
            <th class="kana-header border-b border-l border-clay/10 px-2 py-2">や / ヤ</th>
            <th class="kana-header border-b border-l border-clay/10 px-2 py-2">ゆ / ユ</th>
            <th class="kana-header border-b border-l border-clay/10 px-2 py-2">よ / ヨ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in dakuonYoonRows" :key="row.label">
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
