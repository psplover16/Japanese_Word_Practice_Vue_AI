# Tasks: N5 文法學習子路由

**Input**: Design documents from `/specs/012-n5-grammar-route/`  
**Prerequisites**: plan.md、spec.md、research.md、data-model.md、contracts/

**Tests**: 本功能明確要求 smoke test、資料完整性驗證與 375px 版面驗證，因此任務包含測試工作。  
**Organization**: 任務依使用者故事分組，確保每個故事可以獨立完成與驗證。

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 建立本功能的工作骨架與共同驗證邊界

- [x] T001 確認 `.gitignore` 與現有忽略規則可覆蓋 `node_modules/`、`dist/`、`build/`、`coverage/`
- [x] T002 [P] 建立 `src/modules/n5Grammar/components/`、`src/modules/n5Grammar/data/`、`src/modules/n5Grammar/types/` 的實作骨架
- [x] T003 [P] 建立 `tests/unit/n5GrammarData.spec.ts`、`tests/component/N5GrammarSections.spec.ts`、`tests/e2e/n5-grammar-layout.spec.ts` 的測試骨架
- [x] T004 [P] 確認 `PROJECT_ARCHITECTURE.md` 需要補充 `/n5-grammar` 正式頁面、資料模組與測試檔責任

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 先完成所有使用者故事都依賴的資料模型與 renderer 基礎

- [x] T005 建立 N5 文法型別定義於 `src/modules/n5Grammar/types/grammarNotes.ts`
- [x] T006 建立可追蹤來源覆蓋與排序規則的資料骨架於 `src/modules/n5Grammar/data/grammarNotes.ts`
- [x] T007 [P] 建立共用群組容器元件於 `src/modules/n5Grammar/components/N5GrammarSectionCard.vue`
- [x] T008 [P] 建立內容模式 renderer 骨架於 `src/modules/n5Grammar/components/N5GrammarBulletBlock.vue`
- [x] T009 [P] 建立內容模式 renderer 骨架於 `src/modules/n5Grammar/components/N5GrammarInfoBlock.vue`
- [x] T010 [P] 建立內容模式 renderer 骨架於 `src/modules/n5Grammar/components/N5GrammarCompareTable.vue`

**Checkpoint**: N5 文法資料與 UI 骨架已可承接各使用者故事

---

## Phase 3: User Story 1 - 閱讀完整的 N5 文法整理內容 (Priority: P1) 🎯 MVP

**Goal**: 讓 `/n5-grammar` 以整理後的正式內容取代 placeholder，並確保每個文法主題都有說明與例句  
**Independent Test**: 進入 `/n5-grammar`，確認不再顯示「製作中」，且資料測試可驗證所有主題都有說明與至少一個例句

### Tests for User Story 1

- [x] T011 [P] [US1] 先擴充資料完整性測試於 `tests/unit/n5GrammarData.spec.ts`，驗證每個 topic 都有說明、例句與來源覆蓋
- [x] T012 [P] [US1] 先更新 N5 文法 smoke test 於 `tests/component/N5GrammarViewSmoke.spec.ts`，改為驗證正式內容 render-safe 且不外溢其他 route 內容

### Implementation for User Story 1

- [x] T013 [US1] 依 `note.txt` 與 `note2.txt` 整理名詞、動詞、形容詞與助詞內容到 `src/modules/n5Grammar/data/grammarNotes.ts`
- [x] T014 [US1] 在 `src/modules/n5Grammar/data/grammarNotes.ts` 補上錯誤修正、補充說明、補充例句與來源覆蓋標記
- [x] T015 [US1] 在 `src/modules/n5Grammar/views/N5GrammarView.vue` 以結構化資料取代 placeholder，渲染正式 N5 文法頁內容
- [x] T016 [US1] 在 `src/modules/n5Grammar/components/N5GrammarInfoBlock.vue` 呈現需要先說明後例句的學習內容

**Checkpoint**: `/n5-grammar` 已能獨立提供完整且可讀的基礎學習內容

---

## Phase 4: User Story 2 - 透過分組與收合快速定位文法 (Priority: P2)

**Goal**: 提供與 `變化規則` 一致的外部容器節奏、可收合群組，以及標題與說明分離的閱讀體驗  
**Independent Test**: 在桌面與 375px 寬度下打開 `/n5-grammar`，確認每個群組可獨立展開/收合，且標題列不混入長說明

### Tests for User Story 2

- [x] T017 [P] [US2] 先新增群組互動與標題/說明分離測試於 `tests/component/N5GrammarSections.spec.ts`
- [x] T018 [P] [US2] 先新增 375px 版面與展開流程驗證於 `tests/e2e/n5-grammar-layout.spec.ts`

### Implementation for User Story 2

