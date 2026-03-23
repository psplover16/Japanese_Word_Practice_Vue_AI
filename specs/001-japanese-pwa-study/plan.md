# Implementation Plan: 日語學習 PWA

**Branch**: `001-japanese-pwa-study` | **Date**: 2026-03-23 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/001-japanese-pwa-study/spec.md`

## Summary

本功能會建立一個純前端的 Vue 3 + TypeScript + Vite + Tailwind PWA，提供三個主要路由。第一頁負責字母勾選、教學表格、考試 modal 與結算；第二頁與第三頁只唯讀共享勾選明細，不得把第一頁的專屬 UI 擴散過去。整體設計以 `375px` 為主要驗收尺寸，並以 render-safe、route ownership 與 reusable-style boundary 為核心約束。

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Vue 3、Vue Router 4、Vite 7、Tailwind CSS 3、vite-plugin-pwa、Font Awesome  
**Storage**: localStorage（僅保存最近一次結算結果與 PWA 延後更新標記）  
**Testing**: Vitest、Vue Test Utils、jsdom  
**Target Platform**: 手機、平板、桌機瀏覽器與手機獨立 app 模式 PWA  
**Project Type**: 純前端 Web Application / PWA  
**Performance Goals**: `375px` 主要路由首次 render 不出錯；三個主要路由皆可在離線狀態開啟；`tableA` / `tableB` 於 375px 無捲動條  
**Constraints**: 無後端、不可使用 `any`、避免不必要第三方套件、使用原生 `alert` / `confirm`  
**Scale/Scope**: 3 個主要路由、1 個 app-level session store、1 組最近一次結算 localStorage、數個教學表格元件

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- 規格、計畫、quickstart 與面向使用者的文件皆以繁體中文撰寫。
- Repository 已包含 `.gitignore`，且 `node_modules/`、`dist/`、`build/`、`coverage/` 等可再生產物維持忽略。
- 所有主要路由與高風險互動元件都必須規劃 smoke test，以驗證 default / empty / hidden / placeholder 狀態 render-safe。
- 設計文件必須同時記錄 positive ownership 與 negative ownership：
  - `SelectionDetailPanel` 只出現在第二頁與第三頁。
  - 第一頁不得出現 `第一頁勾選結果明細` 區塊。
- 共享樣式只可套用在需求實質相同的元件：
  - `tableA` / `tableB` 與拗音類表格可採固定格表。
  - `table撥音` / `table促音` 必須維持內容撐寬表格。
- 若有任何額外複雜度，必須在本計畫說明原因。

## Architecture Decisions

### 1. App Shell 與 Route Ownership

- `AppShell` 管理固定頁首、route title、route tabs 與 PWA toast。
- `PracticeView` 為第一頁核心畫面，包含工具列、主表格、教學區塊、考試 modal 與結算區。
- `GrammarView`、`VocabularyView` 只讀取共享狀態，顯示勾選結果明細與各自內容容器。
- `SelectionDetailPanel` 屬於 `/grammar` 與 `/vocabulary` 專屬功能；不得掛在 `/practice`。

### 2. State Strategy

- 使用 `usePracticeSession` 作為 app-level session store：
  - 保存 tableA / tableB 勾選結果
  - 保存 `題目包含：平假名` / `題目包含：片假名`
  - 保存 `促音` / `拗音／合拗音／長音符`
  - 保存 `古語假名` 顯示狀態
  - 保存 `[題數]`
- 此狀態只在單次網站生命週期內有效，不寫入 localStorage。

### 3. Exam Session Strategy

- 使用 `useExamSession` 管理 modal 題目流程。
- 內部狀態最少包含：
  - `題目 deck`
  - `目前題目索引`
  - `答案是否揭曉`
  - `本題是否已記錄我不清楚`
  - `最近一次結算結果`
- 關閉 modal 確認後，直接調用同一套 settle 流程。

### 4. Layout Strategy

- 外層固定容器：`py-3` / `px-2` 對應 12px / 8px。
- `375px` 主要使用單欄為主，`>=1024px` 才拆雙欄。
- 兩種表格樣式系統：
  - `fixed-grid-table`：給 `tableA` / `tableB` / 拗音類。
  - `content-fit-table`：給 `table撥音` / `table促音`。

## Project Structure

```text
specs/001-japanese-pwa-study/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── tasks.md
├── checklists/
│   └── requirements.md
└── contracts/
    ├── route-state-contract.md
    ├── toolbar-actions-contract.md
    ├── practice-layout-contract.md
    ├── instruction-sections-contract.md
    ├── exam-session-contract.md
    └── pwa-lifecycle-contract.md

