# 研究報告：N5 文法新增助詞「と」「で」

**Feature**: `specs/015-n5-grammar-notes`
**Date**: 2026-04-10

---

## 決策 1：presentationMode 選擇

**決定**：兩個新 section（particle-to、particle-de）均採用 `info-stack`

**理由**：
- `info-stack` 適合「說明 → 條列要點 → 例句」的三層學習流，能清楚呈現每個助詞用法的 summary、details 與 examples。
- `compare-table` 需要多行對比資料，僅適合有橫向比較需求的 section（如 particle-mo）；兩個新助詞各只有一種核心用法，不需對比。
- `bullet-list` 適合較扁平的條列式內容，層次感不及 `info-stack`。
- 現有單一用法的助詞（particle-ga、particle-wo、particle-ni、particle-he、particle-ka）均採 `info-stack`，保持一致。

**考慮的替代方案**：`bullet-list`（已排除：層次不足）、`compare-table`（已排除：無對比需求）

---

## 決策 2：order 值分配

**決定**：particle-to = 97，particle-de = 98

**理由**：
- 現有助詞 section 的 order 值：wa=90, ga=90.5, wo=90.75, mo=91, no=92, ni=94, he=95, ka=96
- 新助詞依筆記章節順序（ch1 と → ch2 で），接續在 particle-ka（96）後排列
- 使用整數 97、98，與現有使用小數的 section（如 ga=90.5）模式一致（整數=主要項目、小數=子項目，此兩者為獨立主要項目）

**考慮的替代方案**：97.5（已排除：未來可能擠壓其他整數位；兩者為同等地位的獨立 section）

---

## 決策 3：Title 與 Description 分離方式

**決定**：
- `title`: `'助詞 と'` / `'助詞 で'`（純粹識別用，不帶說明）
- `description`: 以一句話說明該助詞的核心角色

**理由**：
- `N5GrammarSectionCard` 元件已支援分離顯示：title 在 header 折疊區，description 在 body 展開後（`v-if="section.description"`）
- FR-010 明確要求：標題不得內嵌說明文字
- 現有 particle sections（如 particle-wa）的 title 帶有說明（`'助詞 は：主題標記與句子焦點'`），但這是既有設計，新 section 不沿用此模式

**考慮的替代方案**：保留「助詞 と：…」格式（已排除：違反 FR-010）

---

## 決策 4：範例生成策略

**決定**：全部範例由 AI 生成，`origin: 'supplemental'`，詞彙與語法難度限定 N5 範圍

**理由**：
- 來源筆記 `v14/note.txt` 僅有兩行章節標題，無任何例句
- 釐清結果（Clarification Q2）已確認此策略
- N5 詞彙範圍：友達、家族、バス、電車、学校、駅、行く、食べる、来る、飲む 等基礎詞彙
- 文型限定：基本 ます形、た形現在過去，不使用 N4 以上文型

---

## 決策 5：「と」名詞並列用法（AとB）的資料位置

**決定**：以 `sharedNote`（`id: 'to-noun-listing'`）安置於 `particle-to` section 的 `sharedNotes[]`；動作夥伴 topic 的 `sharedNoteIds` 引用此 note

**理由**：
- 釐清結果（Clarification Q1）選擇 Option B：sharedNote
- `N5GrammarInfoBlock` 元件將 sharedNote 渲染為「共通提醒」區塊，視覺上明確與 topic 說明區隔
- 名詞並列（AとB）是語意補充，非獨立主要用法；sharedNote 的定位（補充說明）比 topic（主要說明）更貼切

---

## 決策 6：「で」與「でも」的交叉引用方式

**決定**：在 `particle-de` section 的 `sharedNotes[]` 新增 `id: 'de-with-mo'` note，提示「で」可與「も」搭配組成「でも」，並指引至助詞「も」的說明；不重複解釋「でも」完整規則

**理由**：
- 釐清結果（Clarification Q3）選擇 Option B：加提示但不重複解釋
- 現有 `particle-mo` 已有完整「でも」說明（`mo-ni-de` topic），不重複能保持各 section 自足但不冗余
- `sharedNote` 定位為「補充說明/延伸閱讀」，適合此類交叉提示

---

## 決策 7：sourceCoverage 的 sourceId 命名

**決定**：`'note-v14-ch1'`（と）、`'note-v14-ch2'`（で）

**理由**：
- 現有 sourceId 格式：`'note-ch2-wa-core'`（來自 note2 的命名）
- v14 筆記以 `v14` 區分版本，以 `ch1`/`ch2` 對應章節號
- status: `'supplemented'`（筆記提供分類，例句全為補充）

---

## 助詞語法正確性驗證

### 助詞「と」核心語法

**動作夥伴用法**：[人物・N] + と + [動詞]
- 「と」標示動作的同伴，表示主語與某人「一起」進行動作
- 「いっしょに」（一起）常與「と」搭配，可省略其一
- 例：友達と（いっしょに）映画を見ます

**名詞並列用法**：N1 + と + N2
- 表示「A 和 B」，列舉兩個（或多個）名詞
- 例：コーヒーとお茶、ペンと消しゴム

### 助詞「で」核心語法（交通工具/手段）

**手段用法**：[手段・N] + で + [動詞]
- 表示動作所用的交通工具或工具手段
- 例：バスで行く、電車で来る、はしで食べる
- 「で」前接工具性名詞，不接場所性名詞（場所用「に」或「で」有不同語意，屬後續補充範圍）

以上語法均為標準 N5 教材內容，無歧義。
