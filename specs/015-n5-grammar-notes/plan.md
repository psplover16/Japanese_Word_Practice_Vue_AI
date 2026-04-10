# 實作計畫：N5 文法新增助詞「と」「で」

**Branch**: `015-n5-grammar-notes` | **Date**: 2026-04-10 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/015-n5-grammar-notes/spec.md`

---

## 摘要

本次功能在 N5 文法學習頁面（`src/modules/n5Grammar`）新增兩個助詞 section：助詞「と」（動作夥伴）與助詞「で」（交通工具/手段）。所有變更集中於資料層（`grammarNotes.ts`），頁面元件（`N5GrammarView.vue`）無需修改。範例全數由 AI 生成（`origin: 'supplemental'`），難度限定 N5 程度。

---

## Technical Context

**Language/Version**: TypeScript ~5.9.3 / Vue 3.5.30
**Primary Dependencies**: Vue 3、Vue Router 4.6.3、Vite 7.3.1、Tailwind CSS 3.4.17
**Storage**: N/A（靜態 TypeScript 資料，無 localStorage）
**Testing**: Vitest 3.2.4（單元）+ Playwright 1.54.2（e2e）
**Target Platform**: Web PWA（desktop + mobile，375px 最小寬度）
**Project Type**: Vue 3 SPA / PWA
**Performance Goals**: N/A（純靜態資料新增，無效能影響）
**Constraints**: 375px min width；不新增元件；不修改 router；不修改 `N5GrammarView.vue`
**Scale/Scope**: 2 個 N5GrammarSection、各約 1 個 topic、各 2 個例句

---

## Constitution Check

*GATE: 實作前須全數通過*

- [x] 規格、計畫、文件以繁體中文（zh-TW）撰寫；Constitution 本身保留英文
- [x] `.gitignore` 已存在，`node_modules/`、`dist/` 等均已排除
- [x] 本次功能不改變 repository 結構、模組邊界、路由組成或部署結構 → **`PROJECT_ARCHITECTURE.md` 不需更新**
- [x] 本次為全新 spec，不涉及現有 spec 的行為細化 → 無需回寫既有規格
- [x] 測試策略於實作前定義（見「測試策略」章節）
- [x] `N5GrammarSectionCard` 的 `defaultExpanded` 預設 `false`，空 section 不會在展開前渲染內容，無空狀態渲染錯誤風險
- [x] 功能正向歸屬：N5GrammarView；負向歸屬：GrammarView、VocabularyView、PracticeView 均不受影響
- [x] 共用元件（`N5GrammarInfoBlock` 等）按設計傳入資料，不覆寫任何 route-specific 規則
- [x] 無效能敏感異動，不需定義效能預算
- [x] 無任何額外複雜度，為最簡可行實作

---

## Project Structure

### Documentation (this feature)

```text
specs/015-n5-grammar-notes/
├── spec.md              ✅ 已完成
├── plan.md              ✅ 本檔案
├── research.md          ✅ Phase 0 產出
├── data-model.md        ✅ Phase 1 產出
└── tasks.md             ⬜ /speckit.tasks 產出（尚未建立）
```

### Source Code（變更範圍）

```text
src/modules/n5Grammar/
└── data/
    └── grammarNotes.ts      ← 唯一需要修改的檔案

tests/
└── unit/
    └── n5Grammar/
        └── grammarNotes.spec.ts   ← 新增單元測試（或更新現有）
```

**Structure Decision**: 採 Option 1 單一專案結構，僅異動 `grammarNotes.ts` 資料層。

**Architecture Document Impact**: 不需更新 `PROJECT_ARCHITECTURE.md`（無新增目錄、模組或路由）。

---

## 測試策略

### 單元測試（Vitest）

測試對象：`src/modules/n5Grammar/data/grammarNotes.ts`

| 測試項目 | 驗收條件 |
|----------|---------|
| `particleSectionIds` 包含 `'particle-to'` 與 `'particle-de'` | 陣列中找得到兩個新 ID |
| `particle-to` section 存在於 `n5GrammarSections` | 以 id 查找不為 undefined |
| `particle-de` section 存在於 `n5GrammarSections` | 以 id 查找不為 undefined |
| `particle-to` 的 order 在 `particle-ka`（96）之後，在 `particle-de` 之前 | order: 97 |
| `particle-de` 的 order 在 `particle-to` 之後 | order: 98 |
| `particle-to` 有至少 1 個 topic，每個 topic 有至少 1 個 example | 結構驗證 |
| `particle-de` 有至少 1 個 topic，每個 topic 有至少 1 個 example | 結構驗證 |
| `particle-to` 的 sharedNotes 含 `'to-noun-listing'` | id 存在 |
| `particle-de` 的 sharedNotes 含 `'de-with-mo'` | id 存在 |
| `sortedN5GrammarSections` 中 particle 類別排在 core 類別之後 | category 排序驗證 |
| 所有 example 的 `origin` 均為 `'supplemental'`（particle-to、particle-de） | 逐筆驗證 |
| `n5GrammarSourceCoverage` 含 `'note-v14-ch1'`、`'note-v14-ch2'` 兩筆 | sourceId 查找 |

### e2e Smoke Test（Playwright）

測試對象：`/n5-grammar` 路由

| 測試項目 | 驗收條件 |
|----------|---------|
| N5 文法頁面初始渲染無報錯 | `n5-grammar-view` 存在，無 console error |
| `particle-to` 區塊的 toggle 按鈕可操作 | `data-testid="n5-grammar-toggle-particle-to"` 可點擊 |
| `particle-de` 區塊的 toggle 按鈕可操作 | `data-testid="n5-grammar-toggle-particle-de"` 可點擊 |
| 展開後 title 可見 | 對應 `n5-grammar-title-particle-to` 有文字 |

---

## Phase 0：Research

*詳見 [research.md](./research.md)*

---

## Phase 1：Design & Contracts

*詳見 [data-model.md](./data-model.md)*

### Contracts

本次功能為純內部資料層變更，不對外公開任何 API、CLI 介面或通訊協定。`/contracts/` 目錄不需建立。

---

## 實作順序

1. 修改 `src/modules/n5Grammar/data/grammarNotes.ts`：
   - 新增 `particle-to` section 物件（含 topics、sharedNotes）
   - 新增 `particle-de` section 物件（含 topics、sharedNotes）
   - 更新 `particleSectionIds`：末尾追加 `'particle-to'`、`'particle-de'`
   - 更新 `n5GrammarSourceCoverage`：新增 ch1、ch2 兩筆

2. 撰寫／更新單元測試（Vitest）

3. 執行 e2e smoke test（Playwright）

4. 執行 lint、typecheck、unit test，確認全部通過

---

## 複雜度追蹤

*Constitution Check 全數通過，無需記錄違規理由。*
