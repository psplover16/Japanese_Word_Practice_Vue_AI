# 資料模型：日語學習 PWA

## 1. KanaEntry

### 說明

代表一個可顯示於表格中的假名單元，可能是一般字母，也可能是古語假名。

### 欄位

| 欄位 | 型別 | 說明 |
|------|------|------|
| `id` | `string` | 唯一識別值，例如 `seion-ka-a`、`dakuon-ga` |
| `group` | `"seion" \| "dakuon"` | 所屬表格群組 |
| `rowKey` | `string` | 所屬行，例如 `ka`, `sa`, `ga` |
| `columnKey` | `string` | 所屬段，例如 `a`, `i`, `u`, `e`, `o` |
| `hiragana` | `string \| null` | 平假名顯示值 |
| `katakana` | `string \| null` | 片假名顯示值 |
| `romaji` | `string \| null` | Hepburn 羅馬拼音 |
| `isArchaic` | `boolean` | 是否屬於古語假名 |
| `isSelectable` | `boolean` | 是否可勾選 |
| `isExamEligible` | `boolean` | 是否可納入考題 |
| `placeholder` | `boolean` | 是否為 `-` 佔位格 |

### 規則

- `isArchaic = true` 的資料預設不顯示，且 `isSelectable = false`
- `placeholder = true` 的格子不可勾選且不可出題

## 2. PracticeSelectionState

### 說明

代表第一頁跨路由共享、但不跨重整保留的勾選狀態。

### 欄位

| 欄位 | 型別 | 說明 |
|------|------|------|
| `selectedKanaIds` | `Record<string, boolean>` | 已勾選字母 |
| `includeHiragana` | `boolean` | 是否納入平假名題目 |
| `includeKatakana` | `boolean` | 是否納入片假名題目 |
| `selectAll` | `boolean` | 全選／全不選 UI 狀態 |
| `selectDakuonGroup` | `boolean` | 濁音／半濁音 UI 狀態 |
| `showArchaicKana` | `boolean` | 古語假名顯示開關 |
| `enableSokuon` | `boolean` | 促音開關 |
| `enableExtendedYoon` | `boolean` | 拗音／合拗音／長音符開關 |
| `questionCount` | `number` | 目前題數輸入值 |

### 規則

- 此狀態由 `AppShell` 建立，重整後回預設
- `questionCount` 可手動修改，但當勾選集合或題目字體範圍改變時會被重新計算覆蓋
- 第二頁與第三頁只能拿到 readonly 版本

## 3. ExamQuestion

### 說明

代表測驗流程中的單一題目。

### 欄位

| 欄位 | 型別 | 說明 |
|------|------|------|
| `id` | `string` | 題目唯一識別值 |
| `kanaId` | `string` | 對應 `KanaEntry.id` |
| `scriptType` | `"hiragana" \| "katakana"` | 出題字體 |
| `promptText` | `string` | 畫面顯示的假名 |
| `romaji` | `string` | 答案用羅馬拼音 |
| `kanaLabel` | `string` | 平假名或片假名提示文字 |

## 4. ExamSessionState

### 說明

代表一次測驗 modal 的內部狀態。

### 欄位

| 欄位 | 型別 | 說明 |
|------|------|------|
| `questions` | `ExamQuestion[]` | 題目序列 |
| `currentIndex` | `number` | 目前題號索引 |
| `isAnswerRevealed` | `boolean` | 是否已揭曉答案 |
| `unknownMarkedIds` | `Record<string, number>` | 本次測驗中按下「我不清楚」的累積次數 |
| `status` | `"idle" \| "running" \| "closing" \| "completed"` | 測驗流程狀態 |

### 狀態轉移

- `idle -> running`：送出並通過驗證
- `running -> closing`：使用者關閉 modal 或題目完成
- `closing -> completed`：結果已寫入 `localStorage`

## 5. LatestUnknownResult

### 說明

代表最近一次測驗後要在結算區顯示的紀錄。

### 欄位

| 欄位 | 型別 | 說明 |
|------|------|------|
| `items` | `UnknownResultItem[]` | 最近一次測驗結果 |
| `updatedAt` | `string` | ISO 時間字串 |
| `version` | `number` | storage schema 版本 |

## 6. UnknownResultItem

### 欄位

| 欄位 | 型別 | 說明 |
|------|------|------|
| `kanaId` | `string` | 對應字母 ID |
| `hiragana` | `string \| null` | 平假名 |
| `katakana` | `string \| null` | 片假名 |
| `romaji` | `string` | 羅馬拼音 |
| `count` | `number` | 本次測驗累積次數 |

### 規則

- 永遠只保留最近一次測驗結果
- 若讀取資料損毀或型別不符，整包刪除

## 7. PwaUpdateState

### 說明

代表 PWA 更新提示與延後套用策略。

### 欄位

| 欄位 | 型別 | 說明 |
|------|------|------|
| `updateAvailable` | `boolean` | 是否有新版可用 |
| `promptVisible` | `boolean` | 5 秒提示是否仍顯示 |
| `applyOnNextLaunch` | `boolean` | 下次啟動是否自動套用 |
| `detectedAt` | `string \| null` | 偵測更新時間 |

### 規則

- 5 秒提示結束後若未確認，`applyOnNextLaunch = true`
- 更新完成後需要清舊快取，但不得清除 `localStorage`
