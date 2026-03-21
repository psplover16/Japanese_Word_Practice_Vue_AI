# Tasks: 日語學習 PWA

**Input**: 設計文件來自 `/specs/001-japanese-pwa-study/`  
**Prerequisites**: plan.md（必要）、spec.md（必要）、research.md、data-model.md、contracts/  

**Tests**: 本功能明確要求可驗證的互動、離線、更新、效能與本機儲存行為，因此任務清單包含單元、元件、整合、E2E 與效能驗證任務。  

**Organization**: 任務依 user story 分組，確保每個故事都能獨立完成、獨立驗證與增量交付。  

**Constitution Alignment**: 規格、計畫、quickstart 與使用者可見文案需使用繁體中文（zh-TW）；`.gitignore` 需持續排除 `node_modules/`、`build/`、`dist/`、`coverage/` 與其他可重新生成檔案。  

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可平行處理（不同檔案、沒有未完成依賴）
- **[Story]**: 僅用於 user story phase，格式為 `[US1]`、`[US2]`、`[US3]`
- 每條任務都包含明確檔案路徑
- 單一任務盡量只涵蓋 1 到 3 個功能

## Path Conventions

- 前端原始碼位於 `src/`
- 測試位於 `tests/`
- 功能文件位於 `specs/001-japanese-pwa-study/`

## Phase 1: Setup（Shared Infrastructure）

**Purpose**: 建立 Vue 3 + TypeScript + Vite + Tailwind + PWA 的基礎專案骨架與開發腳本

- [ ] T001 初始化前端專案依賴與腳本於 `package.json`
- [ ] T002 [P] 建立 TypeScript 設定與 `@` alias 於 `tsconfig.json`, `tsconfig.app.json`
- [ ] T003 [P] 建立 Vite 基礎設定與 `publicDir` 骨架於 `vite.config.ts`
- [ ] T004 [P] 建立 Tailwind 與 PostCSS 設定於 `tailwind.config.ts`, `postcss.config.js`
- [ ] T005 [P] 建立全域樣式入口於 `src/styles/main.css`
- [ ] T006 [P] 建立 ESLint 與型別檢查腳本於 `eslint.config.js`, `package.json`
- [ ] T007 [P] 驗證並補強版本控制忽略規則於 `.gitignore`
- [ ] T008 [P] 建立測試腳本與基礎設定於 `vitest.config.ts`, `playwright.config.ts`, `tests/`

---

## Phase 2: Foundational（Blocking Prerequisites）

**Purpose**: 建立所有故事都依賴的應用骨架、型別、資料檔、共享狀態與本機儲存服務

**⚠️ CRITICAL**: 所有 user story 開始前必須完成本階段

- [ ] T009 建立應用啟動入口於 `src/app/main.ts`
- [ ] T010 建立路由設定於 `src/app/router.ts`
- [ ] T011 建立全站骨架於 `src/app/AppShell.vue`
- [ ] T012 [P] 建立頁首元件於 `src/shared/components/AppHeader.vue`
- [ ] T013 [P] 建立路由切換元件於 `src/shared/components/RouteTabs.vue`
- [ ] T014 [P] 建立共用按鈕元件於 `src/shared/components/BaseButton.vue`
- [ ] T015 [P] 建立共用輸入元件於 `src/shared/components/BaseInput.vue`
- [ ] T016 [P] 建立共用提示元件於 `src/shared/components/ToastBanner.vue`
- [ ] T017 [P] 建立假名主表資料於 `src/modules/practice/data/kanaGrid.json`
- [ ] T018 [P] 建立撥音與促音資料於 `src/modules/practice/data/hatsuonSection.json`, `src/modules/practice/data/sokuonSection.json`
- [ ] T019 [P] 建立拗音與外來語資料於 `src/modules/practice/data/yoonSections.json`
- [ ] T020 [P] 建立長音與特殊音節資料於 `src/modules/practice/data/choonRules.json`, `src/modules/practice/data/specialSyllables.json`
- [ ] T021 [P] 建立假名與教學區塊型別於 `src/modules/practice/types/kana.ts`
- [ ] T022 [P] 建立測驗型別於 `src/modules/exam/types/exam.ts`
- [ ] T023 [P] 建立 PWA 型別與 storage 型別於 `src/modules/pwa/types/pwa.ts`, `src/shared/types/storage.ts`
- [ ] T024 建立共享勾選 store 於 `src/modules/practice/composables/usePracticeSession.ts`
- [ ] T025 [P] 建立最新測驗結果 storage service 於 `src/modules/exam/storage/latestUnknownResultStorage.ts`
- [ ] T026 [P] 建立 PWA 更新旗標 storage service 於 `src/modules/pwa/services/pwaUpdateStorage.ts`
- [ ] T027 [P] 建立 PWA 生命周期服務於 `src/modules/pwa/services/pwaLifecycleService.ts`
- [ ] T028 [P] 建立 PWA composable 於 `src/modules/pwa/composables/usePwaLifecycle.ts`
- [ ] T029 [P] 建立題數計算工具於 `src/shared/utils/questionCount.ts`
- [ ] T030 [P] 建立抽題洗牌工具於 `src/shared/utils/questionDeck.ts`
- [ ] T031 [P] 建立 storage 防呆工具於 `src/shared/utils/storageGuard.ts`
- [ ] T032 [P] 建立效能量測 helper 於 `src/shared/utils/performanceBudget.ts`
- [ ] T033 [P] 建立共享狀態與 storage 單元測試於 `tests/unit/usePracticeSession.spec.ts`, `tests/unit/latestUnknownResultStorage.spec.ts`, `tests/unit/pwaUpdateStorage.spec.ts`

