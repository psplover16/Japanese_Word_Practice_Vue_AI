# 專案架構圖

本文件整理目前專案的資料夾結構與用途，重點展開 `src/` 內部檔案。

備註：
- `src/` 的檔案用途，主要依實際引用關係與檔案內容整理。
- `_private/` 依專案規則不展開私人筆記與受限制內容。

## 根目錄架構

```text
Japanese_Word_Practice_Vue_AI/
├─ .agents/ (本地代理技能與輔助資源，提供 AI / agent 工作流程用)
├─ .codex/ (Codex 本地設定與工作資料)
├─ .github/
│  └─ workflows/
│     ├─ ci.yml (CI 驗證流程：lint、typecheck、unit test、build、e2e)
│     └─ cd.yml (CD 部署流程：建置後發佈到 GitHub Pages)
├─ .specify/ (Spec-driven 開發模板、腳本與專案規範記憶)
├─ dist/ (Vite build 後產生的靜態網站輸出)
├─ node_modules/ (npm 安裝的套件)
├─ playwright-report/ (Playwright 測試報告輸出)
├─ scripts/
│  └─ publishPages.mjs (將 dist 發佈到 gh-pages 的部署腳本)
├─ specs/ (功能規格、研究、計畫、任務與契約文件)
├─ src/ (專案核心原始碼：畫面、路由、資料、商業邏輯、共用元件)
├─ test-results/ (Playwright 執行後的原始測試結果)
├─ tests/ (Vitest / Playwright 測試程式)
├─ _private/ (私人資料區；本次未展開受限制內容)
├─ .gitignore (Git 忽略規則)
├─ AGENTS.md (此專案給代理 / 助手的工作規則)
├─ eslint.config.js (ESLint 規則設定)
├─ index.html (前端入口 HTML，載入 `/src/app/main.ts`)
├─ package-lock.json (npm 依賴鎖定檔)
├─ package.json (套件清單與 npm scripts，例如 dev、build、test)
├─ playwright.config.ts (Playwright e2e 設定)
├─ postcss.config.js (PostCSS 設定)
├─ README.md (專案說明與開發指令)
├─ tailwind.config.ts (Tailwind CSS 主題與掃描設定)
├─ tsconfig.app.json (前端 app TypeScript 設定)
├─ tsconfig.json (TypeScript 基礎設定)
├─ tsconfig.node.json (Node / 工具腳本 TypeScript 設定)
├─ vite.config.ts (Vite 建置、alias、PWA 等設定)
└─ vitest.config.ts (Vitest 設定：jsdom、setup、排除 e2e)
```

## src 詳細架構

```text
src/
├─ app/ (應用程式入口層：啟動 Vue、切路由、提供全域殼層)
│  ├─ AppShell.vue (整個網站的外框；建立 PracticeSession、提供 RouterView、頁首、分頁導覽與 PWA Toast)
│  ├─ main.ts (Vue 啟動入口；createApp(AppShell).use(router).mount('#app'))
│  └─ router.ts (路由表；定義 /practice、/grammar、/vocabulary 與頁面標題)
│
├─ assets/ (靜態素材)
│  ├─ hero.png (專案使用的圖片素材)
│  ├─ vue.svg (Vue 預設圖示素材)
│  └─ vite.svg (Vite 預設圖示素材)
│
├─ modules/ (依功能切分的業務模組)
│  ├─ exam/ (測驗流程模組：出題、答題、標記不熟、結果保存)
│  │  ├─ components/
│  │  │  ├─ ExamModal.vue (測驗進行中的彈窗；顯示題目、答案提示、下一題與不熟標記操作)
│  │  │  └─ UnknownResultPanel.vue (顯示最近一次「不熟題目」統計結果的面板)
│  │  ├─ composables/
│  │  │  └─ useExamSession.ts (測驗狀態核心；建立題組、控制目前題目、結算不熟項目、讀寫最近結果)
│  │  ├─ storage/
│  │  │  └─ latestUnknownResultStorage.ts (包裝 localStorage；讀寫最近一次不熟題目結果快照)
│  │  └─ types/
│  │     └─ exam.ts (測驗資料型別定義，例如 StartExamInput、ExamQuestionCard、結果快照)
│  │
│  ├─ grammar/ (文法頁模組)
│  │  └─ views/
│  │     └─ GrammarView.vue (文法頁畫面；承接共用練習狀態並顯示對應內容)
│  │
│  ├─ practice/ (主練習頁模組：假名選擇、練習設定、規則說明)
│  │  ├─ components/
│  │  │  ├─ ChoonRuleSection.vue (長音規則說明區塊)
│  │  │  ├─ DakuonTable.vue (濁音 / 半濁音表格)
│  │  │  ├─ DakuonYoonSection.vue (濁音拗音示例區塊)
│  │  │  ├─ HatsuonSection.vue (撥音規則說明區塊)
│  │  │  ├─ LoanwordSection.vue (外來語 / 特殊拼寫示例區塊)
│  │  │  ├─ PracticeToolbar.vue (練習頁控制列；切換平假名/片假名、全選、題數、開始測驗、重設)
│  │  │  ├─ SeionTable.vue (清音表格)
│  │  │  ├─ SelectionDetailPanel.vue (顯示目前已選假名與選項摘要的側邊/明細面板)
│  │  │  ├─ SeionYoonSection.vue (清音拗音示例區塊)
│  │  │  ├─ SokuonSection.vue (促音規則說明區塊)
│  │  │  └─ SpecialSyllableSection.vue (特殊音節 / 補充說明區塊)
│  │  ├─ composables/
│  │  │  └─ usePracticeSession.ts (練習頁最核心狀態；管理選字、題數、自動計算、全選、provide/inject)
│  │  ├─ data/
│  │  │  ├─ kanaData.ts (五十音、濁音、列欄位與所有 Kana cell 的主資料)
│  │  │  └─ specialSyllableData.ts (促音、撥音、拗音、長音、特殊拼音等靜態說明資料)
│  │  ├─ types/
│  │  │  └─ practice.ts (練習模組的型別定義，例如 KanaCell、表格列、明細項目)
│  │  └─ views/
│  │     └─ PracticeView.vue (主練習頁；組裝 toolbar、表格、規則區塊、最近結果與 ExamModal)
│  │
│  ├─ pwa/ (PWA 安裝 / 更新體驗模組)
│  │  ├─ composables/
│  │  │  └─ usePwaLifecycle.ts (在元件 mounted 時註冊 PWA service，回傳 toast 狀態與更新操作)
│  │  ├─ services/
│  │  │  └─ pwaLifecycleService.ts (PWA 更新邏輯核心；呼叫 registerSW、控制更新提示、延後更新與清快取)
│  │  └─ types/
│  │     └─ pwa.ts (PWA ToastState 型別定義)
│  │
│  └─ vocabulary/ (單字頁模組)
│     └─ views/
│        └─ VocabularyView.vue (單字頁畫面；承接共用練習狀態並顯示對應內容)
│
├─ shared/ (跨模組共用的元件與工具)
│  ├─ components/
│  │  ├─ AppHeader.vue (頁首標題顯示元件)
│  │  ├─ BaseButton.vue (全站共用按鈕元件)
│  │  ├─ BaseCheckbox.vue (全站共用核取方塊元件)
│  │  ├─ BaseInput.vue (全站共用輸入框元件)
│  │  ├─ RouteTabs.vue (頁面分頁切換導覽列)
│  │  └─ ToastBanner.vue (全站共用 Toast 提示；主要用於 PWA 更新 / 離線提示)
│  └─ utils/
│     ├─ questionCount.ts (依已選假名數與是否包含平假名/片假名，計算建議題數)
│     ├─ questionDeck.ts (提供洗牌與循環補足題組的工具函式)
│     ├─ renderSafety.ts (小型安全工具；處理空值 fallback，避免 render 時出現 undefined / null)
│     └─ storageGuard.ts (localStorage 讀寫保護工具；含 JSON parse 驗證與移除壞資料)
│
├─ styles/ (全域樣式層)
│  └─ main.css (全域 CSS 與 Tailwind / 主題樣式入口)
│
└─ env.d.ts (Vite / TypeScript 環境型別宣告)
```

