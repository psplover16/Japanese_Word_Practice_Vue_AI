# Tasks: 日語學習 PWA

**Input**: 設計文件來自 `/specs/001-japanese-pwa-study/`  
**Prerequisites**: plan.md（必要）、spec.md（必要）、research.md、data-model.md、contracts/  

**Tests**: 本功能已明確要求可驗證的互動、離線、更新與本機儲存行為，因此任務清單包含單元、元件、整合與 E2E 測試。  

**Organization**: 任務依 user story 分組，確保每個故事都能獨立完成、獨立驗證與增量交付。

**Constitution Alignment**: 規格、計畫、quickstart 與使用者可見文案需使用繁體中文（zh-TW）；`.gitignore` 需持續排除 `node_modules/`、`build/`、`dist/`、`coverage/` 與其他可重新生成檔案。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可平行處理（不同檔案、沒有未完成依賴）
- **[Story]**: 僅用於 user story phase，格式為 `[US1]`、`[US2]`、`[US3]`
- 每條任務都必須包含明確檔案路徑

## Path Conventions

- 前端原始碼位於 `src/`
- 測試位於 `tests/`
- 功能文件位於 `specs/001-japanese-pwa-study/`

## Phase 1: Setup（Shared Infrastructure）

**Purpose**: 建立 Vue 3 + TypeScript + Vite + Tailwind + PWA 的基礎專案骨架與開發腳本

- [ ] T001 初始化前端專案依賴與腳本於 `package.json`
- [ ] T002 [P] 建立 TypeScript 設定與 `@` alias 於 `tsconfig.json`, `tsconfig.app.json`, `vite.config.ts`
- [ ] T003 [P] 建立 Tailwind 與 PostCSS 設定於 `tailwind.config.ts`, `postcss.config.js`, `src/styles/main.css`
- [ ] T004 [P] 建立 ESLint 與型別檢查腳本於 `eslint.config.js`, `package.json`
- [ ] T005 [P] 驗證並補強版本控制忽略規則於 `.gitignore`
- [ ] T006 [P] 建立測試腳本與基礎設定於 `vitest.config.ts`, `playwright.config.ts`, `tests/`

---

## Phase 2: Foundational（Blocking Prerequisites）

**Purpose**: 建立所有故事都依賴的應用骨架、靜態資料、共享狀態與本機儲存服務

**⚠️ CRITICAL**: 所有 user story 開始前必須完成本階段

- [ ] T007 建立應用啟動與路由骨架於 `src/app/main.ts`, `src/app/router.ts`, `src/app/AppShell.vue`
- [ ] T008 [P] 建立共用版型元件於 `src/shared/components/AppHeader.vue`, `src/shared/components/RouteTabs.vue`
- [ ] T009 [P] 建立字母與規則靜態資料檔於 `src/modules/practice/data/kanaGrid.json`, `src/modules/practice/data/phoneticRules.json`, `src/modules/practice/data/exampleWords.json`
- [ ] T010 [P] 建立核心型別定義於 `src/modules/practice/types/kana.ts`, `src/modules/exam/types/exam.ts`, `src/modules/pwa/types/pwa.ts`, `src/shared/types/storage.ts`
- [ ] T011 建立跨路由共享的練習 session store 於 `src/modules/practice/composables/usePracticeSession.ts`
- [ ] T012 [P] 建立最新測驗結果 storage service 於 `src/modules/exam/storage/latestUnknownResultStorage.ts`
- [ ] T013 [P] 建立 PWA 更新旗標與版本 storage service 於 `src/modules/pwa/services/pwaUpdateStorage.ts`
- [ ] T014 [P] 建立 PWA 生命周期服務與註冊 composable 於 `src/modules/pwa/services/pwaLifecycleService.ts`, `src/modules/pwa/composables/usePwaLifecycle.ts`
- [ ] T015 [P] 建立共用按鈕、輸入與提示元件於 `src/shared/components/BaseButton.vue`, `src/shared/components/BaseInput.vue`, `src/shared/components/ToastBanner.vue`
- [ ] T016 [P] 建立基礎單元測試以鎖定 shared store 與 storage service 行為於 `tests/unit/usePracticeSession.spec.ts`, `tests/unit/latestUnknownResultStorage.spec.ts`, `tests/unit/pwaUpdateStorage.spec.ts`

**Checkpoint**: 應用骨架、共享狀態、PWA 與本機儲存服務都已就緒，user story 可開始實作

---

## Phase 3: User Story 1 - 離線學習入口與三頁導航（Priority: P1） 🎯 MVP

**Goal**: 使用者能安裝與開啟 PWA、在離線狀態使用三個頁面，並在離線就緒與更新可用時看到對應提示

**Independent Test**: 成功建置後，首次載入可看到安裝 / 離線可用提示；切換離線後仍可開啟三個頁面；偵測更新時會顯示 5 秒提示，未確認則下次啟動自動套用

### Tests for User Story 1

