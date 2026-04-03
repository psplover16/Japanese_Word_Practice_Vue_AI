# Implementation Plan: 路由切換與 N5 文法入口優化

**Branch**: `011-route-tabs-n5-grammar` | **Date**: 2026-04-04 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/011-route-tabs-n5-grammar/spec.md`

## Summary

本功能會把共享頁首從「左側 route title + 右側 route tabs」改為「只保留靠左排列、可換列的 route tabs」，同時將字母練習頁的清音與濁音／半濁音表格文字放大，並新增一個 `N5文法` 的主路由占位頁。技術上維持既有 Vue 3 + TypeScript + Vite + Vue Router 架構，不新增狀態管理或後端；變更會集中在 `AppShell`、`RouteTabs`、`router`、`PracticeView` 關聯樣式與一個新的 route-specific view。測試會補齊共享導覽 smoke、route ownership、N5 placeholder render-safe 與小螢幕排版驗證，並要求同步回寫既有來源 spec 與 `PROJECT_ARCHITECTURE.md`。

## Technical Context

**Language/Version**: TypeScript 5.9、Vue 3.5 SFC、Node.js 22 toolchain  
**Primary Dependencies**: Vue 3、Vue Router 4、Vite 7、Tailwind CSS 3、Vitest、Vue Test Utils、Playwright  
**Storage**: N/A，本功能不新增持久化資料  
**Testing**: Vitest component tests、Playwright e2e、`npm run lint`、`npm run typecheck`、`npm run build`  
**Target Platform**: GitHub Pages 上的前端 SPA / PWA，支援手機與桌機瀏覽器  
**Project Type**: 單一前端 Web Application  
**Performance Goals**: `320px` 至 `375px` 寬度下共享頁首不得出現水平捲動、文字重疊或 console error；新 `N5文法` 路由需在單次載入內穩定顯示占位內容  
**Constraints**: 只調整共享頁首、主路由按鈕、字母練習指定表格與新增 N5 占位頁；既有 `/grammar` 與 `/vocabulary` 主內容不得被替換或重排；route-specific 規則優先於共享樣式；需同步更新 `PROJECT_ARCHITECTURE.md` 與受影響的來源 spec  
**Scale/Scope**: 1 個 app shell、1 個共享導覽元件、1 個 router 設定、1 個新的主路由 view、2 個字母表格字級調整、4 至 6 個測試檔案與多份文件回寫

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- 本 feature 的 spec、plan、research、data-model、quickstart 與 contract 都以繁體中文撰寫，符合 Constitution。
- Repository 已有 `.gitignore`；本 feature 不會提交 `node_modules/`、`dist/`、`build/`、`coverage/`。
- 這次會調整 route composition 與導覽資訊架構，必須更新 `PROJECT_ARCHITECTURE.md`。
- 測試策略已明確：共享頁首 component smoke、route ownership、N5 placeholder route render-safe、app-shell e2e 導覽與手機寬度排版驗證。
- Scope ownership 已明確：功能只屬於 `AppShell`、`RouteTabs`、`/practice` 指定表格與新 `N5文法` route；`/grammar`、`/vocabulary` 主內容、exam modal、PWA toast 都屬負向範圍。
- Render-safe 要求已納入：新的 `N5文法` route 必須有預設 smoke 驗證；共享頁首去除標題後仍不得出現空白占位、渲染失敗或 console error。
- 複雜度可接受：這次採用最小可行方案，以局部 UI 重排、局部字級調整與單一 placeholder route 達成需求，不引入新的共享抽象或狀態層。
- 來源規格回寫已納入：至少需更新 [`specs/001-japanese-pwa-study/spec.md`](../001-japanese-pwa-study/spec.md)、[`specs/003-practice-romaji-layout/spec.md`](../003-practice-romaji-layout/spec.md)、[`specs/004-romaji-layout-stability/spec.md`](../004-romaji-layout-stability/spec.md)；若實作結果讓 [`specs/006-grammar-change-rules/spec.md`](../006-grammar-change-rules/spec.md) 或 [`specs/007-word-practice-rebuild/spec.md`](../007-word-practice-rebuild/spec.md) 中對既有 shell / tabs 的描述失準，也必須同工更新。

## Architecture Decisions

### 1. 共享頁首改為 tabs-only shell，不保留隱藏標題占位

- `AppShell.vue` 會移除左側 route title 呈現，而不是只把文字設為隱藏，避免留下多餘空白與不必要的 layout 負擔。
- 共享頁首仍保留既有卡片式容器、間距與 PWA toast 位置，確保殼層一致性只改在導航資訊結構。
- `AppHeader.vue` 若在實作後完全沒有使用者，應在同一工作項內移除或明確處理，避免留下無責任的 dead component。

### 2. `RouteTabs` 負責新的主路由順序、換列與單行文字規則

- `RouteTabs.vue` 將成為共享頁首唯一主要內容，使用明確的 tab descriptor 陣列管理順序與標籤。
- 新順序為：`字母練習`、`變化規則`、`單字練習`、`N5文法`；`N5文法` 必須緊接在 `單字練習` 右側。
- 容器允許多列換行，但每顆按鈕本身必須維持 `white-space: nowrap`，避免按鈕內文字斷行。
- 文字尺寸提升與對齊規則只作用在主路由按鈕，不應外溢到其他共享按鈕元件。

### 3. `N5文法` 採獨立 route-specific view，先維持最小占位內容

- 新 route 會用獨立 view 承載，建議放在 `src/modules/n5Grammar/views/N5GrammarView.vue`，而不是混進現有 `/grammar` 模組。
- 此 view 初期只負責 render-safe 地顯示 `製作中` 與必要的測試識別，不預先綁入 grammar 既有資料或共享 detail panel。
- `router.ts` 需新增 route path、component 與對應 meta，直接網址進入也必須合法。

### 4. 字母練習表格字級調整採 route-specific selector，不改全域表格抽象

- 需求只指向 `/practice` 內的 `SeionTable` 與 `DakuonTable` 文字，因此樣式調整要限制在這兩塊表格的 class 或容器範圍內。
- 不應透過調整 `Base*` 元件、共用 table primitive 或整站文字比例來達成，避免連帶影響 `/grammar`、`/vocabulary` 或 exam modal。
- 若放大字級導致 cell 高度、padding 或 line-height 必須一併微調，可做最小必要修正，但不得擴散到未點名區塊。

### 5. 測試與文件回寫以「新增 surface + 共享 shell 變更」雙軸驗證

- Shared shell 變更：需要更新 `AppShell` smoke 與 e2e 導覽案例，驗證不再顯示舊標題、tabs 可見、可切到 `N5文法`。
- New surface 變更：需要新增或擴充 route ownership / smoke test，證明 `N5文法` 只出現在新 route，不把 grammar 規則內容誤帶進來。
- Spec write-back 變更：實作完成後需回寫來源 spec 中關於主路由數量、共享頁首、375px tabs 版面與 route shell 預期的描述。

## Project Structure

### Documentation (this feature)

```text
specs/011-route-tabs-n5-grammar/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── tasks.md
└── contracts/
    └── navigation-and-n5-route-contract.md
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── AppShell.vue
│   └── router.ts
├── modules/
│   ├── n5Grammar/
│   │   └── views/
│   │       └── N5GrammarView.vue
│   └── practice/
│       └── views/
│           └── PracticeView.vue
├── shared/
│   └── components/
│       └── RouteTabs.vue
└── styles/
    └── main.css

