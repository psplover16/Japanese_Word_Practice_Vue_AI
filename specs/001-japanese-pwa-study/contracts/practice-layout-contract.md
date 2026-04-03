# Contract: 字母練習版面與樣式邊界

## 外層容器

- 全站最外層固定容器 `padding-y = 12px`、`padding-x = 8px`。
- 頁首必須顯示共享 route tabs，且不得再輸出獨立 route title。
- `375px` 驗收寬度下，頁首不得出現橫向捲動、裁切、重疊或破版。

## 固定格表

- `tableA`、`tableB`、`table清音拗音`、`table合拗音`、`table外來語擴張` 屬於固定格表。
- 固定格表可採固定欄寬策略，但在 `375px` 下不得出現滾動條。
- 被勾選的儲存格必須有明確變色狀態。

## 內容撐寬表

- `table撥音` 與 `table促音` 屬於內容撐寬表。
- 左側欄位不得設定固定寬度，寬度由內容決定。
- 內容撐寬表不得被共用固定格表 class 覆蓋。

## Render Safety

- `古語假名` 未顯示時，對應格位仍必須保留，且畫面顯示 `-`。
- hidden / empty / placeholder 狀態不得造成 runtime error、render failure 或 console error。
