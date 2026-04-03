# Quickstart: 日語學習 PWA

## 1. 安裝依賴

```bash
npm install
```

## 2. 啟動開發環境

```bash
npm run dev
```

## 3. 驗證主要流程

### 流程 A：第一頁勾選與考試

1. 進入 `/practice`，確認頁首不再顯示獨立 route title，且共享 route tabs 中可看到 `字母練習`。
2. 勾選 `tableA` / `tableB` 任意假名，確認 `[題數]` 會自動重新計算。
3. 勾選 `促音` 或 `拗音／合拗音／長音符`，再切換路由後回來，確認勾選狀態仍保留。
4. 按下 `送出`，確認 modal 開啟。
5. 在答案揭曉前後都嘗試按 `我不清楚`，確認同一題只記錄一次。
6. 按右上角關閉按鈕並確認，確認 modal 關閉且結果區立即更新。

### 流程 B：第二頁與第三頁共享明細

1. 在 `/practice` 勾選一個 `tableA` 假名、一個 `tableB` 假名與一個功能選項。
2. 切換到 `/grammar`，確認畫面顯示這些項目的實際文字。
3. 切換到 `/vocabulary`，確認畫面同樣顯示這些項目的實際文字。
4. 回到 `/practice`，確認不存在 `第一頁勾選結果明細` 專屬 panel。

### 流程 C：375px 響應式

1. 把 viewport 設為 `375px`。
2. 檢查 `tableA`、`tableB`，確認無滾動條、無裁切、無重疊。
3. 檢查 `table撥音`、`table促音`，確認左欄寬度由內容撐起，不是固定欄寬。

### 流程 D：PWA

1. 執行 `npm run build`。
2. 在支援 PWA 的瀏覽器安裝網站。
3. 關閉網路後重新開啟網站，確認四個主要路由仍可進入。
4. 模擬新版本時，確認只有在手機獨立 app 模式下才出現底部更新提示。

## 4. 驗證指令

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```
