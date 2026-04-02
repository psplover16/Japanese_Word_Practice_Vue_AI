# Data Model: 單字練習主內容重建

## Overview

本 feature 的資料模型同時服務兩類需求：

1. 忠實表達參考頁的 stage 容器與 table 結構
2. 支援字母範圍過濾、搜尋、註記持久化與長按暫時揭露

資料來源是靜態字典常數，加上少量 localStorage 持久化資料；不涉及後端。

## Entities

### RawVocabularyEntry

- Purpose: 代表來自 `jpWords.js` 的原始字典資料列。
- Fields:
  - `text`: 假名單字。
  - `romanization`: 原始拼音字串。
  - `kanji`: 對應漢字，可為空字串或多行內容。
  - `meaning`: 中文翻譯，可為單行或多行內容。
  - `stage`: 原始 stage 群組名稱。

### VocabularyEntry

- Purpose: 正規化後供 `/vocabulary` 使用的單字資料列。
- Fields:
  - `id`: 依原始順序補上的穩定整數或字串型識別值。
  - `text`: 假名單字原文。
  - `romanization`: 正規化後保留原始語意的拼音。
  - `kanji`: 漢字內容。
  - `meaning`: 中文翻譯內容。
  - `stage`: stage 名稱。
  - `textKanaUnits[]`: 供字母篩選使用的假名單位。
  - `hasKanji`: 是否存在可顯示漢字內容。
- Relationships:
  - 一個 `VocabularyEntry` 屬於一個 `VocabularyStageGroup`。
  - 一個 `VocabularyEntry` 可對應零或一筆 `VocabularyMarkRecord`。

### VocabularyStageGroup

- Purpose: 代表畫面上的一個 stage 容器與其所屬資料列。
- Fields:
  - `stage`: stage 名稱。
  - `entries[]`: 屬於此 stage 的 `VocabularyEntry`。
  - `visibleEntries[]`: 套用目前 filter 後實際可見的資料列。
  - `visibleCount`: 目前可見資料列數。
- Relationships:
  - 一個 `VocabularyStageGroup` 對應畫面上的一個容器 / table 區塊。

### VocabularyFilterState

- Purpose: 代表 `/vocabulary` 畫面目前的搜尋與條件狀態。
- Fields:
  - `searchText`: 搜尋 input 內容。
  - `showAllSounds`: `全部字音` checkbox 狀態。
  - `showKanji`: `漢字` checkbox 狀態。
  - `showMarkedOnly`: `只顯示註記` checkbox 狀態。
  - `practiceMode`: `練習` checkbox 狀態。
  - `columnVisibility`: 各欄位 header checkbox 狀態集合。
  - `allowedKanaSet`: 從 `PracticeSession` 導出的可用字母集合。

### VocabularyColumnVisibility

- Purpose: 代表表格欄位的顯示規則。
- Fields:
  - `word`: 單字欄是否顯示內容。
  - `kanji`: 漢字欄是否顯示內容。
  - `romaji`: 拼音欄是否顯示內容。
  - `meaning`: 中文欄是否顯示內容。
  - `mark`: 註記欄是否顯示內容。
  - `preserveLayoutWhenHidden`: 隱藏內容時是否仍保留欄位佔位。

### VocabularyMarkSnapshot

- Purpose: localStorage 中保存的註記資料快照。
- Fields:
  - `version`: 資料格式版本，用於未來升級或驗證。
  - `markedIds[]`: 被註記的 `VocabularyEntry.id` 集合。
  - `updatedAt`: 最後更新時間。

### VocabularyMarkRecord

- Purpose: 代表單一資料列目前是否被註記與對應提示狀態。
- Fields:
  - `entryId`: 對應的 `VocabularyEntry.id`。
  - `marked`: 是否被註記。
  - `highlighted`: 畫面上是否顯示註記提示背景。

### VocabularyRevealState

- Purpose: 代表長按互動期間單列的暫時揭露狀態。
- Fields:
  - `entryId`: 正在被揭露的 `VocabularyEntry.id`。
  - `active`: 是否處於揭露中。
  - `startedAt`: 開始計時時間。
  - `thresholdMs`: 觸發揭露的長按門檻，預計約 500ms。

## Derived View Rules

- `VocabularyEntry` 的 `id` 必須依原始字典順序穩定產生，後續註記持久化只儲存此值。
- `VocabularyStageGroup.visibleEntries[]` 由 `VocabularyFilterState`、`VocabularyMarkSnapshot` 與 `/practice` 勾選狀態共同決定。
- `VocabularyColumnVisibility` 控制的是內容顯示，而不是欄位是否從 DOM 消失；需要保留佔位時必須維持 table 結構。
- `VocabularyRevealState.active = true` 時，單列暫時忽略欄位內容隱藏規則，但不改變 checkbox 真實值。

## Validation Rules

- `RawVocabularyEntry` 必須至少包含 `text`、`romanization`、`kanji`、`meaning`、`stage` 五個欄位。
- `VocabularyEntry.id` 必須唯一，且重新載入後對同一份字典資料保持穩定。
- `VocabularyMarkSnapshot.markedIds[]` 中的值必須全部對應到存在的 `VocabularyEntry.id`；若格式錯誤，整份 snapshot 視為無效並清除。
- `VocabularyFilterState.searchText` 的比較必須安全處理空字串與大小寫／全形差異，不得造成 runtime error。
- stage 容器順序必須依原始資料首次出現順序固定，不可在 runtime 任意排序。
