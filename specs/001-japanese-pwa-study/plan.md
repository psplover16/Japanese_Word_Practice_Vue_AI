# Implementation Plan: 日語學習 PWA

**Branch**: `001-japanese-pwa-study` | **Date**: 2026-03-22 | **Spec**: [spec.md](./spec.md)  
**Input**: 以 [`spec.md`](./spec.md) 為基準，針對三個主要路由、50 音練習、PWA 完整離線、更新提示、獨立教學區塊與測驗流程建立前端實作規劃。

## Summary

本功能採單一 Vue 3 + TypeScript + Vite + Tailwind CSS 前端專案實作，以 `AppShell` 承載固定外層容器、左側路由標題與右側切換按鈕群。字母練習路由在頁首顯示「50音」，變化規則與單字練習路由則顯示各自標題。共享勾選狀態使用 `provide/inject` 的 session store，在第一頁可寫、在第二與第三頁只讀；測驗結果與 PWA 延後更新旗標使用 `localStorage`；PWA 圖示與 favicon 直接沿用 `_private/_private_fileAssets/public` 內的指定資產，並以 `vite-plugin-pwa` 實作完整離線、5 秒更新提示、下次啟動自動套用與舊快取清理。

## Technical Context

**Language/Version**: TypeScript 5.x、Vue 3.x、Node.js 22 LTS  
**Primary Dependencies**: Vue Router、Tailwind CSS、vite-plugin-pwa、Font Awesome Vue、Vitest、Vue Test Utils、Playwright  
**Storage**: `localStorage`、Cache Storage、靜態 JSON 檔  
**Testing**: Vitest、Vue Test Utils、Playwright、Lighthouse（手動或 CI 驗證）  
**Target Platform**: 手機優先的現代瀏覽器 PWA，至少涵蓋 Chrome / Edge / Safari 行動版與桌機版  
**Project Type**: 純前端 SPA + PWA  
**Performance Goals**: 三個主要頁面切換後 `1 秒` 內出現可互動內容；測驗 modal 按下「下一步」後 `0.2 秒` 內完成揭曉或換題；首次完整快取後可離線直接進入主畫面  
**Constraints**: 無後端；必須完整離線；更新提示只顯示 `5 秒`；更新後需清理舊快取但不得刪除 `localStorage`；必須使用 Composition API；不得使用 `any`；避免不必要套件；需避免 ESLint 錯誤；頁首左側路由標題與右側切換按鈕群不得斷行  
**Scale/Scope**: 3 個主要路由、2 張假名表格、1 個測驗 modal、1 個結算區、8 個需獨立製作與獨立驗收的教學功能單元、PWA 安裝與更新生命週期

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- `PASS`：`spec.md`、`plan.md`、`research.md`、`data-model.md`、`quickstart.md` 與 contracts 皆使用繁體中文，符合 Constitution 文件語言要求。
- `PASS`：根目錄已存在 [`.gitignore`](C:\Users\Gary\Desktop\duotify-membership-v1\.gitignore)，且規劃持續排除 `node_modules/`、`build/`、`dist/`、`coverage/`。
- `PASS`：測試策略已明確定義為 Vitest + Vue Test Utils + Playwright，並補入 Lighthouse 驗證，以對應互動邏輯、共享狀態、PWA 生命週期與效能預算。
- `PASS`：本次計畫已將可衡量效能目標寫入 Technical Context，並在 quickstart 中定義量測方式，符合 Performance Budgets 原則。
- `PASS`：第三方依賴僅保留 Vue Router、vite-plugin-pwa、Font Awesome 與測試工具；狀態管理、抽題、storage 防呆與快取清理以原生平台能力與本地模組優先。

## Architecture Decisions

### 1. 應用架構

- 採 Vue SPA，使用 Vue Router 管理 `/practice`、`/grammar`、`/vocabulary` 三個主要路由。
- 由 `AppShell` 統一提供外層固定容器 `py-[12px] px-2`、頁首標題列與 `router-view`。
- 頁首左側僅顯示當前路由標題，三個路由標題分別為：
  - `/practice`：`50音`
  - `/grammar`：`變化規則`
  - `/vocabulary`：`單字練習`
