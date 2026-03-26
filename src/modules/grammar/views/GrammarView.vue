<script setup lang="ts">
import SelectionDetailPanel from '@/modules/practice/components/SelectionDetailPanel.vue';
import HatsuonSection from '@/modules/practice/components/HatsuonSection.vue';
import SokuonSection from '@/modules/practice/components/SokuonSection.vue';
</script>

<template>
  <div class="space-y-1 py-1">
    <SelectionDetailPanel />
    <section class="section-card">
      <p class="text-sm leading-6 text-ink/75">
        這個路由目前先用來閱讀第一頁勾選結果與常見發音規則，後續再擴充文法與詞性變化內容。
      </p>
    </section>
    <div class="grid gap-1 lg:grid-cols-2">
      <HatsuonSection />
      <SokuonSection />
    </div>
  </div>
</template>
