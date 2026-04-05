# Feature Specification: N5 文法學習子路由

**Feature Branch**: `012-n5-grammar-route`  
**Created**: 2026-04-05  
**Status**: Draft  
**Input**: User description: "建立 N5 文法子路由學習頁面，整理零散筆記內容並支援後續擴充"

> Write this specification in Traditional Chinese (zh-TW). The Constitution is
> the only governance document that remains English-only.

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - 閱讀完整的 N5 文法整理內容 (Priority: P1)

使用者進入 `N5文法` 子路由後，可以看到依主題整理好的文法學習內容，內容已將來源筆記中的零散段落、錯誤、重複註記與補充說明整合成可閱讀的學習資料。

**Why this priority**: 這是此功能的核心價值，若無法先把內容完整、正確且可讀地呈現，後續分組、收合與擴充都沒有意義。

**Independent Test**: 開啟 `N5文法` 子路由，逐一檢查來源筆記中每個已列出的文法事項都能在頁面上找到對應內容，且每個文法項目都有說明與至少一個例句。

**Acceptance Scenarios**:

1. **Given** 使用者進入 `N5文法` 子路由, **When** 頁面完成載入, **Then** 使用者可以看到由來源筆記整理出的文法主題群組，而不是「製作中」占位內容。
2. **Given** 某個文法項目在來源筆記中有錯字、錯誤變化或不完整說明, **When** 該項目被整理到學習頁面, **Then** 頁面顯示的內容必須是修正後且足以自學理解的版本，並保留原始學習意圖。
3. **Given** 某個文法項目在來源筆記中已附範例, **When** 該項目被整理後, **Then** 頁面必須優先沿用來源範例，只有在原範例不足以說明時才補入新的範例。

---

### User Story 2 - 透過分組與收合快速定位文法 (Priority: P2)

使用者可以依照整理後的主題分組快速瀏覽 N5 文法內容，每個群組都能獨立展開或收合，讓讀者在大量內容中仍能快速找到需要的章節。

**Why this priority**: 來源筆記內容零散且會持續增加，若沒有可維持秩序的分組與收合機制，頁面很快就會失去可讀性與擴充性。

**Independent Test**: 在桌面與手機寬度下開啟頁面，確認每個群組都有可操作的展開/收合控制，且展開後能清楚讀取該組內容，不展開時不會干擾其他群組閱讀。

**Acceptance Scenarios**:

1. **Given** 使用者停留在 `N5文法` 子路由, **When** 使用者查看頁面群組標題列, **Then** 每個群組都必須提供明確的展開/收合控制，且標題本身不混入長段落說明。
2. **Given** 使用者展開任一主題群組, **When** 群組內容顯示, **Then** 群組內的說明、範例與補充註記必須以有助快速理解的版型呈現，並與其他群組維持一致的外部排版節奏。

---

### User Story 3 - 理解相近與重複文法的差異 (Priority: P3)

使用者在閱讀內容時，可以看見已被合併整理的相似文法、重複註記與共同規則，避免同一觀念分散在多處造成重複閱讀與理解困難。

**Why this priority**: 來源筆記明確要求去重、合併與重新分類，這直接影響學習效率與後續維護成本。

**Independent Test**: 檢查來源筆記中重複出現的觀念是否已整併到單一主題群組或共同說明區塊，且不會在多個位置以互相矛盾的版本重複出現。

**Acceptance Scenarios**:

1. **Given** 來源筆記中同一規則或註記在多處重複出現, **When** 內容被整理成學習頁面, **Then** 該規則必須被合併為單一清楚說明，並在對應文法項目中被正確引用或歸類。
2. **Given** 多個文法點具有高度相似的使用情境或對照關係, **When** 頁面呈現這些內容, **Then** 版型必須幫助使用者一眼看出差異或共通點，而不是把它們拆成互不相關的零散段落。

---

### User Story 4 - 後續可持續擴充 N5 文法內容 (Priority: P4)

內容維護者在之後加入更多 N5 筆記時，可以沿用既有分類原則、版型選擇規則與命名方式擴充頁面，而不需要重做整頁結構。

