# Tasks: 練習頁與部署流程調整

**Input**: Design documents from `/specs/005-practice-cd-refine/`  
**Prerequisites**: `plan.md`、`spec.md`、`research.md`、`data-model.md`、`contracts/`、`quickstart.md`

**Tests**: 本 feature 明確要求保護既有互動與部署行為，因此各 user story 都包含對應測試或可自動驗證的檢查。

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 確認基礎守門條件與本期交付邊界

- [X] T001 確認 `.gitignore` 仍涵蓋 `node_modules/`、`dist/`、`build/`、`coverage/` 於 `.gitignore`
- [X] T002 [P] 盤點 `publishPages.mjs`、GitHub Pages 與部署路徑的現有引用於 `README.md`、`PROJECT_ARCHITECTURE.md`、`.github/workflows/cd.yml`
- [X] T003 [P] 確認本期自動驗證入口與既有測試檔責任於 `tests/component/PracticeViewSmoke.spec.ts`、`tests/component/ExamModal.spec.ts`、`tests/e2e/practice-exam-flow.spec.ts`、`tests/e2e/practice-layout.smoke.spec.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 建立所有故事共用的互動與部署基礎，避免後續故事各自分叉

- [X] T004 建立來源感知的最近結果清除包裝與 scroll timer 安全處理於 `src/modules/practice/views/PracticeView.vue`
- [X] T005 [P] 整理 `dev` / `main` 對應的 base path、目標子目錄與保留路徑策略於 `.github/workflows/cd.yml`

**Checkpoint**: 前端互動與部署映射的共同基礎已明確，可開始分故事實作

---

## Phase 3: User Story 1 - 修正練習頁結果區操作與表格標示 (Priority: P1)

**Goal**: 讓最近結果區清除操作符合新互動需求，並移除表格右側多餘標示

**Independent Test**: 完成一輪測驗後可分別驗證 toolbar 與下方結果區清除差異、回頂行為，以及 `tableA` / `tableB` 文字消失

### Tests for User Story 1

- [X] T006 [P] [US1] 擴充最近結果清除與平滑捲動驗證於 `tests/component/PracticeViewSmoke.spec.ts`
- [X] T007 [P] [US1] 擴充 `/practice` 版面 smoke 驗證表格不再輸出 `tableA` / `tableB` 於 `tests/e2e/practice-layout.smoke.spec.ts`

### Implementation for User Story 1

- [X] T008 [US1] 實作 toolbar 與結果區分流的清除後行為於 `src/modules/practice/views/PracticeView.vue`
- [X] T009 [P] [US1] 更新最近結果區清除按鈕文案與不斷行樣式於 `src/modules/exam/components/UnknownResultPanel.vue`
- [X] T010 [P] [US1] 移除清音表右側 `tableA` 標示於 `src/modules/practice/components/SeionTable.vue`
- [X] T011 [P] [US1] 移除濁音/半濁音表右側 `tableB` 標示於 `src/modules/practice/components/DakuonTable.vue`

**Checkpoint**: `/practice` 可獨立完成最近結果清除差異化與表格標示整理

---

## Phase 4: User Story 2 - 提升測驗彈窗題目辨識度 (Priority: P2)

**Goal**: 放大測驗彈窗題目列，同時維持答案、提示與按鈕區的穩定排版

**Independent Test**: 開啟測驗彈窗後，可在 375px、768px、1024px 下確認題目更醒目且內容不重疊、不裁切

### Tests for User Story 2

- [X] T012 [P] [US2] 擴充 `ExamModal` 預設渲染與題目區可見性驗證於 `tests/component/ExamModal.spec.ts`
- [X] T013 [P] [US2] 擴充測驗流程 e2e 驗證 modal 主要區塊存在於 `tests/e2e/practice-exam-flow.spec.ts`

### Implementation for User Story 2

- [X] T014 [US2] 調整題目列字級、modal 尺寸與內容節奏於 `src/modules/exam/components/ExamModal.vue`
- [X] T015 [US2] 補強小螢幕下 modal 相關樣式密度與穩定性於 `src/styles/main.css`

**Checkpoint**: 測驗彈窗可獨立交付新的題目強調版面

---

## Phase 5: User Story 3 - 簡化並穩定 Pages 部署流程 (Priority: P3)

**Goal**: 移除 repo 內自製部署腳本，改由 workflow 直接管理 `gh-pages` 內容與清理策略

**Independent Test**: 檢查 workflow 與文件，可確認 `dev -> staging`、`main -> production` 的映射仍成立，且部署不再依賴 `scripts/publishPages.mjs`

### Tests for User Story 3

- [X] T016 [P] [US3] 補齊部署契約與快速驗證步驟的一致性檢查於 `specs/005-practice-cd-refine/contracts/deployment-contract.md`、`specs/005-practice-cd-refine/quickstart.md`

### Implementation for User Story 3

- [X] T017 [US3] 以 workflow 原生 checkout/clean/copy/push 步驟重寫 Pages 發佈流程於 `.github/workflows/cd.yml`
- [X] T018 [P] [US3] 移除已失效的部署腳本於 `scripts/publishPages.mjs`
- [X] T019 [P] [US3] 更新 GitHub Pages 部署設定、排查與路徑說明於 `README.md`
- [X] T020 [US3] 更新部署結構與檔案職責描述於 `PROJECT_ARCHITECTURE.md`

**Checkpoint**: CD 流程可獨立交付，並且文件與實作保持一致

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 收尾驗證、文件一致性與整體回歸確認

- [X] T021 [P] 重新檢查最近結果、modal 與部署調整未外溢到非目標面於 `tests/component/PracticeViewSmoke.spec.ts`、`tests/component/ExamModal.spec.ts`、`README.md`
- [X] T022 [P] 執行靜態檢查與單元測試於 `package.json` 定義的 `lint`、`typecheck`、`test:unit`、`build`
- [X] T023 [P] 執行目標 e2e 驗證於 `tests/e2e/practice-exam-flow.spec.ts`、`tests/e2e/practice-layout.smoke.spec.ts`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 無依賴，可立即開始
- **Foundational (Phase 2)**: 依賴 Setup 完成，建立清除互動與部署映射基礎
- **User Story 1 (Phase 3)**: 依賴 Phase 2
- **User Story 2 (Phase 4)**: 依賴 Phase 2，但與 US1 程式碼寫入面大致獨立，可在資源足夠時平行
- **User Story 3 (Phase 5)**: 依賴 Phase 2，可與前端故事並行，但文件更新需在部署實作後收斂
- **Polish (Phase 6)**: 依賴所有目標故事完成

### User Story Dependencies

- **US1**: 需要 Phase 2 的清除行為包裝後才能正確實作差異化 scroll
- **US2**: 只依賴既有測驗流程，完成後不影響 US1 / US3
- **US3**: 依賴 Phase 2 的分支映射策略，但不依賴前端 UI 故事

### Within Each User Story

- 先更新測試，再進行對應實作
- 同一檔案的任務依序處理，避免互相覆寫
- 文件任務要在實作穩定後完成，確保描述與實際結果一致

### Parallel Opportunities

- T002、T003 可平行
- T006、T007 可平行
- T009、T010、T011 可平行
- T012、T013 可平行
- T018、T019 可平行，T020 在部署實作確定後再做
- T021、T022、T023 可作為最後平行驗證批次

---

## Parallel Example: User Story 1

```bash
# 測試可先一起補強
Task: "擴充最近結果清除與平滑捲動驗證於 tests/component/PracticeViewSmoke.spec.ts"
Task: "擴充 /practice 版面 smoke 驗證表格不再輸出 tableA / tableB 於 tests/e2e/practice-layout.smoke.spec.ts"

