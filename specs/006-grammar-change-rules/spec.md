# Feature Specification: 變化規則主內容重建

**Feature Branch**: `006-grammar-change-rules`  
**Created**: 2026-03-31  
**Status**: Draft  
**Input**: User description: "將目前專案既有 `變化規則` route 的主內容，重寫為與參考頁 `https://psplover16.github.io/Japanese_Word_Practice_Vue/change-rules` 主內容高度一致的版本，保留既有 route path、共享 route tabs 與 app shell，只替換主要內容區。"

> 本規格以繁體中文撰寫；Constitution 依專案規範維持英文。

## User Scenarios & Testing

### User Story 1 - 使用者看到完整變化規則頁 (Priority: P1)

作為進入 `變化規則` 頁的使用者，我希望在保留既有 `/grammar` 路由與共享分頁切換的前提下，看到與參考頁一致的主內容區，而不是目前的簡化占位內容。

**Why this priority**: 這是功能的核心價值；若主內容沒有被完整替換，其他驗收面向都失去意義。

**Independent Test**: 只實作這個故事時，使用者可直接開啟 `/grammar`，確認主內容已由 11 個規則容器構成，且不再顯示舊版簡化內容。

**Acceptance Scenarios**:

1. **Given** 使用者進入 `/grammar`，**When** 頁面完成渲染，**Then** 頁面仍保留既有 route tabs 與 app shell，且主內容區顯示與參考頁一致的容器順序與內容。
2. **Given** 使用者已在 `/grammar`，**When** 與其他 route 切換再返回，**Then** `/grammar` 仍顯示新規則內容，不會退回舊版簡化區塊。

---

### User Story 2 - 使用者展開後看到完整表格細節 (Priority: P2)

作為閱讀規則內容的使用者，我希望每個 accordion 容器展開後，都能看到與參考頁一致的 table 結構、文字內容與附註，而不是被摘要化或遺漏欄列的版本。

**Why this priority**: 即使頁面殼層正確，若 table 結構與文字內容不準確，功能仍無法支援學習與後續維護。

**Independent Test**: 實作後可逐一展開 11 個容器，確認 table 數量、thead/tbody/tfoot、tr/td/th、colspan、rowspan、附註與巢狀內容都與參考頁一致。

**Acceptance Scenarios**:

1. **Given** 使用者展開任一容器，**When** 該區塊內容顯示，**Then** 它的標題、副標題、表格數量與結構都必須對應參考頁。
2. **Given** 使用者展開包含特殊結構的容器，**When** 內容渲染完成，**Then** rowspan、colspan、tfoot、巢狀清單與說明列都必須保留。

---

### User Story 3 - 使用者在不同裝置維持一致閱讀體驗 (Priority: P3)

作為在手機或桌機閱讀的使用者，我希望表格的換行規則、對齊方式、背景層次、字級與粗細都與參考頁一致，讓閱讀順序與資訊層次不會因本地實作而改變。

**Why this priority**: 這個頁面的價值不只在資料正確，也在表格排版忠實度；若斷行與對齊失真，內容雖存在仍會難以閱讀。

**Independent Test**: 在桌機與窄版 viewport 開啟 `/grammar`，比對標題、副標題、表頭、儲存格、附註與範例的排版與換行是否穩定且符合參考頁。

**Acceptance Scenarios**:

1. **Given** 使用者在桌機寬度瀏覽 `/grammar`，**When** 容器展開，**Then** 表格文字、背景、邊框、對齊與粗細需與參考頁相符。
2. **Given** 使用者在手機寬度瀏覽 `/grammar`，**When** 容器展開，**Then** 各欄位的換行順序、置中或置左規則與內容堆疊方式需維持可讀且符合參考頁。
3. **Given** 使用者檢視主要規則表格，**When** 各列內容渲染完成，**Then** 每一行第一個 `td` 的水平留白需明顯大於一般內容格，且「語法系統差異」區塊的「項目」資料欄需維持水平置中。
4. **Given** 使用者檢視「動詞型態分辨: 一段/五段/不規則」、「五段動詞表(詞尾母音變化)」、「一段動詞 (辭書型 結尾必定是 る)」、「ない形容詞」與「だ助動詞」，**When** 內容顯示，**Then** 指定列與指定儲存格需維持既定的間距、整列背景色、不換行假名與固定手動換行版型，不得退化為通用表格樣式。

