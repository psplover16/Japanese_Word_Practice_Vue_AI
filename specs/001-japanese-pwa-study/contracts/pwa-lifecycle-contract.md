# Contract：PWA 更新與離線生命週期

## 首次可離線使用

- 條件：service worker 已啟用，且必要 precache 完成
- 行為：顯示「已可離線使用」提示
- 限制：若必要資產尚未快取完成，不得提前顯示離線可用提示

## 偵測到新版

- 條件：新 service worker 進入 waiting / ready 狀態
- 行為：
  - 顯示更新提示，持續 5 秒
  - 5 秒內若使用者確認，立即套用更新並重新載入
  - 5 秒內未確認，設定 `duotify.pwa.applyUpdateOnNextLaunch = true`

## 下次啟動自動套用

- 條件：啟動時發現 `duotify.pwa.applyUpdateOnNextLaunch = true`
- 行為：
  - 自動觸發更新套用
  - 重新載入後清理舊 Cache Storage
  - 保留 `localStorage` 內仍有效的學習資料與測驗結果

## 快取清理邊界

- 可清理：
  - 舊版 precache
  - 舊版 runtime cache
  - plugin 產生的可回收離線快取
- 不可清理：
  - `localStorage`
  - 最近一次測驗結果
  - 仍有效的學習相關本機資料
