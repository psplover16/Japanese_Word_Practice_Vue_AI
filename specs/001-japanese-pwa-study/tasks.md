# Tasks: 日語學習 PWA

**Input**: Design documents from `/specs/001-japanese-pwa-study/`  
**Prerequisites**: plan.md、spec.md、research.md、data-model.md、contracts/

## Phase 1: Setup

- [x] T001 建立 Vue 3 + TypeScript + Vite 專案骨架與 `package.json`、`tsconfig*.json`、`vite.config.ts`
- [x] T002 [P] 建立 Tailwind、PostCSS、ESLint、Vitest 基本設定於 `tailwind.config.ts`、`postcss.config.js`、`eslint.config.js`、`vitest.config.ts`
- [x] T003 [P] 建立與驗證 `.gitignore`，確認 `node_modules/`、`dist/`、`build/`、`coverage/` 皆被忽略
- [x] T004 [P] 分開處理 favicon 與 manifest icons 設定於 `index.html`、`vite.config.ts`
- [x] T005 建立 app entry、全域樣式與最外層固定容器於 `src/app/main.ts`、`src/app/AppShell.vue`、`src/styles/main.css`

## Phase 2: Foundational

- [x] T006 建立共享型別與靜態資料於 `src/modules/practice/types/practice.ts`、`src/modules/practice/data/*.ts`
- [x] T007 [P] 建立 shared utilities 與 localStorage guard 於 `src/shared/utils/*.ts`
- [x] T008 建立共享勾選狀態 composable 於 `src/modules/practice/composables/usePracticeSession.ts`
- [x] T009 [P] 建立最近一次結算 storage 與 exam 型別於 `src/modules/exam/storage/latestUnknownResultStorage.ts`、`src/modules/exam/types/exam.ts`
- [x] T010 [P] 建立 PWA 型別與 lifecycle service 於 `src/modules/pwa/types/pwa.ts`、`src/modules/pwa/services/pwaLifecycleService.ts`
- [x] T011 建立路由與 route titles 於 `src/app/router.ts`

## Phase 3: User Story 1 - 字母練習與考試流程 (P1)

**Goal**: 完成第一頁勾選、教學表格、考試 modal 與結算流程。  
**Independent Test**: 在 `/practice` 完成勾選、送出、答題、關閉、結算、清除結果，不依賴其他路由。

- [x] T012 [P] [US1] 建立基礎共用元件於 `src/shared/components/*.vue`
- [x] T013 [P] [US1] 建立 `tableA`、`tableB` 元件於 `src/modules/practice/components/SeionTable.vue`、`src/modules/practice/components/DakuonTable.vue`
- [x] T014 [P] [US1] 建立教學區塊元件於 `src/modules/practice/components/HatsuonSection.vue`、`src/modules/practice/components/SokuonSection.vue`、`src/modules/practice/components/YoonSection.vue`、`src/modules/practice/components/ChoonRuleSection.vue`
- [x] T015 [US1] 建立 `checkboxGroupA` 與題數邏輯於 `src/modules/practice/components/PracticeToolbar.vue`
- [x] T016 [US1] 建立考試 session composable 於 `src/modules/exam/composables/useExamSession.ts`
- [x] T017 [US1] 建立 modal 與結算區元件於 `src/modules/exam/components/ExamModal.vue`、`src/modules/exam/components/UnknownResultPanel.vue`
- [x] T018 [US1] 組合第一頁 view 並接上 smooth scroll 結算流程於 `src/modules/practice/views/PracticeView.vue`
- [x] T019 [P] [US1] 撰寫 `usePracticeSession` 與 `useExamSession` 單元測試於 `tests/unit/usePracticeSession.spec.ts`、`tests/unit/useExamSession.spec.ts`
- [x] T020 [P] [US1] 撰寫最近一次結算 storage 測試於 `tests/unit/latestUnknownResultStorage.spec.ts`
- [x] T021 [P] [US1] 撰寫第一頁 render-safe smoke test 與 modal component test 於 `tests/component/PracticeViewSmoke.spec.ts`、`tests/component/ExamModal.spec.ts`
- [x] T022 [P] [US1] 驗證第一頁不顯示共享明細 panel 的 negative-ownership 測試於 `tests/component/PracticeRouteOwnership.spec.ts`

## Phase 4: User Story 2 - 跨路由閱讀共享勾選明細 (P2)

**Goal**: 第二頁與第三頁正確顯示第一頁勾選結果明細，且第一頁不得出現該 panel。  
**Independent Test**: 勾選任意假名後，`/grammar` 與 `/vocabulary` 顯示完整文字，`/practice` 不顯示 panel。

- [x] T023 [P] [US2] 建立共享明細 panel 於 `src/modules/practice/components/SelectionDetailPanel.vue`
- [x] T024 [US2] 建立 `/grammar` route view 於 `src/modules/grammar/views/GrammarView.vue`
- [x] T025 [US2] 建立 `/vocabulary` route view 於 `src/modules/vocabulary/views/VocabularyView.vue`
- [x] T026 [P] [US2] 撰寫共享明細正向顯示測試於 `tests/component/SelectionDetailPanel.spec.ts`
- [x] T027 [P] [US2] 撰寫 route ownership 測試，驗證 panel 只出現在第二頁與第三頁於 `tests/component/RouteOwnership.spec.ts`

## Phase 5: User Story 3 - 可離線使用且可更新的 PWA 體驗 (P3)

**Goal**: 完成 PWA 安裝、離線支援與受條件限制的更新提示。  
**Independent Test**: build 後可安裝為 PWA，mock 新版本時可驗證提示條件與更新邏輯。

- [x] T028 [US3] 建立 `usePwaLifecycle` 並整合到底層 app shell 於 `src/modules/pwa/composables/usePwaLifecycle.ts`、`src/app/AppShell.vue`
- [x] T029 [P] [US3] 撰寫 PWA lifecycle service 測試與 mock register 於 `tests/unit/pwaLifecycleService.spec.ts`、`tests/mocks/pwaRegisterMock.ts`
- [x] T030 [P] [US3] 撰寫 AppShell route smoke test 與 PWA toast 顯示測試於 `tests/component/AppShellSmoke.spec.ts`

## Phase 6: Polish

- [x] T031 [P] 建立測試初始化檔案與 render-safe 共用設定於 `tests/setup.ts`
- [x] T032 [P] 依 contract 檢查固定格表 / 內容撐寬表邊界於 `src/styles/main.css` 與相關 component
- [x] T033 [P] 執行並修正 `npm run lint`、`npm run typecheck`、`npm run test`
- [x] T034 [P] 執行並修正 `npm run build`
- [x] T035 [P] 更新 `quickstart.md` 驗證步驟與 tasks 完成狀態
