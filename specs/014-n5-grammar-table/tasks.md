# 任務清單：N5 文法敬體變化區塊重整

**輸入**: 來自 `/specs/014-n5-grammar-table/` 的設計文件  
**前置文件**: `plan.md`、`spec.md`、`research.md`、`data-model.md`、`contracts/`、`quickstart.md`

**測試**: 本功能明確要求驗證 `/n5-grammar` 前兩個區塊的排序、標題、儲存格例句覆蓋、預設收合、手機版可讀性、初始渲染安全與負向 ownership，因此包含單元、元件與 e2e 測試任務。

**組織方式**: 任務依使用者故事分組，讓每個故事都能獨立實作與驗證。

**憲章對齊**: 本任務列表已納入繁體中文文件要求、`.gitignore` 檢查、`/n5-grammar` 冒煙測試、負向範圍驗證、render-safe 初始狀態、預設收合互動維持、來源規格回寫與 `PROJECT_ARCHITECTURE.md` 同步檢查。

## 階段 1：準備（共享基礎）

**目的**: 先確認儲存庫整潔要求與本功能的檔案／命名邊界，避免在實作時意外擴大為 route 或架構重構。

- [X] T001 檢查 `.gitignore` 是否仍涵蓋 `node_modules/`、`dist/`、`build/`、`coverage/`，並對照 `PROJECT_ARCHITECTURE.md`、`specs/012-n5-grammar-route/spec.md`、`specs/014-n5-grammar-table/plan.md` 確認本功能的來源規格與架構文件同步策略
- [X] T002 鎖定 `polite-overview`、`sentence-basics`、`n5-grammar-table-example-{group-id}` 的命名與負向範圍契約，對照 `specs/014-n5-grammar-table/spec.md`、`specs/014-n5-grammar-table/contracts/n5-grammar-polite-overview-contract.md`、`src/modules/n5Grammar/data/grammarNotes.ts`

---

## 階段 2：基礎前置（阻塞性前提）

**目的**: 建立 compare-table 儲存格例句資料模型與 render-safe 基線，讓後續 3 個使用者故事可以在穩定前提下獨立實作。

**關鍵要求**: 本階段完成前，不重排 `/n5-grammar` 既有 section 資料。

- [X] T003 擴充 `src/modules/n5Grammar/types/grammarNotes.ts`，新增 `N5GrammarTableExampleGroup` 與 `N5GrammarSection.tableExampleGroups`
- [X] T004 [P] 調整 `tests/unit/n5GrammarData.spec.ts` 的基礎資料契約，允許 compare-table section 以 `tableExampleGroups` 作為主要內容，並建立前兩個 section 排序與唯一性基線
- [X] T005 [P] 在 `src/modules/n5Grammar/components/N5GrammarCompareTable.vue` 預留 `tableExampleGroups` 的 render-safe 讀取骨架，確保 `topics` 為空時仍不會造成初始渲染錯誤

**檢查點**: compare-table 新資料型別與 renderer 骨架已就位，可開始拆入各使用者故事的內容。

---

## 階段 3：使用者故事 1 - 首屏先看敬體變化總覽（優先度：P1）🎯 MVP

**目標**: 讓 `/n5-grammar` 第一個區塊變成 `敬體變化速覽`，展開後能看到 compare table 與每個儲存格對應的一組例句。

**獨立驗證**: 開啟 `/n5-grammar`，確認第一個區塊標題是 `敬體變化速覽`；展開後能看到 compare table 與 12 組儲存格例句，且例句不與既有句子完全重複。

### 使用者故事 1 的測試

- [X] T006 [P] [US1] 更新 `tests/unit/n5GrammarData.spec.ts`，驗證 `polite-overview` 排在第一個、`tableExampleGroups` 覆蓋 12 個儲存格，且 overview 新例句具備日文／讀音／翻譯、`origin: supplemental`，並且不與既有 N5 文法例句完全重複
- [X] T007 [P] [US1] 更新 `tests/component/N5GrammarSections.spec.ts`，驗證 `n5-grammar-section-polite-overview` 預設收合，展開後顯示 compare table 與 `n5-grammar-table-example-{group-id}`
- [X] T008 [P] [US1] 更新 `tests/e2e/n5-grammar-layout.spec.ts`，驗證 375px 下展開 `n5-grammar-toggle-polite-overview` 與 `sentence-basics` 後可見 compare table、例句群組、原教學內容，且無水平溢出與 console error / page error

### 使用者故事 1 的實作

