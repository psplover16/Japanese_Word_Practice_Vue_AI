# Contract: 長音規則表格

## Scope

- In scope:
  - `src/modules/practice/components/ChoonRuleSection.vue`
  - `src/modules/practice/data/specialSyllableData.ts`
  - `src/modules/practice/types/practice.ts`

## Required Behavior

1. 長音規則區塊必須以單一表格呈現。
2. 規則說明列必須與範例列在資料角色與視覺上明確區分。
3. 範例列固定呈現三欄：
   - 假名
   - 羅馬音
   - 中文翻譯
4. 「あ段 + う 不一定屬於規則長音」必須以多個範例列呈現，而非單純說明段落。

## Validation Notes

- Component test 需驗證規則列與範例列都存在。
- 375px 下不得以橫向捲動處理表格溢出。
