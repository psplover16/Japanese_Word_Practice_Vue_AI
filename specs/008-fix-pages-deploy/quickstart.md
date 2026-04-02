# Quickstart: GitHub Pages 部署修正

## 1. 執行部署同步單元測試

```powershell
npx vitest run tests/unit/publishPages.spec.ts
```

預期結果：
- staging 發布只更新 `staging/`
- production 發布更新根目錄
- staging 會保留合法的 production 根目錄內容，但會清掉原始 repo 殘留與不安全 `index.html`

## 2. 驗證建置仍正常

```powershell
npm run build
```

預期結果：
- Vite build 成功
- `dist/index.html` 引用的是打包後資源，不是 `/src/app/main.ts`

## 3. 驗證 workflow 整合

完成實作後，檢查 `.github/workflows/cd.yml`：
- `main` 仍發布到 production URL
- `dev` 仍發布到 staging URL
- workflow 改為呼叫 `scripts/publishPages.mjs`

## 4. 部署後人工驗證

- 推送 `dev` 後開啟測試站網址，確認頁面可載入且不出現 `/src/*` 404
- 推送 `main` 後開啟正式站網址，確認頁面可載入且不出現 `/src/*` 404