**Why this priority**: 此頁面會持續增補筆記內容，若結構不可持續擴充，後續每次更新都會造成高風險重整。

**Independent Test**: 審查頁面結構與內容規則，確認新增一個新的文法群組時不需要改變既有群組的閱讀方式、排序規則或頁面導覽模式。

**Acceptance Scenarios**:

1. **Given** 之後加入新的 N5 文法筆記內容, **When** 維護者依既有規則新增新的主題群組, **Then** 新內容必須能沿用相同的群組容器、版型判斷原則與收合行為，而不需重新設計整頁資訊架構。

---

### Edge Cases

- 若來源筆記中的某個文法說明明顯錯誤、例句變化錯誤或敬體形式拼寫錯誤，頁面必須顯示修正後內容，不能原樣搬移錯誤資訊。
- 若來源筆記中的註記只寫了關鍵詞、半句提醒或括號備註，整理後內容必須補成完整可讀的說明，不能保留成只有作者本人看得懂的碎片句。
- 若同一個概念同時出現在不同章節，例如助詞功能、動詞變化或固定搭配，頁面必須決定一個主要歸屬並在其他位置避免重複展開相同說明。
- 若文法項目之間適合對照閱讀，應使用能明確呈現差異的版型；若不適合對照，則不得為了視覺一致而硬套表格。
- 助詞相關內容必須永遠排在最後一組，且助詞群組內的排序要遵循來源筆記出現順序，即使其他主題經過重新分組也不能打亂這項規則。
- 群組標題列只能承載標題與展開/收合控制，群組說明必須獨立放在內容區，不得把長說明混進標題列。
- 頁面初始渲染時，若某些群組尚未展開，仍必須保持可安全渲染，不得出現空白錯位、控制失效或以舊的占位文案覆蓋正式內容。
- 本功能範圍僅限 `N5文法` 子路由；`變化規則`、`單字練習`、`字母練習` 與共享導覽僅可作為版型與命名參考，不得被意外改成承載 N5 文法內容。

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 系統 MUST 在 `N5文法` 子路由提供正式的學習內容頁，取代目前僅顯示占位訊息的狀態。
- **FR-002**: 系統 MUST 以 `/_private/_private_notes/v11/note.txt` 與 `/_private/_private_notes/v11/note2.txt` 為本次內容整理範圍，將其中明確提到的所有文法事項納入頁面，任何漏缺都視為功能未完成。
- **FR-003**: 系統 MUST 將來源筆記中的零散段落整理成具可讀性的學習資料，包括修正文法錯誤、補足不完整說明、統一語句結構，並保留原始學習重點。
- **FR-004**: 系統 MUST 讓每個文法項目都包含「用途或規則說明」以及「至少一個例句」；若來源筆記已有例句，必須優先使用來源例句。
- **FR-005**: 系統 MUST 在來源筆記的例句不足、說明不清或內容錯誤時補入必要說明或補充例句，使讀者可在不查閱原始筆記的情況下理解該項目。
- **FR-006**: 系統 MUST 統一專有名詞、念法與讀音標示方式，凡是與既有 `變化規則` 子路由共用的術語，必須採用相同稱呼與念法。
- **FR-007**: 系統 MUST 將相同或高度相似的內容歸為同一群組，並把重複出現的說明、註記或共同規則整併成單一清楚版本。
- **FR-008**: 系統 MUST 將助詞相關內容放在所有群組的最後，且助詞內部的排列順序必須遵循來源筆記中首次出現的順序。
- **FR-009**: 系統 MUST 讓每個主題群組以獨立容器呈現，並提供與 `變化規則` 子路由一致的展開/收合互動模式。
- **FR-010**: 系統 MUST 讓群組外部排版、頁面功能節奏與 `變化規則` 子路由保持一致，但容器內部可依內容特性使用不同排版方式。
- **FR-011**: 系統 MUST 將群組標題與群組說明分開呈現；標題列不得混入完整敘述、補充說明或例句。
- **FR-012**: 系統 MUST 為每個主題群組選擇最能幫助快速理解的呈現方式，至少包含以下三類可接受模式之一：條列式說明混合範例、對照表格後接範例、先說明後範例；若採用其他模式，規格與後續實作說明必須記錄其優於既有模式的理由。
- **FR-013**: 系統 MUST 在適合對照的內容上使用能清楚表現差異的排版，不得把本質上需要連續閱讀的敘述強行塞入表格。
- **FR-014**: 系統 MUST 保留來源筆記內括號註記所承載的資訊價值，包括翻譯、漢字念法、補充備註與使用限制，但應整理成易讀格式，不得原封不動堆疊為雜亂括號串。
- **FR-015**: 系統 MUST 明確區分主要說明、補充註記、例句與固定搭配，避免不同層級資訊混在同一行造成閱讀困難。
- **FR-016**: 系統 MUST 讓讀者能從頁面上識別哪些內容是共通規則、哪些內容是特定文法項目的個別說明。
- **FR-017**: 系統 MUST 只在 `N5文法` 子路由新增或替換此功能內容，不得把 N5 文法學習資料外溢到 `變化規則`、`字母練習` 或 `單字練習` 子路由。
- **FR-018**: 系統 MUST 維持可擴充的資訊架構，讓後續新增 N5 文法群組時可以沿用同一套分組規則、排序規則與容器呈現方式。
- **FR-019**: 系統 MUST 讓頁面在合法的預設狀態下安全渲染，包含尚未展開任何群組時也能正常顯示群組標題、操作控制與既有正式內容。
- **FR-020**: 若本功能會改變專案的路由說明、模組職責、測試結構或共享版型邊界，規格與實作 MUST 一併更新 `PROJECT_ARCHITECTURE.md`。

