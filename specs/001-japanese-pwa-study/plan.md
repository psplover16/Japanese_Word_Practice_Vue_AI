# 實作計畫：日語學習 PWA

**Branch**: `001-japanese-pwa-study` | **Date**: 2026-03-21 | **Spec**: [spec.md](./spec.md)  
**Input**: 來自 `/specs/001-japanese-pwa-study/spec.md` 的功能規格

## Summary

本功能會以 Vue 3 + TypeScript + Vite + Tailwind CSS 建立純前端 PWA，採單頁路由架構，核心由固定外層容器、三個子頁、字母選取表格、測驗 modal 與結果結算區組成。技術上會以 `provide/inject` 的 Composition API store 管理跨路由但不跨重整的勾選狀態，以 `localStorage` 保存最近一次測驗結果與必要的 PWA 更新旗標，並以 `vite-plugin-pwa` 實作完整離線、更新提示、下次開啟自動套用與舊快取清理。

## Technical Context

**Language/Version**: TypeScript 5.x、Vue 3.x、Node.js 22 LTS  
**Primary Dependencies**: Vue Router、Tailwind CSS、vite-plugin-pwa、Font Awesome Vue、Vitest、Vue Test Utils、Playwright  
**Storage**: `localStorage`、Cache Storage、靜態 JSON 檔  
**Testing**: Vitest、Vue Test Utils、Playwright  
**Target Platform**: 現代手機瀏覽器為主，並支援桌面版 Chrome、Edge、Safari、Firefox  
**Project Type**: 純前端 SPA + PWA  
**Performance Goals**: 熱啟動後路由切換與按鈕互動目標在 100ms 內完成可見反應；測驗 modal 換題與揭曉答案目標在 50ms 內完成；首次成功安裝後離線重開可直接進入主畫面  
**Constraints**: 無後端；必須完整離線；更新提示只顯示 5 秒；更新後需清理舊快取但不得刪除 `localStorage`；必須使用 Composition API；禁止 `any`；避免不必要套件；需避免 ESLint 錯誤  
**Scale/Scope**: 3 個路由、2 個互動表格、1 個測驗 modal、1 組結果結算區、多組發音規則說明、數十到低百筆靜態字母與規則資料

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- `PASS`：本計畫、研究、模型與 quickstart 均以繁體中文撰寫；只有 Constitution 維持英文。
- `PASS`：根目錄已存在 [`.gitignore`](C:\Users\Gary\Desktop\duotify-membership-v1\.gitignore)，且規劃持續排除 `node_modules/`、`build/`、`dist/`、`coverage/`。
- `PASS`：測試策略已定義為 Vitest + Vue Test Utils + Playwright，涵蓋互動邏輯、路由共享狀態與 PWA 生命週期。
- `PASS`：已定義互動延遲與離線啟動目標，後續需在實作中以 Lighthouse 與 E2E 驗證。
- `PASS`：第三方依賴僅保留 Vue Router、vite-plugin-pwa、Font Awesome 與測試工具；其餘優先採平台原生能力。

## Architecture Decisions

### 1. 應用架構

- 採單一 Vue SPA，使用 Vue Router 管理 `/practice`、`/grammar`、`/vocabulary` 三個路由。
- 根元件使用固定外層容器與共用頁首，頁首左側顯示頁面名稱，右側顯示路由切換按鈕群，`router-view` 佔滿剩餘可用寬度。
- UI 採 Tailwind CSS 為主，SCSS 僅用於 Tailwind 無法良好表達的少量複合樣式。

### 2. 狀態管理

- 第一頁的勾選狀態使用 `provide/inject` 建立的 session store 保存於記憶體中，以支援跨路由保留但重整後回預設。
- 第二頁與第三頁只拿到該 store 的 readonly 視圖與衍生資料，不暴露任何寫入 API。
- 測驗 modal 的題目流程使用局部 composable 管理，避免把一次性 UI 狀態升級成全域共享狀態。

### 3. 持久化策略

