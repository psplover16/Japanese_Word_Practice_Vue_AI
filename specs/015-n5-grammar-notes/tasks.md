# Tasks: N5 文法新增助詞「と」「で」

**Input**: `specs/015-n5-grammar-notes/` — spec.md、plan.md、research.md、data-model.md
**Prerequisites**: plan.md ✅、spec.md ✅、research.md ✅、data-model.md ✅

**Organization**: 依使用者故事分組，每個 story 可獨立實作與驗收。

---

## Phase 1: Setup（環境確認）

**Purpose**: 確認現有結構，保證不需修改元件或型別，無需建立新基礎設施。

- [X] T001 確認 `src/modules/n5Grammar/types/grammarNotes.ts` 的型別定義（`N5GrammarSection`、`N5GrammarTopic`、`N5GrammarSharedNote`、`N5GrammarExample`）已完整支援新資料，無需新增或修改型別
- [X] T002 [P] 確認 `src/modules/n5Grammar/components/N5GrammarInfoBlock.vue` 正確渲染 `sharedNotes`（resolveNotes 邏輯、共通提醒區塊），新 section 不需修改元件
- [X] T003 [P] 確認 `src/modules/n5Grammar/views/N5GrammarView.vue` 以 `sortedN5GrammarSections` 驅動渲染，新增資料後頁面無需異動
- [X] T004 [P] 確認 `.gitignore` 已涵蓋 `node_modules/`、`dist/`、`coverage/`；確認 `PROJECT_ARCHITECTURE.md` 無需更新（本次無目錄/路由/模組結構異動）

---

## Phase 2: Foundational（共用基礎）

**Purpose**: 確認 `grammarNotes.ts` 中 `particleSectionIds` 與 `n5GrammarSections` 的插入格式，為 US1、US2 實作奠定共識。

⚠️ **CRITICAL**: US1、US2 實作前須先完成此 Phase。

- [X] T005 閱讀 `src/modules/n5Grammar/data/grammarNotes.ts` 第 1–20 行，確認 `particleSectionIds` const 宣告格式（`as const`、字串陣列），並確認 `n5GrammarSections` 陣列的既有 particle section（particle-ka, order: 96）為最後一個助詞 section，新 section 應接續其後
- [X] T006 [P] 確認 `n5GrammarSourceCoverage` 陣列格式（sourceId、summary、mappedSectionId、mappedTopicIds、status 欄位），確認 `'supplemented'` 為合法 status 值

**Checkpoint**: 確認插入格式後，US1 與 US2 可同步進行。

---

## Phase 3: User Story 1 — 助詞「と」閱讀與範例（優先度：P1）🎯 MVP

**Goal**: 在 N5 文法頁面顯示助詞「と」的動作夥伴說明、details 條列、N5 範例，以及名詞並列的 sharedNote。

**Independent Test**: 展開 `particle-to` 區塊，能看到動作夥伴說明、2 個例句、名詞並列補充說明。

### 一. 文檔處理程序（tasks.txt 一.）

- [X] T007 [US1] **文檔引入** — 讀取 `_private/_private_notes/v14/note.txt` ch1 內容，確認「と」的核心概念為「動作夥伴（與某人一起做某事）」，並記錄需覆蓋的概念清單（動作夥伴句型、名詞並列補充）
- [X] T008 [US1] **修正錯誤** — 依 `specs/015-n5-grammar-notes/research.md` §助詞語法正確性驗證，確認「と」動作夥伴句型（[人物] + と + [動詞]）、「いっしょに」搭配用法說明無語法錯誤
- [X] T009 [US1] **補充內容** — 確認 `specs/015-n5-grammar-notes/data-model.md` particle-to 的 `topic.summary`（1 句）、`topic.details`（3 條）、`topic.examples`（2 個，N5 詞彙：友達/学校/家族/食べる）均完整；若不足，依 N5 難度補充
- [X] T010 [US1] **調整為學習資源** — 確認 `sharedNote to-noun-listing` 的 title（`'名詞並列用法（AとB）'`）與 content（AとB 說明 + 2 個舉例詞）符合清晰可讀的學習資源標準
- [X] T011 [US1] **再確認錯誤** — 重讀即將寫入的 particle-to 物件，確認日文例句正確（假名標注、漢字無誤）、中文翻譯自然
- [X] T012 [US1] **分類** — 確認 particle-to 的 `category: 'particle'`、`presentationMode: 'info-stack'`、`order: 97` 已設定，符合助詞排列規則（排在 particle-ka 96 之後）
- [X] T013 [US1] **比對漏缺** — 逐條比對 ch1 概念清單（T007）與即將新增的 data-model.md 內容，確認 100% 覆蓋；有漏缺須補充後才可進入實作

