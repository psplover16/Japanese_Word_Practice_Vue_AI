# Contract: Exam Modal Prompt Emphasis

## Scope

- In scope: `ExamModal`, `/practice` 測驗彈窗流程
- Out of scope: `UnknownResultPanel`, `GrammarView`, `VocabularyView`, PWA toast

## Required Behaviors

| Surface | Contract |
|---------|----------|
| `ExamModal` 題目列 | 題目假名需放大到約現況 2.5 倍的視覺尺寸 |
| `ExamModal` 內容區 | 題目、答案、提示需同時保持可見且不重疊 |
| `ExamModal` 行動版 | 在 375px 下不得發生裁切、橫向溢出或按鈕被推出視窗 |
| Negative ownership | 本期放大規則只適用於測驗彈窗題目列，不擴散到其他卡片或輸入元件 |

## Verification

- Component test 驗證 `ExamModal` 在預設題目資料下可正常渲染與關閉
- Layout smoke / e2e 驗證 375px 與桌機尺寸下的可見性與操作按鈕存在