# 視圖文字與表頭標示可平行修改
Task: "更新最近結果區清除按鈕文案與不斷行樣式於 src/modules/exam/components/UnknownResultPanel.vue"
Task: "移除清音表右側 tableA 標示於 src/modules/practice/components/SeionTable.vue"
Task: "移除濁音/半濁音表右側 tableB 標示於 src/modules/practice/components/DakuonTable.vue"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. 完成 Setup 與 Foundational
2. 完成 US1 測試與實作
3. 驗證 `/practice` 最近結果互動與表格標示
4. 若需要可先交付第一批 UI 修正

### Incremental Delivery

1. 先交付 US1，確保練習主流程更順手
2. 再交付 US2，提升測驗彈窗辨識度
3. 最後交付 US3，重構部署與文件
4. 統一做 lint/typecheck/unit/e2e 收尾

### Parallel Team Strategy

1. 一人處理 US1 的結果區與 `/practice` 清理
2. 一人處理 US2 的 `ExamModal` 與對應測試
3. 一人處理 US3 的 workflow、README 與架構文件

---

## Notes

- `[P]` 任務表示不同檔案且可平行
- 每個 user story 都保留可獨立驗證的完成點
- `PROJECT_ARCHITECTURE.md` 更新屬完成定義的一部分，不可省略
- `scripts/publishPages.mjs` 移除前，需先確保 `.github/workflows/cd.yml` 已接手等效責任
