# Contract: 公開 Icon 與 PWA 資產契約

## Purpose

定義桌面 icon 與 PWA 安裝圖示在 build 與部署後必須滿足的公開資產條件。

## Inputs

- `publicAssetSource`: Vite build 使用的公開資產來源
- `indexHtml`: 建置後首頁
- `manifest`: 建置後 manifest

## Invariants

1. 首頁必須引用可公開存取的 favicon 路徑。
2. manifest 必須列出可公開存取的 PWA icon 路徑。
3. 所有被首頁或 manifest 引用的 icon 檔案都必須存在於可發布產物。
4. icon 與 PWA 圖示不得只存在於私人來源目錄而未進入 build 輸出。
5. 本次修正不得改變既有頁面路由與主要互動行為。

## Observable Outputs

- `dist/index.html` 含 favicon 連結
- `dist/manifest.webmanifest` 含 icon 陣列
- `dist/vite.ico`
- `dist/icons/180.png`
- `dist/icons/192.png`
- `dist/icons/512.png`
