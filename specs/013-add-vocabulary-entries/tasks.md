# 任務清單：單字練習補充詞彙

**輸入**: 來自 `/specs/013-add-vocabulary-entries/` 的設計文件  
**前置文件**: `plan.md`、`spec.md`、`research.md`、`data-model.md`、`contracts/`、`quickstart.md`

**測試**: 本功能明確要求驗證字典覆蓋、避免重複新增、`/vocabulary` 預設 count、搜尋可達性、初始渲染安全、負向範圍與既有互動不回歸，因此包含單元、元件與 e2e 測試任務。

**組織方式**: 任務依使用者故事分組，讓每個故事都能獨立實作與驗證。

**憲章對齊**: 本任務列表已納入繁體中文文件要求、`.gitignore` 檢查、`/vocabulary` 路由冒煙測試、負向範圍驗證、僅追加資料更新、初始渲染安全保護與 `PROJECT_ARCHITECTURE.md` 免更新前提檢查。

## 階段 1：準備（共享基礎）

**目的**: 先確認儲存庫整潔要求與本功能的結構邊界，避免在實作小型資料補充時意外擴大變更範圍。

- [x] T001 檢查 `.gitignore` 是否仍涵蓋 `node_modules/`、`dist/`、`build/`、`coverage/` 於 `.gitignore`
- [x] T002 確認本功能不需變更儲存庫結構或 `PROJECT_ARCHITECTURE.md`，並對照 `PROJECT_ARCHITECTURE.md`、`specs/013-add-vocabulary-entries/plan.md` 鎖定實作範圍

---

## 階段 2：基礎前置（阻塞性前提）

**目的**: 建立資料、count 與路由邊界的共同基線，讓後續 3 個使用者故事都能在穩定前提下獨立驗證。

**關鍵要求**: 本階段完成前，不修改字典尾端資料。

- [x] T003 建立字典尾端追加、既有 `話す -> 說話` 覆蓋、既有尾端切片不漂移與 1076 筆基線對照於 `src/modules/vocabulary/data/jpWords.ts`、`tests/unit/vocabularyData.spec.ts`
- [x] T004 [P] 建立 `/vocabulary` 預設 count、初始渲染安全與互動冒煙基線於 `tests/component/VocabularyViewSmoke.spec.ts`
- [x] T005 [P] 建立 `/vocabulary` e2e count/search 與超出範圍路由邊界基線於 `tests/e2e/vocabulary-word-practice.spec.ts`、`tests/component/RouteOwnership.spec.ts`

**檢查點**: 字典現況、`/vocabulary` count 與範圍邊界都已有明確基線，可開始拆入使用者故事。

---

## 階段 3：使用者故事 1 - 補齊指定詞彙覆蓋（優先度：P1）🎯 MVP

**目標**: 讓使用者能在 `/vocabulary` 找到「皮膚」、「光滑」、「動作」對應的新詞條，並保留既有「說話」覆蓋。

**獨立驗證**: 打開 `/vocabulary`，確認預設 count 變為 `1079個單字`，且能用中文詞義搜尋到 `肌`、`滑らか`、`動き`。

### 使用者故事 1 的測試

- [x] T006 [P] [US1] 更新字典資料單元測試，驗證總筆數為 1079、最後 id 為 1079、`肌`、`滑らか`、`動き` 可被正規化，且最後 3 筆新增資料依序位於檔尾於 `tests/unit/vocabularyData.spec.ts`
- [x] T007 [P] [US1] 更新 `/vocabulary` 初次渲染冒煙測試，驗證預設 count summary 變為 `1079個單字` 於 `tests/component/VocabularyViewSmoke.spec.ts`
- [x] T008 [US1] 更新 `/vocabulary` e2e 搜尋驗證，確認可透過中文詞義找到 `肌`、`滑らか`、`動き` 於 `tests/e2e/vocabulary-word-practice.spec.ts`

### 使用者故事 1 的實作

