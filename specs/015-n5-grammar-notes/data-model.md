# 資料模型：N5 文法新增助詞「と」「で」

**Feature**: `specs/015-n5-grammar-notes`
**Date**: 2026-04-10

---

## 異動摘要

| 異動類型 | 位置 | 說明 |
|----------|------|------|
| 新增 section | `n5GrammarSections[]` | particle-to、particle-de |
| 更新陣列 | `particleSectionIds` | 末尾追加 `'particle-to'`、`'particle-de'` |
| 新增 coverage | `n5GrammarSourceCoverage[]` | note-v14-ch1、note-v14-ch2 |
| 無異動 | `N5GrammarView.vue` | 元件不需修改 |
| 無異動 | `N5GrammarInfoBlock.vue` | 元件不需修改 |
| 無異動 | 型別定義 `grammarNotes.ts` | 現有型別已可容納新資料 |

---

## 新增 Section：particle-to（助詞 と）

```typescript
{
  id: 'particle-to',
  title: '助詞 と',
  description: '表示與某人共同進行動作，或並列兩個名詞',
  presentationMode: 'info-stack',
  order: 97,
  category: 'particle',
  sharedNotes: [
    {
      id: 'to-noun-listing',
      title: '名詞並列用法（AとB）',
      content:
        '「と」也可用來連接兩個名詞，表示「A 和 B」。' +
        '例：コーヒーとお茶（咖啡和茶）、ペンと消しゴム（原子筆和橡皮擦）。' +
        '名詞並列用法與動作夥伴用法的「と」字形相同，需依語境判斷。'
    }
  ],
  topics: [
    {
      id: 'to-action-partner',
      title: '動作夥伴：與某人一起做某事',
      summary:
        '「と」放在人物名詞後，表示「與……一起」進行某動作。' +
        '句型：[人物] + と + [動詞]。',
      details: [
        '「と」的前面接人物（友達、家族、先生 等），表示共同進行的夥伴。',
        '「いっしょに」（一起）常與「と」搭配，放在「と」後方，可省略其中之一。',
        '「と」標示的夥伴本身不是動作的執行者——執行者仍是句子的主語（通常是說話者「私」）。'
      ],
      examples: [
        {
          id: 'to-friend-school',
          japanese: '友達と学校へ行きます。',
          reading: 'ともだち と がっこう へ いきます。',
          translation: '和朋友一起去學校。',
          origin: 'supplemental'
        },
        {
          id: 'to-family-together',
          japanese: '家族といっしょに食べました。',
          reading: 'かぞく と いっしょ に たべました。',
          translation: '和家人一起吃了飯。',
          origin: 'supplemental'
        }
      ],
      sourceRefs: ['note-v14-ch1'],
      sharedNoteIds: ['to-noun-listing']
    }
  ]
}
```

---

## 新增 Section：particle-de（助詞 で）

```typescript
{
  id: 'particle-de',
  title: '助詞 で',
  description: '表示移動或行動所使用的交通工具或手段',
  presentationMode: 'info-stack',
  order: 98,
  category: 'particle',
  sharedNotes: [
    {
      id: 'de-with-mo',
      title: '與「も」搭配',
      content:
        '「で」可與助詞「も」搭配，組成「でも」，' +
        '意思是「即使搭～也」或「用～方式也」。' +
        '詳細用法可參見助詞「も」的說明。'
    }
  ],
  topics: [
    {
      id: 'de-transportation',
      title: '交通工具與行動手段',
      summary:
        '「で」放在交通工具或工具手段名詞後，表示「搭乘～」或「用～方式」進行動作。' +
        '句型：[手段] + で + [動詞]。',
      details: [
        '接交通工具名詞（バス、電車、タクシー 等），表示乘坐該工具移動。',
        '也可接一般工具名詞（はし、ペン 等），表示動作的方式或工具。',
        '注意：「で」在此標示「工具或手段」，並非場所。場所用法（在某處做某事）屬另一語意，不在本次範圍。'
      ],
      examples: [
        {
          id: 'de-bus-school',
          japanese: 'バスで学校へ行きます。',
          reading: 'バス で がっこう へ いきます。',
          translation: '搭公車去學校。',
          origin: 'supplemental'
        },
        {
          id: 'de-train-station',
          japanese: '電車で駅まで来ました。',
          reading: 'でんしゃ で えき まで きました。',
          translation: '搭電車來到車站。',
          origin: 'supplemental'
        }
      ],
      sourceRefs: ['note-v14-ch2'],
      sharedNoteIds: ['de-with-mo']
    }
  ]
}
```

---

## particleSectionIds 更新

```typescript
// 現有（維持不變）
export const particleSectionIds = [
  'particle-wa',
  'particle-ga',
  'particle-wo',
  'particle-mo',
  'particle-no',
  'particle-ni',
  'particle-he',
  'particle-ka',
  // 新增 ↓
  'particle-to',
  'particle-de'
] as const;
```

---

## n5GrammarSourceCoverage 新增項目

```typescript
// 末尾追加
{
  sourceId: 'note-v14-ch1',
  summary: '助詞と：動作夥伴',
  mappedSectionId: 'particle-to',
  mappedTopicIds: ['to-action-partner'],
  status: 'supplemented'   // 筆記提供分類標題，例句全為補充
},
{
  sourceId: 'note-v14-ch2',
  summary: '助詞で：交通工具與手段',
  mappedSectionId: 'particle-de',
  mappedTopicIds: ['de-transportation'],
  status: 'supplemented'
}
```

---

## 渲染流程（不變）

```
N5GrammarView
  └─ v-for sortedN5GrammarSections
       └─ N5GrammarSectionCard (section)       ← 折疊容器
            ├─ header: section.title             ← 「助詞 と」
            └─ body (v-show expanded):
                 ├─ p: section.description       ← 說明文字
                 └─ N5GrammarInfoBlock
                      └─ v-for topics
                           └─ article (topic)
                                ├─ h3: topic.title
                                ├─ p: topic.summary
                                ├─ ul: topic.details
                                ├─ 共通提醒: sharedNotes（由 sharedNoteIds 解析）
                                └─ 例句: topic.examples
```

---

## 型別相容性確認

| 欄位 | 型別 | 新資料是否相容 |
|------|------|--------------|
| `id` | `string` | ✅ |
| `title` | `string` | ✅ |
| `description` | `string` | ✅（非空字串） |
| `presentationMode` | `'bullet-list' \| 'info-stack' \| 'compare-table'` | ✅（使用 `'info-stack'`） |
| `order` | `number` | ✅（97、98） |
| `category` | `'core' \| 'particle'` | ✅（使用 `'particle'`） |
| `sharedNotes` | `N5GrammarSharedNote[]` | ✅ |
| `topics` | `N5GrammarTopic[]` | ✅ |
| `table` | `N5GrammarCompareTable?`（optional） | ✅（不提供，undefined） |
| `tableExampleGroups` | `N5GrammarTableExampleGroup[]?`（optional） | ✅（不提供） |
| `topic.sourceRefs` | `string[]` | ✅ |
| `topic.sharedNoteIds` | `string[]` | ✅ |
| `example.origin` | `'source' \| 'supplemental'` | ✅（全為 `'supplemental'`） |
