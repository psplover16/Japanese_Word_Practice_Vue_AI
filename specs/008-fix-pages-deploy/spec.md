# Feature Specification: GitHub Pages 部署修正

**Feature Branch**: `008-fix-pages-deploy`  
**Created**: 2026-04-03  
**Status**: Draft  
**Input**: User description: "bug修正：再推送至 github 之後，會跳出錯誤訊息，GET https://psplover16.github.io/src/app/main.ts net::ERR_ABORTED 404 (Not Found)，無法正確部署。"

> Write this specification in Traditional Chinese (zh-TW). The Constitution is
> the only governance document that remains English-only.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 正式站可正常開啟 (Priority: P1)

作為專案維護者，我在推送正式版後，需要 GitHub Pages 正式站能直接載入應用程式，而不是嘗試讀取原始碼路徑，避免使用者一開站就看到 404 與空白頁。

**Why this priority**: 正式站無法開啟會直接阻斷功能驗收與對外展示，是目前最核心的產品缺陷。

**Independent Test**: 推送正式版後，直接開啟正式站網址，確認頁面可顯示主要應用外框，且瀏覽器不再請求 `/src/app/main.ts` 或其他 `/src/` 原始碼路徑。

**Acceptance Scenarios**:

1. **Given** 正式部署流程成功完成，**When** 維護者開啟正式站網址，**Then** 網站必須顯示已發布的應用內容，且不可出現 `/src/app/main.ts` 404。
2. **Given** 公開站點先前曾殘留錯誤的發布內容，**When** 維護者再次完成正式部署，**Then** 正式站必須改為提供正確的發布內容，且不再輸出原始專案檔案。

---

### User Story 2 - 測試站與正式站分流 (Priority: P2)

作為專案維護者，我需要 `dev` 與 `main` 的部署結果分開，讓測試站可持續驗證變更，同時不污染正式站內容。

**Why this priority**: 若測試站部署會覆蓋或殘留到正式站，維護者就無法安全驗證變更，也會讓正式環境持續不穩定。

**Independent Test**: 推送 `dev` 後只驗證測試站網址；推送 `main` 後只驗證正式站網址，確認兩者內容與位置各自正確，且互不干擾。

**Acceptance Scenarios**:

1. **Given** 維護者推送 `dev` 分支，**When** 測試站部署完成，**Then** 測試站網址必須顯示已發布內容，且正式站不得被測試站內容覆蓋。
2. **Given** 維護者推送 `main` 分支，**When** 正式站部署完成，**Then** 正式站網址必須顯示正式內容，且測試站仍保留其獨立位置與內容。

---

### User Story 3 - 部署失敗可快速定位 (Priority: P3)

作為專案維護者，我需要在發布失敗時能從自動化流程快速看出是哪個發布目標異常，避免誤以為已成功上線。

**Why this priority**: 可觀察性不足會延長除錯時間，並提高將錯誤內容持續留在公開站點的風險。

**Independent Test**: 刻意檢查部署流程輸出，確認維護者能看出本次更新的是正式站或測試站，以及是否真的有新內容被發布。

**Acceptance Scenarios**:

1. **Given** 部署流程沒有產生可發布變更，**When** 維護者查看流程結果，**Then** 流程必須明確說明沒有發布變更，而不是讓維護者誤判為成功修正。
2. **Given** 部署流程失敗，**When** 維護者查看流程結果，**Then** 流程必須能指出失敗發生在正式站或測試站發布階段。

### Edge Cases

- 第一次發布時若公開站點尚未初始化，系統必須建立乾淨的發布內容，而不是把原始 repo 檔案公開成網站。
- 若正式站根目錄曾殘留舊的錯誤內容，後續發布必須能清掉殘留內容，避免持續提供錯誤頁面。
- 若只先發布測試站，系統不得因此在正式站位置留下會引用 `/src/` 原始碼的頁面。
- 公開站點在合法的預設初始狀態下必須能正常顯示應用外框，不得出現 runtime error、render failure 或 browser console error。
- 此功能僅涵蓋部署流程、公開站點內容與部署驗證訊號；應用程式的練習、文法、單字等業務功能頁面皆屬既有功能，不在本次修正範圍內。
- 若部署結構或文件結構因此改變，必須同步更新 `PROJECT_ARCHITECTURE.md`，避免架構文件與實際 repo 狀態脫節。

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 系統必須在正式站發布完成後提供可直接執行的已發布網站內容，且不得再引用 `/src/` 下的原始碼檔案。
- **FR-002**: 系統必須在測試站發布完成後，僅更新測試站對應位置的公開內容，且不得覆蓋、污染或保留到正式站內容。
- **FR-003**: 系統必須在首次建立公開發布內容時，先清出乾淨的發布空間，避免把原始 repo 內容誤發布到公開站點。
- **FR-004**: 系統必須在後續發布時清除不該殘留的舊站點內容，避免舊的錯誤頁面或錯誤資源持續被公開存取。
- **FR-005**: 維護者必須能從部署流程結果辨識本次更新的是正式站或測試站，以及是否真的有發布新內容。
- **FR-006**: 若部署失敗或沒有新內容可發布，系統必須提供明確訊息，避免維護者誤判站點已修正。
- **FR-007**: 已發布網站在預設初始顯示時必須可成功載入主要應用內容，且不得產生瀏覽器 404、runtime error、render failure 或 browser console error。
- **FR-008**: 本次修正只可出現在部署流程、公開站點內容與部署相關文件；現有應用功能頁面與互動行為必須保持不變。
- **FR-009**: 若本次修正變更部署結構、發布分流規則或主要檔案位置，系統必須同步更新 `PROJECT_ARCHITECTURE.md`。

### Key Entities *(include if feature involves data)*

- **發布目標**: 一次發布所對應的公開站點類型，包含正式站與測試站，各自有獨立的公開位置與驗證方式。
- **公開站點內容**: 實際提供給瀏覽器存取的已發布靜態內容，必須只包含可公開執行的網站產物與必要中繼資料。
- **部署執行結果**: 一次自動化發布流程的結果訊號，用來判斷此次是否有成功發布、發布到哪個目標，以及是否需要人工追查。

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 維護者在推送正式版後 10 分鐘內開啟正式站網址，必須能成功看到主要應用內容，且不再出現 `/src/app/main.ts` 404。
- **SC-002**: 維護者在推送測試版後 10 分鐘內開啟測試站網址，必須能成功看到主要應用內容，且正式站網址不會被測試站內容取代。
- **SC-003**: 在首次發布或清理後重發的情境下，公開站點不得再暴露原始 repo 目錄或原始碼入口頁面。
- **SC-004**: 維護者查看部署流程結果時，必須能在 1 分鐘內辨識本次是否有成功發布、失敗的是哪個發布目標，或是否沒有新的發布內容。

## Assumptions

- 目前部署目標仍以 GitHub Pages 為主，且正式站與測試站需要保留現行的對外網址規則。
- 本次工作以修正發布內容與流程為主，不新增新的產品功能或重新設計現有應用畫面。
- 若需補強驗證，允許新增最小必要的自動化測試或部署檢查，但不得改變既有功能範圍。

## Repository Hygiene *(mandatory)*

- 已確認 repository 內已有 `.gitignore`。
- 不得提交 `node_modules/`。
- 不得提交可重新生成的產物，例如 `build/`、`dist/` 或 `coverage/`，除非規格明確說明例外理由。
- 本功能預期會變更部署結構與相關文件，因此實作完成前必須同步更新 `PROJECT_ARCHITECTURE.md`。