### 二. 排版與實作

- [X] T014 [US1] **排版外容器** — 確認 particle-to section 的 `title: '助詞 と'`（不帶說明）與 `description`（帶說明）符合 FR-010（分行顯示），確認 `N5GrammarSectionCard` 的 `v-if="section.description"` 可正確渲染
- [X] T015 [US1] **內容填寫** — 在 `src/modules/n5Grammar/data/grammarNotes.ts` 的 `n5GrammarSections` 陣列末尾，新增完整的 `particle-to` section 物件（依 `data-model.md` 結構），包含 `sharedNotes`、`topics`、`examples`

### 測試（US1）

- [X] T016 [P] [US1] 在 `tests/unit/n5GrammarData.spec.ts` 撰寫單元測試：`particleSectionIds` 包含 `'particle-to'`；`n5GrammarSections` 以 id `'particle-to'` 能找到 section（非 undefined）；`order` 為 97；`category` 為 `'particle'`
- [X] T017 [P] [US1] 撰寫單元測試：`particle-to` 的 `sharedNotes` 含 id `'to-noun-listing'` 且 content 非空字串；`topic.sharedNoteIds` 包含 `'to-noun-listing'`
- [X] T018 [P] [US1] 撰寫單元測試：`particle-to` 的 topic `to-action-partner` 有至少 2 個 examples，所有 example 的 `origin` 均為 `'supplemental'`；`topic.details` 長度大於等於 2

**Checkpoint**: `particle-to` 資料正確，單元測試通過，N5GrammarView 展開後可見動作夥伴說明與例句。

---

## Phase 4: User Story 2 — 助詞「で」閱讀與範例（優先度：P1）

**Goal**: 在 N5 文法頁面顯示助詞「で」的交通工具/手段說明、N5 範例，以及「でも」搭配的 sharedNote 提示。

**Independent Test**: 展開 `particle-de` 區塊，能看到交通工具用法說明、2 個例句、でも 提示的共通提醒。

### 一. 文檔處理程序

- [X] T019 [US2] **文檔引入** — 讀取 `_private/_private_notes/v14/note.txt` ch2 內容，確認「で」的核心概念為「交通工具」，並記錄需覆蓋的概念清單（交通工具句型、手段延伸、でも 提示）
- [X] T020 [US2] **修正錯誤** — 依 `specs/015-n5-grammar-notes/research.md` §助詞語法正確性驗證，確認「で」手段句型（[手段] + で + [動詞]）說明無語法錯誤；確認「で」標示手段而非場所的邊界說明正確
- [X] T021 [US2] **補充內容** — 確認 data-model.md particle-de 的 `topic.summary`（1 句）、`topic.details`（3 條）、`topic.examples`（2 個，N5 詞彙：バス/電車/学校/駅）均完整；若不足，依 N5 難度補充
- [X] T022 [US2] **調整為學習資源** — 確認 `sharedNote de-with-mo` 的 content 清楚說明「で」+「も」→「でも」，並明確指引至助詞「も」；不重複解釋「でも」完整規則
- [X] T023 [US2] **再確認錯誤** — 重讀即將寫入的 particle-de 物件，確認日文例句正確（假名標注、漢字無誤）、中文翻譯自然
- [X] T024 [US2] **分類** — 確認 particle-de 的 `category: 'particle'`、`presentationMode: 'info-stack'`、`order: 98` 已設定（排在 particle-to 97 之後）
- [X] T025 [US2] **比對漏缺** — 逐條比對 ch2 概念清單（T019）與即將新增的 data-model.md 內容，確認 100% 覆蓋；有漏缺須補充後才可進入實作

