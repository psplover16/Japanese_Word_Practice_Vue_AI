# Data Model: 字母練習排版與羅馬音補強

## 1. LongVowelRuleRow

### Purpose

描述長音規則表格中的一列，可用於純規則說明或單字範例展示。

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | 穩定識別值，例如 `rule-ei`、`example-au-1` |
| `kind` | string | `rule` 或 `example` |
| `title` | string | 規則或列標題 |
| `description` | string | 規則說明文字；僅 `rule` 列必填 |
| `kana` | string | 假名或單字內容；僅 `example` 列必填 |
| `romaji` | string | 羅馬音；僅 `example` 列必填 |
| `translation` | string | 中文翻譯；僅 `example` 列必填 |
| `groupKey` | string | 所屬規則群組，例如 `ei`、`ou`、`au-exception` |

### Rules

- `kind = rule` 時，該列需獨占整列，不可與範例資料格混排。
- `kind = example` 時，`kana`、`romaji`、`translation` 必須同時存在。

## 2. SyllableRomajiCell

### Purpose

描述清音拗音或合拗音表格中的單一內容格。

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `kana` | string | 假名組合，例如 `きゃ / キャ` |
| `romaji` | string | 對應羅馬音，例如 `kya` |
| `columnKey` | string | 所屬欄位，例如 `ya`、`yu`、`yo` |

### Rules

- 每個內容格都必須有 `kana` 與 `romaji`。
- 羅馬音與假名需在視覺上同屬一格，不可拆到外部 legend。

## 3. SyllableRomajiRow

### Purpose

描述清音拗音或合拗音矩陣中的一列。

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `labelKana` | string | 列標頭假名，例如 `き / キ` |
| `labelRomaji` | string | 列標頭羅馬音，例如 `ki` |
| `cells` | SyllableRomajiCell[] | 該列對應的三個組合格 |

### Rules

- `cells` 依 `ya`、`yu`、`yo` 固定順序排列。
- 若列標頭要顯示羅馬音，標示方式需在同一區塊內保持一致。

## 4. LoanwordMatrixCell

### Purpose

描述外來語擴張矩陣中的單一格位。

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `rowBase` | string | 第一欄基本音 |
| `columnBase` | string | 第一列基本音 |
| `kana` | string | 組合後的假名 |
| `romaji` | string | 對應羅馬音 |
| `isHeader` | boolean | 是否為標頭格 |

### Rules

- `isHeader = true` 時，該格只呈現基本音，不呈現內容格版型。
- `isHeader = false` 時，`kana` 與 `romaji` 必須同時存在，且以「上假名下羅馬音」排列。

## 5. LoanwordMatrix

### Purpose

描述外來語擴張整張矩陣表的結構。

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `columnHeaders` | string[] | 第一列基本音 |
| `rowHeaders` | string[] | 第一欄基本音 |
| `cells` | LoanwordMatrixCell[] | 所有內容格與標頭格 |

### Rules

- 第一列與第一欄必須完整定義，才能推導其餘內容格。
- 內容格不可脫離標頭關係獨立排序，避免失去組合教學語意。

## 6. PracticeLayoutConstraint

### Purpose

描述本 feature 需要維持的關鍵版面約束，用於驗證而非持久化。

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `viewportKey` | string | `mobile-375`、`tablet-768`、`desktop-1024` |
| `horizontalScrollAllowed` | boolean | 是否允許橫向捲動 |
| `overlapAllowed` | boolean | 是否允許重疊 |
| `cropAllowed` | boolean | 是否允許裁切 |
| `densityFallbacks` | string[] | 可採用的密度退讓方式，例如 `reduce-padding`、`reduce-font-size` |

### Rules

- `mobile-375` 必須固定 `horizontalScrollAllowed = false`、`overlapAllowed = false`、`cropAllowed = false`。
- `densityFallbacks` 的順序必須先 `reduce-padding` 再 `reduce-font-size`。
