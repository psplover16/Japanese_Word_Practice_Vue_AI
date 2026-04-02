# Implementation Plan: 單字練習主內容重建

**Branch**: `007-word-practice-rebuild` | **Date**: 2026-04-02 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/007-word-practice-rebuild/spec.md`

## Summary

本功能會把 `/vocabulary` 目前的 placeholder 主內容替換為與參考站 `word-practice` 頁高度一致的單字學習介面，同時保留既有 route path、title、tabs 與 app shell。技術上會在 `src/modules/vocabulary/` 內建立 route-specific 的資料正規化、篩選狀態、註記持久化與單一可捲動 table renderer，並沿用 `PracticeSession` 提供的已勾選字母與題目範圍。字典資料以 `v6/jpWords.js` 為來源，規劃轉成 typed dataset，載入時依原始順序補上穩定 `id`；註記持久化只儲存 `id`，避免對 localStorage 造成不必要負擔。測試會補齊 route ownership、資料正規化、篩選／註記邏輯、表格結構與 375px e2e 驗證。

## Technical Context

**Language/Version**: TypeScript 5.9、Vue 3.5 SFC、Node.js 22 toolchain  
**Primary Dependencies**: Vue 3、Vue Router 4、Vite 7、Tailwind CSS 3、Vitest、Vue Test Utils、Playwright  
**Storage**: Browser localStorage（只儲存註記與必要的學習狀態識別資料）  
**Testing**: Vitest unit/component tests、Playwright e2e、`npm run lint`、`npm run typecheck`、`npm run build`  
**Target Platform**: GitHub Pages 上的前端 SPA，支援手機、平板與桌機瀏覽器  
**Project Type**: 單一前端 Web Application / PWA  
**Performance Goals**: 1077 筆字典資料在單次條件變更後的前端過濾與計數應維持即時反應；桌機上目標 <50ms、手機上目標 <100ms 的可感知更新，且 `/vocabulary` 初次進站不可出現 console error  
**Constraints**: 僅能變更 `/vocabulary` 主內容；不得修改 `/practice`、`/grammar`、route tabs、route title 與 app shell；需保留表格原始欄位佔位；隱藏但保留佔位的內容須採 `visibility: hidden` 類策略；註記資料需使用 localStorage 並只存 `id`  
**Scale/Scope**: 1 個 route、1 份約 1077 筆的字典資料、保留約 19 組 stage 中繼資訊供資料整理使用、搜尋／條件篩選／註記／長按揭露等互動，以及對應 unit/component/e2e/ownership 測試與文件更新

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- 本 feature 的 spec、plan、research、data-model、quickstart、tasks 與 analyze 皆以繁體中文撰寫，符合 Constitution。
- Repository 已有 `.gitignore`；本 feature 不會提交 `node_modules/`、`dist/`、`build/`、`coverage/`。
- 這次會新增 `/vocabulary` 專屬資料、型別、composable、storage 與 renderer，屬於模組結構擴張，必須同步更新 `PROJECT_ARCHITECTURE.md`。
- 測試策略已先定義：`/vocabulary` route smoke、route ownership negative assertions、篩選與註記單元測試、表格互動 component tests、375px e2e smoke。
- Scope ownership 已明確：功能只出現在 `/vocabulary`；`/practice`、`/grammar`、共享 tabs 與 app shell 不得出現本次單字學習 UI。
- Render-safe 與 hidden-state 需求已納入：空結果、格式錯誤的 storage、隱藏但保留佔位的儲存格、長按暫時揭露與放開復原都需安全處理。
- 視覺 fidelity 需求明確，將以 route-specific 結構與樣式為優先，不會為了共用 abstraction 犧牲 table semantics。
- 複雜度可接受：雖然同時有靜態 fidelity 與互動邏輯，但採單一路由、單一資料來源、單一 filter pipeline 與 `id` 型持久化，仍是最簡單可行方案。

## Architecture Decisions

### 1. `/vocabulary` 採 route-specific 模組，不再沿用 `SelectionDetailPanel` placeholder 版面

- `VocabularyView.vue` 將從目前的「共享勾選明細 + 預備區」改為真正的單字學習頁。
- 舊的 `SelectionDetailPanel` 與「單字練習預備區」文案會從 `/vocabulary` 移除，不再作為此 route 的主內容。
- 新 UI 與邏輯集中於 `src/modules/vocabulary/`，避免把 `/practice` 的 UI 直接搬進來，符合 route ownership。

### 2. 字典資料在載入時正規化，依原始順序補上穩定 `id`

- `v6/jpWords.js` 的每筆資料至少包含 `text`、`romanization`、`kanji`、`meaning`、`stage`。
- 規劃新增 `src/modules/vocabulary/data/jpWords.ts` 或等效 typed 資料模組，保留原始資料語意，並在正規化階段依原始順序補上穩定 `id`。
- `id` 只需對同一份字典資料穩定，不需要額外 UUID；這最符合 `v6/plan.txt` 中「照順序設置 ID 即可」的約束。

### 3. 以單一 filter pipeline 處理字母範圍、搜尋字詞、全域 checkbox、註記模式與欄位顯示

- `PracticeSession` 已提供：
  - `selectedKanaItems`
  - `includeHiragana`
  - `includeKatakana`
  - 其他功能選項
- `/vocabulary` 會新增自己的 filter state composable，負責：
  - 將 `PracticeSession` 轉成允許的字音集合
  - 套用搜尋字詞
  - 套用 `全部字音 / 漢字 / 只顯示註記 / 練習` 等頁面條件
  - 計算單一表格中的可見列與總可見列數
- 顯示邏輯集中在 composable，可避免元件中散落多份條件判斷。

### 4. 表格維持原生 `table / thead / tbody` 結構，隱藏但保留佔位的儲存格以 CSS 控制

- `v6/plan.txt` 已指定字典實際內容用 `table`、`thead`、`tbody` 呈現，並且有些內容要隱藏但保留佔位。
- 規劃維持原生 table semantics，搭配 route-specific class：
  - 完全消失的內容：`v-if` / `v-show`
  - 需要保留佔位的內容：`visibility: hidden` 或等效 Tailwind class
- 表格最後一列的寬度限制與固定欄寬也會納入 `/vocabulary` 專用樣式，而不是交給 generic card/table abstraction。

### 5. 註記持久化採 localStorage，且只儲存 `id` 陣列與必要 metadata

- 依 `v6/plan.txt`，註記功能使用 localStorage，並只儲存第 2 項 decision 產生的穩定 `id`。
- 實作會利用既有 `storageGuard.ts`：
  - 進站先驗證資料格式
  - 格式錯誤就清除舊資料
  - 儲存時若 payload 不合法，拒絕寫入並顯示警告
- 這樣能同時符合 clarify 要求的「避免 bug」與 `id` 型資料最小化。

### 6. 長按揭露採 pointer/touch 統一邏輯，暫時覆蓋欄位顯示狀態

- 長按需求同時涵蓋手機與 PC，因此會用同一套 pointer-based interaction 為主，必要時補 touch fallback。
- 長按約 0.4 秒時，該列會進入暫時 reveal 狀態；放開、取消或 pointer 離開後立刻恢復。
- reveal 狀態只影響單列顯示，不改變欄位 checkbox 的真實狀態，也不寫入持久化。

### 7. 測試採 unit + component + e2e + ownership 四層驗證

- Unit：
  - 字典正規化 / stage 分組 / `id` 穩定性
  - filter pipeline
  - localStorage 註記格式驗證與清理
- Component：
  - `/vocabulary` 初始渲染
  - 控制區 checkbox / 搜尋 / 單字數量提示
  - 表格欄位佔位與長按揭露
- Ownership：
  - `/vocabulary` 應有新內容
  - `/practice`、`/grammar` 不得出現這批 UI
- E2E：
  - 真實 route 切換
  - 375px 窄版可讀性
  - 基本搜尋與註記持久化流程

## Project Structure

### Documentation (this feature)

```text
specs/007-word-practice-rebuild/
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
    └── vocabulary-route-contract.md
