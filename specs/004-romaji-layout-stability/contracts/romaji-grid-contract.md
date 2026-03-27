# Contract: Romaji Grid Sections

## Covered Sections

- 清音拗音
- 合拗音

## Required Behaviors

| Element | Requirement |
|---------|-------------|
| Column headers | 每個假名標頭都需附羅馬音 |
| Row headers | 每個列標頭都需附羅馬音 |
| Content cells | 每格都需附羅馬音，不得只剩假名 |
| Example content | 若有例字資訊，需同時提供中文意思 |
| Layout | 同一區塊內標頭與內容格的呈現規則需一致 |

## Verification

- `YoonSections.spec.ts` 驗證清音拗音與合拗音內容完整
- `/practice` smoke test 驗證區塊存在且沒有 render-safe 問題