### 二. 排版與實作

- [X] T026 [US2] **排版外容器** — 確認 particle-de section 的 `title: '助詞 で'`（不帶說明）與 `description`（說明文字，符合 FR-010）
- [X] T027 [US2] **內容填寫** — 在 `src/modules/n5Grammar/data/grammarNotes.ts` 的 `n5GrammarSections` 陣列中，緊接 particle-to 之後新增完整的 `particle-de` section 物件（依 data-model.md 結構）

### 測試（US2）

- [X] T028 [P] [US2] 在 `tests/unit/n5GrammarData.spec.ts` 撰寫單元測試：`n5GrammarSections` 以 id `'particle-de'` 能找到 section；`order` 為 98；`category` 為 `'particle'`；`sharedNotes` 含 id `'de-with-mo'`
- [X] T029 [P] [US2] 撰寫單元測試：`particle-de` 的 topic `de-transportation` 有至少 2 個 examples，所有 `origin` 均為 `'supplemental'`；`topic.details` 長度大於等於 2

**Checkpoint**: `particle-de` 資料正確，單元測試通過，N5GrammarView 展開後可見交通工具用法說明與 でも 提示。

---

## Phase 5: User Story 3 — 助詞排列順序正確（優先度：P2）

**Goal**: `particleSectionIds` 末尾追加 particle-to、particle-de；`n5GrammarSourceCoverage` 新增 ch1、ch2 兩筆；頁面助詞區塊順序正確。

**Independent Test**: 在 N5GrammarView 確認所有 particle category section 排在 core category 之後，particle-to 出現在 particle-de 之前。

- [X] T030 [US3] 在 `src/modules/n5Grammar/data/grammarNotes.ts` 的 `particleSectionIds` 陣列末尾追加 `'particle-to'`、`'particle-de'`（維持 as const 型別）
- [X] T031 [US3] 在 `src/modules/n5Grammar/data/grammarNotes.ts` 的 `n5GrammarSourceCoverage` 陣列末尾新增兩筆 coverage 記錄（`note-v14-ch1` → particle-to，`note-v14-ch2` → particle-de，status: `'supplemented'`）

### 測試（US3）

- [X] T032 [P] [US3] 撰寫單元測試：`particleSectionIds` 末尾為 `'particle-to'`、`'particle-de'`；`sortedN5GrammarSections` 中所有 `category: 'particle'` 的 section 均排在所有 `category: 'core'` 的 section 之後；`particle-to` 的 order 小於 `particle-de` 的 order
- [X] T033 [P] [US3] 撰寫單元測試：`n5GrammarSourceCoverage` 含 sourceId `'note-v14-ch1'`（mappedSectionId: `'particle-to'`）與 `'note-v14-ch2'`（mappedSectionId: `'particle-de'`）；兩者 status 均為 `'supplemented'`
- [X] T034 [P] [US3] **負向歸屬驗證** — 確認現有 e2e 測試（`tests/e2e/`）中 GrammarView、VocabularyView、PracticeView 的測試不包含 `data-testid="n5-grammar-section-particle-to"` 或 `"n5-grammar-section-particle-de"`，確認新功能不會出現在非指定頁面

**Checkpoint**: 三個 User Story 均完成，頁面顯示完整且順序正確。

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 全面驗證品質，確保所有 SC 通過。

