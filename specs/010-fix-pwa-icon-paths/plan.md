# Implementation Plan: 修正網站與 PWA 圖示資產位置

**Branch**: `010-fix-pwa-icon-paths` | **Date**: 2026-04-03 | **Spec**: [spec.md](C:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/specs/010-fix-pwa-icon-paths/spec.md)
**Input**: Feature specification from `/specs/010-fix-pwa-icon-paths/spec.md`

## Summary

把目前位於 `_private/_private_fileAssets/v1/public` 的 favicon 與 PWA icon 複製到 Vite 慣例的根目錄 `public/`，讓入口頁與 PWA manifest 改由標準公開資產位置提供圖示。實作會保留現有圖示內容，只調整正式公開位置、驗證機制與相關文件，避免未來再依賴私人路徑作為正式發布來源。

## Technical Context

**Language/Version**: TypeScript 5.9、Node.js 22、Vue 3、Vite 7  
**Primary Dependencies**: Vue 3、Vite 7、vite-plugin-pwa、Vitest 3、Playwright  
**Storage**: Git tracked 靜態公開資產、Vite build 輸出、GitHub Pages 發布內容  
**Testing**: Vitest 單元測試、`npm run build`、必要時檢查 `dist/` 輸出檔  
**Target Platform**: 桌面瀏覽器、支援 PWA 的現代瀏覽器、GitHub Pages  
**Project Type**: 單一 Vite/Vue Web App  
**Performance Goals**: 圖示位置修正不得增加額外執行期請求失敗；首頁與 manifest 載入不得因圖示缺失產生 404 或 console error  
**Constraints**: 不重畫圖示、不改動既有路由與學習模組互動；正式發布來源需回到標準 `public/`；需同步回寫 originating spec 與 `PROJECT_ARCHITECTURE.md`  
**Scale/Scope**: 1 個新 `public/` 目錄、4 個圖示檔案搬移或複製、少量設定調整、少量測試與文件回寫

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- 文件以繁體中文撰寫，符合規範。
- `.gitignore` 已存在，`node_modules/`、`dist/`、`coverage/` 等可重建產物維持不提交。
- 本次會新增根目錄 `public/` 並調整公開資產責任，必須更新 `PROJECT_ARCHITECTURE.md`。
- 本次是對既有 PWA 公開資產修補方案的再調整，需在同一工作項目更新 originating spec `specs/009-restore-pwa-assets/spec.md`，避免文件仍聲明私人目錄是正式公開來源。
- 測試策略已先定義：以 `tests/unit/publicAssets.spec.ts` 與 `npm run build` 驗證根目錄 `public/`、首頁、manifest 與 build 輸出。
- 作用範圍限定在入口圖示、PWA 圖示、Vite 公開資產設定與部署文件；`src/modules/*` 畫面、互動與路由屬負向範圍，不應改動。
- 方案使用 Vite 慣例 `public/` 目錄作為最小且可維護的做法，不引入額外同步服務或複雜資產管線。

## Project Structure

### Documentation (this feature)

```text
specs/010-fix-pwa-icon-paths/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- public-assets-contract.md
`-- tasks.md
```

### Source Code (repository root)

```text
public/
|-- vite.ico
`-- icons/
    |-- 180.png
    |-- 192.png
    `-- 512.png

src/
`-- shared/
    `-- config/
        `-- publicAssets.ts

tests/
`-- unit/
    `-- publicAssets.spec.ts

vite.config.ts
index.html
PROJECT_ARCHITECTURE.md
specs/
|-- 009-restore-pwa-assets/
|   `-- spec.md
`-- 010-fix-pwa-icon-paths/
    |-- spec.md
    |-- plan.md
    |-- research.md
    |-- data-model.md
    |-- quickstart.md
    `-- contracts/
