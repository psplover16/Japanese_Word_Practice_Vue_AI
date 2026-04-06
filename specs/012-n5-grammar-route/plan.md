# Implementation Plan: N5 文法學習子路由

**Branch**: `012-n5-grammar-route` | **Date**: 2026-04-05 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/012-n5-grammar-route/spec.md`

## Summary

本功能將把 `N5文法` 子路由從單純占位頁升級為可擴充的學習頁。實作會先把 `v11` 筆記整理為結構化靜態資料，再依內容特性分配到條列、說明區塊或對照表等容器，並沿用 `變化規則` 子路由的外部容器節奏與收合互動，補齊 route-specific 樣式與 smoke/e2e 驗證。

## Technical Context

**Language/Version**: TypeScript 5.9、Vue 3.5 SFC  
**Primary Dependencies**: Vue 3、Vue Router 4、Vite 7、Tailwind CSS、Vitest、Vue Test Utils、Playwright  
**Storage**: 以 repo 內靜態 TypeScript 資料檔為主，無額外後端或資料庫  
**Testing**: `npm run lint`、`npm run typecheck`、Vitest component/unit tests、Playwright e2e  
**Target Platform**: GitHub Pages 上的現代桌面與行動瀏覽器  
**Project Type**: 單一前端 SPA  
**Performance Goals**: `N5文法` 首次 render 必須維持 route-level render-safe；在 375px 寬度下可完成首屏顯示、群組切換與內容展開而不出現水平破版或明顯互動延遲  
**Constraints**: 僅能在 `/n5-grammar` 呈現本功能；需沿用既有 route tabs 與 grammar accordion 的交互節奏，但不得把 `變化規則` 的資料模型硬套到不適合的 N5 文法內容；必須同步更新 `PROJECT_ARCHITECTURE.md` 與對應測試  
**Scale/Scope**: 以 `v11` 的兩份來源筆記為本次資料範圍，預期整理為數個可收合主題群組，涵蓋名詞、動詞、形容詞與助詞等 N5 文法主題

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- 規格、計畫、任務與使用者可見文件維持繁體中文；符合要求。
- Repository 已有 `.gitignore`，且 Node/Vite 產物本來就屬於忽略對象；實作時僅需確認未新增不受控產物。
- 本工作會新增 N5 文法資料模組、renderers、測試與文件，必須同步更新 `PROJECT_ARCHITECTURE.md`。
- 本工作直接細化既有 `N5文法` 行為，來源規格即 [spec.md](./spec.md)；實作若微調使用者可見內容，需同步回寫此規格。
- 測試策略已定義為 smoke + component/unit + e2e 組合，符合先定義驗證方式的要求。
- 需要為 `/n5-grammar` 與主要互動容器提供 render-safe 預設驗證，符合 constitution。
- 範圍正向 ownership 為 `/n5-grammar`、其資料模組與專屬 renderers；負向 ownership 為 `/practice`、`/grammar`、`/vocabulary` 的功能內容不得混入。
- 共享樣式與 accordion 殼層只會在外部節奏與互動規則 materially 相同時重用；N5 文法的內容排版仍保留 route-specific 自主空間。
- 這次是前端靜態內容與排版調整，主要性能預算聚焦在 render-safe、無水平破版、低互動成本，無需引入額外複雜度。
- 目前無需填寫 Complexity Tracking；預定做法是現有架構下的最小可行擴充。

## Project Structure

### Documentation (this feature)

```text
specs/012-n5-grammar-route/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│  └── n5-grammar-route-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── app/
│  └── router.ts
├── modules/
│  ├── grammar/
│  │  └── components/
│  │     └── GrammarAccordionTableShell.vue
│  └── n5Grammar/
│     ├── components/
│     │  ├── N5GrammarSectionCard.vue
│     │  ├── N5GrammarBulletBlock.vue
│     │  ├── N5GrammarInfoBlock.vue
│     │  └── N5GrammarCompareTable.vue
│     ├── data/
│     │  └── grammarNotes.ts
│     ├── types/
│     │  └── grammarNotes.ts
│     └── views/
│        └── N5GrammarView.vue
├── shared/
│  └── utils/
│     └── renderSafety.ts
└── styles/
   └── main.css

tests/
├── component/
│  ├── N5GrammarViewSmoke.spec.ts
│  └── N5GrammarSections.spec.ts
├── e2e/
│  └── n5-grammar-layout.spec.ts
└── unit/
   └── n5GrammarData.spec.ts
```

**Structure Decision**: 沿用現有單一前端專案結構，在 `src/modules/n5Grammar/` 下新增專屬資料、型別與 renderer；僅重用共享 route tabs、既有 render-safety 工具與可相容的 accordion 互動殼層。

**Architecture Document Impact**: 需要更新 `PROJECT_ARCHITECTURE.md`，補上 `src/modules/n5Grammar/` 的資料與元件結構、對應測試檔案，以及 `/n5-grammar` 從占位頁升級為正式學習頁後的責任描述。

## Phase 0: Research

### Research Goals

1. 決定 N5 文法內容應採用何種資料模型，才能同時支援條列、說明段與比較表。
2. 決定哪些既有 `變化規則` 能直接重用，哪些只能參考不能硬套。
3. 決定最小但足夠的測試組合，確保內容完整、版型穩定、範圍不外溢。

### Research Output

- [research.md](./research.md)

## Phase 1: Design & Contracts

### Data Model

- 以 `N5GrammarSection`、`N5GrammarTopic`、`N5GrammarExample`、`SharedNote` 等資料結構承載整理後內容。
- 由資料層預先決定每個群組的 `presentationMode`，讓 view 只負責 render，而不是在模板中臨時判斷內容規則。
- 將「助詞最後排序」與「來源順序保留」視為資料排序規則，不放在模板內用硬編碼特例處理。

### UI Contract

- 定義 `/n5-grammar` 頁面的群組標題、說明、展開/收合、內容模式與負向 ownership 規則。
- 定義每個群組至少需要的內容欄位，避免實作時產生只有標題沒有解說的空容器。

### Verification Design

- Component smoke test: 驗證不再顯示 placeholder、render-safe、維持 route ownership。
- Data unit test: 驗證資料完整性、助詞排序、每個主題都有說明與例句。
- e2e: 驗證 375px 下 `/n5-grammar` 群組展開、版型穩定與無外溢內容。

### Phase 1 Outputs

- [data-model.md](./data-model.md)
- [quickstart.md](./quickstart.md)
- [n5-grammar-route-contract.md](./contracts/n5-grammar-route-contract.md)

## Phase 2: Implementation Planning

### Workstreams

1. 內容整理與資料建模
2. N5 文法專屬 renderer 與 view 組裝
3. route-specific 樣式補強與小螢幕穩定性
4. 測試與文件同步

### Story Mapping

- **US1**: 完整內容整理、資料建模、view 替換 placeholder、每個文法項目具說明與範例
- **US2**: 群組容器、展開/收合、標題/說明分離、小螢幕穩定性
- **US3**: 共通說明抽離、重複內容整併、適合的對照表版型
- **US4**: 可擴充資料結構、統一 renderer 介面、文件更新

## Post-Design Constitution Check

- 設計後仍維持繁中規格與文件輸出，通過。
- 已明確規劃 smoke/component/e2e 驗證，通過。
- 已定義正向與負向 ownership，通過。
- 已將 `PROJECT_ARCHITECTURE.md` 納入同一工作項，通過。
- 已限制共享 UI 重用只發生在外部節奏與互動規則一致之處，通過。
- 已提供可量測的前端穩定性與 render-safe 目標，通過。

## Complexity Tracking

無需額外例外或違規豁免。
