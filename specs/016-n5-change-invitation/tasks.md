# Tasks: N5 文法新增邀約與變化表現整理

**Input**: `specs/016-n5-change-invitation/` — spec.md、plan.md、research.md、data-model.md、quickstart.md  
**Prerequisites**: plan.md ✅、spec.md ✅、research.md ✅、data-model.md ✅、quickstart.md ✅

**Tests**: 本功能已在 spec / plan 中明確要求自動化驗證，因此包含 unit、component smoke、route e2e 與負向 ownership 測試任務。  
**Organization**: 依使用者故事分組，確保每個 story 都能獨立實作與驗收。

---

## Phase 1: Setup（共享前置確認）

**Purpose**: 對齊現有 N5 文法資料模型、測試面與文件責任，避免在實作中引入不必要結構變更。

- [X] T001 確認 `src/modules/n5Grammar/types/grammarNotes.ts` 的 `N5GrammarSection`、`N5GrammarTopic`、`N5GrammarSharedNote`、`N5GrammarExample`、`N5GrammarTableExampleGroup` 足以承載本次新增資料
- [X] T002 [P] 確認 `src/modules/n5Grammar/views/N5GrammarView.vue` 與 `src/modules/n5Grammar/components/N5GrammarSectionCard.vue` 仍由資料驅動渲染與收合，不需新增 route 或 view 分支
- [X] T003 [P] 確認 `src/modules/n5Grammar/components/N5GrammarInfoBlock.vue`、`src/modules/n5Grammar/components/N5GrammarCompareTable.vue` 能直接承接本次 `info-stack` 與 `compare-table` 需求
- [X] T004 [P] 確認 `.gitignore` 已涵蓋 `node_modules/`、`dist/`、`coverage/`，並確認本次無需更新 `PROJECT_ARCHITECTURE.md`

---

## Phase 2: Foundational（阻擋性基礎）

**Purpose**: 先建立 source coverage、order 插入規則與來源筆記處理基準，避免各 story 對排序與來源責任有不同解讀。

**⚠️ CRITICAL**: User Story 實作前必須完成此 Phase。

- [X] T005 在 `src/modules/n5Grammar/data/grammarNotes.ts` 確認既有 core sections `polite-overview`、`sentence-basics`、`past-and-state` 的 order 為 1、2、3，並確認 particle sections 從 90 起跳
- [X] T006 [P] 在 `src/modules/n5Grammar/data/grammarNotes.ts` 確認 `n5GrammarSourceCoverage` 的欄位格式與既有 `note-v14-ch1`、`note-v14-ch2` 命名模式，作為新增 `note-v15-ch1`~`note-v15-ch4` 的基準
- [X] T007 [P] 比對 `_private/_private_notes/v15/note.txt`、`specs/016-n5-change-invitation/spec.md`、`specs/016-n5-change-invitation/research.md`，建立 ch1~ch4 的 coverage 清單與需修正的來源片段備忘

**Checkpoint**: 新增內容的排序區間、來源責任與命名規則已明確，後續 user stories 可依此實作。

---

## Phase 3: User Story 1 - 閱讀邀約表現並分辨語氣差異 (Priority: P1) 🎯 MVP

**Goal**: 在 `/n5-grammar` 新增邀約相關內容，讓使用者能比較 `ませんか`、`ましょう` 與普通體對照，並能閱讀 `～ましょう` 的形成方式與補充例句。  
**Independent Test**: 展開 `/n5-grammar` 中本次新增的邀約區塊後，能獨立理解 `ませんか` 與 `ましょう` 的語氣差異、普通體對照與 `ます形 + ましょう` 的使用方式。

### Tests for User Story 1

- [X] T008 [P] [US1] 在 `tests/unit/n5GrammarData.spec.ts` 新增資料測試，驗證 `invitation-comparison` 與 `polite-volitional` 兩個 core sections 存在且 order 為 4、7
- [X] T009 [P] [US1] 在 `tests/unit/n5GrammarData.spec.ts` 新增資料測試，驗證 `invitation-comparison` 使用 `compare-table`，且有對應 `tableExampleGroups` 與普通體 shared note
- [X] T010 [P] [US1] 在 `tests/unit/n5GrammarData.spec.ts` 新增資料測試，驗證 `polite-volitional` 使用 `info-stack`，包含形成方式、意向形對照與勸誘例句 topics
- [X] T011 [P] [US1] 在 `tests/component/N5GrammarSections.spec.ts` 新增區塊渲染測試，驗證 ch1 比較區塊展開後可見差異內容與例句
- [X] T012 [P] [US1] 在 `tests/component/N5GrammarSections.spec.ts` 或 `tests/component/N5GrammarViewSmoke.spec.ts` 新增區塊渲染測試，驗證 `polite-volitional` 展開後可見形成方式與例句