```

### Source Code (repository root)

```text
src/
├── modules/
│   ├── vocabulary/
│   │   ├── components/
│   │   │   ├── VocabularyControlBar.vue
│   │   │   ├── VocabularyStageTable.vue
│   │   │   └── VocabularyCountSummary.vue
│   │   ├── composables/
│   │   │   └── useVocabularySession.ts
│   │   ├── data/
│   │   │   └── jpWords.ts
│   │   ├── storage/
│   │   │   └── vocabularyMarksStorage.ts
│   │   ├── types/
│   │   │   └── vocabulary.ts
│   │   ├── utils/
│   │   │   └── vocabularyFilters.ts
│   │   └── views/
│   │       └── VocabularyView.vue
│   └── practice/
│       └── composables/
│           └── usePracticeSession.ts
├── shared/
│   └── utils/
│       └── storageGuard.ts
├── styles/
│   └── main.css
└── app/
    └── router.ts

tests/
├── component/
│   ├── RouteOwnership.spec.ts
│   ├── VocabularyViewSmoke.spec.ts
│   ├── VocabularyControlBar.spec.ts
│   └── VocabularyStageTable.spec.ts
├── e2e/
│   └── vocabulary-word-practice.spec.ts
└── unit/
    ├── vocabularyData.spec.ts
    ├── vocabularyFilters.spec.ts
    └── vocabularyMarksStorage.spec.ts