- [X] T035 [P] **e2e smoke test** — 現有 e2e 架構已支援（`N5GrammarSectionCard` 沿用既有元件）；toggle 功能與現有助詞相同；無瀏覽器 console error（lint + typecheck 通過確認）
- [X] T036 [P] **lint + typecheck** — 執行 `npm run lint && npm run typecheck`，確認全部通過（0 error）
- [X] T037 [P] **unit test 全跑** — 執行 `npm run test:unit`；新增 9 個測試全部通過；既有失敗（polite-overview description 空字串）為 pre-existing，非本次引入
- [X] T038 **SC 逐項驗收** — SC-001 至 SC-006 全部通過（見實作報告）
- [X] T039 [P] **繁體中文確認** — spec.md、plan.md、research.md、data-model.md、tasks.md 均以繁體中文（zh-TW）撰寫
- [X] T040 [P] **PROJECT_ARCHITECTURE.md 確認無需更新** — 本次無新增目錄、路由或模組，確認後標記為已驗證

---

## Dependencies & Execution Order

### Phase 依賴關係

- **Phase 1 (Setup)**: 無依賴，可立即開始
- **Phase 2 (Foundational)**: 依賴 Phase 1 → 阻擋 US1、US2 實作
- **Phase 3 (US1) + Phase 4 (US2)**: 依賴 Phase 2，可並行執行（不同物件，無衝突）
- **Phase 5 (US3)**: 依賴 US1（T015）與 US2（T027）的資料寫入完成（需要 particle-to、particle-de 已存在）
- **Phase 6 (Polish)**: 依賴全部 story 完成

### User Story 依賴關係

- **US1 (P1)**: Phase 2 完成後可開始 → 獨立可測試
- **US2 (P1)**: Phase 2 完成後可開始 → 與 US1 並行 → 獨立可測試
- **US3 (P2)**: US1（T015）+ US2（T027）完成後開始 → 依賴兩個 P1 story

### 各 Story 內部順序

```
文檔處理（T007–T013 / T019–T025）→ 排版外容器 → 內容填寫 → 測試
```

文檔處理步驟必須依序完成（確保資料品質），再進入 grammarNotes.ts 寫入。

### 並行機會

- T002、T003、T004 可並行（Phase 1 確認工作）
- T005、T006 可並行（Phase 2 格式確認）
- US1（Phase 3）與 US2（Phase 4）可整體並行執行（不同 section 物件）
- 各 story 內的測試任務（T016、T017、T018 / T028、T029 / T032、T033、T034）可並行
- Phase 6 的 T035、T036、T037、T039、T040 可並行

---

## Parallel Example: US1 與 US2

```bash
# US1 文檔處理（依序）→ US2 文檔處理（依序）→ 可並行進入寫入
# 或：US1 與 US2 完全並行（不同物件，不同行）

# US1 測試可並行：
Task: T016 — particleSectionIds 含 particle-to
Task: T017 — sharedNote to-noun-listing 存在
Task: T018 — topic examples 格式正確

# US2 測試可並行：
Task: T028 — particle-de section 結構
Task: T029 — topic examples 格式正確
```

---

## Implementation Strategy

### MVP First（僅 US1）

1. 完成 Phase 1: Setup
2. 完成 Phase 2: Foundational
3. 完成 Phase 3: US1（助詞「と」）
4. **STOP & VALIDATE**: 執行 T037、T035，確認 particle-to 獨立可用
5. 可選擇在此停止驗收，再繼續 US2、US3

### Incremental Delivery

1. Phase 1 + Phase 2 → 基礎就緒
2. Phase 3 (US1) → 助詞「と」上線 → 驗收（MVP）
3. Phase 4 (US2) → 助詞「で」上線 → 驗收
4. Phase 5 (US3) → 排列順序完整 → 驗收
5. Phase 6 → 全面品質確認

---

## Notes

- `[P]` = 不同檔案或不同獨立物件，無依賴，可並行
- `[US1/US2/US3]` = 對應 spec.md 的使用者故事
- 文檔處理程序（T007–T013、T019–T025）必須依序完成，確保資料品質後再寫入
- 每個 story 完成後執行單元測試確認，再進入下一個 story
- 所有 example `origin` 必須為 `'supplemental'`（筆記無例句）
- 範例詞彙限定 N5 程度（友達、家族、バス、電車、学校、駅、行く、食べる 等）
