# Quickstart: 補回網站 Icon 與 PWA 資產

## 1. 驗證公開資產設定與來源

```powershell
npx vitest run tests/unit/publicAssets.spec.ts
```

預期結果：
- 測試確認公開資產來源設定與必要素材存在
- 測試會產生暫時 build 輸出，驗證首頁 favicon、manifest 與 icon 檔案都能進入可發布產物

## 2. 驗證建置輸出

```powershell
npm run build
```

預期結果：
- `dist/index.html` 包含 favicon 連結
- `dist/manifest.webmanifest` 包含安裝 icon 路徑
- `dist/vite.ico`、`dist/icons/180.png`、`dist/icons/192.png`、`dist/icons/512.png` 都存在
- `dist/` 內不應出現引用 `_private/_private_fileAssets/public` 的舊路徑

## 3. 人工檢查

- 以桌面瀏覽器開啟站點，確認頁籤 icon 顯示正常
- 在支援 PWA 的瀏覽器環境下，確認站點具備可辨識的安裝資產
