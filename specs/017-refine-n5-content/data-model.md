# 資料模型：N5 文法、單字與サ變動詞學習內容整理

**Feature**: `specs/017-refine-n5-content`  
**Date**: 2026-04-28

## 異動摘要

| 異動類型 | 位置 | 說明 |
|----------|------|------|
| 新增 N5 core section | `n5GrammarSections[]` | `note2.txt` 核心字詞、`できる`、疑問詞、指示詞、數字、時間表現 |
| 新增 N5 particle section | `n5GrammarSections[]` / `particleSectionIds` | `を`、動作地點 `で`、起點/經由點 `から`、終點/限界 `まで` |
| 新增 source coverage | `n5GrammarSourceCoverage[]` | `note-v16-*` coverage ids，對應每個來源章節 |
| 視需要擴充 example 型別 | `N5GrammarExample` 或相鄰型別 | 支援指示詞例句內的重點字紅色標記 |
| 擴充サ變例句資料 | `InflectionTableSpec` 或相鄰型別 | 表格下方以 `散歩` 顯示指定型態例句 |
| 新增單字詞條 | `rawVocabularyEntries[]` | `東口`、`西口`、`北口`、`南口`，缺漏者追加尾端 |

## N5GrammarSection

### 既有欄位

| 欄位 | 用途 | 本次規則 |
|------|------|----------|
| `id` | section 穩定識別 | 使用 `note-v16` 主題語意命名，例如 `dekiru-ability`、`particle-wo` |
| `title` | 卡片標題 | 不夾帶整段說明 |
| `description` | 標題下方獨立說明 | 用於學習目標或來源重點摘要 |
| `presentationMode` | renderer 選擇 | 沿用 `info-stack`、`compare-table`、`bullet-list` |
| `order` | 排序 | `note2` 最小；core 依來源順序；particle 使用最後排序區間 |
| `category` | 隱性分類 | `core` 或 `particle`，UI 不直接顯示 |
| `topics` | 學習主題 | 每個 topic 必須有 summary、details、examples、sourceRefs |
| `sharedNotes` | 共通註記 | 用於重複註記或跨 topic 比較 |
| `table` | 比較表 | 用於核心字詞總覽、指示詞、數字等表格型內容 |
| `tableExampleGroups` | 表格例句 | 表格儲存格或 row 對應例句 |

### 新增 core sections

| Section | 來源 | presentation | 排序意圖 |
|---------|------|--------------|----------|
| `core-term-usage-overview` | `note2.txt` | `compare-table` 或 `info-stack` | 全站 N5 文法最上方 |
| `dekiru-ability` | `note.txt ch0` | `info-stack` 或 `compare-table` | 既有邀約區塊後 |
| `question-words` | `note.txt ch5` | `info-stack` | 依來源在非助詞區 |
| `demonstratives` | `note.txt ch6` | `compare-table` | 依來源在非助詞區 |
| `numbers` | `note.txt ch7` | `compare-table` + 說明 + 會話 | 依來源在非助詞區 |
| `time-expressions` | `note.txt ch8` | `compare-table` / `info-stack` | 依來源在非助詞區 |

### 新增 particle sections

| Section | 來源 | 重點 |
|---------|------|------|
| `particle-wo` | `note.txt ch1` | 動作對象、結果目的語、經過點、離脫點與長句解析 |
| `particle-de-location` | `note.txt ch2` | 動作進行地點 `で`，並比較 `に` 的落點/停留 |
| `particle-kara` | `note.txt ch3` | 時間起點、場所起點、經由點、位置起點、來源 |
| `particle-made` | `note.txt ch4` | 時間終點、場所終點、限界與 `朝から晩まで` |

## N5GrammarTopic

| 欄位 | 驗證規則 |
|------|----------|
| `id` | 在所有 section topics 中唯一 |
| `title` | 能獨立辨識文法主題 |
| `summary` | 非空，描述學習重點 |
| `details` | 至少 1 條；補足來源片段與錯誤修正 |
| `examples` | 至少 1 筆；優先使用來源例句，必要時補充 |
| `sourceRefs` | 至少 1 個 `note-v16-*` id |
| `sharedNoteIds` | 只引用同 section 存在的 sharedNotes |