**Checkpoint**: 應用骨架、共享狀態、PWA 基礎服務、靜態資料與共用元件都已就緒，user story 可開始實作

---

## Phase 3: User Story 1 - 離線學習入口與三頁導航（Priority: P1） 🎯 MVP

**Goal**: 使用者能安裝與開啟 PWA、在離線狀態使用三個頁面，並在離線就緒與更新可用時看到對應提示  

**Independent Test**: 成功建置後，首次載入可看到離線可用提示；切換離線後仍可開啟三個頁面；頁首會依路由顯示 `50音`、`變化規則`、`單字練習` 且標題列不斷行；網站 favicon 與 manifest icon 均來自指定資產；偵測更新時會顯示 5 秒提示，未確認則下次啟動自動套用

### Tests for User Story 1

- [ ] T034 [P] [US1] 建立 PWA 生命周期單元測試於 `tests/unit/pwaLifecycleService.spec.ts`
- [ ] T035 [P] [US1] 建立 PWA 離線與更新 E2E 測試於 `tests/e2e/pwaOffline.spec.ts`
- [ ] T036 [P] [US1] 建立路由切換效能驗證於 `tests/e2e/navigationPerformance.spec.ts`
- [ ] T037 [P] [US1] 驗證 favicon 與 manifest icon 使用指定資產於 `tests/e2e/pwaAsset.spec.ts`

### Implementation for User Story 1

- [ ] T038 [US1] 設定 PWA manifest 與 service worker 於 `vite.config.ts`
- [ ] T039 [US1] 整合網站 favicon 與 PWA icon 資產於 `vite.config.ts`, `index.html`
- [ ] T040 [US1] 實作 AppShell 固定容器、路由標題映射與不可斷行頁首於 `src/app/AppShell.vue`
- [ ] T041 [US1] 實作路由切換按鈕群樣式與互動於 `src/shared/components/RouteTabs.vue`
- [ ] T042 [US1] 實作字母練習頁基礎骨架於 `src/modules/practice/views/PracticeView.vue`
- [ ] T043 [US1] 實作變化規則頁基礎骨架於 `src/modules/grammar/views/GrammarView.vue`
- [ ] T044 [US1] 實作單字練習頁基礎骨架於 `src/modules/vocabulary/views/VocabularyView.vue`
- [ ] T045 [US1] 實作「已可離線使用」提示流程於 `src/modules/pwa/composables/usePwaLifecycle.ts`, `src/shared/components/ToastBanner.vue`
- [ ] T046 [US1] 實作 5 秒更新提示與立即更新流程於 `src/modules/pwa/services/pwaLifecycleService.ts`
- [ ] T047 [US1] 實作下次啟動自動套用流程於 `src/modules/pwa/services/pwaLifecycleService.ts`, `src/modules/pwa/services/pwaUpdateStorage.ts`
- [ ] T048 [US1] 實作更新後快取清理且保留 `localStorage` 於 `src/modules/pwa/services/pwaLifecycleService.ts`

