# 研究報告：N5 文法新增邀約與變化表現整理

**Feature**: `specs/016-n5-change-invitation`  
**Date**: 2026-04-16

---

## 決策 1：區塊粒度採 4 個獨立 core sections

**Decision**：依 `v15/note.txt` 的 ch1 到 ch4 各建立 1 個可獨立閱讀的 core section，而不是把 4 章合併為單一大區塊。

**Rationale**：
- 規格明確要求各章節必須保有可獨立辨識的學習區塊。
- 來源筆記順序本身就是學習節奏，直接對應成 section 最容易維持 coverage 與 source mapping。
- 既有 `/n5-grammar` 已採 section → topic 的資料驅動模式，新增 section 的整合成本最低。

**Alternatives considered**：
- 單一大型 section + 多個 topics：已排除，會削弱章節獨立性，也較難從頁面順序對照來源筆記。
- 2 個 section（邀約類 / 狀態變化類）：已排除，雖然比較精簡，但會打亂來源章節的閱讀順序。

---

## 決策 2：presentation mode 選擇

**Decision**：
- ch1 `ませんか vs ましょう`：使用 `compare-table`
- ch2 `～くなります / ～になります`：使用 `info-stack`
- ch3 `～くします / ～にします`：使用 `info-stack`
- ch4 `～ましょう` 補充整理：使用 `info-stack`

**Rationale**：
- ch1 的核心價值是比較兩種邀約語氣與普通體對照，用 `compare-table` 最能快速理解差異。
- ch2、ch3 各自重點在詞類接續、語意與例句，`info-stack` 更適合「說明 → 細節 → 例句」結構。
- ch4 雖與 ch1 有關，但筆記本身包含獨立補充內容，例如 `帰ろう` 對照與勸誘語氣例句，獨立 `info-stack` 能保留章節完整性。

**Alternatives considered**：
- 全部統一 `info-stack`：已排除，ch1 的比較性不足。
- 全部統一 `compare-table`：已排除，ch2~ch4 的規則與例句敘述較多，表格可讀性反而較差。

---

## 決策 3：插入位置與 order 分配

**Decision**：新 section 以 core 類別插入既有三個 core sections 之後，使用連續 order `4`、`5`、`6`、`7`，整體仍位於 particle 群組之前。

**Rationale**：
- 目前 core sections order 為 1、2、3，particle 從 90 起跳；使用 4~7 最符合現有排序空間。
- 規格已預設新內容接在既有 core 之後，可降低既有頁面學習節奏被打斷的風險。
- 以整數連續遞增最單純，不需要插入小數 order。

**Alternatives considered**：
- 插入到既有 core section 中間：已排除，會打亂目前 `/n5-grammar` 的已交付學習流程。
- 以 10、20、30、40 保留空間：已排除，目前沒有必要增加排序複雜度。

---

## 決策 4：來源例句與補充例句策略

**Decision**：優先沿用 `v15/note.txt` 已存在且可修正成正確句子的例句，必要時再補充 `origin: 'supplemental'` 的新例句；若原句只有片段或明顯錯誤，會以校正後內容或全新例句補齊。

**Rationale**：
- 規格要求優先使用來源筆記例句，而不是全部改寫成 AI 自造例句。
- `v15` 與 `v14` 不同，已提供多個可用例句與片段，適合保留來源學習脈絡。
- 透過 `origin` 可在資料層區分來源內容與補充內容，便於之後驗證 coverage 與內容責任。

**Alternatives considered**：
- 全部改寫成全新例句：已排除，會失去與來源筆記的對應。
- 完全照抄來源片段：已排除，無法滿足可學習與正確性要求。

---

## 決策 5：source coverage 命名

**Decision**：新增 `note-v15-ch1`、`note-v15-ch2`、`note-v15-ch3`、`note-v15-ch4` 四筆 source coverage。

**Rationale**：
- 現有 `grammarNotes.ts` 已使用 `note-v14-ch1`、`note-v14-ch2` 等版本化命名模式。
- 直接對應章節編號最容易追蹤 coverage 與未來擴充版本。

**Alternatives considered**：
- 依文法名稱命名（如 `note-v15-invitation`）：已排除，章節對應性較弱。

---

## 決策 6：不新增新 renderer 或 route 元件

**Decision**：所有新內容維持在 `grammarNotes.ts` 資料層擴充，直接交由既有 `N5GrammarSectionCard`、`N5GrammarInfoBlock`、`N5GrammarCompareTable`、`N5GrammarBulletBlock` 渲染，不新增 route 元件或共用樣式抽象。

**Rationale**：
- 目前資料模型與 renderer 已足以承載新內容。
- 這是最簡可行方案，能降低 render regression 與 route 外溢風險。
- 憲章要求避免為了方便而引入不必要複雜度。

**Alternatives considered**：
- 新增專屬 renderer：已排除，目前無新視覺需求足以 justify。
- 在 view 中加條件分支：已排除，會把內容責任從資料層拉回 view，增加維護成本。
