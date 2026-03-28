# Data Model: 練習頁與部署流程調整

## LatestUnknownResultSnapshot

### Purpose

代表最近一次不熟題目結果的快照，是上方工具列清除與下方結果區清除共同操作的資料來源。

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `updatedAt` | ISO datetime string | 最近一次結果寫入時間，用於判斷顯示與捲動時機 |
| `totalUnknownCount` | number | 最近一次測驗累計被標記不熟的總次數 |
| `results` | `LatestUnknownResultEntry[]` | 題目結果列表 |

### Rules

- 當 `results` 為空或 snapshot 為 `null` 時，下方結果區不得顯示可操作的最近結果內容。
- 上方與下方清除行為都必須把 snapshot 清成空值，不得出現只清其中一方顯示狀態的情況。

## ResultPanelClearIntent

### Purpose

描述最近結果清除行為的互動來源，用於決定是否在清除後平滑回頂。

### Values

| Value | Description |
|-------|-------------|
| `toolbar` | 來自上方工具列的清除操作，只清資料，不強制回頂 |
| `result-panel` | 來自下方結果區的清除操作，清資料後需平滑回頂 |

### Rules

- 這是 view-layer 意圖，不得寫入 localStorage。
- 同一份 snapshot 清除邏輯必須支援兩種 intent，而不是建立兩套資料流程。

## ExamModalPromptLayout

### Purpose

描述測驗彈窗中央考試區塊最上方題目列在不同 viewport 下的排版要求。

### Attributes

| Attribute | Description |
|-----------|-------------|
| `promptScale` | 相對現況約 2.5 倍的視覺字級 |
| `contentSpacing` | 題目、答案、提示之間的垂直間距 |
| `cardBounds` | modal 卡片寬高與最大可視範圍 |

### Rules

- 題目列放大後仍需保留答案列、提示列與操作按鈕的可見性。
- 在 375px、768px、1024px 下不可產生文字裁切、重疊或水平溢出。

## DeploymentTarget

### Purpose

定義 CD workflow 對應的部署環境與 `gh-pages` 目標位置。

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `branch` | enum (`dev`, `main`) | 觸發部署的來源分支 |
| `environmentName` | enum (`staging`, `production`) | GitHub environment 名稱 |
| `pagesSubdir` | string | 在 `gh-pages` 上的目標子目錄；production 為 root，staging 為 `staging/` |
| `basePath` | string | build 時注入的 app base path |
| `preservedPaths` | string[] | 清理目標目錄時不可誤刪的路徑 |

### Rules

- `dev` 只能更新 `gh-pages/staging/`，不得觸碰 production root 內容。
- `main` 更新 production root 時，必須保留 `gh-pages/staging/`。
- 若部署失敗或 push 失敗，workflow 必須明確失敗，不可默默略過。
