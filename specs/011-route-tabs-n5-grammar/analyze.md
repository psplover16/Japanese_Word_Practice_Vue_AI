# Specification Analysis Report

| ID | Category | Severity | Location(s) | Summary | Recommendation |
|----|----------|----------|-------------|---------|----------------|
| I1 | Inconsistency | HIGH | [spec.md](c:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/specs/011-route-tabs-n5-grammar/spec.md#L39), [spec.md](c:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/specs/011-route-tabs-n5-grammar/spec.md#L74), [plan.md](c:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/specs/011-route-tabs-n5-grammar/plan.md#L60), [tasks.md](c:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/specs/011-route-tabs-n5-grammar/tasks.md#L68) | `spec.md` 與 `plan.md` 將 `/practice` 表格字級寫成約 `1.1x` 的明確目標，但 `tasks.md` 新增了「若破版可微幅下修」的執行規則。這是合理補充，但目前只有 `tasks.md` 知道，導致驗收標準在三份核心文件間不一致。 | 在 `spec.md` 與 `plan.md` 補上相同容差，例如「以 1.1x 為目標；若造成破版或額外斷行，可微幅下修至仍明顯大於現況的最小穩定值」。 |
| C1 | Coverage Gap | MEDIUM | [spec.md](c:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/specs/011-route-tabs-n5-grammar/spec.md#L79), [spec.md](c:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/specs/011-route-tabs-n5-grammar/spec.md#L102), [tasks.md](c:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/specs/011-route-tabs-n5-grammar/tasks.md#L130) | `FR-010` 與 `SC-005` 要求未被點名的既有路由與流程維持可用，但目前任務主要覆蓋 `AppShell`、`RouteOwnership`、`PracticeViewSmoke` 與 `app-shell` e2e，沒有明確回歸 `practice exam flow` 或 PWA toast 這類被共享 shell 變更間接影響的高風險互動。 | 二選一：1. 在 `tasks.md` 補一個最小回歸驗證任務，確認 `tests/e2e/practice-exam-flow.spec.ts` 或等效流程仍通過；2. 若不打算驗，請把 `FR-010`/`SC-005` 收斂成只保證主路由殼層與指定表格相關流程。 |
| I2 | Inconsistency | MEDIUM | [spec.md](c:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/specs/011-route-tabs-n5-grammar/spec.md#L13), [spec.md](c:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/specs/011-route-tabs-n5-grammar/spec.md#L29), [spec.md](c:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/specs/011-route-tabs-n5-grammar/spec.md#L44), [tasks.md](c:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/specs/011-route-tabs-n5-grammar/tasks.md#L105) | `tasks.md` 新增了「User Story 4 - 維護者同步更新來源規格與架構說明」，但 `spec.md` 只有 3 個 user story，`plan.md` 也沒有把文件維護提升為獨立使用者故事。這讓 story-to-task traceability 變得不乾淨。 | 將 Phase 6 改為 `Polish / Documentation Sync` 類型的 cross-cutting phase，或在 `spec.md` / `plan.md` 正式加入對應的維護者 user story。 |
| U1 | Underspecification | MEDIUM | [plan.md](c:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/specs/011-route-tabs-n5-grammar/plan.md#L103), [plan.md](c:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/specs/011-route-tabs-n5-grammar/plan.md#L165), [tasks.md](c:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/specs/011-route-tabs-n5-grammar/tasks.md#L76) | `tasks.md` 把 [`PracticeViewSmoke.spec.ts`](c:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/tests/component/PracticeViewSmoke.spec.ts) 當成 US2 驗收重點，但 `plan.md` 的 Project Structure 與 Planned Automated Coverage 都沒有把這個測試檔列為本 feature 的預期輸出或驗收面。 | 在 `plan.md` 補上 `PracticeViewSmoke.spec.ts` 作為 US2 的既有回歸驗收面，讓設計文件與任務清單對齊。 |

## Coverage Summary

| Requirement Key | Has Task? | Task IDs | Notes |
|-----------------|-----------|----------|-------|
| remove-route-title | Yes | T010, T014, T016 | 共享頁首移除舊標題有實作與 smoke/e2e 驗收。 |
| left-align-and-wrap-route-tabs | Yes | T011, T012, T014, T016 | tabs 靠左、多列換行與窄版驗證有覆蓋。 |
| prevent-tab-text-wrap-and-enlarge-tabs | Yes | T012, T016, T039 | 任務已明確檢查禁止斷行與文字放大。 |
| preserve-header-scope-boundary | Yes | T015, T016 | 以 ownership 與 e2e 驗證不外溢。 |
| enlarge-practice-table-text | Yes | T017, T018, T019, T020, T021, T039 | 已覆蓋，但容差規則只出現在 `tasks.md`。 |
| keep-practice-change-local | Yes | T017, T020, T021 | 以作用範圍鎖定與 smoke 驗證控制。 |
| add-n5-tab-after-vocabulary | Yes | T011, T024, T025, T027 | 有導覽順序與 route 驗收。 |
| add-n5-route-placeholder | Yes | T022, T023, T025, T027 | 新 route 與 placeholder 有實作和 smoke/e2e 驗收。 |
| keep-grammar-content-unchanged | Yes | T026, T027 | 以 ownership 與 e2e 保護 `/grammar`。 |
| avoid-regressing-unmentioned-flows | Partial | T015, T020, T021, T027, T039 | 已有部分殼層與 `/practice` 驗證，但未明確涵蓋 exam flow / 其他高風險互動。 |
| update-project-architecture | Yes | T004, T031 | 文件更新責任已具體化。 |
| write-back-originating-specs | Yes | T028, T029, T030, T033 | 來源 spec 回寫已被任務化。 |

## Constitution Alignment Issues

- 無 `CRITICAL` 等級的憲章衝突。
- 目前主要風險是 specification-sync 的一致性，不是憲章直接違反：`tasks.md` 已經吸收了「可微降字級」規則，但 `spec.md` / `plan.md` 尚未同步。

## Unmapped Tasks

- 無完全失去目的的 task。
- `T001`、`T034`-`T039` 屬於 repo hygiene、整體驗證與手動驗收，視為 cross-cutting 任務而非單一 requirement 任務。

## Metrics

- Total Requirements: 12
- Total Tasks: 39
- Coverage %: 100% requirements have at least partial task coverage
- Ambiguity Count: 1
- Duplication Count: 0
- Critical Issues Count: 0

## Next Actions

- 目前沒有 `CRITICAL` 問題，所以 technically 可以進 `/speckit.implement`。
- 但建議先處理前兩個問題，再開始實作，能明顯降低「做完後驗收標準不同步」的返工風險。
- 建議順序：
  1. 先同步 `spec.md` / `plan.md` 的字級容差描述。
  2. 決定是否補一個最小的 exam-flow 回歸任務，或收斂 `FR-010` / `SC-005`。
  3. 把 `tasks.md` 的 US4 改成 cross-cutting phase，或回補對應 story 到 `spec.md`。

## Suggested Commands

- 若要先修文件一致性：手動編修 [`spec.md`](c:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/specs/011-route-tabs-n5-grammar/spec.md)、[`plan.md`](c:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/specs/011-route-tabs-n5-grammar/plan.md)、[`tasks.md`](c:/Users/Gary/Documents/Japanese_Word_Practice_Vue_AI/specs/011-route-tabs-n5-grammar/tasks.md)
- 若要直接進實作：`/speckit.implement`
- 若要我先幫你提出修正稿：直接回我，我可以先整理 top 3 問題的具體 remediation edits

Would you like me to suggest concrete remediation edits for the top 3 issues?
