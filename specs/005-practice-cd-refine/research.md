# Research: 練習頁與部署流程調整

## Decision 1: 最近結果清除維持單一資料清除邏輯，回頂只加在結果區入口

- **Decision**: 保留 `PracticeToolbar` 與 `UnknownResultPanel` 共用同一個最近結果清除來源，並由 `PracticeView` 針對下方結果區按鈕加入清除後平滑回頂。
- **Rationale**: 需求差異只在互動後續行為，不在資料清除本身。維持單一清除邏輯可避免資料狀態分岔，也能降低既有測試與 storage 行為被改壞的風險。
- **Alternatives considered**:
  - 在 `createExamSession` 內加入「清除且回頂」專用 API：會把 UI 特定行為混進 composable，增加耦合。
  - 將上方與下方按鈕拆成不同資料清除流程：容易造成兩者日後行為不一致。

## Decision 2: `tableA` / `tableB` 只從元件視圖移除，不調整資料模型命名

- **Decision**: 只修改 `SeionTable.vue` 與 `DakuonTable.vue` 的表頭輸出，保留 `tableA` / `tableB` 在資料與型別中的內部識別用途。
- **Rationale**: 需求要求移除的是畫面上的多餘文字，不是整個資料分組概念。保留內部 key 可減少 `usePracticeSession`、測驗題目來源與型別定義的連動風險。
- **Alternatives considered**:
  - 全面把資料 key 改成語意化名稱：牽涉範圍過大，與需求價值不成比例。
  - 以 CSS 隱藏文字：會留下無效 DOM 與可讀性歧義，不如直接移除模板輸出。

## Decision 3: 題目放大需要連帶調整 modal 內容節奏，而不是只改單一字級

- **Decision**: 調整 `ExamModal.vue` 的題目列字級、內容區 padding/gap 與卡片尺寸上限，讓放大後仍保留答案、提示與操作按鈕的穩定版面。
- **Rationale**: 題目列位於彈窗中央且是主辨識點，放大後最容易侵蝕其餘內容空間。同步調整容器節奏可在 375px 下維持完整可視。
- **Alternatives considered**:
  - 只把題目字級加大：高機率造成小螢幕裁切或擠壓提示/按鈕區。
  - 改成自動縮放字體：行為較難預測，也不利測試穩定驗收。

## Decision 4: 部署改為 workflow 直管 `gh-pages` 內容，移除 repo-local `publishPages.mjs`

- **Decision**: 保留 `gh-pages` 作為 Pages 承載分支，但將部署與清理邏輯搬到 `.github/workflows/cd.yml`，使用官方 `actions/checkout` 與 workflow 原生 git/shell 步驟完成 root 與 `staging/` 更新。
- **Rationale**: 同一站點需同時保留 production root 與 `staging/` 子目錄時，直接維護 `gh-pages` 內容最符合目前專案需求。把流程寫回 workflow 可移除額外腳本、降低理解成本，並且明確控制清理範圍來解決殘留內容問題。
- **Alternatives considered**:
  - 繼續使用 `scripts/publishPages.mjs`：功能可用，但維護入口分散，且使用者已明確要求移除。
  - 改用單純 artifact-based `deploy-pages` 覆蓋整站：不利於同時保留 production 與 `staging/` 子目錄內容。

## Decision 5: 驗證策略以既有 smoke test 為骨架擴充，不新增全新測試分層

- **Decision**: 擴充既有 `PracticeViewSmoke.spec.ts`、`ExamModal.spec.ts`、`practice-exam-flow.spec.ts` 與必要的 layout smoke 測試，補足結果清除、標示移除與 modal 可讀性驗證。
- **Rationale**: 現有測試 already 覆蓋主要互動節點，擴充它們最能快速證明回歸安全，且符合最小可維護改動。
- **Alternatives considered**:
  - 另起一套新測試檔專門驗證所有視覺調整：訊號重複、維護成本較高。
  - 只靠手動驗證：無法滿足 constitution 的 test-first / smoke coverage 要求。
