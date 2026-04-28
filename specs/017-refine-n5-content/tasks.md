# Tasks: N5 文法、單字與サ變動詞學習內容整理

**Input**: Design documents from `C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/specs/017-refine-n5-content/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md  
**Tests**: 本功能依 spec/plan 要求採測試優先，資料、元件、route ownership 與 e2e layout 都需驗證。

## Phase 1: Setup（共享準備）

**Purpose**: 確認專案基線、輸入來源與受限路徑規則，避免後續任務讀錯來源或污染再生產物。

- [X] T001 確認目前分支與 feature 目錄符合 `017-refine-n5-content`，並檢查 `.gitignore` 已涵蓋 `node_modules/`、`dist/`、`build/`、`coverage/` in `.gitignore`
- [X] T002 [P] 建立來源讀取清單與受限路徑提醒，僅允許讀取 `_private/_private_notes/v16/note.txt`、`_private/_private_notes/v16/note2.txt`、`_private/_private_notes/v16/note3.txt`、`_private/_private_notes/v16/here.png`、`_private/_private_notes/v16/number.png`、`_private/_private_notes/v16/number2.png` in `specs/017-refine-n5-content/tasks.md`
- [X] T003 [P] 檢查現有 N5 文法、變化規則、單字與 route ownership 測試基線 in `tests/unit/n5GrammarData.spec.ts`, `tests/unit/changeRulesData.spec.ts`, `tests/unit/vocabularyData.spec.ts`, `tests/component/RouteOwnership.spec.ts`

## Phase 2: Foundational（阻塞性基礎）

**Purpose**: 先完成來源 inventory、型別策略與測試骨架，後續 user story 才能獨立落地。

- [X] T004 建立 `v16` 來源 coverage inventory，將 `note2.txt`、`note.txt` ch0~ch8、`note3.txt` 四詞條對應到預定 section/topic ids in `src/modules/n5Grammar/data/grammarNotes.ts`
- [X] T005 [P] 為 N5 文法來源覆蓋、排序、topic 完整性新增失敗測試 in `tests/unit/n5GrammarData.spec.ts`
- [X] T006 [P] 為指示詞例句重點字標記新增失敗元件測試 in `tests/component/N5GrammarSections.spec.ts`
- [X] T007 [P] 為サ變動詞例句資料與顯示新增失敗測試 in `tests/unit/changeRulesData.spec.ts`, `tests/component/GrammarChangeRulesTables.spec.ts`
- [X] T008 [P] 為 `東口`、`西口`、`北口`、`南口` 詞條覆蓋與無重複新增失敗測試 in `tests/unit/vocabularyData.spec.ts`
- [X] T009 [P] 為本次新增內容的正向/負向 route ownership 新增失敗測試 in `tests/component/RouteOwnership.spec.ts`
- [X] T010 決定並實作最小型別擴充以支援 N5 例句重點字標記與サ變例句組 in `src/modules/n5Grammar/types/grammarNotes.ts`, `src/modules/grammar/types/changeRules.ts`

## Phase 3: User Story 1 - 在 N5 文法頁閱讀整理後的完整內容（Priority: P1）

**Goal**: 使用者在 `/n5-grammar` 能讀到 `note2.txt`、`note.txt` ch0~ch8 整理後的正確學習內容，且來源覆蓋、排序與助詞最後規則可驗證。

**Independent Test**: 展開 `/n5-grammar` 新增區塊，能看到每個主題的說明與例句；資料測試證明所有 `note-v16-*` coverage 皆有合法 section/topic 對應，`note2` 置頂、助詞最後。

### Tests for User Story 1

- [X] T011 [P] [US1] 驗證 `note2.txt` 核心字詞總覽位於 N5 文法第一個 core section，並包含 `い形容詞`、`な形容詞`、名詞、動詞比較 in `tests/unit/n5GrammarData.spec.ts`
- [X] T012 [P] [US1] 驗證 `できる` section 位於 `invitation-comparison` 後，且包含現在/過去/否定/て形/假定形與例句 in `tests/unit/n5GrammarData.spec.ts`
- [X] T013 [P] [US1] 驗證 `を`、`で`、`から`、`まで` 新助詞 section 皆為 `particle` 且位於最後群組 in `tests/unit/n5GrammarData.spec.ts`
- [X] T014 [P] [US1] 驗證疑問詞、指示詞、數字、時間表現 section 有完整 topics、examples、sourceRefs 與 sourceCoverage in `tests/unit/n5GrammarData.spec.ts`
- [X] T015 [P] [US1] 驗證 `/n5-grammar` 新增 section 預設收合、展開後顯示內容且無空白容器 in `tests/component/N5GrammarSections.spec.ts`
- [X] T016 [P] [US1] 驗證 375px 寬度展開新增 N5 section 無明顯水平溢出 in `tests/e2e/n5-grammar-layout.spec.ts`

### Implementation for User Story 1

- [X] T017 [US1] 將 `note2.txt` 整理為最上方核心字詞使用方式 section，補足說明、例句與比較表 in `src/modules/n5Grammar/data/grammarNotes.ts`
- [X] T018 [US1] 將 `note.txt` ch0 `できる` 整理為 N5 core section，去重並補齊各形態說明與例句 in `src/modules/n5Grammar/data/grammarNotes.ts`
- [X] T019 [US1] 將 `note.txt` ch1~ch4 整理為 `を`、`で`、`から`、`まで` 助詞 sections，保留長句解析與 `に/で` 比較 in `src/modules/n5Grammar/data/grammarNotes.ts`
- [X] T020 [US1] 將 `note.txt` ch5 常見疑問詞整理為 N5 core section，為每個疑問詞提供意思、用途與例句 in `src/modules/n5Grammar/data/grammarNotes.ts`
- [X] T021 [US1] 將 `note.txt` ch6 指示詞與 `here.png` 內容轉為表格資料，並整理指定例句與文法說明 in `src/modules/n5Grammar/data/grammarNotes.ts`
- [X] T022 [US1] 將 `note.txt` ch7 數字與 `number.png`、`number2.png` 內容轉為表格、說明與會話資料 in `src/modules/n5Grammar/data/grammarNotes.ts`
- [X] T023 [US1] 將 `note.txt` ch8 時間表現整理為月份、日期、星期、時、分、常用表現 sections/topics in `src/modules/n5Grammar/data/grammarNotes.ts`
- [X] T024 [US1] 更新 `particleSectionIds`、section order 與 `n5GrammarSourceCoverage`，確保 `note2` 第一、core 依來源順序、particle 最後 in `src/modules/n5Grammar/data/grammarNotes.ts`
- [X] T025 [US1] 若 N5 例句需要高亮，更新 renderer 以結構化欄位顯示紅色重點字 in `src/modules/n5Grammar/components/N5GrammarInfoBlock.vue`, `src/modules/n5Grammar/components/N5GrammarCompareTable.vue`

## Phase 4: User Story 2 - 用熟悉的可收合版型閱讀並比較 N5 文法（Priority: P1）

**Goal**: `/n5-grammar` 外層沿用既有可收合體驗，內部依內容採表格、條列或說明加範例，且標題與說明分開。

**Independent Test**: 僅開啟 `/n5-grammar`，檢查新增 section 標題列只含標題與控制、description 在 body 中，展開後 renderer 與內容類型相符。

### Tests for User Story 2

- [X] T026 [P] [US2] 驗證新增 N5 section 標題列不夾帶說明、description 與內容在展開區域顯示 in `tests/component/N5GrammarSections.spec.ts`
- [X] T027 [P] [US2] 驗證指示詞與數字表格、疑問詞與時間說明在既有 renderer 中可讀 in `tests/component/N5GrammarSections.spec.ts`
- [X] T028 [P] [US2] 驗證 N5 文法初始 render 與全部收合狀態穩定 in `tests/component/N5GrammarViewSmoke.spec.ts`

### Implementation for User Story 2

- [X] T029 [US2] 調整新增 N5 section 的 `title`、`description`、`presentationMode`，確保標題與說明分離 in `src/modules/n5Grammar/data/grammarNotes.ts`
- [X] T030 [US2] 補強 N5 renderer 對多行表格、表格例句群組與重點字標記的可讀性 in `src/modules/n5Grammar/components/N5GrammarCompareTable.vue`, `src/styles/main.css`
- [X] T031 [US2] 補強 N5 section 在手機寬度的換行與 overflow 樣式 in `src/styles/main.css`

## Phase 5: User Story 3 - 在變化規則頁補齊サ變動詞學習例句（Priority: P2）

**Goal**: `/grammar` 的サ變動詞表格保留，並在表格下方顯示 `散歩` 的指定型態例句；grammar 容器標題與說明分開。

**Independent Test**: 展開 `/grammar` 的サ變動詞區塊，表格與 `しません`、`しませんでした`、`しない`、`した` 例句都可見，既有其他表格仍可展開。

### Tests for User Story 3

- [X] T032 [P] [US3] 驗證サ變動詞資料含指定四種型態例句，且表格資料未被移除 in `tests/unit/changeRulesData.spec.ts`
- [X] T033 [P] [US3] 驗證サ變動詞展開後表格下方顯示 `散歩` 例句 in `tests/component/GrammarChangeRulesTables.spec.ts`
- [X] T034 [P] [US3] 驗證 grammar table shell 標題與說明分離且既有收合操作維持 in `tests/component/GrammarViewSmoke.spec.ts`
- [X] T035 [P] [US3] 驗證 375px 寬度サ變動詞表格與例句可讀 in `tests/e2e/grammar-change-rules.spec.ts`

### Implementation for User Story 3

- [X] T036 [US3] 擴充變化規則型別以承載可選表格下方例句組 in `src/modules/grammar/types/changeRules.ts`
- [X] T037 [US3] 在サ變動詞資料中新增 `散歩` 的 `しません`、`しませんでした`、`しない`、`した` 例句 in `src/modules/grammar/data/changeRules.ts`
- [X] T038 [US3] 更新 inflection table renderer 顯示可選例句組且不影響其他活用表 in `src/modules/grammar/components/InflectionTable.vue`
- [X] T039 [US3] 拆分 grammar 表格標題與說明顯示，保留 toggle 操作與既有 data-testid in `src/modules/grammar/components/GrammarAccordionTableShell.vue`, `src/modules/grammar/data/changeRules.ts`
- [X] T040 [US3] 補強 grammar 例句區手機可讀樣式 in `src/styles/main.css`

## Phase 6: User Story 4 - 在單字練習頁找到指定方位詞（Priority: P3）

**Goal**: `/vocabulary` 能找到 `東口`、`西口`、`北口`、`南口`，且不重複新增。

**Independent Test**: 搜尋四個詞條都能找到，資料測試證明每個詞條唯一，標記流程維持。

### Tests for User Story 4

- [X] T041 [P] [US4] 驗證四個方位詞在 raw/normalized vocabulary 中各自唯一存在 in `tests/unit/vocabularyData.spec.ts`
- [X] T042 [P] [US4] 驗證 `/vocabulary` 搜尋四個方位詞可顯示結果 in `tests/component/VocabularyViewSmoke.spec.ts`
- [X] T043 [P] [US4] 驗證 e2e 搜尋與標記流程包含四個方位詞且不回歸 in `tests/e2e/vocabulary-word-practice.spec.ts`

### Implementation for User Story 4

- [X] T044 [US4] 查核並追加 `東口`、`西口`、`北口`、`南口` 詞條到字典尾端 in `src/modules/vocabulary/data/jpWords.ts`

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: 完成跨 route 驗證、文件同步與品質檢查。

- [X] T045 [P] 更新 route ownership 測試，確認新增 N5/grammar/vocabulary 內容不外溢到 `/practice` 或未指定 route in `tests/component/RouteOwnership.spec.ts`
- [X] T046 [P] 若型別責任、renderer 職責或測試結構實際改變，更新架構文件 in `PROJECT_ARCHITECTURE.md`
- [X] T047 [P] 對照 `v16` 原始筆記與整理後資料，確認來源無漏缺並補齊缺漏 in `src/modules/n5Grammar/data/grammarNotes.ts`
- [X] T048 執行 `npm run lint` 並修正發現的問題
- [X] T049 執行 `npm run typecheck` 並修正發現的問題
- [X] T050 執行 `npm run test:unit` 並修正發現的問題
- [X] T051 執行 `npm run build` 並修正發現的問題
- [X] T052 執行 `npm run test:e2e` 並修正發現的問題
- [X] T053 檢查新增/修改中文內容皆為 UTF-8，沒有亂碼、替代問號或可見 BOM in `specs/017-refine-n5-content/`, `src/`, `tests/`

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 Setup 可立即開始。
- Phase 2 Foundational 依賴 Phase 1，且阻塞所有 user story。
- US1 與 US2 同為 P1，但 US2 的排版驗證依賴 US1 的新增 section 資料。
- US3 可在 Phase 2 後獨立進行。
- US4 可在 Phase 2 後獨立進行。
- Phase 7 Polish 依賴所有選定 user story 完成。

### User Story Dependencies

- **US1**: MVP，依賴 T004~T010。
- **US2**: 依賴 US1 新增 section 後才能完整驗證。
- **US3**: 可與 US1/US4 平行，檔案集中在 `grammar` 模組。
- **US4**: 可與 US1/US3 平行，檔案集中在 `vocabulary` 模組。

## Parallel Opportunities

- T005~T009 可平行建立失敗測試。
- US1 的 T011~T016 可平行撰寫測試，但 T017~T025 需依資料檔衝突順序執行。
- US3 的 T032~T035 可平行撰寫測試，T036~T040 需按型別、資料、renderer、樣式順序執行。
- US4 的 T041~T043 可平行撰寫測試，T044 單獨更新資料。
- T048~T052 驗證命令需依序執行。

## Parallel Example: User Story 1

```text
Task: "T011 [US1] 驗證 note2.txt 核心字詞總覽位於 N5 文法第一個 core section in tests/unit/n5GrammarData.spec.ts"
Task: "T014 [US1] 驗證疑問詞、指示詞、數字、時間表現 section 有完整 topics/examples/sourceRefs in tests/unit/n5GrammarData.spec.ts"
Task: "T015 [US1] 驗證 /n5-grammar 新增 section 預設收合、展開後顯示內容 in tests/component/N5GrammarSections.spec.ts"
Task: "T016 [US1] 驗證 375px 寬度展開新增 N5 section 無明顯水平溢出 in tests/e2e/n5-grammar-layout.spec.ts"
```

## Implementation Strategy

### MVP First

1. 完成 Phase 1 與 Phase 2。
2. 完成 US1，讓 `/n5-grammar` 具備完整來源覆蓋與排序。
3. 執行 US1 對應 unit/component/e2e 測試。

### Incremental Delivery

1. US1：N5 文法完整內容與 coverage。
2. US2：N5 文法排版與可讀性補強。
3. US3：`/grammar` サ變動詞與標題/說明拆分。
4. US4：`/vocabulary` 四個方位詞。
5. Polish：route ownership、完整驗證與 UTF-8 檢查。

## Notes

- 每個任務完成後需將 checkbox 改為 `[X]`。
- 測試任務應先於對應實作任務完成，並確認在實作前失敗。
- 不得讀取或修改 `_private/_private_notes/筆記.txt`、`done` 版本資料夾或其巢狀內容。
- 若實作發現 plan/spec 與來源筆記有重大不一致，需先更新規格或計畫再繼續。

