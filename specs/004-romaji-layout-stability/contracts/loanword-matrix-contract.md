# Contract: Loanword Matrix

## Structure

| Element | Requirement |
|---------|-------------|
| First row | 顯示母音標頭 |
| First column | 顯示常見外來語基底音，並盡可能詳細 |
| Content cells | 顯示由列標頭與欄標頭組成的對應組合 |
| Cell layout | 假名在上、羅馬音在下、兩者置中 |
| Kana wrapping | 假名不得換行 |
| 375px fallback | 空間不足時先縮 padding，再縮字級；不得水平捲動、裁切或重疊 |

## Verification

- `LoanwordSection.spec.ts` 驗證矩陣結構與 cell 內容
- 375px e2e smoke test 驗證小螢幕可讀性
