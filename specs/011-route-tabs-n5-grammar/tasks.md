# Tasks: 路由切換與 N5 文法入口優化

**Input**: Design documents from `/specs/011-route-tabs-n5-grammar/`  
**Prerequisites**: `plan.md`、`spec.md`、`research.md`、`data-model.md`、`contracts/`、`quickstart.md`

**Tests**: 本 feature 明確要求驗證共享頁首 smoke、route ownership、`N5文法` placeholder render-safe、主路由文字禁止斷行、文字放大，以及 `/practice` 指定表格在放大後不破版，因此包含 component 與 e2e 驗收任務。

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

**Constitution Alignment**: 本任務列表已納入 zh-TW 文件要求、`.gitignore` 檢查、主路由 smoke test、positive/negative ownership 驗證、route-specific 排版保護、來源 spec 回寫與 `PROJECT_ARCHITECTURE.md` 更新。

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 確認 repo hygiene、建立新 route 與測試骨架，並把文件同步責任先納入任務範圍。

- [X] T001 檢查 `.gitignore` 是否已涵蓋 `node_modules/`、`dist/`、`build/`、`coverage/` 於 `.gitignore`
- [X] T002 建立 `N5文法` feature 所需目錄與檔案骨架於 `src/modules/n5Grammar/views/`、`tests/component/N5GrammarViewSmoke.spec.ts`
- [X] T003 [P] 準備共享頁首與主路由驗收骨架於 `tests/component/AppShellSmoke.spec.ts`、`tests/component/RouteOwnership.spec.ts`、`tests/e2e/app-shell.smoke.spec.ts`
- [X] T004 [P] 確認需回寫的來源規格與架構文件清單於 `specs/001-japanese-pwa-study/spec.md`、`specs/003-practice-romaji-layout/spec.md`、`specs/004-romaji-layout-stability/spec.md`、`PROJECT_ARCHITECTURE.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 先建立共享導覽資料、route 骨架與樣式邊界，作為所有 user story 的共同基礎。

**CRITICAL**: 本階段完成前，不進入任何 user story 實作。

- [X] T005 建立主路由 tab descriptors 與固定順序於 `src/shared/components/RouteTabs.vue`
- [X] T006 建立 `N5文法` route 與 meta 骨架於 `src/app/router.ts`
- [X] T007 建立 `N5文法` placeholder view 骨架於 `src/modules/n5Grammar/views/N5GrammarView.vue`
- [X] T008 建立共享頁首與 `/practice` 指定表格的 route-specific 樣式邊界於 `src/styles/main.css`
- [X] T009 建立四主路由 positive/negative ownership 驗證基線於 `tests/component/RouteOwnership.spec.ts`

**Checkpoint**: 共享導覽順序、新 route 骨架、樣式邊界與 ownership 基線已準備完成。

---

## Phase 3: User Story 1 - 改善路由切換可讀性 (Priority: P1) 🎯 MVP

**Goal**: 讓共享頁首改為 only-tabs 導覽，主路由按鈕靠左排列、可換列、按鈕內文字禁止斷行，且保留既有主路由切換能力。

**Independent Test**: 開啟任一主路由，確認左側舊標題已移除，四個主路由按鈕靠左顯示；在約 `375px` 寬度下按鈕可換列，但每顆按鈕內文字都保持單行。

### 製作任務

- [X] T010 [US1] 移除共享頁首中的舊 route title 呈現並保留 route tabs 容器於 `src/app/AppShell.vue`
- [X] T011 [US1] 重構主路由按鈕清單、順序與 active state 於 `src/shared/components/RouteTabs.vue`
- [X] T012 [US1] 調整主路由按鈕靠左、多列換行、文字放大與禁止斷行樣式於 `src/shared/components/RouteTabs.vue`、`src/styles/main.css`
- [X] T013 [US1] 視實作結果移除或調整失去責任的頁首元件於 `src/shared/components/AppHeader.vue`

### 驗收任務

- [X] T014 [P] [US1] 更新共享頁首 smoke test，驗證舊標題移除且 tabs-only shell render-safe 於 `tests/component/AppShellSmoke.spec.ts`
- [X] T015 [P] [US1] 擴充 route ownership 測試，驗證共享導覽只顯示主路由按鈕且不把新內容外溢到非指定 surface 於 `tests/component/RouteOwnership.spec.ts`
- [X] T016 [US1] 更新 app-shell e2e，驗證四個主路由可切換、按鈕文字不斷行且窄版下無水平溢出於 `tests/e2e/app-shell.smoke.spec.ts`

**Checkpoint**: 共享頁首已切換成可用的 only-tabs 導覽，且可在小螢幕獨立驗證。

---

## Phase 4: User Story 2 - 提升字母練習表格辨識度 (Priority: P2)

**Goal**: 只放大 `/practice` 清音表與濁音／半濁音表的文字，並在必要時做最小微調，避免因字級放大造成破版或額外斷行。

**Independent Test**: 開啟 `/practice`，確認清音表與濁音／半濁音表文字明顯放大；若 `1.1x` 造成破版或斷行，可微幅下修，但最終畫面仍需明顯大於現況且不影響其他區塊。

### 製作任務

- [X] T017 [US2] 鎖定 `/practice` 清音表與濁音／半濁音表的字級作用範圍於 `src/modules/practice/views/PracticeView.vue`、`src/styles/main.css`
- [X] T018 [US2] 放大清音表與濁音／半濁音表的內容字級並維持對齊於 `src/styles/main.css`
- [X] T019 [US2] 若放大後出現破版、裁切或額外斷行，微調 line-height、padding 或字級至最小可行穩定值於 `src/styles/main.css`

### 驗收任務

- [X] T020 [P] [US2] 新增或擴充 `/practice` 煙霧驗證，確認指定表格仍可正常 render 且未影響未點名區塊於 `tests/component/PracticeViewSmoke.spec.ts`
- [X] T021 [US2] 擴充 app-shell 或 `/practice` 窄版驗收，確認表格放大後不破版、不裁切、不卡出新的按鈕內斷行於 `tests/e2e/app-shell.smoke.spec.ts`

**Checkpoint**: `/practice` 指定表格的文字已放大，且在必要微調後仍可獨立驗證版面穩定。

---

## Phase 5: User Story 3 - 新增 N5 文法入口與占位頁 (Priority: P3)

**Goal**: 新增 `N5文法` 主路由按鈕與獨立 placeholder route，確保可從按鈕與直接網址進入，且不影響既有 `/grammar` 主內容。

**Independent Test**: 在共享頁首看見 `N5文法` 按鈕，點擊後進入新 route 並顯示 `製作中`；直接輸入網址也能看到相同內容，且 `/grammar` 仍顯示既有規則頁。

### 製作任務

- [X] T022 [US3] 完成 `N5文法` route path、component 與 meta 串接於 `src/app/router.ts`
- [X] T023 [US3] 實作 `N5文法` placeholder view 與必要測試識別於 `src/modules/n5Grammar/views/N5GrammarView.vue`
- [X] T024 [US3] 將 `N5文法` 主路由按鈕接入共享導覽且固定在 `單字練習` 右側於 `src/shared/components/RouteTabs.vue`

### 驗收任務

- [X] T025 [P] [US3] 新增 `N5文法` placeholder smoke test，驗證預設渲染 `製作中` 且無非預期共享內容於 `tests/component/N5GrammarViewSmoke.spec.ts`
- [X] T026 [P] [US3] 擴充 route ownership 測試，驗證 `N5文法` 只出現在新 route、`/grammar` 不顯示 placeholder 於 `tests/component/RouteOwnership.spec.ts`
- [X] T027 [US3] 更新 app-shell e2e，驗證可從按鈕與直接網址進入 `N5文法` 並保持既有 `/grammar`、`/vocabulary` 主內容不變於 `tests/e2e/app-shell.smoke.spec.ts`

**Checkpoint**: 新 route 已可獨立進入與驗證，且沒有污染既有 grammar / vocabulary surface。

---

## Phase 6: User Story 4 - 維護者同步更新來源規格與架構說明 (Priority: P4)

**Goal**: 讓共享頁首、主路由數量與手機版排版規則在來源規格與架構文件中保持一致，避免未來文件與實作脫節。

**Independent Test**: 僅查看更新後的 spec、architecture 與 quickstart，即可得知新的四主路由結構、tabs-only header 規則與 `/practice` 表格文字驗收基準。

### 製作任務

- [X] T028 [US4] 回寫主路由數量與共享頁首描述於 `specs/001-japanese-pwa-study/spec.md`
- [X] T029 [US4] 回寫 375px 下共享頁首與 route tabs 規則於 `specs/003-practice-romaji-layout/spec.md`
- [X] T030 [US4] 回寫 `AppShell` / `RouteTabs` 穩定度描述於 `specs/004-romaji-layout-stability/spec.md`
- [X] T031 [US4] 更新 `PROJECT_ARCHITECTURE.md`，反映 `N5文法` 模組、router 責任與共享頁首職責變更

### 驗收任務

- [X] T032 [US4] 驗證 `specs/011-route-tabs-n5-grammar/quickstart.md` 與來源 spec 的手動驗收流程一致於 `specs/011-route-tabs-n5-grammar/quickstart.md`、`specs/001-japanese-pwa-study/spec.md`、`specs/003-practice-romaji-layout/spec.md`、`specs/004-romaji-layout-stability/spec.md`

**Checkpoint**: 文件與架構說明已與最終行為同步，不需靠 code diff 猜測規則。

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: 完成整體驗證、補齊條件回寫與確認收尾品質。

- [X] T033 [P] 視實作結果檢查並更新受影響的 shell 規格描述於 `specs/006-grammar-change-rules/spec.md`、`specs/007-word-practice-rebuild/spec.md`
- [X] T034 [P] 執行 `npm run lint` 驗證 `src/app/AppShell.vue`、`src/shared/components/RouteTabs.vue`、`src/modules/n5Grammar/views/N5GrammarView.vue`、`src/modules/practice/views/PracticeView.vue`
- [X] T035 [P] 執行 `npm run typecheck` 驗證 `src/app/router.ts`、`src/app/AppShell.vue`、`src/shared/components/RouteTabs.vue`、`src/modules/n5Grammar/views/N5GrammarView.vue`
- [X] T036 [P] 執行 `npm run test:unit` 驗證 `tests/component/AppShellSmoke.spec.ts`、`tests/component/RouteOwnership.spec.ts`、`tests/component/N5GrammarViewSmoke.spec.ts`、`tests/component/PracticeViewSmoke.spec.ts`
- [X] T037 [P] 執行 `npm run build` 驗證 `src/app/router.ts`、`src/app/AppShell.vue`、`src/shared/components/RouteTabs.vue`、`src/modules/n5Grammar/views/N5GrammarView.vue`、`src/styles/main.css`
- [X] T038 [P] 執行 `npx playwright test tests/e2e/app-shell.smoke.spec.ts` 驗證 `tests/e2e/app-shell.smoke.spec.ts`
- [X] T039 依 `specs/011-route-tabs-n5-grammar/quickstart.md` 做最終人工驗收並確認文字放大、禁止斷行與 table 微調結果符合需求於 `specs/011-route-tabs-n5-grammar/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1: Setup** 可立即開始。
- **Phase 2: Foundational** 依賴 Phase 1，且會阻擋所有 user story。
- **Phase 3: US1** 依賴 Phase 2，為 MVP。
- **Phase 4: US2** 依賴 US1 的共享頁首穩定後再進行局部字級調整。
- **Phase 5: US3** 依賴 US1 的共享導覽完成後才能接入新按鈕與新 route。
- **Phase 6: US4** 依賴 US1-US3 的最終行為確定後再回寫文件。
- **Phase 7: Polish** 依賴所有目標故事完成。

