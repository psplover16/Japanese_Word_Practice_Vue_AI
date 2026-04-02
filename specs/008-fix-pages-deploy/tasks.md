# Tasks: GitHub Pages 部署修正

**Input**: Design documents from `/specs/008-fix-pages-deploy/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/deployment-publish-contract.md, quickstart.md

**Tests**: 本功能要求先以 Vitest 補上發布規則測試，再進行腳本與 workflow 實作。

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 建立發布腳本與測試的共用基礎

- [x] T001 Create scripts directory scaffold for deployment publishing in scripts/publishPages.mjs
- [x] T002 [P] Create deployment unit-test scaffold in tests/unit/publishPages.spec.ts
- [x] T003 [P] Verify repository ignore coverage remains valid in .gitignore

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 建立 production/staging 共用的發布模型與測試工具

- [x] T004 Implement shared publish target parsing and workspace helper utilities in scripts/publishPages.mjs
- [x] T005 [P] Add reusable temporary workspace fixture helpers in tests/unit/publishPages.spec.ts

**Checkpoint**: 發布腳本已有共用模型，後續 user story 可依此擴充

---

## Phase 3: User Story 1 - 正式站可正常開啟 (Priority: P1)

**Goal**: 修正 production 發布後根目錄殘留原始 repo 內容，避免正式站再請求 `/src/*`

**Independent Test**: 執行 `npx vitest run tests/unit/publishPages.spec.ts`，確認 production 發布案例會清掉錯誤根目錄內容並把 `dist/` 複製到 worktree 根目錄

### Tests for User Story 1

- [x] T006 [P] [US1] Add production publish regression tests for root cleanup and dist sync in tests/unit/publishPages.spec.ts
- [x] T007 [P] [US1] Add negative-ownership regression proving source repo files never remain publishable in tests/unit/publishPages.spec.ts

### Implementation for User Story 1

- [x] T008 [US1] Implement production root cleanup and copy rules in scripts/publishPages.mjs
- [x] T009 [US1] Update production publish flow to call the deployment script in .github/workflows/cd.yml

**Checkpoint**: production 發布規則可獨立驗證，正式站不再輸出原始碼入口頁

---

## Phase 4: User Story 2 - 測試站與正式站分流 (Priority: P2)

**Goal**: 讓 staging 發布只更新 `staging/`，同時清掉不合法根目錄殘留並保留 production/staging 的分流

**Independent Test**: 執行 `npx vitest run tests/unit/publishPages.spec.ts`，確認 staging 發布只更新 `staging/`，production 根目錄不會被 staging 覆蓋

### Tests for User Story 2

- [x] T010 [P] [US2] Add staging publish isolation tests and preserved-entry assertions in tests/unit/publishPages.spec.ts
- [x] T011 [P] [US2] Add first-run orphan workspace regression for staging-only deploys in tests/unit/publishPages.spec.ts

### Implementation for User Story 2

- [x] T012 [US2] Implement staging sync and preserved-root allowlist rules in scripts/publishPages.mjs
- [x] T013 [US2] Update staging publish flow and script arguments in .github/workflows/cd.yml

**Checkpoint**: staging 與 production 位置分離且互不污染

---

## Phase 5: User Story 3 - 部署失敗可快速定位 (Priority: P3)

**Goal**: 讓維護者能看懂本次同步目標、是否有變更，以及失敗點在哪裡

**Independent Test**: 執行 `npx vitest run tests/unit/publishPages.spec.ts`，確認腳本會對 `production`/`staging`/`skipped`/錯誤情境輸出可辨識結果

### Tests for User Story 3

- [x] T014 [P] [US3] Add skipped-result and invalid-input reporting tests in tests/unit/publishPages.spec.ts

### Implementation for User Story 3

- [x] T015 [US3] Implement operator-facing result messages and exit handling in scripts/publishPages.mjs
- [x] T016 [US3] Align workflow step output and no-change handling with script results in .github/workflows/cd.yml

**Checkpoint**: 維護者可從 workflow 結果快速判讀發布狀態

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 文件同步與最終驗證

- [x] T017 [P] Update originating deployment behavior spec in specs/002-testing-cicd-foundation/spec.md
- [x] T018 [P] Update architecture documentation for deployment script ownership in PROJECT_ARCHITECTURE.md
- [x] T019 [P] Sync final implementation details back into specs/008-fix-pages-deploy/spec.md, specs/008-fix-pages-deploy/plan.md, and specs/008-fix-pages-deploy/quickstart.md
- [x] T020 Run deployment regression tests in tests/unit/publishPages.spec.ts and build validation via package.json scripts

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1) 無依賴，可立即開始
- Foundational (Phase 2) 依賴 Setup 完成，會阻擋所有 user story
- User Stories 依賴 Foundational 完成，之後按 P1 → P2 → P3 執行最穩定
- Polish (Phase 6) 依賴所有目標 user story 完成

### User Story Dependencies

- US1 是 MVP，完成後即可先修正正式站問題
- US2 依賴 US1 的共用發布腳本基礎，但必須獨立驗證 staging 規則
- US3 依賴 US1/US2 已有腳本流程，才能補齊 skipped/error 訊號

### Within Each User Story

- 先寫測試並確認失敗
- 再補腳本邏輯
- 最後更新 workflow 整合點

## Parallel Opportunities

- T002、T003 可與 T001 並行
- T005 可與 T004 並行
- 同一個 user story 內標記 `[P]` 的測試任務可並行撰寫
- T017、T018、T019 可在功能完成後並行整理

## Parallel Example: User Story 1

```text
Task: "Add production publish regression tests for root cleanup and dist sync in tests/unit/publishPages.spec.ts"
Task: "Add negative-ownership regression proving source repo files never remain publishable in tests/unit/publishPages.spec.ts"
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. 完成 Setup 與 Foundational
2. 完成 US1 測試與 production 發布修正
3. 先驗證正式站問題已被修正

### Incremental Delivery

1. 修好 production 根目錄發布
2. 補上 staging 分流與首次部署保護
3. 補強 skipped/error 訊號
4. 最後同步文件與驗證

## Notes

- `[P]` tasks 代表可以平行處理，但同一檔案的實作變更仍需依序整合
- 所有文件回寫必須保持繁體中文
- `src/app`、`src/modules/*`、既有產品畫面皆屬負向範圍，不應因本功能被改動
