# Feature Specification: 單字練習補充詞彙

**Feature Branch**: `feature/013-add-vocabulary-entries`  
**Created**: 2026-04-07  
**Status**: Draft  
**Input**: User description: "需求: 子路由-單字練習添加單字。以下單字，如果目前字典檔沒有，幫我添加：1. 皮膚 2. 光滑 3. 動作 4. 說話"

> Write this specification in Traditional Chinese (zh-TW). The Constitution is
> the only governance document that remains English-only.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 補齊指定詞彙覆蓋 (Priority: P1)

作為使用單字練習頁的學習者，我希望在既有的單字清單中能找到這次指定的詞彙意思，這樣我就能直接在同一個練習流程內學習這些內容，而不需要另外查找或懷疑資料是否缺漏。

**Why this priority**: 這次需求的核心價值就是補齊單字練習資料，若指定詞義無法在單字練習頁找到，這個功能即未達成。

**Independent Test**: 開啟 `/vocabulary`，確認使用者能在既有單字練習流程中找到「皮膚」、「光滑」、「動作」、「說話」四個指定詞義的覆蓋內容，且缺少的詞義已被補上。

**Acceptance Scenarios**:

1. **Given** 使用者進入 `/vocabulary`，**When** 使用者瀏覽目前的單字清單，**Then** 系統必須對「皮膚」、「光滑」、「動作」、「說話」四個指定詞義都提供可見的單字覆蓋內容。
2. **Given** 指定詞義中有部分原本缺少，**When** 維護者完成本次交付後，**Then** 使用者必須能在單字練習頁看到這些原本缺少的詞義已成為可練習的正常單字項目。

---

### User Story 2 - 已有詞義不重複新增 (Priority: P2)

作為維護單字資料的負責人，我希望當指定詞義其實已被現有單字覆蓋時，系統不要為了同一個需求再新增一筆重複項目，這樣清單才不會變得混亂，也能保留資料的一致性。

**Why this priority**: 這次需求是補缺漏，不是製造同義重複。若既有清單已滿足指定詞義，重複新增會讓使用者看到多筆相近內容，反而降低可用性。

**Independent Test**: 以目前已存在的指定詞義為例，完成更新後重新檢視 `/vocabulary`，確認沒有因本次需求而多出只為滿足同一詞義的重複列。

**Acceptance Scenarios**:

1. **Given** 某個指定詞義已被現有單字項目覆蓋，**When** 維護者套用本次變更，**Then** 系統不得只為了滿足同一個詞義而再產生一筆新的重複項目。
2. **Given** 使用者在更新後重新查看 `/vocabulary`，**When** 使用者檢視已存在的指定詞義內容，**Then** 系統必須保留原本有效的單字項目，且不得多出讓人誤判為重複學習內容的新列。

---

### User Story 3 - 維持既有單字練習體驗 (Priority: P3)

作為持續使用單字練習頁的學習者，我希望新增或補齊的詞彙與既有單字項目有相同的可見資訊與互動方式，這樣我不需要重新學習另一套操作方式，也不會因這次補詞而破壞原本的練習節奏。

**Why this priority**: 單字內容補齊後仍必須維持頁面一致性，否則資料雖然補上，實際使用時仍可能出現難找、難懂或互動不一致的問題。

**Independent Test**: 在 `/vocabulary` 針對新增或本次覆蓋到的指定詞義進行瀏覽、搜尋、顯示切換與標記互動，確認其表現與既有單字列一致。

**Acceptance Scenarios**:

1. **Given** 指定詞義已在 `/vocabulary` 中被覆蓋，**When** 使用者瀏覽或搜尋這些單字，**Then** 它們必須像既有單字一樣可被辨識、可被找到，且不應出現孤立或不可理解的顯示形式。
2. **Given** 使用者使用 `/vocabulary` 既有的顯示、搜尋或標記互動，**When** 互動落到本次覆蓋的指定詞義上，**Then** 其行為必須與相鄰既有單字項目保持一致。

---

### Edge Cases

