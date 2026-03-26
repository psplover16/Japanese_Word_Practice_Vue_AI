# Quickstart: 測試與自動交付基礎建設

## 1. 安裝相依

```powershell
npm ci
npx playwright install chromium
```

## 2. 本地驗證

```powershell
npm run lint
npm run typecheck
npm run test:unit
npm run build
npm run test:e2e
```

若只想跑單一類型：

```powershell
npm run test:unit
npm run test:e2e
```

## 3. CI 預期行為

- `pull_request` 與 `push` 會自動跑完整 CI。
- 任一步驟失敗，整個 workflow 狀態應為 failed。
- e2e 失敗時，應能在 Actions artifact 看到 `playwright-report` 與 `test-results`。

## 4. CD 預期行為

- 推送到 `dev`：部署到 staging URL
- 推送到 `main`：部署到 production URL
- 若 `production` environment 啟用保護規則，workflow 會停在核准點等待人工核准

## 5. GitHub Repository 設定

在 GitHub repository 設定中確認：

1. 啟用 GitHub Pages，來源分支設為 `gh-pages`
2. 建立 `staging` 與 `production` environments
3. 若需要正式環境人工核准，為 `production` 加上 required reviewers

## 6. 排查重點

- e2e 白屏或 404：先確認 build base path 與 router base 是否一致
- Pages 沒更新：確認 `gh-pages` 分支是否成功推送
- staging 覆蓋 production：確認部署腳本是否只清理目標子目錄
- 本地 e2e 啟不來：確認 Playwright browser 已安裝
