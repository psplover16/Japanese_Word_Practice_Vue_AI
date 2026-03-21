# Contract：路由與共享狀態

## 路由

| Route | View | 頁首標題 | 權限 |
|-------|------|----------|------|
| `/practice` | 字母練習頁 | `50音` | 可讀可寫共享勾選狀態 |
| `/grammar` | 變化規則頁 | `變化規則` | 只讀共享勾選狀態 |
| `/vocabulary` | 單字練習頁 | `單字練習` | 只讀共享勾選狀態 |

## 共享狀態介面

### Writable Contract

只允許 `practice` 路由呼叫：

- `toggleKana(id: string): void`
- `toggleRow(rowKey: string): void`
- `toggleColumn(columnKey: string): void`
- `toggleSelectAll(value: boolean): void`
- `toggleDakuonGroup(value: boolean): void`
- `setIncludeHiragana(value: boolean): void`
- `setIncludeKatakana(value: boolean): void`
- `setQuestionCount(value: number): void`
- `setShowArchaicKana(value: boolean): void`
- `setEnableSokuon(value: boolean): void`
- `setEnableExtendedYoon(value: boolean): void`
- `resetSelections(): void`

### Readonly Contract

提供所有路由：

- `state.selectedKanaIds`
- `state.includeHiragana`
- `state.includeKatakana`
- `state.showArchaicKana`
- `state.enableSokuon`
- `state.enableExtendedYoon`
- `state.questionCount`
- `derived.selectedKanaCount`
- `derived.totalQuestionPool`

## 保證

- 路由切換不重建共享狀態。
- 頁面重新整理後共享勾選狀態回到預設。
- `grammar` 與 `vocabulary` 只讀，不得直接寫回共享狀態。
- 頁首標題必須依當前路由分別顯示 `50音`、`變化規則`、`單字練習`。
