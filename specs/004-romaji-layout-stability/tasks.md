# Tasks: `/practice` 羅馬音排版補強與首屏穩定化

**Input**: Design documents from `/specs/004-romaji-layout-stability/`  
**Prerequisites**: plan.md、spec.md、research.md、data-model.md、contracts/  
**Tests**: 本 feature 明確要求 route smoke、component tests、375px e2e、positive ownership 與 negative ownership 驗證。  
**Organization**: 任務依 user story 分組，確保每個故事都能獨立實作與驗收。

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 先補齊測試骨架、忽略規則與文件追蹤，避免後續故事落地時缺少驗收邊界。

- [x] T001 驗證 `.gitignore` 對 `node_modules/`、`dist/`、`coverage/` 等可重建產物的覆蓋於 `.gitignore`
- [x] T002 [P] 建立本 feature 需要的測試檔骨架於 `tests/component/ChoonRuleSection.spec.ts`、`tests/component/YoonSections.spec.ts`、`tests/component/LoanwordSection.spec.ts`、`tests/e2e/practice-layout.smoke.spec.ts`
- [x] T003 [P] 補強共用測試工具以支援 `/practice` render 與 route 驗證於 `tests/component/testUtils.ts`
- [x] T004 [P] 擴充本 feature 的正向/反向 ownership 基線於 `tests/component/RouteOwnership.spec.ts`、`tests/component/PracticeViewSmoke.spec.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 建立所有故事共用的型別、資料骨架與 route-specific 樣式邊界。

**⚠️ CRITICAL**: 此階段未完成前，不應進入任何 user story 實作。

- [x] T005 更新 `/practice` 專用型別以支援長音列、拗音格與外來語矩陣於 `src/modules/practice/types/practice.ts`
- [x] T006 [P] 將靜態教學資料重構為結構化資料骨架於 `src/modules/practice/data/specialSyllableData.ts`
- [x] T007 [P] 建立 `/practice` 專用表格與 375px 密度 class 邊界於 `src/styles/main.css`
- [x] T008 [P] 調整頁首與 route tabs 的 375px 單列排版基礎於 `src/app/AppShell.vue`、`src/shared/components/RouteTabs.vue`

**Checkpoint**: 型別、資料骨架與 route-specific 樣式可支撐後續故事開發。

---

## Phase 3: User Story 1 - 長音規則區塊改為完整對照表 (Priority: P1) 🎯 MVP

**Goal**: 讓 `/practice` 的長音規則區塊改為單一大表格，並以不加欄位標題的三段資訊方式呈現例字。  
**Independent Test**: 打開 `/practice`，確認長音規則為單一大表格、規則列獨占整列，且例字依序顯示假名、羅馬音、中文意思。

### Tests for User Story 1

- [x] T009 [P] [US1] 先寫長音規則表格結構與例字三段資訊測試於 `tests/component/ChoonRuleSection.spec.ts`
- [x] T010 [P] [US1] 先寫 `/practice` 顯示長音規則區塊的 smoke 驗證於 `tests/component/PracticeViewSmoke.spec.ts`

### Implementation for User Story 1

- [x] T011 [US1] 補齊長音規則與「あ段 + う」例字資料於 `src/modules/practice/data/specialSyllableData.ts`
- [x] T012 [US1] 將長音規則區塊改寫為單一大表格於 `src/modules/practice/components/ChoonRuleSection.vue`
- [x] T013 [US1] 微調長音表格的列樣式與可讀性規則於 `src/styles/main.css`

**Checkpoint**: 長音規則區塊可獨立驗收，不依賴其他故事即可展示完整價值。

---

## Phase 4: User Story 2 - 拗音與外來語區塊補齊全表羅馬音 (Priority: P1)

**Goal**: 清音拗音、合拗音與本期調整範圍內的例字皆能顯示完整羅馬音，降低初學者辨讀門檻。  
**Independent Test**: 打開 `/practice`，逐格檢查清音拗音與合拗音標頭列、列標頭與內容格，確認沒有只剩假名的項目。

### Tests for User Story 2

- [x] T014 [P] [US2] 先寫清音拗音與合拗音全表羅馬音測試於 `tests/component/YoonSections.spec.ts`

### Implementation for User Story 2

- [x] T015 [US2] 補齊清音拗音與合拗音的羅馬音資料於 `src/modules/practice/data/specialSyllableData.ts`
- [x] T016 [US2] 更新清音拗音表格以顯示每格羅馬音於 `src/modules/practice/components/SeionYoonSection.vue`
- [x] T017 [US2] 更新合拗音表格以顯示每格羅馬音於 `src/modules/practice/components/DakuonYoonSection.vue`

**Checkpoint**: 拗音相關區塊可獨立驗收，所有假名項目均可直接對照羅馬音。

---

## Phase 5: User Story 3 - 外來語擴張改為系統化矩陣 (Priority: P2)

**Goal**: 將外來語擴張重整為第一列母音、第一欄基底音的矩陣，並在每格以假名在上、羅馬音在下的方式呈現。  
**Independent Test**: 打開外來語擴張區塊，確認欄列標頭清楚、每格內容可對應到組合關係，且假名不換行。

### Tests for User Story 3

- [x] T018 [P] [US3] 先寫外來語矩陣結構與 cell 內容測試於 `tests/component/LoanwordSection.spec.ts`

### Implementation for User Story 3

- [x] T019 [US3] 建立詳細的外來語矩陣標頭與內容資料於 `src/modules/practice/data/specialSyllableData.ts`
- [x] T020 [US3] 將外來語擴張改寫為矩陣表格於 `src/modules/practice/components/LoanwordSection.vue`
- [x] T021 [US3] 補強外來語矩陣的假名不換行與置中樣式於 `src/styles/main.css`

**Checkpoint**: 外來語擴張區塊可獨立驗收，矩陣規則與版面都符合規格。

---

## Phase 6: User Story 4 - 首次開啟 `/practice` 時保持下半部穩定渲染 (Priority: P2)

**Goal**: 修正首次開啟與重新整理 `/practice` 時，濁音／半濁音以下區塊延遲出現的斷裂感。  
**Independent Test**: 重新整理 `/practice`，確認下半部區塊首屏就穩定存在，無明顯空白斷層與 console error。

### Tests for User Story 4

- [x] T022 [P] [US4] 先寫 `/practice` 首屏穩定渲染與無延遲斷層驗證於 `tests/component/PracticeViewSmoke.spec.ts`
- [x] T023 [P] [US4] 先寫重新整理後首屏穩定顯示的 e2e smoke 驗證於 `tests/e2e/practice-layout.smoke.spec.ts`

### Implementation for User Story 4

- [x] T024 [US4] 調查並移除 `/practice` 下半部延遲插入的 render 路徑於 `src/modules/practice/views/PracticeView.vue`
- [x] T025 [US4] 補上必要的穩定 section wrapper、測試定位點或同步掛載調整於 `src/modules/practice/views/PracticeView.vue`、`src/modules/practice/components/ChoonRuleSection.vue`、`src/modules/practice/components/SeionYoonSection.vue`、`src/modules/practice/components/DakuonYoonSection.vue`、`src/modules/practice/components/LoanwordSection.vue`

**Checkpoint**: `/practice` 在預設與重新整理情境下都能穩定首屏顯示本期區塊。

---

## Phase 7: User Story 5 - 375px 小螢幕維持可讀與不破版 (Priority: P3)

**Goal**: 在 375px 寬度下保持頁首、長音表格、拗音矩陣與外來語矩陣可讀，且不使用水平捲動。  
**Independent Test**: 將 viewport 設為 375px，確認頁首與本期表格無裁切、重疊或水平捲動，並遵守先縮 padding 再縮字級的退讓順序。

### Tests for User Story 5

- [x] T026 [P] [US5] 先寫 375px 頁首與 `/practice` 表格可讀性驗證於 `tests/e2e/practice-layout.smoke.spec.ts`

### Implementation for User Story 5

- [x] T027 [US5] 微調頁首與 route tabs 的 375px 密度與不可斷行規則於 `src/app/AppShell.vue`、`src/shared/components/RouteTabs.vue`、`src/styles/main.css`
- [x] T028 [US5] 微調 `/practice` 各表格在 375px 下的密度退讓規則於 `src/modules/practice/views/PracticeView.vue`、`src/modules/practice/components/ChoonRuleSection.vue`、`src/modules/practice/components/SeionYoonSection.vue`、`src/modules/practice/components/DakuonYoonSection.vue`、`src/modules/practice/components/LoanwordSection.vue`、`src/styles/main.css`

**Checkpoint**: 375px 驗收可獨立通過，且沒有靠橫向捲動掩蓋版面問題。

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: 收尾所有跨故事驗證、文件與最終品質門檻。

- [x] T029 [P] 更新 `PROJECT_ARCHITECTURE.md` 反映 `/practice` 型別、資料模型、測試與 route-specific layout 責任
- [x] T030 [P] 依實作結果同步調整 `specs/004-romaji-layout-stability/quickstart.md`
- [x] T031 執行 `npm run lint`、`npm run typecheck`、`npm run test:unit`、`npm run build`
- [x] T032 執行 `npx playwright test tests/e2e/app-shell.smoke.spec.ts tests/e2e/practice-layout.smoke.spec.ts`

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 完成後才能穩定展開共用測試與檔案修改。
- Phase 2 完成後才能開始任何 user story 的正式實作。
- US1 與 US2 共享資料型別骨架，但完成順序可依 P1 優先處理。
- US3 依賴 Phase 2 的矩陣資料骨架。
- US4 依賴 `/practice` 主要區塊已可被測試與掛載。
- US5 依賴頁首與表格 DOM 結構大致穩定。
- Polish 階段必須等所有目標 user story 完成後再執行。

### User Story Dependencies

- **US1 (P1)**: 只依賴 Phase 2，可作為 MVP。
- **US2 (P1)**: 依賴 Phase 2，與 US1 共用資料檔，但可獨立驗收。
- **US3 (P2)**: 依賴 Phase 2；完成後可獨立驗收外來語矩陣。
- **US4 (P2)**: 依賴 `/practice` 相關區塊已存在，可在 US1~US3 基礎上收斂首屏穩定度。
- **US5 (P3)**: 依賴頁首與主要表格已有最終結構，再做 375px 密度調校。

### Within Each User Story

- 測試任務必須先寫並先看到失敗，再進入對應實作任務。
- 資料模型調整先於元件 template 調整。
- 元件實作完成後，再做對應樣式與 route-level 細修。

### Parallel Opportunities

- `T002`、`T003`、`T004` 可並行，因為寫入檔案不同。
- `T006`、`T007`、`T008` 可並行，因為分別處理資料、樣式與頁首。
- `T009`、`T010` 可並行；`T022`、`T023` 可並行；`T026` 可與文件更新前的其他驗證任務並行。
- `T029` 與 `T030` 可在程式完成且測試穩定後並行處理。

## Parallel Example: User Story 1

```bash
Task: "先寫長音規則表格結構與例字三段資訊測試於 tests/component/ChoonRuleSection.spec.ts"
Task: "先寫 /practice 顯示長音規則區塊的 smoke 驗證於 tests/component/PracticeViewSmoke.spec.ts"
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. 完成 Phase 1 與 Phase 2。
2. 完成 US1 的測試與實作。
3. 驗證長音規則大表格可獨立展示。

### Incremental Delivery

1. 先交付 US1，建立最核心的長音閱讀改善。
2. 再交付 US2，完成最直接的羅馬音補強。
3. 接著交付 US3，補完外來語矩陣的系統性。
4. 最後收斂 US4 與 US5，守住首屏穩定與 375px 驗收。

## Notes

- 任務描述已盡量避免多故事共寫同一檔案造成衝突，但 `specialSyllableData.ts` 與 `main.css` 仍會被多個故事逐步擴充，實作時需依 phase 順序處理。
- 本 feature 的 analyze 結果若只有 low/medium issue，可直接進入 implement；若出現 critical issue，需先回修 spec/plan/tasks。

