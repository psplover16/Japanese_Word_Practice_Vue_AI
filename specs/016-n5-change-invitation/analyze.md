## Specification Analysis Report

| ID | Category | Severity | Location(s) | Summary | Recommendation |
|----|----------|----------|-------------|---------|----------------|
| C1 | Coverage Gap | MEDIUM | `spec.md` FR-008; `tasks.md` T013-T016, T023-T026, T035 | 規格要求「來源筆記中的羅馬音備註只能作為輔助資訊，不得取代日文正文、讀音與繁中說明」，但 `tasks.md` 沒有任何任務明確要求在資料整理時處理這條規則，也沒有對應驗證任務。 | 在 US1 / US2 的資料整理任務中新增明確步驟，要求把輸入法／發音備註降為 note 或說明，不得當作正文；並補一個 unit 或 manual validation 檢查。 |

### Coverage Summary Table

| Requirement Key | Has Task? | Task IDs | Notes |
|-----------------|-----------|----------|-------|
| cover-v15-ch1-to-ch4-content | Yes | T007, T017, T027, T035, T040 | ch1~ch4 coverage 由 foundational、source coverage 與最終漏缺檢查共同覆蓋 |
| order-core-sections-after-existing-core | Yes | T005, T028, T033 | 排序與插入位置有實作與測試 |
| preserve-four-distinct-learning-sections | Yes | T014, T015, T024, T026 | 4 個 sections 各自獨立建立 |
| provide-clear-explanations-and-examples | Yes | T013-T016, T023-T026, T040 | 來源整理與例句補充有明確實作任務 |
| fix-source-errors-and-fragments | Yes | T007, T013, T023, T025, T035 | 來源修正責任已映射 |
| compare-masenka-vs-mashou-and-naru-vs-suru | Yes | T014, T015, T024, T026 | ch1 compare-table 與 ch2/ch3 對比任務存在 |
| separate-title-and-description | Yes | T034, T029, T040 | 主要靠資料欄位統一與 smoke / manual 驗證 |
| choose-best-presentation-mode-with-rationale | Yes | T014, T015, T024, T026 | 實作由 research.md 的版型決策支撐 |
| romanization-notes-are-supplementary-only | No | — | 缺少明確任務與驗證 |
| align-terminology-with-existing-grammar-content | Yes | T034, T040 | 有實作與最終人工驗證 |
| restrict-feature-to-n5-grammar-only | Yes | T030, T032, T040 | 有負向 ownership 與 route 驗證 |
| keep-render-safe-and-mobile-readable | Yes | T029, T031, T039, T040 | smoke、e2e 與 quickstart 覆蓋 |
| update-project-architecture-only-if-structure-changes | Yes | T004 | 已明確確認本次不需更新 |

### Constitution Alignment Issues

無 CRITICAL 憲章衝突。

### Unmapped Tasks

無明顯 unmapped tasks。`T001`~`T007`、`T036`~`T040` 屬於 setup、foundation 與 polish 類任務，仍支援憲章、coverage 或驗證要求。

### Metrics

- Total Requirements: 13
- Total Tasks: 40
- Coverage % (requirements with >=1 task): 92%
- Ambiguity Count: 0
- Duplication Count: 0
- Critical Issues Count: 0

### Next Actions

- 目前沒有 CRITICAL / HIGH 問題，可在修補 `FR-008` coverage 後安心進入 `/speckit.implement`。
- 建議先補 1 條任務到 `tasks.md`：
  - 在 US1 / US2 的資料整理或 polish 階段，明確檢查 `chotto` 等羅馬音備註只作補充，不取代正文。
- 若你想先維持現狀，也可以直接進入實作，但建議在實作前補齊這個中度缺口，避免 review 時被打回。

### Suggested Commands

- 修正任務清單後再繼續：手動更新 `specs/016-n5-change-invitation/tasks.md`
- 然後進入實作：`/speckit.implement`

Would you like me to suggest concrete remediation edits for the top 1 issue?