- [X] T009 [US1] 在 `src/modules/n5Grammar/data/grammarNotes.ts` 新增 `polite-overview` section，保留原敬體比較表並補齊 12 組 `tableExampleGroups`
- [X] T010 [US1] 擴充 `src/modules/n5Grammar/components/N5GrammarCompareTable.vue`，渲染 overview 的 `forms`、例句卡片、補充註記與 `n5-grammar-table-example-{group-id}` test id
- [X] T011 [US1] 在 `src/styles/main.css` 新增 `/n5-grammar` 專用的 table example group 樣式，確保 `polite-overview` 在桌機與 375px 寬度都可讀

**檢查點**: `敬體變化速覽` 已成為第一個區塊，且可獨立完成表格總覽與儲存格例句閱讀。

---

## 階段 4：使用者故事 2 - 保留原教學內容並重新命名（優先度：P2）

**目標**: 讓原 `sentence-basics` 在移出 compare table 後，保留既有 3 組教學主題與提醒，並改名為 `敬體句型：現在型與詞類基礎`。

**獨立驗證**: 展開第二個區塊，確認標題已更新、compare table 已移除，但原本 3 組教學 topic、例句與 shared notes 仍存在。

### 使用者故事 2 的測試

- [X] T012 [P] [US2] 更新 `tests/unit/n5GrammarData.spec.ts`，驗證 `sentence-basics` 改為 `info-stack`、已無 `table`、仍保留 `noun-na-basics`、`i-adjective-basics`、`masu-verb-basics`
- [X] T013 [P] [US2] 更新 `tests/component/N5GrammarViewSmoke.spec.ts` 與 `tests/component/N5GrammarSections.spec.ts`，驗證第二個區塊標題改為 `敬體句型：現在型與詞類基礎`、第三個核心區塊標題改為 `敬體句型：過去、狀態與補充表現`，展開後不再出現第二份 compare table

### 使用者故事 2 的實作

- [X] T014 [US2] 在 `src/modules/n5Grammar/data/grammarNotes.ts` 將 `sentence-basics` 改名為 `敬體句型：現在型與詞類基礎`、`order` 改為 `2`、`presentationMode` 改為 `info-stack` 並移除 `table`，並同步調整 `past-and-state` 標題為 `敬體句型：過去、狀態與補充表現`
- [X] T015 [US2] 在 `src/modules/n5Grammar/data/grammarNotes.ts` 校正 `sentence-basics` 的 `sharedNotes`、`topics` 與 `n5GrammarSourceCoverage` 對應，確保原 chapter 1 教學內容與來源映射保留不變

**檢查點**: 第二個區塊已聚焦在既有教學內容本身，不再重複顯示敬體比較表。

---

## 階段 5：使用者故事 3 - 維持頁面穩定與範圍隔離（優先度：P3）

**目標**: 在完成前兩個區塊重整後，仍維持 `/n5-grammar` 的初始收合、手機版可讀性、AppShell 進站穩定與其他 route 的負向 ownership。

**獨立驗證**: 直接進入 `/n5-grammar` 或透過主導覽切換過去，都能看到新的前兩個區塊標題；切換到 `/practice`、`/grammar`、`/vocabulary` 時不會出現本功能的新內容。

### 使用者故事 3 的測試

- [X] T016 [P] [US3] 更新 `tests/component/RouteOwnership.spec.ts` 與 `tests/component/AppShellSmoke.spec.ts`，驗證 `敬體變化速覽` / `敬體句型：現在型與詞類基礎` / `敬體句型：過去、狀態與補充表現` 只出現在 `/n5-grammar`
- [X] T017 [P] [US3] 更新 `tests/e2e/app-shell.smoke.spec.ts`，驗證從首頁切換或直接開啟 `/n5-grammar` 時都可看到新標題，且其他 route 內容不受污染

### 使用者故事 3 的實作

- [X] T018 [US3] 檢查並在必要時最小調整 `src/styles/main.css` 與 `src/modules/n5Grammar/components/N5GrammarSectionCard.vue`，維持新第一區塊預設收合、375px 可讀與初始 render-safe

**檢查點**: `/n5-grammar` 新內容穩定接入既有頁面殼層，且不外溢到其他 route。

---

## 階段 6：收尾與橫向關注事項

**目的**: 執行最終驗證、確認規格與實作一致，並收斂本功能交付證據。