**Checkpoint**: 使用者已能安裝 / 開啟 PWA、看到三頁骨架、在離線狀態重新進入應用，並完成更新提示流程

---

## Phase 4: User Story 2 - 字母練習與跨頁共享狀態（Priority: P1）

**Goal**: 使用者能在字母練習頁選擇清音 / 濁音、控制題目範圍、查看獨立教學區塊，且第二與第三頁只能透過只讀介面讀取共享狀態  

**Independent Test**: 第一頁勾選字母、切換路由再返回時狀態保持；重新整理後回預設；第二與第三頁只能透過 readonly shared summary 顯示摘要；古語假名開關與其餘 7 個教學區塊都能獨立驗收；JSON 缺資料時有可驗證的 fallback 行為

### Tests for User Story 2

- [ ] T049 [P] [US2] 建立字母勾選與題數計算單元測試於 `tests/unit/usePracticeSession.spec.ts`
- [ ] T050 [P] [US2] 建立字母練習頁互動元件測試於 `tests/component/PracticeView.spec.ts`
- [ ] T051 [P] [US2] 建立跨路由共享狀態與唯讀限制整合測試於 `tests/integration/routeState.spec.ts`
- [ ] T052 [P] [US2] 建立古語假名開關獨立驗收測試於 `tests/component/ArchaicKanaToggleSection.spec.ts`
- [ ] T053 [P] [US2] 建立撥音與促音區塊獨立驗收測試於 `tests/component/HatsuonAndSokuonSections.spec.ts`
- [ ] T054 [P] [US2] 建立清音拗音與合拗音區塊獨立驗收測試於 `tests/component/YoonSections.spec.ts`
- [ ] T055 [P] [US2] 建立外來語擴張、長音規則與特殊音節獨立驗收測試於 `tests/component/ExtendedSections.spec.ts`
- [ ] T056 [P] [US2] 建立教學區塊 JSON 缺資料 fallback 測試於 `tests/component/InstructionSectionFallback.spec.ts`

### Implementation for User Story 2

- [ ] T057 [US2] 建立共享狀態 readonly facade / selector 介面於 `src/modules/practice/composables/usePracticeSession.ts`
- [ ] T058 [US2] 實作題數重算與批次切換邏輯於 `src/modules/practice/composables/usePracticeSession.ts`
- [ ] T059 [US2] 實作題目字體範圍切換與全選控制於 `src/modules/practice/composables/usePracticeSession.ts`
- [ ] T060 [US2] 建立字母練習工具列元件於 `src/modules/practice/components/PracticeToolbar.vue`
- [ ] T061 [US2] 建立清音表格元件於 `src/modules/practice/components/SeionTable.vue`
- [ ] T062 [US2] 建立濁音／半濁音表格元件於 `src/modules/practice/components/DakuonTable.vue`
- [ ] T063 [US2] 建立古語假名開關元件於 `src/modules/practice/components/ArchaicKanaToggleSection.vue`
- [ ] T064 [US2] 建立撥音區塊元件於 `src/modules/practice/components/HatsuonSection.vue`
- [ ] T065 [US2] 建立促音區塊元件於 `src/modules/practice/components/SokuonSection.vue`
- [ ] T066 [US2] 建立清音拗音區塊元件於 `src/modules/practice/components/SeionYoonSection.vue`
- [ ] T067 [US2] 建立合拗音區塊元件於 `src/modules/practice/components/GouYoonSection.vue`
- [ ] T068 [US2] 建立外來語擴張區塊元件於 `src/modules/practice/components/LoanwordExtensionSection.vue`
- [ ] T069 [US2] 建立長音規則區塊元件於 `src/modules/practice/components/ChoonRuleSection.vue`
- [ ] T070 [US2] 建立特殊音節區塊元件於 `src/modules/practice/components/SpecialSyllableSection.vue`
- [ ] T071 [US2] 組裝字母練習頁的表格與工具列於 `src/modules/practice/views/PracticeView.vue`
- [ ] T072 [US2] 組裝字母練習頁的獨立教學區塊於 `src/modules/practice/views/PracticeView.vue`
- [ ] T073 [US2] 在變化規則頁使用 readonly shared summary 介面於 `src/modules/grammar/views/GrammarView.vue`
- [ ] T074 [US2] 在單字練習頁使用 readonly shared summary 介面於 `src/modules/vocabulary/views/VocabularyView.vue`

