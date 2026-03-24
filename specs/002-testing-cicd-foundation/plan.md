# Implementation Plan: 測試與自動交付基礎建設

**Branch**: `002-testing-cicd-foundation` | **Date**: 2026-03-25 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/002-testing-cicd-foundation/spec.md`

## Summary

本功能會在現有 Vue 3 + TypeScript + Vite PWA 專案上補齊可持續擴充的測試與交付基線。現況已具備 Vitest 與部分 unit/component 測試，因此本次不從零重建測試工具，而是聚焦於四件事：整理標準化測試 scripts、加入 Playwright e2e、建立 GitHub Actions CI、建立以 GitHub Pages 為承載的 CD 流程。`dev` 分支部署到 GitHub Pages 的 `/staging/` 路徑，`main` 部署到網站根路徑，並以 GitHub Environments 區分 `staging` 與 `production`。

## Technical Context

**Language/Version**: TypeScript 5.9、Node.js 22、Vue 3.5  
**Primary Dependencies**: Vue Router 4、Vite 7、Vitest 3、Vue Test Utils、Playwright、GitHub Actions  
**Storage**: N/A（僅延續現有 localStorage 行為，不新增後端儲存）  
**Testing**: ESLint、vue-tsc、Vitest、Playwright  
**Target Platform**: GitHub 託管的靜態前端網站；桌機與手機瀏覽器  
**Project Type**: 純前端 Web Application / PWA  
**Performance Goals**: PR 驗證流程在一般變更下維持單次 8 分鐘內完成；新增自動化不改變既有路由互動延遲體感  
**Constraints**: 無後端、不得讀寫受限 `_private` 區內容、需保留現有 PWA 行為、部署需在無外部商業平台憑證前提下可運作  
**Scale/Scope**: 1 個前端應用、2 條 e2e 案例、1 條 CI workflow、1 條 CD workflow、少量 app-shell 與 router 配置調整

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- 規格、計畫、quickstart 與 README 皆以繁體中文撰寫。
- Repository 已有 `.gitignore`，後續需確認 `playwright-report/`、`test-results/` 等新產物也被忽略。
- 本功能在實作前已定義測試策略：沿用既有 Vitest，新增 Playwright 與 CI/CD 驗證順序。
- 主要路由與高風險互動元件的 render-safe 要求延續既有 smoke tests，新增 e2e 只覆蓋 app shell 可開啟與第一頁核心出題流程，不擴散其他 UI 責任。
- Scope ownership 明確限制在 `package.json`、`vite.config.ts`、`src/app/router.ts`、測試目錄、`.github/workflows/`、文件與必要 selector；不得藉此重構現有業務 UI。
- 共享樣式與版面規則不在本次主動調整範圍，若為 e2e selector 需要補 `data-testid`，必須只新增穩定識別，不改變視覺布局。
- 自動化新增的主要成本是 CI 時間與 Pages 部署分支維護；已以最小案例數、單一承載平台與單一部署腳本控制複雜度。
- 本計畫採用 GitHub Pages 內建承載，避免額外雲端部署耦合，屬目前最簡可行方案。

## Architecture Decisions

### 1. 測試指令基線

- 保留既有 `vitest run`，拆分為更清楚的 `test:unit`、`test:e2e`、`test:ci` scripts。
- `test:ci` 作為 CI 聚合入口，順序為 `lint -> typecheck -> test:unit -> build -> test:e2e`。
- 既有 unit/component 測試視為有效資產，不重寫；補足至少一個純工具模組測試，讓「核心純邏輯」覆蓋更加明確。

### 2. E2E 策略

- 使用 Playwright 作為端對端工具，測試檔置於 `tests/e2e/`。
- `playwright.config.ts` 會自動啟動本地 web server：
  - 本地預設使用 `vite dev`
  - CI 使用 `vite preview`
- 先落兩條 deterministic 案例：
  - smoke：首頁可開啟、標題與主要導覽存在
  - core flow：在 `/practice` 勾選至少一個假名、輸入題數、開啟考試 modal
- 為了降低 brittle selector，必要時只補最小量 `data-testid` 到工具列與啟動按鈕，不調整 UI 行為。

### 3. CI Workflow 策略

- 建立 `.github/workflows/ci.yml`，在 `pull_request` 與 `push`（`dev`、`main`、feature branches）執行。
- 流程固定為：
  1. checkout
  2. setup-node + npm cache
  3. `npm ci`
  4. `npm run lint`
  5. `npm run typecheck`
  6. `npm run test:unit`
  7. `npm run build`
  8. 安裝 Playwright browser
  9. `npm run test:e2e`
- e2e 失敗時上傳 `playwright-report/` 與 `test-results/` 作為診斷 artifact。

### 4. CD Workflow 策略

- 使用 GitHub Pages 作為靜態部署承載，不依賴額外第三方平台憑證。
- 建立 `.github/workflows/cd.yml`：
  - `dev` push 時部署到 `gh-pages` 分支下的 `staging/` 目錄
  - `main` push 時部署到 `gh-pages` 分支根目錄
- 以 `staging`、`production` GitHub Environment 呈現部署歸屬；`production` 是否人工核准交由 repo 的 environment protection 設定控制。
- 使用 repo remote 名稱 `Japanese_Word_Practice_Vue_AI` 組出 GitHub Pages base path，並以環境變數傳入 build。

### 5. Base Path 與 PWA 相容策略

- `src/app/router.ts` 改用 `createWebHistory(import.meta.env.BASE_URL)`，讓 `/staging/` 與正式根路徑都能正常路由。
- `vite.config.ts` 改成函式形式，讀取 `VITE_APP_BASE_PATH` / `VITE_APP_START_URL`，同步設定 Vite `base` 與 PWA manifest `start_url`。
- 本地開發維持 `/`，CI/CD build 由 workflow 注入對應環境值，避免影響日常開發。

## Project Structure

```text
specs/002-testing-cicd-foundation/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── tasks.md
├── checklists/
│   └── requirements.md
└── contracts/
    ├── ci-pipeline-contract.md
    ├── deployment-contract.md
    └── e2e-scenarios-contract.md