- 頁首右側顯示路由切換按鈕群，整列使用不可斷行配置，避免標題與按鈕換行破版。
- `PracticeView` 為主要工作台，內含工具列、清音表、濁音／半濁音表、教學區塊群組、測驗 modal 觸發點與結算區。
- 教學區塊依獨立驗收要求拆成多個獨立 component 與資料來源，不以單一巨型區塊元件混合處理。

### 2. 狀態管理

- `practiceSessionStore`
  - 由 `AppShell` 建立並以 `provide/inject` 注入。
  - 在 `PracticeView` 提供可寫介面。
  - 在 `GrammarView` 與 `VocabularyView` 僅提供 readonly facade / selector 介面。
- `examSessionStore`
  - 管理題目序列、揭曉狀態、未知音節累計與結束狀態。
  - 區分 `idle`、`running`、`aborted`、`completed`。
- `dialogState`
  - 分開管理「結束練習確認」與「清除結果確認」。
- `pwaUpdateStore`
  - 管理離線可用提示、更新提示、延後套用旗標與版本資訊。

### 3. 持久化策略

- `localStorage` 僅保存：
  - 最近一次測驗結果
  - PWA 延後套用更新旗標
  - 最後已知版本資訊
- 勾選狀態、古語假名顯示開關、促音與拗音相關開關只存在記憶體，以符合重新整理回預設的需求。
- 所有 `localStorage` 讀寫集中於 typed storage service，統一處理 parse、防呆、錯誤資料清除與 schema 兼容。

### 4. PWA 與資產

- Vite 設定 `publicDir` 指向 `_private/_private_fileAssets/public`，直接重用：
  - `icons/*.png` 作為 PWA manifest icons
  - `vite.ico` 作為網站 favicon 參考來源
- PWA 使用 `vite-plugin-pwa` 的 prompt 型註冊模式，再由自訂更新控制器實作：
  - 首次離線可用提示
  - 5 秒更新提示
  - 使用者確認後立即更新
  - 未確認時下次啟動自動套用
  - 更新後清理舊 Cache Storage
- 快取清理只針對 Cache Storage 與可回收離線資料，不碰 `localStorage`。

### 5. 資料與業務邏輯分層

- `src/modules/practice/data`
  - 清音/濁音表格資料
  - 撥音、促音、拗音、長音與特殊音節資料
- `src/modules/practice/composables`
  - 勾選、批次切換、題數重算、readonly summary selector
- `src/modules/exam/composables`
  - 題目洗牌、輪次管理、未知音節累計、測驗狀態轉移
- `src/modules/exam/storage`
  - 最近一次測驗結果保存與壞資料清除
- `src/modules/pwa/services`
  - 更新提示流程、快取清理、延後套用與版本資訊保存
- `src/shared/utils`
  - 題數計算、抽題邏輯、storage 防呆、效能量測 helper

## Project Structure

### Documentation (this feature)

```text
specs/001-japanese-pwa-study/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── exam-session-contract.md
│   ├── instruction-sections-contract.md
│   ├── pwa-lifecycle-contract.md
│   ├── route-state-contract.md
│   └── toolbar-actions-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
index.html
src/
├── app/
│   ├── AppShell.vue
│   ├── main.ts
│   └── router.ts
├── modules/
│   ├── practice/
│   │   ├── components/
│   │   │   ├── PracticeToolbar.vue
│   │   │   ├── SeionTable.vue
│   │   │   ├── DakuonTable.vue
│   │   │   ├── ArchaicKanaToggleSection.vue
│   │   │   ├── HatsuonSection.vue
│   │   │   ├── SokuonSection.vue
│   │   │   ├── SeionYoonSection.vue
│   │   │   ├── GouYoonSection.vue
│   │   │   ├── LoanwordExtensionSection.vue
│   │   │   ├── ChoonRuleSection.vue
│   │   │   └── SpecialSyllableSection.vue
│   │   ├── composables/
│   │   │   └── usePracticeSession.ts
│   │   ├── data/
│   │   │   ├── kanaGrid.json
│   │   │   ├── hatsuonSection.json
│   │   │   ├── sokuonSection.json
│   │   │   ├── yoonSections.json
│   │   │   ├── choonRules.json
│   │   │   └── specialSyllables.json
│   │   ├── types/
│   │   │   └── kana.ts
│   │   └── views/
│   │       └── PracticeView.vue
│   ├── grammar/
│   │   └── views/
│   │       └── GrammarView.vue
│   ├── vocabulary/
│   │   └── views/
│   │       └── VocabularyView.vue
│   ├── exam/
│   │   ├── components/
│   │   │   ├── ExamModal.vue
│   │   │   ├── UnknownResultPanel.vue
│   │   │   └── ConfirmActionDialog.vue
│   │   ├── composables/
│   │   │   └── useExamSession.ts
│   │   ├── storage/
│   │   │   └── latestUnknownResultStorage.ts
│   │   └── types/
│   │       └── exam.ts
│   └── pwa/
│       ├── composables/
│       │   └── usePwaLifecycle.ts
│       ├── services/
│       │   ├── pwaLifecycleService.ts
│       │   └── pwaUpdateStorage.ts
│       └── types/
│           └── pwa.ts
├── shared/
│   ├── components/
│   │   ├── AppHeader.vue
│   │   ├── RouteTabs.vue
│   │   ├── BaseButton.vue
│   │   ├── BaseInput.vue
│   │   └── ToastBanner.vue
│   ├── types/
│   │   └── storage.ts
│   └── utils/
│       ├── questionCount.ts
│       ├── questionDeck.ts
│       ├── storageGuard.ts
│       └── performanceBudget.ts
├── styles/
│   └── main.css
└── env.d.ts

tests/
├── unit/
├── component/
├── integration/
└── e2e/
```

