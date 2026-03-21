# Quickstart：日語學習 PWA

## 1. 安裝依賴

```bash
npm install
```

## 2. 啟動開發環境

```bash
npm run dev
```

開啟瀏覽器後確認：

- 預設進入「字母練習」或可快速切換到三個頁面
- 最外層容器為 `py-[12px] px-2`
- 頁首左側顯示目前頁名，右側顯示路由切換按鈕群

## 3. 核心手動驗證

### 字母練習

- 勾選清音與濁音後切換到其他頁，再切回第一頁，確認勾選狀態仍在
- 重新整理頁面後確認勾選回到預設
- 第二頁與第三頁可以看到共享勾選資訊，但不能修改

### 測驗流程

- 題數為 `0` 時按送出，確認會阻擋並顯示提示
- 勾選至少一個字母後開始測驗，確認 modal 依序支援揭曉答案與下一題
- 連續按「我不清楚」時，同題只累計一次
- 測驗結束後，確認結果寫入 `localStorage` 並顯示於結算區

### 結算區與壞資料防呆

- 手動把 `duotify.exam.latestUnknownResults` 改成錯誤 JSON
- 重新整理後確認頁面不會崩潰，且錯誤資料會被清掉

## 4. PWA 驗證

### 建置

```bash
npm run build
npm run preview
```

### 離線

- 先在線上成功載入一次
- 在 DevTools 切換為 Offline
- 重新開啟應用，確認三個頁面、測驗流程與靜態內容仍可使用

### 更新

- 模擬 service worker 新版可用
- 確認提示只顯示 5 秒
- 5 秒內確認更新時，應立即重新載入
- 若未確認，重新關閉並開啟應用後應自動套用新版
- 更新後確認舊 Cache Storage 已被清理，`localStorage` 仍保留

## 5. 自動化檢查

```bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e
```
