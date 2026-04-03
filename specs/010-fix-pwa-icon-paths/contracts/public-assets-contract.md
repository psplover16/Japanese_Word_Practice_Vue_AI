# Contract: 標準公開圖示資產契約

## Purpose

定義網站 favicon 與 PWA 安裝圖示在切換到根目錄 `public/` 後必須滿足的公開資產條件。

## Inputs

- `public/` 目錄中的正式圖示檔案
- `index.html`
- `vite.config.ts`
- 建置後的 `dist/index.html`
- 建置後的 `dist/manifest.webmanifest`

## Invariants

1. 正式公開圖示來源必須是根目錄 `public/`，而不是 `_private/` 內的私人目錄。
2. 首頁必須能透過公開路徑載入 favicon。
3. manifest 必須列出所有必要的 PWA icon，且這些路徑都能對應到可發布檔案。
4. `dist/` 內必須存在 `vite.ico` 與 `icons/180.png`、`icons/192.png`、`icons/512.png`。
5. 本次修正不得改變 `/practice`、`/grammar`、`/vocabulary` 的路由與互動行為。

## Observable Outputs

- `public/vite.ico`
- `public/icons/180.png`
- `public/icons/192.png`
- `public/icons/512.png`
- `dist/index.html` 含 favicon 連結
- `dist/manifest.webmanifest` 含 PWA icon 陣列
- `dist/vite.ico`
- `dist/icons/180.png`
- `dist/icons/192.png`
- `dist/icons/512.png`
