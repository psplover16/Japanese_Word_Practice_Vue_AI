# Data Model: 變化規則主內容重建

## Overview

本 feature 的資料模型以「可忠實表達參考頁 DOM 結構」為目標，而不是追求高度通用。資料全部是靜態常數，不涉及後端或持久化。

## Entities

### GrammarSectionSpec

- Purpose: 定義 `/grammar` 頁中的一個主要容器。
- Fields:
  - `id`: 穩定識別值，供測試與後續 CRUD 使用。
  - `title`: 容器標題。
  - `subtitle`: 可選，多行副標題。
  - `kind`: 由哪一類 renderer 負責。
  - `defaultExpanded`: 預設展開狀態。
  - `payloadKey`: 指向對應資料集。
- Relationships:
  - 一個 `GrammarSectionSpec` 對應一個 renderer 與一組 payload。

### SystemDifferenceRow

- Purpose: 表示「語法系統差異」比較表中的一列。
- Fields:
  - `name`: 比較項目名稱。
  - `cnContent`: 中文側主說明。
  - `cnExamples[]`: 中文側例句。
  - `jpContent`: 日文側主說明。
  - `jpExamples[]`: 日文側例句。

### RuleListItem

- Purpose: 表示「各活用型意義」與「動詞型態分辨」這類規則清單表中的一則規則。
- Fields:
  - `rules`: 主規則文字。
  - `examples[]`: 可選例句，包含 `verb` 與 `meaning`。

### InflectionSeries

- Purpose: 表示活用表中的一個形態區塊。
- Fields:
  - `base`: 形態名稱，例如未然形、連用形。
  - `baseEnding`: 詞尾或詞幹變化。
  - `suffixAndMeaning[]`: 後接詞尾與意義對照。

### SoundChangeRule

- Purpose: 表示五段動詞音便表中的一列。
- Fields:
  - `base`: 音便類型。
  - `jisho[][]`: 原始辭書型詞尾群組。
  - `renyouTe[]`: て形結果。
  - `renyouTa[]`: た形結果。

### PosConversionGroup

- Purpose: 表示「詞性變化規則」中的一個主題群組。
- Fields:
  - `title`: 主題標題。
  - `contents[]`: 子區塊列表。

### PosConversionEntry

- Purpose: 表示一個主題群組下的單一條目。
- Fields:
  - `subTitle`: 子標題。
  - `subContents[]`: 條列說明。
  - `examples[]`: 範例列表。

## Derived View Rules

- `GrammarSectionSpec.kind = system-difference`
  - 由 `SystemDifferenceTable.vue` 渲染。
- `GrammarSectionSpec.kind = rule-list`
  - 由 `RuleListTable.vue` 渲染。
- `GrammarSectionSpec.kind = godan-table`
  - 由 `GodanVerbTable.vue` 渲染。
- `GrammarSectionSpec.kind = inflection-table`
  - 由 `InflectionTable.vue` 渲染。
- `GrammarSectionSpec.kind = pos-conversion`
  - 由 `PosConversionTable.vue` 渲染。

## Validation Rules

- `GrammarSectionSpec.id` 必須唯一。
- section 順序必須固定為參考頁順序，不可在 runtime 任意排序。
- 含 `subtitle` 的 section 必須保留原始換行。
- 需要 `tfoot`、`rowspan`、`colspan` 的 payload 不可被降級為扁平 rows。
- 所有 payload 的最小單位都應能被 component test 直接定位。
