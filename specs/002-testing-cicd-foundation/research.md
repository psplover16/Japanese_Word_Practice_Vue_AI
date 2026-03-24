# Research: 測試與自動交付基礎建設

## Decision 1: 沿用既有 Vitest，補齊 scripts 而非重建 unit framework

- **Decision**: 保留現有 Vitest + Vue Test Utils 設定，新增清楚的 npm scripts 與一個純工具模組測試。
- **Rationale**: repo 已經存在 `vitest.config.ts` 與多個 `tests/unit/*.spec.ts`，繼續擴充成本最低，也最符合「最小可用 foundation」目標。
- **Alternatives considered**:
  - 重新改用 Jest：遷移成本高，沒有實質價值。
  - 只保留現況不新增 scripts：CI/CD 與新進開發者入口仍不夠清楚。

## Decision 2: 使用 Playwright 作為 e2e 工具

- **Decision**: 新增 Playwright 設定與 `tests/e2e/`。
- **Rationale**: Playwright 對 Vite 前端專案整合成熟，支援自動啟站、trace、screenshot 與 CI artifact，適合建立第一版 smoke + core flow。
- **Alternatives considered**:
  - Cypress：也可行，但在目前 repo 中沒有既有基礎，且多瀏覽器與 artifact 體驗不如 Playwright 直接。
  - 只靠 component tests：無法驗證真正的瀏覽器路由、資產載入與整體流程。

## Decision 3: CI 以單一 workflow 執行完整品質門檻

- **Decision**: 建立單一 `ci.yml`，固定執行 install、lint、typecheck、unit、build、e2e。
- **Rationale**: 對小型單 repo 前端專案來說，單一 workflow 最容易理解與維護，也符合 PR gate 需求。
- **Alternatives considered**:
  - 拆成多條 workflow：視覺上較分散，初期維護成本較高。
  - 不跑 typecheck：現有 repo 已有 `vue-tsc`，略過會降低信心。

## Decision 4: CD 承載採 GitHub Pages，使用 `gh-pages` root + `staging/`

- **Decision**: 使用 GitHub Pages 作為靜態部署目標，`main` 部署網站根路徑，`dev` 部署到 `staging/` 子路徑。
- **Rationale**: repo 已有 GitHub remote，且專案為純前端靜態站；此方案不需要外部雲端平台金鑰，能最快達成 staging/prod 分流。
- **Alternatives considered**:
  - Netlify / Vercel：需要額外平台與 secrets，超出目前最小可用目標。
  - GitHub Pages 單一路徑：無法同時表達 staging 與 production。

## Decision 5: 以 build-time env 控制 base path 與 start_url

- **Decision**: `vite.config.ts` 改為讀取 `VITE_APP_BASE_PATH` 與 `VITE_APP_START_URL`，router 使用 `import.meta.env.BASE_URL`。
- **Rationale**: 可在不影響本地開發 `/` 路徑的前提下，讓 staging/prod 產物各自擁有正確 base。
- **Alternatives considered**:
  - 硬編碼 repo 名稱與 staging path：可行但較不彈性，未來搬 repo 或改路徑時成本較高。
  - 只改 Vite `base` 不改 router：會造成歷史路由與靜態資產設定不一致。
