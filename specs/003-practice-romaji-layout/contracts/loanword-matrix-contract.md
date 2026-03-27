# Contract: 外來語擴張矩陣

## Scope

- In scope:
  - `src/modules/practice/components/LoanwordSection.vue`
  - `src/modules/practice/data/specialSyllableData.ts`
  - `src/modules/practice/types/practice.ts`

## Required Behavior

1. 第一列與第一欄必須作為基本音標頭。
2. 其餘內容格必須表達第一列與第一欄的組合邏輯。
3. 只有假名的內容格必須補上羅馬音，且版型固定為「假名在上、羅馬音在下」。
4. 所有內容格需水平與垂直置中。
5. 可參考清音拗音區塊的視覺節奏，但不可失去外來語矩陣的標頭語意。

## Validation Notes

- Component test 需驗證標頭格與內容格角色不同。
- 需驗證至少一個內容格同時包含假名與羅馬音，且在 375px 下不依賴橫向捲動。
