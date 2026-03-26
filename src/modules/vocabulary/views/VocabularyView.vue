<script setup lang="ts">
import SelectionDetailPanel from '@/modules/practice/components/SelectionDetailPanel.vue';
</script>

<template>
  <div class="space-y-1 py-1">
    <SelectionDetailPanel />
    <section class="section-card space-y-2">
      <h2 class="text-sm font-semibold text-ink">單字練習預備區</h2>
      <p class="text-sm leading-6 text-ink/75">
        目前先顯示來自第一頁的共享勾選明細，後續單字背誦功能可直接沿用這些勾選結果。
      </p>
      <p class="text-sm leading-6 text-ink/75">
        這裡只顯示實際文字，不顯示布林值、代碼或摘要。
      </p>
    </section>
  </div>
</template>
