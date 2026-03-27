# Contract: Long Vowel Table

## Structure

| Element | Requirement |
|---------|-------------|
| Table root | 長音規則區塊必須是一張單一大表格 |
| Rule row | 規則敘述需獨占整列 |
| Example row | 每列依序顯示假名、羅馬音、中文意思 |
| Header labels | 不新增額外的「假名 / 羅馬音 / 中文」欄位標題文字 |
| AU exception group | `あ段 + う 不一定屬於規則長音` 需包含多筆例字或短語 |

## Verification

- Component test 驗證規則列與例字列的 DOM 結構
- Smoke test 驗證 `/practice` 中該表格正常顯示