## N5GrammarExample

| 欄位 | 驗證規則 |
|------|----------|
| `id` | 穩定且唯一 |
| `japanese` | 非空；不得包含 HTML |
| `reading` | 需要假名或拆解時提供 |
| `translation` | 繁中翻譯，非空 |
| `note` | 用於補充詞性、語氣或長句解析 |
| `origin` | `source` 或 `supplemental` |
| `highlightTerms`（視需要新增） | 用於指示詞例句重點字標記，不直接嵌 HTML |

## Source Coverage

| sourceId | mappedSectionId | status |
|----------|-----------------|--------|
| `note-v16-note2-core-terms` | `core-term-usage-overview` | `supplemented` |
| `note-v16-ch0-dekiru` | `dekiru-ability` | `supplemented` |
| `note-v16-ch1-wo` | `particle-wo` | `supplemented` |
| `note-v16-ch2-de` | `particle-de-location` | `supplemented` |
| `note-v16-ch3-kara` | `particle-kara` | `supplemented` |
| `note-v16-ch4-made` | `particle-made` | `supplemented` |
| `note-v16-ch5-question-words` | `question-words` | `supplemented` |
| `note-v16-ch6-demonstratives` | `demonstratives` | `supplemented` |
| `note-v16-ch7-numbers` | `numbers` | `supplemented` |
| `note-v16-ch8-time-expressions` | `time-expressions` | `supplemented` |

## サ變動詞例句組

### 建議型別

```ts
export interface InflectionExample {
  id: string;
  form: string;
  japanese: string;
  reading?: string;
  translation: string;
  note?: string;
}

export interface InflectionExampleGroup {
  id: string;
  title: string;
  examples: InflectionExample[];
}
```

### 驗證規則

| 欄位 | 規則 |
|------|------|
| `form` | 至少包含 `しません`、`しませんでした`、`しない`、`した` |
| `japanese` | 以 `散歩` 作為主體詞，形成完整句 |
| `translation` | 繁中翻譯，非空 |
| 顯示位置 | サ變表格下方，不取代表格 |

## VocabularyEntry

### 新增/確認詞條

| kanji | text | romanization | meaning | stage |
|-------|------|--------------|---------|-------|
| `東口` | `ひがしぐち` | `hi-ga-shi-gu-chi` | `東口` | `Stage1_基礎生活` |
| `西口` | `にしぐち` | `ni-shi-gu-chi` | `西口` | `Stage1_基礎生活` |
| `北口` | `きたぐち` | `ki-ta-gu-chi` | `北口` | `Stage1_基礎生活` |
| `南口` | `みなみぐち` | `mi-na-mi-gu-chi` | `南口` | `Stage1_基礎生活` |

### 驗證規則

- 若相同 `kanji` 與 `meaning` 已存在，不再新增。
- 若缺漏，追加到 `rawVocabularyEntries` 尾端。
- 正規化後 id 必須穩定遞增。
- 搜尋與標記流程沿用既有 `VocabularyEntry` 行為。

## 狀態與排序

| 狀態 | 規則 |
|------|------|
| N5 初始渲染 | section 預設收合；標題與 description 可辨識 |
| N5 展開 | renderer 依 `presentationMode` 呈現；不可空白 |
| N5 排序 | `note2` 第一；core 依來源順序；particle 最後 |
| Grammar 展開 | サ變表格與例句皆顯示 |
| Vocabulary 搜尋 | 四個方位詞可搜尋 |

## 型別相容性結論

- N5 文法大多可用既有型別承載；唯一可能擴充點是例句內重點字標記。
- サ變動詞表格需要可選例句資料，不應用現有 `meaning` 欄硬塞。
- Vocabulary 不需要型別變更。