src/
├── app/
├── modules/
│   ├── practice/
│   ├── grammar/
│   ├── vocabulary/
│   ├── exam/
│   └── pwa/
├── shared/
└── styles/

tests/
├── component/
├── unit/
└── mocks/
```

**Structure Decision**: 採單一前端專案。`practice` 管理第一頁與共享狀態，`exam` 管理 modal 與結算，`pwa` 管理安裝／更新生命週期，`grammar` / `vocabulary` 只放 route views 與 route-specific 呈現。

## UI / State / Storage Strategy

### UI Strategy

- 全部畫面配色一致，按鈕採 0.25rem 圓角、input 採 0.25rem 圓角、容器採 0.5rem 圓角。
- 第一頁 layout 分為：
  - `checkboxGroupA`
  - `tableA`
  - `tableB`
  - 教學區塊群
  - 結算區域
- `375px` 以下避免非必要橫向捲動，`768px` / `1024px` 以不破版為原則。

### State Strategy

- `usePracticeSession` 負責 route-shared、reload-reset 的狀態。
- `useExamSession` 負責單次考試狀態與結算邏輯。
- `LatestUnknownResultStorage` 封裝最近一次結果讀寫與資料驗證。

### Storage Strategy

- 不把勾選狀態持久化。
- 只持久化：
  - 最近一次 `我不清楚` 結果
  - PWA 更新延後套用標記（若需要）
- 資料讀取失敗時立即清除非法 localStorage，避免 render error。

## PWA Implementation Considerations

- 採 `vite-plugin-pwa`，`registerType` 使用 `prompt`。
- `publicDir` 指向 `_private/_private_fileAssets/public`，直接使用：
  - `vite.ico`
  - `icons/180.png`
  - `icons/192.png`
  - `icons/512.png`
- 需支援完全離線模式，將主要 HTML / JS / CSS / icon 納入 precache。
- 更新提示條件：
  - 僅手機端
  - 僅 `display-mode: standalone`
- 更新成功後清除 Cache Storage，不清除其他 localStorage。

## Code Standards

- 全部元件採 Composition API。
- 不使用 `var`、`any`、全域函式、全域變數。
- component 檔名使用 PascalCase；模組與工具檔名使用 camelCase。
- 所有 statements 以分號結尾。
- 可重用邏輯集中於 composables / services / utils。
- 優先使用瀏覽器原生能力與 Vue 內建能力，不額外加入狀態管理套件。

## Risks and Implementation Notes

### Risk 1: 路由功能擴散

- 風險：第二頁與第三頁的共享明細功能被錯做進第一頁。
- 應對：在 route contract、tasks 與 component tests 中同時加入 negative ownership 驗證。

### Risk 2: 過度共用表格樣式

- 風險：`table撥音` / `table促音` 被誤套固定格表樣式。
- 應對：在 `practice-layout-contract`、component tests 與 CSS class 命名上明確拆分兩種表格系統。

### Risk 3: Hidden / Placeholder 狀態造成初始 render 錯誤

- 風險：古語假名隱藏時直接移除資料，導致 template 取值失敗。
- 應對：資料層保留固定格位，以 placeholder cell 顯示 `-`，並用 smoke test 驗證。

### Risk 4: PWA 更新流程誤刪 localStorage

- 風險：更新後清空所有儲存空間，連結算結果一起被刪除。
- 應對：只清除 Cache Storage，不碰最近一次結算的 localStorage key。

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 無 | 無 | 無 |
