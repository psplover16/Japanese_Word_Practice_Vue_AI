# Contract: PWA 生命週期與更新提示

## Assets

- 網站 icon 使用 `vite.ico`
- manifest icon 使用 `icons/180.png`、`icons/192.png`、`icons/512.png`

## Offline

- 主要路由與必要靜態資源需可離線使用。

## Update Prompt

- 只有符合以下條件才顯示：
  - 手機尺寸
  - `display-mode: standalone`
- 位置固定在畫面底部，距離底部約 `16px`
- 約 `5` 秒後自動消失

## Deferred Update

- 若本次未更新，下次重新開啟網站時自動套用更新。
- 更新完成後清除 Cache Storage，但不得刪除其他功能使用的 localStorage。
