# Research: GitHub Pages 部署修正

## Decision 1: 將發布清理邏輯抽成 Node 腳本

**Decision**: 新增 `scripts/publishPages.mjs`，由 GitHub Actions workflow 呼叫，而不是把所有清理規則都留在 shell 指令裡。

**Rationale**:
- 目前 bug 的核心在於發布邏輯，而非 Vue 應用本身。
- shell 片段很難在本地做穩定測試，抽成 Node 腳本後可直接用 Vitest 驗證 production/staging 行為。
- 可以把「保留哪些根目錄項目」「如何清理首次發布殘留內容」集中管理，降低後續維護風險。

**Alternatives considered**:
- 只補 `cd.yml` 的 `git rm` 與 `find`：修改最少，但測試性差，也難以防止未來回歸。

## Decision 2: 每次發布前都清理不安全的根目錄內容

**Decision**: production 發布時清空根目錄後再重建站點；staging 發布時保留合法的 production 根目錄項目，但移除原始 repo 殘留與會引用 `/src/` 的不安全入口頁。

**Rationale**:
- 目前站點壞掉的直接原因就是根目錄殘留了原始 repo 檔案與會引用 `/src/app/main.ts` 的 `index.html`。
- staging 發布不能直接清空整個根目錄，否則會誤刪既有 production 站點內容。
- 以「保留合法已發布內容、移除不安全殘留」的規則，才能同時修正 staging-only 首發問題與保護 production。

**Alternatives considered**:
- 僅清理目標子目錄：無法修掉歷史殘留的錯誤 root 內容。
- staging 發布時一律清空根目錄：會破壞既有 production 站點。

## Decision 3: 用規格與架構文件同步鎖定修正範圍

**Decision**: 實作時同步更新 `specs/002-testing-cicd-foundation/spec.md` 與 `PROJECT_ARCHITECTURE.md`。

**Rationale**:
- Constitution 明確要求既有功能修正時，要回寫 originating spec。
- 這次變更會新增 `scripts/` 責任與調整部署結構，不更新架構文件會造成 repo 文件漂移。

**Alternatives considered**:
- 只更新新的 `008` feature 文件：不足以讓既有 CI/CD 規格持續保持 authoritative。
