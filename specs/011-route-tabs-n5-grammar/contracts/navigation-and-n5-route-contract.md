# Contract: 共享導覽與 `N5文法` 占位路由

## Scope

- In scope:
  - `src/app/AppShell.vue`
  - `src/app/router.ts`
  - `src/shared/components/RouteTabs.vue`
  - `src/modules/practice/views/PracticeView.vue`
  - `src/modules/n5Grammar/views/N5GrammarView.vue`
  - `src/styles/main.css`
- Out of scope:
  - `src/modules/grammar/views/GrammarView.vue` 的既有規則內容
  - `src/modules/vocabulary/views/VocabularyView.vue` 的既有單字內容
  - `src/modules/exam/components/ExamModal.vue`
  - `src/shared/components/ToastBanner.vue`

## Required Behavior

1. 共享頁首不得再顯示左側 route title；頁首主要內容必須改為主路由按鈕群。
2. 主路由按鈕順序必須為 `字母練習`、`變化規則`、`單字練習`、`N5文法`。
3. 主路由按鈕群必須靠左排列；空間不足時允許換列，但每顆按鈕內文字不得斷行。
4. 主路由按鈕文字必須比現況明顯放大，目標約為既有尺寸的 `1.15x`。
5. `/practice` 只允許清音表與濁音／半濁音表的內部文字放大，目標約為既有尺寸的 `1.1x`。
6. 新的 `N5文法` route 必須可透過按鈕與直接網址進入，並在初始狀態顯示 `製作中`。

## Negative Guarantees

- `/grammar` 不得改成顯示 `製作中` placeholder。
- `/vocabulary` 不得因共享頁首調整而更換主內容或失去既有 route ownership。
- 新 tabs 樣式不得波及非主路由按鈕。
- `/practice` 除清音表與濁音／半濁音表外，不得出現未指定的額外字級變更。

## Validation Notes

- 需保留或擴充共享頁首 smoke test，證明四個主路由都能 render-safe。
- 需有 ownership 驗證，證明 `N5文法` 只屬於新 route。
- 需至少有一個窄版驗證確認 tabs 換列不造成水平溢出。
