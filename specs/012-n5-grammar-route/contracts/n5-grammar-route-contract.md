# UI Contract: /n5-grammar

## Route Ownership

- **Positive ownership**: `/n5-grammar` 路由、`src/modules/n5Grammar/` 內的資料、元件、view 與其專屬測試。
- **Negative ownership**: `/practice`、`/grammar`、`/vocabulary` 不承載此功能的內容資料；它們只能提供既有共享 shell、tabs 或可相容的互動殼層參考。

## Required View Contract

`N5GrammarView` 必須：

1. 提供頁面根節點 `data-testid="n5-grammar-view"`
2. 預設 render 正式內容，不再僅顯示「製作中」
3. 渲染多個可收合主題群組
4. 保持 render-safe，預設狀態不出現 runtime error、空白錯位或其他 route 的內容

## Section Contract

每個文法群組必須包含：

- 唯一 `id`
- 獨立標題列
- 與標題分離的說明區
- 可展開/收合的內容區
- 至少一個文法條目

每個文法條目必須包含：

- 主題名稱
- 至少一段說明
- 至少一個例句

## Presentation Contract

允許的主內容模式：

- `bullet-list`: 條列式說明混合範例
- `info-stack`: 說明後接範例
- `compare-table`: 對照表後接範例

選擇規則：

- 適合比較差異時使用 `compare-table`
- 需要逐條吸收規則時使用 `bullet-list`
- 需要先讀完整說明再看例句時使用 `info-stack`

不得因為共用元件方便而讓不適合表格的內容硬套表格。

## Ordering Contract

- 助詞相關群組必須全部位於最後
- 助詞內部順序必須遵循來源筆記的出現順序
- 其餘主題可重新分類，但需維持清楚的學習順序

## Test Contract

至少需要以下驗證：

- component smoke: `/n5-grammar` render-safe 且不外溢其他 route 內容
- unit data: 每個 topic 皆有說明與例句，助詞排序正確
- e2e layout: 375px 寬度下展開/收合可操作且無水平破版
