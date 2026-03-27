# Tasks: 字母練習排版與羅馬音補強

**Input**: Design documents from `/specs/003-practice-romaji-layout/`  
**Prerequisites**: plan.md、spec.md、research.md、data-model.md、contracts/  
**Tests**: 本 feature 明確要求 render-safe、route ownership 與 375px 可讀性驗證，因此包含 component 與 smoke / e2e 測試任務。  
**Organization**: 任務依 user story 分 phase，確保每個故事都可獨立實作與驗證。

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 先建立本期需要的驗證入口與共用測試骨架。

- [ ] T001 檢查並必要時補強 `tests/component/testUtils.ts`，讓 section-level component tests 可穩定掛載 practice 相關元件
- [ ] T002 [P] 建立長音規則與外來語矩陣的 component test 骨架於 `tests/component/ChoonRuleSection.spec.ts` 與 `tests/component/LoanwordSection.spec.ts`
- [ ] T003 [P] 建立拗音羅馬音與 375px smoke 驗證骨架於 `tests/component/YoonSections.spec.ts` 與 `tests/e2e/practice-layout.smoke.spec.ts`
- [ ] T004 [P] 重新確認 `.gitignore` 與現有測試輸出忽略規則於 `.gitignore`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 完成所有 user stories 都依賴的資料模型、共用樣式與 route-level 約束。

**⚠️ CRITICAL**: 本 phase 完成前，不進入各 user story 的實作。

- [ ] T005 更新 `src/modules/practice/types/practice.ts`，加入 `LongVowelRuleRow`、`SyllableRomajiRow`、`LoanwordMatrixCell` 等本期展示型別
- [ ] T006 [P] 重構 `src/modules/practice/data/specialSyllableData.ts`，把長音規則、拗音、合拗音與外來語資料改為結構化靜態資料
- [ ] T007 [P] 調整 `src/styles/main.css`，建立 375px 優先的表格密度、字級與對齊規則
- [ ] T008 [P] 調整 `src/app/AppShell.vue` 與 `src/shared/components/RouteTabs.vue`，對齊共享頁首在 375px 的可辨識與不破版要求
- [ ] T009 更新 `tests/component/PracticeViewSmoke.spec.ts` 與 `tests/component/RouteOwnership.spec.ts`，鎖定 default render、negative ownership 與共享頁首基線

**Checkpoint**: 資料模型、共用樣式與 route-level 約束完成後，各 user story 可依優先序實作。

---

## Phase 3: User Story 1 - 用表格快速理解長音規則 (Priority: P1) 🎯 MVP

**Goal**: 讓 `/practice` 的長音規則區塊改為單一大表格，並提供規則列與三欄範例列。  
**Independent Test**: 在 `/practice` 僅檢查長音規則區塊，即可確認規則列、範例列與「あ段 + う」多筆範例都符合規格。

### Tests for User Story 1

- [ ] T010 [P] [US1] 撰寫長音規則表格結構與三欄範例驗證於 `tests/component/ChoonRuleSection.spec.ts`
- [ ] T011 [P] [US1] 擴充 `/practice` 長音規則 render-safe 與文案存在驗證於 `tests/component/PracticeViewSmoke.spec.ts`

### Implementation for User Story 1

- [ ] T012 [US1] 補齊長音規則與「あ段 + う」例外範例資料於 `src/modules/practice/data/specialSyllableData.ts`
- [ ] T013 [US1] 將 `src/modules/practice/components/ChoonRuleSection.vue` 改為單一大表格，實作規則列與「假名 / 羅馬音 / 中文翻譯」範例列
- [ ] T014 [US1] 視需要調整 `src/modules/practice/views/PracticeView.vue` 與 `src/styles/main.css`，確保長音規則區塊在 375px 下維持可辨識

**Checkpoint**: 長音規則區塊可獨立展示且可在手機尺寸下驗收。

---

## Phase 4: User Story 2 - 補齊拗音與外來語擴張的羅馬音資訊 (Priority: P2)

**Goal**: 讓清音拗音、合拗音與外來語擴張區塊都能完整呈現羅馬音與矩陣規則。  
**Independent Test**: 只檢查三個區塊，即可確認內容格都有羅馬音，且外來語區塊具備第一列 / 第一欄標頭。

### Tests for User Story 2

- [ ] T015 [P] [US2] 撰寫清音拗音與合拗音內容格羅馬音驗證於 `tests/component/YoonSections.spec.ts`
- [ ] T016 [P] [US2] 撰寫外來語矩陣標頭語意與上下排列驗證於 `tests/component/LoanwordSection.spec.ts`

### Implementation for User Story 2

- [ ] T017 [US2] 擴充 `src/modules/practice/data/specialSyllableData.ts` 的拗音、合拗音與外來語矩陣資料，對齊 `src/modules/practice/types/practice.ts`
- [ ] T018 [US2] 更新 `src/modules/practice/components/SeionYoonSection.vue` 與 `src/modules/practice/components/DakuonYoonSection.vue`，讓每個內容格同時顯示假名與羅馬音
- [ ] T019 [US2] 重構 `src/modules/practice/components/LoanwordSection.vue`，實作第一列 / 第一欄標頭與「上假名下羅馬音」內容格版型

