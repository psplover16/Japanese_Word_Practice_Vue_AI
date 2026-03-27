# Feature Specification: `/practice` 羅馬音排版補強與首屏穩定化

**Feature Branch**: `004-romaji-layout-stability`  
**Created**: 2026-03-28  
**Status**: Draft  
**Input**: User description: "更新 /practice 羅馬音排版、外來語矩陣與首屏穩定顯示需求"

> Write this specification in Traditional Chinese (zh-TW). The Constitution is
> the only governance document that remains English-only.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 長音規則區塊改為完整對照表 (Priority: P1)

作為剛接觸日文假名的學習者，我希望 `/practice` 的長音規則區塊改成一張完整、連續、容易掃讀的大表格，讓我可以一次看懂規則說明、假名寫法、羅馬音與中文意思之間的對應關係。

**Why this priority**: 長音規則是這輪需求中最明確、最影響閱讀方式的主區塊，也是目前版面與內容結構差異最大的部分。

**Independent Test**: 只打開 `/practice`，檢查長音規則區塊是否已改為單一大表格，且規則列、單字列、羅馬音與中文意義都能在不依賴其他區塊的情況下被理解。

**Acceptance Scenarios**:

1. **Given** 使用者開啟 `/practice`，**When** 視線移到長音規則區塊，**Then** 該區塊必須呈現為單一大表格，而不是多張分散卡片。
2. **Given** 長音規則表格中有規則說明列，**When** 使用者閱讀該列，**Then** 規則文字必須獨佔整列並清楚區隔後續例字資料。
3. **Given** 長音規則表格中有例字資料，**When** 使用者閱讀任一例字列，**Then** 必須能同時看到假名、羅馬音與中文意思，且不需額外欄位標題也能辨識對應內容。
4. **Given** 使用者閱讀「あ段 + う 不一定屬於規則長音」內容，**When** 查看該區段，**Then** 必須看到多個例字或短語，且每筆都以假名、羅馬音、中文意思三段格式呈現。

---

### User Story 2 - 拗音與外來語區塊補齊全表羅馬音 (Priority: P1)

作為需要靠羅馬音輔助辨讀的初學者，我希望清音拗音、合拗音與外來語擴張區塊中的所有假名內容都附有對應羅馬音，讓我不需要自行推測讀音。

**Why this priority**: 這是本期最直接的學習價值補強，能立即降低閱讀門檻，也直接回應「哪裡只有假名就補上羅馬音」的核心需求。

**Independent Test**: 只打開 `/practice`，檢查清音拗音、合拗音、外來語擴張中所有純假名內容是否都能在同一格或同一筆資料中看到羅馬音。

**Acceptance Scenarios**:

1. **Given** 使用者查看清音拗音表格，**When** 逐格閱讀標題列與內容列，**Then** 每個假名項目都必須帶有對應羅馬音。
2. **Given** 使用者查看合拗音表格，**When** 逐格閱讀標題列與內容列，**Then** 每個假名項目都必須帶有對應羅馬音。
3. **Given** 使用者查看外來語擴張區塊，**When** 讀取任一儲存格中的假名組合，**Then** 假名下方必須顯示羅馬音，且兩者都置中顯示。
4. **Given** 使用者查看任一例字，**When** 該例字出現在本期調整範圍內的區塊，**Then** 該例字必須同時提供羅馬音與中文意思。

---

### User Story 3 - 外來語擴張改為系統化矩陣 (Priority: P2)

作為想理解片假名外來語組合規律的學習者，我希望外來語擴張區塊改成有橫列與縱列規則的矩陣，讓我能從共通母音與基底音節組合快速理解整體規則。

**Why this priority**: 外來語擴張目前最缺少系統性，若只補羅馬音仍不足以形成可掃讀的學習結構，因此需要獨立成一個完整表格重整。

**Independent Test**: 只打開外來語擴張區塊，確認第一列是母音標頭、第一欄是常見外來語基底音，且其餘儲存格都是這兩者的組合結果。

**Acceptance Scenarios**:

1. **Given** 使用者查看外來語擴張表格，**When** 閱讀第一列，**Then** 必須看到母音標頭。
2. **Given** 使用者查看外來語擴張表格，**When** 閱讀第一欄，**Then** 必須看到盡可能完整的常見外來語基底音清單。
3. **Given** 使用者查看第一列與第一欄交叉後的內容區，**When** 逐格閱讀，**Then** 每格都必須對應一個由該列與該欄組成的組合。
4. **Given** 使用者在窄螢幕查看表格，**When** 儲存格空間變小，**Then** 假名不得換行，且內容不可被裁切或重疊。

---

### User Story 4 - 首次開啟 `/practice` 時保持下半部穩定渲染 (Priority: P2)