- `localStorage` 只保存最近一次測驗結果、PWA 延後套用更新旗標與必要的版本化 metadata。
- 字母勾選、`促音`、`拗音／合拗音／長音符` 等學習選取狀態不寫入 `localStorage`，以符合重整後回預設的規格。
- 靜態內容拆成 JSON，包含清音/濁音表、發音規則、範例字、特殊音節說明與古語假名資料。

### 4. PWA 與資產

- Vite 設定 `publicDir` 指向 `_private/_private_fileAssets/public`，直接重用既有 `icons/` 與 `vite.ico` 作為 PWA manifest 與 favicon 來源。
- PWA 使用 `vite-plugin-pwa` 的 prompt 型註冊模式，再由自訂更新控制器實作 5 秒提示、立即更新與下次開啟自動套用邏輯。
- 更新完成後只清理舊版 Cache Storage 與 plugin 產生的可回收快取，不清除 `localStorage`。

### 5. 資料與業務邏輯分層

- `src/modules/practice` 負責字母表、題數計算、勾選同步與測驗入口。
- `src/modules/exam` 負責題目產生、揭曉答案、錯題累計與結果格式化。
- `src/modules/pwa` 負責 service worker 註冊、更新提示與快取清理。
- 純函式集中在 `src/shared/utils`，例如題數計算、亂數出題、localStorage parsing、防呆驗證。

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
│   ├── pwa-lifecycle-contract.md
│   └── route-state-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── AppShell.vue
│   ├── main.ts
│   └── router.ts
├── modules/
│   ├── practice/
│   │   ├── components/
│   │   ├── composables/
│   │   ├── data/
│   │   ├── types/
│   │   └── views/
│   ├── grammar/
│   │   └── views/
│   ├── vocabulary/
│   │   └── views/
│   ├── exam/
│   │   ├── components/
│   │   ├── composables/
│   │   ├── storage/
│   │   └── types/
│   └── pwa/
│       ├── composables/
│       ├── services/
│       └── types/
├── shared/
│   ├── components/
│   ├── composables/
│   ├── constants/
│   ├── types/
│   └── utils/
├── styles/
│   └── main.css
└── env.d.ts

tests/
├── unit/
├── component/
├── integration/
└── e2e/

_private/
└── _private_fileAssets/
    └── public/
        ├── icons/
        └── vite.ico
