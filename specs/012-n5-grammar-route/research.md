# Research: N5 文法學習子路由

## Decision 1: 以結構化靜態資料承載整理後的文法內容

**Decision**: 將 `v11` 筆記整理成 `src/modules/n5Grammar/data/grammarNotes.ts` 的結構化靜態資料，並搭配明確型別定義每個群組、主題、共通註記與例句。

**Rationale**:  
這次的重點不是單純排版，而是先把破碎筆記轉成可持續維護的學習資料。若直接把內容寫死在 template 中，後續擴充與檢查漏缺都會非常困難。結構化資料也能讓 unit test 驗證「每個主題都有說明與例句」、「助詞在最後一組」等規則。

**Alternatives considered**:

- 直接把內容硬寫進 `N5GrammarView.vue`
  不採用，因為內容量會快速膨脹，且難以驗證完整性。
- 沿用 `changeRules.ts` 的資料形狀
  不採用，因為 N5 文法內容混合敘述、共通說明與比較對照，需求比既有變化規則更異質。

## Decision 2: 外部容器沿用 grammar accordion 節奏，內容 renderers 改為 N5 專屬

**Decision**: 群組外部容器與展開/收合交互沿用 `變化規則` 的閱讀節奏，但在 `src/modules/n5Grammar/components/` 建立 N5 專屬 renderers 來處理條列、說明塊與比較表。

**Rationale**:  
Spec 明確要求外容器與 `變化規則` 相同，但也要求內部排版依內容特性選擇。這代表共享殼層可以重用，但內部資料與呈現不能被既有 grammar tables 綁死。

**Alternatives considered**:

- 完全重用 `grammar/` 下所有表格元件
  不採用，因為會迫使敘述型內容假裝成活用表或規則表，違反可讀性需求。
- 完全獨立重寫所有容器與收合邏輯
  不採用，因為會失去跨路由一致性，也增加維護成本。

## Decision 3: 內容整理流程先資料正規化，再做頁面排版

**Decision**: 實作順序遵循使用者補充要求，先做文檔引入、修正、補充、學習化整理、再次校對、分類與漏缺比對，再進入外容器與內容填寫。

**Rationale**:  
這個順序能避免先做 UI 後才發現資料分組不對，造成重做。也能讓 tasks 更清楚區分「資料正規化」與「畫面組裝」。

**Alternatives considered**:

- 先做頁面外觀，再邊填內容邊修資料
  不採用，因為容易把暫時性的分類誤當成最終設計。

## Decision 4: 測試以資料完整性 + route smoke + 375px e2e 為核心

**Decision**: 新增 unit test 驗證資料規則，component smoke 測試驗證 `/n5-grammar` 初始 render 與 ownership，e2e 驗證手機寬度下的展開/收合與版面穩定性。

**Rationale**:  
這次風險最高的不是演算法，而是內容完整性、路由邊界與小螢幕閱讀穩定性。這三層測試剛好覆蓋資料、元件與實際畫面風險。

**Alternatives considered**:

- 只做 smoke test
  不採用，因為無法驗證資料漏缺或助詞排序規則。
- 只做 e2e
  不採用，因為內容檢查成本高且失敗定位慢。