### User Story Dependencies

- **US1**: 只依賴 foundational，可先獨立完成並驗證共享導覽。
- **US2**: 依賴 US1 的共享頁首與樣式邊界完成，但不依賴 US3。
- **US3**: 依賴 US1 的 tabs 重構完成，才能接入 `N5文法` 按鈕與 route。
- **US4**: 依賴 US1-US3 的最終 UI 與 route 行為，才能做準確文件回寫。

### Within Each User Story

- 先完成「製作任務」，再執行該故事的「驗收任務」。
- 驗收任務可先撰寫並觀察失敗，再完成對應實作。
- 文字大小與禁止斷行的要求不得只存在於樣式實作，必須在驗收任務中被明確檢查。
- `/practice` 表格若因放大導致破版，可微幅下修，但必須在驗收任務中確認「仍明顯大於現況」。

### Parallel Opportunities

- T003 與 T004 可平行。
- T014 與 T015 可平行。
- T020 與 T021 可平行。
- T025 與 T026 可平行。
- T028、T029、T030 可平行。
- T034、T035、T036、T037、T038 可在實作完成後平行驗證。

---

## Parallel Example: User Story 1

```bash
# 先並行準備共享導覽驗收
Task: "更新共享頁首 smoke test，驗證舊標題移除且 tabs-only shell render-safe 於 tests/component/AppShellSmoke.spec.ts"
Task: "擴充 route ownership 測試，驗證共享導覽只顯示主路由按鈕且不把新內容外溢到非指定 surface 於 tests/component/RouteOwnership.spec.ts"

# 再並行調整共享導覽實作
Task: "移除共享頁首中的舊 route title 呈現並保留 route tabs 容器於 src/app/AppShell.vue"
Task: "重構主路由按鈕清單、順序與 active state 於 src/shared/components/RouteTabs.vue"
```

