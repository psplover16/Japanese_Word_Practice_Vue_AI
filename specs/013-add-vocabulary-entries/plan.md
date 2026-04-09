# 實作計畫：單字練習補充詞彙

**分支**: `feature/013-add-vocabulary-entries` | **日期**: 2026-04-09 | **規格**: [spec.md](./spec.md)  
**輸入**: 來自 `/specs/013-add-vocabulary-entries/spec.md` 的功能規格

## 摘要

本功能以最小變更方式補齊 `/vocabulary` 的指定詞義覆蓋：在 [`src/modules/vocabulary/data/jpWords.ts`](C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/src/modules/vocabulary/data/jpWords.ts) 尾端追加 3 筆新詞條 `肌`、`滑らか`、`動き`，沿用既有 `話す -> 說話` 作為現成覆蓋，不改動 `/vocabulary` 的路由、元件結構、共享介面、搜尋流程或標記互動。實作同時要同步調整資料筆數基線與回歸測試，確保既有初始渲染安全、搜尋、長按揭露與路由範圍行為不回歸。

## 技術背景

**語言／版本**: TypeScript 5.9、Vue 3.5 SFC  
**主要依賴**: Vue 3、Vue Router 4、Vite 7、Vitest、Vue Test Utils、Playwright  
**儲存方式**: 靜態 TypeScript 字典資料檔；既有 `localStorage` 註記機制維持不變  
**測試**: `npm run lint`、`npm run typecheck`、Vitest 單元／元件測試、Playwright e2e、`npm run build`  
**目標平台**: 瀏覽器端 SPA / PWA（Vite 建置，GitHub Pages 部署）  
**專案型態**: 單一前端 Web Application  
**效能目標**: 維持 `/vocabulary` 在約 1k 筆靜態資料下的同步過濾與初始渲染體感無回歸；本次新增不得引入新的執行期錯誤、渲染失敗或瀏覽器主控台錯誤  
**限制**: 新增詞條必須追加在字典檔最後面；不得重排既有資料；不得為「說話」新增重複詞條；不得改動 `/practice`、`/grammar`、`/n5-grammar` 介面範圍  
**規模／範圍**: 1 個資料檔、3 個新增詞條、1 個既有覆蓋判定、數量基線由 1076 提升到 1079、更新少量單元／元件／e2e 基線

## 憲章檢查

*關卡：必須先通過本節，才能進入階段 0 研究；完成階段 1 設計後需再次確認。*

- 通過。`spec.md`、本計畫與後續產物均以繁體中文撰寫；只有憲章文件維持英語。
- 通過。儲存庫已有 `.gitignore`，本功能不會提交 `node_modules/`、`dist/`、`coverage/` 等可重建產物。
- 通過。本功能只調整字典資料與測試基線，不改動儲存庫結構、模組邊界、路由組成或部署流程；預期不需更新 `PROJECT_ARCHITECTURE.md`。
- 通過。本功能屬於既有 `/vocabulary` 介面範圍的內容補充，原始介面建立於 [`specs/007-word-practice-rebuild/spec.md`](C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/specs/007-word-practice-rebuild/spec.md)。本次工作項目以 [`specs/013-add-vocabulary-entries/spec.md`](C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/specs/013-add-vocabulary-entries/spec.md) 作為新增內容的權威記錄，並同步更新受影響的測試與可驗證基線。
- 通過。測試策略已定義：至少更新 vocabulary data 單元測試、`/vocabulary` 冒煙／元件基線、路由範圍冒煙驗證，以及 `/vocabulary` e2e count/search 基線。
- 通過。`/vocabulary` 預設初始渲染與既有互動冒煙測試會保留，確保新增詞條不破壞初始渲染安全行為。
- 通過。正向範圍仍只屬於 `/vocabulary`；負向範圍仍要求 `/practice`、`/grammar`、`/n5-grammar` 不出現本功能專屬介面。
- 通過。本功能不新增共享樣式或新抽象；沿用既有的 vocabulary 路由專屬模組。
- 通過。本次複雜度低，採用僅追加資料更新是最簡單可行方案，無需額外複雜抽象。

## 專案結構

### 文件（本功能）

```text
specs/013-add-vocabulary-entries/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/
    └── vocabulary-entry-coverage-contract.md
```

### 原始碼（儲存庫根目錄）

```text
src/
└── modules/
    └── vocabulary/
        ├── data/
        │   └── jpWords.ts
        ├── types/
        │   └── vocabulary.ts
        ├── utils/
        │   └── vocabularyFilters.ts
        └── views/
            └── VocabularyView.vue

tests/
├── component/
│   ├── RouteOwnership.spec.ts
│   └── VocabularyViewSmoke.spec.ts
├── e2e/
│   └── vocabulary-word-practice.spec.ts
└── unit/
    └── vocabularyData.spec.ts
```

**結構決策**: 維持現有單一 Vite/Vue 前端專案結構，將變更限定在 `src/modules/vocabulary/` 的靜態資料來源與直接依賴該資料筆數的測試基線。  
**架構文件影響**: 預期不需更新 `PROJECT_ARCHITECTURE.md`，因為沒有新增／搬移目錄、模組或責任邊界；若實作過程意外擴大到模組結構調整，需在同一工作項目補寫架構文件更新。

## 階段 0：研究摘要

研究結果記錄於 [research.md](./research.md)。本階段確認：

