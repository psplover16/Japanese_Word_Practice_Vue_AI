# Feature Specification: 補回網站 Icon 與 PWA 資產

**Feature Branch**: `009-restore-pwa-assets`  
**Created**: 2026-04-03  
**Status**: Draft  
**Input**: User description: "bug修正：1. 專案應該要設置 PC 版的 ICON，但目前沒看到。2. 專案應該要有 PWA，但目前實裝並沒有看到，目前 PWA 所需要的圖片在 `_private/_private_fileAssets/v1/public/icons` 內。"

> Write this specification in Traditional Chinese (zh-TW). The Constitution is
> the only governance document that remains English-only.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 桌面瀏覽器顯示正確網站 Icon (Priority: P1)

作為一般訪客，我在桌面瀏覽器開啟網站時，需要瀏覽器分頁、書籤或捷徑能顯示正確的網站 icon，而不是顯示預設圖示或沒有圖示。

**Why this priority**: 網站 icon 是最直接可見的品牌識別；若桌面瀏覽器沒有顯示，代表對外發布資產本身就不完整。

**Independent Test**: 建置後開啟網站首頁，確認瀏覽器頁籤載入的是專案指定 icon，而不是預設或缺失狀態。

**Acceptance Scenarios**:

1. **Given** 使用者以桌面瀏覽器開啟首頁，**When** 網頁完成初始載入，**Then** 瀏覽器分頁必須顯示專案指定 icon。
2. **Given** 使用者將網站加入書籤或捷徑，**When** 書籤或捷徑顯示網站資訊，**Then** 系統必須提供可被瀏覽器使用的 icon 資產。

---

### User Story 2 - 支援 PWA 的環境可辨識安裝資產 (Priority: P2)

作為使用支援 PWA 的瀏覽器或裝置的使用者，我需要網站公開提供完整的安裝資產與中繼資料，讓系統能辨識這是一個可安裝的 Web App。

**Why this priority**: PWA 資產若缺漏，安裝能力與外觀會退化，代表現有 PWA 功能實裝對外不可用。

**Independent Test**: 建置後檢查網站的公開資產與中繼資料，確認支援 PWA 的瀏覽器可取得安裝所需 icon 與 manifest。

**Acceptance Scenarios**:

1. **Given** 使用者以支援 PWA 的瀏覽器開啟網站，**When** 瀏覽器讀取網站安裝資訊，**Then** 網站必須提供完整且可讀取的安裝 icon 資產。
2. **Given** 使用者查看網站公開的安裝描述資料，**When** 系統回傳 manifest 與相關圖示，**Then** 這些資產必須存在且可被正常存取。

---

### User Story 3 - 發布後資產不再遺失 (Priority: P3)

作為維護者，我需要網站 icon 與 PWA 圖示在本地建置與公開部署後都能持續存在，避免每次發版後又變成缺失狀態。

**Why this priority**: 若只在本地可見、部署後卻遺失，問題會反覆出現，也無法信任建置與發布流程。

**Independent Test**: 執行 build 並檢查輸出內容，確認桌面 icon 與 PWA 安裝圖示都已包含在可發布產物中。

**Acceptance Scenarios**:

1. **Given** 維護者完成建置，**When** 檢查可發布產物，**Then** 產物中必須包含桌面 icon 與 PWA 所需圖示。
2. **Given** 維護者完成公開部署，**When** 使用者從公開站點讀取 icon 或 PWA 資產，**Then** 系統不得回傳缺失或錯誤路徑。

### Edge Cases

- 若瀏覽器不支援 PWA 安裝，網站仍必須正常載入，且不應因缺少安裝能力而產生錯誤。
- 若 icon 或 PWA 圖示曾存在於私人資產目錄，發布流程必須確保公開站點能取得正確的公開版本，而不是引用不可存取位置。
- 若首頁、manifest 或其他安裝中繼資料引用了錯誤路徑，系統必須避免使用者看到遺失圖示或 404。
- 網站在合法的預設初始狀態下必須可正常載入，不得因 icon 或 PWA 資產問題造成 runtime error、render failure 或 browser console error。
- 此功能只涵蓋桌面 icon、PWA 安裝圖示與相關公開資產，不包含重新設計畫面內容或新增其他產品功能。
- 若本次修正影響資產目錄結構、建置來源或部署結構，必須同步更新 `PROJECT_ARCHITECTURE.md`。

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 系統必須在網站首頁對外提供可供桌面瀏覽器使用的網站 icon。
- **FR-002**: 系統必須在支援 PWA 的環境下對外提供安裝所需的圖示資產與中繼資料。
- **FR-003**: 系統必須確保桌面 icon 與 PWA 圖示在建置後包含於可發布產物中，而不是只存在於私人來源目錄；本次既有公開來源以 `_private/_private_fileAssets/v1/public` 為準。
- **FR-004**: 系統必須避免首頁、manifest 或其他安裝相關中繼資料引用不存在或不可公開存取的資產路徑。
- **FR-005**: 維護者必須能在本地建置結果與公開部署結果中驗證 icon 與 PWA 圖示確實存在。
- **FR-006**: 此次修正只可作用於 icon、PWA 資產、相關公開資源設定與必要文件；現有產品畫面、路由與互動必須保持不變。
- **FR-007**: 若本次修正變更資產目錄責任、公開資產來源或部署結構，系統必須同步更新 `PROJECT_ARCHITECTURE.md`。

### Key Entities *(include if feature involves data)*

- **網站 Icon 資產**: 提供給桌面瀏覽器分頁、書籤與捷徑使用的網站識別圖示。
- **PWA 安裝資產**: 提供給支援 PWA 的瀏覽器與裝置使用的安裝圖示與相關中繼資料。
- **公開資產來源**: 建置與部署時真正會被帶入公開站點的資產來源位置，用來區分私人來源檔與可發布檔。

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 維護者在本地建置後 5 分鐘內，可確認網站首頁與可發布產物都包含桌面瀏覽器可用的 icon。
- **SC-002**: 維護者在本地建置後 5 分鐘內，可確認 PWA manifest 與安裝圖示資產可被正常存取。
- **SC-003**: 使用者開啟公開站點時，不再看到 icon 缺失、PWA 圖示缺失或相關 404。
- **SC-004**: 本次修正完成後，桌面 icon 與 PWA 資產在至少一次 build 驗證中都能穩定存在於可發布輸出內。

## Assumptions

- 目前專案仍維持既有網站名稱、主題色與 PWA 身分，不需要重新設計品牌素材。
- 使用者提到的 icon 與 PWA 圖示檔案是本次應優先採用的現有資產來源。
- 本次工作以修復公開可見的資產缺失為主，不額外擴大到其他 PWA 行為重構。

## Repository Hygiene *(mandatory)*

- 已確認 repository 內已有 `.gitignore`。
- 不得提交 `node_modules/`。
- 不得提交可重新生成的產物，例如 `build/`、`dist/` 或 `coverage/`，除非規格明確說明例外理由。
- 本功能若調整公開資產來源或部署結構，必須在實作完成前同步更新 `PROJECT_ARCHITECTURE.md`。