- [x] T009 [US1] 在 `src/modules/vocabulary/data/jpWords.ts` 尾端依序追加 `はだ / 肌 / 皮膚`、`なめらか / 滑らか / 光滑`、`うごき / 動き / 動作`
- [x] T010 [US1] 檢查僅追加更新後 `normalizeVocabularyEntries()` 與 `groupVocabularyEntriesByStage()` 不需額外邏輯修正，必要時只做最小相容調整於 `src/modules/vocabulary/data/jpWords.ts`、`src/modules/vocabulary/utils/vocabularyFilters.ts`

**檢查點**: `/vocabulary` 已補齊缺少的 3 個指定詞義，且預設 count 與搜尋可獨立驗證。

---

## 階段 4：使用者故事 2 - 已有詞義不重複新增（優先度：P2）

**目標**: 讓既有 `話す -> 說話` 繼續作為唯一覆蓋來源，不因本次補詞而新增重複資料。

**獨立驗證**: 搜尋 `說話` 時仍由既有 `話す` 提供覆蓋，且資料檔只新增 3 筆新詞條，不多出第二筆「說話」。

### 使用者故事 2 的測試

- [x] T011 [P] [US2] 擴充字典資料單元測試，驗證 `話す -> 說話` 仍為唯一覆蓋、本次新增清單只包含 3 筆詞條，且既有尾端基線與 `話す` 資料不漂移於 `tests/unit/vocabularyData.spec.ts`
- [x] T012 [US2] 擴充 `/vocabulary` e2e 驗證，確認搜尋 `說話` 時命中既有 `話す` 而非本次新增重複列於 `tests/e2e/vocabulary-word-practice.spec.ts`

### 使用者故事 2 的實作

- [x] T013 [US2] 審核並調整 `src/modules/vocabulary/data/jpWords.ts`，確保本次只沿用既有 `話す` 覆蓋而不新增第二筆「說話」詞條

**檢查點**: 指定詞義補齊與去重規則已同時成立，不會因補詞導致「說話」重複。

---

## 階段 5：使用者故事 3 - 維持既有單字練習體驗（優先度：P3）

**目標**: 在 1079 筆資料下保留既有 `/vocabulary` 的 count、搜尋、標記、長按揭露與路由範圍行為。

**獨立驗證**: 預設進入 `/vocabulary`、切換 marked-only、長按揭露內容、再到 `/practice`、`/grammar`、`/n5-grammar` 檢查負向範圍，確認都不回歸。

### 使用者故事 3 的測試

- [x] T014 [P] [US3] 更新 `/vocabulary` 元件冒煙測試，驗證 1079 筆資料下的註記、marked-only 與長按揭露仍可用於 `tests/component/VocabularyViewSmoke.spec.ts`
- [x] T015 [P] [US3] 更新路由範圍驗證，確認本功能仍只出現在 `/vocabulary` 而不污染 `/practice`、`/grammar`、`/n5-grammar` 於 `tests/component/RouteOwnership.spec.ts`

### 使用者故事 3 的實作

- [x] T016 [US3] 以既有欄位格式與 stage 命名維持 `/vocabulary` 體驗一致，必要時只微調 `src/modules/vocabulary/data/jpWords.ts` 的 stage 佈局，不修改 `src/modules/vocabulary/views/VocabularyView.vue` 的互動介面
- [x] T017 [US3] 對照 `specs/013-add-vocabulary-entries/quickstart.md` 的手動驗收步驟，校正 `tests/e2e/vocabulary-word-practice.spec.ts` 的 count/search 斷言與實際體驗一致

**檢查點**: 新增詞條已接入既有 `/vocabulary` 管線，使用者體驗與負向邊界都維持穩定。

---

## 階段 6：收尾與橫向關注事項

**目的**: 執行最終驗證、確認文件與實作一致，並收斂本功能的交付證據。

