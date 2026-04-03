# Contract: 路由與共享狀態歸屬

## 路由標題

| Route | Title | 主要責任 | 明確禁止 |
|-------|-------|----------|----------|
| `/practice` | 不顯示獨立 route title；共享 tabs 顯示 `字母練習` | 勾選假名、教學區塊、考試 modal、結算區 | 不得顯示 `第一頁勾選結果明細` 專屬 panel |
| `/grammar` | `變化規則` | 顯示共享明細、閱讀規則內容 | 不得修改第一頁共享狀態 |
| `/vocabulary` | `單字練習` | 顯示共享明細、預留單字練習容器 | 不得修改第一頁共享狀態 |

## Shared State

- `SelectionState` 在三個路由間共用，切換路由時保留。
- 第二頁與第三頁只能讀取 shared state，不得直接寫入。
- 重新整理網站後，shared state 回到預設值。

## Positive / Negative Ownership

- `SelectionDetailPanel` 只允許出現在 `/grammar` 與 `/vocabulary`。
- `/practice` 若出現 `SelectionDetailPanel`，視為違反規格。
