<script setup lang="ts">
import GrammarAccordionTableShell from '@/modules/grammar/components/GrammarAccordionTableShell.vue';
import type { InflectionSeries, InflectionTableSpec } from '@/modules/grammar/types/changeRules';

defineProps<{
  sectionId: string;
  spec: InflectionTableSpec;
}>();

function rowCount(rows: InflectionSeries[]) {
  return rows.reduce((count, row) => count + row.suffixAndMeaning.length, 0);
}
</script>

<template>
  <GrammarAccordionTableShell
    :title="spec.title"
    :subtitle="spec.subtitle"
    :colspan="spec.columns.length"
    :table-test-id="`grammar-table-${sectionId}`"
    :toggle-test-id="`grammar-toggle-${sectionId}`"
    title-cell-tag="td"
    title-cell-class="grammar-title-cell-pre"
  >
    <tr>
      <th v-for="column in spec.columns" :key="column" class="grammar-header-cell grammar-header-cell-pre">{{ column }}</th>
    </tr>

    <template v-for="(row, rowIndex) in spec.mainRows" :key="`${sectionId}-main-${row.base}`">
      <tr v-for="(pair, pairIndex) in row.suffixAndMeaning" :key="`${row.base}-${pair.suffix}-${pairIndex}`">
        <td v-if="pairIndex === 0" :rowspan="row.suffixAndMeaning.length" class="grammar-row-title-cell">
          {{ row.base }}
        </td>
        <td
          v-if="rowIndex === 0 && pairIndex === 0 && spec.prefix"
          :rowspan="rowCount(spec.mainRows)"
          class="grammar-prefix-cell"
          :class="{ 'grammar-force-nowrap': sectionId === 'nai-adjective-table' || sectionId === 'da-auxiliary-table' }"
        >
          {{ spec.prefix }}
        </td>
        <td
          v-if="rowIndex === 0 && pairIndex === 0 && spec.verb"
          :rowspan="rowCount(spec.mainRows)"
          class="grammar-body-cell grammar-no-select grammar-center-cell grammar-normal-space-cell"
          :class="{ 'grammar-force-nowrap': sectionId === 'nai-adjective-table' }"
        >
          {{ spec.verb }}
        </td>
        <td
          v-if="pairIndex === 0"
          :rowspan="row.suffixAndMeaning.length"
          class="grammar-body-cell grammar-no-select grammar-center-cell grammar-normal-space-cell"
        >
          {{ row.baseEnding }}
        </td>
        <td
          class="grammar-body-cell grammar-no-select grammar-center-cell grammar-pre-wrap-cell"
          :class="{ 'grammar-fixed-break-cell': sectionId === 'da-auxiliary-table' && rowIndex === 4 }"
        >
          {{ pair.suffix }}
        </td>
        <td class="grammar-body-cell grammar-no-select grammar-center-cell grammar-pre-wrap-cell">{{ pair.meaning }}</td>
      </tr>
    </template>

    <template v-if="spec.footerRows?.length" #footer>
      <template v-for="(row, rowIndex) in spec.footerRows" :key="`${sectionId}-footer-${row.base}`">
        <tr v-for="(pair, pairIndex) in row.suffixAndMeaning" :key="`${row.base}-${pair.suffix}-${pairIndex}`" class="grammar-footer-row">
          <td
            v-if="pairIndex === 0"
            :rowspan="row.suffixAndMeaning.length"
            class="grammar-row-title-cell grammar-row-title-footer-cell"
            :class="{ 'grammar-derived-cell': sectionId === 'ichidan-table' }"
          >
            {{ row.base }}
          </td>
          <td
            v-if="rowIndex === 0 && pairIndex === 0 && spec.verb"
            :rowspan="rowCount(spec.footerRows)"
            class="grammar-body-cell grammar-no-select grammar-center-cell grammar-normal-space-cell"
            :class="{ 'grammar-derived-cell': sectionId === 'ichidan-table' }"
          >
            {{ spec.verb }}
          </td>
          <td
            v-if="pairIndex === 0"
            :rowspan="row.suffixAndMeaning.length"
            class="grammar-body-cell grammar-no-select grammar-center-cell grammar-normal-space-cell"
            :class="{ 'grammar-derived-cell': sectionId === 'ichidan-table' }"
          >
            {{ row.baseEnding }}
          </td>
          <td
            class="grammar-body-cell grammar-no-select grammar-center-cell grammar-pre-wrap-cell"
            :class="{ 'grammar-derived-cell': sectionId === 'ichidan-table' }"
          >
            {{ pair.suffix }}
          </td>
          <td
            class="grammar-body-cell grammar-no-select grammar-center-cell grammar-pre-wrap-cell"
            :class="{ 'grammar-derived-cell': sectionId === 'ichidan-table' }"
          >
            {{ pair.meaning }}
          </td>
        </tr>
      </template>
    </template>
  </GrammarAccordionTableShell>
</template>
