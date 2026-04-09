# 實作計畫：N5 文法敬體變化區塊重整

**分支**: `feature/014-n5-grammar-table` | **日期**: 2026-04-09 | **規格**: [spec.md](./spec.md)  
**輸入**: 來自 `/specs/014-n5-grammar-table/spec.md` 的功能規格

## 摘要

本功能以最小結構變更重整 `/n5-grammar` 的前三個核心區塊命名與前兩個區塊的內容分工：新增第一個獨立區塊 `敬體變化速覽`，承接原 `句型與詞類敬體基礎` 的敬體比較表，並為每個表格儲存格補上至少一組簡單例句；同時將原 `sentence-basics` 區塊移除表格、改名為 `敬體句型：現在型與詞類基礎`，保留其餘既有主題、提醒與例句內容；原第三個核心區塊則調整為 `敬體句型：過去、狀態與補充表現`。技術上沿用既有資料驅動的 `n5GrammarSections` 與 `N5GrammarCompareTable.vue`，只擴充 compare-table 專用資料結構與對應測試，不新增新的 route、全域狀態或共用抽象。

## 技術背景

**語言／版本**: TypeScript 5.9、Vue 3.5 SFC  
**主要依賴**: Vue 3、Vue Router 4、Vite 7、Vitest、Vue Test Utils、Playwright  
**儲存方式**: 靜態 TypeScript 文法資料檔 `grammarNotes.ts`；無後端、無資料庫  
**測試**: `npm run lint`、`npm run typecheck`、Vitest 單元／元件測試、Playwright e2e、`npm run build`  
**目標平台**: 瀏覽器端 SPA / PWA（Vite 建置，GitHub Pages 部署）  
**專案型態**: 單一前端 Web Application  
**效能目標**: 維持 `/n5-grammar` 預設 render-safe、預設收合互動與 375px 手機版可讀性不回歸；新增例句內容不得造成明顯渲染卡頓、水平溢出或瀏覽器主控台錯誤  
**限制**: 功能只屬於 `/n5-grammar`；新 `敬體變化速覽` 仍維持預設收合；例句覆蓋以每個儲存格一組為準；新增例句不得與既有 N5 文法例句完全相同；不得讓新標題或新測試 id 外溢到其他 route  
**規模／範圍**: 1 個資料檔、1 個型別檔、1 個 compare-table renderer、可能少量 route-specific 樣式、7 個左右單元／元件／e2e 測試檔調整；新增 1 個 section、重整 1 個既有 section、補上 12 組表格儲存格例句

## 憲章檢查

*關卡：必須先通過本節，才能進入階段 0 研究；完成階段 1 設計後需再次確認。*

- 通過。`spec.md`、本計畫與後續產物皆以繁體中文撰寫；只有憲章文件維持英語。
- 通過。儲存庫已有 `.gitignore`，本功能不會提交 `node_modules/`、`dist/`、`coverage/` 等可重建產物。
- 通過。規劃上沿用既有 `src/modules/n5Grammar/` 模組與測試目錄，不新增新目錄或新模組邊界；但 `N5GrammarCompareTable.vue` 的責任會擴充成「表格後接儲存格例句群組」，因此完成實作時需同步更新 `PROJECT_ARCHITECTURE.md`。
- 通過。`/n5-grammar` 路由入口最初建立於 [`specs/011-route-tabs-n5-grammar/spec.md`](C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/specs/011-route-tabs-n5-grammar/spec.md)，正式學習頁行為則建立於 [`specs/012-n5-grammar-route/spec.md`](C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/specs/012-n5-grammar-route/spec.md)。本次重整的權威需求記錄為 [`specs/014-n5-grammar-table/spec.md`](C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/specs/014-n5-grammar-table/spec.md)，並且必須同步回寫 `012` 以反映新的前兩個區塊行為。
- 通過。測試策略已定義：更新 `n5GrammarData.spec.ts`、`N5GrammarSections.spec.ts`、`N5GrammarViewSmoke.spec.ts`、`AppShellSmoke.spec.ts`、`RouteOwnership.spec.ts`、`app-shell.smoke.spec.ts`、`n5-grammar-layout.spec.ts`，必要時再補 route-specific selector 驗證。
- 通過。render-safe 策略明確：所有 section 預設仍收合，初始 render 需只顯示標題，不顯示空白內容或錯誤；展開後才顯示表格與例句內容。
- 通過。正向 ownership 僅限 `/n5-grammar`；負向 ownership 明確要求 `/practice`、`/grammar`、`/vocabulary` 不得出現 `敬體變化速覽` 或其專屬內容。
- 通過。重用邊界明確：只擴充 `N5GrammarCompareTable.vue` 以支援 compare-table 專屬的表格例句，不引入新的全域共用 renderer 或共享樣式系統。
- 通過。本次複雜度中低，採「新增一個 section + 擴充現有 compare-table 資料結構」是最簡單可行方案，避免另開新 presentation mode 或分拆新 route。

