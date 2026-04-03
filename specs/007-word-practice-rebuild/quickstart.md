# Quickstart: 單字練習主內容重建

## Goal

驗證 `/vocabulary` 已從舊版 placeholder 切換為參考頁等級的單字學習頁，同時保留既有 route shell，並支援搜尋、條件篩選、註記與長按揭露。

## Manual Verification Steps

1. 執行 `npm run dev`。
2. 開啟 `/practice`，至少勾選幾個假名字母，保留 `題目包含：平假名` 與 `題目包含：片假名` 的不同組合。
3. 切換到 `/vocabulary`。
4. 確認共享 route tabs 與 app shell 仍是既有版本，且頁首沒有額外 route title。
5. 確認頁面主內容不再顯示：
   - `SelectionDetailPanel`
   - `單字練習預備區`
6. 確認頁面出現控制區、單字數量摘要與單一可縱向捲動的 table 容器。
7. 在搜尋 input 輸入：
   - 一個中文關鍵字
   - 一個拼音片段
   - 一個漢字
   逐一確認結果即時更新，且單字數量文字與可見資料列數一致。
8. 切換 `全部字音`、`漢字`、`只顯示註記`、`練習` 與欄位標頭 checkbox，確認：
   - 結果採疊加條件
   - 漢字 / 拼音在同欄位位置切換
   - 隱藏但需保留佔位的欄位沒有讓 table 變形
9. 勾選數筆資料列的註記 checkbox 或直接點資料列切換草稿註記，再執行儲存註記，確認：
   - 被註記列顯示提示背景
   - 重新整理後仍保留
10. 勾選註記欄標頭的「清除全部註記」checkbox，確認：
   - 會出現兩次確認警告
   - 確認後全部註記清空
11. 在任一資料列長按約 0.4 秒，確認：
   - 長按中該列會暫時顯示完整內容
   - 放開後回到原本狀態
12. 在瀏覽器切換為約 `375px` 寬度，重新檢查控制區、單字數量、table 與長按互動，確認沒有 console error、文字重疊或不可點擊欄位。

## Automated Verification Targets

- `npm run lint`
- `npm run typecheck`
- `npm run test:unit`
- `npm run build`
- `npx playwright test tests/e2e/vocabulary-word-practice.spec.ts`
