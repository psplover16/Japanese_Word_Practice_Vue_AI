# Implementation Plan: 變化規則主內容重建

**Branch**: `006-grammar-change-rules` | **Date**: 2026-03-31 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/006-grammar-change-rules/spec.md`

## Summary

本功能會把 `/grammar` 目前的簡化內容替換為與參考站 `change-rules` 頁一致的規則頁。技術上採用 `/grammar` 模組內的 route-specific renderer 與 typed static data，保留既有 route path、title、tabs 與 app shell，不把這批特殊表格硬塞回 practice 共用元件。測試會補齊 route ownership、default render smoke、特殊 table 結構與 375px 窄版閱讀穩定度。依 2026-03-31 核對的部署版本，頁面共有 11 個 accordion section，其中「音便」是五段動詞區塊中的子表格。

## Technical Context

**Language/Version**: TypeScript 5.9、Vue 3.5 SFC、Node.js 22 toolchain  
**Primary Dependencies**: Vue 3、Vue Router 4、Vite 7、Tailwind CSS 3、Vitest、Vue Test Utils、Playwright  
**Storage**: N/A，內容以靜態資料常數存在 repo 內  
**Testing**: Vitest unit/component tests、Playwright e2e、`npm run lint`、`npm run typecheck`、`npm run build`  
**Target Platform**: GitHub Pages 上的前端 SPA，支援手機與桌機瀏覽器  
**Project Type**: 單一前端 Web Application / PWA  
**Performance Goals**: `/grammar` 初次渲染需在單次 route 載入內穩定顯示 11 個容器，375px 寬度下不可出現遮蓋、重疊或 console error  
**Constraints**: 僅能變更 `/grammar` 主內容；不得修改 `/practice`、`/vocabulary`、共享 route tabs 與 app shell；route-specific 視覺規則優先於既有共用樣式，且「音便」需保留為五段動詞區塊內的子表格  
**Scale/Scope**: 1 個 route、11 個規則容器、5 類以上 table/內容 renderer、對應 unit/component/e2e/ownership 測試與文件更新

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- 本 feature 的 spec、plan、research、data-model、quickstart、tasks 與分析報告都以繁體中文撰寫，符合 Constitution。
- Repository 已有 `.gitignore`；本 feature 不會提交 `node_modules/`、`dist/`、`build/`、`coverage/`。
- 這次會新增 `/grammar` 專屬資料與 renderer 元件，屬於模組結構變更，必須更新 `PROJECT_ARCHITECTURE.md`。
- 測試策略已定義：`/grammar` route smoke、route ownership negative assertions、專用 component tests、typed data unit tests、375px e2e smoke。
- Scope ownership 已明確：功能只出現在 `/grammar`；`/practice`、`/vocabulary` 與共享 tabs/app shell 不得出現本次規則內容。
- UX 一致性原則已納入：這批表格的 layout 與樣式要求明確，不會為了共用抽象而犧牲 reference fidelity。
- 預設、收合、空白與 hidden state 已納入計畫：accordion 預設渲染與展開狀態都需 render-safe，避免 console error。
- 複雜度可接受：雖然資料量大，但採 typed static data + 專用 renderer，仍是比 generic HTML 注入更簡單、可維護且可測的做法。

## Architecture Decisions

### 1. `/grammar` 採 route-specific renderer，不復用 practice 內容元件

- `GrammarView.vue` 將從目前的占位內容改為組合式頁面，僅保留 route shell。
- 不復用 `SelectionDetailPanel`、`HatsuonSection`、`SokuonSection` 等 practice 元件，避免錯誤 ownership。
- 新內容集中於 `src/modules/grammar/` 內，符合 route-specific scope 與 negative ownership 原則。

### 2. 內容資料以 typed static data 表示，不使用 raw HTML 注入

- 參考站目前 bundle 顯示這頁內容由多組靜態資料驅動，包含：
  - 語法系統差異表
  - 各活用型意義規則清單
  - 動詞型態分辨規則清單
  - 五段動詞表與音便表
  - 一段、サ變、カ變、い形容詞、ない形容詞、だ助動詞等活用表
  - 詞性變化規則的巢狀條列內容
- 本地實作會用 TypeScript 型別明確描述這些資料，讓後續 CRUD 與測試能直接定位內容差異。
- 不採 `v-html` 注入整塊 HTML，避免降低型別可驗證性與測試精度。

### 3. 依表格型態拆成少量專用 renderer

- 預計建立以下專用元件：
  - `SystemDifferenceTable.vue`
  - `RuleListTable.vue`
  - `GodanVerbTable.vue`
  - `InflectionTable.vue`
  - `PosConversionTable.vue`
- 每個 renderer 負責其專屬 DOM 結構與特殊樣式，例如 rowspan、colspan、tfoot、巢狀清單與多行副標題。
- 若存在重複的 accordion header 殼層，可抽出極薄的 `GrammarAccordionTableShell.vue`，但不能反向限制個別表格 layout。

### 4. 樣式採 `main.css` 中的 route-specific class，不強迫共用 card/table abstraction

- 目前 `main.css` 主要服務 `/practice`；本功能會新增 `/grammar` 專用 class，例如 header cell、body cell、highlight cell、subtitle、多行說明等。
- 可保留外層頁面 spacing 與既有 shell 視覺，但內部 table 的 border、background、alignment、nowrap/pre-wrap 必須以 `/grammar` 專用規則優先。
- 樣式需支援 375px 窄版檢視，不可出現水平閱讀順序錯亂。

### 5. 測試以「presence + absence + structure」三層驗證

- Presence：`/grammar` 初次 render 時顯示 11 個規則容器。
- Absence：`/grammar` 不再顯示舊的 selection panel/hatsuon/sokuon；`/practice`、`/vocabulary` 不得出現變化規則內容。
- Structure：逐類 renderer 驗證 thead/tbody/tfoot、rowspan、colspan、巢狀清單、多行副標題與 accordion 行為。

## Project Structure

### Documentation (this feature)

```text
specs/006-grammar-change-rules/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── tasks.md
├── analyze.md
├── checklists/
│   └── requirements.md
└── contracts/
    └── grammar-route-contract.md