## 專案結構

### 文件（本功能）

```text
specs/014-n5-grammar-table/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/
    └── n5-grammar-polite-overview-contract.md
```

### 原始碼（儲存庫根目錄）

```text
src/
├── modules/
│   └── n5Grammar/
│       ├── components/
│       │   └── N5GrammarCompareTable.vue
│       ├── data/
│       │   └── grammarNotes.ts
│       └── types/
│           └── grammarNotes.ts
└── styles/
    └── main.css

tests/
├── component/
│   ├── AppShellSmoke.spec.ts
│   ├── N5GrammarSections.spec.ts
│   ├── N5GrammarViewSmoke.spec.ts
│   └── RouteOwnership.spec.ts
├── e2e/
│   ├── app-shell.smoke.spec.ts
│   └── n5-grammar-layout.spec.ts
└── unit/
    └── n5GrammarData.spec.ts
```

**結構決策**: 維持現有單一 Vite/Vue 前端專案與 `n5Grammar` 資料驅動架構，不新增新的 presentation mode 或 route，而是把新總覽需求封裝在既有 compare-table 模式內。  
**架構文件影響**: 雖然不新增新目錄或新檔，但 `N5GrammarCompareTable.vue` 會從「表格後接 topics」擴充為「表格後接儲存格例句群組與必要 topics」，因此完成實作時需同步更新 `PROJECT_ARCHITECTURE.md`。

## 階段 0：研究摘要

研究結果記錄於 [research.md](./research.md)。本階段確認：

1. 新總覽應採「新增一個 section」而不是把現有 `sentence-basics` 直接一分為二的模板技巧，這樣最符合「排序第一、保留原內容」且最少破壞既有 topic/source coverage 關聯。
2. 原 `sentence-basics` 的 section id 應保留不變，只更新其標題、排序與 `presentationMode`，可降低既有 topic id、source coverage 與測試 selector 漂移風險。
3. compare-table 現況只支援表格 + topic 卡片；為了滿足「每個儲存格一組例句」而不塞出 12 個一般 topic，應在 `N5GrammarSection` 上增加 compare-table 專用的 `tableExampleGroups`，由 `N5GrammarCompareTable.vue` 直接渲染。
4. 使用者已釐清覆蓋粒度是「每個儲存格一組例句」，因此 `じゃありません / ではありません` 這類替代寫法可在同一 group 內以註記呈現，不需要拆成兩組例句。
5. 使用者已釐清新第一區塊仍維持預設收合，因此不需改動 `N5GrammarSectionCard.vue` 的 `defaultExpanded` 行為，只需更新排序與標題可見性測試。
6. 新增例句的風險集中在與既有句子重複，而不是語法結構本身；因此測試應補上 overview group 的存在性與例句唯一性，而不是另建更複雜的來源同步機制。

## 階段 1：設計與契約

### 資料設計