## tests 架構

```text
tests/
├─ component/ (Vue 元件測試)
│  ├─ AppShellSmoke.spec.ts (AppShell 基本渲染與核心外框 smoke test)
│  ├─ ExamModal.spec.ts (ExamModal 的關鍵互動與顯示測試)
│  ├─ PracticeViewSmoke.spec.ts (PracticeView 的基本渲染與最近結果互動測試)
│  ├─ RouteOwnership.spec.ts (驗證不同頁面是否顯示正確面板)
│  ├─ SelectionDetailPanel.spec.ts (選取明細面板的顯示邏輯測試)
│  └─ testUtils.ts (元件測試共用 helper；例如先 provide PracticeSession 再 mount)
├─ e2e/ (Playwright 端到端測試)
│  ├─ app-shell.smoke.spec.ts (整個網站 shell 與基本進站流程 smoke test)
│  ├─ practice-exam-flow.spec.ts (從選字到開始測驗的完整流程測試)
│  └─ testUtils.ts (e2e 共用 helper)
├─ mocks/ (測試替身 / mock 模組)
│  └─ pwaRegisterMock.ts (mock `virtual:pwa-register`，讓測試不真的註冊 service worker)
├─ unit/ (純邏輯單元測試)
│  ├─ latestUnknownResultStorage.spec.ts (最近不熟結果 storage 的讀寫與驗證測試)
│  ├─ pwaLifecycleService.spec.ts (PWA 更新流程與 toast 狀態測試)
│  ├─ questionDeck.spec.ts (洗牌與循環題組工具測試)
│  ├─ useExamSession.spec.ts (測驗流程狀態機測試)
│  └─ usePracticeSession.spec.ts (練習狀態管理測試)
└─ setup.ts (Vitest 共用初始化；載入 `jest-dom` matcher)
```

## specs / .specify / scripts 的角色

```text
specs/ (每個功能需求的規格資料夾)
├─ 001-japanese-pwa-study/ (第一階段功能規格：主功能、畫面契約、研究、任務拆解)
└─ 002-testing-cicd-foundation/ (第二階段規格：測試與 CI/CD 基礎建設)

.specify/ (規格導向開發工具資源)
├─ templates/ (spec、plan、tasks 等模板)
├─ scripts/ (建立新 feature、檢查前置條件、更新 agent context 的腳本)
└─ memory/ (專案規範記憶，例如 constitution)

scripts/ (專案自訂腳本)
└─ publishPages.mjs (將建置結果同步到 gh-pages 分支 / 子目錄)
```

## 執行流程速記

```text
index.html
  -> /src/app/main.ts
  -> AppShell.vue
  -> router.ts 決定目前頁面
  -> PracticeView / GrammarView / VocabularyView
  -> 各模組 composables、components、utils
```

## 一句話總結

- `src/`：真正的產品邏輯與畫面實作。
- `tests/`：驗證 `src/` 是否正確。
- `specs/` / `.specify/`：規格、計畫、任務與開發流程支援。
- `.github/workflows/`：自動化驗證與部署。
- `scripts/`：部署輔助腳本。
