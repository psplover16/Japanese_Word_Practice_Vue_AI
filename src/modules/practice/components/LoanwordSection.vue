<script setup lang="ts">
import { loanwordRows } from '@/modules/practice/data/specialSyllableData';
</script>

<template>
  <section class="section-card space-y-2">
    <h2 class="text-sm font-semibold text-ink">外來語擴張：片假名會用額外組合來模擬日語原本沒有的音。</h2>
    <div class="table-shell">
      <table class="fixed-grid-table text-xs">
        <tbody>
          <tr v-for="row in loanwordRows" :key="row.label">
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
