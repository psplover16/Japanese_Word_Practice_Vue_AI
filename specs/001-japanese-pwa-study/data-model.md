# Data Model: 日語學習 PWA

## 1. KanaCell

### Purpose

描述 `tableA` 或 `tableB` 中一個可練習的假名單位。

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | 穩定識別值，例如 `tableA-ka` |
| `table` | string | `tableA` 或 `tableB` |
| `rowKey` | string | 所屬行識別，例如 `k-row` |
| `columnKey` | string | 所屬段識別，例如 `i-column` |
| `romaji` | string | Hepburn 羅馬拼音 |
| `hiragana` | string | 平假名文字 |
| `katakana` | string | 片假名文字 |
| `archaic` | boolean | 是否屬於古語假名 |
| `selectable` | boolean | 是否可勾選 |

### Rules

- `archaic = true` 的格位在 `古語假名` 未勾選時，仍保留格位但呈現 placeholder。
- `selectable = false` 的格位不得出現在考試題庫中。

## 2. SelectionState

### Purpose

描述第一頁共享給全站的勾選狀態。

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `selectedKanaIds` | string[] | 已勾選的 tableA / tableB 假名 |
| `includeHiragana` | boolean | 是否將平假名納入題目 |
| `includeKatakana` | boolean | 是否將片假名納入題目 |
| `allKanaSelected` | boolean | `全選／全不選` 的衍生狀態 |
| `dakuonSelected` | boolean | `濁音／半濁音` 的衍生狀態 |
| `optionSelections` | record | `促音`、`拗音／合拗音／長音符` 的勾選狀態 |
| `showArchaicKana` | boolean | 是否顯示古語假名 |
| `questionCountInput` | number | 目前題數欄位值 |

### Rules

- 此狀態跨路由保留，但不跨重新整理保存。
- 第二頁與第三頁只能讀取，不得修改。

## 3. SelectionDetailItem

### Purpose

供第二頁與第三頁顯示的唯讀明細項目。

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | 穩定識別值 |
| `source` | string | `tableA`、`tableB` 或 `checkboxGroupA` |
| `label` | string | 畫面可閱讀文字 |
| `kind` | string | `kana` 或 `option` |

### Rules

- `label` 不得是布林值、id 或 key。
- 第一頁不得渲染此集合專用的明細 panel。

## 4. ExamQuestionCard

### Purpose

描述 modal 中一題考題的顯示與流程狀態。

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | 題目識別值 |
| `kanaId` | string | 對應的 `KanaCell.id` |
| `script` | string | `hiragana` 或 `katakana` |
| `promptText` | string | 題目區顯示的假名 |
| `answerText` | string | 答案區顯示的羅馬拼音 |
| `hintText` | string | 提示區文字 |
| `answerRevealed` | boolean | 是否已揭曉答案 |
| `unknownMarked` | boolean | 本題是否已記錄 `我不清楚` |

### Rules

- 同一題不論在答案揭曉前或後按幾次 `我不清楚`，`unknownMarked` 都只允許變成一次。

## 5. LatestUnknownResultEntry

### Purpose

描述最近一次結算中的單一假名結果。

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `kanaId` | string | 對應 `KanaCell.id` |
| `hiragana` | string | 平假名 |
| `katakana` | string | 片假名 |
| `romaji` | string | 羅馬拼音 |
| `count` | number | 本次考試被標記 `我不清楚` 的次數 |

## 6. LatestUnknownResultSnapshot

### Purpose

描述最近一次完整結算結果。

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `updatedAt` | string | ISO 時間字串 |
| `totalUnknownCount` | number | 全部 `我不清楚` 記錄次數 |
| `results` | LatestUnknownResultEntry[] | 本次結果清單 |

### Rules

- 每次新結算都覆蓋舊資料。
- 若解析失敗，資料必須被刪除。

## 7. PwaUpdateNotice

### Purpose

描述 PWA 新版本更新提示的畫面狀態。

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `visible` | boolean | 是否顯示提示 |
| `message` | string | 提示文字 |
| `expiresInMs` | number | 自動消失倒數 |
| `eligible` | boolean | 是否符合手機獨立 app 顯示條件 |
| `deferred` | boolean | 是否已延後到下次重開再更新 |