---

## Parallel Example: User Story 2

```bash
# 並行處理指定表格的實作與驗收
Task: "放大清音表與濁音／半濁音表的內容字級並維持對齊於 src/styles/main.css"
Task: "新增或擴充 /practice 煙霧驗證，確認指定表格仍可正常 render 且未影響未點名區塊於 tests/component/PracticeViewSmoke.spec.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. 完成 Setup 與 Foundational。
2. 完成 US1 的 only-tabs shared header。
3. 先驗證共享導覽 smoke、ownership 與窄版排版。
4. 若通過，再往下補 `/practice` 字級與 `N5文法` route。

### Incremental Delivery

1. US1 先完成共享導覽可讀性。
2. US2 再補 `/practice` 指定表格的文字放大與穩定度微調。
3. US3 完成 `N5文法` 按鈕與 route。
4. US4 最後回寫來源 spec 與架構文件。

### Notes

- `[P]` 僅表示不同檔案、可並行處理。
- 每個 user story 都刻意拆成「製作」與「驗收」兩類任務，符合本次補充要求。
- 「禁止斷行」與「文字大小放大」已被拆成獨立可驗收項目，不能只憑主觀視覺判定完成。
- `/practice` table 文字放大後若導致破版或新增斷行，允許微幅下修，但不得回退成與現況無差異的尺寸。