- [ ] T017 [P] [US1] 建立 PWA 離線與更新 E2E 測試於 `tests/e2e/pwaOffline.spec.ts`
- [ ] T018 [P] [US1] 建立 PWA 生命周期單元測試於 `tests/unit/pwaLifecycleService.spec.ts`

### Implementation for User Story 1

- [ ] T019 [US1] 設定 PWA manifest、service worker 與 `publicDir` 資產來源於 `vite.config.ts`
- [ ] T020 [US1] 實作應用頁首、外層固定容器與路由切換按鈕群於 `src/app/AppShell.vue`, `src/shared/components/AppHeader.vue`, `src/shared/components/RouteTabs.vue`
- [ ] T021 [US1] 實作三個路由頁面的基本骨架於 `src/modules/practice/views/PracticeView.vue`, `src/modules/grammar/views/GrammarView.vue`, `src/modules/vocabulary/views/VocabularyView.vue`
- [ ] T022 [US1] 實作「已可離線使用」提示與更新提示 UI 於 `src/shared/components/ToastBanner.vue`, `src/modules/pwa/composables/usePwaLifecycle.ts`
- [ ] T023 [US1] 實作 5 秒更新提示、立即套用與下次啟動自動套用流程於 `src/modules/pwa/services/pwaLifecycleService.ts`, `src/modules/pwa/services/pwaUpdateStorage.ts`
- [ ] T024 [US1] 實作更新後快取清理且保留 `localStorage` 的流程於 `src/modules/pwa/services/pwaLifecycleService.ts`

**Checkpoint**: 使用者已能安裝 / 開啟 PWA、看到三頁骨架、在離線狀態重新進入應用，並完成更新提示流程

---

## Phase 4: User Story 2 - 字母練習與跨頁共享狀態（Priority: P1）

**Goal**: 使用者能在字母練習頁選擇清音 / 濁音、批次控制題目範圍、看到規則說明，且第二與第三頁能只讀取這些狀態

**Independent Test**: 在第一頁勾選字母、切換路由再返回時狀態保持；重新整理後回預設；第二與第三頁只顯示只讀摘要；題數欄位依勾選與題目範圍重新計算

### Tests for User Story 2

- [ ] T025 [P] [US2] 建立字母勾選與題數計算單元測試於 `tests/unit/usePracticeSession.spec.ts`
- [ ] T026 [P] [US2] 建立字母練習頁互動元件測試於 `tests/component/PracticeView.spec.ts`
- [ ] T027 [P] [US2] 建立跨路由共享狀態整合測試於 `tests/integration/routeState.spec.ts`

### Implementation for User Story 2

- [ ] T028 [P] [US2] 實作題數計算、行列批次切換與衍生 selector 於 `src/modules/practice/composables/usePracticeSession.ts`, `src/shared/utils/questionCount.ts`
- [ ] T029 [P] [US2] 建立字母練習工具列元件於 `src/modules/practice/components/PracticeToolbar.vue`
- [ ] T030 [P] [US2] 建立清音表格元件於 `src/modules/practice/components/SeionTable.vue`
- [ ] T031 [P] [US2] 建立濁音／半濁音表格元件於 `src/modules/practice/components/DakuonTable.vue`
- [ ] T032 [P] [US2] 建立發音規則與補充區塊元件於 `src/modules/practice/components/PhoneticRuleSection.vue`
- [ ] T033 [US2] 組裝字母練習頁並接上共享狀態於 `src/modules/practice/views/PracticeView.vue`
- [ ] T034 [US2] 在第二與第三頁實作只讀共享狀態摘要於 `src/modules/grammar/views/GrammarView.vue`, `src/modules/vocabulary/views/VocabularyView.vue`

**Checkpoint**: 字母練習頁完整可用，跨路由共享狀態與題數同步符合規格，第二與第三頁能只讀展示同一份狀態

---

## Phase 5: User Story 3 - 測驗流程與不熟音節結算（Priority: P1）

**Goal**: 使用者能根據目前選字開始測驗、逐題揭曉、標記「我不清楚」，並在結束後看到只保留最近一次的結果結算區

**Independent Test**: 題數與勾選驗證正確；modal 可逐題揭曉與切換；未知音節會被累計且只在同題記錄一次；結果寫入 `localStorage`；壞資料會自動清除

### Tests for User Story 3

- [ ] T035 [P] [US3] 建立抽題與未知音節累計單元測試於 `tests/unit/useExamSession.spec.ts`
- [ ] T036 [P] [US3] 建立 modal 流程整合測試於 `tests/integration/examFlow.spec.ts`
- [ ] T037 [P] [US3] 建立結果保存與壞資料清除測試於 `tests/unit/latestUnknownResultStorage.spec.ts`, `tests/e2e/examPersistence.spec.ts`

### Implementation for User Story 3

