# Specification Analysis Report — 015-n5-grammar-notes

**Feature**: N5 文法新增助詞「と」「で」
**Analyzed artifacts**: spec.md、plan.md、tasks.md
**Reference input**: `_private/_private_notes/v14/tasks.txt`
**Constitution version**: 1.5.1
**Date**: 2026-04-10

---

## Findings Table

| ID | Category | Severity | Location | Summary | Recommendation |
|----|----------|----------|----------|---------|----------------|
| B1 | Ambiguity | HIGH | spec.md FR-004 | 「說明文字必須清晰、無歧義」缺乏可量測標準，無法客觀驗收 | 補充具體判斷準則，例如「每個 topic summary ≤ 2 句；details ≥ 2 條」 |
| E1 | Coverage Gap | MEDIUM | spec.md FR-007 / tasks.md | FR-007（術語統一採用 grammar 頁面表記）無對應驗收任務 | 在 T011 或 T023 補充：確認 particle-to/de 所用術語（助詞、体言等）與 `src/modules/grammar` 頁面一致 |
| C1 | Underspecification | MEDIUM | spec.md FR-012 / plan.md | FR-012 要求在規格或計畫文件中說明 presentationMode 選擇理由，但 plan.md 未有明確理由文字 | 在 plan.md 補充：選擇 `'info-stack'` 的理由（如：助詞說明需 summary + details 層次結構，info-stack 最適合呈現） |
| C2 | Underspecification | MEDIUM | spec.md SC-004 / tasks.md T035 | e2e smoke test（T035）未明確要求在 375px viewport 下執行，無法驗證 SC-004（行動裝置折疊按鈕） | 在 T035 補充：「設定 Playwright viewport 375×667 執行 toggle 點擊測試」 |
| B2 | Ambiguity | MEDIUM | spec.md SC-004 | 「375px 折疊按鈕正常操作」缺乏具體量測語意（是否含「不超出邊界」「不被遮蓋」等） | 明確說明驗收條件：按鈕完整可見、可點擊、展開後無版面破版 |
| F1 | Inconsistency | LOW | plan.md §Project Structure | plan.md 顯示 `tasks.md ⬜ 尚未建立`，但 tasks.md 已完整存在 | 將 plan.md 中 tasks.md 狀態更新為 ✅ |
| F2 | Inconsistency | LOW | spec.md FR-002/SC-003 vs tasks.md T009/T018 | spec 要求「至少 1 個範例」，tasks 設計為「至少 2 個 examples」，下限不一致 | 統一至 `SC-003`：「每個 topic 至少 2 個範例」（與 tasks/plan 對齊） |
| A1 | Duplication | LOW | spec.md FR-001 vs SC-001/SC-002 | FR-001 與 SC-001/SC-002 同樣陳述「100% 覆蓋」，略有重複 | 可在 SC 中改為「見 FR-001」，避免維護兩份相同敘述 |
| F3 | Inconsistency | LOW | tasks.md T001 | Phase 1 中 T002/T003/T004 標記 `[P]`，T001 未標記，但實際上也可並行 | 考慮為 T001 補充 `[P]` 標記（低風險，不影響執行） |

---

## Coverage Summary Table

| Requirement | Has Task? | Task IDs | Notes |
|-------------|-----------|----------|-------|
| FR-001（筆記覆蓋） | ✅ | T007, T013, T019, T025 | |
| FR-002（說明+範例格式） | ✅ | T009, T018, T021, T029 | |
| FR-003（origin: supplemental） | ✅ | T018, T029 | |
| FR-004（說明清晰） | ⚠️ | T010, T022 | 缺乏可量測標準（B1） |
| FR-005（同概念同 topic） | ✅ | T012, T024 | |
| FR-005a（de-with-mo sharedNote） | ✅ | T022, T028 | |
| FR-006（と topic 結構） | ✅ | T009, T015, T017 | |
| FR-007（術語統一） | ⚠️ | — | 無直接對應驗收任務（E1） |
| FR-008（助詞排列順序） | ✅ | T030, T032 | |
| FR-009（折疊容器） | ✅ | T014, T026 | |
| FR-010（分行顯示） | ✅ | T014, T026 | |
| FR-011（外部排版一致） | ✅ | T035 | |
| FR-012（presentationMode 理由） | ⚠️ | T012, T024 | 理由尚未寫入文件（C1） |
| FR-013（可擴充資料層） | ✅ | T015, T027 | |
| SC-001（と 覆蓋率 100%） | ✅ | T013 | |
| SC-002（で 覆蓋率 100%） | ✅ | T025 | |
| SC-003（每 topic ≥ 1 範例） | ✅ | T018, T029 | 下限與 tasks 不一致（F2） |
| SC-004（375px 折疊） | ⚠️ | T035 | e2e 未指定 viewport（C2） |
| SC-005（既有順序不影響） | ✅ | T032 | |
| SC-006（View.vue 不修改） | ✅ | T003, T040 | |

