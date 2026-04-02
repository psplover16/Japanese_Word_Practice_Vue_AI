# Research: 補回網站 Icon 與 PWA 資產

## Decision 1: 以修正公開資產來源為主

**Decision**: 優先修正 Vite 的公開資產來源設定，而不是重做 PWA 功能本身。

**Rationale**:
- 現有 `vite-plugin-pwa` 設定與 manifest 輸出已存在，問題更像是公開資產來源沒有對到真正的 icon 檔案位置。
- 使用最小變更可以降低對現有畫面與 PWA 邏輯的回歸風險。

**Alternatives considered**:
- 重寫整套 PWA 設定：風險較高，且不符合目前問題範圍。

## Decision 2: 保留現有素材，修正來源責任

**Decision**: 採用 `_private/_private_fileAssets/v1/public` 內現有的 `vite.ico` 與 `icons/*.png`，讓 build 能正確帶入公開產物。

**Rationale**:
- 使用者已指出這些是現有可用素材。
- 目前專案內實際存在的公開素材就在這個位置，與 `vite.config.ts` 的 `publicDir` 不一致。

**Alternatives considered**:
- 重新製作 icon 檔：超出本次 bug 修正範圍。

## Decision 3: 用回歸測試與 build 輸出驗證取代主觀目測

**Decision**: 以 `tests/unit/publicAssets.spec.ts` 的暫時 build 驗證，加上 `npm run build` 與 `dist/` 檔案檢查作為主要驗證方式。

**Rationale**:
- 這次問題本質是「資產是否進入可發布產物」，build 輸出是最直接的驗證點。
- 讓測試直接檢查暫時 build 產物，可以避免只修設定字串卻沒有真的把資產打包出去。
- 可以避免只在本機開發模式下看似正常、實際發布仍缺失的情況。

**Alternatives considered**:
- 只依賴瀏覽器目測：容易漏掉部署階段才出現的資產遺失。
