# Data Model: 修正網站與 PWA 圖示資產位置

## Entity: PublicIconAsset

- **Purpose**: 代表正式提供給瀏覽器與 PWA 使用的單一公開圖示檔案。
- **Fields**:
  - `name`: 圖示檔名，例如 `vite.ico`、`180.png`
  - `publicPath`: 正式公開路徑，例如 `/vite.ico`、`/icons/180.png`
  - `category`: `favicon` 或 `pwa-icon`
  - `sizeLabel`: 對應尺寸標記，例如 `180x180`
  - `mustExist`: 是否為必要資產，本功能中一律為 `true`
- **Validation Rules**:
  - 每個必要圖示都必須存在於根目錄 `public/` 或其子目錄
  - `publicPath` 必須與入口頁或 manifest 的宣告一致

## Entity: PublicAssetSourceLocation

- **Purpose**: 描述正式發布來源與私人參考來源的責任界線。
- **Fields**:
  - `sourceType`: `official-public` 或 `private-reference`
  - `directoryPath`: 對應目錄路徑
  - `usedForBuild`: 是否直接參與正式 build
  - `notes`: 補充說明，例如是否僅作為參考素材
- **Validation Rules**:
  - `official-public` 必須指向根目錄 `public/`
  - `_private/_private_fileAssets/v1/public` 不得再被標記為 `usedForBuild: true`

## Entity: BuiltPublicAsset

- **Purpose**: 代表 build 後出現在 `dist/` 的實際可發布圖示產物。
- **Fields**:
  - `outputPath`: 產物路徑，例如 `dist/vite.ico`
  - `referencedBy`: `index.html`、`manifest.webmanifest` 或兩者之一
  - `mustShip`: 是否必須進入 build 產物
- **Validation Rules**:
  - 所有 `mustShip` 項目都必須在 `dist/` 中存在
  - `referencedBy` 中列出的每個引用來源都不得指向 `_private/` 路徑