**Structure Decision**: 採單一前端專案結構。`src/app` 放應用骨架與路由，`src/modules` 依功能切分，`src/shared` 放跨模組共用元件與工具。由於教學區塊需要獨立製作與獨立驗收，因此在 `practice/components` 與 `practice/data` 內明確拆成多個對應檔案，而非用單一規則元件包掉全部內容。

## UI / State / Storage Strategy

### UI 版型

- 全站最外層固定容器使用 `py-[12px] px-2`。
- 頁首左側只顯示當前路由標題，右側顯示路由切換按鈕群。
- 頁首整列需採不可斷行配置，避免標題與按鈕群換行。
- `router-view` 必須佔滿剩餘可用寬度。
- 區塊與卡片統一使用 `0.5rem` 圓角。
- 按鈕統一使用方形圓角 `0.25rem` 與 `py-1 px-2`。
- 輸入框統一使用長方形圓角 `0.25rem` 與 `px-2 py-[0.275rem]`。
- 手機版版型以 [`wordPracticeUI.jpg`](C:\Users\Gary\Desktop\duotify-membership-v1\_private\_private_fileAssets\wordPracticeUI.jpg) 為主參考；桌機版以 [`desktopWordPractice.png`](C:\Users\Gary\Desktop\duotify-membership-v1\_private\_private_fileAssets\desktopWordPractice.png) 為主參考。
- 測驗 modal 版型以 [`modelTest1.jpg`](C:\Users\Gary\Desktop\duotify-membership-v1\_private\_private_fileAssets\modelTest1.jpg) 與 [`modelTest2.jpg`](C:\Users\Gary\Desktop\duotify-membership-v1\_private\_private_fileAssets\modelTest2.jpg) 為視覺對照。

### 狀態範圍

- `PracticeView`
  - 使用 writable `practiceSessionStore`
  - 負責勾選、工具列、表格、教學區塊與測驗啟動
- `GrammarView` / `VocabularyView`
  - 僅使用 readonly summary selector
  - 只讀顯示共享勾選狀態，不持有任何寫入方法
- `ExamModal`
  - 使用 `examSessionStore`
  - 只處理當次測驗互動
- `UnknownResultPanel`
  - 讀取最近一次測驗結果並在需要時 smooth scroll 到可見位置

### localStorage Key 策略

- `duotify.exam.latestUnknownResults`
- `duotify.pwa.applyUpdateOnNextLaunch`
- `duotify.pwa.lastKnownVersion`

### 靜態資料拆分

- 假名表格、規則與範例使用外部 JSON 檔，方便獨立編修與驗收。
- 每個教學區塊至少對應一份資料來源或一組明確欄位，避免單一混合 JSON 造成驗收邊界模糊。
- 古語假名資料與一般可勾選題庫分開，避免在出題與題數統計時誤混入。

## PWA Implementation Considerations

### Manifest 與圖示

