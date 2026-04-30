# 實作計畫：N5 文法、單字與サ變動詞學習內容整理

**Branch**: `017-refine-n5-content` | **Date**: 2026-04-28 | **Spec**: [spec.md](C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/specs/017-refine-n5-content/spec.md)  
**Input**: Feature specification from `C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/specs/017-refine-n5-content/spec.md`

## 摘要

本次功能橫跨既有 `/n5-grammar`、`/grammar`、`/vocabulary` 三個 route，但不新增 route 或重做頁面架構。技術策略是延續目前資料驅動模式：將 `v16/note2.txt` 的四類核心字詞整理放到 N5 文法最上方，將 `v16/note.txt` 的 `できる`、助詞、疑問詞、指示詞、數字、時間表現整理成可收合的 N5 文法區塊，更新 source coverage 與排序；在 `/grammar` 擴充サ變動詞表格下方例句並拆開標題/說明；在 `/vocabulary` 追加或確認 `東口`、`西口`、`北口`、`南口` 四個詞條。驗證以 Vitest data/component 測試、route ownership、Playwright 375px layout 與完整 build 為主。

## Technical Context

**Language/Version**: TypeScript ~5.9.3 / Vue 3.5.30  
**Primary Dependencies**: Vue 3、Vue Router 4.6.3、Vite 7.3.1、Vitest 3.2.4、Playwright 1.54.2、Tailwind CSS 3.4.17  
**Storage**: 靜態 TypeScript 資料檔；`/vocabulary` 沿用既有 localStorage 註記機制，不新增持久化格式  
**Testing**: Vitest（unit + component）、Playwright（e2e / smoke）、vue-tsc、ESLint、Vite build  
**Target Platform**: Web SPA / PWA，desktop 與 mobile；375px 寬度需可讀  
**Project Type**: 單一 Vue 3 前端應用  
**Performance Goals**: 受影響 route 初始 render 不出現可感知等待；新增靜態資料不得造成展開/收合卡頓；手機寬度不得有明顯水平溢出  
**Constraints**: 文件與新增中文內容必須為有效 UTF-8；不得讀寫受限私人筆記；不得新增 route；內容只出現在指定 route；助詞在 `/n5-grammar` 永遠排序於最後；`note2.txt` 核心字詞放在 N5 文法最上方  
**Scale/Scope**: 1 個 N5 文法核心字詞總覽、8 個 `note.txt` 來源章節整理、1 組サ變動詞例句組、4 個 vocabulary 詞條，以及相應資料測試/元件測試/e2e 驗證

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] 規格、計畫、研究、資料模型與 quickstart 使用繁體中文；Constitution 保持英文。
- [x] 儲存庫已有 `.gitignore`；本次不提交 `node_modules/`、`dist/`、`coverage/` 等再生產物。
- [x] 本次預期只變更既有模組下的資料、元件與測試，不新增 route 或部署結構；若サ變動詞型別、renderer 職責或測試結構實際改動，需同步更新 `PROJECT_ARCHITECTURE.md`。
- [x] 本次計畫由 `specs/017-refine-n5-content/spec.md` 驅動；若實作過程變更可見內容、排序、互動或驗收標準，需回寫同一份 spec。
- [x] 測試策略已先定義，包含資料 coverage、排序、元件展開、route ownership、375px 版面與 build/typecheck。
- [x] 初始 render、收合狀態、展開狀態與空資料安全性皆納入測試；新資料不得造成空白容器或 browser console error。
- [x] 正向 ownership：`/n5-grammar`、`/grammar`、`/vocabulary`。負向 ownership：`/practice` 與未指定 route 不得出現本次新增內容。
- [x] 重用既有 N5 文法卡片、grammar table shell、vocabulary table；只有在現有型別不能承載サ變例句或標題說明拆分時才做小幅擴充。
- [x] 變更以靜態資料增量與小型 renderer 補強為主，不引入新狀態管理、外部套件或非必要抽象。

## Project Structure