### Implementation for User Story 1

- [X] T013 [US1] 依 `_private/_private_notes/v15/note.txt` ch1 與 ch4，在 `src/modules/n5Grammar/data/grammarNotes.ts` 整理 `ませんか`、`ましょう`、`見ない？`、`帰ろう` 與 `ます形 + ましょう` 的來源內容與需校正片段
- [X] T014 [US1] 在 `src/modules/n5Grammar/data/grammarNotes.ts` 新增 `invitation-comparison` section，使用 `compare-table` 呈現 `ませんか` vs `ましょう` 差異、普通體對照與對應例句群組
- [X] T015 [US1] 在 `src/modules/n5Grammar/data/grammarNotes.ts` 新增 `polite-volitional` section，整理 `～ましょう` 的形成方式、`帰ろう` 對照、勸誘語氣提醒與例句
- [X] T016 [US1] 在 `src/modules/n5Grammar/data/grammarNotes.ts` 為 US1 兩個 sections 補齊 `sharedNotes`、`sourceRefs`、`origin` 與說明文字，並將羅馬音輸入提示僅保留為補充註記，確保沿用來源例句並在不足處補充 N5 程度例句
- [X] T017 [US1] 在 `src/modules/n5Grammar/data/grammarNotes.ts` 新增 `note-v15-ch1` 與 `note-v15-ch4` 的 `n5GrammarSourceCoverage` 映射，確保 ch1 與 ch4 無遺漏

**Checkpoint**: US1 完成後，`/n5-grammar` 可獨立提供邀約表現學習內容，且資料測試與基本渲染測試通過。

---

## Phase 4: User Story 2 - 閱讀自然變化與人為改變的差異 (Priority: P1)

**Goal**: 在 `/n5-grammar` 新增 `～くなります / ～になります` 與 `～くします / ～にします` 的完整整理，讓使用者能分辨自然變化與人為改變。  
**Independent Test**: 展開對應區塊後，可獨立閱讀 `い形容詞`、`な形容詞`、名詞接續與代表例句，並看出 `なります` 與 `します` 的語意差異。

### Tests for User Story 2

- [X] T018 [P] [US2] 在 `tests/unit/n5GrammarData.spec.ts` 新增資料測試，驗證 `state-change-naru` 與 `state-change-suru` 兩個 core sections 存在且 order 為 5、6
- [X] T019 [P] [US2] 在 `tests/unit/n5GrammarData.spec.ts` 新增資料測試，驗證 `state-change-naru` 具備 `い形容詞`、`な形容詞`、名詞三類 topics 與對應例句
- [X] T020 [P] [US2] 在 `tests/unit/n5GrammarData.spec.ts` 新增資料測試，驗證 `state-change-suru` 具備 `い形容詞`、`な形容詞`、名詞選擇三類 topics 與對應例句
- [X] T021 [P] [US2] 在 `tests/component/N5GrammarSections.spec.ts` 新增區塊渲染測試，驗證 `state-change-naru` 展開後能看到詞類接續與 shared note
- [X] T022 [P] [US2] 在 `tests/component/N5GrammarSections.spec.ts` 新增區塊渲染測試，驗證 `state-change-suru` 展開後能看到人為改變／決定用法與例句

### Implementation for User Story 2

