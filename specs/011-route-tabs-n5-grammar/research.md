# Research: 路由切換與 N5 文法入口優化

## Decision 1: 共享頁首直接移除 route title 呈現

- Decision: 在 `AppShell.vue` 直接移除 `AppHeader` 的視覺輸出，讓共享頁首只保留 route tabs。
- Rationale: 需求明確要求移除左側標題，而不是把標題保留但隱藏；直接移除可以避免殘留空白占位、減少 layout 複雜度，也最符合「最簡單可行方案」。
- Alternatives considered:
  - 僅以 CSS 隱藏標題：會留下無意義結構與潛在寬度占位，不夠乾淨。
  - 保留標題但縮小到極小尺寸：違反需求，且會讓可讀性判準變模糊。

## Decision 2: `RouteTabs` 採「容器可換列、按鈕文字不換行」策略

- Decision: `RouteTabs.vue` 使用可換列的 flex 容器，並讓每顆按鈕套用單行文字規則與放大字級。
- Rationale: 這是唯一能同時滿足「按鈕太多時用斷行表示」與「按鈕內文字不斷行」兩個需求的簡單策略；也最容易用現有 Tailwind class 與 e2e 驗證。
- Alternatives considered:
  - 整排強制單列並縮小字級：會與文字放大需求衝突。
  - 改成水平捲動 tabs：需求明確偏向換列，而不是讓使用者橫向滑動。
  - 讓按鈕文字自行換行：會直接違反按鈕內文字不斷行的要求。

## Decision 3: `N5文法` 先用獨立模組承載 placeholder route

- Decision: 新增 `src/modules/n5Grammar/views/N5GrammarView.vue` 作為獨立 route-specific view。
- Rationale: 新功能目前只有占位內容，獨立模組最能清楚表達 ownership，也避免把未來 N5 文法內容與既有 `/grammar` 變化規則模組混在一起。
- Alternatives considered:
  - 直接塞進 `GrammarView.vue`：會模糊既有 `/grammar` 與新 route 的責任邊界。
  - 在 `RouteTabs` 中暫放無法點擊按鈕：不符合使用者要求新增真正 route。

## Decision 4: 清音與濁音／半濁音字級調整限定在 `/practice` 指定表格

- Decision: 僅透過 `PracticeView` 對應區塊與 `main.css` 的 route-specific selector 放大兩個表格的文字。
- Rationale: 需求明示不得影響未提及區塊，因此不能用全域字級、共用 table primitive 或 base button / input 樣式調整來達成。
- Alternatives considered:
  - 直接調整全站 table 字級：風險過大，會波及 `/grammar` 與 `/vocabulary`。
  - 直接在每個 cell 內硬寫 inline class：可行但維護成本較高，也不利於後續整體微調。

## Decision 5: 文件回寫要涵蓋原始 route shell 規格

- Decision: 把 `001`、`003`、`004` 視為本次優先回寫的來源 spec，並在實作時檢查 `006`、`007` 是否需同步校正。
- Rationale: 本功能調整的是全域主路由殼層與手機版 tabs 行為，若只更新新 spec 而不回寫既有 shell 規格，後續文件會彼此矛盾。
- Alternatives considered:
  - 只更新新 spec：違反 Constitution 的 specification-sync 原則。
  - 大量回寫所有歷史 spec：成本過高，因此聚焦真正持有 shell 行為定義的來源文件。