### Key Entities *(include if feature involves data)*

- **來源筆記文件**: 本次整理的原始內容來源，包含章節順序、括號備註、例句與零散註記；是判斷收錄完整性的基準。
- **文法群組**: 頁面上的主要內容容器，代表一組經整理後的相關文法主題，具有標題、說明、排序位置、展開狀態與版型類型。
- **文法條目**: 群組內的單一學習單位，包含文法名稱、用途說明、補充規則、例句與必要的讀音或翻譯資訊。
- **共通說明**: 從多個重複筆記中抽離出的共享規則或統一註記，可被一個以上文法條目參照。
- **例句**: 用於支援理解的實際句子，優先來自來源筆記，必要時可補充；需能對應回所屬的文法條目或共通說明。

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 來源筆記中明確列出的文法事項、補充註記與章節主題有 100% 被收錄到 `N5文法` 頁面，且無遺漏項目。
- **SC-002**: 每個文法條目皆提供至少一段用途說明與一個例句，缺少任一項即視為未達標。
- **SC-003**: 使用者在頁面載入後 30 秒內可透過群組標題與收合機制找到目標主題群組，且不需要先閱讀全部內容才能定位。
- **SC-004**: 助詞相關內容在最終頁面排序中全部位於最後一組，且其內部順序與來源筆記順序完全一致。
- **SC-005**: 以桌面與手機版檢視頁面時，所有群組都可成功展開與收合，且不出現占位文案殘留、內容重疊或無法辨識標題/說明層級的情況。

## Repository Hygiene *(mandatory)*

- Confirm the repository includes a `.gitignore` file before implementation.
- Do not commit `node_modules/`.
- Do not commit re-generatable artifacts such as `build/`, `dist/`, or
  `coverage/` unless the specification explicitly justifies an exception.
- If the feature changes repository structure, module boundaries, shared
  utilities, route structure, test structure, or deployment structure, the
  specification MUST call out the required update to `PROJECT_ARCHITECTURE.md`.

## Assumptions

- 本次功能只涵蓋目前 `v11` 筆記檔中已提供的內容；未來新增筆記將以同一資訊架構另行擴充，不要求本次預留空白章節。
- 若來源筆記中的例句或變化形式有明顯錯字，可直接改為正確形式，不需在頁面中保留錯誤版本對照。
- 若同一文法同時需要「共同規則」與「個別例句」，系統會優先以單一共通說明整併，再於個別條目保留最小必要差異。
- 本次功能不包含在頁面上編輯原始筆記、搜尋筆記內容、匯出教材或新增使用者互動題目。