- [ ] T038 [P] [US3] 實作測驗題目產生與 session composable 於 `src/modules/exam/composables/useExamSession.ts`
- [ ] T039 [P] [US3] 建立測驗 modal 元件於 `src/modules/exam/components/ExamModal.vue`
- [ ] T040 [P] [US3] 建立不熟音節結算元件於 `src/modules/exam/components/UnknownResultPanel.vue`
- [ ] T041 [US3] 將送出、重置與清除結果操作整合進字母練習頁於 `src/modules/practice/components/PracticeToolbar.vue`, `src/modules/practice/views/PracticeView.vue`
- [ ] T042 [US3] 實作最近一次結果覆蓋保存與壞資料自動清除於 `src/modules/exam/storage/latestUnknownResultStorage.ts`
- [ ] T043 [US3] 實作結算區 smooth scroll 與關閉 modal 後結果回填於 `src/modules/exam/components/UnknownResultPanel.vue`, `src/modules/practice/views/PracticeView.vue`

**Checkpoint**: 完整測驗流程、結果結算、本機保存與壞資料防呆都可獨立運作

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 整理跨故事的一致性、響應式、文件與最終驗證

- [ ] T044 [P] 調整手機 / 桌機響應式與無障礙細節於 `src/app/AppShell.vue`, `src/modules/practice/components/*.vue`, `src/modules/exam/components/*.vue`
- [ ] T045 [P] 補齊 Font Awesome 圖示整合與共用樣式細節於 `src/app/main.ts`, `src/styles/main.css`
- [ ] T046 進行重構與重複邏輯收斂於 `src/modules/practice/composables/usePracticeSession.ts`, `src/modules/exam/composables/useExamSession.ts`, `src/shared/utils/*.ts`
- [ ] T047 [P] 驗證繁體中文文案與規格一致性於 `src/**/*.vue`, `specs/001-japanese-pwa-study/quickstart.md`
- [ ] T048 [P] 執行並修正 lint、typecheck、unit/component/integration/e2e 測試於 `package.json`, `tests/`
- [ ] T049 [P] 重新檢查 `.gitignore` 與 PWA 快取清理策略於 `.gitignore`, `src/modules/pwa/services/pwaLifecycleService.ts`
- [ ] T050 執行 quickstart 驗證並回寫必要調整於 `specs/001-japanese-pwa-study/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup（Phase 1）**：可立即開始
- **Foundational（Phase 2）**：依賴 Setup 完成，阻擋全部 user stories
- **User Stories（Phase 3-5）**：全部依賴 Foundational 完成
- **Polish（Phase 6）**：依賴所有目標故事完成

### User Story Dependencies

- **US1**：完成 Foundational 後即可開始；提供 app shell、PWA 與三頁骨架
- **US2**：完成 Foundational 後即可開始；依賴 app shell 與共享狀態
- **US3**：完成 Foundational 後即可開始，但會整合 US2 的字母選取 UI，因此建議在 US2 主功能完成後接續

### Within Each User Story

- 先寫測試，再寫核心 composable / service
- 再寫 UI 元件與頁面整合
- 最後補回歸驗證與資料持久化防呆

### Parallel Opportunities

- Setup 中的工具鏈、樣式、ESLint、測試設定可平行
- Foundational 中的資料檔、型別、storage service、PWA service 可平行
- US2 的清音表、濁音表、規則區塊元件可平行
- US3 的 modal、結果面板、抽題邏輯與測試可平行

---

## Parallel Example: User Story 2

```bash
# 可同時開始的測試
Task: "T025 [US2] 建立字母勾選與題數計算單元測試於 tests/unit/usePracticeSession.spec.ts"
Task: "T026 [US2] 建立字母練習頁互動元件測試於 tests/component/PracticeView.spec.ts"

# 可同時開始的 UI 元件
Task: "T030 [US2] 建立清音表格元件於 src/modules/practice/components/SeionTable.vue"
Task: "T031 [US2] 建立濁音／半濁音表格元件於 src/modules/practice/components/DakuonTable.vue"
Task: "T032 [US2] 建立發音規則與補充區塊元件於 src/modules/practice/components/PhoneticRuleSection.vue"
```

---

## Implementation Strategy

### MVP First（先交付 User Story 1）

1. 完成 Phase 1: Setup
2. 完成 Phase 2: Foundational
3. 完成 Phase 3: US1
4. 驗證 PWA 離線、更新提示與三頁導航
5. 再進入 US2 / US3

### Incremental Delivery

1. 先交付可安裝、可離線、可切頁的 PWA 外殼
2. 再交付完整字母練習與跨頁共享狀態
3. 最後交付測驗 modal、結果保存與壞資料防呆

### Suggested MVP Scope

- 最小可展示範圍為 **US1**
- 最小可學習範圍為 **US1 + US2**
- 最小完整學習循環為 **US1 + US2 + US3**

---

## Notes

- `[P]` 任務表示不同檔案且無未完成依賴，可平行處理
- 每個 user story 都有獨立測試標準，可單獨驗證
- `tasks.md` 已依檔案路徑明確拆分，後續可直接作為 `/speckit.implement` 依據
