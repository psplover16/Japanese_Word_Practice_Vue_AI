# Implementation Plan: 練習頁與部署流程調整

**Branch**: `005-practice-cd-refine` | **Date**: 2026-03-28 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/005-practice-cd-refine/spec.md`

## Summary

本次實作分成兩條主線：一條是修正 `/practice` 路由與 `ExamModal` 的互動與可讀性細節，另一條是簡化 GitHub Pages CD 流程，移除 repo 內的自製部署腳本，改由 `.github/workflows/cd.yml` 直接管理 `gh-pages` 內容與目標子目錄清理。前端部分沿用現有 Vue 3 + TypeScript + Vite + Tailwind 架構，在既有元件上做最小範圍調整；部署部分則維持 `dev -> staging`、`main -> production` 的雙環境對應，但把內容清理與發佈責任收斂到 workflow 內，避免舊產物殘留與腳本分散維護。

## Technical Context

**Language/Version**: TypeScript 5.x、Vue 3 SFC、Node.js 22 for CI/CD  
**Primary Dependencies**: Vue 3、Vue Router 4、Vite 7、Tailwind CSS 3、Vitest、Vue Test Utils、Playwright、Font Awesome、vite-plugin-pwa、GitHub Actions  
**Storage**: `localStorage` 延續既有最近一次不熟結果快照；部署不新增持久化資料層  
**Testing**: Vitest component/unit tests、Playwright e2e、`npm run lint`、`npm run typecheck`、`npm run build`、workflow 檢查  
**Target Platform**: 桌面與行動瀏覽器上的前端 PWA；GitHub Actions on `ubuntu-latest`；GitHub Pages 站點  
**Project Type**: 單一前端 Web Application / PWA  
**Performance Goals**: 字母練習頁與測驗彈窗在 375px、768px、1024px 下維持無水平捲動與可辨識內容；清除最近結果後 1 秒內完成畫面更新與回頂捲動  
**Constraints**: 不新增不必要第三方套件；不得使用 `any`；維持 `dev -> staging`、`main -> production`；保留 GitHub Pages 雙環境可用性；移除 repo 內自製部署腳本；若變更結構與部署文件必須同步更新 `PROJECT_ARCHITECTURE.md`  
**Scale/Scope**: 1 個 route view、4 個直接受影響前端元件、1 個 exam composable 互動分支、1 個 CD workflow、README 與架構文件同步更新

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- 規格、計畫、任務、quickstart 與使用者可讀文件皆以繁體中文撰寫；Constitution 保持英文。
- Repository 已有 `.gitignore`，本期不得提交 `node_modules/`、`dist/`、`build/`、`coverage/` 與其他可重建產物。
- 本期會調整部署結構與文件，因此必須更新 `PROJECT_ARCHITECTURE.md`。
- 實作前先定義驗證策略：
  - `/practice` 的 route smoke test
  - `ExamModal` 與最近一次結果互動相關 component/unit test
  - 既有 e2e 測驗流程與必要的 layout smoke 驗證
  - CD workflow 變更後的建置與目錄保護檢查
- 正向 ownership：本 feature 只屬於 `PracticeView`、`PracticeToolbar`、`UnknownResultPanel`、`SeionTable`、`DakuonTable`、`ExamModal`、`.github/workflows/cd.yml`、README 與部署相關架構文件。
- 反向 ownership：`/grammar`、`/vocabulary`、PWA toast、其他非字母練習元件與非部署 workflow 不得被引入本次新互動或排版改動。
- `/practice` route 與 `ExamModal` 的顯式版面規則優先於共用樣式抽象，不可為了共用而犧牲 375px 或彈窗可讀性。
- 清除結果回頂與彈窗放大屬於 UX/效能預算；若導致跳動、內容溢出或 console error，一律視為 defect。
- 部署流程採最簡可維護方案：優先 workflow 內原生步驟，不保留額外 repo-local 發佈腳本。

## Architecture Decisions

### 1. 最近結果清除維持單一資料來源，將「回頂」視為呼叫端附加行為

- `createExamSession` 與 `latestUnknownResultStorage` 仍是最近一次不熟結果的唯一資料真相。
- 上方 toolbar 與下方 `UnknownResultPanel` 仍共用同一個清除資料行為。
- 差異化需求只落在 `PracticeView` 呼叫時機：從下方結果區觸發時，資料清除完成後額外執行平滑捲動回頁面頂部。
- 這可避免為了 UI 差異而分裂資料清除邏輯。

### 2. `tableA` / `tableB` 文字移除只在表格表頭層處理

- 兩個字串目前只存在 `SeionTable.vue` 與 `DakuonTable.vue` 的表頭右側說明。
- 不修改 `kanaData.ts`、`usePracticeSession.ts` 或 `TableKey` 型別，避免把純展示需求擴散到資料結構。
- 測試只驗證畫面不再輸出該字樣，資料層仍可保留現有 table key 命名。

### 3. 測驗彈窗放大題目時，同步調整卡片高度與區塊間距

- 題目放大至約 2.5 倍後，單純只調字級容易壓縮答案、提示與按鈕區。
- `ExamModal.vue` 應同時調整題目列字級、卡片高度/最大寬度、內容區垂直間距與手機尺寸下的 padding，確保 375px 仍不裁切。
- 這屬於 `ExamModal` 專屬版面規則，不回推到 `BaseButton` 或其他共用元件。

### 4. CD 流程改成 workflow 內直接管理 `gh-pages` 工作樹與清理策略

- 由於同一個 GitHub Pages 站點要同時保留 production root 與 `staging/` 子目錄，本期維持 `gh-pages` 作為 Pages 承載分支。
- 但 repo 內的 `scripts/publishPages.mjs` 會被移除，改由 `.github/workflows/cd.yml` 使用 GitHub 官方 actions 與 workflow 內 shell 步驟完成：
  - checkout 原始碼
  - build `dist`
  - checkout `gh-pages` 到獨立路徑
  - 依分支清理對應目標目錄
  - 複製 `dist` 到 root 或 `staging/`
  - commit / push 更新
- 這樣可保留雙環境，又把「清理舊內容」邏輯集中在官方 workflow 中維護。

### 5. 文件與測試同步跟著 ownership 邊界更新

- README 只更新實際受影響的 CD 說明、排查段落與必要設定。
- `PROJECT_ARCHITECTURE.md` 要移除對 `publishPages.mjs` 的描述，改記錄 workflow 內直接部署。
- 測試延續既有 smoke / ownership 版型，不新增過度寬泛的新測試框架。

## Project Structure

### Documentation (this feature)

```text
specs/005-practice-cd-refine/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── tasks.md
├── analyze.md
├── checklists/
│   └── requirements.md
└── contracts/
    ├── practice-result-contract.md
    ├── exam-modal-contract.md
    └── deployment-contract.md