- [x] T019 [US2] 在 `src/modules/n5Grammar/components/N5GrammarSectionCard.vue` 實作標題列、說明區與展開/收合控制
- [x] T020 [US2] 在 `src/modules/n5Grammar/views/N5GrammarView.vue` 組裝各主題群組並套用一致的外部節奏
- [x] T021 [US2] 在 `src/styles/main.css` 新增 `/n5-grammar` 專屬樣式，確保標題/說明分離、小螢幕可讀與無水平破版

**Checkpoint**: 使用者可透過群組與收合機制快速定位文法內容

---

## Phase 5: User Story 3 - 理解相近與重複文法的差異 (Priority: P3)

**Goal**: 整併重複內容，並用最適合的版型呈現相近文法的差異與共通規則  
**Independent Test**: 檢查重複概念是否被合併成單一清楚說明，且適合比較的內容會以表格或對照形式呈現

### Tests for User Story 3

- [x] T022 [P] [US3] 先擴充 `tests/unit/n5GrammarData.spec.ts`，驗證共通說明引用、重複內容整併與助詞排序規則
- [x] T023 [P] [US3] 先擴充 `tests/component/N5GrammarSections.spec.ts`，驗證 compare-table 與 bullet/info 模式只出現在適合的群組

### Implementation for User Story 3

- [x] T024 [US3] 在 `src/modules/n5Grammar/data/grammarNotes.ts` 抽離共通註記、重複規則與對照群組設定
- [x] T025 [US3] 在 `src/modules/n5Grammar/components/N5GrammarBulletBlock.vue` 實作條列式說明與範例呈現
- [x] T026 [US3] 在 `src/modules/n5Grammar/components/N5GrammarCompareTable.vue` 實作差異對照表與例句呈現

**Checkpoint**: 相近文法與重複註記已被整併，讀者可快速看出差異與共通點

---

## Phase 6: User Story 4 - 後續可持續擴充 N5 文法內容 (Priority: P4)

**Goal**: 建立可持續擴充的資料與文件結構，讓之後新增 N5 文法內容時不必重做頁面資訊架構  
**Independent Test**: 檢查資料型別、renderer 與文件是否足以支援後續新增群組，而不需改變現有頁面規則

### Tests for User Story 4

- [x] T027 [P] [US4] 先補充 `tests/unit/n5GrammarData.spec.ts`，驗證排序鍵、presentation mode 與必要欄位的擴充穩定性

### Implementation for User Story 4

- [x] T028 [US4] 在 `src/modules/n5Grammar/types/grammarNotes.ts` 與 `src/modules/n5Grammar/data/grammarNotes.ts` 整理可擴充的欄位與 presentation mode 規則
- [x] T029 [US4] 更新 `PROJECT_ARCHITECTURE.md`，補上 N5 文法正式頁面、資料模組、renderer 與測試責任
- [x] T030 [US4] 若實作細節改變了可見行為或版型規則，回寫 `specs/012-n5-grammar-route/spec.md`

**Checkpoint**: N5 文法頁的資料與文件結構已具備後續擴充能力

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: 完成跨故事驗證與收尾

- [x] T031 [P] 執行並修正 `npm run lint`、`npm run typecheck`
- [x] T032 [P] 執行並修正 `npm run test:unit`
- [x] T033 [P] 執行並修正 `npm run test:e2e`
- [x] T034 依 `specs/012-n5-grammar-route/quickstart.md` 進行手動驗證並整理結果
- [x] T035 [P] 更新 `tests/component/RouteOwnership.spec.ts`，補強 `/n5-grammar` 的正向與負向 ownership 驗證

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 完成後，才能開始建立共用資料與 renderer 骨架
- Phase 2 完成後，才進入各使用者故事
- US1 是 MVP，必須先完成
- US2 依賴 US1 已有正式內容可渲染
- US3 依賴 US1 的資料與 US2 的容器互動
- US4 依賴前面故事的最終資料與檔案落點
- Polish 階段在所有目標故事完成後執行

### Parallel Opportunities

- T002、T003、T004 可平行
- T007、T008、T009、T010 可平行
- 各故事中的測試前置任務可平行
- T031、T032、T033 可視情況平行執行，但若共享失敗原因需回到順序修正

## Implementation Strategy

### MVP First

1. 完成 Setup 與 Foundational
2. 完成 US1，先讓 `/n5-grammar` 不再是 placeholder
3. 驗證內容完整性與基本 smoke test

### Incremental Delivery

1. US1: 內容與正式頁面
2. US2: 分組、收合、版型穩定
3. US3: 去重、對照、共通規則
4. US4: 擴充性與文件同步

## Notes

- 任務順序已反映使用者補充流程：先引入/修正/補充文檔，再分類與漏缺比對，最後再做外容器與內容填寫
- 所有 story 任務都包含明確檔案路徑，方便直接執行
- 測試任務先於對應實作任務，符合既有 constitution 的驗證要求