PROJECT_ARCHITECTURE.md
```

**Structure Decision**: 延續單一前端專案結構，在 `src/modules/vocabulary/` 內建立 route-specific 元件、狀態、資料、storage 與工具函式；只透過 `PracticeSession` 讀取跨 route 的字母勾選狀態，不共享 UI。

**Architecture Document Impact**: 必須更新 `PROJECT_ARCHITECTURE.md`，補上 `src/modules/vocabulary/` 新增的 components / composables / data / storage / types / utils 與對應測試檔責任說明，同時移除舊的 placeholder 描述。

## UI / State / Data Strategy

### UI Strategy

- `VocabularyView.vue` 作為 route 入口，負責組裝：
  - 控制區（input + checkbox + 儲存註記相關操作）
  - 單字數量摘要
  - 單一可捲動 table
- `VocabularyStageTable.vue` 負責原生 table DOM、資料列互動、一般欄位標頭 checkbox、註記欄特殊 header action 與長按揭露。
- `VocabularyControlBar.vue` 負責搜尋與 checkbox 控制，避免把控制事件全部塞回 `VocabularyView.vue`。

### State Strategy

- `useVocabularySession.ts` 持有：
  - 搜尋字詞
  - `全部字音 / 漢字 / 只顯示註記 / 練習`
  - 欄位顯示 checkbox 狀態
  - 暫時 reveal 的資料列 `id`
  - 註記儲存與清除動作
- `PracticeSession` 繼續由 `AppShell.vue` 提供，`/vocabulary` 只讀取，不改動第一頁共享勾選狀態。
- 顯示結果全部由 computed 導出，避免額外同步 state。

### Data Strategy

- 先將原始字典資料正規化為 `VocabularyEntry[]`，並保留 `stage` 作為資料中繼欄位。
- 目前字典共有 1077 筆資料，依首次出現順序分布於 19 個 stage：
  - `Stage1_基礎生活`
  - `Stage2_IT面試`
  - `Stage2_IT職場`
  - `Stage2_日常強化`
  - `Stage2_高頻會話`
  - `Stage2_聊天曖昧`
  - `Stage2_購物實戰`
  - `Stage2_職場會話`
  - `Stage3_IT對立`
  - `Stage3_形容詞對立`
  - `Stage3_抽象動詞`
  - `Stage3_抽象概念`
  - `Stage3_動詞對立`
  - `Stage3_商務對立`
  - `Stage3_對立概念`
  - `Stage4_IT理論`
  - `Stage4_抽象動詞`
  - `Stage4_抽象理論`
  - `Stage5_抽象核心`
- 正規化時需保留原始多行字串（例如 `kanji` 或 `meaning` 的換行），避免破壞參考頁 fidelity。

## Performance and Render-Safety Notes

- 所有過濾與計數都在前端同步完成，但資料量只有 1077 筆，適合使用 computed pipeline，不需要額外引入複雜快取或虛擬捲動。
- 高風險區塊：
  - 表格欄位隱藏但保留佔位
  - 長按暫時揭露與放開恢復
  - localStorage 格式錯誤清理
  - route ownership 從舊 placeholder 轉到新字典頁
- render-safe 目標：
  - `/vocabulary` 預設進站不出現 runtime error 或 console error
  - 無勾選、無搜尋結果、壞掉的持久化資料、清空註記後都能穩定顯示
  - 375px 寬度下不出現欄位重疊、錯位或不可點擊

## Research Outputs Required

- 確認參考站 `word-practice` 為 SPA route 時的驗證方式，避免只依賴靜態 HTML 抓取。
- 確認 `jpWords.js` 的欄位形狀、stage 分組與資料量，作為正規化基準。
- 確認 `/vocabulary` 目前 placeholder 內容與需要移除的 shared UI。
- 確認隱藏但保留佔位的欄位如何以 route-specific CSS 與 table semantics 穩定呈現。

## Risks and Mitigations

### Risk 1: `/practice` 勾選結果與字典過濾規則不一致

- Mitigation：把字母範圍轉換邏輯集中在 `vocabularyFilters.ts`，用 unit test 鎖定。

### Risk 2: 註記資料格式錯誤導致進站 bug 或誤儲存

- Mitigation：重用 `storageGuard.ts` 的驗證與清理模式，並在 storage module 補充警告分支測試。

### Risk 3: 隱藏但保留佔位的欄位被一般 `v-if` 誤刪，造成 table 結構塌陷

- Mitigation：把欄位可見性規則做成專用 helper 與 component test，驗證 DOM 仍保留欄位佔位。

### Risk 4: 長按邏輯在手機與桌機事件模型不同步

- Mitigation：優先使用 pointer events，並在 component / e2e 測試驗證按下、持續、放開三段狀態。

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 無 | N/A | N/A |