- [x] T018 [P] 執行 `npm run lint` 驗證 `src/modules/vocabulary/data/jpWords.ts`、`tests/unit/vocabularyData.spec.ts`、`tests/component/VocabularyViewSmoke.spec.ts`、`tests/e2e/vocabulary-word-practice.spec.ts`
- [x] T019 [P] 執行 `npm run typecheck` 驗證 `src/modules/vocabulary/data/jpWords.ts`、`src/modules/vocabulary/utils/vocabularyFilters.ts`、`src/modules/vocabulary/views/VocabularyView.vue`
- [x] T020 [P] 執行 `npx vitest run tests/unit/vocabularyData.spec.ts tests/component/VocabularyViewSmoke.spec.ts tests/component/RouteOwnership.spec.ts`
- [x] T021 [P] 執行 `npm run build` 驗證 `src/modules/vocabulary/data/jpWords.ts` 與既有 `/vocabulary` 路由組裝
- [x] T022 [P] 執行 `npx playwright test tests/e2e/vocabulary-word-practice.spec.ts`
- [x] T023 驗證 `specs/013-add-vocabulary-entries/quickstart.md` 的手動流程與實作一致，並只在實際行為不同時回寫 `specs/013-add-vocabulary-entries/spec.md`、`specs/013-add-vocabulary-entries/quickstart.md`、`specs/013-add-vocabulary-entries/contracts/vocabulary-entry-coverage-contract.md`

---

## 相依關係與執行順序

### 階段相依關係

- **階段 1：準備** 可立即開始。
- **階段 2：基礎前置** 依賴階段 1，且會阻擋所有使用者故事。
- **階段 3：US1** 依賴階段 2，為 MVP。
- **階段 4：US2** 依賴 US1 的字典更新完成。
- **階段 5：US3** 依賴 US1 與 US2 的資料與去重結果穩定。
- **階段 6：收尾** 依賴所有目標使用者故事完成。

### 使用者故事相依關係

- **US1**: 只依賴基礎前置，可先獨立完成並驗證指定詞義覆蓋。
- **US2**: 依賴 US1 的新增詞條落地，但可獨立驗證「說話」不重複新增。
- **US3**: 依賴 US1/US2 的資料結果，獨立驗證 `/vocabulary` 體驗與範圍邊界不回歸。

### 每個使用者故事內部順序

- 先更新對應測試並確認目前會失敗，再進入資料實作。
- 先修改 `src/modules/vocabulary/data/jpWords.ts`，再決定 `vocabularyFilters.ts` 是否需要最小相容修正。
- 先鎖定 data/unit 基線，再同步更新 component/e2e 的 count 與搜尋驗證。

### 可平行處理機會

- T004 與 T005 可平行。
- T006 與 T007 可平行。
- T014 與 T015 可平行。
- T018、T019、T020、T021、T022 可在實作完成後平行驗證。

---

## 平行處理範例：使用者故事 1

```bash
# 先並行更新資料與冒煙基線
Task: "更新字典資料單元測試，驗證總筆數為 1079、最後 id 為 1079，且 肌、滑らか、動き 可被正規化於 tests/unit/vocabularyData.spec.ts"
Task: "更新 /vocabulary 初次渲染冒煙測試，驗證預設 count summary 變為 1079個單字 於 tests/component/VocabularyViewSmoke.spec.ts"

# 再實作字典尾端追加
Task: "在 src/modules/vocabulary/data/jpWords.ts 尾端依序追加 はだ / 肌 / 皮膚、なめらか / 滑らか / 光滑、うごき / 動き / 動作"
```

---

## 實作策略

### 先做 MVP（僅使用者故事 1）

1. 完成準備與基礎前置。
2. 完成 US1 的 3 筆詞條追加與 count baseline 更新。
3. 先驗證 `/vocabulary` 預設 count 與搜尋可達性。
4. 若通過，再往下補去重與體驗穩定性驗證。

### 遞增交付

1. US1 先補齊 `肌`、`滑らか`、`動き`。
2. US2 再鎖定「說話」沿用 `話す`、不得重複新增。
3. US3 最後確認 `/vocabulary` 體驗、count、marked-only、長按與負向範圍全部維持穩定。

### 備註

- `[P]` 僅表示不同檔案或純驗證命令、可平行處理。
- 本功能以僅追加資料更新為主，不應擴大成 UI 重構或共享抽象調整。
- 若實作中發現 stage、romanization 或驗收文字需修正，必須同步回寫本功能的 `spec.md`、`quickstart.md` 與 contract，而不是只留在 code diff。