- 透過 `publicDir` 直接輸出 `_private/_private_fileAssets/public/icons/*.png`。
- `index.html` 中的 favicon 直接參考 `_private/_private_fileAssets/public/vite.ico`。
- manifest 明確設定：
  - `display: "standalone"`
  - icon sizes
  - theme color
  - background color

### 快取策略

- App shell、核心路由 JS/CSS、靜態 JSON、PWA icons 採 precache。
- 不將 `localStorage` 內容納入任何快取清理程序。
- 舊版快取清理時只刪除 precache 與 runtime cache。

### 更新流程

- service worker 偵測到新版後：
  - 顯示 `5 秒` 更新提示
  - 使用者若確認，立即更新並重新載入
  - 若未確認，寫入 `applyUpdateOnNextLaunch`
- 下一次啟動若檢測到延後套用旗標：
  - 自動套用新版
  - 清除舊 Cache Storage
  - 保留 `localStorage`

### 離線與錯誤處理

- 首次可離線使用提示只在必要 precache 與 service worker 都完成後顯示。
- 若 `latestUnknownResults` 格式錯誤，先清除再渲染 UI，避免頁面中斷。
- 更新提示與離線提示共用 `ToastBanner`，但由不同狀態來源控制，避免互相覆蓋。

### 效能量測方式

- 路由切換與 modal 更新時間由 Playwright E2E 量測，使用 `performance.now()` 或 UI ready signal 記錄。
- 建置後以 Lighthouse 驗證主要頁面的互動與載入品質，作為 Performance Budgets 的人工或 CI gate。
- 若量測結果超標，優先檢查：
  - 大型 JSON 是否過度一次性載入
  - modal 重新渲染範圍是否過大
  - 頁首與表格是否產生不必要重排

## Code Standards

- 嚴格 TypeScript，禁止 `any`。
- 一律使用 `const` 或 `let`，不得使用 `var`。
- 禁止全域變數與全域函式，所有邏輯封裝於 module scope、composable 或 service。
- 所有元件使用 Composition API 與 `<script setup lang="ts">`。
- Component 檔名一律 PascalCase；模組與工具檔案一律 camelCase。
- 陳述式以分號結尾。
- 優先使用 Tailwind；只有在 Tailwind 無法清楚表達的複合樣式時才引入局部 SCSS。
- UI icon 統一由 Font Awesome 提供。
- 提交前至少通過 `lint`、`typecheck`、相關測試與必要的 PWA 驗證。

## Risks and Implementation Notes

- 最大風險是 PWA 更新流程，因為同時包含 `5 秒提示`、`下次開啟自動套用` 與 `不可刪 localStorage` 三段式行為，必須以 unit + E2E 雙層驗證。
- 第二個風險是教學區塊拆分。若仍以單一 component 混合處理，會直接違反獨立驗收要求，因此元件與資料來源都必須先拆清楚。
- 第三個風險是共享狀態邊界。若第二與第三頁直接拿到可寫 store，會違反只讀限制，因此必須設計 readonly facade 並加測試保護。
- 第四個風險是資料量與重渲染。多個表格與教學區塊若同時渲染，可能影響手機端流暢度，因此需留意延遲載入、資料拆分與局部更新。
- 第五個風險是 PWA 圖示資產整合。favicon 與 manifest icons 雖然都來自指定路徑，但若只在設定層處理、沒有明確驗證，仍可能在實際輸出時出錯，因此需要拆成清楚任務與驗證步驟。

## Implementation Notes

### Phase 0 - 研究輸出

- 確認 `publicDir` 與 PWA icon / favicon 路徑策略
- 確認跨路由共享但不跨重整的狀態模型
- 確認獨立驗收的教學區塊拆分方式
- 確認效能預算與量測方式

### Phase 1 - 設計輸出

- `data-model.md`：補齊教學區塊、確認對話框與 PWA 更新狀態模型
- `contracts/`：補齊路由標題、readonly 共享狀態、工具列與教學區塊契約
- `quickstart.md`：補齊標題列、只讀限制、圖示資產與效能驗證步驟
- 更新 agent context，讓後續實作階段能直接讀到目前技術棧與 PWA 依賴

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| `vite-plugin-pwa` | 需要穩定產生 manifest、service worker 與 precache | 手寫 service worker 維護與測試成本更高 |
| Playwright + Lighthouse | 需要量測 PWA 更新流程、路由切換與 modal 互動效能 | 僅人工測試不可重現，也無法當回歸保護 |
