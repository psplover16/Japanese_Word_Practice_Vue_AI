# Contract: GitHub Pages Deployment Simplification

## Scope

- In scope: `.github/workflows/cd.yml`, README, `PROJECT_ARCHITECTURE.md`
- Out of scope: CI validation steps, app business logic, non-pages hosting providers

## Branch Mapping

- `dev` -> `staging`
- `main` -> `production`

## Path Mapping

- `staging` 發佈到 `gh-pages/staging/`
- `production` 發佈到 `gh-pages/`

## Build Contract

- staging build 必須使用 `/<repo>/staging/` base path
- production build 必須使用 `/<repo>/` base path
- router 與 PWA manifest 必須與 build base path 一致

## Cleanup Contract

- staging 部署前只能清空 `gh-pages/staging/` 內容
- production 部署前只能清空 production root 內容，且必須保留 `staging/`
- 若 `gh-pages` 尚未存在，workflow 必須能建立或明確失敗並提供可診斷訊息

## Failure Contract

- build、copy、commit、push 任一步驟失敗時，workflow 必須失敗
- 失敗時不得留下已部分清理但未完整更新的不可追蹤狀態
- 文件中的部署說明必須與 workflow 實際行為一致
