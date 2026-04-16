# 實作計畫：N5 文法新增邀約與變化表現整理

**Branch**: `feature/016-n5-change-invitation` | **Date**: 2026-04-16 | **Spec**: [spec.md](C:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/specs/016-n5-change-invitation/spec.md)
**Input**: Feature specification from `C:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/specs/016-n5-change-invitation/spec.md`

---

## 摘要

本次功能在 `/n5-grammar` 追加 4 個非助詞文法區塊，整理 `v15/note.txt` 的 ch1 到 ch4 內容：`ませんか / ましょう`、`～くなります / ～になります`、`～くします / ～にします`、以及 `～ましょう` 的補充比較。實作延續目前 N5 文法頁的資料驅動架構，主要變更集中在 `src/modules/n5Grammar/data/grammarNotes.ts` 與對應測試，不新增 route、不重寫 renderer，並透過 source coverage、區塊排序與 smoke / unit / e2e 驗證確保內容完整且不外溢。

---

## Technical Context

**Language/Version**: TypeScript ~5.9.3 / Vue 3.5.30  
**Primary Dependencies**: Vue 3、Vue Router 4.6.3、Vite 7.3.1、Vitest 3.2.4、Playwright 1.54.2  
**Storage**: N/A（靜態 TypeScript 資料檔，無額外持久化）  
**Testing**: Vitest（unit + component）與 Playwright（route e2e / smoke）  
**Target Platform**: Web PWA（desktop + mobile，需支援 375px 寬度）  
**Project Type**: Vue 3 SPA / PWA  
**Performance Goals**: 純靜態資料增量，不新增可感知等待；`/n5-grammar` 初始 render 與展開流程不得出現明顯延遲或錯誤  
**Constraints**: 只在 `/n5-grammar` 顯示；沿用既有可收合卡片與 renderer；內容需維持 UTF-8 正確文字；手機寬度需可讀；既有助詞與其他 route 不得受影響  
**Scale/Scope**: 4 個新 core sections、對應多個 topics / sharedNotes / examples / source coverage 項目，並更新既有 N5 文法測試

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] 規格、計畫、研究與 quickstart 均以繁體中文撰寫；Constitution 保持英文。
- [x] 儲存庫已有 `.gitignore`；本次不提交 `node_modules/`、`dist/`、`coverage/` 等再生產物。
- [x] 本次預期只變更 `src/modules/n5Grammar/data/grammarNotes.ts` 與 N5 文法相關測試，無 repository 結構、路由、部署或模組邊界變更，因此 **`PROJECT_ARCHITECTURE.md` 不需更新**。
- [x] 本次為新 feature spec `specs/016-n5-change-invitation/spec.md` 的實作規劃，不是回寫既有 feature 行為；來源 spec 已作為本 work item 的權威記錄。
- [x] 測試策略已先定義於本計畫中，包含單元、元件 smoke、route e2e 與負向 ownership 驗證。
- [x] 初始 render、收合狀態與空內容安全性將延用現有 `N5GrammarSectionCard` / render-safe 路徑，不新增高風險互動元件。
- [x] 正向 ownership 為 `/n5-grammar` 與其資料模組；負向 ownership 為 `/practice`、`/grammar`、`/vocabulary` 與既有助詞區塊不得被錯置或污染。
- [x] 本次沿用既有 N5 文法卡片、`info-stack` / `compare-table` renderer，不以共享抽象覆蓋 route-specific 閱讀規則。
- [x] 本次不屬效能敏感重構；採最小資料擴充方案，複雜度可控，無需額外例外豁免。

---

## Project Structure

### Documentation (this feature)

```text
specs/016-n5-change-invitation/
├── spec.md              ✅ 已完成
├── plan.md              ✅ 本檔案
├── research.md          ✅ Phase 0 產出
├── data-model.md        ✅ Phase 1 產出
├── quickstart.md        ✅ Phase 1 產出
└── tasks.md             ⬜ /speckit.tasks 產出（尚未建立）
```

### Source Code (repository root)

```text
src/
└── modules/
    └── n5Grammar/
        ├── data/
        │   └── grammarNotes.ts
        ├── types/
        │   └── grammarNotes.ts
        ├── components/
        │   ├── N5GrammarSectionCard.vue
        │   ├── N5GrammarInfoBlock.vue
        │   ├── N5GrammarCompareTable.vue
        │   └── N5GrammarBulletBlock.vue
        └── views/
            └── N5GrammarView.vue

tests/
├── unit/
│   └── n5GrammarData.spec.ts
├── component/
│   ├── N5GrammarSections.spec.ts
│   ├── N5GrammarViewSmoke.spec.ts
│   └── RouteOwnership.spec.ts
└── e2e/
    ├── n5-grammar-layout.spec.ts
    └── app-shell.smoke.spec.ts
```

