# `/n5-grammar` 敬體變化重整契約

## 範圍

- **正向 ownership**: 只適用於 `/n5-grammar`
- **負向 ownership**: `/practice`、`/grammar`、`/vocabulary` 不得出現本功能新增的 section 標題、table example group 或對應 test ids

## 前兩個區塊契約

| 排序 | Section ID | 標題 | mode | 預設狀態 | 必須出現 | 必須不出現 |
|------|------------|------|------|----------|----------|------------|
| 1 | `polite-overview` | `敬體變化速覽` | `compare-table` | 收合 | compare table、12 組 table example groups（展開後） | 初始 render 就展開 |
| 2 | `sentence-basics` | `敬體句型：現在型與詞類基礎` | `info-stack` | 收合 | 原本 3 組教學 topics、shared notes、既有例句 | 第二份 compare table |

## Compare Table 契約

- `polite-overview` 必須保留原 `sentence-basics` 的敬體比較表欄列內容。
- 每個表格儲存格都必須有 1 組對應 example group。
- 12 組 example group 必須先列完名詞 / な形容詞，再列 い形容詞，最後列動詞。
- 例句覆蓋口徑以「每個儲存格」為準，不是每個替代寫法都要各自一組。
- 若儲存格含替代寫法，必須能在同一 group 內以 `forms` 或 `note` 呈現。

## 例句契約

- 每組 table example group 至少包含：
  - 1 句日文
  - 1 份讀音
  - 1 份繁中翻譯
- overview 新例句不得與專案既有 N5 文法例句完全相同。
- overview 新例句應標記為 `supplemental`。

## 測試識別契約

| 用途 | test id |
|------|---------|
| 新第一區塊容器 | `n5-grammar-section-polite-overview` |
| 新第一區塊 toggle | `n5-grammar-toggle-polite-overview` |
| 新第一區塊 body | `n5-grammar-body-polite-overview` |
| 新第一區塊 compare table | `n5-grammar-compare-table-polite-overview` |
| 儲存格例句群組 | `n5-grammar-table-example-{group-id}` |
| 原第二區塊容器 | `n5-grammar-section-sentence-basics` |

## 驗收重點

- `/n5-grammar` 初始 render 可看到 `敬體變化速覽` 在第一位，但它仍預設收合。
- 展開 `polite-overview` 後，可看到 compare table 與 table example groups。
- 展開 `sentence-basics` 後，不得再看到 compare table，但其餘原內容保留。
- 在 375px 下展開前三個核心區塊時，表格、例句與 shared notes 都必須可讀，且不應出現 console error / page error。
- 其他 route 不得出現本功能專屬內容或 test ids。