---

### User Story 4 - 維護者有足夠明確的驗收與結構基準 (Priority: P4)

作為後續維護者，我希望規格、資料結構與測試驗收點足夠明確，讓未來修正文字、補表格、調整樣式或做 CRUD 與 regression 驗證時，有清楚且可追溯的基準。

**Why this priority**: 這個頁面包含大量固定表格內容，若沒有明確結構與驗收基準，未來修改很容易破壞 fidelity。

**Independent Test**: 只檢視 spec、plan、tasks 與測試即可確認每個容器、表格與樣式面向都有對應驗收與維護位置。

**Acceptance Scenarios**:

1. **Given** 維護者需要修改某一容器內容，**When** 查閱規格與任務，**Then** 可以知道該容器的資料來源、結構與應回歸的驗收項目。
2. **Given** 維護者需要驗證頁面是否回歸，**When** 執行對應測試與手動檢查，**Then** 能逐容器、逐表格、逐儲存格檢查內容與樣式差異。

---

### Edge Cases

- 若使用者首次載入 `/grammar` 時 accordion 預設為收合狀態，頁面仍需顯示完整容器清單與正確標題，不可因延遲渲染出現空白或錯位。
- 若容器包含副標題、附註、巢狀清單或多段說明，這些內容必須保留手動換行與階層，不可被壓平為單行。
- 若表格包含 rowspan、colspan、tfoot 或高亮儲存格，樣式系統不得因共用元件抽象而破壞原始 DOM 結構。
- 若在手機寬度下發生換行，閱讀順序與欄列語意仍需與參考頁一致，不可出現順序顛倒、內容重疊或不可讀。
- 若本次只指定部分容器或部分列的微調，未被點名的 section、列、儲存格與既有排版規則都必須維持原狀，不可被連帶改動。
- 本功能只作用於 `/grammar` 主內容；`/practice`、`/vocabulary`、route tabs、app shell、其他 route 內容都必須維持既有行為。
- 若現有 grammar 資料模型不足以表達參考頁的 table 結構，可在 `/grammar` 模組內改用較低抽象度的資料結構，但不得把不適合的共用樣式強行套用到這個 route。

## Requirements

### Functional Requirements

- **FR-001**: 系統 MUST 保留既有 `/grammar` route path、共享 route tabs 與 app shell，不得因本功能改變這些外層導覽與殼層結構。
- **FR-002**: 系統 MUST 將 `/grammar` 目前的舊主內容完整替換為參考頁 `https://psplover16.github.io/Japanese_Word_Practice_Vue/change-rules` 的重建版本。
- **FR-003**: 系統 MUST 讓 `/grammar` 主內容容器的數量、順序、標題與副標題與參考頁一致，共 11 個規則容器，且「音便」必須作為五段動詞區塊內的子表格保留。
- **FR-004**: 系統 MUST 使每個容器內的 table 結構與參考頁一致，包含 table 數量、thead/tbody/tfoot、tr、td、th、colspan、rowspan、巢狀清單與附註區塊。
- **FR-005**: 系統 MUST 使每個表格儲存格的文字內容與參考頁一致，包含中文、日文、括號、標點、空白、範例文字與編號格式。
- **FR-006**: 系統 MUST 使每個儲存格與副標題的換行規則與參考頁一致，包含單行、多行、手動換行、`pre-wrap` 類型呈現與不換行欄位。
- **FR-007**: 系統 MUST 使每個表格列與儲存格的視覺樣式與參考頁一致，包含文字色、背景色、特殊列、特殊高亮格、表頭色塊與邊框層次。
- **FR-008**: 系統 MUST 使每個表格列與儲存格的對齊方式與排版方向與參考頁一致，包含水平或垂直堆疊、置左、置中、置右、上對齊與清單縮排。
- **FR-009**: 系統 MUST 使標題、副標題、表頭、一般儲存格、次要說明與強調文字的字級、粗細與字體樣式與參考頁一致。
- **FR-010**: 系統 MUST 保留 accordion 互動，且展開與收合後都不可破壞表格 DOM 結構、內容順序與樣式層次。
- **FR-011**: 系統 MUST 讓 `/grammar` 的內容結構可持續維護，使後續 CRUD 能辨識是哪些容器、table、列、儲存格或樣式面向被修改。
- **FR-012**: 系統 MUST 明確禁止這次重建內容出現在 `/practice` 與 `/vocabulary`，也不得順手改動其他 route 的主內容。
- **FR-013**: 系統 MUST 提供對應的測試或驗收檢查，涵蓋容器存在、展開內容、特殊 table 結構、排版關鍵點與 `/grammar` route 專屬範圍。
- **FR-014**: 若本功能調整了 `/grammar` 模組結構、資料來源、測試結構或 route 模組邊界，系統 MUST 同步更新 `PROJECT_ARCHITECTURE.md`。
- **FR-015**: 系統 MUST 在 `/grammar` 主要規則表格中，讓每一行第一個 `td` 的水平留白明顯大於一般內容格，至少為一般內容格的兩倍，以維持列標題辨識性。
- **FR-016**: 系統 MUST 讓「語法系統差異」區塊的「項目」資料欄維持水平置中，不得與其他說明欄同樣採左對齊。
- **FR-017**: 系統 MUST 讓「動詞型態分辨: 一段/五段/不規則」第四項的範例區與主敘述之間維持較緊密的垂直間距，約為一般範例區塊的一半。
- **FR-018**: 系統 MUST 讓「五段動詞表(詞尾母音變化)」與「一段動詞 (辭書型 結尾必定是 る)」中的「派生可能」「派生被動」「派生使役」「假定型」各列整列儲存格都帶有完整背景色，不得只局部著色。
- **FR-019**: 系統 MUST 讓「ない形容詞」與「だ助動詞」主內容中的假名欄維持不換行；其中「だ助動詞」的「被修飾的名詞」接尾欄位必須固定顯示為兩行，第一行為「被修飾」，第二行為「的名詞」。
- **FR-020**: 系統 MUST 將本次版面微調限制在被明確指定的 section、列與儲存格；未被點名的其他內容與排版規則都必須維持既有參考頁狀態。

