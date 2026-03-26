# E2E Scenarios Contract

## Scenario 1: App Shell Smoke

- 路由：`/`
- 目標：確認應用可啟動且主要導覽存在
- 必要斷言：
  - 頁面成功載入
  - 看到主標題或頁首
  - 看到主要 route tabs
  - 可切換到至少一個非首頁路由且無錯誤

## Scenario 2: Practice Exam Flow

- 路由：`/practice`
- 目標：確認最小出題流程可開啟 modal
- 必要斷言：
  - 使用者可勾選至少一個假名
  - 使用者可設定題數
  - 使用者可觸發開始出題
  - 考試 modal 成功開啟並顯示題目資訊

## Diagnostics

- 失敗時保留 screenshot、trace、HTML report
- 測試不得依賴不穩定動畫完成時序
- 測試優先使用穩定 selector，而非容易改動的完整文案
