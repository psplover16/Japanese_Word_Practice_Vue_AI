# Research: 變化規則主內容重建

## Decision 1: 以目前部署中的 `change-rules` bundle 作為參考內容基準

- Decision: 以目前部署站點 `https://psplover16.github.io/Japanese_Word_Practice_Vue/` 的 `changeRules-3zth7VTG.js` bundle 為實際內容基準，並以 `v5` 需求筆記做輔助說明。
- Rationale: 需求已指定參考頁為唯一基準；直接核對目前部署 bundle，可確認 section 清單、title、副標題與資料形狀，而不只依賴靜態筆記或舊截圖。
- Alternatives considered:
  - 只依賴 `_private/_private_notes/v5/*.txt`
    - 拒絕原因：文字需求足夠描述方向，但不足以精確還原目前線上版本的資料結構。
  - 直接人工抄寫 HTML
    - 拒絕原因：SPA 頁面主要由 JS render，bundle 資料更可靠。

## Decision 2: 採用 route-specific typed data，而不是 raw HTML 或過度通用 schema

- Decision: 在 `src/modules/grammar/data/changeRules.ts` 中建立 typed static data，依不同 renderer 類型分段維護。
- Rationale: 這頁內容高度結構化，後續要做 CRUD、測試與 diff；typed data 比 raw HTML 或 `v-html` 注入更容易驗證與維護。
- Alternatives considered:
  - 直接在 component template 寫死全部 HTML
    - 拒絕原因：可讀性差、難以 CRUD、難以做 unit test。
  - 設計單一超通用 `ReferenceTableBlock` schema
    - 拒絕原因：目前至少有比較表、規則清單、活用表、巢狀清單等不同形態，硬統一會增加複雜度。

## Decision 3: 拆成少量專用 renderer，而不是重用 practice 元件

- Decision: 以 5 類左右專用 renderer 重建頁面，保留 `GrammarView.vue` 為 `/grammar` 的唯一入口。
- Rationale: 參考站 bundle 也顯示頁面由多個專用 table component 組成；這樣能自然支援 rowspan、tfoot、多行 title 與巢狀清單。
- Alternatives considered:
  - 直接重用 `SelectionDetailPanel`、`HatsuonSection`、`SokuonSection`
    - 拒絕原因：與需求無關，且違反 route ownership。
  - 用單一 renderer + 大量 `if/else`
    - 拒絕原因：會讓 template 過度複雜，之後修改風險更高。

## Decision 4: 專用 CSS 放在 `main.css`，但以 `/grammar` class 命名隔離

- Decision: 延續 repo 目前集中在 `src/styles/main.css` 的做法，新增 `/grammar` route-specific class。
- Rationale: 專案目前沒有 CSS module 或每個元件獨立樣式檔；集中在 `main.css` 最符合現況，但 class 命名要避免誤傷其他 route。
- Alternatives considered:
  - 將所有樣式改成 inline utility class
    - 拒絕原因：複雜表格會失去可讀性與一致性。
  - 另開新的全域 stylesheet
    - 拒絕原因：超出目前 repo 模式，增加結構成本。

## Decision 5: 測試策略採 unit + component + ownership + e2e 併行

- Decision: 為資料、renderer、route ownership 與窄版呈現分層加測。
- Rationale: Constitution 要求 primary route 與高風險互動至少有 smoke test，且要驗證 positive ownership 與 negative ownership。
- Alternatives considered:
  - 只寫 e2e
    - 拒絕原因：資料與結構錯誤不易快速定位。
  - 只寫 component test
    - 拒絕原因：無法保證 `/grammar` 在真實 route 與 375px viewport 下穩定。
