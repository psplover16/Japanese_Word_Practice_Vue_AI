# Tasks: 變化規則主內容重建

**Input**: Design documents from `/specs/006-grammar-change-rules/`  
**Prerequisites**: `plan.md`、`spec.md`、`research.md`、`data-model.md`、`contracts/`、`quickstart.md`

**Tests**: 本 feature 明確要求驗證 `/grammar` route、複雜 table 結構、responsive fidelity、positive ownership 與 negative ownership，因此包含 unit、component 與 e2e 測試任務。

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

**Constitution Alignment**: 本任務列表已納入 zh-TW 文件要求、`.gitignore` 檢查、route smoke test、negative ownership 驗證、route-specific layout 保護與 `PROJECT_ARCHITECTURE.md` 更新。

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 確認 repo hygiene 與本 feature 的檔案邊界，建立後續實作空間。

- [X] T001 檢查 `.gitignore` 是否已涵蓋 `node_modules/`、`dist/`、`build/`、`coverage/` 於 `.gitignore`
- [X] T002 建立 `/grammar` feature 需要的目錄與檔案骨架於 `src/modules/grammar/components/`、`src/modules/grammar/data/`、`src/modules/grammar/types/`
- [X] T003 [P] 建立 `/grammar` 專屬測試骨架於 `tests/component/GrammarViewSmoke.spec.ts`、`tests/component/GrammarChangeRulesTables.spec.ts`、`tests/unit/changeRulesData.spec.ts`、`tests/e2e/grammar-change-rules.spec.ts`
- [X] T004 [P] 確認 `PROJECT_ARCHITECTURE.md` 需補充的新 grammar 模組與測試責任說明於 `PROJECT_ARCHITECTURE.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 先建立資料模型、靜態資料與共用殼層，作為所有 user story 的基礎。

**CRITICAL**: 本階段完成前，不進入任何 user story UI 串接。

- [X] T005 建立 grammar typed data 型別於 `src/modules/grammar/types/changeRules.ts`
- [X] T006 建立 section 順序與基礎靜態資料常數於 `src/modules/grammar/data/changeRules.ts`
- [X] T007 建立 accordion/table 共用殼層元件於 `src/modules/grammar/components/GrammarAccordionTableShell.vue`
- [X] T008 建立 `/grammar` route-specific 基礎樣式 class 於 `src/styles/main.css`
- [X] T009 建立 route ownership 測試基準，準備驗證 `/grammar` 的 positive/negative ownership 於 `tests/component/RouteOwnership.spec.ts`

**Checkpoint**: `/grammar` 的資料、型別、基礎樣式與 ownership 邊界已準備完成。

---

## Phase 3: User Story 1 - 使用者看到完整變化規則頁 (Priority: P1)

**Goal**: 進入 `/grammar` 時，保留既有 shell 但替換成新的規則頁主內容。

**Independent Test**: 開啟 `/grammar`，確認主內容顯示規則容器，且不再出現舊版 `SelectionDetailPanel`、`HatsuonSection`、`SokuonSection`。

### Tests for User Story 1

- [X] T010 [P] [US1] 新增 `/grammar` route ownership 與 negative ownership 驗證於 `tests/component/RouteOwnership.spec.ts`
- [X] T011 [P] [US1] 新增 `/grammar` 初次渲染 smoke test 於 `tests/component/GrammarViewSmoke.spec.ts`

### Implementation for User Story 1

- [X] T012 [P] [US1] 實作「語法系統差異」比較表元件於 `src/modules/grammar/components/SystemDifferenceTable.vue`
- [X] T013 [P] [US1] 實作「各活用型意義／動詞型態分辨」規則清單表元件於 `src/modules/grammar/components/RuleListTable.vue`
- [X] T014 [US1] 重寫 `/grammar` 主 view，移除舊 placeholder 並串接前 3 個 section 於 `src/modules/grammar/views/GrammarView.vue`
- [X] T015 [US1] 在 `src/modules/grammar/data/changeRules.ts` 補齊前 3 個 section 的標題、副標題、id 與 payload mapping

**Checkpoint**: `/grammar` 已成為規則頁入口，且最小可用版本可獨立驗證。

---

## Phase 4: User Story 2 - 使用者展開後看到完整表格細節 (Priority: P2)

**Goal**: 完整還原複雜活用表、音便表與詞性變化規則內容。

**Independent Test**: 逐一展開複雜 section，確認 rowspan、colspan、tfoot、巢狀清單與多行 title 都存在。

### Tests for User Story 2

- [X] T016 [P] [US2] 新增複雜 grammar table 結構測試於 `tests/component/GrammarChangeRulesTables.spec.ts`
- [X] T017 [P] [US2] 新增 section 數量、id 與關鍵 payload 的 unit test 於 `tests/unit/changeRulesData.spec.ts`

### Implementation for User Story 2

- [X] T018 [P] [US2] 實作五段動詞表與音便表 renderer 於 `src/modules/grammar/components/GodanVerbTable.vue`
- [X] T019 [P] [US2] 實作一般活用表 renderer 於 `src/modules/grammar/components/InflectionTable.vue`
- [X] T020 [P] [US2] 實作詞性變化規則 renderer 於 `src/modules/grammar/components/PosConversionTable.vue`
- [X] T021 [US2] 在 `src/modules/grammar/data/changeRules.ts` 補齊五段動詞、一段、サ變、カ變、い形容詞、ない形容詞、だ助動詞與詞性變化規則的完整資料
- [X] T022 [US2] 在 `src/modules/grammar/views/GrammarView.vue` 串接所有剩餘 section 與對應 renderer

**Checkpoint**: 參考頁的主要內容結構已可在 `/grammar` 逐容器展開驗證。

---

## Phase 5: User Story 3 - 使用者在不同裝置維持一致閱讀體驗 (Priority: P3)

**Goal**: 讓 `/grammar` 在桌機與 375px 窄版下都維持可讀、對齊正確且視覺接近參考頁。

**Independent Test**: 在 component 與 e2e 中驗證多行標題、nowrap/pre-wrap、highlight cell、tfoot 與窄版展開行為。

### Tests for User Story 3

- [X] T023 [US3] 新增 375px `/grammar` e2e smoke 與展開驗證於 `tests/e2e/grammar-change-rules.spec.ts`

### Implementation for User Story 3

- [X] T024 [US3] 在 `src/styles/main.css` 補齊 `/grammar` 的 header/body/footer/highlight/nowrap/pre-wrap/responsive 樣式
- [X] T025 [US3] 調整 `src/modules/grammar/components/SystemDifferenceTable.vue`、`src/modules/grammar/components/RuleListTable.vue`、`src/modules/grammar/components/GodanVerbTable.vue`、`src/modules/grammar/components/InflectionTable.vue`、`src/modules/grammar/components/PosConversionTable.vue` 的 markup 與 class，確保對齊與換行 fidelity
- [X] T026 [US3] 調整 `src/modules/grammar/views/GrammarView.vue` 的 layout 與 spacing，確保不影響既有 route shell

**Checkpoint**: `/grammar` 在桌機與手機寬度下皆可穩定閱讀，且 route-specific 樣式沒有外溢。

---

## Phase 6: User Story 4 - 維護者有足夠明確的驗收與結構基準 (Priority: P4)

**Goal**: 讓後續 CRUD、回歸與文件維護能快速定位 grammar 頁的結構與驗收點。

**Independent Test**: 維護者可從資料 id、測試名稱、contract 與 architecture doc 直接定位任一 section。

### Implementation for User Story 4

- [X] T027 [US4] 為 grammar data 與 renderer 補上穩定 `id` / `data-testid` 對應策略於 `src/modules/grammar/data/changeRules.ts`、`src/modules/grammar/components/*.vue`
- [X] T028 [US4] 更新 grammar route contract 與 quickstart 所需的人工驗證細節於 `specs/006-grammar-change-rules/contracts/grammar-route-contract.md`、`specs/006-grammar-change-rules/quickstart.md`
- [X] T029 [US4] 更新 `PROJECT_ARCHITECTURE.md`，反映新的 grammar 模組、資料檔與測試檔責任

**Checkpoint**: grammar 頁面已具備可維護的結構與回歸基準。

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: 完成驗證、補齊文件與確認任務收尾。

- [X] T030 [P] 執行 `npm run lint`
- [X] T031 [P] 執行 `npm run typecheck`
- [X] T032 [P] 執行 `npm run test:unit`
- [X] T033 [P] 執行 `npm run build`
- [X] T034 [P] 執行 `npx playwright test tests/e2e/grammar-change-rules.spec.ts`
- [X] T035 驗證 `specs/006-grammar-change-rules/quickstart.md` 的手動流程與實作一致

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1: Setup** 可立即開始。
- **Phase 2: Foundational** 依賴 Phase 1，且會阻擋所有 user story。
- **Phase 3: US1** 依賴 Phase 2，為 MVP。
- **Phase 4: US2** 依賴 Phase 2，並在實務上接續 US1 的 route replacement。
- **Phase 5: US3** 依賴 US1 與 US2 的 renderer 完成後再調整 fidelity。
- **Phase 6: US4** 依賴前面故事完成後補齊維護基準。
- **Phase 7: Polish** 依賴所有目標故事完成。

### User Story Dependencies

- **US1**: 只依賴 foundational，可先獨立完成並驗證 `/grammar` 入口。
- **US2**: 依賴 US1 已替換 view 殼層，但可以獨立驗證表格 fidelity。
- **US3**: 依賴 US2 已有完整 renderer，否則無法做窄版 fidelity。
- **US4**: 依賴 US1-US3 的最終檔案與測試命名。

### Within Each User Story

- 測試任務先寫並先看失敗，再進入對應實作。
- 先完成資料與 renderer，再完成 `GrammarView.vue` 串接。
- 先完成結構，再調整樣式與 responsive fidelity。

### Parallel Opportunities

- T003 與 T004 可平行。
- T010 與 T011 可平行。
- T012 與 T013 可平行。
- T016 與 T017 可平行。
- T018、T019、T020 可平行。
- T030、T031、T032、T033、T034 可在實作完成後平行驗證。

---

## Parallel Example: User Story 2

```bash
# 結構測試可先並行準備
Task: "新增複雜 grammar table 結構測試於 tests/component/GrammarChangeRulesTables.spec.ts"
Task: "新增 section 數量、id 與關鍵 payload 的 unit test 於 tests/unit/changeRulesData.spec.ts"

# 專用 renderer 可分檔並行實作
Task: "實作五段動詞表與音便表 renderer 於 src/modules/grammar/components/GodanVerbTable.vue"
Task: "實作一般活用表 renderer 於 src/modules/grammar/components/InflectionTable.vue"
Task: "實作詞性變化規則 renderer 於 src/modules/grammar/components/PosConversionTable.vue"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. 完成 Setup 與 Foundational。
2. 完成 US1 的 route replacement。
3. 先驗證 `/grammar` ownership 與 smoke render。
4. 若通過，再往下補足複雜表格 fidelity。

### Incremental Delivery

1. US1 先把 `/grammar` 變成正確入口。
2. US2 補足內容與特殊結構。
3. US3 再調整 responsive 與視覺 fidelity。
4. US4 最後補強維護文件與架構說明。

### Notes

- `[P]` 僅表示不同檔案、可並行處理。
- 所有 grammar 內容僅屬於 `/grammar`，不得順手擴散到其他 route。
- 若實作中發現參考站與需求筆記不一致，以目前部署站內容為主，並同步反映在測試與文件。
