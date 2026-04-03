# Research: 修正網站與 PWA 圖示資產位置

## Decision 1: 採用根目錄 `public/` 作為正式公開資產位置

**Decision**: 把 favicon 與 PWA icons 複製到專案根目錄的 `public/`，並以此作為唯一正式公開來源。

**Rationale**:
- 使用者需求明確提到目前圖示在 `_private/_private_fileAssets/v1/public`，要複製到「一般專案通用的正確位置」。
- 對 Vite 專案而言，根目錄 `public/` 是最直觀、最常見的公開資產位置，能降低未來維護成本。
- 這能避免正式發布流程依賴 `_private/` 內的私人路徑。

**Alternatives considered**:
- 繼續使用 `vite.config.ts` 的客製 `publicDir` 指向 `_private/_private_fileAssets/v1/public`：雖然可行，但不符合本次「複製到通用位置」的需求，也會讓正式來源持續綁在私人目錄。

## Decision 2: 保留既有圖示內容，只調整正式發布來源

**Decision**: 不重新繪製圖示，也不更換檔名；直接沿用 `vite.ico` 與 `icons/{180,192,512}.png`，改放到根目錄 `public/`。

**Rationale**:
- 本次是位置修正，不是品牌重製。
- 維持既有檔名可以讓 `index.html`、PWA manifest、測試與部署驗證的改動最小。

**Alternatives considered**:
- 重新命名或重製圖示：超出 bug 修正範圍，也會增加回歸風險。

## Decision 3: 用測試與 build 驗證保護正式位置切換

**Decision**: 以 `tests/unit/publicAssets.spec.ts` 與 `npm run build` 作為主要驗證機制，確認正式來源已切到 `public/` 且 `dist/` 產物完整。

**Rationale**:
- 問題本質是「正式公開位置是否正確」，最有效的驗證點就是來源檔案與 build 輸出。
- 可避免只在設定檔表面修改字串，卻忘記真正補上 `public/` 內的檔案。

**Alternatives considered**:
- 只用瀏覽器手動確認：容易漏掉 manifest 或部署後的缺檔。

## Decision 4: 部署腳本沿用現狀，不新增額外同步流程

**Decision**: 不修改 `scripts/publishPages.mjs`，只確保 `dist/` 內容正確即可。

**Rationale**:
- 發布腳本只處理 `dist/` 到 Pages 目錄的同步，並不依賴圖示來源是在 `_private/` 或 `public/`。
- 維持部署腳本不變可降低影響面。

**Alternatives considered**:
- 在部署腳本內額外加入圖示複製步驟：會重複 Vite `public/` 的責任，增加維護複雜度。
