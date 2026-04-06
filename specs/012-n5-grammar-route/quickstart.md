# Quickstart: N5 文法學習子路由

## 1. 開發前準備

1. 確認目前 branch 為 `012-n5-grammar-route`
2. 安裝依賴：

```powershell
npm install
```

## 2. 啟動本機開發

```powershell
npm run dev
```

瀏覽 `/n5-grammar`，確認頁面已不再只是「製作中」占位訊息。

## 3. 手動驗證重點

1. 檢查 `N5文法` 子路由是否顯示多個可收合主題群組。
2. 檢查每個主題群組標題列右側是否有展開/收合控制。
3. 檢查標題與說明是否分離顯示。
4. 檢查每個文法主題是否至少有一段說明與一個例句。
5. 檢查助詞群組是否位於所有主題的最後。
6. 在約 375px 寬度下檢查頁面是否無水平破版，且展開內容仍可讀。
7. 檢查 `/grammar`、`/practice`、`/vocabulary` 未被混入 N5 文法內容。

## 4. 自動驗證指令

```powershell
npm run lint
npm run typecheck
npm run test -- N5Grammar
npm run test:e2e -- --grep "n5-grammar"
```

若測試過濾方式與現有腳本不符，可直接執行：

```powershell
npm run test:unit
npm run test:e2e
```

## 5. 文件同步

若新增 N5 文法資料模組、元件或測試檔，完成實作後同步更新：

- `PROJECT_ARCHITECTURE.md`
- `specs/012-n5-grammar-route/spec.md`（若行為與原規格有可見差異）
