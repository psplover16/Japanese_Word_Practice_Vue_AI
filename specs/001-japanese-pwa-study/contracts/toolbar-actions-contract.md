# Contract：工具列操作與確認流程

## 送出

- 送出前必須驗證：
  - `questionCount >= 1`
  - 至少一個字母被勾選
  - `includeHiragana` 或 `includeKatakana` 至少一個為 `true`
- 驗證通過後才可建立測驗 session

## 重置

- 清除所有字母與特殊音節勾選
- `題目包含：平假名`、`題目包含：片假名` 回到預設勾選
- 古語假名顯示開關回到預設值

## 清除結果

- 按下後必須先顯示「確定要清除所有『我不清楚的音節』紀錄嗎？」確認提示
- 使用者取消時不得刪除資料
- 使用者確認時才可刪除 `duotify.exam.latestUnknownResults`
