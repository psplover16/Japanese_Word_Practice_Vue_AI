# Specification Analysis Report

| ID | Category | Severity | Location(s) | Summary | Recommendation |
|----|----------|----------|-------------|---------|----------------|
| A1 | Ambiguity | MEDIUM | `plan.md:120-122` | `Project Structure` 仍保留 `[必要時新增拗音區塊測試]`、`[必要時補充 375px smoke 驗證]` 這類 placeholder 式路徑，與 `tasks.md` 已明確指定的 `tests/component/YoonSections.spec.ts`、`tests/e2e/practice-layout.smoke.spec.ts` 不完全對齊。 | 將 `plan.md` 中的 placeholder 路徑替換成與 `tasks.md` 一致的實際檔名，避免後續 implementation 與 review 產生雙重解讀。 |
| C1 | Coverage Gap | LOW | `plan.md:156-161`, `tasks.md:99-100` | `plan.md` 明確保留「本 feature 新增靜態資料後仍應維持既有離線能力」的 PWA 相容性考量，但 `tasks.md` 的驗證只覆蓋 build 與 smoke，沒有明確寫出離線回歸檢查。 | 若你希望把 PWA 相容性也列入本期完成定義，可在 Polish 增加一個 quickstart / 手動驗證任務，明確檢查 `/practice` 離線可讀。 |

## Coverage Summary Table

| Requirement Key | Has Task? | Task IDs | Notes |
|-----------------|-----------|----------|-------|
| long-vowel-single-table | Yes | T010, T012, T013, T014 | 長音規則大表格已由資料、元件與手機密度任務覆蓋 |
| long-vowel-rule-row-separation | Yes | T010, T013 | 規則列與範例列分離由 component test 與元件改造處理 |
| long-vowel-three-column-examples | Yes | T010, T012, T013 | 假名 / 羅馬音 / 中文翻譯三欄有資料與 UI 任務 |
| au-exception-example-rows | Yes | T010, T012, T013 | `あ段 + う` 多筆範例有明確任務 |
| seion-yoon-romaji | Yes | T015, T017, T018 | 清音拗音羅馬音補齊有 test + implementation |
| dakuon-yoon-romaji | Yes | T015, T017, T018 | 合拗音羅馬音補齊與清音拗音同批處理 |
| loanword-matrix-headers | Yes | T016, T017, T019 | 外來語第一列 / 第一欄標頭有測試與元件改造 |
| loanword-combination-logic | Yes | T016, T017, T019 | 組合邏輯由資料與矩陣元件共同覆蓋 |
| kana-only-needs-romaji | Yes | T016, T017, T019 | 只有假名的格位補齊羅馬音已被覆蓋 |
| loanword-stacked-kana-romaji | Yes | T016, T019 | 外來語內容格上下排列有 test + implementation |
| readable-kana-without-bad-wrap | Yes | T019, T024 | 版型與密度回退順序任務可承接此需求 |
| practice-scope-ownership | Yes | T009, T021, T022, T023 | `/practice` 專屬範圍與頁首支撐性調整有驗證 |
| negative-ownership-out-of-scope | Yes | T009, T021 | `/grammar`、`/vocabulary` 等 negative ownership 已被規劃 |
| mobile-375-no-overflow | Yes | T020, T022, T023, T024 | 375px 可讀性與無橫向捲動有測試與實作任務 |
| density-fallback-order | Yes | T020, T024 | 先縮 padding 再縮字的順序已有任務 |
| render-safe-default-hidden-placeholder | Yes | T009, T011, T021 | smoke 與 default / hidden / placeholder 驗證完整 |
| romaji-terminology-consistency | Yes | T017, T018, T019, T024 | 用資料整併與區塊重構覆蓋命名一致性 |

## Constitution Alignment Issues

目前未發現違反 Constitution MUST 的問題。

## Unmapped Tasks

無高風險 unmapped task。`T001`、`T004`、`T025`、`T027`、`T028` 屬於治理、驗證與文件同步任務，合理地對應 Constitution 與交付收尾，而非單一 spec requirement。

## Metrics

- Total Requirements: 17
- Total Tasks: 28
- Coverage %: 100%
- Ambiguity Count: 1
- Duplication Count: 0
- Critical Issues Count: 0

## Next Actions

- 先修正 `A1`，把 `plan.md` 的 placeholder 路徑替換為 `tasks.md` 已確定的實際測試檔名。
- `C1` 屬低風險，可選擇在本期補上一個離線驗證任務；若你把 PWA 相容性視為本期完成條件，建議一併補上。
- 在目前狀態下，可以進入 `/speckit.implement` 或直接開始依 `tasks.md` 實作；不需要因為這兩個問題而阻擋開發。

Would you like me to suggest concrete remediation edits for the top 2 issues?
