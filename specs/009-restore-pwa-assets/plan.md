# Implementation Plan: 補回網站 Icon 與 PWA 資產

**Branch**: `009-restore-pwa-assets` | **Date**: 2026-04-03 | **Spec**: [spec.md](C:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/specs/009-restore-pwa-assets/spec.md)
**Input**: Feature specification from `/specs/009-restore-pwa-assets/spec.md`

## Summary

修正網站桌面 icon 與 PWA 安裝資產未對外生效的問題。已確認目前專案實際資產位於 `_private/_private_fileAssets/v1/public`，但 [vite.config.ts](C:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/vite.config.ts) 的 `publicDir` 指向 `_private/_private_fileAssets/public`，造成桌面 icon 與 PWA 圖示來源失配。實作會以最小變更修正公開資產來源，補上對 build 輸出與關鍵公開檔案的驗證，並同步更新 originating spec 與架構文件。

## Technical Context

**Language/Version**: TypeScript 5.9、Node.js 22、Vue 3、Vite 7  
**Primary Dependencies**: Vue 3、Vite 7、vite-plugin-pwa、Vitest 3、Playwright  
**Storage**: 靜態公開資產檔案、Vite build 產物、GitHub Pages 發布內容  
**Testing**: Vitest 單元測試、`npm run build`、必要時檢查 `dist/` 輸出檔  
**Target Platform**: 桌面瀏覽器、支援 PWA 的現代瀏覽器、GitHub Pages  
**Project Type**: 單一 Vite/Vue Web App  
**Performance Goals**: 資產修正不得增加顯著 bundle 負擔；首頁初始載入不得因 icon/PWA 資產缺失產生 404 或 console error  
**Constraints**: 不改變既有產品畫面與互動；優先使用現有 `_private/_private_fileAssets/v1/public` 資產；需同步更新 `PROJECT_ARCHITECTURE.md` 與 originating spec  
**Scale/Scope**: 1 個 Vite 公開資產設定、少量驗證測試、少量規格與架構文件回寫

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- 文件會以繁體中文撰寫，符合規範。
- `.gitignore` 已存在，本次不提交 `dist/` 等可重建產物。
- 本次若調整公開資產來源責任，必須更新 `PROJECT_ARCHITECTURE.md`。
- 本次修正屬於既有 PWA/部署行為修補，需同步更新 originating spec，避免規格與實際行為脫節。
- 測試策略已定義：以 build 驗證為主，必要時加上單元測試鎖住公開資產設定與輸出結果。
- 功能範圍限定在公開資產來源、PWA icon 設定與文件；`src/modules/*` 畫面與互動屬負向範圍，不應改動。
- 方案採最小必要修補，避免為單純資產來源問題引入不必要複雜度。

## Project Structure

### Documentation (this feature)

```text
specs/009-restore-pwa-assets/
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
vite.config.ts
tests/
`-- unit/
    `-- publicAssets.spec.ts

_private/
`-- _private_fileAssets/
    `-- v1/
        `-- public/
            |-- vite.ico
            `-- icons/

src/
`-- shared/
    `-- config/
        `-- publicAssets.ts

specs/
|-- 001-japanese-pwa-study/
|   `-- spec.md
`-- 009-restore-pwa-assets/
    |-- spec.md
    |-- plan.md
    |-- research.md
    |-- data-model.md
    |-- quickstart.md
    |-- tasks.md
    `-- contracts/

PROJECT_ARCHITECTURE.md
```

**Structure Decision**: 保持單一 Vite/Vue 專案結構，只修正公開資產來源設定與必要測試；新增一個輕量的 `src/shared/config/publicAssets.ts` 作為設定單一來源，避免路徑再度分歧。

**Architecture Document Impact**: 需要更新 `PROJECT_ARCHITECTURE.md`，說明 `_private/_private_fileAssets/v1/public` 與 `vite.config.ts` 之間的公開資產責任。

## Phase 0: Research

1. 確認實際 icon 與 PWA 圖示檔存在於 `_private/_private_fileAssets/v1/public` 與其 `icons/` 子目錄。
2. 確認 [vite.config.ts](C:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/vite.config.ts) 的 `publicDir` 目前指向 `_private/_private_fileAssets/public`，與實際資產來源不一致。
3. 確認目前 build 產物已包含 manifest 與 icon 連結格式，但需要讓來源路徑穩定對應到正確資產目錄。

## Phase 1: Design

1. 定義「私人資產來源」與「可公開發布資產來源」之間的責任模型。
2. 調整 Vite 公開資產來源到正確的可發布目錄。
3. 補上驗證：
   - build 後 `dist/index.html` 應引用正確 favicon
   - build 後 `dist/manifest.webmanifest` 應列出可存取的 icon 路徑
   - `dist/` 應實際包含對應 icon 檔案

## Phase 2: Implementation Strategy

1. 先寫或補充 `tests/unit/publicAssets.spec.ts`，鎖住公開資產來源與 icon/PWA 輸出需求。
2. 修正 [vite.config.ts](C:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/vite.config.ts) 的公開資產來源與必要設定。
3. 執行 `npm run build` 驗證 `dist/` 內容。
4. 回寫 [spec.md](C:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/specs/001-japanese-pwa-study/spec.md) 或其他 originating spec，以及 `PROJECT_ARCHITECTURE.md`。

## Test Strategy

- `tests/unit/publicAssets.spec.ts`
  - 驗證公開資產來源設定指向正確目錄
  - 驗證必要 icon 與 PWA 圖示檔案存在
  - 以暫時 build 輸出驗證 `index.html`、`manifest.webmanifest` 與 icon 產物
- `npm run build`
  - 驗證 `dist/index.html` 有 favicon 連結
  - 驗證 `dist/manifest.webmanifest` 列出 icon
  - 驗證 `dist/vite.ico` 與 `dist/icons/*` 實際存在

## Risk Mitigation

- 風險：只修 manifest 內容，卻沒有真正輸出資產檔  
  對策：把 `dist/` 內檔案存在檢查納入驗證。

- 風險：直接搬動私人資產結構造成其他功能受影響  
  對策：優先修正公開資產來源設定，不任意重組私人素材目錄。

- 風險：只修桌面 icon，PWA icon 仍遺失  
  對策：把 favicon、manifest 與 icon 實體檔案一起列入同一組驗證。

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 無 | N/A | N/A |