- [X] T019 [P] 執行 `npm run lint` 驗證 `src/modules/n5Grammar/types/grammarNotes.ts`、`src/modules/n5Grammar/data/grammarNotes.ts`、`src/modules/n5Grammar/components/N5GrammarCompareTable.vue`、`src/styles/main.css`
- [X] T020 [P] 執行 `npm run typecheck` 驗證 `src/modules/n5Grammar/types/grammarNotes.ts`、`src/modules/n5Grammar/data/grammarNotes.ts`、`src/modules/n5Grammar/views/N5GrammarView.vue`
- [X] T021 [P] 執行 `npx vitest run tests/unit/n5GrammarData.spec.ts tests/component/N5GrammarSections.spec.ts tests/component/N5GrammarViewSmoke.spec.ts tests/component/AppShellSmoke.spec.ts tests/component/RouteOwnership.spec.ts`
- [X] T022 [P] 執行 `npm run build` 驗證 `src/modules/n5Grammar/` 與 `/n5-grammar` 路由整合
- [X] T023 [P] 執行 `npx playwright test tests/e2e/app-shell.smoke.spec.ts tests/e2e/n5-grammar-layout.spec.ts`
- [X] T024 驗證 `specs/012-n5-grammar-route/spec.md`、`specs/014-n5-grammar-table/spec.md`、`specs/014-n5-grammar-table/plan.md`、`specs/014-n5-grammar-table/data-model.md`、`specs/014-n5-grammar-table/quickstart.md`、`specs/014-n5-grammar-table/contracts/n5-grammar-polite-overview-contract.md` 與最終行為一致，並同步更新 `PROJECT_ARCHITECTURE.md`

---

## 相依關係與執行順序

### 階段相依關係

- **階段 1：準備** 可立即開始。
- **階段 2：基礎前置** 依賴階段 1，且會阻擋所有使用者故事。
- **階段 3：US1** 依賴階段 2，為 MVP。
- **階段 4：US2** 依賴 US1 的 overview section 與新資料模型已落地。
- **階段 5：US3** 依賴 US1 與 US2 的內容重整穩定後，才能驗證 route 邊界與 shell 行為。
- **階段 6：收尾** 依賴所有目標使用者故事完成。

### 使用者故事相依關係

- **US1**: 只依賴基礎前置，可先獨立完成並驗證新的總覽區塊。
- **US2**: 依賴 US1 的 `polite-overview` 已接管 compare table，才能安全把 `sentence-basics` 轉成純教學區塊。
- **US3**: 依賴 US1/US2 的資料與標題穩定，獨立驗證 `/n5-grammar` 首屏與其他 route 的範圍邊界。

### 每個使用者故事內部順序

- 先更新對應測試並確認目前會失敗，再進入資料與 renderer 實作。
- 先修改型別與資料，再讓 renderer 消費新欄位。
- 先穩定 `/n5-grammar` 本身，再同步更新 AppShell 與 route ownership 斷言。

### 可平行處理機會

- T004 與 T005 可平行。
- T006、T007、T008 可平行。
- T012 與 T013 可平行。
- T016 與 T017 可平行。
- T019、T020、T021、T022、T023 可在實作完成後平行驗證。

---

## 平行處理範例：使用者故事 1

```bash
# 先並行更新 overview 的驗證基線
Task: "更新 tests/unit/n5GrammarData.spec.ts，驗證 polite-overview 排第一、12 組 tableExampleGroups 與 overview 例句不重複"
Task: "更新 tests/component/N5GrammarSections.spec.ts，驗證 polite-overview 預設收合與展開後例句群組可見"
Task: "更新 tests/e2e/n5-grammar-layout.spec.ts，驗證 375px 下 polite-overview 的 table 與例句群組可見"

# 再落地 overview 資料與 renderer
Task: "在 src/modules/n5Grammar/data/grammarNotes.ts 新增 polite-overview section 與 12 組 tableExampleGroups"
Task: "在 src/modules/n5Grammar/components/N5GrammarCompareTable.vue 渲染 table example groups"
```

---

## 實作策略

### 先做 MVP（僅使用者故事 1）

1. 完成準備與基礎前置。
2. 完成 US1 的 overview section、12 組儲存格例句與 compare-table renderer。
3. 先驗證 `/n5-grammar` 第一個區塊的標題、展開內容與手機版可讀性。
4. 若通過，再往下處理第二區塊重命名與 route 邊界驗證。

### 遞增交付

1. US1 先交付 `敬體變化速覽`。
2. US2 再將原 `sentence-basics` 收斂為 `敬體句型：現在型與詞類基礎`，並同步明確化第三個核心區塊的敬體句型定位。
3. US3 最後確認 AppShell、route ownership、375px 版面與負向範圍全部維持穩定。

### 備註

- `[P]` 僅表示不同檔案或純驗證命令、可平行處理。
- 本功能以既有 `n5Grammar` 資料驅動結構的最小擴充為主，不應擴大成新 route、新 presentation mode 或共享抽象重構。
- 若實作中發現命名、test id、例句覆蓋規則或手機版驗收文字需要修正，必須同步回寫本功能的 `spec.md`、`plan.md`、`data-model.md`、`quickstart.md` 與 contract，而不是只留在 code diff。
