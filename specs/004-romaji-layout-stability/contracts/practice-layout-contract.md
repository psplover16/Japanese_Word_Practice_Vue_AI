# Contract: Practice Layout Ownership and Stability

## Scope

- In scope: `/practice`, `PracticeView`, `ChoonRuleSection`, `SeionYoonSection`, `DakuonYoonSection`, `LoanwordSection`, `AppShell`, `RouteTabs`
- Out of scope: `/grammar`, `/vocabulary`, `ExamModal`, `UnknownResultPanel`, PWA toast

## Required Behaviors

| Surface | Contract |
|---------|----------|
| `/practice` | 首次開啟與重新整理時，濁音／半濁音以下的本期區塊需在首屏穩定出現 |
| `AppShell` | 375px 下頁首標題與 route tabs 不得裁切、重疊或造成水平捲動 |
| `PracticeView` | 必須同步渲染本期調整區塊，不可先留大片空白後延遲補上 |
| Negative ownership | 其他 route 與高風險互動元件不得出現本 feature 的內容與樣式回歸 |

## Verification

- Component smoke test 驗證 `/practice` 初始 DOM 安全與區塊存在
- Route ownership test 驗證正向/反向 scope
- 375px e2e smoke test 驗證頁首與 `/practice` 版面