tests/
├── component/
│   ├── AppShellSmoke.spec.ts
│   ├── RouteOwnership.spec.ts
│   └── N5GrammarViewSmoke.spec.ts
└── e2e/
    └── app-shell.smoke.spec.ts

PROJECT_ARCHITECTURE.md
specs/001-japanese-pwa-study/spec.md
specs/003-practice-romaji-layout/spec.md
specs/004-romaji-layout-stability/spec.md
```

**Structure Decision**: 維持單一前端專案結構，把新 route 收斂到獨立 `n5Grammar` 模組，避免污染既有 `/grammar` 模組；共享導覽與字級調整則留在現有 app / shared / styles / practice 範圍內。

**Architecture Document Impact**: 必須更新 `PROJECT_ARCHITECTURE.md`，補上 `src/modules/n5Grammar/views/N5GrammarView.vue`、更新 `src/app/router.ts` 的主路由數量與責任描述，並修正 `AppShell.vue` / `RouteTabs.vue` 的頁首導覽職責。

## UI / State / Data Strategy

### UI Strategy

- `AppShell.vue`
  - 共享頁首容器改為支撐 route tabs 多列顯示。
  - 不再輸出左側 route title。
- `RouteTabs.vue`
  - 用靜態 tab 清單驅動四個主路由按鈕。
  - 負責 active state、換列、單行文字與字級放大。
- `PracticeView.vue` + `main.css`
- 只調整清音表與濁音／半濁音表的內容字級與必要的行高/間距，原則目標為約 `1.1x`，若造成破版、裁切或額外斷行，僅允許最小幅度下修到仍明顯大於現況的穩定值；同時固定假名與羅馬音之間保有 `4px` 垂直間距。
- `N5GrammarView.vue`
  - 提供最低限度的 placeholder 內容與 smoke selector。

### State Strategy

- 不新增 store、localStorage 或新的 composable。
- `RouteTabs` 仍只依當前 route path 判定 active state。
- `N5文法` 占位頁不共享或修改 `PracticeSession`；如需 app shell 既有 provider，僅維持只讀存在。

### Data Strategy

- `RouteTabs` 會有一組小型靜態 `tab descriptors`，欄位至少包含 `to` 與 `label`，必要時補 `testId`。
- `N5GrammarView` 僅需靜態 placeholder copy，不建立額外資料檔。
- 字級調整依現有 DOM class / test id 施作，不引入新的設計 token 系統。

## Test Strategy

### Positive Ownership

- `AppShell.vue`：共享頁首容器仍 render-safe，且只顯示 route tabs。
- `RouteTabs.vue`：四個主路由按鈕順序正確，`N5文法` 在 `單字練習` 右側，按鈕內文字不斷行。
- `/practice`：清音與濁音／半濁音表格文字放大後仍可讀。
- `/n5-grammar`（或實際 path）：可直接進入並顯示 `製作中`。

### Negative Ownership

- `/grammar`：不得顯示 `製作中` placeholder 作為主內容，也不得被錯誤改寫成新 route。
- `/vocabulary`：不得因共享頁首調整而引入新主內容或排版回歸。
- exam modal、PWA toast、非主路由按鈕：不得因 tabs 字級放大而同步改變。

### Planned Automated Coverage

- `tests/component/AppShellSmoke.spec.ts`
  - 更新為驗證舊 route title 不再出現在 header，且可切到 `N5文法`。
- `tests/component/RouteOwnership.spec.ts`
  - 擴充四路由 ownership，確認 `N5文法` 只出現在新 route，`/grammar` 保持既有規則頁，`/vocabulary` 保持單字頁。
- `tests/component/N5GrammarViewSmoke.spec.ts`
  - 驗證新 view 預設渲染 `製作中`、無共享 detail panel、無 console-sensitive placeholder 問題。
- `tests/e2e/app-shell.smoke.spec.ts`
  - 驗證主路由導覽新增第 4 顆按鈕、可切換到 `N5文法`，小螢幕下 header 不橫向溢出。

### Manual Verification Focus

- `320px` / `375px` 寬度下 tabs 可換列但不出現按鈕內斷行。
- `SeionTable` / `DakuonTable` 放大字級後無裁切、重疊、額外斷行或欄位錯位；若為避免破版而微幅下修，最終字級仍需明顯大於現況。
- 直接輸入新 route URL 可正常到達 placeholder 頁。

## Source Spec Write-Back Plan

- [`specs/001-japanese-pwa-study/spec.md`](../001-japanese-pwa-study/spec.md)
  - 更新主路由數量與共享頁首描述，不再宣稱 header 會顯示目前 route title。
- [`specs/003-practice-romaji-layout/spec.md`](../003-practice-romaji-layout/spec.md)
  - 更新 375px 下共享頁首與 route tabs 的可讀性規則，反映多列 tabs 與無標題 layout。
- [`specs/004-romaji-layout-stability/spec.md`](../004-romaji-layout-stability/spec.md)
  - 更新關於 `AppShell` / `RouteTabs` 單列或舊 header 期望的描述，改為與本 feature 最終行為一致。
- Conditional write-back:
  - 若 [`specs/006-grammar-change-rules/spec.md`](../006-grammar-change-rules/spec.md) 或 [`specs/007-word-practice-rebuild/spec.md`](../007-word-practice-rebuild/spec.md) 的 shell 驗收文字因新 tabs / 無 route title 而變得不準確，需同工調整。

## Performance and Render-Safety Notes

- 共享頁首的主要風險不是資料量，而是窄版排版穩定度；驗收目標是 header 無水平溢出、無重疊、無不可點擊 tab。
- 新 route 只顯示 placeholder，不應引入額外 bundle 或複雜互動。
- 放大 practice 表格字級後，要重新驗證：
  - cell 對齊
  - 換行控制
  - 初次載入不報錯
  - 既有 exam 流程不受影響

## Research Outputs Required

- 確認最簡單的 header 重構路徑是直接移除 `AppHeader` 呈現，而不是保留空節點。
- 確認 `RouteTabs` 的 `flex-wrap + nowrap per tab` 能同時滿足多列與按鈕內不斷行。
- 確認新 N5 route 應採獨立模組而非擴充既有 `/grammar`。
- 確認需回寫的來源 spec 清單與影響段落。

## Risks and Mitigations

### Risk 1: 共享頁首改動會波及所有主路由

- Mitigation：集中改 `AppShell` 與 `RouteTabs`，並用 AppShell smoke + e2e 導覽一起驗證四個 route。

### Risk 2: 表格字級放大造成 `/practice` 內容錯位

- Mitigation：只對指定表格套用 selector，必要時微調 line-height / padding，並在 375px 重新驗證；若 `1.1x` 造成破版，可做最小幅度下修，但不得回退成與現況無差異的尺寸。

### Risk 3: 新 `N5文法` route 被錯誤混入既有 grammar 內容語意

- Mitigation：採獨立 view 與獨立 test id，並在 ownership 測試中明確檢查 `/grammar` 不顯示 placeholder。

### Risk 4: 文件更新不完整造成來源 spec 與現況脫節

- Mitigation：把來源 spec 回寫列為同一工作項的必要輸出，不把它留到後續補文件。

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 無 | N/A | N/A |
