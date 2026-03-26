# Deployment Contract

## Scope

- 檔案：`.github/workflows/cd.yml`、`scripts/publishPages.mjs`
- 目標：GitHub Pages

## Branch Mapping

- `dev` -> `staging`
- `main` -> `production`

## Path Mapping

- `staging` 發佈到 `gh-pages/staging/`
- `production` 發佈到 `gh-pages/`

## Build Contract

- staging build 必須使用 `/Japanese_Word_Practice_Vue_AI/staging/` base path
- production build 必須使用 `/Japanese_Word_Practice_Vue_AI/` base path
- router 與 PWA manifest 必須與 build base path 一致

## Failure Contract

- `gh-pages` 推送失敗時，workflow 必須失敗
- 缺少 Pages 啟用或環境保護未通過時，workflow 必須保留明確錯誤
- staging 部署不得清空 production root
- production 部署不得刪除 `staging/` 子目錄
