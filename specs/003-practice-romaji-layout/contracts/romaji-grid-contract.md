# Contract: 拗音與合拗音羅馬音矩陣

## Scope

- In scope:
  - `src/modules/practice/components/SeionYoonSection.vue`
  - `src/modules/practice/components/DakuonYoonSection.vue`
  - `src/modules/practice/data/specialSyllableData.ts`

## Required Behavior

1. 清音拗音與合拗音的每個內容格都必須顯示假名與羅馬音。
2. 補上的羅馬音需直接附著在格內，不可移到表外的說明文字或 tooltip。
3. 既有表頭語意必須保留，避免使用者失去 `ya / yu / yo` 的矩陣關係。
4. 375px 下若密度不足，只允許縮減 padding 與字級，不允許橫向捲動。

## Validation Notes

- 需有 component 測試抽查內容格是否同時包含假名與羅馬音。
- 需由 `/practice` smoke test 確認初始渲染未報錯。
