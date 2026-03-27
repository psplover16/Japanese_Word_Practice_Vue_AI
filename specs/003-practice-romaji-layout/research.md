# Research: 字母練習排版與羅馬音補強

## Decision 1: 靜態教學資料維持在 TypeScript 模組，不拆成 JSON

**Decision**: 延續 `src/modules/practice/data/specialSyllableData.ts` 作為本 feature 的資料來源，直接升級為更結構化的 TypeScript 型別資料。

**Rationale**:

- 現有 practice 模組已用 TypeScript 模組管理靜態假名資料，延續同一模式可降低改動範圍。
- 本 feature 的資料量小、無遠端同步需求，也不需要額外的 JSON 載入或驗證流程。
- TypeScript 型別能直接約束「假名 / 羅馬音 / 中文翻譯」與矩陣格角色，對重構安全性較高。

**Alternatives considered**:

- 拆成 JSON：可讓內容編輯更直觀，但會新增型別映射與載入流程，對本期價值過重。
- 直接在元件 template 內硬編碼：實作快，但維護成本高且不利測試。

## Decision 2: 長音規則表格採專屬資料模型與 markup

**Decision**: `ChoonRuleSection` 使用專屬的結構化列資料與單一表格 markup，不與拗音或外來語區塊共用完整表格元件。

**Rationale**:

- 長音規則同時包含「規則說明列」與「單字範例列」，語意與其他矩陣型表格不同。
- 專屬 markup 比高度抽象的共用元件更容易表達列角色與驗證三欄範例。

**Alternatives considered**:

- 萬用表格元件：理論上可重用，但會讓不同欄位語意耦合，違反 reusable-style boundary。
- 維持多卡片：無法滿足使用者要的大表格掃讀體驗。

## Decision 3: 拗音與合拗音區塊維持固定矩陣，但補齊每格羅馬音

**Decision**: `SeionYoonSection` 與 `DakuonYoonSection` 保持既有矩陣視覺模式，只補上每個內容格的羅馬音與必要的 cell 排版。

**Rationale**:

- 使用者已接受目前拗音區塊的表格心智模型，調整最小、風險最低。
- 只補內容格羅馬音即可滿足需求，不需要重做區塊資訊架構。

**Alternatives considered**:

- 改成卡片式：與清音表格學習方式不一致。
- 只在 hover / 點擊後顯示羅馬音：增加互動成本，不符合初學者快速對照目標。

## Decision 4: 外來語擴張以標頭矩陣表達組合邏輯

**Decision**: `LoanwordSection` 採第一列與第一欄作為基本音標頭，其餘內容格以組合關係展示，且格內以「假名在上、羅馬音在下」排列。

**Rationale**:

- 需求明確指定第一列與第一欄為基本音標頭，這本質上是矩陣而非單純清單。
- 垂直堆疊的假名 / 羅馬音可在小尺寸下維持可辨識性，並與清音拗音的學習邏輯保持關聯。

**Alternatives considered**:

- 以列表示例清單呈現：較容易實作，但失去「組合規則」的教學價值。
- 以更多縮寫塞入單行：在 375px 下可讀性差。

## Decision 5: 375px 可讀性以密度縮減策略處理，不使用橫向捲動

**Decision**: 在 `AppShell` 頁首與 practice 表格區塊中，先縮減 cell / button padding，再縮小字級；禁止引入水平捲動容器。

**Rationale**:

- 使用者明確將 375px 視為主要驗收尺寸，且澄清中禁止橫向捲動、裁切、重疊。
- 密度縮減比水平捲動更符合學習頁面「快速掃讀」的需求。

**Alternatives considered**:

- `overflow-x-auto`：實作簡單，但違反明確需求。
- 在手機版隱藏部分資訊：會破壞羅馬音與翻譯補強目標。

## Decision 6: PWA 與圖示資產沿用既有機制，本期不主動擴大到部署調整

**Decision**: 本期把 PWA 視為既有技術背景，確保新增靜態資料可離線使用，但不把 icon / manifest 置換列為主要交付。

**Rationale**:

- feature 的核心是學習內容排版與資料可讀性，不是部署與資產管線重做。
- 受限資產路徑在規劃階段不可直接檢視，若強行納入主路徑會提高不確定性。

**Alternatives considered**:

- 同步重做 PWA icon 與 manifest：風險高，且與本 feature 的主要使用者價值不成比例。
- 忽略 PWA：不符合專案既有技術背景，因此至少需在計畫中記錄相容性與風險。