**Checkpoint**: 拗音與外來語區塊可獨立完成並通過 component 驗證。

---

## Phase 5: User Story 3 - 在 375px 手機寬度下仍保持可讀與不破版 (Priority: P3)

**Goal**: 讓 `/practice` 頁首與本期涉及區塊在 375px 下不出現橫向捲動、裁切或重疊。  
**Independent Test**: 將 viewport 設為 375px，驗證頁首、長音規則、拗音與外來語矩陣皆保持可辨識。

### Tests for User Story 3

- [ ] T020 [P] [US3] 撰寫 375px 頁首與 practice 區塊 smoke 驗證於 `tests/e2e/practice-layout.smoke.spec.ts`
- [ ] T021 [P] [US3] 擴充 `/practice` default / hidden / placeholder 狀態驗證於 `tests/component/PracticeViewSmoke.spec.ts`

### Implementation for User Story 3

- [ ] T022 [US3] 調整 `src/app/AppShell.vue`、`src/shared/components/RouteTabs.vue` 與 `src/styles/main.css`，讓頁首、容器與 tabs 在 375px 下維持可辨識
- [ ] T023 [US3] 調整 `src/modules/practice/views/PracticeView.vue` 與相關 section class，避免本期區塊在 375px 下依賴橫向捲動
- [ ] T024 [US3] 重新檢查並必要時補強 `src/modules/practice/components/ChoonRuleSection.vue`、`src/modules/practice/components/SeionYoonSection.vue`、`src/modules/practice/components/DakuonYoonSection.vue`、`src/modules/practice/components/LoanwordSection.vue` 的密度退讓順序（先縮 padding，再縮字）

**Checkpoint**: `/practice` 可在 375px 下整體驗收，且不影響其他 route 的內容邊界。

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 完成跨故事驗證、文件同步與收尾。

- [ ] T025 [P] 執行並修正 `npm run lint`、`npm run typecheck`、`npm run test:unit`、`npm run build`
- [ ] T026 [P] 執行並修正 `npx playwright test tests/e2e/app-shell.smoke.spec.ts tests/e2e/practice-layout.smoke.spec.ts`
- [ ] T027 [P] 若本期新增新的主要檔案責任或測試結構，更新 `PROJECT_ARCHITECTURE.md`
- [ ] T028 [P] 依最終實作回寫 `specs/003-practice-romaji-layout/quickstart.md` 與 `specs/003-practice-romaji-layout/tasks.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 完成後，才能穩定進入 Phase 2。
- Phase 2 完成後，US1、US2、US3 才能開始。
- 建議優先完成 US1 作為 MVP，再進入 US2、US3。
- Polish 階段依賴所有預定 user story 完成。

### User Story Dependencies

- **US1 (P1)**: 依賴結構化資料型別與共用密度規則。
- **US2 (P2)**: 依賴 `practice.ts` 與 `specialSyllableData.ts` 的基礎重構，但可在 US1 完成後獨立推進。
- **US3 (P3)**: 依賴頁首、共用樣式與各 section 完整輸出，適合在 US1、US2 完成主要內容後做整體收斂。

### Within Each User Story

- 測試任務需先建立，至少先讓驗證內容明確，再進入主要實作。
- 資料模型 / 靜態資料更新先於 section template 改造。
- section 元件改造完成後，再進行 375px 密度微調與 smoke 驗證。

## Parallel Opportunities

- `T002` 與 `T003` 可平行，因為分屬不同測試檔。
- `T006`、`T007`、`T008` 可平行，分別處理資料、樣式與共享頁首。
- `T010` 與 `T011` 可平行，都是 US1 的測試補強。
- `T015` 與 `T016` 可平行，分別處理拗音與外來語測試。
- `T020` 與 `T021` 可平行，分別處理 e2e 與 component 層的 375px 驗證。

## Parallel Example: User Story 2

```bash
Task: "撰寫清音拗音與合拗音內容格羅馬音驗證於 tests/component/YoonSections.spec.ts"
Task: "撰寫外來語矩陣標頭語意與上下排列驗證於 tests/component/LoanwordSection.spec.ts"
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. 完成 Setup 與 Foundational。
2. 完成 US1 的測試與實作。
3. 在 `/practice` 驗證長音規則大表格可獨立成立。
4. 若時間有限，可先交付 US1 作為最小可用增量。

### Incremental Delivery

1. 先完成長音規則表格化，解決最高優先閱讀問題。
2. 再補齊拗音與外來語羅馬音，完成學習資訊一致性。
3. 最後收斂 375px 響應式與共享頁首，避免因局部改動造成整頁可讀性下降。

### Notes

- 任務中的檔案路徑皆為目前規劃的實作落點；若最終新增新的展示元件或測試檔，需同步補記 `PROJECT_ARCHITECTURE.md`。
- 本期不把受限 PWA 資產置換列為核心實作任務；若後續需要動到 manifest / icon，應以額外 maintenance scope 處理。