**Checkpoint**: 字母練習頁完整可用，跨路由共享狀態與題數同步符合規格，第二與第三頁的只讀限制可被驗證，古語假名開關與 7 個教學區塊都可獨立驗收

---

## Phase 5: User Story 3 - 測驗流程與不熟音節結算（Priority: P1）

**Goal**: 使用者能根據目前選字開始測驗、逐題揭曉、標記「我不清楚」、使用確認流程中止或清除結果，並在結束後看到最近一次結算區  

**Independent Test**: 題數與勾選驗證正確；modal 可逐題揭曉與切換；未知音節會被累計且只在同題記錄一次；關閉確認與清除確認流程正確；結果寫入 `localStorage`；壞資料會自動清除

### Tests for User Story 3

- [ ] T075 [P] [US3] 建立抽題與未知音節累計單元測試於 `tests/unit/useExamSession.spec.ts`
- [ ] T076 [P] [US3] 建立 modal 流程整合測試於 `tests/integration/examFlow.spec.ts`
- [ ] T077 [P] [US3] 建立結果保存與壞資料清除測試於 `tests/unit/latestUnknownResultStorage.spec.ts`, `tests/e2e/examPersistence.spec.ts`
- [ ] T078 [P] [US3] 建立確認流程測試於 `tests/integration/confirmActions.spec.ts`
- [ ] T079 [P] [US3] 建立 modal 更新效能驗證於 `tests/e2e/examPerformance.spec.ts`

### Implementation for User Story 3

- [ ] T080 [US3] 實作抽題與輪次洗牌邏輯於 `src/modules/exam/composables/useExamSession.ts`
- [ ] T081 [US3] 實作未知音節累計邏輯於 `src/modules/exam/composables/useExamSession.ts`
- [ ] T082 [US3] 建立確認對話元件於 `src/modules/exam/components/ConfirmActionDialog.vue`
- [ ] T083 [US3] 建立測驗 modal 外框與題目區於 `src/modules/exam/components/ExamModal.vue`
- [ ] T084 [US3] 實作 modal 內「下一步」與「我不清楚」流程於 `src/modules/exam/components/ExamModal.vue`
- [ ] T085 [US3] 實作 modal 關閉確認流程於 `src/modules/exam/components/ExamModal.vue`, `src/modules/exam/components/ConfirmActionDialog.vue`
- [ ] T086 [US3] 建立不熟音節結算元件於 `src/modules/exam/components/UnknownResultPanel.vue`
- [ ] T087 [US3] 實作最近一次結果覆蓋保存與壞資料自動清除於 `src/modules/exam/storage/latestUnknownResultStorage.ts`
- [ ] T088 [US3] 實作送出操作與測驗啟動整合於 `src/modules/practice/components/PracticeToolbar.vue`, `src/modules/practice/views/PracticeView.vue`
- [ ] T089 [US3] 實作重置操作整合於 `src/modules/practice/components/PracticeToolbar.vue`
- [ ] T090 [US3] 實作清除結果確認流程於 `src/modules/practice/components/PracticeToolbar.vue`, `src/modules/exam/components/ConfirmActionDialog.vue`
- [ ] T091 [US3] 實作結算區 smooth scroll 與結果回填於 `src/modules/exam/components/UnknownResultPanel.vue`, `src/modules/practice/views/PracticeView.vue`

**Checkpoint**: 完整測驗流程、確認流程、結果結算、本機保存與壞資料防呆都可獨立運作

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 整理跨故事一致性、響應式、效能驗證、文件與最終驗收