---

## Constitution Alignment Issues

**無 CRITICAL 衝突。** 所有 Constitution MUST 原則均有對應覆蓋：

| 原則 | 狀態 | 依據 |
|------|------|------|
| I. Code Quality | ✅ | plan.md Constitution Check 全數通過 |
| II. Test-First | ✅ | 單元測試 + e2e 均在實作前定義 |
| III. UX Consistency | ✅ | FR-011 + FR-009/010 確保排版一致 |
| IV. Performance Budgets | ✅ | plan.md 說明「純靜態資料，無效能影響」 |
| V. Documentation (zh-TW) | ✅ | spec/plan/tasks 均為繁體中文 |
| V. PROJECT_ARCHITECTURE.md | ✅ | 無目錄/路由/模組結構異動，確認不需更新 |
| VI. Scope Ownership | ✅ | T034 驗證負向歸屬（非指定頁面不出現新功能） |

---

## Unmapped Tasks

無孤立任務。所有 T001–T040 均可對應至至少一個需求或使用者故事。

---

## tasks.txt 步驟完整對應確認

| tasks.txt | tasks.md（US1） | tasks.md（US2） |
|-----------|----------------|----------------|
| 一.1 文檔引入 | T007 | T019 |
| 一.2 修正錯誤 | T008 | T020 |
| 一.3 補充（說明+範例） | T009 | T021 |
| 一.4 調整為學習資源 | T010 | T022 |
| 一.5 再確認錯誤 | T011 | T023 |
| 一.6 分類 | T012 | T024 |
| 一.7 比對漏缺 | T013 | T025 |
| 二.1 排版外容器 | T014 | T026 |
| 二.2 內容填寫 | T015 | T027 |

**判定：tasks.txt 所有步驟已完整映射至 tasks.md，無漏缺。**

---

## Metrics

| 指標 | 數值 |
|------|------|
| 功能需求總數（FR + SC） | 14 FR + 6 SC = 20 |
| 任務總數 | 40（T001–T040） |
| 需求覆蓋率（有≥1任務） | 17/20 = **85%** |
| 模糊項目數（Ambiguity） | 2（B1, B2） |
| 重複項目數（Duplication） | 1（A1） |
| CRITICAL 問題數 | **0** |
| HIGH 問題數 | 1（B1） |
| MEDIUM 問題數 | 4（E1, C1, C2, B2） |
| LOW 問題數 | 3（F1, F2, F3） |

---

## Next Actions

### 無 CRITICAL 問題，可進入 `/speckit.implement`

但建議先處理以下項目以提升實作品質：

**優先修正（實作前）**

1. **E1 — FR-007 術語驗收任務**：在 T011 或獨立新任務中加入「確認術語與 grammar 頁面一致」的驗收步驟，避免實作後才發現術語偏差
2. **C2 — SC-004 e2e viewport**：在 tasks.md T035 補充「設定 Playwright viewport 375×667」，確保行動裝置驗收有明確執行方式

**可於實作中修正**

3. **C1 — FR-012 理由補充**：在 plan.md 中補充選擇 `'info-stack'` 的設計理由
4. **F1 — plan.md 狀態**：將 tasks.md 狀態從 ⬜ 更新為 ✅
5. **F2 — SC-003 下限統一**：將 spec.md SC-003 從「至少 1 個」更新為「至少 2 個」

**可延後或忽略**

6. B1（FR-004 模糊）：實作時依常識判斷即可，不影響驗收
7. A1（輕微重複）：不影響執行
8. F3（T001 並行標記）：不影響執行
