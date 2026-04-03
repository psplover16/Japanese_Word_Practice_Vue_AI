# Quickstart: 路由切換與 N5 文法入口優化

## Goal

驗證共享頁首已改為只有 route tabs、`/practice` 指定表格文字已放大，且新的 `N5文法` route 可正常作為 placeholder 頁進入。

## Manual Verification Steps

1. 執行 `npm run dev`。
2. 開啟 `/practice`。
3. 確認頁首左側不再顯示舊的 route title，例如 `50音`。
4. 確認共享頁首只顯示四個主路由按鈕，順序為：
   - `字母練習`
   - `變化規則`
   - `單字練習`
   - `N5文法`
5. 將瀏覽器寬度調整為約 `375px`，確認：
   - tabs 靠左排列
   - 若單列放不下可換列
   - 每顆按鈕內的文字都維持單行
   - 頁面沒有水平捲動
6. 在 `/practice` 檢查清音表與濁音／半濁音表，確認文字比現況明顯放大，且假名與羅馬音之間有固定 `4px` 間距，沒有裁切、重疊或儲存格錯位；若原先目標約 `1.1x` 在極窄寬度下會破版，允許微幅下修，但最終仍需明顯大於現況。
7. 點擊 `變化規則` 與 `單字練習`，確認既有主內容仍為原本版本，沒有出現 `製作中`。
8. 點擊 `N5文法`，確認成功進入新 route，且首屏主要內容顯示 `製作中`。
9. 直接在網址列輸入新 route URL，重新載入後確認仍能看到 `製作中`，且沒有 console error。

## Automated Verification Targets

- `npm run lint`
- `npm run typecheck`
- `npm run test:unit`
- `npm run build`
- `npx playwright test tests/e2e/app-shell.smoke.spec.ts tests/e2e/practice-layout.smoke.spec.ts`
