# Contract: Practice Result Panel and Table Labels

## Scope

- In scope: `/practice`, `PracticeView`, `PracticeToolbar`, `UnknownResultPanel`, `SeionTable`, `DakuonTable`
- Out of scope: `/grammar`, `/vocabulary`, `ExamModal`, deployment workflow

## Required Behaviors

| Surface | Contract |
|---------|----------|
| `PracticeToolbar` | 上方清除最近結果按鈕維持既有清除資料行為，不自動回頂 |
| `UnknownResultPanel` | 下方按鈕文案為「清除」，且在手機尺寸下不得斷行 |
| `PracticeView` | 由下方結果區觸發清除時，必須清除最近結果並平滑捲動回路由頂部 |
| `SeionTable` | 畫面不得再顯示 `tableA` 輔助文字 |
| `DakuonTable` | 畫面不得再顯示 `tableB` 輔助文字 |
| Negative ownership | 文法、單字與其他未指定路由不得出現本期新增互動或表格標示調整 |

## Verification

- Component smoke test 驗證 `/practice` 初始渲染與最近結果區顯示安全
- Component test 驗證按鈕文案與清除後捲動行為
- Route ownership / smoke 驗證其他 route 沒有被波及