- [ ] T092 [P] 調整手機與桌機響應式細節於 `src/app/AppShell.vue`, `src/modules/practice/views/PracticeView.vue`, `src/modules/exam/components/ExamModal.vue`
- [ ] T093 [P] 補齊 Font Awesome 圖示整合於 `src/app/main.ts`, `src/styles/main.css`
- [ ] T094 [P] 補強無障礙與鍵盤操作細節於 `src/modules/practice/components/*.vue`, `src/modules/exam/components/*.vue`
- [ ] T095 進行重構與重複邏輯收斂於 `src/modules/practice/composables/usePracticeSession.ts`, `src/modules/exam/composables/useExamSession.ts`, `src/shared/utils/*.ts`
- [ ] T096 [P] 執行並修正 lint、typecheck、unit/component/integration/e2e 測試於 `package.json`, `tests/`
- [ ] T097 [P] 執行 Lighthouse 與效能預算驗證於 `specs/001-japanese-pwa-study/quickstart.md`, `tests/e2e/navigationPerformance.spec.ts`, `tests/e2e/examPerformance.spec.ts`
- [ ] T098 [P] 重新檢查 `.gitignore` 與 PWA 快取清理策略於 `.gitignore`, `src/modules/pwa/services/pwaLifecycleService.ts`
- [ ] T099 執行 quickstart 驗證並回寫必要調整於 `specs/001-japanese-pwa-study/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup（Phase 1）**：可立即開始
- **Foundational（Phase 2）**：依賴 Setup 完成，阻擋全部 user stories
- **User Stories（Phase 3-5）**：全部依賴 Foundational 完成
- **Polish（Phase 6）**：依賴所有目標故事完成

### User Story Dependencies

- **US1**：完成 Foundational 後即可開始；提供 app shell、PWA 與三頁骨架
- **US2**：完成 Foundational 後即可開始；依賴共享狀態、假名資料與基礎頁面骨架
- **US3**：完成 Foundational 後即可開始，但建議在 US2 主要 UI 可用後整合，以降低衝突

### Within Each User Story

- 先寫測試，再寫 composable / service
- 再寫 UI 元件與頁面整合
- 最後補回歸驗證、確認流程與性能量測

### Parallel Opportunities

- Setup 中的型別、樣式、ESLint、測試設定可平行
- Foundational 中的資料檔、型別、storage service、PWA service 可平行
- US2 的教學區塊元件可大量平行，因為已拆成獨立功能單元
- US3 的 modal、結果面板、確認對話與 storage 可平行

---

## Parallel Example: User Story 2

```bash
# 可同時開始的測試
Task: "T049 [US2] 建立字母勾選與題數計算單元測試於 tests/unit/usePracticeSession.spec.ts"
Task: "T050 [US2] 建立字母練習頁互動元件測試於 tests/component/PracticeView.spec.ts"
Task: "T052 [US2] 建立古語假名開關獨立驗收測試於 tests/component/ArchaicKanaToggleSection.spec.ts"

# 可同時開始的獨立教學區塊
Task: "T063 [US2] 建立古語假名開關元件於 src/modules/practice/components/ArchaicKanaToggleSection.vue"
Task: "T064 [US2] 建立撥音區塊元件於 src/modules/practice/components/HatsuonSection.vue"
Task: "T065 [US2] 建立促音區塊元件於 src/modules/practice/components/SokuonSection.vue"
Task: "T066 [US2] 建立清音拗音區塊元件於 src/modules/practice/components/SeionYoonSection.vue"
Task: "T067 [US2] 建立合拗音區塊元件於 src/modules/practice/components/GouYoonSection.vue"
Task: "T068 [US2] 建立外來語擴張區塊元件於 src/modules/practice/components/LoanwordExtensionSection.vue"
Task: "T069 [US2] 建立長音規則區塊元件於 src/modules/practice/components/ChoonRuleSection.vue"
Task: "T070 [US2] 建立特殊音節區塊元件於 src/modules/practice/components/SpecialSyllableSection.vue"
```

---

## Implementation Strategy

### MVP First（先交付 User Story 1）

1. 完成 Phase 1: Setup
2. 完成 Phase 2: Foundational
3. 完成 Phase 3: US1
4. 驗證 PWA 離線、更新提示、圖示資產與三頁導航
5. 再進入 US2 / US3

### Incremental Delivery

1. 先交付可安裝、可離線、可切頁的 PWA 外殼
2. 再交付完整字母練習、跨頁共享狀態與獨立教學區塊
3. 最後交付測驗 modal、確認流程、結果保存與效能驗證

### Suggested MVP Scope

- 最小可展示範圍為 **US1**
- 最小可學習範圍為 **US1 + US2**
- 最小完整學習循環為 **US1 + US2 + US3**

---

## Notes

- `[P]` 任務表示不同檔案且無未完成依賴，可平行處理
- 每個 user story 都有獨立測試標準，可單獨驗證
- 本版任務已依你的要求切細，單一任務盡量不跨超過 3 個功能
- 古語假名開關與 7 個教學區塊都已拆成獨立任務，方便獨立驗收
- `tasks.md` 已可直接作為 `/speckit.implement` 的依據
