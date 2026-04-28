# Quickstart：N5 文法、單字與サ變動詞學習內容整理

**Feature**: `specs/017-refine-n5-content`  
**Date**: 2026-04-28

## 前置確認

```powershell
git branch --show-current
git status --short
```

預期：

- 目前分支為 `017-refine-n5-content`
- 工作樹只包含本 feature 相關變更
- 不讀取或修改 `_private/_private_notes/筆記.txt`
- 不讀取或修改 `_private/_private_notes/done/`、`_private/_private_fileAssets/done/` 或其巢狀內容

## 開發流程

1. 讀取來源

```powershell
Get-Content '_private\_private_notes\v16\note.txt' -Encoding utf8
Get-Content '_private\_private_notes\v16\note2.txt' -Encoding utf8
Get-Content '_private\_private_notes\v16\note3.txt' -Encoding utf8
```

2. 更新 N5 文法資料

- 修改 `src/modules/n5Grammar/data/grammarNotes.ts`
- 必要時修改 `src/modules/n5Grammar/types/grammarNotes.ts`
- 若指示詞例句需要紅字標記，使用結構化欄位，不在資料字串中嵌 HTML

3. 更新變化規則資料與 renderer

- 修改 `src/modules/grammar/data/changeRules.ts`
- 必要時修改 `src/modules/grammar/types/changeRules.ts`
- 必要時修改 `src/modules/grammar/components/InflectionTable.vue`
- 保留既有サ變動詞表格，將例句放在表格下方

4. 更新單字資料

- 修改 `src/modules/vocabulary/data/jpWords.ts`
- 先查核 `東口`、`西口`、`北口`、`南口` 是否已存在
- 缺漏者追加到 `rawVocabularyEntries` 尾端

5. 更新測試

- `tests/unit/n5GrammarData.spec.ts`
- `tests/unit/changeRulesData.spec.ts`
- `tests/unit/vocabularyData.spec.ts`
- `tests/component/N5GrammarSections.spec.ts`
- `tests/component/GrammarChangeRulesTables.spec.ts`
- `tests/component/VocabularyViewSmoke.spec.ts`
- `tests/component/RouteOwnership.spec.ts`
- `tests/e2e/n5-grammar-layout.spec.ts`
- `tests/e2e/grammar-change-rules.spec.ts`
- `tests/e2e/vocabulary-word-practice.spec.ts`

## 驗證命令

```powershell
npm run lint
npm run typecheck
npm run test:unit
npm run build
npm run test:e2e
```

## 手動檢查

1. `/n5-grammar`

- 最上方能看到 `note2.txt` 核心字詞整理。
- `できる` 位於既有邀約區塊後。
- `を`、`で`、`から`、`まで` 位於助詞群組最後區域。
- 指示詞、數字、時間表現展開後可讀。
- 指示詞例句中的重點詞有紅色標記。

2. `/grammar`

- サ變動詞表格仍存在。
- 表格下方能看到 `散歩` 的 `しません`、`しませんでした`、`しない`、`した` 例句。
- 標題與說明分開顯示。

3. `/vocabulary`

- 搜尋 `東口`、`西口`、`北口`、`南口` 都能找到詞條。
- 詞條可被標記，標記流程與既有詞條一致。
- 沒有重複列。

4. 375px 寬度

- `/n5-grammar`、`/grammar`、`/vocabulary` 受影響內容無明顯水平溢出。
- 展開區塊無空白容器或重疊。

## 完成條件

- 所有來源 coverage 都有對應 section/topic。
- 所有指定測試通過。
- 若型別責任、renderer 職責或測試結構有實際變更，已同步更新 `PROJECT_ARCHITECTURE.md`。
- 新增/修改中文內容以 UTF-8 正確保存，沒有亂碼、替代問號或可見 BOM。
