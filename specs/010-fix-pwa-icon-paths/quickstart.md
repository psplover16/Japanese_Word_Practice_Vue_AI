# Quickstart: 修正網站與 PWA 圖示資產位置

## 1. 準備圖示資產

確認下列檔案已存在於根目錄 `public/`：

- `public/vite.ico`
- `public/icons/180.png`
- `public/icons/192.png`
- `public/icons/512.png`

這些檔案應與既有正式圖示內容一致，不需要重新設計。
根目錄 `public/` 是唯一正式公開來源；`_private/_private_fileAssets/v1/public` 僅保留為原始參考素材位置。

## 2. 驗證正式公開來源

執行：

```powershell
npx vitest run tests/unit/publicAssets.spec.ts
```

預期結果：

- 測試確認正式公開資產來源已切換到 `public/`
- 測試確認 favicon 與 PWA icon 檔案都存在
- 測試確認 build 後的首頁與 manifest 只引用公開可發布路徑

## 3. 驗證 build 輸出

執行：

```powershell
npm run build
```

預期結果：

- `dist/index.html` 含有 favicon 連結
- `dist/manifest.webmanifest` 含有 PWA icon 宣告
- `dist/vite.ico` 與 `dist/icons/*.png` 都存在

## 4. 驗證子路徑部署輸出

執行：

```powershell
$env:VITE_APP_BASE_PATH = '/staging/'
npm run build
Remove-Item Env:VITE_APP_BASE_PATH
```

預期結果：

- build 可成功完成
- `dist/index.html` 與 `dist/manifest.webmanifest` 內的 icon 路徑仍指向可公開存取位置
- `dist/vite.ico` 與 `dist/icons/*.png` 仍存在，可供 staging 發布流程使用

## 5. 驗證負向範圍

確認本次變更沒有修改下列範圍：

- `src/modules/practice/`
- `src/modules/grammar/`
- `src/modules/vocabulary/`
- 任一路由與頁面互動流程

## 6. 文件回寫

完成實作後，同步更新：

- `specs/009-restore-pwa-assets/spec.md`
- `PROJECT_ARCHITECTURE.md`
- 本 feature 的 `plan.md`、`tasks.md` 與必要驗證說明