**Structure Decision**: 延續單一前端專案結構，將所有新內容放入 `src/modules/n5Grammar/data/grammarNotes.ts`，讓既有 view / renderer 直接消費新增資料。測試優先更新現有 N5 文法 data / component / e2e 檔案，而非新增平行模組。

**Architecture Document Impact**: 不需更新 `PROJECT_ARCHITECTURE.md`。本次沒有新增目錄、模組邊界、route 或部署結構，僅擴充既有 N5 文法資料與測試責任。

---

## Phase 0：Research

*詳見 [research.md](C:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/specs/016-n5-change-invitation/research.md)*

Phase 0 已確定：
- 新內容採 4 個獨立 core sections，而不是把 ch1~ch4 合成單一大區塊
- ch1 使用 `compare-table` 呈現 `ませんか` 與 `ましょう` 的比較
- ch2 / ch3 / ch4 以 `info-stack` 呈現規則、細節與例句
- source coverage 將新增 `note-v15-ch1` 到 `note-v15-ch4`

---

## Phase 1：Design & Contracts

*詳見 [data-model.md](C:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/specs/016-n5-change-invitation/data-model.md)*

### Contracts

本次功能為既有前端 route 的內部靜態資料擴充，不新增外部 API、CLI、資料交換格式或可獨立驗證的對外契約，因此不建立 `contracts/` 目錄。UI 驗證以既有 component / e2e 測試與 quickstart 操作步驟取代。

### Agent Context

規劃完成後需執行：

```powershell
.specify/scripts/powershell/update-agent-context.ps1 -AgentType codex
```

以同步目前 plan 的技術上下文與 feature 狀態。

---

## 測試策略

### 單元測試（Vitest）

主測對象：`tests/unit/n5GrammarData.spec.ts`

| 測試項目 | 驗收條件 |
|----------|---------|
| 新增 4 個 core section id 存在 | 能以 id 查到對應 section |
| 新增 core section 排序正確 | order 介於既有 core 與 particle 群組之間，且順序為 ch1 → ch2 → ch3 → ch4 |
| ch1 比較區塊結構正確 | compare table、對應 example groups、差異說明存在 |
| ch2 / ch3 / ch4 topic 結構完整 | 每個 section 有 topics、details、examples |
| source coverage 完整 | `note-v15-ch1` 到 `note-v15-ch4` 映射正確、無遺漏 |
| 例句來源標記合理 | 來源例句與補充例句的 `origin` 分配符合規格 |
| 既有助詞與既有 core 排序未回歸 | 原有 section 相對順序不變 |

### 元件測試（Vitest + Vue Test Utils）

主測對象：`tests/component/N5GrammarSections.spec.ts`、`tests/component/N5GrammarViewSmoke.spec.ts`、`tests/component/RouteOwnership.spec.ts`

| 測試項目 | 驗收條件 |
|----------|---------|
| `/n5-grammar` 初始 render 正常 | 新區塊標題可見、無 render failure |
| 新增區塊可收合／展開 | 既有 toggle 行為可套用到新 section |
| ch1 比較區塊展開後可見比較內容 | compare table 與例句群組顯示正常 |
| ch2 / ch3 / ch4 展開後可見說明與例句 | info-stack 內容顯示正常 |
| 負向 ownership 維持 | 其他 route 不出現本次新增標題或內容 |

### e2e / Smoke（Playwright）

主測對象：`tests/e2e/n5-grammar-layout.spec.ts`、`tests/e2e/app-shell.smoke.spec.ts`

| 測試項目 | 驗收條件 |
|----------|---------|
| `/n5-grammar` 在 375px 仍可閱讀 | 新增區塊展開後無明顯水平溢出或重疊 |
| route shell 正常 | App shell、tabs、direct route 仍可進入 |
| 新增內容僅存在 `/n5-grammar` | 其他 route 不出現本輪新標題 |

---

## 實作順序

1. 更新 `src/modules/n5Grammar/data/grammarNotes.ts`
   - 新增 4 個 core sections
   - 補齊 topics、sharedNotes、compare table / example groups
   - 新增 `sourceCoverage` 對應
   - 調整 order，確保插入位置正確
2. 視需要微調 `src/modules/n5Grammar/types/grammarNotes.ts`
   - 僅在現有型別無法承載資料時才修改
3. 更新 Vitest 單元與元件測試
4. 更新 Playwright N5 文法版面與 smoke 驗證
5. 執行 lint、typecheck、unit、build、e2e 驗證

---

## Complexity Tracking

本次 Constitution Check 全數通過，無需額外複雜度豁免。