1. `話す -> 說話` 已存在於字典資料中，因此「說話」不新增新詞條。
2. 經使用者釐清，本次標準詞條固定為 `肌`、`滑らか`、`動き`，且皆以詞典基本型收錄。
3. 新增資料採僅追加策略，直接追加在 `rawVocabularyEntries` 尾端，藉由既有 `normalizeVocabularyEntries()` 自動產生新 id，避免既有 id 全面漂移。
4. 建議 stage 佈局為：`肌` 放 `Stage1_基礎生活`，`滑らか` 與 `動き` 放 `Stage2_日常強化`，以符合既有詞彙語義層級與同類詞分布。
5. 本功能的主要回歸風險不在 UI 結構，而在資料筆數與可搜尋內容的基線更新，因此測試重點應放在 count、覆蓋詞條存在性、無重複新增與路由初始渲染安全。

## 階段 1：設計與契約

### 資料設計

- 只修改 [`src/modules/vocabulary/data/jpWords.ts`](C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/src/modules/vocabulary/data/jpWords.ts) 的 `rawVocabularyEntries`。
- 保留現有尾端資料順序，並在最後一筆之後依序追加：
  1. `はだ / 肌 / 皮膚 / Stage1_基礎生活`
  2. `なめらか / 滑らか / 光滑 / Stage2_日常強化`
  3. `うごき / 動き / 動作 / Stage2_日常強化`
- 由於 `normalizeVocabularyEntries()` 以陣列 index 產生 `id`，追加後新詞條 id 預計為 `1077`、`1078`、`1079`，既有 1..1076 不變。
- `groupVocabularyEntriesByStage()` 依 stage 名稱聚合並保留 stage 首次出現順序，因此「追加在檔尾」只保證原始資料順序，不保證 UI 一定顯示在整頁最底部；新詞會顯示在各自 stage 群組的尾端。

### 驗證設計

- 更新 [`tests/unit/vocabularyData.spec.ts`](C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/tests/unit/vocabularyData.spec.ts)
  - 總筆數 1076 -> 1079
  - 最後 id 1076 -> 1079
  - 明確驗證 `肌`、`滑らか`、`動き` 存在
  - 明確驗證 `話す` 仍提供「說話」覆蓋
  - 明確驗證最後 3 筆新增資料確實位於字典檔尾端，且順序為 `肌`、`滑らか`、`動き`
  - 明確驗證既有尾端基線切片與既有 `話す` 資料未漂移
- 更新 [`tests/component/VocabularyViewSmoke.spec.ts`](C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/tests/component/VocabularyViewSmoke.spec.ts)
  - 預設 count summary 文字 1076 -> 1079
  - 保留既有註記、長按揭露與 marked-only smoke
- 更新 [`tests/e2e/vocabulary-word-practice.spec.ts`](C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/tests/e2e/vocabulary-word-practice.spec.ts)
  - 預設 count summary 1076 -> 1079
  - 搜尋 baseline 改以本次新增詞義或既有可穩定命中的字詞驗證
- 保留 [`tests/component/RouteOwnership.spec.ts`](C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/tests/component/RouteOwnership.spec.ts) 作為負向範圍防線；若有 count 或可見文字耦合，再做最小必要調整。
- 執行 lint、typecheck、build 與目標化測試，確保資料增量不破壞既有路由。

### 契約設計

- 本功能的使用者介面契約記錄於 [contracts/vocabulary-entry-coverage-contract.md](./contracts/vocabulary-entry-coverage-contract.md)。
- 合約聚焦於：
  - 指定詞義對應的日文標準詞條
  - 哪些詞義為新增、哪些沿用既有覆蓋
  - `rawVocabularyEntries` 尾端追加規則
  - `/vocabulary` 預設 count summary 與負向範圍保證

## 階段 2：實作策略

1. 更新 `jpWords.ts` 尾端資料，依規格追加 3 筆新詞條，並確認不新增「說話」重複列。
2. 更新單元／元件／e2e 測試中的資料筆數與可見 count 基線，補上指定詞義覆蓋斷言，以及字典檔尾端追加與既有資料不漂移的保護。
3. 執行 `npm run lint`、`npm run typecheck`、`npx vitest run ...`、`npm run build`，必要時再跑 targeted Playwright。
4. 若所有驗證通過，維持 `PROJECT_ARCHITECTURE.md` 不變；若實作中發現必須擴大模組責任，才回頭補寫架構文件。

## 風險與緩解措施

- **風險: 僅追加策略造成 UI 顯示位置與「檔尾」概念不一致**
  - 緩解: 在文件中明確區分「字典檔尾端」與「stage 群組內顯示位置」，避免驗收時誤會。
- **風險: count summary 與測試基線未同步更新，導致冒煙測試／e2e 全線失敗**
  - 緩解: 先更新資料單元基線，再同步調整元件／e2e 的 count 斷言。
- **風險: 誤把「說話」再新增一筆，破壞去重需求**
  - 緩解: 在 unit test 或資料斷言中明確檢查 `話す` 已存在，且新增名單只包含 3 筆詞條。
- **風險: 雖然補了詞條存在性測試，但仍未直接保護「檔尾追加」與「既有資料不可漂移」**
  - 緩解: 追加明確斷言，驗證最後 3 筆資料順序固定，且既有尾端基線切片保持不變。
- **風險: stage 選擇不當，導致詞條雖然存在但不符合字典脈絡**
  - 緩解: 依既有詞彙分布選擇 `肌 -> Stage1`、`滑らか/動き -> Stage2`，並在 research/data-model 中寫明理由。

## 複雜度追蹤

| 偏離項 | 必要原因 | 為何不採用更簡單的替代方案 |
|--------|----------|------------------------------|
| 無 | N/A | N/A |
