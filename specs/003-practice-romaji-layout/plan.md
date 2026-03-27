# Implementation Plan: 字母練習排版與羅馬音補強

**Branch**: `003-practice-romaji-layout` | **Date**: 2026-03-28 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/003-practice-romaji-layout/spec.md`

## Summary

本期以 `/practice` 路由為核心，補齊長音規則、清音拗音、合拗音與外來語擴張的展示資料結構與排版，並同步收斂 375px 手機版密度控制、共享頁首可讀性與 render-safe 驗證。技術上維持既有 Vue 3 + TypeScript + Vite + Tailwind 架構，不新增後端與狀態管理套件，優先以資料模型重整、區塊元件細化與 component / smoke test 補強完成本 feature。

## Technical Context

**Language/Version**: TypeScript 5.9、Vue SFC  
**Primary Dependencies**: Vue 3、Vue Router 4、Vite 7、Tailwind CSS 3、Vitest、Vue Test Utils、Playwright、Font Awesome、vite-plugin-pwa  
**Storage**: 既有 localStorage（僅最近一次錯題結果與 PWA 更新狀態）；本 feature 不新增持久化資料  
**Testing**: Vitest component/unit tests、Playwright smoke / e2e、既有 render-safe 驗證  
**Target Platform**: 手機、平板、桌機瀏覽器，以及既有 PWA 安裝模式  
**Project Type**: 純前端 Web Application / PWA  
**Performance Goals**: `/practice` 在 375px 首次渲染無 console error；本 feature 涉及表格區塊不出現橫向捲動、裁切或重疊；資料改造後不增加額外網路請求  
**Constraints**: 無後端；不得使用 `any`；維持 Composition API；優先沿用現有 `src/modules/practice/data/*.ts` 靜態資料模式；規劃階段不得讀取 `_private/_private_fileAssets/v1` 受限資產內容，只能引用使用者提供的路徑作為外部設計依據  
**Scale/Scope**: 1 個共享頁首排版、1 個 practice route、4 個教學區塊元件、1 組靜態資料模組、數個 component / smoke tests

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- 所有新產出的 spec、plan、quickstart、contracts、tasks 維持繁體中文。
- `.gitignore` 已存在；本 feature 不新增應納入版控的再生產物。
- 測試策略明確覆蓋 `/practice` 初始渲染與本期高風險區塊：
  - `PracticeView` smoke test 持續驗證 default / hidden / placeholder 狀態。
  - 新增或更新長音規則、拗音羅馬音、外來語矩陣的 component 驗證。
- Positive / negative ownership 明確：
  - Positive：`/practice`、`AppShell` 頁首、`ChoonRuleSection`、`SeionYoonSection`、`DakuonYoonSection`、`LoanwordSection`。
  - Negative：`/grammar`、`/vocabulary`、`ExamModal`、`UnknownResultPanel`、PWA toast 不新增本 feature 的展示內容。
- 共用樣式只會延伸到視覺行為相同的表格與密度規則；不把不同資料語意的區塊硬塞進同一個高度耦合元件。
- 375px 可讀性為明確效能與體驗預算；若需額外複雜度，必須用最小化的 CSS / data refactor 處理，而非引入新框架或大型抽象。

## Architecture Decisions

### 1. 指導資料改為結構化靜態資料，而非字串直寫

- `specialSyllableData.ts` 目前以字串陣列承載部分區塊，無法表達「假名 / 羅馬音 / 中文翻譯」三欄或「上假名下羅馬音」的穩定版型。
- 本期改以結構化資料描述長音規則列、範例列、拗音格與外來語矩陣格。
- 保持資料仍在 TypeScript 模組中，避免為單純靜態內容新增 JSON 載入流程與額外解析成本。

### 2. 長音規則、拗音矩陣、外來語矩陣維持分區元件，不合併成單一萬用表格元件

- `ChoonRuleSection` 的需求是大表格且區分規則列與範例列。
- `SeionYoonSection` / `DakuonYoonSection` 是固定三欄矩陣，適合共用局部 cell 呈現規則，但不應與長音規則共用完整骨架。
- `LoanwordSection` 需要第一列與第一欄標頭語意，資料結構與排版責任與其他區塊不同。
- 採「共享 class + 區塊專屬 markup」比「單一通用表格元件」更符合 reusable-style boundary。

### 3. 375px 密度控制以 CSS 響應式縮減策略處理，不接受橫向捲動

- 依澄清，空間不足時只允許先縮減 `td` 內距，再視需要縮小字體。
- `AppShell` 頁首、`RouteTabs`、practice 各表格都需有手機優先的密度與換行規則。
- 不使用水平捲動容器作為逃生方案，以免破壞主要學習閱讀流程。

### 4. 共享頁首屬於支撐性修改，不改變其他路由內容

- `/practice` 的閱讀可辨識度會受到 `AppShell` header 與 tabs 排列影響，因此共享頁首佈局納入本 feature。
- 這不代表把長音或羅馬音內容擴散到其他 route；共享頁首只負責容器、間距與 375px 可讀性。

### 5. PWA 行為維持既有機制，避免將純展示需求擴張為部署重構

- 本 feature 不新增網路依賴與遠端內容，因此離線能力主要沿用現有 `vite-plugin-pwa` 配置。
- 使用者指定的 `_private/_private_fileAssets/v1/public/icons` 與 `vite.ico` 只作為既有資產來源約束記錄；規劃階段不展開檢視檔案內容。
- 除非實作時發現現有 manifest / icon 路徑與本 feature 相衝，否則不把 PWA icon 置換列為主要交付範圍。

## Project Structure

### Documentation (this feature)

```text
specs/003-practice-romaji-layout/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── tasks.md
├── analyze.md
├── checklists/
│   └── requirements.md
└── contracts/
    ├── practice-layout-contract.md
    ├── long-vowel-table-contract.md
    ├── romaji-grid-contract.md
    └── loanword-matrix-contract.md
```

### Source Code (repository root)

```text
src/
├── app/
│   └── AppShell.vue
├── modules/
│   └── practice/
│       ├── components/
│       │   ├── ChoonRuleSection.vue
│       │   ├── SeionYoonSection.vue
│       │   ├── DakuonYoonSection.vue
│       │   └── LoanwordSection.vue
│       ├── data/
│       │   └── specialSyllableData.ts
│       ├── types/
│       │   └── practice.ts
│       └── views/
│           └── PracticeView.vue
├── shared/
│   └── components/
│       └── RouteTabs.vue
└── styles/
    └── main.css

tests/
├── component/
│   ├── PracticeViewSmoke.spec.ts
│   ├── ChoonRuleSection.spec.ts
│   ├── LoanwordSection.spec.ts
│   └── [必要時新增拗音區塊測試]
└── e2e/
    └── [必要時補充 375px smoke 驗證]
```

**Structure Decision**: 維持單一前端專案結構。變更集中於 `practice` 模組的靜態資料、展示元件與 `/practice` route 周邊排版；共享頁首只處理容器與 tabs 響應式調整。

**Architecture Document Impact**: 若實作僅是既有檔案責任細化，`PROJECT_ARCHITECTURE.md` 可不變；若新增新的練習展示元件、共用 cell presenter、或新增顯著測試檔案分類，需同步反映於文件。

## UI / State / Storage Strategy

### UI Strategy

- 外層 app 容器以 `py-3` / `px-2` 對應 12px / 8px，與使用者指定的手機密度對齊。
- 頁首維持「左側標題、右側 route tabs」主結構，但需在 375px 下保證不破版與內容可辨識。
- 長音規則區塊採單一大表格：
  - 規則列獨占一列。
  - 範例列固定三欄：假名、羅馬音、中文翻譯。
- 清音拗音與合拗音採固定三欄矩陣，每格呈現「假名 + 羅馬音」。
- 外來語擴張採第一列 / 第一欄標頭矩陣：
  - 只有假名的內容格，羅馬音置於假名下方。
  - 內容格統一水平與垂直置中。
- 共用 class 僅負責表格殼層、cell 密度、字級縮減；資料語意與欄位結構由各 section 自己決定。

### State Strategy

- 本 feature 不新增新的互動 state store。
- 若需要控制 375px 顯示密度，優先以 CSS breakpoint 與 class 調整，不增加 runtime layout state。
- 既有 `usePracticeSession`、`useExamSession`、PWA lifecycle state 皆維持現狀。

### Storage Strategy

- 不新增 localStorage key。
- 新增的羅馬音與翻譯資料都放在靜態資料模組，與現有 kana / special syllable 資料同層管理。
- 本 feature 不應影響 `latestUnknownResultStorage` 或 PWA 更新提示持久化邏輯。

## PWA Implementation Considerations

- 指導資料仍會被打包進前端資產，因此既有離線能力可直接涵蓋本 feature。
- 若 `vite-plugin-pwa` 的 precache 依現有 build 輸出配置工作，則不需為本 feature 額外新增 runtime caching 規則。
- 使用者指定的 icon / images 路徑需在實作時以受限資產來源為準，但此 feature 不應把 icon 切換當成主要交付阻塞。
- 若後續因 manifest、favicon 或 icon 路徑調整而改動部署結構，需額外補記 `PROJECT_ARCHITECTURE.md` 與部署測試。

## Code Standards

- 維持 Vue 3 Composition API，不使用 Options API。
- 不使用 `var`、`any`、全域函式或全域變數。
- 優先延伸既有 `practice.ts` 型別與 `specialSyllableData.ts` 靜態資料模組，不把純展示資料拆成不必要的新依賴。
- Component 檔名使用 PascalCase；資料 / 工具 / 型別檔名使用 camelCase。
- 所有語意文字與說明保持繁體中文；程式碼命名與型別維持英文。
- 樣式變更優先寫入既有 `main.css` component layer 或區塊內 class，不新增新的 UI 套件。

## Risks and Implementation Notes

### Risk 1: 375px 下表格內容超寬

- 風險：補上羅馬音與中文翻譯後，表格在手機尺寸容易過密或溢出。
- 應對：先縮減 cell padding，再縮字；必要時調整欄位寬分配，但不採橫向捲動。

### Risk 2: 靜態資料結構改造影響既有區塊

- 風險：把字串陣列改為結構化資料時，可能連帶破壞目前未納入本 feature 的區塊渲染。
- 應對：只重構長音規則、拗音、合拗音、外來語擴張相關型別；其餘資料維持原狀，並以 component tests 鎖定輸出。

### Risk 3: 共用抽象過度，反而削弱區塊差異

- 風險：為了減少重複而做過度共用，造成長音表格與外來語矩陣失去各自欄位語意。
- 應對：只共用低階排版 class，不做跨區塊的萬用大型表格元件。

### Risk 4: 共享頁首調整意外影響其他 route

- 風險：`AppShell` / `RouteTabs` 的密度與 nowrap 規則變動，可能讓 `/grammar`、`/vocabulary` 出現退化。
- 應對：測試與 tasks 中加入 negative ownership 與 route-level smoke 驗證，確認僅調整可讀性、不改變其他 route 的內容結構。

### Risk 5: 受限資產路徑無法在規劃階段驗證

- 風險：`_private/_private_fileAssets/v1` 受專案規則限制，規劃階段無法直接檢視圖稿與圖示內容。
- 應對：本計畫只記錄這些路徑作為設計與資產來源約束；若實作依賴具體圖像尺寸或命名，需在可存取副本上再確認。

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 無 | 無 | 無 |
