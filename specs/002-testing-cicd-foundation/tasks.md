# Tasks: 測試與自動交付基礎建設

**Input**: Design documents from `/specs/002-testing-cicd-foundation/`  
**Prerequisites**: plan.md、spec.md、research.md、data-model.md、contracts/

## Phase 1: Setup

- [x] T001 更新 `package.json` 與 `.gitignore`，補齊 `test:unit`、`test:e2e`、`test:ci` scripts 與 Playwright 產物忽略規則
- [x] T002 [P] 建立 Playwright 基本設定於 `playwright.config.ts`
- [x] T003 [P] 建立 GitHub workflow 與部署腳本目錄骨架於 `.github/workflows/`、`scripts/`

## Phase 2: Foundational

- [x] T004 更新 `vite.config.ts` 與 `src/app/router.ts`，讓 build base path、PWA `start_url` 與 router history 可依環境切換
- [x] T005 [P] 補齊 e2e 穩定 selector 於 `src/app/AppShell.vue`、`src/modules/practice/components/PracticeToolbar.vue`、`src/modules/exam/components/ExamModal.vue`
- [x] T006 [P] 建立 e2e 測試共用設定或 helper 於 `tests/e2e/`

## Phase 3: User Story 1 - 建立可重複執行的測試基線 (P1)

**Goal**: 讓開發者可在本地穩定執行 unit、build、e2e。  
**Independent Test**: `npm run test:unit`、`npm run build`、`npm run test:e2e` 可在本地完成，且至少涵蓋 smoke 與核心流程。

- [x] T007 [P] [US1] 撰寫純工具模組單元測試於 `tests/unit/questionDeck.spec.ts`
- [x] T008 [P] [US1] 撰寫 app shell smoke e2e 與 practice exam flow e2e 於 `tests/e2e/app-shell.smoke.spec.ts`、`tests/e2e/practice-exam-flow.spec.ts`
- [x] T009 [US1] 串接 Playwright、本地 web server 與必要 UI selector，讓 e2e 可實際通過於 `playwright.config.ts`、相關 Vue 元件與 `tests/e2e/*.ts`

## Phase 4: User Story 2 - 在審查流程中自動阻擋回歸 (P2)

**Goal**: 在 pull request 與 push 階段自動執行完整檢查。  
**Independent Test**: 檢視 `.github/workflows/ci.yml` 可確認 install、lint、typecheck、unit、build、e2e 與 artifact upload 順序完整。

- [x] T010 [US2] 建立 GitHub Actions CI workflow 於 `.github/workflows/ci.yml`
- [x] T011 [US2] 補齊 CI 失敗診斷 artifact 與快取設定於 `.github/workflows/ci.yml`

## Phase 5: User Story 3 - 依分支自動部署到對應環境 (P3)

**Goal**: 讓 `dev` 與 `main` 可自動部署到 staging / production。  
**Independent Test**: 檢視 `.github/workflows/cd.yml` 與 `scripts/publishPages.mjs` 可確認 branch mapping、Pages path mapping 與失敗行為明確。

- [x] T012 [P] [US3] 建立 GitHub Pages 發佈腳本於 `scripts/publishPages.mjs`
- [x] T013 [US3] 建立 GitHub Actions CD workflow 於 `.github/workflows/cd.yml`
- [x] T014 [US3] 補齊 staging / production environment 與 Pages 啟用說明於 `README.md`

## Phase 6: Polish

- [x] T015 [P] 補齊 README 測試、CI/CD、排查與 GitHub Pages 設定說明於 `README.md`
- [x] T016 [P] 執行並修正 `npm run lint`、`npm run typecheck`、`npm run test:unit`、`npm run build`
- [x] T017 [P] 執行並修正 `npm run test:e2e`
- [x] T018 更新 `specs/002-testing-cicd-foundation/tasks.md` 完成狀態並驗證 `quickstart.md`

## Dependencies & Execution Order

- Phase 1 完成後才能進入 Phase 2。
- Phase 2 完成後，US1、US2、US3 可按優先序推進；其中 US2 依賴 US1 的 scripts 與 Playwright 設定，US3 依賴 Phase 2 的 base path 設計。
- Polish 階段依賴所有故事完成。

## Parallel Opportunities

- `T002` 與 `T003` 可平行。
- `T005` 與 `T006` 可平行。
- `T007` 與 `T008` 可平行。
- `T012` 與 `T014` 可在 CD workflow 整體方向確定後交錯進行。

## Implementation Strategy

1. 先建立本地可跑的測試與 e2e 基線。
2. 再把同一套指令搬進 CI，讓 PR gate 成立。
3. 最後接上 GitHub Pages CD 與 README，完成交付閉環。
