# Implementation Plan: `/practice` 羅馬音排版補強與首屏穩定化

**Branch**: `004-romaji-layout-stability` | **Date**: 2026-03-28 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/004-romaji-layout-stability/spec.md`

## Summary

本次實作聚焦在 `/practice` 路由既有練習參考區塊的第二輪整理：把長音規則改成單一大表格、補齊拗音與外來語的全表羅馬音、把外來語擴張整理為可推導的矩陣，並修正首次開啟頁面時濁音／半濁音以下區塊的延遲出現問題。技術上延續現有 Vue 3 + TypeScript + Vite + Tailwind + PWA 架構，採用更細的結構化靜態資料模型與 `/practice` 專屬樣式邊界，再用 component smoke test 與 375px e2e 驗證守住 render-safe、ownership 與小螢幕可讀性。

## Technical Context

**Language/Version**: TypeScript 5.x、Vue 3 SFC  
**Primary Dependencies**: Vue 3、Vue Router 4、Vite 7、Tailwind CSS 3、Vitest、Vue Test Utils、Playwright、Font Awesome、vite-plugin-pwa  
**Storage**: 現有 localStorage 僅延續既有練習/錯題資料；本 feature 新增的教學內容為靜態前端資料，不新增持久化 key  
**Testing**: Vitest component smoke tests、route ownership tests、Playwright 375px smoke tests、既有 lint/typecheck/build 驗證  
**Target Platform**: 行動與桌面瀏覽器上的前端 PWA，主要驗收尺寸為 375px，次要驗收尺寸為 768px 與 1024px  
**Project Type**: 單一前端 Web Application / PWA  
**Performance Goals**: `/practice` 初始渲染需一次穩定顯示濁音／半濁音以下的本期區塊；375px 下不得依靠水平捲動解決版面問題  
**Constraints**: 使用 Composition API；不得使用 `any`；避免新增第三方套件；保持 `/practice` 專屬版型不被共享抽象覆蓋；不可讀取受限制的 `_private/_private_fileAssets/v1`，僅能把其路徑視為使用者提供的設計/PWA 資產約束  
**Scale/Scope**: 1 個既有 route、4 個主要參考區塊、1 組共用頁首/route tab 響應式修正、數個 component test 與 1 個 375px smoke test

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- 規格、計畫、任務與 quickstart 文件全部以繁體中文撰寫；Constitution 維持英文。
- Repository 已有 `.gitignore`；本期不得提交 `node_modules/`、`dist/`、`coverage/` 等可重建產物。
- 本期可能變動 `/practice` 模組資料結構、route-level 樣式邊界與測試結構，因此必須更新 `PROJECT_ARCHITECTURE.md`。
- 需先定義測試策略，再開始實作。最少要有：
  - `/practice` route 的 default render smoke test
  - 長音規則、拗音/合拗音、外來語矩陣的 component tests
  - 375px viewport 的 smoke / e2e 驗證
- 正向 ownership：本 feature 只屬於 `PracticeView`、`ChoonRuleSection`、`SeionYoonSection`、`DakuonYoonSection`、`LoanwordSection`、`AppShell`、`RouteTabs` 的特定版面責任。
- 反向 ownership：`/grammar`、`/vocabulary`、`ExamModal`、`UnknownResultPanel`、PWA toast 不得出現本 feature 的內容或版面回歸。
- `/practice` 的 route-specific 排版規則優先於共享樣式；不可因抽象共用而犧牲長音表格、矩陣標頭或 375px 限制。
- 首屏穩定渲染與 375px 無橫向捲動屬效能與 UX 預算，若有回歸即視為 defect。
- 本期不需要引入新的通用表格框架；若出現複雜抽象，必須能明確證明比維持專屬元件更簡單。

## Architecture Decisions

### 1. 靜態教學資料升級為可表達列角色的結構化型別

- 延續 `src/modules/practice/data/specialSyllableData.ts` 作為單一資料入口，但從字串陣列升級為具辨識欄位的 discriminated union / 結構化列資料。
- `practice.ts` 新增長音規則列、拗音格、外來語矩陣列等型別，避免把「規則列」與「例字列」混成同一種 `string[]`。
- 資料仍留在 TypeScript 模組，不拆成 JSON，避免額外載入流程與型別映射。

### 2. 長音規則與外來語矩陣維持專屬元件，不做過度共用

- `ChoonRuleSection.vue` 使用單一表格，支援「規則整列」與「例字三段資訊列」兩種語意。
- `LoanwordSection.vue` 使用矩陣式表格，第一列/第一欄為標頭，其餘格位顯示組合結果。
- 外來語矩陣可參考目前清音拗音區塊的表格閱讀節奏，但不與其共用過度抽象的萬用表格元件，避免 reusable-style boundary 失守。

### 3. 首屏穩定渲染以同步資料與穩定初始 markup 解決

- `PracticeView.vue` 應保持濁音／半濁音以下區塊在初始 render 時就同步掛載，不依賴延後插入或額外等待才出現。
- 若目前延遲來自條件渲染、切版重排或資料初始化順序，修正策略優先是讓靜態區塊於首屏擁有穩定 DOM 結構，而不是加入 loading UI。
- 使用 route-level smoke test 與 375px e2e 觀察首屏是否仍有空白斷層或延後出現的視覺回歸。

### 4. 375px 密度策略採「先縮 padding、再縮字級」

- `main.css` 中補上 `/practice` 與頁首所需的 route-specific utility / component classes。
- 表格與頁首在 375px 下不允許 `overflow-x-auto` 作為主要解法。
- 當表格密度不足時，先減少 `td` / 按鈕群 / header 內距，再視需要縮小字級；假名維持不換行。

### 5. 測試以 route smoke + component coverage + ownership 組合驗證

- `PracticeViewSmoke.spec.ts` 驗證 `/practice` 初始顯示安全、下半部區塊在首屏存在、無 placeholder/render-safe 問題。
- 新增或擴充 `ChoonRuleSection.spec.ts`、`YoonSections.spec.ts`、`LoanwordSection.spec.ts` 驗證資料語意與排版 DOM。
- `RouteOwnership.spec.ts` 持續驗證本 feature 只出現在 `/practice`，而不影響其他 route 或高風險互動元件。
- Playwright 以 `practice-layout.smoke.spec.ts` 驗證 375px 下的頁首、長音、拗音、外來語矩陣與首屏穩定顯示。

## Project Structure

### Documentation (this feature)

```text
specs/004-romaji-layout-stability/
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
│       │   ├── DakuonYoonSection.vue
│       │   ├── LoanwordSection.vue
│       │   ├── SeionYoonSection.vue
│       │   └── PracticeToolbar.vue
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
│   ├── ChoonRuleSection.spec.ts
│   ├── LoanwordSection.spec.ts
│   ├── PracticeViewSmoke.spec.ts
│   ├── RouteOwnership.spec.ts
│   ├── YoonSections.spec.ts
│   └── testUtils.ts
└── e2e/
    ├── app-shell.smoke.spec.ts
    └── practice-layout.smoke.spec.ts
