# Data Model: GitHub Pages 部署修正

## Entity: PublishTarget

- **Purpose**: 描述本次發布要更新的公開站點目標。
- **Fields**:
  - `name`: `production` 或 `staging`
  - `publishSubdir`: 目標子目錄，production 為空字串，staging 為 `staging`
  - `siteUrl`: 對外驗證網址
  - `preservedRootEntries`: 發布時根目錄允許保留的項目集合
- **Rules**:
  - production 必須寫入根目錄
  - staging 只能寫入 `staging/`
  - 兩種目標都不得留下原始 repo 檔案

## Entity: PublishWorkspace

- **Purpose**: 表示 `gh-pages` worktree 的目前狀態與可變更範圍。
- **Fields**:
  - `rootPath`: worktree 根路徑
  - `existingEntries`: 目前根目錄項目清單
  - `targetPath`: 本次同步的實際目標位置
  - `distPath`: build 產物來源位置
- **Rules**:
  - 根目錄清理必須先於內容同步
  - 清理時僅可保留 allowlist 內項目
  - `targetPath` 必須存在或可被建立

## Entity: PublishRun

- **Purpose**: 記錄一次發布操作的輸入、處理結果與狀態訊號。
- **Fields**:
  - `sourceBranch`: 觸發發布的來源分支
  - `target`: 對應的 `PublishTarget`
  - `hasChanges`: 是否真的有新內容要提交
  - `status`: `prepared`、`synced`、`skipped`、`failed`
  - `messages`: 給維護者閱讀的結果摘要
- **Rules**:
  - `hasChanges = false` 時，必須回報明確的 skipped 訊號
  - `failed` 必須附帶可定位問題的訊息
  - 一次 `PublishRun` 只能對應一個 `PublishTarget`
