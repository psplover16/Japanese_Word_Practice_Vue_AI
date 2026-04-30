# 研究報告：N5 文法、單字與サ變動詞學習內容整理

**Feature**: `specs/017-refine-n5-content`  
**Date**: 2026-04-28

## 決策 1：N5 文法仍採資料驅動 section 架構

**Decision**：所有 `/n5-grammar` 新內容優先新增於 `src/modules/n5Grammar/data/grammarNotes.ts`，沿用 `N5GrammarSection`、`N5GrammarTopic`、`N5GrammarExample` 與 `N5GrammarSourceCoverageItem`。

**Rationale**：

- 現有 view 與 renderer 已能處理 `compare-table`、`info-stack`、`bullet-list`。
- 規格重點是內容整理、排序與 coverage，最小變更應集中在資料層。
- 測試可直接驗證 section id、order、category、source coverage 與 examples。

**Alternatives considered**：

- 新增專用 route 或 view：排除，規格要求使用既有 `/n5-grammar`。
- 以 Markdown 或外部 JSON 載入：排除，會引入新的資料流程與測試負擔。

## 決策 2：`note2.txt` 放在 N5 文法最上方

**Decision**：`v16/note2.txt` 的四類核心字詞使用方式形成第一個 core section，例如 `core-term-usage-overview`，order 低於既有 `polite-overview`。

**Rationale**：

- 使用者明確要求 `note2.txt` 內容放在 `/n5-grammar` 所有內容的最優先排序。
- 該檔是 `い形容詞`、`な形容詞`、名詞、動詞的基礎差異，適合放在所有句型前。
- 放在最上方可降低後續 `できる`、助詞、疑問詞、指示詞與時間表現的理解門檻。

**Alternatives considered**：

- 合併到既有 `sentence-basics`：排除，會讓 `note2.txt` 的最高優先與完整覆蓋較難驗證。
- 放在既有 core section 後：排除，違反排序需求。

## 決策 3：`note.txt` 依章節建立可追蹤 coverage

**Decision**：將 `v16/note.txt` 拆成下列 source coverage 粒度：`note-v16-ch0-dekiru`、`note-v16-ch1-wo`、`note-v16-ch2-de`、`note-v16-ch3-kara`、`note-v16-ch4-made`、`note-v16-ch5-question-words`、`note-v16-ch6-demonstratives`、`note-v16-ch7-numbers`、`note-v16-ch8-time-expressions`。

**Rationale**：

- 章節本身已清楚標示文法主題，直接映射最容易驗證 100% 覆蓋率。
- 助詞章節可用 category/order 保證最後排序。
- 非助詞章節可維持來源順序，又能插入 `できる` 到指定位置。

**Alternatives considered**：

- 依最終 UI 合併 coverage：排除，會讓漏收來源筆記較難追蹤。
- 只以檔名記一筆 coverage：排除，無法證明每章都被收錄。

## 決策 4：助詞排序採 category + order 雙重保護

**Decision**：新增 `を`、`で`、`から`、`まで` 助詞內容時，使用 `category: 'particle'` 並追加到 `particleSectionIds` 尾端；`sortedN5GrammarSections` 仍以 category/order 保持助詞群組最後。

**Rationale**：

- 現有資料已用 `particleSectionIds` 與 `category` 驗證助詞順序。
- 新增助詞若只靠 order，未來容易被 core section 插入影響。
- 規格要求 UI 不顯示分類，但排序必須反映分類。

**Alternatives considered**：

- 顯示「助詞」分組標籤：排除，規格明確說分類不在 UI 顯示。
- 只用單一大助詞 section：排除，會削弱 `を`、`で`、`から`、`まで` 的獨立學習與測試性。

## 決策 5：指示詞與數字圖片轉成表格資料

**Decision**：`here.png`、`number.png`、`number2.png` 的內容在實作時轉成靜態表格資料，不直接在頁面嵌入圖片。表格 cell 需要能放多行資訊，例如詞性、後接詞性、特別事項與例句摘要。

**Rationale**：

- 使用者要求圖片內容轉換成表格，且表格行列需與圖片相同。
- 文字表格可被測試、搜尋與響應式排版控制。
- 圖片本身不利於例句紅字標記與手機可讀性。

**Alternatives considered**：

- 直接顯示圖片並補文字說明：排除，無法滿足轉表格需求。
- 把所有內容改成長條列：排除，會失去來源圖片的行列比較價值。

## 決策 6：例句重點標記採資料欄位，不在句子中嵌入 HTML

**Decision**：若現有 `N5GrammarExample` 無法標記「これ」「この」「どこ」等重點字，新增最小欄位（例如 highlight terms 或 segments）由 renderer 負責輸出樣式；不得把 HTML 字串放入資料。

**Rationale**：

- 可避免字串中混入 HTML 造成安全與維護問題。
- 測試可以直接驗證高亮元素與純文字內容。
- 符合 Vue 元件資料驅動模式。

**Alternatives considered**：

- 在 `japanese` 欄位直接放 `<span>`：排除，會污染資料且增加 escaping 風險。
- 只用 CSS 搜尋文字自動標紅：排除，規則過於隱性，容易標錯。

## 決策 7：サ變動詞例句採最小型別擴充

**Decision**：保留既有 `InflectionTableSpec` 主表，新增可選例句群組欄位或相鄰資料結構，讓 `InflectionTable.vue` 在サ變區塊表格下方顯示 `散歩` 例句。

**Rationale**：

- 規格要求保留既有差異表格並在下方補例句。
- 現有 `InflectionTableSpec` 沒有例句群組欄位，最小擴充比新建 renderer 更穩。
- 其他活用表不需要被迫顯示例句區。

**Alternatives considered**：

- 新增 `SahenTable.vue`：排除，目前差異只在表格下方例句，不足以成立新 renderer。
- 把例句塞進 `meaning` 欄位：排除，會破壞表格語意與測試可讀性。

## 決策 8：方位詞字典採尾端追加與重複查核

**Decision**：`東口`、`西口`、`北口`、`南口` 先以 kanji/text/meaning 查核既有資料；缺漏者追加到 `rawVocabularyEntries` 尾端，保持既有欄位格式與 id 正規化流程。

**Rationale**：

- 既有 vocabulary 測試已採尾端追加慣例。
- 尾端追加不重排既有 id，能降低回歸風險。
- 重複查核符合規格要求。

**Alternatives considered**：

- 插入分類附近：排除，會重排大量 id。
- 新增獨立 stage：排除，規格沒有新分類需求。
