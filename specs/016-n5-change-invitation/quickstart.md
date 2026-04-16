# Quickstart：N5 文法新增邀約與變化表現整理

## 1. 執行驗證指令

```powershell
npm run lint
npm run typecheck
npx vitest run tests/unit/n5GrammarData.spec.ts tests/component/N5GrammarSections.spec.ts tests/component/N5GrammarViewSmoke.spec.ts tests/component/RouteOwnership.spec.ts
npm run build
npx playwright test tests/e2e/app-shell.smoke.spec.ts tests/e2e/n5-grammar-layout.spec.ts
```

## 2. 手動驗證 `/n5-grammar`

1. 開啟 `/n5-grammar`。
2. 確認既有 3 個 core 區塊之後，能看到本次新增的 4 個非助詞區塊，順序為：
   - `邀約表現：ませんか 與 ましょう`
   - `狀態變化：～くなります / ～になります`
   - `人為改變：～くします / ～にします`
   - `勸誘表現：～ましょう`
3. 確認 4 個新區塊初始都可正常顯示標題列，且維持既有收合互動。

## 3. 驗證 ch1 比較區塊

1. 展開 `邀約表現：ませんか 與 ましょう`。
2. 確認看得到比較用的表格或等效比較內容。
3. 確認能明確分辨：
   - `ませんか` 偏向詢問對方意願
   - `ましょう` 偏向較肯定地提議一起做
4. 確認有普通體對照補充，例如 `見ない？`、`帰ろう`。

## 4. 驗證 ch2 / ch3 / ch4 說明區塊

1. 展開 `狀態變化：～くなります / ～になります`。
2. 確認看得到 `い形容詞`、`な形容詞`、名詞的接續說明與例句，並包含 `10時になります`、`医者になります` 等類型。
3. 展開 `人為改變：～くします / ～にします`。
4. 確認看得到 `髪を短くします`、`静かにします`、`火曜日にします`、`カレーライスにします` 等類型。
5. 展開 `勸誘表現：～ましょう`。
6. 確認看得到 `ます形 + ましょう` 的形成方式、與 `帰ろう` 的對照、以及至少 1 個勸誘例句。

## 5. Coverage 與例句來源檢查

1. 對照 `v15/note.txt` 的 ch1 到 ch4。
2. 確認筆記提及的重點都能在頁面中找到對應說明。
3. 確認筆記中可用的例句有被保留或校正；不足之處有補充新例句，而不是留白。

## 6. 負向範圍檢查

1. 切換到 `/practice`、`/grammar`、`/vocabulary`。
2. 確認這些 route 不出現本次新增的 4 個 N5 文法標題或內容。
3. 回到 `/n5-grammar`，確認既有助詞區塊仍在新增 4 個 core 區塊之後。

## 7. 手機版檢查

1. 以 375px 寬度開啟 `/n5-grammar`。
2. 依序展開本次新增的 4 個區塊。
3. 確認標題、說明、表格與例句都可讀，沒有明顯水平溢出、重疊或內容截斷到無法理解。

## 8. Render-safe 檢查

1. 打開瀏覽器 console。
2. 進入 `/n5-grammar`，依序展開本次新增的 4 個區塊。
3. 確認沒有新增 browser console error、page error 或空白容器。