- 若指定詞義已被現有單字項目覆蓋，系統必須視為已滿足需求，不得再新增只會造成重複的第二筆內容。
- 若某個指定中文詞義存在多個合理日文對應，交付內容必須選擇一個與該中文詞義最直接一致、且不會與現有資料形成重複覆蓋的標準單字。
- 若新增詞彙被放入既有分類或分組中，使用者仍必須能在單字練習頁正常找到，不得因預設狀態而被隱藏或誤判為遺失。
- `/vocabulary` 在更新後的預設載入、空搜尋、一般瀏覽與標記互動下，都必須避免新增 runtime error、render failure 或 browser console error。
- 本功能範圍僅涵蓋 `/vocabulary` 與支撐該頁的單字內容；`/practice`、`/grammar`、`/n5-grammar` 不在本次功能範圍內，除非需要進行共享穩定性修正。

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 系統 MUST 在 `/vocabulary` 為「皮膚」、「光滑」、「動作」、「說話」四個指定詞義提供完整覆蓋，覆蓋方式可以來自既有單字項目或本次新增的單字項目。
- **FR-002**: 對於目前尚未被覆蓋的指定詞義，系統 MUST 補上新的可練習單字項目。
- **FR-003**: 對於已經被現有單字項目覆蓋的指定詞義，系統 MUST NOT 僅為了滿足本次需求而重複新增第二筆同義覆蓋內容。
- **FR-004**: 每一筆本次新增的單字項目 MUST 提供足以讓學習者辨識單字本體、讀音或發音資訊，以及詞義的使用者可見資訊，且整體呈現方式必須與既有單字項目一致。
- **FR-005**: 本次需求補上的指定詞義 MUST 在既有的 `/vocabulary` 使用流程內可被找到，不得要求使用者切換到其他不相關路由或額外流程才能看到。
- **FR-006**: 本次新增或本次確認已覆蓋的指定詞義 MUST 與 `/vocabulary` 現有的瀏覽、搜尋、顯示切換與標記互動保持一致。
- **FR-007**: 補齊指定詞義時，系統 MUST NOT 刪除、改名、錯置或改變與本需求無關的既有單字項目內容。
- **FR-008**: 若指定詞義已由既有單字項目滿足，使用者在更新後的單字清單中 MUST 只看到一套清楚的覆蓋內容，而不是兩筆僅為滿足同一詞義請求而重複存在的資料。
- **FR-009**: `/vocabulary` 的預設載入、空搜尋狀態、一般瀏覽狀態與標記流程 MUST 在本次更新後保持可用，且不得因本次需求產生新的顯示中斷或操作阻塞。
- **FR-010**: 若本次需求最終不涉及 repository 結構、模組邊界、共享工具、路由結構、測試結構或部署結構調整，系統 MUST 保持 `PROJECT_ARCHITECTURE.md` 不變；若涉及上述變動，系統 MUST 明確同步更新該文件。

### Key Entities *(include if feature involves data)*

- **Requested Vocabulary Meaning**: 本次由使用者指定、需要在單字練習頁被覆蓋的詞義請求，例如「皮膚」、「光滑」、「動作」、「說話」。
- **Vocabulary Entry**: 單字練習頁中供學習者辨識與操作的單字項目，包含單字本體、讀音或發音資訊、詞義，以及既有的列表互動能力。
- **Coverage Decision**: 用來說明某個指定詞義是由既有單字項目滿足，還是需要補新增單字項目才能滿足的判定結果。

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 交付完成後，`/vocabulary` 對本次 4 個指定詞義的覆蓋率達到 100%。
- **SC-002**: 對於在本次變更前就已被覆蓋的指定詞義，交付後因本需求新增的重複列數為 0。
- **SC-003**: 使用者在單次進入 `/vocabulary` 的流程中，可透過既有瀏覽或搜尋方式找到每一個本次新增覆蓋的指定詞義。
- **SC-004**: `/vocabulary` 在本次更新後的預設載入流程中，因這次需求導致的缺列、重複列或新 runtime error 發生率為 0。

## Repository Hygiene *(mandatory)*

- Confirm the repository includes a `.gitignore` file before implementation.
- Do not commit `node_modules/`.
- Do not commit re-generatable artifacts such as `build/`, `dist/`, or
  `coverage/` unless the specification explicitly justifies an exception.
- If the feature changes repository structure, module boundaries, shared
  utilities, route structure, test structure, or deployment structure, the
  specification MUST call out the required update to `PROJECT_ARCHITECTURE.md`.

## Assumptions

- 本次需求以「補足指定詞義的覆蓋」為主；若現有單字已能合理滿足某個指定詞義，則不需要再新增第二個近義詞條。
- 「說話」目前已有既有單字項目可合理視為已覆蓋，因此本次重點是補齊仍缺少的詞義並避免重複新增。
- 對於尚未覆蓋的指定詞義，後續實作會選用一個與該中文詞義直接對應、且適合目前學習清單脈絡的標準日文單字。
- 本次需求不預設新增新路由、新分類機制或獨立的單字管理流程，而是沿用既有 `/vocabulary` 體驗完成交付。