```

### Source Code (repository root)

```text
.github/
└── workflows/
    ├── cd.yml
    └── ci.yml

src/
├── modules/
│   ├── exam/
│   │   ├── components/
│   │   │   ├── ExamModal.vue
│   │   │   └── UnknownResultPanel.vue
│   │   └── composables/
│   │       └── useExamSession.ts
│   └── practice/
│       ├── components/
│       │   ├── DakuonTable.vue
│       │   ├── PracticeToolbar.vue
│       │   └── SeionTable.vue
│       └── views/
│           └── PracticeView.vue

tests/
├── component/
│   ├── ExamModal.spec.ts
│   ├── PracticeViewSmoke.spec.ts
│   └── testUtils.ts
├── e2e/
│   ├── practice-exam-flow.spec.ts
│   └── practice-layout.smoke.spec.ts
└── unit/
    └── latestUnknownResultStorage.spec.ts

README.md
PROJECT_ARCHITECTURE.md
```

**Structure Decision**: 維持單一前端專案結構，不新增新模組或資料夾；前端修改集中在既有 practice/exam 模組，部署修改集中在 workflow 與文件。

**Architecture Document Impact**: 必須更新 `PROJECT_ARCHITECTURE.md` 的 `.github/workflows/cd.yml`、`scripts/`、`PracticeView.vue`、`ExamModal.vue`、`UnknownResultPanel.vue` 與相關測試責任說明；若刪除 `scripts/publishPages.mjs`，需同步移除其架構描述。

## UI / State / Storage Strategy

### UI Strategy

- `UnknownResultPanel` 的按鈕文案改為「清除」，並透過 `whitespace-nowrap` 或等價規則保證手機尺寸不斷行。
- `PracticeView` 需區分兩種清除觸發來源：
  - toolbar 清除：清除資料，不回頂
  - 下方結果區清除：清除資料後平滑回頂
- `SeionTable` 與 `DakuonTable` 直接移除右側輔助標示文字，不新增替代說明。
- `ExamModal` 題目列字級放大時，要守住題目/答案/提示/按鈕的垂直節奏，避免把文字放大卻犧牲其他區塊可見性。

### State Strategy

- 不新增 store，不改變 `PracticeSession` 選字邏輯。
- 最近一次不熟結果仍由 `createExamSession` 暴露的 snapshot 與清除函式管理。
- 若需要辨識清除來源，應由 `PracticeView` 傳入額外意圖或使用本地 wrapper function，不應把 UI-specific scroll flag 寫進 storage。

### Storage Strategy

- 不新增任何 localStorage key。
- `latestUnknownResultsStorageKey` 的 schema 維持不變，避免影響既有資料相容性。
- 部署流程不依賴 repo 內額外儲存 build 狀態；每次 workflow 都以當次 build 與 `gh-pages` 目標目錄為唯一輸出來源。

## PWA Implementation Considerations

- 本 feature 不直接修改 PWA manifest、service worker 策略或圖示素材。
- 由於 build base path 仍受 staging/production 差異影響，CD workflow 必須繼續正確設定 `VITE_APP_BASE_PATH` 與 `VITE_APP_START_URL`。
- 若 `ExamModal` 尺寸或 `/practice` 版面調整影響離線 build 輸出，既有 `npm run build` 與 PWA precache 應自然涵蓋，不需額外快取配置。

## Code Standards

- 僅使用既有 Vue 3 Composition API 模式，不導入 Options API。
- 不使用 `any`、不引入新的部署或 UI 第三方套件。
- 以最小改動原則調整既有元件：純展示文案/標示變更盡量留在元件模板層；互動差異則放在 `PracticeView` 組裝層。
- workflow 內部署邏輯以清楚、可讀、可維護為原則，避免再抽出新的 repo-local 腳本。
- 所有文件更新需與實際程式行為一致，避免 README 與 workflow/架構說明漂移。

## Risks and Implementation Notes

### Risk 1: 最近結果清除後的平滑回頂可能影響原本自動捲動邏輯

- `PracticeView` 目前已有最近結果更新後自動捲到結果區的行為。
- 新的「下方清除後回頂」邏輯若與既有 timer/nextTick 互相踩到，容易造成跳動。
- 實作時需統一 pending timer 管理與 scroll 觸發時機。

### Risk 2: 題目字級放大後，375px 下彈窗高度不足

- 目前 modal 高度固定，單純放大字體可能讓題目、提示或按鈕區被擠壓。
- 需以測試與手動驗證共同確認內容區高度與 gap 是否足夠。

### Risk 3: 移除自製部署腳本後，workflow 直接操作 `gh-pages` 若清理範圍錯誤，可能誤刪另一環境內容

- production 部署不得刪除 `staging/`。
- staging 部署只能清理 `staging/` 子目錄，不得動到 root production 內容。
- 必須把清理規則寫成明確、可審查的 shell 步驟，並用契約與 README 說明。

### Risk 4: README 與架構文件若沒有同步更新，後續維護者會沿用已失效流程

- 本 feature 的交付不只是程式碼變動，還包括部署心智模型改變。
- 文件更新要視為完成定義的一部分，而非事後補充。

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 無 | 無 | 無 |
