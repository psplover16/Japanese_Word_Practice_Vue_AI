# Quickstart: 變化規則主內容重建

## Goal

驗證 `/grammar` 已從舊版簡化內容切換為參考頁等級的變化規則頁，同時保留既有 route shell。

## Manual Verification Steps

1. 執行 `npm run dev`。
2. 開啟 `/grammar`。
3. 確認 route title、route tabs 與 app shell 仍是既有版本。
4. 確認頁面主內容已不再顯示舊的 selection detail / hatsuon / sokuon 區塊。
5. 確認頁面出現以下 11 個容器：
   - 語法系統差異
   - 各活用型意義
   - 動詞型態分辨: 一段/五段/不規則
   - 五段動詞表(詞尾母音變化)
   - 一段動詞 (辭書型 結尾必定是 る)
   - サ變動詞 (する動詞為結尾的動詞)
   - カ變動詞 (只有来る)
   - い形容詞
   - ない形容詞
   - だ助動詞
   - 詞性變化規則
6. 展開「五段動詞表(詞尾母音變化)」，確認：
   - 第一張表含形態、詞幹、詞尾、接尾、含意欄位
   - 有高亮列
   - 有 `tfoot` 說明列
   - 下方有音便表，且音便不是獨立 accordion
7. 展開「カ變動詞 (只有来る)」，確認標題有保留多行副標題。
8. 展開「詞性變化規則」，確認條列編號、巢狀清單與範例都可讀。
9. 在瀏覽器切換為約 `375px` 寬度，重新檢查至少以下三塊：
   - 語法系統差異
   - 五段動詞表(詞尾母音變化)
   - 詞性變化規則
10. 確認沒有 console error、沒有內容重疊、沒有無法閱讀的儲存格。

## Automated Verification Targets

- `npm run lint`
- `npm run typecheck`
- `npm run test:unit`
- `npm run build`
- `npx playwright test tests/e2e/grammar-change-rules.spec.ts`
