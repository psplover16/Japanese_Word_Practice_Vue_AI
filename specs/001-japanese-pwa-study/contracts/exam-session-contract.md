# Contract：測驗 Modal 與結果寫入

## 進入條件

開始測驗前必須同時滿足：

- `questionCount >= 1`
- 至少有一個 `selectedKanaIds` 為 `true`
- `includeHiragana` 或 `includeKatakana` 至少一個為 `true`

## Modal 輸入

| 欄位 | 來源 |
|------|------|
| `questions` | 由勾選字母、題目字體範圍與題數推導 |
| `currentIndex` | 內部 session state |
| `isAnswerRevealed` | 內部 session state |
| `unknownMarkedIds` | 內部 session state |

## Modal 操作

- `nextStep()`
  - 若尚未揭曉答案：揭曉答案
  - 若已揭曉答案：進入下一題
- `markUnknown()`
  - 記錄本題未知狀態
  - 再依目前揭曉狀態執行與 `nextStep()` 相同的流程
- `requestClose()`
  - 顯示結束確認
  - 確認後結束當前 session

## 寫入契約

- 測驗結束時覆蓋寫入 `duotify.exam.latestUnknownResults`
- 資料格式需含 `version`、`updatedAt`、`items`
- 若讀取該 key 失敗或格式錯誤，系統必須刪除該 key
