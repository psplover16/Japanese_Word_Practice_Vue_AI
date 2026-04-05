# Data Model: N5 文法學習子路由

## N5GrammarSection

- **Purpose**: 表示頁面上的一個主題群組容器。
- **Fields**:
  - `id`: 穩定識別碼，供 key、test id 與排序規則使用
  - `title`: 群組標題
  - `description`: 群組說明，與標題列分離顯示
  - `presentationMode`: `bullet-list` | `info-stack` | `compare-table`
  - `order`: 群組排序值
  - `category`: 一般文法或助詞分類
  - `topics`: 本群組內的文法條目列表
  - `sharedNotes`: 該群組抽離出的共通規則或整併註記

## N5GrammarTopic

- **Purpose**: 表示單一文法項目或一組緊密相關的文法點。
- **Fields**:
  - `id`: 穩定識別碼
  - `title`: 文法項目名稱
  - `summary`: 主要用途或規則說明
  - `details`: 補充說明列表，可承載括號註記整理後的補充資訊
  - `examples`: 對應例句列表
  - `sourceRefs`: 對應來源筆記章節或片段，供完整性比對
  - `sharedNoteIds`: 引用的共通說明識別碼
  - `comparisonGroup`: 若此項目屬於某個對照表，記錄其群組鍵

## N5GrammarExample

- **Purpose**: 表示一個例句與其附帶說明。
- **Fields**:
  - `id`: 穩定識別碼
  - `japanese`: 日文例句
  - `reading`: 必要時的假名或讀音標示
  - `translation`: 中文翻譯
  - `note`: 例句補充說明，例如固定搭配或變化提醒
  - `origin`: `source` | `supplemental`

## SharedNote

- **Purpose**: 存放從多處重複內容整併出的共同說明。
- **Fields**:
  - `id`: 穩定識別碼
  - `title`: 共通規則名稱
  - `content`: 規則說明
  - `appliesTo`: 被哪些 topic 引用

## SourceCoverageItem

- **Purpose**: 用於整理過程中核對來源筆記是否完整收錄。
- **Fields**:
  - `sourceId`: 來源片段識別碼
  - `summary`: 原始片段摘要
  - `mappedSectionId`: 對應到的 section
  - `mappedTopicId`: 對應到的 topic
  - `status`: `covered` | `merged` | `supplemented`

## State Notes

- 群組展開狀態屬於 view 層暫態，不進入靜態資料檔。
- 「助詞必須最後」由 section 的 `category` 與 `order` 共同保證。
- 「每個主題至少一個例句」由 unit test 驗證，不依賴人工檢查。
