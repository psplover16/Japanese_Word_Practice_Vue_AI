# CI Pipeline Contract

## Scope

- 檔案：`.github/workflows/ci.yml`
- 目的：為 pull request 與 push 提供統一品質門檻

## Trigger Contract

- 必須在 `pull_request` 觸發
- 必須在 `push` 觸發
- 至少包含 `dev`、`main` 與 feature branches 的 push 驗證

## Step Contract

CI workflow 必須依序執行：

1. checkout
2. setup node
3. install dependencies
4. lint
5. typecheck
6. unit tests
7. build
8. e2e tests

## Failure Contract

- 任一步驟失敗即整體失敗
- e2e 失敗時必須保留診斷 artifact
- 不得使用 `continue-on-error` 將測試失敗視為成功