- [X] T023 [US2] 依 `_private/_private_notes/v15/note.txt` ch2，在 `src/modules/n5Grammar/data/grammarNotes.ts` 整理 `～くなります / ～になります` 的來源內容、詞類接續與需修正片段
- [X] T024 [US2] 在 `src/modules/n5Grammar/data/grammarNotes.ts` 新增 `state-change-naru` section，整理 `い形容詞`、`な形容詞`、名詞接續與 `辭める / 止める / やめる` 補充提醒
- [X] T025 [US2] 依 `_private/_private_notes/v15/note.txt` ch3，在 `src/modules/n5Grammar/data/grammarNotes.ts` 整理 `～くします / ～にします` 的來源內容、詞類接續與需修正片段
- [X] T026 [US2] 在 `src/modules/n5Grammar/data/grammarNotes.ts` 新增 `state-change-suru` section，整理人為改變、決定／選擇用法與對應例句
- [X] T027 [US2] 在 `src/modules/n5Grammar/data/grammarNotes.ts` 新增 `note-v15-ch2` 與 `note-v15-ch3` 的 `n5GrammarSourceCoverage` 映射，確保 ch2 與 ch3 無遺漏

**Checkpoint**: US2 完成後，`/n5-grammar` 可獨立提供狀態變化與人為改變學習內容，且資料與元件測試通過。

---

## Phase 5: User Story 3 - 在既有 N5 文法頁中穩定閱讀新內容 (Priority: P2)

**Goal**: 確保 4 個新 core sections 正確插入 `/n5-grammar`，維持 mobile 可讀性、route ownership、既有排序與 render-safe 行為。  
**Independent Test**: 在 `/n5-grammar` 檢查新區塊順序與展開內容，同時確認 `/practice`、`/grammar`、`/vocabulary` 無外溢內容。

### Tests for User Story 3

- [X] T028 [P] [US3] 在 `tests/unit/n5GrammarData.spec.ts` 新增排序測試，驗證 core sections 順序為既有 1~3 後接 4~7，且所有 particle sections 仍排在 core 之後
- [X] T029 [P] [US3] 在 `tests/component/N5GrammarViewSmoke.spec.ts` 新增 smoke 驗證，確認新 4 個區塊標題在 `/n5-grammar` 初始 render 可見且無 render error
- [X] T030 [P] [US3] 在 `tests/component/RouteOwnership.spec.ts` 新增負向 ownership 測試，確認新 4 個區塊不會出現在 `/practice`、`/grammar`、`/vocabulary`
- [X] T031 [P] [US3] 在 `tests/e2e/n5-grammar-layout.spec.ts` 新增 mobile e2e 驗證，確認 375px 下展開新 4 個區塊仍可讀且無明顯水平溢出
- [X] T032 [P] [US3] 在 `tests/e2e/app-shell.smoke.spec.ts` 或既有 route smoke 測試中補強檢查，確認 app shell 與 direct route 進入 `/n5-grammar` 後能看到本次新增區塊

### Implementation for User Story 3

- [X] T033 [US3] 在 `src/modules/n5Grammar/data/grammarNotes.ts` 調整新增 4 個 core sections 的 order 與插入位置，確保接在既有 3 個 core 區塊之後、助詞群組之前
- [X] T034 [US3] 在 `src/modules/n5Grammar/data/grammarNotes.ts` 統一本次新增 sections 的 title / description / terminology，對齊既有 `/n5-grammar` 與 `變化規則` 的用語
- [X] T035 [US3] 比對 `_private/_private_notes/v15/note.txt` 與 `src/modules/n5Grammar/data/grammarNotes.ts`，完成 ch1~ch4 的最終漏缺檢查並補齊遺漏內容

**Checkpoint**: US3 完成後，新增內容排序正確、手機可讀、ownership 清楚，且既有 route 與助詞內容未回歸。

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 收尾驗證、文件一致性與完整 quickstart 檢查。

- [X] T036 [P] 重新檢查 `specs/016-n5-change-invitation/spec.md`、`plan.md`、`research.md`、`data-model.md`、`quickstart.md`、`tasks.md` 的繁體中文與 UTF-8 文字正確性
- [X] T037 [P] 執行 `npm run lint` 與 `npm run typecheck` 驗證本次變更
- [X] T038 [P] 執行 `npx vitest run tests/unit/n5GrammarData.spec.ts tests/component/N5GrammarSections.spec.ts tests/component/N5GrammarViewSmoke.spec.ts tests/component/RouteOwnership.spec.ts`
- [X] T039 [P] 執行 `npm run build` 與 `npx playwright test tests/e2e/app-shell.smoke.spec.ts tests/e2e/n5-grammar-layout.spec.ts`
- [X] T040 依 `specs/016-n5-change-invitation/quickstart.md` 完成手動驗證與 SC-001 ~ SC-005 對照檢查

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: 無依賴，可立即開始
- **Phase 2 (Foundational)**: 依賴 Phase 1，阻擋所有 user stories
- **Phase 3 (US1)**: 依賴 Phase 2，為 MVP
- **Phase 4 (US2)**: 依賴 Phase 2，可與 US1 並行
- **Phase 5 (US3)**: 依賴 US1、US2 完成後再進行整合與 ownership 驗證
- **Phase 6 (Polish)**: 依賴所有 user stories 完成

