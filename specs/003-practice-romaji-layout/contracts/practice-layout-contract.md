# Contract: `/practice` 版面與共享頁首

## Scope

- In scope:
  - `src/app/AppShell.vue`
  - `src/shared/components/RouteTabs.vue`
  - `src/modules/practice/views/PracticeView.vue`
- Out of scope:
  - `src/modules/grammar/views/GrammarView.vue`
  - `src/modules/vocabulary/views/VocabularyView.vue`
  - `src/modules/exam/components/ExamModal.vue`
  - `src/shared/components/ToastBanner.vue`

## Required Behavior

1. `/practice` 載入時，頁首必須維持左側標題、右側 route tabs 的可辨識結構。
2. 在 375px 寬度下，頁首與主要內容不得出現橫向捲動、裁切或重疊。
3. `router-view` 內容區必須占滿可用寬度，讓 practice 表格能使用完整內容寬。
4. 本 feature 的展示內容只出現在 `/practice`；其他 route 不新增長音規則、拗音羅馬音或外來語矩陣內容。

## Validation Notes

- 需保留或擴充 route / smoke tests，證明 `/practice` 在 default render 下安全，且其他 route 不被本 feature 汙染。