```

### Source Code (repository root)

```text
src/
├── modules/
│   └── grammar/
│       ├── components/
│       │   ├── GrammarAccordionTableShell.vue
│       │   ├── SystemDifferenceTable.vue
│       │   ├── RuleListTable.vue
│       │   ├── GodanVerbTable.vue
│       │   ├── InflectionTable.vue
│       │   └── PosConversionTable.vue
│       ├── data/
│       │   └── changeRules.ts
│       ├── types/
│       │   └── changeRules.ts
│       └── views/
│           └── GrammarView.vue
├── styles/
│   └── main.css
└── app/
    └── router.ts

tests/
├── component/
│   ├── GrammarViewSmoke.spec.ts
│   ├── GrammarChangeRulesTables.spec.ts
│   ├── RouteOwnership.spec.ts
│   └── SelectionDetailPanel.spec.ts
├── e2e/
│   └── grammar-change-rules.spec.ts
└── unit/
    └── changeRulesData.spec.ts

PROJECT_ARCHITECTURE.md
```

**Structure Decision**: 延續既有單一前端專案結構，在 `src/modules/grammar/` 內新增資料、型別與 renderer。這樣最符合 route ownership，也能讓 `/grammar` 與 `/practice`、`/vocabulary` 清楚分離。

**Architecture Document Impact**: 必須更新 `PROJECT_ARCHITECTURE.md`，補上 `src/modules/grammar/components/`、`src/modules/grammar/data/`、`src/modules/grammar/types/` 與新測試檔案的責任說明。

## UI / State / Data Strategy

### UI Strategy

- `GrammarView.vue` 負責組合 11 個容器與 renderer。
- 每個容器的展開/收合互動由 `GrammarAccordionTableShell.vue` 或等效模式負責，確保 title row 與 toggle icon 一致。
- 各 renderer 專注在自己的 DOM 結構：
  - `SystemDifferenceTable.vue`：三欄比較表與例句堆疊
  - `RuleListTable.vue`：規則清單與可選 examples 區
  - `GodanVerbTable.vue`：含音便表、tfoot 與特殊高亮列
  - `InflectionTable.vue`：一般活用表，多組 thead/tbody/tfoot 與多行 title
  - `PosConversionTable.vue`：有序清單 + 巢狀條列 + 範例

### State Strategy

- 這頁為靜態參考內容，不需全域 store。
- accordion 展開狀態維持在 local component state 即可，不需跨 route 持久化。
- 若多個 renderer 共享微型顯示邏輯，可抽純函式 helper，但避免抽成過度通用的 shared composable。

### Data Strategy

- `changeRules.ts` 匯出 typed 常數，按 renderer 類型分段：
  - `systemDifferenceRows`
  - `conjugationMeaningRules`
  - `verbClassificationRules`
  - `godanTableSpec`
  - `inflectionTableSpecs`
  - `posConversionSections`
- 每個 section 以穩定 `id` 命名，方便 component test、e2e、未來 CRUD 與 diff。
- 多行 title、副標題與例句以資料結構保留，不在 template 內手寫隱式換行。

## Performance and Render-Safety Notes

- 資料量雖大，但全部是本地靜態資料，無需額外 API；主要風險在 DOM 結構複雜度與窄版可讀性。
- 渲染目標：
  - 預設進入 `/grammar` 不出現 runtime error 或 console error
  - 375px 寬度下可完整展開至少一個複雜容器而不破版
  - accordion 切換不造成內容殘留或 layout jump 失控
- 樣式與結構檢查會優先針對高風險區塊：
  - 五段動詞表的 rowspan / tfoot
  - カ變動詞與 だ助動詞的多行標題
  - 詞性變化規則的巢狀清單

## Research Outputs Required

- 確認參考站目前部署 bundle 中 `/change-rules` 的實際 section 清單與 renderer 類型
- 確認本地 `/grammar` 現況與需要移除的舊內容
- 確認窄版下應採用的 nowrap/pre-wrap 規則與 route-specific CSS 邊界

## Risks and Mitigations

### Risk 1: 表格 fidelity 高，過度抽象會破壞結構

- Mitigation：用 typed data + 專用 renderer，而不是 generic rich-text block。

### Risk 2: 共享樣式可能覆蓋 `/grammar` 特殊排版

- Mitigation：在 `main.css` 新增 `/grammar` 專用 class，必要時降低共用 abstraction 的優先權。

### Risk 3: route ownership 回歸風險

- Mitigation：更新 `RouteOwnership.spec.ts`，同時驗證 `/grammar` 應有內容與 `/practice`、`/vocabulary` 不應有內容。

### Risk 4: 內容量大，容易在未來 CRUD 時漏改

- Mitigation：資料常數加穩定 id，unit test 驗證 section 數量與關鍵結構，並在 contract/quickstart 中列出人工回歸步驟。

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 無 | N/A | N/A |
