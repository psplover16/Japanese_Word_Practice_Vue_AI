# Research: `/practice` 羅馬音排版補強與首屏穩定化

## Decision 1: 靜態教學資料維持在 TypeScript 模組，不拆成 JSON

**Decision**: 延續 `src/modules/practice/data/specialSyllableData.ts` 作為本 feature 的資料來源，直接升級為更精細的 TypeScript 型別資料。

**Rationale**:

- 既有 practice 模組已用 TypeScript 管理靜態假名資料，延續相同模式可降低改動範圍。
- 本期新增的是顯示語意，不是資料交換或編輯工具，因此不值得引入 JSON 載入與轉型流程。
- 型別可直接約束規則列、例字列、矩陣標頭格與內容格，對測試與重構都更安全。

**Alternatives considered**:

- 拆成 JSON：內容編輯較直觀，但會增加映射與驗證成本。
- 直接在元件 template 硬編碼：初期較快，但難維護且不利測試。

## Decision 2: 長音規則使用專屬表格資料模型，不與其他矩陣共用

**Decision**: `ChoonRuleSection` 使用單一大表格與專屬 row model，明確區分規則敘述列與例字列。

**Rationale**:

- 長音區塊同時包含規則說明與例字資料，與拗音/外來語矩陣的語意不同。
- 規格要求不額外加入欄位標題，因此更需要能控制列角色與資訊順序的專屬模型。

**Alternatives considered**:

- 萬用表格元件：抽象過度，容易把不同語意混在一起。
- 維持多卡片：無法滿足「單一大表格」需求。

## Decision 3: 拗音與合拗音維持既有表格心智模型，只補齊羅馬音

**Decision**: `SeionYoonSection` 與 `DakuonYoonSection` 保持固定矩陣排版，但為標頭與內容格補上完整羅馬音資料。

**Rationale**:

- 使用者已接受目前清音拗音的閱讀方式，改動越少，回歸風險越低。
- 需求核心是「哪裡只有假名就補羅馬音」，不需要重做整個資訊架構。

**Alternatives considered**:

- 改成卡片式列表：與現有學習節奏不一致。
- 只在 hover 或互動後顯示羅馬音：不適合初學者快速對照。

## Decision 4: 外來語擴張採標頭矩陣，並借用清音拗音的閱讀節奏

**Decision**: `LoanwordSection` 採第一列母音、第一欄基底音的矩陣結構，內容格用「假名在上、羅馬音在下」呈現，視覺節奏可參考清音拗音區塊。

**Rationale**:

- 需求明確指定欄列角色，這本質上是規則矩陣，不是示例清單。
- 參考既有清音拗音節奏有助於降低學習切換成本，同時仍保留本區塊的專屬語意。

**Alternatives considered**:

- 平面列表示例：容易做，但失去組合規則的教學價值。
- 直接共用同一個萬用表格元件：會讓標頭語意與 cell 視覺過度綁死。

## Decision 5: 375px 可讀性以密度退讓策略處理，不使用水平捲動

**Decision**: 在 375px 下先縮減 padding，再視需要縮小字級；禁止以 `overflow-x-auto`、裁切或重疊作為主方案。

**Rationale**:

- 這是使用者在 clarify 中已明確確認的決策。
- 學習頁面重點是快速掃讀，水平捲動會破壞整體對照體驗。

**Alternatives considered**:

- 水平捲動：實作簡單但違反需求。
- 手機版隱藏部分資訊：會破壞羅馬音與中文補強價值。

## Decision 6: 首屏穩定渲染優先採同步掛載與穩定初始 DOM

**Decision**: `/practice` 下半部區塊的修正方向以同步掛載、穩定初始 DOM 與明確 smoke test 驗證為主，不額外引入 loading UI。

**Rationale**:

- 規格要求的是「不要先空一段再晚出現」，不是要新增 loading 狀態。
- 靜態教學區塊本身不依賴遠端資料，理論上應該能在首屏直接呈現。

**Alternatives considered**:

- 加入 skeleton/loading：會掩蓋問題，但不真正解決斷裂感。
- 重構成延後顯示動畫：與需求方向相反。

## Decision 7: PWA 資產只記錄為背景限制，不擴大成本期主交付

**Decision**: 延續既有 PWA 機制，確保新增靜態教學資料離線可見，但不把 manifest/icon 資產改造納入本期主交付。

**Rationale**:

- 需求主體是 `/practice` 的排版、資料語意與首屏穩定度。
- 指定的 PWA 資產路徑位於受限制目錄，本期不應在沒有必要時主動擴大範圍。

**Alternatives considered**:

- 一併重做 PWA 資產：風險高且與本 feature 不成比例。
- 完全忽略 PWA：不符合專案既有背景，因此仍需保留離線驗證。