- 在 [`src/modules/n5Grammar/data/grammarNotes.ts`](C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/src/modules/n5Grammar/data/grammarNotes.ts) 新增第一個 core section：
  - `id: "polite-overview"`
  - `title: "敬體變化速覽"`
  - `presentationMode: "compare-table"`
  - `order: 1`
  - 保留目前 `sentence-basics` 的同一份比較表內容
  - 追加 `tableExampleGroups`，以 4 列 x 3 欄共 12 組為目標覆蓋每個儲存格
- 既有 `sentence-basics` section 轉為：
  - `title: "敬體句型：現在型與詞類基礎"`
  - `presentationMode: "info-stack"`
  - `order: 2`
  - `table` 移除
  - 原本 `topics`、`sharedNotes`、`sourceRefs` 盡量保持不變
 - 原 `past-and-state` section 轉為：
  - `title: "敬體句型：過去、狀態與補充表現"`
  - `order: 3`
  - 保留原本 `topics`、`sharedNotes` 與資料內容
- 在 [`src/modules/n5Grammar/types/grammarNotes.ts`](C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/src/modules/n5Grammar/types/grammarNotes.ts) 新增 compare-table 專用資料型別 `N5GrammarTableExampleGroup`，規劃欄位為：
  - `id`
  - `rowId`
  - `columnIndex`
  - `forms`
  - `examples`
  - `note?`
- `tableExampleGroups` 掛在 `N5GrammarSection` 上作為 optional 欄位，只給 compare-table section 使用，避免新增新的 presentation mode。
- overview 區塊的新增例句全部標記為 `origin: "supplemental"`，用來區隔既有來源筆記例句與本次新補的表格示範句。
- `n5GrammarSourceCoverage` 預期不需重構 section/topic 對應；既有 chapter 1 來源仍可維持映射到 `sentence-basics` 的教學 topics，新 overview 視為補充型展示，不另建立 source coverage 規則。

### Renderer 與樣式設計

- 擴充 [`src/modules/n5Grammar/components/N5GrammarCompareTable.vue`](C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/src/modules/n5Grammar/components/N5GrammarCompareTable.vue)，在表格下方渲染 `tableExampleGroups`：
  - group 標題由對應 row label + column label 組成
  - group 內先顯示 `forms`，再顯示例句卡片
  - 若存在 `note`，用既有 note 樣式或最小新增樣式呈現
- 若現有 `main.css` 缺少 table example group 的版面樣式，僅在 [`src/styles/main.css`](C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/src/styles/main.css) 增加 `/n5-grammar` 專屬 class，不抽成其他 route 共用樣式。
- `N5GrammarSectionCard.vue` 不調整互動邏輯；所有 section 仍預設收合，藉由 `order` 改變新區塊排序。

### 驗證設計

- 更新 [`tests/unit/n5GrammarData.spec.ts`](C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/tests/unit/n5GrammarData.spec.ts)
  - 驗證 `polite-overview` 排在第一個、`sentence-basics` 排在第二個
  - 驗證 `sentence-basics` 已無 `table` 且改為 `info-stack`
  - 驗證 `polite-overview.tableExampleGroups` 存在且覆蓋 12 個儲存格
  - 驗證 12 組例句順序固定為名詞 / な形容詞四型、い形容詞四型、動詞四型
  - 驗證每組 overview 例句至少有日文／讀音／翻譯，且 `origin` 固定為 `supplemental`
  - 驗證 overview 新例句不與既有 N5 文法例句完全重複
  - 調整既有「每個 section 都有 topics」假設，改成允許 `polite-overview` 以 `tableExampleGroups` 提供主要內容
- 更新 [`tests/component/N5GrammarSections.spec.ts`](C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/tests/component/N5GrammarSections.spec.ts)
  - 驗證 `polite-overview` 預設收合
  - 展開後看得到 compare table 與至少一個 table example group
  - 驗證 `sentence-basics` 展開後不再出現 compare table
