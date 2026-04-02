# Implementation Plan: GitHub Pages 部署修正

**Branch**: `008-fix-pages-deploy` | **Date**: 2026-04-03 | **Spec**: [spec.md](C:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/specs/008-fix-pages-deploy/spec.md)
**Input**: Feature specification from `/specs/008-fix-pages-deploy/spec.md`

## Summary

修正 GitHub Pages 發布流程，避免 `gh-pages` 首次初始化或 staging 發布時把原始 repo 內容殘留到公開站點。實作會把發布清理規則抽成可測試的 Node 腳本，讓 `.github/workflows/cd.yml` 改以該腳本執行 production/staging 同步，並補上對首次發布、舊內容清理與目標分流的單元測試。由於這次修正延伸自既有 CI/CD 功能，也必須同步回寫 [002-testing-cicd-foundation/spec.md](C:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/specs/002-testing-cicd-foundation/spec.md) 與 `PROJECT_ARCHITECTURE.md`。

## Technical Context

**Language/Version**: TypeScript 5.9、Node.js 22、GitHub Actions Ubuntu runner  
**Primary Dependencies**: Vue 3、Vite 7、Vitest 3、Playwright、Git CLI、Node `fs`/`path`  
**Storage**: Git worktree、`dist/` 靜態產物、`gh-pages` 分支內容  
**Testing**: Vitest 單元測試、`npm run build`、必要時以本地臨時目錄模擬發布  
**Target Platform**: GitHub Pages、現代桌面與行動瀏覽器  
**Project Type**: Vite/Vue 單頁 Web App 搭配 GitHub Actions CD  
**Performance Goals**: 部署修正不得讓既有發布流程增加顯著等待；公開站點首次載入不得再出現 `/src/*` 404；production/staging 在 10 分鐘內可完成發布驗證  
**Constraints**: 保留 `main -> production`、`dev -> staging` 的外部網址規則；不得改變既有應用功能頁；需同步更新 `PROJECT_ARCHITECTURE.md` 與 originating spec `specs/002-testing-cicd-foundation/spec.md`  
**Scale/Scope**: 1 個 CD workflow、1 個新發布腳本、1 組部署單元測試、少量文件回寫

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- 文件將以繁體中文撰寫；Constitution 保持英文，符合規範。
- Repository 已有 `.gitignore`；本次不會提交 `node_modules/`、`dist/` 等可重建產物。
- 本次會變更部署結構與新增腳本，因此必須更新 `PROJECT_ARCHITECTURE.md`。
- 本次修正屬於既有 CI/CD 功能的行為修補，必須同步更新 originating spec [002-testing-cicd-foundation/spec.md](C:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/specs/002-testing-cicd-foundation/spec.md)。
- 測試策略已定義：以 Vitest 驗證發布同步規則，並用 `npm run build` 驗證建置未受影響。
- 功能範圍明確限制在部署流程、發布腳本、部署文件；`src/app`、`src/modules/*`、既有畫面與互動皆為負向範圍，不應改動。
- 本次不涉及共用 UI 抽象變更，無 reusable-style 衝突。
- 發布腳本會以最小必要邏輯實作，避免在 workflow 內維持難測試的複雜 shell 狀態。

## Project Structure

### Documentation (this feature)

```text
specs/008-fix-pages-deploy/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- deployment-publish-contract.md
`-- tasks.md
```

### Source Code (repository root)

```text
.github/
`-- workflows/
    `-- cd.yml

scripts/
`-- publishPages.mjs

tests/
`-- unit/
    `-- publishPages.spec.ts

specs/
|-- 002-testing-cicd-foundation/
|   `-- spec.md
`-- 008-fix-pages-deploy/
    |-- spec.md
    |-- plan.md
    |-- research.md
    |-- data-model.md
    |-- quickstart.md
    |-- tasks.md
    `-- contracts/

PROJECT_ARCHITECTURE.md
```

**Structure Decision**: 保持既有單一 Vite/Vue 專案結構，不改動 `src/` 功能模組；新增 `scripts/publishPages.mjs` 作為可測試的部署同步邏輯承載點，`cd.yml` 只負責環境準備與呼叫腳本。

**Architecture Document Impact**: 需要更新 `PROJECT_ARCHITECTURE.md`，補上 `scripts/` 目錄、`publishPages.mjs` 的責任，以及 `cd.yml` 改為透過腳本執行發布同步的描述。

## Phase 0: Research

1. 確認目前 404 的根因是 `gh-pages` 分支根目錄殘留原始 repo 內容，導致公開站點送出仍引用 `/src/app/main.ts` 的原始 `index.html`。
2. 比較兩種修法：
   - 只在 workflow shell 內補更多 `git rm`/`find` 指令
   - 抽出可測試的 Node 發布腳本，由 workflow 呼叫
3. 決策採第二種，因為可測試性更高，較符合 Constitution 的 test-first verification。

## Phase 1: Design

1. 建立發布領域模型，定義「發布目標」「公開站點工作區」「部署執行結果」之間的關係。
2. 定義發布契約：
   - production 發布時，根目錄會被重新同步為最新 build 內容，但需保留 `.git`、`.nojekyll`、`staging/` 與可選 `CNAME`
   - staging 發布時，只能更新 `staging/`，保留合法的 production 根目錄內容，並移除原始 repo 殘留與會引用 `/src/` 的不安全入口頁
   - 首次建立 orphan `gh-pages` 時必須清空 Git index 與檔案系統內容
3. 定義測試矩陣：
   - 首次發布到 staging
   - 首次發布到 production
   - 已存在錯誤根目錄內容時再發布 staging
   - 已存在 staging 時發布 production，必須保留 `staging/`

## Phase 2: Implementation Strategy

1. 先寫 `tests/unit/publishPages.spec.ts`，描述 production/staging 清理與同步規則。
2. 實作 `scripts/publishPages.mjs`，封裝工作區清理、允許保留清單、`dist/` 複製與報告輸出。
3. 更新 `.github/workflows/cd.yml` 改呼叫腳本，保留現有 build 與 commit/push 流程。
4. 更新 `specs/002-testing-cicd-foundation/spec.md`、`PROJECT_ARCHITECTURE.md` 與本 feature 文件，使規格與架構文件與修正後行為同步。

## Test Strategy

- `tests/unit/publishPages.spec.ts`
  - 驗證 staging 發布會保留合法的 production 根目錄內容，但移除原始 repo 殘留與不安全 `index.html`
  - 驗證 production 發布會以 `dist/` 內容覆蓋根目錄，同時保留既有 `staging/`
  - 驗證首次發布前的 tracked/untracked 殘留不會變成公開站點內容
- `npm run build`
  - 驗證 Vite build 與現有 app 入口未被部署修正破壞

## Risk Mitigation

- 風險：workflow 與本地腳本規則不一致  
  對策：將實際清理與複製規則集中在 `scripts/publishPages.mjs`，workflow 只傳參數。

- 風險：修正 staging 時誤刪 production 或 `CNAME`  
  對策：staging 清理邏輯只刪除不安全殘留，並以單元測試鎖住合法 production 根目錄內容必須保留。

- 風險：只修 production，舊的 staging/root 汙染仍留在 `gh-pages`  
  對策：腳本每次執行都會先掃描並清除不安全 root 殘留，再同步目標內容。

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 無 | N/A | N/A |
