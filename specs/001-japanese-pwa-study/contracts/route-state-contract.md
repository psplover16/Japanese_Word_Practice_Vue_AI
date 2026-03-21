# Contract：路由與共享狀態

## 路由

| Route | View | 權限 |
|-------|------|------|
| `/practice` | 字母練習頁 | 可讀可寫共享勾選狀態 |
| `/grammar` | 變化規則頁 | 只讀共享勾選狀態 |
| `/vocabulary` | 單字練習頁 | 只讀共享勾選狀態 |

## 共享狀態介面

### Writable Contract

只允許 `practice` 路由呼叫：

- `toggleKana(id: string): void`
- `toggleRow(rowKey: string): void`
- `toggleColumn(columnKey: string): void`
- `setIncludeHiragana(value: boolean): void`
- `setIncludeKatakana(value: boolean): void`
- `setQuestionCount(value: number): void`
- `resetSelections(): void`

### Readonly Contract

提供所有路由：

- `state.selectedKanaIds`
- `state.includeHiragana`
- `state.includeKatakana`
- `state.enableSokuon`
- `state.enableExtendedYoon`
- `state.questionCount`
- `derived.selectedKanaCount`
- `derived.totalQuestionPool`

## 保證

- 路由切換不重建共享狀態
- 頁面重新整理後共享勾選狀態回到預設
