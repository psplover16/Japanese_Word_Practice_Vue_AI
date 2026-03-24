# Data Model: 測試與自動交付基礎建設

## ValidationCommand

- **Purpose**: 表示開發者或 CI 執行的一個標準驗證入口。
- **Fields**:
  - `name`: 指令名稱，例如 `lint`、`test:unit`、`test:e2e`
  - `scope`: `local`、`ci`、`local+ci`
  - `dependsOn`: 需要先完成的前置條件
  - `expectedOutcome`: 成功時的可觀察結果

## E2EScenario

- **Purpose**: 表示一條端對端驗證案例。
- **Fields**:
  - `id`: 穩定識別，例如 `smoke-app-shell`
  - `surface`: 主要涵蓋路由或畫面
  - `preconditions`: 啟動前必要條件
  - `actions`: 使用者操作序列
  - `assertions`: 驗證重點
  - `artifactsOnFailure`: 失敗時需保留的 trace、screenshot、report

## PipelineRun

- **Purpose**: 表示一次 CI workflow 執行。
- **Fields**:
  - `trigger`: `pull_request` 或 `push`
  - `steps`: install、lint、typecheck、unit、build、e2e
  - `status`: success / failure
  - `failureStage`: 失敗的步驟名稱
  - `diagnostics`: log 與 artifact 位置

## DeploymentTarget

- **Purpose**: 表示一個可部署環境。
- **Fields**:
  - `name`: `staging` 或 `production`
  - `branch`: `dev` 或 `main`
  - `pagesPath`: GitHub Pages 的目標路徑
  - `basePath`: build 使用的 base path
  - `approvalMode`: automatic 或 protected

## PublishArtifact

- **Purpose**: 表示由 `dist/` 產生並送往靜態站點的內容。
- **Fields**:
  - `sourceDir`: 本次建置輸出目錄
  - `targetBranch`: `gh-pages`
  - `targetSubpath`: `/` 或 `/staging`
  - `includesNoJekyll`: 是否產出 `.nojekyll`