### Documentation (this feature)

```text
specs/017-refine-n5-content/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── checklists/
│   └── requirements.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── modules/
│   ├── n5Grammar/
│   │   ├── data/
│   │   │   └── grammarNotes.ts
│   │   ├── types/
│   │   │   └── grammarNotes.ts
│   │   ├── components/
│   │   │   ├── N5GrammarSectionCard.vue
│   │   │   ├── N5GrammarInfoBlock.vue
│   │   │   ├── N5GrammarCompareTable.vue
│   │   │   └── N5GrammarBulletBlock.vue
│   │   └── views/
│   │       └── N5GrammarView.vue
│   ├── grammar/
│   │   ├── data/
│   │   │   └── changeRules.ts
│   │   ├── types/
│   │   │   └── changeRules.ts
│   │   ├── components/
│   │   │   ├── GrammarAccordionTableShell.vue
│   │   │   └── InflectionTable.vue
│   │   └── views/
│   │       └── GrammarView.vue
│   └── vocabulary/
│       ├── data/
│       │   └── jpWords.ts
│       ├── types/
│       │   └── vocabulary.ts
│       ├── components/
│       │   └── VocabularyStageTable.vue
│       └── views/
│           └── VocabularyView.vue
└── styles/
    └── main.css

tests/
├── unit/
│   ├── n5GrammarData.spec.ts
│   ├── changeRulesData.spec.ts
│   └── vocabularyData.spec.ts
├── component/
│   ├── N5GrammarSections.spec.ts
│   ├── N5GrammarViewSmoke.spec.ts
│   ├── GrammarChangeRulesTables.spec.ts
│   ├── GrammarViewSmoke.spec.ts
│   ├── VocabularyViewSmoke.spec.ts
│   └── RouteOwnership.spec.ts
└── e2e/
    ├── n5-grammar-layout.spec.ts
    ├── grammar-change-rules.spec.ts
    └── vocabulary-word-practice.spec.ts
```

**Structure Decision**: 採用既有單一 Vue 專案結構；內容新增優先落在各 route 對應資料檔，元件只做承載資料所需的最小補強。`/n5-grammar` 保持 section/topic/sourceCoverage 架構，`/grammar` 以現有 inflection table 資料與 renderer 擴充サ變例句，`/vocabulary` 追加既有字典資料列。

**Architecture Document Impact**: 預設不需更新 `PROJECT_ARCHITECTURE.md`。若後續實作新增 `N5Grammar` presentation mode、擴充 `InflectionTableSpec` 的公開責任、或新增測試類別/目錄，則必須同步更新架構文件對應段落。

## Phase 0：Research

詳見 [research.md](C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/specs/017-refine-n5-content/research.md)。

Phase 0 已確定：

- `note2.txt` 形成 `/n5-grammar` 最上方的「核心字詞使用方式」總覽 section。
- `note.txt` 的 ch0 放在既有 `invitation-comparison` 之後；ch1~ch4 為助詞內容，排序於最後的助詞群組；ch5~ch8 為非助詞學習資料，依來源順序排在 core 區。
- 指示詞與數字來源圖片將轉為資料表，不直接嵌入圖片；例句重點字需支援標記樣式。
- `サ變動詞` 例句採最小型別擴充，不另開新 route 或新資料模組。
- `東口`、`西口`、`北口`、`南口` 採字典尾端追加策略，重複項先查核再新增。

## Phase 1：Design & Contracts

詳見 [data-model.md](C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/specs/017-refine-n5-content/data-model.md)。

### Contracts

本功能不新增外部 API、CLI、檔案匯入匯出格式或跨系統協定，因此不建立 `contracts/` 目錄。使用者可見契約由以下項目驗證：

- `/n5-grammar` section id、排序、標題、source coverage、可展開內容
- `/grammar` サ變動詞表格與例句呈現
- `/vocabulary` 詞條搜尋、顯示與標記行為
- route ownership 負向驗證

### Agent Context

規劃完成後執行：