作為第一次進入頁面的使用者，我希望在剛開啟 `/practice` 時，「濁音／半濁音」以下的區塊能立即穩定顯示，不會先空一段再延遲出現，避免我誤以為畫面壞掉。

**Why this priority**: 首屏延遲會直接影響使用者對頁面是否正常的信任，且這個問題已被明確指出需要單獨實作與驗收。

**Independent Test**: 在冷啟動或重新整理 `/practice` 後，觀察「濁音／半濁音」以下區塊的初始渲染是否一次到位，沒有明顯延遲插入造成的版面斷裂。

**Acceptance Scenarios**:

1. **Given** 使用者首次開啟 `/practice`，**When** 頁面完成初始渲染，**Then** 「濁音／半濁音」以下的所有本期調整區塊必須在首屏穩定出現。
2. **Given** 使用者重新整理 `/practice`，**When** 觀察頁面載入過程，**Then** 不得出現下半部區塊延遲插入導致的破版感或大片空白。
3. **Given** 頁面處於法律預設、空資料或尚未互動狀態，**When** 完成初始渲染，**Then** 不得發生 runtime error、render failure 或 browser console error。

---

### User Story 5 - 375px 小螢幕維持可讀與不破版 (Priority: P3)

作為使用 375px 手機寬度的使用者，我希望 `/practice` 中本期調整的表格與頁首在窄螢幕上仍然可讀且不破版，讓我不需要左右捲動也不會看到內容擠壓重疊。

**Why this priority**: 這是明確指定的裝置場景，也是本期版面調整是否真正可用的最後一道驗收。

**Independent Test**: 將 viewport 設為 375px 後打開 `/practice`，確認頁首、長音規則、拗音與外來語矩陣都能維持完整可讀。

**Acceptance Scenarios**:

1. **Given** 使用者以 375px 寬度開啟 `/practice`，**When** 檢視頁首與分頁區，**Then** 不得出現內容裁切、重疊或橫向捲動。
2. **Given** 使用者以 375px 寬度查看長音規則與外來語矩陣，**When** 表格空間不足，**Then** 系統必須先縮減儲存格內距，再縮小字體，而不是讓內容被裁切、重疊或要求水平捲動。
3. **Given** 使用者以 375px 寬度查看本期調整的表格，**When** 掃讀表格內容，**Then** 假名、羅馬音與中文仍須可辨識且順序穩定。

---

### Edge Cases

- 當長音規則表格同時包含規則列與例字列時，系統必須維持明確視覺區隔，避免使用者誤把規則敘述當成例字資料。
- 當外來語矩陣中的某些基底音與母音組合不常用或不適用時，系統仍需用一致方式呈現空缺或不可用狀態，不能讓表格結構斷裂。
- 當某格同時呈現假名與羅馬音時，假名必須維持不換行，且羅馬音不得因換行策略造成與錯誤儲存格對位。
- 當畫面以 375px 顯示且表格空間不足時，系統必須先調整內距，再調整字級，不得使用水平捲動、內容裁切或文字重疊作為替代方案。
- 當 `/practice` 首次渲染時，濁音／半濁音以下的區塊必須在合法預設狀態下安全呈現，不得因延後初始化、條件渲染或版面計算導致空白斷層。
- 本 feature 僅限 `/practice` 路由及其直接承載的練習參考區塊；`/grammar`、`/vocabulary`、考題彈窗、錯題結果面板與 PWA 提示皆明確不在範圍內。
- 若共享樣式與 reusable UI abstraction 無法滿足 `/practice` 的明確排版規則，`/practice` 的 route-specific layout 規則必須優先。

## Clarifications

### Session 2026-03-28