### Key Entities

- **GrammarSection**: 代表 `/grammar` 主內容中的一個容器，包含唯一識別、標題、副標題、預設展開狀態與其內部內容區塊。
- **ReferenceTableBlock**: 代表容器中的一個表格區塊，包含表頭、表身、表尾、特殊儲存格與結構屬性，用於忠實表達參考頁 table。
- **CellPresentationRule**: 代表單一儲存格或列的呈現需求，描述文字內容、換行、對齊、色彩、強調與合併欄列等驗收面向。

## Success Criteria

### Measurable Outcomes

- **SC-001**: 使用者進入 `/grammar` 後，能在一次頁面載入內看到完整 11 個規則容器，且不再看到舊版簡化內容。
- **SC-002**: 11 個容器都能逐一展開並顯示完整內容，人工比對時每個容器都可通過結構、文字、換行、色彩、對齊、字體六大類驗收。
- **SC-003**: 在桌機與手機寬度下檢視 `/grammar` 時，至少 90% 的主要表格區塊不需額外解釋即可依參考頁閱讀順序理解內容，且不得出現遮蓋、重疊或不可讀狀況。
- **SC-004**: 維護者可依規格、任務與測試，在 10 分鐘內定位任一容器的內容來源與應回歸驗收項目。

## Repository Hygiene

- 實作前確認 repository 已包含 `.gitignore`。
- 不提交 `node_modules/`。
- 不提交可重新產生的產物，例如 `build/`、`dist/`、`coverage/`，除非本規格另有明確例外。
- 若本功能變更了 `/grammar` 模組結構、共享工具、route 責任邊界或測試結構，必須同步更新 `PROJECT_ARCHITECTURE.md`。

## Assumptions

- 參考頁 `https://psplover16.github.io/Japanese_Word_Practice_Vue/change-rules` 視為本功能唯一正確基準。
- 既有 `/grammar` 外層 route shell 會保留，但其主內容可完全替換。
- 若為了忠實表達參考頁，需要採用較低抽象程度的資料結構或 route-specific 樣式，視為可接受。
- 依 2026-03-31 實際核對的部署版本，`音便` 不是獨立 accordion，而是「五段動詞表(詞尾母音變化)」中的子表格與副標題。
- 目前專案中任何較舊或較簡化的 grammar 資料模型，若與參考頁衝突，應以參考頁需求優先。
