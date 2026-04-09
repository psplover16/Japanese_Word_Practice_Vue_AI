# Quickstart：N5 文法敬體變化區塊重整

## 1. 執行驗證指令

```powershell
npm run lint
npm run typecheck
npx vitest run tests/unit/n5GrammarData.spec.ts tests/component/N5GrammarSections.spec.ts tests/component/N5GrammarViewSmoke.spec.ts tests/component/AppShellSmoke.spec.ts tests/component/RouteOwnership.spec.ts
npm run build
npx playwright test tests/e2e/app-shell.smoke.spec.ts tests/e2e/n5-grammar-layout.spec.ts
```

## 2. 手動驗證 `/n5-grammar`

1. 開啟 `/n5-grammar`。
2. 確認第一個區塊標題是 `敬體變化速覽`，第二個區塊標題是 `敬體句型：現在型與詞類基礎`，第三個核心區塊標題是 `敬體句型：過去、狀態與補充表現`。
3. 確認兩個區塊初始都維持收合，只顯示標題列。
4. 展開 `敬體變化速覽`：
   - 看得到 compare table。
   - 表格下方看得到 12 組、每格各 1 組的例句群組。
   - `じゃありません / ではありません` 與 `じゃありませんでした / ではありませんでした` 可放在同一群組，以註記補充替代寫法。
5. 展開 `敬體句型：現在型與詞類基礎`：
   - 看得到原本的 3 組教學 topic。
   - 看得到原本的共通提醒。
   - 不再看到 compare table。
   - 原本既有的例句與提醒仍存在。

## 3. 重複例句檢查

1. 比對 `敬體變化速覽` 的新例句與既有 N5 文法例句。
2. 確認沒有完全相同的日文句子重複出現。

## 4. 負向範圍檢查

1. 切換到 `/practice`、`/grammar`、`/vocabulary`。
2. 確認這些 route 都不出現 `敬體變化速覽`、`敬體句型：現在型與詞類基礎` 或 `敬體句型：過去、狀態與補充表現` 的新重整內容。

## 5. 手機版檢查

1. 以 375px 寬度開啟 `/n5-grammar`。
2. 展開 `敬體變化速覽`、`敬體句型：現在型與詞類基礎` 與 `敬體句型：過去、狀態與補充表現`。
3. 確認表格、例句卡片與標題都可讀，沒有明顯水平溢出或內容重疊。

## 6. Render-safe 檢查

1. 開啟瀏覽器 console。
2. 進入 `/n5-grammar`，並依序展開 `敬體變化速覽`、`敬體句型：現在型與詞類基礎` 與 `敬體句型：過去、狀態與補充表現`。
3. 確認沒有新增的 console error 或 page error。
