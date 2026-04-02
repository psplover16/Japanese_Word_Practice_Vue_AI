# Contract: `/vocabulary` 單字練習頁

## Route Ownership

- Feature surface: `/vocabulary`
- Must not appear on:
  - `/practice`
  - `/grammar`
- Must preserve:
  - 現有 route path
  - 現有 route title
  - 現有 route tabs
  - 現有 app shell

## Required UI Surfaces

`/vocabulary` 主內容至少必須包含：

1. 搜尋 input
2. `全部字音` checkbox
3. `漢字` checkbox
4. `只顯示註記` checkbox
5. `練習` checkbox
6. 單字數量摘要文字
7. 單一可縱向捲動的 `table` 容器
8. 註記儲存按鈕與註記欄標頭的清除全部註記 checkbox

## Required Data Guarantees

- 字典資料必須由既有 `jpWords` 來源導出。
- 每筆資料需有穩定 `id`，且註記持久化只儲存 `id`。
- route 初始渲染時，需先驗證既有 localStorage 格式；若格式錯誤必須清除壞資料。
- 搜尋結果必須同時受 `/practice` 已勾選字母、input 搜尋字詞與頁內 checkbox 條件影響。

## Required Structure Guarantees

- 主內容中的單字資料必須以原生 `table / thead / tbody` 呈現。
- 主內容中的單字資料必須集中呈現在單一可縱向捲動的 table 容器內，而不是 stage accordion。
- 需要隱藏但保留佔位的欄位不得移除對應欄位結構。
- 漢字與拼音必須共用同一欄位位置。
- 單字數量摘要必須與目前可見資料列數一致。
- 支援長按約 0.4 秒暫時揭露單列內容，放開後恢復原狀。

## Negative Guarantees

- `/vocabulary` 不得再顯示目前 placeholder 版的 `SelectionDetailPanel`。
- `/vocabulary` 不得再顯示「單字練習預備區」說明文字。
- `/practice` 與 `/grammar` 不得出現本 feature 的控制區、單字摘要或單字表格 UI。
- 本功能不得照抄參考頁最下方的版號內容。