- 更新 [`tests/component/N5GrammarViewSmoke.spec.ts`](C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/tests/component/N5GrammarViewSmoke.spec.ts)、[`tests/component/AppShellSmoke.spec.ts`](C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/tests/component/AppShellSmoke.spec.ts)、[`tests/component/RouteOwnership.spec.ts`](C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/tests/component/RouteOwnership.spec.ts)
  - 將舊標題 assertions 改為 `敬體變化速覽` / `敬體句型：現在型與詞類基礎` / `敬體句型：過去、狀態與補充表現`
  - 保留 negative ownership 驗證
- 更新 [`tests/e2e/app-shell.smoke.spec.ts`](C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/tests/e2e/app-shell.smoke.spec.ts)、[`tests/e2e/n5-grammar-layout.spec.ts`](C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/tests/e2e/n5-grammar-layout.spec.ts)
  - 驗證 `/n5-grammar` 首屏可見新標題
  - 以 `polite-overview` 的 toggle / table test id 驗證手機寬度展開後可見表格與例句，不破版
  - 驗證 375px 下 `sentence-basics` 展開後仍可讀，且 `/n5-grammar` 初始與展開流程沒有 console error / page error

### 契約設計

- 本功能的 UI / route 契約記錄於 [contracts/n5-grammar-polite-overview-contract.md](./contracts/n5-grammar-polite-overview-contract.md)。
- 契約聚焦於：
  - `/n5-grammar` 前兩個 section 的 id、順序、標題與預設收合狀態
  - `polite-overview` compare table 與 table example group 的可見性要求
  - `sentence-basics` 移除表格後的保留內容要求
  - `/practice`、`/grammar`、`/vocabulary` 的負向 ownership

## 階段 2：實作策略

1. 擴充 `grammarNotes` 型別與 compare-table section 資料，新增 `polite-overview` 並重整 `sentence-basics`。
2. 在 `N5GrammarCompareTable.vue` 增加 table example group renderer，必要時補上最小 `/n5-grammar` 專屬樣式。
3. 先更新 `n5GrammarData.spec.ts` 與 `N5GrammarSections.spec.ts` 反映新資料結構，再同步調整 smoke / ownership / e2e 斷言。
4. 執行 `npm run lint`、`npm run typecheck`、目標化 Vitest、`npm run build`、目標化 Playwright，確認 `/n5-grammar` 新首屏、兩個前導區塊與其他 route 範圍都穩定。
5. 同步回寫 [`specs/012-n5-grammar-route/spec.md`](C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/specs/012-n5-grammar-route/spec.md) 與 `PROJECT_ARCHITECTURE.md`，讓既有 `/n5-grammar` 行為描述與 compare-table renderer 責任反映本次實作結果。

## 風險與緩解措施

- **風險: `tableExampleGroups` 增量資料設計不足，導致 renderer 需要硬編碼 row/column 邏輯**
  - 緩解: 在型別中明確保留 `rowId`、`columnIndex` 與 `forms`，讓渲染能從 table 與 group 共同推導標題，而不是寫死文案。
- **風險: 單元測試仍假設所有 section 都有 topics，導致資料重整後整組測試失敗**
  - 緩解: 先調整 `n5GrammarData.spec.ts` 的資料契約，再進行內容實作。
- **風險: 新 overview 例句與既有句子重複，違反規格**
  - 緩解: 以 overview group 的 `japanese` 字串集合與現有例句集合做 targeted 驗證。
- **風險: 首個 section id 由 `sentence-basics` 改成 `polite-overview` 後，現有 component/e2e selector 全面漂移**
  - 緩解: 在 plan 中明列需要同步更新的 test ids，並保留 `sentence-basics` 既有 id 給重命名後的第二區塊，以降低變更面。
- **風險: 手機版在表格下再加例句 group，導致內容過長或溢出**
  - 緩解: 僅增補 `/n5-grammar` 專屬樣式與既有例句卡片樣式的最小延伸，並保留 `n5-grammar-layout` e2e 作為 375px 防線。

## 複雜度追蹤

| 偏離項 | 必要原因 | 為何不採用更簡單的替代方案 |
|--------|----------|------------------------------|
| 無 | N/A | N/A |