### User Story Dependencies

- **US1**: 無需依賴其他故事；完成後即可獨立展示邀約表現學習流程
- **US2**: 無需依賴其他故事；完成後即可獨立展示狀態變化／人為改變學習流程
- **US3**: 依賴 US1 與 US2 的資料已就位，才能做排序、render-safe 與 ownership 驗證

### Within Each User Story

- 測試任務先建立，實作後回頭執行並確認覆蓋完整
- 來源整理與錯誤校正先於資料寫入
- `grammarNotes.ts` 資料寫入先於 component / e2e 驗證

### Parallel Opportunities

- Phase 1 中標記 `[P]` 的確認任務可並行
- Phase 2 的 T006、T007 可並行
- US1 與 US2 可在 Phase 2 後並行
- 各 story 的 unit / component / e2e 測試任務可在資料結構確定後並行撰寫

---

## Parallel Example: User Story 1

```bash
# 可先並行撰寫 US1 的資料與元件測試
Task: "T008 [US1] 在 tests/unit/n5GrammarData.spec.ts 新增 section 存在與順序測試"
Task: "T011 [US1] 在 tests/component/N5GrammarSections.spec.ts 新增 ch1 比較區塊渲染測試"
Task: "T012 [US1] 在 tests/component/N5GrammarSections.spec.ts 或 tests/component/N5GrammarViewSmoke.spec.ts 新增 ch4 區塊渲染測試"

# 來源整理完成後，可集中實作 grammarNotes.ts
Task: "T014 [US1] 在 src/modules/n5Grammar/data/grammarNotes.ts 新增 invitation-comparison section"
Task: "T015 [US1] 在 src/modules/n5Grammar/data/grammarNotes.ts 新增 polite-volitional section"
```

---

## Parallel Example: User Story 2

```bash
# US2 的資料測試可先並行撰寫
Task: "T018 [US2] 在 tests/unit/n5GrammarData.spec.ts 新增新 section 存在與順序測試"
Task: "T021 [US2] 在 tests/component/N5GrammarSections.spec.ts 新增 state-change-naru 渲染測試"
Task: "T022 [US2] 在 tests/component/N5GrammarSections.spec.ts 新增 state-change-suru 渲染測試"

# ch2 / ch3 來源整理後，可依序寫入兩個 sections
Task: "T024 [US2] 在 src/modules/n5Grammar/data/grammarNotes.ts 新增 state-change-naru section"
Task: "T026 [US2] 在 src/modules/n5Grammar/data/grammarNotes.ts 新增 state-change-suru section"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. 完成 Phase 1: Setup
2. 完成 Phase 2: Foundational
3. 完成 Phase 3: User Story 1
4. **STOP and VALIDATE**: 執行 US1 的 unit / component 驗證，確認邀約表現已可獨立閱讀

### Incremental Delivery

1. 完成 Setup + Foundational
2. 交付 US1（邀約表現）
3. 交付 US2（自然變化 / 人為改變）
4. 交付 US3（整合、ownership、mobile 穩定性）
5. 最後跑 Polish 與 quickstart 驗證

### Parallel Team Strategy

1. 共同完成 Phase 1 與 Phase 2
2. 一位成員處理 US1，另一位成員處理 US2
3. US1 / US2 完成後再由同一人或第三人整合 US3 與最終驗證

---

## Notes

- `[P]` 代表可在不同檔案或低依賴條件下並行進行
- `[US1]`、`[US2]`、`[US3]` 對應 spec.md 的使用者故事
- 本次不應新增 route、renderer 或 repository 結構
- 若實作過程發現型別不足，再回頭最小幅度調整 `src/modules/n5Grammar/types/grammarNotes.ts`
