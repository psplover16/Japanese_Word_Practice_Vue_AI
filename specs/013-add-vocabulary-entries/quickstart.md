# 快速驗證：單字練習補充詞彙

## 1. 檢查資料更新

確認 [`src/modules/vocabulary/data/jpWords.ts`](C:/Users/user1/Documents/Japanese_Word_Practice_Vue_AI/src/modules/vocabulary/data/jpWords.ts) 尾端最後 3 筆新增資料依序為：

1. `はだ / 肌 / 皮膚 / Stage1_基礎生活`
2. `なめらか / 滑らか / 光滑(な形容詞) / Stage2_日常強化`
3. `うごき / 動き / 動作 / Stage2_日常強化`

同時確認沒有新增任何新的「說話」詞條，既有 `話す -> 說話` 仍保留。

## 2. 執行目標化驗證

```bash
npm run lint
npm run typecheck
npx vitest run tests/unit/vocabularyData.spec.ts tests/component/VocabularyViewSmoke.spec.ts tests/component/RouteOwnership.spec.ts
npm run build
npx playwright test tests/e2e/vocabulary-word-practice.spec.ts
```

## 3. 手動驗收 `/vocabulary`

```bash
npm run dev
```

開啟 `/vocabulary` 後確認：

1. 預設 count summary 顯示 `1079個單字`。
2. 搜尋 `皮膚` 可找到 `肌`。
3. 搜尋 `光滑` 可找到 `滑らか`。
4. 搜尋 `動作` 可找到 `動き`。
5. 搜尋 `說話` 時仍由既有 `話す` 提供覆蓋，沒有多出一筆本次新增的重複列。
6. 頁面預設載入、搜尋、標記、儲存註記與長按揭露流程都不出現執行期錯誤或主控台錯誤。

## 4. 驗收備註

- 「新增單字放在字典檔最後面」指的是 `rawVocabularyEntries` 的原始資料順序，不代表 UI 會把新詞顯示在整頁最底部。
- 由於 `/vocabulary` 會依 stage 分組，新詞最終會顯示在各自 stage 群組的尾端。
