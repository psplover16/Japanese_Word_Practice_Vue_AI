# Data Model: `/practice` 羅馬音排版補強與首屏穩定化

## 1. ExampleTriple

### Purpose

描述一筆可直接顯示在畫面上的學習內容，固定包含假名、羅馬音與中文意思。

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `kana` | string | 假名或單字 |
| `romaji` | string | 對應羅馬音 |
| `translation` | string | 中文意思 |

### Rules

- 三個欄位必須同時存在。
- 呈現順序固定為假名、羅馬音、中文意思。

## 2. LongVowelTableRow

### Purpose

描述長音規則大表格中的一列，可表達規則說明列或例字列。

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | 穩定識別值，例如 `rule-ei`、`example-au-2` |
| `kind` | `rule` \| `example` | 列角色 |
| `groupTitle` | string | 所屬規則群組標題 |
| `ruleText` | string | 規則敘述，僅 `kind = rule` 時使用 |
| `example` | ExampleTriple | 例字資料，僅 `kind = example` 時使用 |

### Rules

- `kind = rule` 時，該列必須獨占整列。
- `kind = example` 時，不得再顯示額外欄位標題文字。
- 同一個 `groupTitle` 下可包含 1 列規則與多列例字。

## 3. RomajiHeader

### Purpose

描述拗音類矩陣中的列標頭或欄標頭。

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `kana` | string | 假名標頭 |
| `romaji` | string | 對應羅馬音 |
| `key` | string | 穩定鍵值，例如 `ya`、`ki` |

### Rules

- 每個標頭都必須同時有假名與羅馬音。
- 同一區塊內的標頭格式必須一致。

## 4. RomajiGridCell

### Purpose

描述清音拗音或合拗音表格中的一格內容。

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `kana` | string | 假名組合 |
| `romaji` | string | 對應羅馬音 |
| `translation` | string | 若有例字需求時對應中文 |

### Rules

- `kana` 與 `romaji` 必填。
- 若此格承載例字，則 `translation` 也必填。

## 5. RomajiGridRow

### Purpose

描述清音拗音或合拗音矩陣中的一整列。

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `header` | RomajiHeader | 列標頭 |
| `cells` | RomajiGridCell[] | 依固定順序排列的內容格 |

### Rules

- `cells` 順序固定對應 `ya / yu / yo`。
- 任一格都不可只剩假名而無羅馬音。

## 6. LoanwordMatrixHeader

### Purpose

描述外來語矩陣中的母音欄標頭或基底音列標頭。

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `key` | string | 穩定鍵值 |
| `kana` | string | 標頭顯示文字 |
| `romaji` | string | 對應羅馬音 |

### Rules

- 第一列與第一欄的標頭皆需能獨立辨識。
- 第一欄應盡可能完整列出常見外來語基底音。

## 7. LoanwordMatrixCell

### Purpose

描述外來語矩陣中的一個內容格。

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `rowKey` | string | 對應第一欄標頭 |
| `columnKey` | string | 對應第一列標頭 |
| `kana` | string | 組合後的假名 |
| `romaji` | string | 組合後的羅馬音 |
| `available` | boolean | 此組合是否有效 |

### Rules

- `available = true` 時，`kana` 與 `romaji` 必填。
- `available = false` 時，仍需保留表格格位，不可破壞矩陣結構。
- 假名置上、羅馬音置下，且假名不得換行。

## 8. PracticeRenderConstraint

### Purpose

描述本 feature 驗證用的關鍵版面與初始渲染約束。

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `viewportKey` | string | `mobile-375`、`tablet-768`、`desktop-1024` |
| `horizontalScrollAllowed` | boolean | 是否允許水平捲動 |
| `cropAllowed` | boolean | 是否允許裁切 |
| `overlapAllowed` | boolean | 是否允許重疊 |
| `densityFallbacks` | string[] | 允許的版面退讓順序 |
| `belowDakuonStableOnFirstPaint` | boolean | 首屏是否要求濁音／半濁音以下區塊穩定出現 |

### Rules

- `mobile-375` 必須固定 `horizontalScrollAllowed = false`、`cropAllowed = false`、`overlapAllowed = false`。
- `densityFallbacks` 順序必須先 `reduce-padding` 再 `reduce-font-size`。
- 本 feature 的主要驗收尺寸必須使 `belowDakuonStableOnFirstPaint = true`。