```powershell
.specify/scripts/powershell/update-agent-context.ps1 -AgentType codex
```

## 測試策略

### 單元測試（Vitest）

| 測試檔 | 驗收條件 |
|--------|----------|
| `tests/unit/n5GrammarData.spec.ts` | 新 section id、排序、category、topics、examples、sourceRefs、sourceCoverage 均完整；`note2` 置頂；助詞最後 |
| `tests/unit/changeRulesData.spec.ts` | サ變動詞資料保留既有表格，新增例句組至少涵蓋 `しません`、`しませんでした`、`しない`、`した` |
| `tests/unit/vocabularyData.spec.ts` | `東口`、`西口`、`北口`、`南口` 皆存在；重複列為 0；新增列位於尾端且 id 穩定 |

### 元件測試（Vitest + Vue Test Utils）

| 測試檔 | 驗收條件 |
|--------|----------|
| `tests/component/N5GrammarSections.spec.ts` | 新增 N5 section 預設收合、可展開、內容 renderer 正確，指示詞/數字表格與例句標記可見 |
| `tests/component/N5GrammarViewSmoke.spec.ts` | `/n5-grammar` 初始 render 不出錯，標題可辨識，無空白容器 |
| `tests/component/GrammarChangeRulesTables.spec.ts` | サ變動詞表格下方例句顯示；標題與說明分離後既有表格仍可展開 |
| `tests/component/GrammarViewSmoke.spec.ts` | `/grammar` 初始 render 與 11 個容器穩定 |
| `tests/component/VocabularyViewSmoke.spec.ts` | 指定詞條可被搜尋/顯示且不破壞既有標記流程 |
| `tests/component/RouteOwnership.spec.ts` | 本次新增內容只出現在指定 route，不外溢到 `/practice` 或其他 route |

### e2e / Smoke（Playwright）

| 測試檔 | 驗收條件 |
|--------|----------|
| `tests/e2e/n5-grammar-layout.spec.ts` | 375px 寬度展開新 section 無明顯水平溢出、重疊或空白容器 |
| `tests/e2e/grammar-change-rules.spec.ts` | 375px 寬度展開サ變動詞區塊，表格與例句可讀 |
| `tests/e2e/vocabulary-word-practice.spec.ts` | 指定詞條可搜尋、可標記、標記持久化流程不回歸 |

### 驗證命令

```powershell
npm run lint
npm run typecheck
npm run test:unit
npm run build
npm run test:e2e
```

## 實作順序

1. 建立 N5 文法 source inventory
   - 讀取 `v16/note2.txt`、`v16/note.txt`、`v16/note3.txt`
   - 將來源拆成 `note-v16-note2-core-terms`、`note-v16-ch0-dekiru`、`note-v16-ch1-wo` 等 coverage ids
2. 更新 `/n5-grammar` 資料
   - 在 `grammarNotes.ts` 新增核心字詞總覽、できる、疑問詞、指示詞、數字、時間表現與助詞區塊
   - 調整 `particleSectionIds` 與 order，確保助詞最後
   - 若例句需局部紅字標記，最小擴充 example/text highlight 型別與 renderer
3. 更新 `/grammar` サ變動詞
   - 擴充 `InflectionTableSpec` 或相鄰資料結構以承載例句組
   - 讓 `InflectionTable.vue` 在サ變 section 顯示表格下方例句
   - 將標題與補充說明拆分為 title/subtitle 或 body description
4. 更新 `/vocabulary` 字典
   - 查核既有詞條是否已覆蓋四個方位詞
   - 缺漏者追加於 `jpWords.ts` 尾端並保持既有欄位格式
5. 更新測試
   - 先補資料測試，再補元件與 e2e 測試
   - 確認 route ownership 與負向驗證
6. 執行完整驗證命令
7. 若架構責任或型別公開面變更，更新 `PROJECT_ARCHITECTURE.md`

## Complexity Tracking

本次 Constitution Check 全數通過，無需額外複雜度豁免。
