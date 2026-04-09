# 資料模型：單字練習補充詞彙

## 概觀

本功能不引入新型別或新儲存機制，而是對既有 `RawVocabularyEntry -> VocabularyEntry -> VocabularyStageGroup` 流程增加 3 筆靜態資料，並保留 1 筆既有覆蓋判定。

## 實體

### 1. 指定詞義（RequestedVocabularyMeaning）

代表本次由使用者指定、需要在 `/vocabulary` 被覆蓋的中文詞義。

| 欄位 | 型別 | 說明 | 驗證規則 |
|------|------|------|----------|
| `requestedMeaning` | `string` | 使用者指定的中文詞義 | 必填；本次只接受 `皮膚`、`光滑`、`動作`、`說話` |
| `targetHeadword` | `string` | 對應的標準日文詞條 | 必須符合已確認對應 |
| `coverageType` | `'existing' \| 'new'` | 由既有資料覆蓋或需新增 | 必須可被驗證 |
| `notes` | `string` | 補充說明 | 可選；用於註記去重或 stage 決策 |

#### 已確認對應

| requestedMeaning | targetHeadword | coverageType | notes |
|------------------|----------------|--------------|-------|
| `皮膚` | `肌` | `new` | 使用者明確指定漢字為 `肌` |
| `光滑` | `滑らか` | `new` | 採詞典基本型 |
| `動作` | `動き` | `new` | 不以 `動く` 代替 |
| `說話` | `話す` | `existing` | 現有資料已覆蓋，不新增重複列 |

### 2. 尾端追加單字（VocabularyAppendEntry）

代表本次要追加到 `rawVocabularyEntries` 尾端的新增字典資料。

| 欄位 | 型別 | 說明 | 驗證規則 |
|------|------|------|----------|
| `text` | `string` | 假名主詞條 | 必填；詞典基本型 |
| `romanization` | `string` | 既有資料風格的分音節羅馬字 | 必填；沿用 `a-ta-ma` 這類格式 |
| `kanji` | `string` | 漢字或標準書寫 | 必填 |
| `meaning` | `string` | 中文詞義 | 必填；必須對應本次需求 |
| `stage` | `string` | 既有 stage 名稱 | 必填；必須是現有 stage 值 |
| `appendOrder` | `number` | 追加順序 | 必須為 1..3，且寫在檔尾 |
| `derivedId` | `number` | 由 index 自動導出的 id | 1077..1079，不能手寫覆蓋 |

#### 預計追加集合

| appendOrder | text | romanization | kanji | meaning | stage | derivedId |
|-------------|------|--------------|-------|---------|-------|-----------|
| 1 | `はだ` | `ha-da` | `肌` | `皮膚` | `Stage1_基礎生活` | `1077` |
| 2 | `なめらか` | `na-me-ra-ka` | `滑らか` | `光滑` | `Stage2_日常強化` | `1078` |
| 3 | `うごき` | `u-go-ki` | `動き` | `動作` | `Stage2_日常強化` | `1079` |

### 3. 單字資料集基線（VocabularyDatasetBaseline）

描述本次資料增量對既有 vocabulary dataset 的直接影響。

| 欄位 | 型別 | 變更前 | 變更後 | 備註 |
|------|------|--------|--------|------|
| `rawEntryCount` | `number` | `1076` | `1079` | 新增 3 筆，未刪除既有資料 |
| `normalizedEntryCount` | `number` | `1076` | `1079` | `normalizeVocabularyEntries()` 自動反映 |
| `lastEntryId` | `number` | `1076` | `1079` | 由僅追加策略帶來 |
| `stageGroupCount` | `number` | `19` | `19` | 不新增新 stage |
| `existingCoverageForSpeaking` | `boolean` | `true` | `true` | `話す` 保持為既有覆蓋 |

## 不變條件

- `rawVocabularyEntries` 的既有 1076 筆順序不可重排。
- 新增資料只能追加在檔案尾端，不能插入中段。
- `normalizeVocabularyEntries()` 產生的既有 id 1..1076 必須保持穩定。
- `話す -> 說話` 必須保留，且本次不得再新增第二筆僅為滿足「說話」的重複資料。
- `groupVocabularyEntriesByStage()` 的 stage 群組數量維持 19；本次只在既有 stage 內新增 entry。
- `/vocabulary` 預設 count summary 必須從 `1076個單字` 變為 `1079個單字`。

## 狀態／流程影響

### 預設載入

1. `rawVocabularyEntries` 讀入 1079 筆資料。
2. `normalizeVocabularyEntries()` 產生 1079 筆 `VocabularyEntry`。
3. `groupVocabularyEntriesByStage()` 仍輸出 19 個 stage 群組。
4. `/vocabulary` 預設 count summary 顯示 `1079個單字`。

### 搜尋流程

- 搜尋 `皮膚` 時可命中 `肌`
- 搜尋 `光滑` 時可命中 `滑らか`
- 搜尋 `動作` 時可命中 `動き`
- 搜尋 `說話` 時可命中既有 `話す`

### 負向流程

- 不得因僅追加更新造成既有 `markedIds` 對錯列。
- 不得因 count 基線未同步而讓冒煙測試／e2e 測試誤報失敗。
