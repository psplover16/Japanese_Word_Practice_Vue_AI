# 研究紀錄：N5 文法敬體變化區塊重整

## 決策 1：新增獨立的 `polite-overview` section，保留 `sentence-basics` id

- **Decision**: 以新增 `polite-overview` section 的方式承接原 compare table，原 `sentence-basics` id 保留給移除表格後的教學內容區塊。
- **Rationale**: 這最符合「第一個獨立區塊 + 原內容保留」的需求，同時避免既有 topic id、source coverage 與太多 selector 全面漂移。
- **Alternatives considered**:
  - 直接把 `sentence-basics` 改名並把原內容挪到新 id：會讓既有 source coverage 與 selector 漂移更大。
  - 在同一個 section 內用更複雜的 slot 或子分頁拆分：超出需求，且增加互動複雜度。

## 決策 2：擴充 compare-table 專用資料，而不是新增新的 presentation mode

- **Decision**: 在 `N5GrammarSection` 上增加 compare-table 專用的 `tableExampleGroups`，沿用 `presentationMode: "compare-table"`。
- **Rationale**: 需求仍然屬於「先表格、再補示例」的 compare-table 類型，擴充既有 renderer 比另開新 mode 更簡單，也更符合目前資料驅動架構。
- **Alternatives considered**:
  - 新增第四種 presentation mode：會增加 view 分支與測試負擔，不必要。
  - 把 12 組儲存格例句塞成 12 個普通 topics：資料語意不直觀，畫面也容易顯得像第二份內容而非表格補充。

## 決策 3：例句覆蓋以每個儲存格一組為準，替代寫法放在同一 group 註記

- **Decision**: `じゃありません / ではありません`、`じゃありませんでした / ではありませんでした` 這類替代寫法不拆成額外 group，而是在同一個 table example group 內用 `forms` 與 `note` 表達。
- **Rationale**: 這與使用者在 clarify 階段的選擇一致，也能避免 overview 區塊過度膨脹。
- **Alternatives considered**:
  - 每種替代寫法都各自一組例句：驗證更嚴格，但 UI 成本高，且超出已釐清的需求口徑。

## 決策 4：維持所有 section 預設收合，不改 `N5GrammarSectionCard` 行為

- **Decision**: 新的 `敬體變化速覽` 仍維持預設收合，只靠排序變成第一個。
- **Rationale**: 這與 clarify 結論一致，也可以讓本次變更集中在內容與資料模型，不額外擴大到互動層。
- **Alternatives considered**:
  - 只把第一區塊改成預設展開：會引入新的 per-section 展開規則與額外測試成本，且與使用者選擇相反。

## 決策 5：overview 新例句全部視為 supplemental，並用資料測試保證不重複

- **Decision**: overview 補上的例句全部標記為 `origin: "supplemental"`，並在單元測試中檢查其日文句子不與既有 N5 文法例句完全相同。
- **Rationale**: 本次新增例句不是來自原筆記搬運，而是為了補足表格教學；以 `supplemental` 標記最符合現有資料語意。
- **Alternatives considered**:
  - 不區分 origin：會讓資料來源語意模糊。
  - 只靠人工檢查不重複：風險高，容易在後續調整時漏掉。
