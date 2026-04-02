# Data Model: 補回網站 Icon 與 PWA 資產

## Entity: PublicAssetSource

- **Purpose**: 定義建置時實際要帶入公開站點的資產來源位置。
- **Fields**:
  - `sourcePath`: 實際素材所在目錄
  - `visibility`: 私人來源或公開輸出責任
  - `assetTypes`: favicon、PWA icons、其他公開素材
- **Rules**:
  - 必須能映射到真正存在的素材檔案
  - 不可引用不存在的來源目錄

## Entity: SiteIconAsset

- **Purpose**: 提供桌面瀏覽器頁籤、書籤與捷徑使用的網站 icon。
- **Fields**:
  - `path`: 公開站點可存取的 icon 路徑
  - `fileName`: 資產檔名
  - `usage`: favicon、browser shortcut
- **Rules**:
  - build 後必須存在於可發布產物
  - 首頁引用路徑必須與實際輸出一致

## Entity: PwaInstallAsset

- **Purpose**: 提供 PWA 安裝流程所需的 icon 與 manifest 參照資料。
- **Fields**:
  - `path`: 公開站點可存取的 icon 路徑
  - `sizes`: 安裝圖示尺寸
  - `type`: 圖檔類型
  - `referencedByManifest`: 是否被 manifest 引用
- **Rules**:
  - manifest 內引用的每一個安裝圖示都必須實際存在
  - 路徑必須符合 build 與部署後可存取的公開位置
