# 資料模型：N5 文法敬體變化區塊重整

## 概觀

本功能延伸既有 `N5GrammarSection` compare-table 結構，新增一個專門承接表格儲存格例句的資料集合 `tableExampleGroups`，用來支援新的 `敬體變化速覽` 區塊。

## 實體

### 1. N5GrammarSection（更新）

| 欄位 | 型別 | 說明 | 規則 |
|------|------|------|------|
| `id` | `string` | section 穩定識別碼 | 本次新增 `polite-overview`；既有 `sentence-basics` 保留 id |
| `title` | `string` | 區塊標題 | `polite-overview` = `敬體變化速覽`；`sentence-basics` = `敬體句型：現在型與詞類基礎` |
| `presentationMode` | `'compare-table' \| 'info-stack' \| 'bullet-list'` | 顯示模式 | `polite-overview` 用 `compare-table`；`sentence-basics` 改為 `info-stack` |
| `order` | `number` | 排序 | `polite-overview = 1`；`sentence-basics = 2` |
| `table` | `N5GrammarCompareTable?` | 比較表資料 | `polite-overview` 必填；`sentence-basics` 移除 |
| `topics` | `N5GrammarTopic[]` | 教學主題卡片 | `sentence-basics` 保留原 3 組 topic；`polite-overview` 可為空陣列 |
| `tableExampleGroups` | `N5GrammarTableExampleGroup[]?` | compare-table 下方的儲存格例句群組 | 只在 `polite-overview` 使用 |

### 2. N5GrammarTableExampleGroup（新增）

| 欄位 | 型別 | 說明 | 規則 |
|------|------|------|------|
| `id` | `string` | 群組穩定 id | 以 `rowId + column` 組成，例如 `present-positive-nominal` |
| `rowId` | `string` | 對應 compare table row | 必須命中 `table.rows[].id` |
| `columnIndex` | `number` | 對應 compare table 值欄位索引 | 以 `row.values` 為基準；範圍需落在有效欄位內 |
| `forms` | `string[]` | 該儲存格顯示的形式 | 至少 1 筆；若有替代寫法可多筆 |
| `examples` | `N5GrammarExample[]` | 對應例句 | 至少 1 筆；每筆需有日文、讀音與翻譯 |
| `note` | `string?` | 補充說明 | 用於標示替代寫法、語感差異等 |

### 3. N5GrammarExample（沿用）

| 欄位 | 型別 | 說明 | 規則 |
|------|------|------|------|
| `id` | `string` | 例句識別碼 | overview 新增例句需有新的穩定 id |
| `japanese` | `string` | 日文句子 | overview 新句不得與既有 N5 文法例句完全相同 |
| `reading` | `string?` | 讀音 | 本次 overview 例句預期全部提供 |
| `translation` | `string` | 繁中翻譯 | 必填 |
| `note` | `string?` | 備註 | 可用於補充替代寫法 |
| `origin` | `'source' \| 'supplemental'` | 來源分類 | overview 新例句固定用 `supplemental` |

## 區塊拆分結果

| Section ID | 標題 | order | mode | table | topics | tableExampleGroups |
|------------|------|-------|------|-------|--------|--------------------|
| `polite-overview` | `敬體變化速覽` | `1` | `compare-table` | 保留原敬體比較表 | `[]` | `12` 組 |
| `sentence-basics` | `敬體句型：現在型與詞類基礎` | `2` | `info-stack` | 無 | 保留原 `noun-na-basics`、`i-adjective-basics`、`masu-verb-basics` | 無 |

## `polite-overview` 例句覆蓋矩陣

| rowId | 列標題 | columnIndex | 欄位 | forms 範例 |
|-------|--------|-------------|------|------------|
| `present-positive` | 現在肯定 | `0` | 名詞 / な形容詞 | `です` |
| `present-positive` | 現在肯定 | `1` | い形容詞 | `いです` |
| `present-positive` | 現在肯定 | `2` | 動詞 | `ます` |
| `present-negative` | 現在否定 | `0` | 名詞 / な形容詞 | `じゃありません`、`ではありません` |
| `present-negative` | 現在否定 | `1` | い形容詞 | `くないです` |
| `present-negative` | 現在否定 | `2` | 動詞 | `ません` |
| `past-positive` | 過去肯定 | `0` | 名詞 / な形容詞 | `でした` |
| `past-positive` | 過去肯定 | `1` | い形容詞 | `かったです` |
| `past-positive` | 過去肯定 | `2` | 動詞 | `ました` |
| `past-negative` | 過去否定 | `0` | 名詞 / な形容詞 | `じゃありませんでした`、`ではありませんでした` |
| `past-negative` | 過去否定 | `1` | い形容詞 | `くなかったです` |
| `past-negative` | 過去否定 | `2` | 動詞 | `ませんでした` |

## 驗證規則

- `polite-overview.tableExampleGroups.length` 必須等於 `table.rows.length * (table.columns.length - 1)`，也就是 12。
- `polite-overview.tableExampleGroups` 的排列順序必須固定為：名詞 / な形容詞四型、い形容詞四型、動詞四型。
- 每個 `tableExampleGroup` 的 `rowId + columnIndex` 組合必須唯一。
- 每個 `tableExampleGroup.examples.length` 必須大於 0。
- overview 每筆例句都必須提供 `reading` 與 `translation`，且 `origin` 必須是 `supplemental`。
- `polite-overview` 可以沒有 `topics`，但 compare-table section 若沒有 `topics`，就必須有 `tableExampleGroups`。
- `sentence-basics` 必須保留既有 3 個 topics 與原 sourceRefs / sharedNoteIds 關聯。
- `sentence-basics.table` 必須不存在，避免頁面出現第二份同樣的敬體比較表。
- overview 新例句的 `japanese` 內容不得與現有 `n5GrammarSections` 其他例句完全重複。

## 狀態轉換

### Section 展開狀態

| 狀態 | 觸發 | 結果 |
|------|------|------|
| `collapsed` | 頁面初始渲染 | 只顯示 section 標題列 |
| `expanded` | 使用者點擊 toggle | 顯示 description、compare table / topics / tableExampleGroups |
| `collapsed` | 使用者再次點擊 toggle | 隱藏 body，回到只看標題列 |

本次功能不改變既有 section card 的展開邏輯，只改變前兩個 section 的資料內容與排序。
