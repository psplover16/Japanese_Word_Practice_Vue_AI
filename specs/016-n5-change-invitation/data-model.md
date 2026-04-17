# 資料模型：N5 文法新增邀約與變化表現整理

**Feature**: `specs/016-n5-change-invitation`  
**Date**: 2026-04-16

---

## 異動摘要

| 異動類型 | 位置 | 說明 |
|----------|------|------|
| 新增 section | `n5GrammarSections[]` | 新增 4 個 core sections |
| 新增 source coverage | `n5GrammarSourceCoverage[]` | 追加 `note-v15-ch1` ~ `note-v15-ch4` |
| 更新排序 | `sortedN5GrammarSections` 依賴的 `order` | 新 section 使用 order 4~7 |
| 無異動 | `N5GrammarView.vue` | 仍由既有 view 迭代 section |
| 無異動 | `N5GrammarSectionCard.vue` 等 renderer | 既有 renderer 直接吃資料 |
| 視情況調整 | `src/modules/n5Grammar/types/grammarNotes.ts` | 僅在現有型別不足時才修改 |

---

## 新增 Section 1：ch1 邀約表現比較

```ts
{
  id: 'invitation-comparison',
  title: '邀約表現：ませんか 與 ましょう',
  description: '整理禮貌邀請與較肯定提議的差異，並補充普通體對照。',
  presentationMode: 'compare-table',
  order: 4,
  category: 'core',
  topics: [],
  sharedNotes: [
    {
      id: 'invitation-plain-form-note',
      title: '普通體對照',
      content: '可搭配「見ない？」「帰ろう」等普通體表現一起理解語氣差異，但本區塊重點仍以 N5 禮貌表現為主。'
    }
  ],
  table: { ... },
  tableExampleGroups: [ ... ]
}
```

### compare-table 重點

| row / group | 說明 |
|-------------|------|
| `polite-invitation-ask` | `ませんか`：偏向詢問對方意願 |
| `polite-invitation-proposal` | `ましょう`：偏向較肯定地提議一起做 |
| `plain-form-contrast` | `見ない？`、`帰ろう` 等普通體對照 |

---

## 新增 Section 2：自然變化表現

```ts
{
  id: 'state-change-naru',
  title: '狀態變化：～くなります / ～になります',
  description: '整理自然變成某種狀態時的詞類接續、語意與例句。',
  presentationMode: 'info-stack',
  order: 5,
  category: 'core',
  sharedNotes: [
    {
      id: 'naru-yameru-note',
      title: '辭める / 止める / やめる',
      content: '保留來源筆記對三種寫法的提醒，作為辭職與停止行為的詞義區分補充。'
    }
  ],
  topics: [
    { id: 'naru-i-adjective', ... },
    { id: 'naru-na-adjective', ... },
    { id: 'naru-noun', ... }
  ]
}
```

### topic 重點

| topic id | 內容 |
|----------|------|
| `naru-i-adjective` | `寒い → 寒くなります` 等 `い形容詞` 接續 |
| `naru-na-adjective` | `にぎやか → にぎやかになります` 等 `な形容詞` 接續 |
| `naru-noun` | `医者になります`、`10時になります` 等名詞接續與用法差異 |

---

## 新增 Section 3：人為改變與決定表現

```ts
{
  id: 'state-change-suru',
  title: '人為改變：～くします / ～にします',
  description: '整理人為弄成某狀態，或決定成某安排時的句型與差異。',
  presentationMode: 'info-stack',
  order: 6,
  category: 'core',
  sharedNotes: [],
  topics: [
    { id: 'suru-i-adjective', ... },
    { id: 'suru-na-adjective', ... },
    { id: 'suru-noun-choice', ... }
  ]
}
```

### topic 重點

| topic id | 內容 |
|----------|------|
| `suru-i-adjective` | `髪を短くします` 等 `い形容詞` 接續 |
| `suru-na-adjective` | `静かにします` 與 `静かにしてください` 等補充 |
| `suru-noun-choice` | `火曜日にします`、`カレーライスにします` 等決定／選擇用法 |

---

## 新增 Section 4：～ましょう 補充整理

```ts
{
  id: 'polite-volitional',
  title: '勸誘表現：～ましょう',
  description: '補充 ～ましょう 的形成方式、意向形對照與代表例句。',
  presentationMode: 'info-stack',
  order: 7,
  category: 'core',
  sharedNotes: [
    {
      id: 'mashou-vs-masenka',
      title: '與 ませんか 的差異',
      content: '作為跨 section 補充，提醒讀者「ましょう」偏向較肯定的提議，而「ませんか」較偏向詢問對方意願。'
    }
  ],
  topics: [
    { id: 'mashou-formation', ... },
    { id: 'mashou-plain-volitional', ... },
    { id: 'mashou-example-usage', ... }
  ]
}
```

---

## Source Coverage 新增項目

```ts
{
  sourceId: 'note-v15-ch1',
  summary: 'ませんか 與 ましょう 的邀約差異',
  mappedSectionId: 'invitation-comparison',
  mappedTopicIds: [],
  status: 'supplemented'
},
{
  sourceId: 'note-v15-ch2',
  summary: '～くなります / ～になります',
  mappedSectionId: 'state-change-naru',
  mappedTopicIds: ['naru-i-adjective', 'naru-na-adjective', 'naru-noun'],
  status: 'supplemented'
},
{
  sourceId: 'note-v15-ch3',
  summary: '～くします / ～にします',
  mappedSectionId: 'state-change-suru',
  mappedTopicIds: ['suru-i-adjective', 'suru-na-adjective', 'suru-noun-choice'],
  status: 'supplemented'
},
{
  sourceId: 'note-v15-ch4',
  summary: '～ましょう 與意向形補充',
  mappedSectionId: 'polite-volitional',
  mappedTopicIds: ['mashou-formation', 'mashou-plain-volitional', 'mashou-example-usage'],
  status: 'supplemented'
}
```

---

## 排序規則

| section id | order | category | 說明 |
|------------|-------|----------|------|
| `polite-overview` | 1 | core | 既有 |
| `sentence-basics` | 2 | core | 既有 |
| `past-and-state` | 3 | core | 既有 |
| `invitation-comparison` | 4 | core | 新增 |
| `state-change-naru` | 5 | core | 新增 |
| `state-change-suru` | 6 | core | 新增 |
| `polite-volitional` | 7 | core | 新增 |
| `particle-*` | 90+ | particle | 既有，不變 |

---

## 型別相容性確認

| 欄位 | 現有型別 | 相容性 |
|------|----------|--------|
| `N5GrammarSection.id/title/description/order/category` | 現有欄位即可承載 | ✅ |
| `presentationMode` | `'bullet-list' \| 'info-stack' \| 'compare-table'` | ✅ |
| `sharedNotes` | `N5GrammarSharedNote[]` | ✅ |
| `topics` | `N5GrammarTopic[]` | ✅ |
| `table` / `tableExampleGroups` | compare-table 可選欄位 | ✅ |
| `sourceRefs` / `mappedTopicIds` | `string[]` | ✅ |
| `example.origin` | `'source' \| 'supplemental'` | ✅ |

結論：目前型別足以承載本次資料；原則上不需調整 `src/modules/n5Grammar/types/grammarNotes.ts`。
