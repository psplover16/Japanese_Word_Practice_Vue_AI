# Tasks: 單字練習主內容重建

**Input**: Design documents from `/specs/007-word-practice-rebuild/`  
**Prerequisites**: `plan.md`、`spec.md`、`research.md`、`data-model.md`、`contracts/`、`quickstart.md`

**Tests**: 本 feature 明確要求驗證 `/vocabulary` route、字典正規化、條件篩選、註記持久化、長按互動、positive ownership、negative ownership 與 375px fidelity，因此包含 unit、component 與 e2e 測試任務。

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

**Constitution Alignment**: 本任務列表已納入 zh-TW 文件要求、`.gitignore` 檢查、route smoke test、negative ownership 驗證、route-specific table/layout 保護、render-safe hidden state 與 `PROJECT_ARCHITECTURE.md` 更新。

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 確認 repo hygiene、建立 `/vocabulary` feature 空間，並準備後續測試骨架。

- [X] T001 檢查 `.gitignore` 是否已涵蓋 `node_modules/`、`dist/`、`build/`、`coverage/` 於 `.gitignore`
- [X] T002 建立 `/vocabulary` feature 所需目錄與檔案骨架於 `src/modules/vocabulary/components/`、`src/modules/vocabulary/composables/`、`src/modules/vocabulary/data/`、`src/modules/vocabulary/storage/`、`src/modules/vocabulary/types/`、`src/modules/vocabulary/utils/`
- [X] T003 [P] 建立 `/vocabulary` 專屬測試骨架於 `tests/component/VocabularyViewSmoke.spec.ts`、`tests/component/VocabularyControlBar.spec.ts`、`tests/component/VocabularyStageTable.spec.ts`、`tests/unit/vocabularyData.spec.ts`、`tests/unit/vocabularyFilters.spec.ts`、`tests/unit/vocabularyMarksStorage.spec.ts`、`tests/e2e/vocabulary-word-practice.spec.ts`
- [X] T004 [P] 確認 `PROJECT_ARCHITECTURE.md` 需補充的新 vocabulary 模組與測試責任說明於 `PROJECT_ARCHITECTURE.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 先建立資料、型別、storage 與 route ownership 基線，作為所有 user story 的共同基礎。

**CRITICAL**: 本階段完成前，不進入任何 `/vocabulary` UI 串接。

- [X] T005 建立 vocabulary typed data 型別於 `src/modules/vocabulary/types/vocabulary.ts`
- [X] T006 建立字典正規化與 stage 分組資料模組於 `src/modules/vocabulary/data/jpWords.ts`
- [X] T007 建立字母範圍、搜尋與 checkbox 疊加的過濾工具於 `src/modules/vocabulary/utils/vocabularyFilters.ts`
- [X] T008 建立註記 localStorage 模組於 `src/modules/vocabulary/storage/vocabularyMarksStorage.ts`
- [X] T009 建立 `/vocabulary` route ownership 測試基線，準備移除 placeholder UI 於 `tests/component/RouteOwnership.spec.ts`
- [X] T010 建立 `/vocabulary` route-specific 基礎樣式 class 於 `src/styles/main.css`

**Checkpoint**: `/vocabulary` 的資料、型別、storage、樣式與 ownership 邊界已準備完成。

---

## Phase 3: User Story 1 - 使用者看到完整單字練習頁 (Priority: P1) 🎯 MVP

**Goal**: 進入 `/vocabulary` 時，保留既有 shell，但主內容改為參考頁等級的單字學習頁。

**Independent Test**: 打開 `/vocabulary`，確認 route title、route tabs 與 app shell 保持不變，且頁面不再顯示 `SelectionDetailPanel` 或「單字練習預備區」。

### Tests for User Story 1

- [X] T011 [P] [US1] 新增 `/vocabulary` route ownership 與 negative ownership 驗證於 `tests/component/RouteOwnership.spec.ts`
- [X] T012 [P] [US1] 新增 `/vocabulary` 初次渲染 smoke test 於 `tests/component/VocabularyViewSmoke.spec.ts`

### Implementation for User Story 1

- [X] T013 [P] [US1] 實作單一可縱向捲動 table 容器與 renderer shell 於 `src/modules/vocabulary/components/VocabularyStageTable.vue`
- [X] T014 [P] [US1] 實作 table 基本 renderer 與欄位骨架於 `src/modules/vocabulary/components/VocabularyStageTable.vue`
- [X] T015 [P] [US1] 實作控制區與單字數量摘要骨架於 `src/modules/vocabulary/components/VocabularyControlBar.vue`、`src/modules/vocabulary/components/VocabularyCountSummary.vue`
- [X] T016 [US1] 重寫 `/vocabulary` 主 view，移除舊 placeholder 並串接控制區、單一 table 與基礎表格於 `src/modules/vocabulary/views/VocabularyView.vue`
- [X] T017 [US1] 在 `src/modules/vocabulary/data/jpWords.ts` 補齊穩定 `id`、stage 順序與測試所需 stage metadata

**Checkpoint**: `/vocabulary` 已成為真正的單字學習頁入口，且最小可用版本可獨立驗證。

---

## Phase 4: User Story 2 - 使用者依條件篩選與搜尋單字 (Priority: P2)

**Goal**: 完整支援字母範圍、搜尋 input 與非 table checkbox 的疊加過濾，並正確顯示單字數量。

**Independent Test**: 在 `/practice` 勾選不同字母後進入 `/vocabulary`，再切換 input 與頁內 checkbox，確認可見資料列與單字數量都正確。

### Tests for User Story 2

- [X] T018 [P] [US2] 新增字典正規化與 stage 分組 unit test 於 `tests/unit/vocabularyData.spec.ts`
- [X] T019 [P] [US2] 新增 filter pipeline unit test，驗證 input 與非 table checkbox 疊加行為於 `tests/unit/vocabularyFilters.spec.ts`
- [X] T020 [P] [US2] 新增控制區搜尋、`全部字音`、`漢字`、`只顯示註記` 與 `練習` 切換 component test 於 `tests/component/VocabularyControlBar.spec.ts`

### Implementation for User Story 2

- [X] T021 [US2] 實作 `/vocabulary` 專屬狀態 composable，串接 `/practice` 勾選結果與頁內 filter state 於 `src/modules/vocabulary/composables/useVocabularySession.ts`
- [X] T022 [US2] 實作字典 table 生成與最終可見列導出於 `src/modules/vocabulary/utils/vocabularyFilters.ts`、`src/modules/vocabulary/components/VocabularyStageTable.vue`
- [X] T023 [US2] 實作 input 功能於 `src/modules/vocabulary/components/VocabularyControlBar.vue`
- [X] T024 [US2] 實作 input 及非 table checkbox 的排版於 `src/modules/vocabulary/components/VocabularyControlBar.vue`、`src/styles/main.css`
- [X] T025 [US2] 實作 input 與標頭 checkbox 功能疊加驗證邏輯於 `src/modules/vocabulary/composables/useVocabularySession.ts`、`src/modules/vocabulary/utils/vocabularyFilters.ts`
- [X] T026 [US2] 實作 input 與非標頭 checkbox 功能疊加驗證邏輯於 `src/modules/vocabulary/composables/useVocabularySession.ts`、`src/modules/vocabulary/utils/vocabularyFilters.ts`
- [X] T027 [US2] 實作 input、標頭 checkbox、非標頭 checkbox 三者共同疊加的最終可見列邏輯與單字數量摘要於 `src/modules/vocabulary/composables/useVocabularySession.ts`、`src/modules/vocabulary/components/VocabularyCountSummary.vue`、`src/modules/vocabulary/views/VocabularyView.vue`
- [X] T028 [US2] 調整整頁排版，讓控制區、單字摘要與單一 table 的位置符合參考頁於 `src/modules/vocabulary/views/VocabularyView.vue`、`src/styles/main.css`

**Checkpoint**: 使用者已可用 `/practice` 勾選結果、input 與頁內 checkbox 對字典做正確篩選與搜尋。

---

## Phase 5: User Story 3 - 使用者控制欄位顯示、練習與表格 checkbox 行為 (Priority: P3)

**Goal**: 還原一般欄位標頭 checkbox、列內 checkbox、漢字／拼音切換、練習模式與保留佔位的表格顯示規則。

**Independent Test**: 切換單字、漢字、拼音、中文與註記欄位的標頭 checkbox，以及全域 `漢字`、`練習` checkbox，確認表格內容顯示與佔位都符合預期。

### Tests for User Story 3

- [X] T029 [P] [US3] 新增表格欄位顯示、佔位與 checkbox 行為 component test 於 `tests/component/VocabularyStageTable.spec.ts`
- [X] T030 [P] [US3] 擴充控制區 component test，驗證 `漢字` 與 `練習` 對共用欄位與單字顯示的影響於 `tests/component/VocabularyControlBar.spec.ts`

### Implementation for User Story 3

- [X] T031 [US3] 實作單字、漢字、拼音、中文欄的標頭 checkbox 功能於 `src/modules/vocabulary/components/VocabularyStageTable.vue`
- [X] T032 [US3] 實作非標頭 checkbox 功能與列內顯示規則於 `src/modules/vocabulary/components/VocabularyStageTable.vue`
- [X] T033 [US3] 實作漢字／拼音共用欄位切換與保留佔位樣式於 `src/modules/vocabulary/components/VocabularyStageTable.vue`、`src/styles/main.css`
- [X] T034 [US3] 實作練習模式下單字假名互換呈現於 `src/modules/vocabulary/utils/vocabularyFilters.ts`、`src/modules/vocabulary/components/VocabularyStageTable.vue`
- [X] T035 [US3] 補齊表格最後一列寬度限制、固定欄寬與 route-specific fidelity 樣式於 `src/styles/main.css`

**Checkpoint**: `/vocabulary` 的表格顯示行為、欄位佔位與練習模式已符合需求。

---

## Phase 6: User Story 4 - 使用者可保存註記並在不同裝置進行長按揭露 (Priority: P4)

**Goal**: 完成註記持久化、清除全部註記、格式錯誤保護與長按顯示互動。

**Independent Test**: 勾選幾筆註記後儲存並重新整理，確認資料保留；再測試清除全部註記與長按約 0.4 秒揭露單列內容。

### Tests for User Story 4

- [X] T036 [P] [US4] 新增註記 storage 格式驗證與清除 unit test 於 `tests/unit/vocabularyMarksStorage.spec.ts`
- [X] T037 [P] [US4] 新增註記與長按互動 component test 於 `tests/component/VocabularyStageTable.spec.ts`
- [X] T038 [P] [US4] 新增 `/vocabulary` 註記持久化與長按 e2e 驗證於 `tests/e2e/vocabulary-word-practice.spec.ts`

### Implementation for User Story 4

- [X] T039 [US4] 實作儲存註記功能於 `src/modules/vocabulary/storage/vocabularyMarksStorage.ts`、`src/modules/vocabulary/composables/useVocabularySession.ts`
- [X] T040 [US4] 實作儲存註記功能的格式驗證、壞資料清除與警告流程於 `src/modules/vocabulary/storage/vocabularyMarksStorage.ts`、`src/modules/vocabulary/composables/useVocabularySession.ts`
- [X] T041 [US4] 實作清除全部註記的雙重確認與表格同步更新於 `src/modules/vocabulary/components/VocabularyStageTable.vue`、`src/modules/vocabulary/composables/useVocabularySession.ts`
- [X] T042 [US4] 實作字典 table 長按功能與揭露狀態恢復於 `src/modules/vocabulary/components/VocabularyStageTable.vue`
- [X] T043 [US4] 調整 `/vocabulary` 與 `src/styles/main.css`，確保手機、平板、PC 長按與窄版排版都可穩定運作

**Checkpoint**: 註記、持久化、防呆與長按揭露都已完成，且可在不同裝置下獨立驗證。

---

## Phase 7: User Story 5 - 維護者有足夠明確的驗收與對照基準 (Priority: P5)

**Goal**: 讓後續 CRUD、修文案、補資料或 regression 驗證都能快速定位 `/vocabulary` 的資料來源與驗收面向。

**Independent Test**: 僅查看 docs、contracts、測試與 architecture 文件，即可定位 `/vocabulary` feature 的責任邊界與回歸方式。

### Implementation for User Story 5

- [X] T044 [US5] 為 vocabulary data、table row 與控制區補上穩定 `id` / `data-testid` 對應策略於 `src/modules/vocabulary/data/jpWords.ts`、`src/modules/vocabulary/components/*.vue`
- [X] T045 [US5] 更新 `/vocabulary` route contract 與 quickstart 驗收細節於 `specs/007-word-practice-rebuild/contracts/vocabulary-route-contract.md`、`specs/007-word-practice-rebuild/quickstart.md`
- [X] T046 [US5] 更新 `PROJECT_ARCHITECTURE.md`，反映新的 vocabulary 模組、storage、utils 與測試責任

**Checkpoint**: `/vocabulary` 頁面已具備可維護的結構與文件基準。

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: 完成驗證、補齊文件、確認收尾品質。 

- [X] T047 [P] 驗證 `AGENTS.md` 與 speckit 文件仍維持繁體中文 user-facing 內容與最新 context 一致
- [X] T048 [P] 執行 `npm run lint`
- [X] T049 [P] 執行 `npm run typecheck`
- [X] T050 [P] 執行 `npm run test:unit`
- [X] T051 [P] 執行 `npm run build`
- [X] T052 [P] 執行 `npx playwright test tests/e2e/vocabulary-word-practice.spec.ts`
- [X] T053 驗證 `specs/007-word-practice-rebuild/quickstart.md` 的手動流程與實作一致

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1: Setup** 可立即開始。
- **Phase 2: Foundational** 依賴 Phase 1，且會阻擋所有 user story。
- **Phase 3: US1** 依賴 Phase 2，為 MVP。
- **Phase 4: US2** 依賴 US1 完成 route replacement。
- **Phase 5: US3** 依賴 US2 的資料與 filter pipeline 完成。
- **Phase 6: US4** 依賴 US2 與 US3 的表格互動基礎。
- **Phase 7: US5** 依賴前面故事的最終檔案與測試命名。
- **Phase 8: Polish** 依賴所有目標故事完成。

### User Story Dependencies

- **US1**: 只依賴 foundational，可先獨立完成並驗證 `/vocabulary` 入口。
- **US2**: 依賴 US1 的 view 組裝完成，但可獨立驗證搜尋與條件篩選。
- **US3**: 依賴 US2 的 filter pipeline 與資料呈現，才能補欄位顯示行為。
- **US4**: 依賴 US2 / US3 的表格與 checkbox 架構。
- **US5**: 依賴 US1-US4 的最終檔案與驗收命名。

### Within Each User Story

- 測試任務先寫並先看失敗，再進入對應實作。
- 先完成資料與 composable，再串接 `VocabularyView.vue`。
- 先完成表格結構，再調整樣式 fidelity 與長按互動。

### Parallel Opportunities

- T003 與 T004 可平行。
- T018、T019、T020 可平行。
- T029 與 T030 可平行。
- T036、T037、T038 可平行。
- T048、T049、T050、T051、T052 可在實作完成後平行驗證。

---

## Parallel Example: User Story 2

```bash
# 先並行建立資料與篩選測試
Task: "新增字典正規化與 stage metadata unit test 於 tests/unit/vocabularyData.spec.ts"
Task: "新增 filter pipeline unit test 於 tests/unit/vocabularyFilters.spec.ts"
Task: "新增控制區搜尋與條件切換 component test 於 tests/component/VocabularyControlBar.spec.ts"

# 再並行實作核心邏輯與顯示
Task: "實作 /vocabulary 專屬狀態 composable 於 src/modules/vocabulary/composables/useVocabularySession.ts"
Task: "實作字典 table 生成與最終可見列導出於 src/modules/vocabulary/utils/vocabularyFilters.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. 完成 Setup 與 Foundational。
2. 完成 US1 的 route replacement。
3. 先驗證 `/vocabulary` ownership 與 smoke render。
4. 若通過，再往下補搜尋、欄位控制、註記與長按。

### Incremental Delivery

1. US1 先把 `/vocabulary` 變成正確入口。
2. US2 補足字典生成、搜尋與條件篩選。
3. US3 還原表格欄位顯示與保留佔位規則。
4. US4 再完成註記與長按互動。
5. US5 最後補強文件與架構說明。

### Notes

- `[P]` 僅表示不同檔案、可並行處理。
- `v6/tasks.txt` 中要求獨立拆分的 13 類工作已分散映射到 T006、T014、T024、T028、T031、T032、T023、T025、T026、T027、T039、T040、T042 等任務，不合併成模糊大項。
- 若實作中發現參考頁與字典資料內容衝突，以 spec 的 clarifications 與 reference fidelity 原則為準，並同步反映到測試與文件。
