# Contract：測驗 Modal 與結果寫入

## 進入條件

開始測驗前必須同時滿足：

- `questionCount >= 1`
- 至少有一個 `selectedKanaIds` 為 `true`
- `includeHiragana` 或 `includeKatakana` 至少一個為 `true`

## 抽題契約

- 先建立目前可出題字母池。
- 對字母池做一次不重複隨機洗牌並依序取題。
- 若 `questionCount` 大於字母池大小，才允許重新洗牌並開始下一輪。
- 同一輪中，同一個 `kanaId + scriptType` 不得重複。

## Modal 輸入

| 欄位 | 來源 |
|------|------|
| `questions` | 由勾選字母、題目字體範圍與題數推導 |
| `currentIndex` | 內部 session state |
| `isAnswerRevealed` | 內部 session state |
| `unknownMarkedIds` | 內部 session state |
| `confirmDialog` | 內部 session state |

## Modal 操作

- `nextStep()`
  - 若尚未揭曉答案：揭曉答案
  - 若已揭曉答案：進入下一題
- `markUnknown()`
  - 記錄本題未知狀態
  - 再依目前揭曉狀態執行與 `nextStep()` 相同的流程
- `requestClose()`
  - 顯示「確定要結束練習嗎？」確認提示
  - 進入 `confirming-close` 狀態
- `cancelClose()`
  - 關閉確認提示
  - 回到當前題目與原先狀態
- `confirmClose()`
  - 結束當前未完成 session
  - 關閉 modal
  - 不覆寫既有最近一次測驗結果

## 寫入契約

- 僅在 `completed` 狀態時覆蓋寫入 `duotify.exam.latestUnknownResults`
- `aborted` 狀態不得寫入新結果
- 資料格式需含 `version`、`updatedAt`、`items`
- 若讀取該 key 失敗或格式錯誤，系統必須刪除該 key