```

**Structure Decision**：採單一前端專案結構。`src/app` 放應用骨架，`src/modules` 依功能切分，`src/shared` 放跨模組公用函式與型別，`tests` 依測試層級區分。既有 `_private/_private_fileAssets/public` 會作為 `publicDir`，避免複製 PWA 圖示資產。

## UI / State / Storage Strategy

### UI 版型

- 全頁最外層固定容器使用 `py-[12px] px-2`。
- 區塊圓角統一為 `rounded-lg` 對應 `0.5rem`；按鈕使用 `rounded` 搭配 `py-1 px-2`；輸入框使用 `rounded` 搭配 `px-2 py-[0.275rem]`。
- 手機版排版以 [`wordPracticeUI.jpg`](C:\Users\Gary\Desktop\duotify-membership-v1\_private\_private_fileAssets\wordPracticeUI.jpg) 為主要參考；桌機版以 [`desktopWordPractice.png`](C:\Users\Gary\Desktop\duotify-membership-v1\_private\_private_fileAssets\desktopWordPractice.png) 為主要參考。
- Modal 卡片樣式依 [`modelTest1.jpg`](C:\Users\Gary\Desktop\duotify-membership-v1\_private\_private_fileAssets\modelTest1.jpg) 與 [`modelTest2.jpg`](C:\Users\Gary\Desktop\duotify-membership-v1\_private\_private_fileAssets\modelTest2.jpg) 規劃。

### 狀態範圍

- `practiceSessionStore`
  - 記憶體內 reactive store
  - 管理字母勾選、包含平片、題數、古語假名顯示、促音開關、拗音/合拗音/長音符開關
  - 在 `AppShell` 建立並 `provide`
- `examSessionStore`
  - modal 開啟後建立
  - 管理題目序列、目前題號、答案揭曉狀態、未知標記次數
- `latestUnknownResultStorage`
  - 專責序列化 / 反序列化最近一次測驗結果
  - 讀取失敗時清除壞資料
- `pwaUpdateStore`
  - 管理是否有更新可用、5 秒提示是否仍顯示、是否延後到下次開啟套用

### localStorage Key 策略

- `duotify.exam.latestUnknownResults`
- `duotify.pwa.applyUpdateOnNextLaunch`
- `duotify.pwa.lastKnownVersion`

### 靜態資料拆分

- `src/modules/practice/data/kanaGrid.json`
- `src/modules/practice/data/phoneticRules.json`
- `src/modules/practice/data/exampleWords.json`

## PWA Implementation Considerations

### Manifest 與圖示

- 透過 `publicDir` 直接輸出 `_private/_private_fileAssets/public/icons/*.png`
- favicon 直接使用 `_private/_private_fileAssets/public/vite.ico`
- manifest 中設定 standalone display、theme/background color 與對應 icon sizes

### 快取策略

- App shell、路由核心 JS/CSS、靜態 JSON、PWA icons 採 precache
- 字母與規則資料因為是固定 JSON，可跟隨應用版本一起 precache
- 不對 `localStorage` 做任何清理動作；快取清理僅針對 Cache Storage

### 更新流程

- 下載完成提示：service worker 安裝完成且離線資源可用時顯示可離線使用提示
- 更新提示：偵測到新 service worker 時顯示 5 秒 toast / banner
- 使用者 5 秒內確認：呼叫更新流程並重新載入
- 使用者未確認：寫入「下次啟動自動套用」旗標，下一次啟動時自動套用後再清舊快取

### 離線與錯誤處理

- 若離線資產尚未完整可用，UI 不顯示「已可離線使用」
- 若更新後清理快取失敗，保留可回收資訊並在下次啟動重試，但不能影響主流程
- 若測驗結果資料損毀，讀取時直接清除並回到空狀態

## Code Standards

- 嚴格 TypeScript；禁止 `any`
- 只用 `const` 或 `let`
- 所有語句以分號結尾
- 組件一律使用 Composition API 與 `<script setup lang="ts">`
- 元件檔名使用 PascalCase；模組檔名使用 camelCase
- 避免全域變數與全域函式；共享邏輯使用 composable 或模組函式
- Tailwind 優先；僅在必要時引入局部 SCSS
- UI icon 統一由 Font Awesome 提供
- 預設啟用 ESLint + TypeScript + Vue 規則；提交前需通過 lint 與 typecheck

## Risks and Implementation Notes

- PWA 更新流程最容易出錯，尤其是「5 秒提示 + 下次開啟自動套用 + 不刪 localStorage」的三段式行為，需要獨立測試。
- 清音表格與濁音表格在手機上資訊密度高，若欄寬不足需優先保留可點擊性與不換行規則。
- 第二頁與第三頁目前只讀共享狀態，實作時要避免過度設計，保持可擴充但不提前抽象化。
- 測驗結果與壞資料清理屬高風險路徑，所有 `localStorage` 讀取都必須集中在 typed storage service 中處理。
- `vite-plugin-pwa` 與 `publicDir` 指向 `_private` 路徑的整合需要在建置與預覽模式都驗證一次。

## Implementation Notes

### Phase 0 - 研究輸出

- 完成 PWA 更新策略、狀態管理、靜態資料拆分與測試策略定案
- 所有技術未知數已由 `research.md` 消化，無需保留 `NEEDS CLARIFICATION`

### Phase 1 - 設計輸出

- `data-model.md`：定義字母、勾選狀態、測驗題目、不熟音節紀錄與 PWA 更新狀態
- `contracts/`：定義路由/狀態、測驗 modal、PWA 生命週期契約
- `quickstart.md`：定義本地開發、測試、離線驗證與更新驗證流程

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| `vite-plugin-pwa` | 需要可靠地處理 manifest、service worker 註冊、更新事件與 precache | 手寫 service worker 會讓更新提示、快取清理與 Vite 建置整合成本更高 |
| Playwright E2E | 需要驗證 PWA 更新、離線啟動、localStorage 壞資料清理等瀏覽器行為 | 單靠單元測試無法完整覆蓋 service worker 與離線生命週期 |