- Q: 在 375px 寬度下，tableA/tableB 若空間不足，允許哪些調整方式？ -> A: 先縮減儲存格內距，再視需要縮小字體；禁止橫向捲動、裁切、重疊。
- Q: 外來語擴張的排版規則，有參考排版? -> A: 在符合本次需求的前提下，可以參考目前清音拗音區塊的排版規則。

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 系統 MUST 僅在 `/practice` 路由的練習參考區塊中套用本 feature 的排版與內容補強。
- **FR-002**: 系統 MUST 不在 `/grammar`、`/vocabulary`、考題彈窗、錯題結果面板或 PWA 提示中引入本 feature 的版型或內容變更。
- **FR-003**: 系統 MUST 將長音規則區塊改為單一大表格，而非分散卡片。
- **FR-004**: 系統 MUST 讓長音規則說明列獨佔整列，以明確區隔規則敘述與例字資料。
- **FR-005**: 系統 MUST 讓長音規則區塊中的每筆例字都以假名、羅馬音、中文意思三段資訊呈現。
- **FR-006**: 系統 MUST 在長音規則區塊中加入多筆「あ段 + う 不一定屬於規則長音」例字或短語，並以相同三段資訊格式呈現。
- **FR-007**: 系統 MUST 為清音拗音表格中的所有假名項目補齊對應羅馬音，不得只在標頭列顯示。
- **FR-008**: 系統 MUST 為合拗音表格中的所有假名項目補齊對應羅馬音。
- **FR-009**: 系統 MUST 為本期調整範圍內所有例字補齊羅馬音與中文意思。
- **FR-010**: 系統 MUST 將外來語擴張區塊改為矩陣式表格，第一列為母音標頭，第一欄為常見外來語基底音。
- **FR-011**: 系統 MUST 讓外來語擴張矩陣中其餘儲存格呈現由第一列與第一欄組成的對應組合。
- **FR-012**: 系統 MUST 讓外來語擴張矩陣中的假名顯示在羅馬音上方，兩者皆置中，且假名不得換行。
- **FR-013**: 系統 MUST 讓長音規則區塊中的例字列在不額外加入欄位標題文字的前提下仍可清楚辨識三段資訊。
- **FR-014**: 系統 MUST 讓 `/practice` 在首次開啟與重新整理時，濁音／半濁音以下的本期調整區塊於首屏穩定渲染，不得出現明顯延遲插入造成的空白斷層或破版感。
- **FR-015**: 系統 MUST 確保 `/practice` 在法律預設、空資料、隱藏或 placeholder 狀態下，不會因本 feature 產生 runtime error、render failure 或 browser console error。
- **FR-016**: 系統 MUST 在 375px 寬度下維持 `/practice` 頁首、分頁區與本期調整表格的完整可讀性，不得出現裁切、重疊或水平捲動。
- **FR-017**: 系統 MUST 在 375px 寬度下於表格空間不足時，先縮減儲存格內距，再縮小字級。
- **FR-018**: 系統 MUST 保持本 feature 的樣式與結構為 `/practice` 專屬需求，不得被共享樣式抽象悄悄覆蓋成不符合規格的版面。
- **FR-019**: 系統 MUST 在本 feature 改動到路由結構、模組責任、共用樣式邊界、測試結構或重要來源檔案職責時，同步更新 `PROJECT_ARCHITECTURE.md`。

### Key Entities *(include if feature involves data)*

- **長音規則列**: 代表長音規則表格中的單列資料，可分為規則敘述列與例字資料列，並需保留清楚的閱讀順序。
- **假名對照項**: 代表一個可顯示假名、羅馬音與中文意思的最小學習單位，適用於長音例字、拗音格子與外來語組合。
- **外來語矩陣列**: 代表外來語擴張表格中的一個基底音列，需與母音標頭共同形成可推導的組合內容。
- **Practice 版面狀態**: 代表 `/practice` 在初始渲染與 375px 小螢幕條件下，頁首、表格與下半部區塊應維持的穩定呈現狀態。

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% 本期調整範圍內原本只有假名的學習項目，都能在同一視覺群組中看到對應羅馬音。
- **SC-002**: 100% 本期調整範圍內的例字，都能同時看到假名、羅馬音與中文意思。
- **SC-003**: 在 375px 寬度下檢視 `/practice` 時，本期調整的頁首與表格區塊不得出現水平捲動、內容裁切或文字重疊。
- **SC-004**: 使用者在首次開啟或重新整理 `/practice` 後，能於 1 次連續渲染中看到濁音／半濁音以下的本期調整區塊完整出現，而不出現明顯延遲插入造成的斷裂感。
- **SC-005**: 本 feature 驗收時，`/practice` 的預設初始顯示不得產生 runtime error、render failure 或 browser console error。

## Assumptions

- 本 feature 以現有 `/practice` 練習頁為基礎，不新增其他路由或新的練習流程。
- 若外來語矩陣有少量組合屬於較少見用法，可用一致的留白或占位方式呈現，但仍需維持矩陣結構完整。
- 外來語矩陣可沿用現有清音拗音區塊的表格閱讀節奏，只要不違反本規格對母音標頭、基底音列、置中排版與假名不換行的要求。
- 本期重點是閱讀與排版可理解性，不要求新增新的互動控制、篩選器或資料儲存行為。

## Repository Hygiene *(mandatory)*

- Confirm the repository includes a `.gitignore` file before implementation.
- Do not commit `node_modules/`.
- Do not commit re-generatable artifacts such as `build/`, `dist/`, or
  `coverage/` unless the specification explicitly justifies an exception.
- If the feature changes repository structure, module boundaries, shared
  utilities, route structure, test structure, or deployment structure, the
  specification MUST call out the required update to `PROJECT_ARCHITECTURE.md`.
