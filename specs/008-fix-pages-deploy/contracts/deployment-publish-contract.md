# Contract: GitHub Pages 發布契約

## Purpose

定義 production 與 staging 發布時，`gh-pages` worktree 必須滿足的內容契約，讓 workflow、腳本與測試共用同一組規則。

## Inputs

- `worktreeRoot`: `gh-pages` worktree 根目錄
- `distPath`: 本次 build 產物來源
- `target`: `production` 或 `staging`
- `publishSubdir`: production 為空字串，staging 為 `staging`

## Invariants

1. 發布前必須先清理 `worktreeRoot` 中不允許保留的項目。
2. 根目錄只允許永久保留以下項目：
   - `.git`
   - `.nojekyll`
   - `staging/`
   - `CNAME`
3. production 發布後：
   - `dist/` 內容必須位於 `worktreeRoot`
   - `staging/` 若已存在必須保留
   - 不得留下原始 repo 檔案或 `/src/` 導向入口頁
4. staging 發布後：
   - `dist/` 內容必須位於 `worktreeRoot/staging`
   - 合法的 production 根目錄內容不得被 staging 內容覆蓋
   - 原始 repo 檔案與會引用 `/src/` 的根目錄入口頁必須被移除
5. 首次 orphan branch 初始化後，Git index 與工作樹都必須是乾淨的發布空間。

## Observable Outputs

- 成功時輸出目標名稱與同步位置
- 無變更時輸出明確的 skipped 訊息
- 失敗時輸出具體錯誤並返回非零狀態
