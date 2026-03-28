# Quickstart: 練習頁與部署流程調整

## 1. 安裝與啟動

```bash
npm ci
npm run dev
```

## 2. 前端驗證流程

### 流程 A：最近結果區清除差異化

1. 進入 `/practice`。
2. 任意選取假名並開始一輪測驗。
3. 至少標記一題為不熟，完成或關閉流程後讓最近一次結果區出現。
4. 先點上方工具列的清除最近結果：
   - 結果資料應被清除
   - 不強制回頂
5. 再重新產生一次最近結果，點下方結果區的「清除」：
   - 結果資料應被清除
   - 頁面需平滑捲動回 `/practice` 頂部

### 流程 B：表格標示移除

1. 在 `/practice` 查看清音表。
2. 確認右上角不再出現 `tableA`。
3. 查看濁音/半濁音表。
4. 確認右上角不再出現 `tableB`。

### 流程 C：測驗彈窗題目可讀性

1. 在 `/practice` 開啟測驗彈窗。
2. 確認中央考試區塊最上方題目列字級明顯大於舊版。
3. 確認答案、提示與底部按鈕仍完整可見。
4. 把 viewport 切到 `375px`、`768px`、`1024px` 各檢查一次：
   - 不得裁切
   - 不得重疊
   - 不得出現水平捲動

## 3. 建議驗證指令

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run build
npx playwright test tests/e2e/practice-exam-flow.spec.ts tests/e2e/practice-layout.smoke.spec.ts
```

## 4. 部署驗證流程

### Flow D：staging (`dev`)

1. 推送 `dev` 分支。
2. 確認 `CD` workflow 成功。
3. 確認 workflow 只更新 `gh-pages/staging/` 對應內容。
4. 確認 production root 沒有被清空。

### Flow E：production (`main`)

1. 推送 `main` 分支。
2. 確認 `CD` workflow 成功。
3. 確認 workflow 更新 production root。
4. 確認 `gh-pages/staging/` 仍保留，可繼續提供 staging 內容。

## 5. 文件驗證

1. 檢查 README 的 CD 章節。
2. 檢查 `PROJECT_ARCHITECTURE.md` 的 workflow 與 scripts 描述。
3. 確認兩者都不再提到 repo 內自製部署腳本仍為主要發佈入口。
