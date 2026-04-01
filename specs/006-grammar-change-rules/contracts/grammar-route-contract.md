# Contract: `/grammar` 變化規則頁

## Route Ownership

- Feature surface: `/grammar`
- Must not appear on:
  - `/practice`
  - `/vocabulary`
- Must preserve:
  - 現有 route path
  - 現有 route title
  - 現有 route tabs
  - 現有 app shell

## Required Sections

`/grammar` 主內容必須至少依序包含以下 section：

1. 語法系統差異
2. 各活用型意義
3. 動詞型態分辨: 一段/五段/不規則
4. 五段動詞表(詞尾母音變化)
5. 一段動詞 (辭書型 結尾必定是 る)
6. サ變動詞 (する動詞為結尾的動詞)
7. カ變動詞 (只有来る)
8. い形容詞
9. ない形容詞
10. だ助動詞
11. 詞性變化規則

## Required Structure Guarantees

- 每個 section 需可收合/展開。
- 「語法系統差異」需為 3 欄比較表。
- 「五段動詞表(詞尾母音變化)」需包含：
  - 活用主表
  - 音便表
  - `tfoot` 說明列
  - 特殊高亮格
- 「詞性變化規則」需包含有序編號、巢狀條列與例句列表。
- 含副標題或多行 title 的 section 必須保留換行。

## Negative Guarantees

- `/grammar` 不得再顯示目前 placeholder 版的 `SelectionDetailPanel`。
- `/grammar` 不得顯示 `HatsuonSection` 或 `SokuonSection`。
- `/practice` 與 `/vocabulary` 不得出現本 feature 的 11 個 section title。