```

**Structure Decision**: 維持單一 Vite/Vue 專案，正式公開圖示改放在根目錄 `public/`，並讓 `vite.config.ts`、`index.html`、PWA manifest 與測試都以該位置為共同依據；私人 `_private/_private_fileAssets/v1/public` 僅保留為原始參考來源，不再作為正式發布來源。

**Architecture Document Impact**: 需要更新 `PROJECT_ARCHITECTURE.md`，補上根目錄 `public/` 的用途，並把公開圖示責任從 `vite.config.ts -> _private/_private_fileAssets/v1/public` 改為 `public/` 與 `src/shared/config/publicAssets.ts` 的共同說明。

## Phase 0: Research

1. 確認目前 `index.html`、`vite.config.ts`、`src/shared/config/publicAssets.ts` 與 `tests/unit/publicAssets.spec.ts` 仍以 `_private/_private_fileAssets/v1/public` 作為正式公開資產來源。
2. 確認需求要的是「複製到通用正確位置」，因此採用 Vite 慣例的根目錄 `public/` 比維持客製 `publicDir` 更符合長期維護性。
3. 確認 `scripts/publishPages.mjs` 只同步 `dist/`，因此只要 build 輸出維持正確，部署腳本不需要額外改動。

## Phase 1: Design

1. 定義正式公開資產位置為根目錄 `public/`，檔案包含 `public/vite.ico` 與 `public/icons/{180,192,512}.png`。
2. 調整 `src/shared/config/publicAssets.ts` 的責任，讓它描述正式公開圖示檔名與驗證對象，而不是私人來源目錄。
3. 移除或縮減 `vite.config.ts` 對客製 `publicDir` 的依賴，改以標準公開目錄提供 favicon 與 PWA icon。
4. 更新 `tests/unit/publicAssets.spec.ts`，驗證正式來源在 `public/`，並持續檢查根路徑與子路徑 build 下的 `dist/index.html`、`dist/manifest.webmanifest` 與 `dist/icons/*`。
5. 規劃文件回寫：`specs/009-restore-pwa-assets/spec.md`、`PROJECT_ARCHITECTURE.md`、本 feature quickstart。

## Phase 2: Implementation Strategy

1. 先補或更新測試，讓它們先失敗並明確反映「正式公開資產必須在 `public/`」。
2. 複製 favicon 與 PWA icons 到根目錄 `public/` 與 `public/icons/`。
3. 調整 `src/shared/config/publicAssets.ts`、`vite.config.ts` 與必要入口設定，改為使用標準公開資產位置。
4. 執行 `npx vitest run tests/unit/publicAssets.spec.ts`、根路徑 `npm run build` 與子路徑 build 驗證。
5. 回寫 `specs/009-restore-pwa-assets/spec.md` 與 `PROJECT_ARCHITECTURE.md`，確保文件與最終做法一致。

## Test Strategy

- `tests/unit/publicAssets.spec.ts`
  - 驗證正式公開資產來源為根目錄 `public/`
  - 驗證 `public/vite.ico` 與 `public/icons/*.png` 都存在
  - 驗證 `dist/index.html` 仍引用 favicon
  - 驗證 `dist/manifest.webmanifest` 列出可公開存取的 icon 路徑
  - 驗證子路徑 build 時 icon 與 manifest 路徑仍正確
  - 驗證 `dist/` 內確實存在 favicon 與 PWA icons
- `npm run build`
  - 驗證一般建置流程在標準 `public/` 目錄下仍成功
  - 驗證子路徑部署設定下的 build 仍可產出正確 icon 與 manifest 路徑
  - 驗證 build 產物可直接供 GitHub Pages 發布腳本同步

## Risk Mitigation

- 風險：只改測試或常數，卻沒有真的把圖示複製到標準公開位置  
  對策：把 `public/` 實體檔案存在檢查與 build 輸出存在檢查一起納入驗證。

- 風險：保留客製 `publicDir` 與新增 `public/` 並存，造成來源混亂  
  對策：明確指定 `public/` 為唯一正式公開位置，並在文件中寫明 `_private` 僅是原始參考來源。

- 風險：文件仍保留舊敘述，讓後續維護者誤以為私人目錄才是正式來源  
  對策：把 `specs/009-restore-pwa-assets/spec.md` 與 `PROJECT_ARCHITECTURE.md` 納入同一工作項目回寫。

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 無 | N/A | N/A |