```

**Structure Decision**: 維持單一前端專案結構，不新增新模組層；所有資料與元件調整仍收斂在 `practice` 模組，頁首響應式修正留在 `AppShell` 與 `RouteTabs`。

**Architecture Document Impact**: 需要更新 `PROJECT_ARCHITECTURE.md`，反映 `practice.ts` 的新型別職責、`specialSyllableData.ts` 的結構化教學資料角色、`YoonSections.spec.ts` 與 `practice-layout.smoke.spec.ts` 的新測試責任，以及 `/practice` route-specific layout 邊界。

## UI / State / Storage Strategy

### UI Strategy

- 最外層容器維持 `py-3 px-2` 的 12px / 8px 節奏，對齊專案既有規劃。
- `AppShell` header 與 `RouteTabs` 在 375px 下保持單列可辨識，不允許標題與路由按鈕群破版。
- 長音規則區塊改為單一大表格：
  - 規則說明列獨占整列
  - 例字列以固定順序呈現假名、羅馬音、中文意思
  - 不另加「假名 / 羅馬音 / 中文」欄位標題文字
- 清音拗音與合拗音沿用矩陣表格，但每一格與列標頭都補齊羅馬音。
- 外來語擴張改為母音 x 基底音矩陣，內容格採上下堆疊，假名置上且不可換行。

### State Strategy

- 本 feature 不新增全域 store。
- 教學資料在模組初始化時即備妥，避免首屏下半部區塊依賴額外非同步動作。
- 不變更 `usePracticeSession` 與 `createExamSession` 的互動邏輯，僅確保 `/practice` 靜態參考區塊的渲染穩定。

### Storage Strategy

- 不新增 localStorage key。
- 新增的教學內容資料維持為靜態 TypeScript 常數，天然可隨既有 PWA 預載一併離線使用。
- 若為首屏穩定渲染加入任何判斷，應維持在元件本地與同步計算範圍，不應引入新的持久化狀態。

## PWA Implementation Considerations

- 本 feature 的新增資料為靜態模組內容，只要既有 build 與 precache 流程正常，即可離線顯示。
- 使用者在 `plan.txt` 指定的 `_private/_private_fileAssets/v1/public/icons` 與 `vite.ico` 屬 PWA 資產參考來源，但因檔案存取限制，本輪只把它們記為約束，不主動開啟或替換。
- 不調整 manifest、icon pipeline 或 service worker 策略，除非在實作中發現與首屏穩定顯示直接衝突的缺陷。
- Quickstart 需保留離線重開 `/practice` 的手動驗證步驟，確認新增靜態資料在 PWA 模式下可用。

## Code Standards

- 僅使用 Vue 3 Composition API，不使用 Options API。
- 禁止 `any`、`var` 與不必要的第三方套件。
- 所有新型別集中在 `src/modules/practice/types/practice.ts`，所有靜態教學資料集中在 `src/modules/practice/data/specialSyllableData.ts`。
- 元件檔名使用 PascalCase，模組檔使用 camelCase，延續現有命名規則。
- `/practice` 專屬版型以 `main.css` 中的 component class 或局部 class name 表達，不把明確規格退回成模糊的共用樣式。
- 變更必須通過 `npm run lint`、`npm run typecheck`、`npm run build`，以及本 feature 的 unit/e2e 測試。

## Risks and Implementation Notes

### Risk 1: 首屏延遲問題來源不一定只有 lazy render

- 目前程式碼中看不出明確 lazy import，延遲感可能來自版面重排、條件渲染或初始資料與樣式的交互影響。
- 實作時要先用 smoke/e2e 明確重現，再收斂到最小修正，避免在無根因證據下做過度改寫。

### Risk 2: 長音規則「不加欄位標題」容易降低可讀性

- 規格明確要求不額外加入欄位標題文字，因此需透過欄寬、字級、列樣式與資訊順序保持可理解性。
- 測試應驗證 DOM 與可視資訊順序，而不是依賴欄位標題字樣。

### Risk 3: 外來語矩陣若過度求完整，375px 會很擠

- 第一欄要求「盡可能詳細」，但仍需受限於 375px 可讀性。
- 計畫上採「先完整整理資料，再用 padding/font-density 控制」；若有極少數不可用組合，應以一致空缺表達，而非任意刪欄。

### Risk 4: 共享樣式可能再次覆蓋 `/practice` 專屬排版

- `table-shell`、`fixed-grid-table` 與頁首共用 class 目前已被多個區塊使用。
- 實作時要確認 route-specific class 不會回頭影響 `/grammar`、`/vocabulary` 或其他 modal/surface。

### Risk 5: 受限制資產路徑不可直接驗證

- `plan.txt` 中的 PWA 圖示路徑屬使用者提供的規劃約束，但該位置在本回合不可讀。
- 本 feature 若不必實際更動 PWA 資產，就不要把該限制升高成阻塞；若真的需要變更，必須先停下來重新確認。

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 無 | 無 | 無 |