.github/
└── workflows/
    ├── ci.yml
    └── cd.yml

scripts/
└── publishPages.mjs

src/
├── app/
│   ├── AppShell.vue
│   ├── main.ts
│   └── router.ts
├── modules/
│   ├── practice/
│   ├── exam/
│   ├── grammar/
│   ├── vocabulary/
│   └── pwa/
└── shared/

tests/
├── component/
├── e2e/
├── mocks/
└── unit/
```

**Structure Decision**: 採單一前端專案延伸。CI/CD 與部署腳本集中在 repo root；e2e 測試新增於 `tests/e2e/`；業務程式僅做最小必要調整以支援 base path 與穩定 selector。

## Test / Deployment Strategy

### Test Strategy

- unit：沿用 `tests/unit/*.spec.ts`，補一個純工具模組測試讓「核心純邏輯」覆蓋更明確。
- component：保留既有 smoke / ownership tests，不因導入 e2e 而移除。
- e2e：
  - `app-shell.smoke.spec.ts` 驗證首頁載入、標題、主要導覽與路由切換基礎可用
  - `practice-exam-flow.spec.ts` 驗證第一頁最小出題流程可成功開啟 modal
- CI：執行 lint、typecheck、unit、build、e2e。
- CD：部署前至少重跑 build；預設不重跑完整 e2e，以避免重複成本，由 CI 擔任品質門檻。

### Deployment Strategy

- 使用 `scripts/publishPages.mjs` 將 `dist/` 發佈到 `gh-pages` 分支：
  - `main` -> root
  - `dev` -> `staging/`
- staging URL 預期為 `https://psplover16.github.io/Japanese_Word_Practice_Vue_AI/staging/`
- production URL 預期為 `https://psplover16.github.io/Japanese_Word_Practice_Vue_AI/`
- 若 repo 尚未啟用 GitHub Pages，README 與 quickstart 需補充啟用步驟。

## Risks and Implementation Notes

### Risk 1: E2E selector 綁定脆弱文案

- 風險：測試直接依賴長中文文案，未來 UI 微調會造成假失敗。
- 應對：只對高風險互動點補最小 `data-testid`，例如開始測驗按鈕、題數輸入、modal 容器。

### Risk 2: `/staging/` base path 導致路由或 PWA 資產失效

- 風險：router 與 manifest 仍固定使用 `/`，導致 staging 白屏或資產 404。
- 應對：統一由 `VITE_APP_BASE_PATH` / `VITE_APP_START_URL` 驅動 build 與 router。

### Risk 3: `gh-pages` root 與 `staging/` 互相覆蓋

- 風險：部署正式版時清空 staging 內容，或部署 staging 時覆蓋正式版。
- 應對：部署腳本明確區分 root 與子目錄，僅清理目標範圍。

### Risk 4: CI 重複建置導致時間過長

- 風險：e2e 若另起一輪完整建置，會讓 PR 驗證過慢。
- 應對：CI 只建置一次，Playwright 在 CI 使用 `vite preview` 直接重用 `dist/`。

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 無 | 無 | 無 |
