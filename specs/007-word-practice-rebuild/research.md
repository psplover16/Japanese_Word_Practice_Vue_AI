# Research: 單字練習主內容重建

## Decision 1: 以 `jpWords.js` 作為字典資料唯一來源，並在本地正規化後使用

- Decision: 以 `/_private/_private_notes/v6/jpWords.js` 作為本 feature 的原始字典來源，在 repo 內轉成 typed data 後使用。
- Rationale: 使用者已明確指定該檔案是字典檔，且其欄位已足以支撐單字、漢字、拼音、中文與 stage 分組需求。正規化後使用，可讓後續 CRUD、測試與表格渲染更穩定。
- Alternatives considered:
  - 直接在 component 內讀 raw JS
    - 拒絕原因：型別不明確，難以做資料驗證與單元測試。
  - 另建全新字典資料
    - 拒絕原因：會偏離使用者指定的唯一資料來源。

## Decision 2: 穩定 `id` 由正規化階段依原始順序補上

- Decision: 字典資料載入時依原始順序補上遞增 `id`，後續註記、搜尋與互動都以該 `id` 為識別值。
- Rationale: `v6/plan.txt` 已明確指出「對每一個資料依序設置 ID 即可」；這樣最簡單、可預測，也足夠支撐 localStorage 只存 `id` 的需求。
- Alternatives considered:
  - 使用 UUID
    - 拒絕原因：增加複雜度，且沒有額外價值。
  - 以 `text + stage` 當 key
    - 拒絕原因：若未來有重複詞形，穩定性與唯一性都較差。

## Decision 3: 註記持久化只儲存 `id` 陣列與必要 metadata

- Decision: localStorage 只保存被註記的字典 `id` 與必要的版本／時間資訊，不存整筆字典內容。
- Rationale: `v6/plan.txt` 已要求避免對 localStorage 負擔太重；`id` 型儲存可直接對應字典資料，讀寫成本低，也方便格式驗證。
- Alternatives considered:
  - 儲存整筆 `VocabularyEntry`
    - 拒絕原因：資料冗餘、容量較大，且與字典主檔容易失同步。
  - 儲存 `text`
    - 拒絕原因：不同 stage 或同形異義詞可能撞名，不如 `id` 穩定。

## Decision 4: 隱藏但保留佔位的欄位使用 table semantics + `visibility: hidden` 類策略

- Decision: 保留原生 `table / thead / tbody` 結構，對於需保留佔位的欄位以 `visibility: hidden` 或等效 Tailwind class 控制內容顯示。
- Rationale: 使用者明確要求有些內容隱藏但仍保留佔位，這是 table fidelity 的核心；直接刪節 DOM 會破壞欄寬、對齊與參考頁版面。
- Alternatives considered:
  - 全部用 `v-if`
    - 拒絕原因：會直接移除 DOM，無法保留佔位。
  - 改用 `div` grid 模擬表格
    - 拒絕原因：與需求指定的 table semantics 不一致，且更難維持 fidelity。

## Decision 5: `/vocabulary` 自己維護 filter pipeline，但共享 `/practice` 的勾選狀態

- Decision: 新增 `useVocabularySession.ts` 或等效 composable，專責處理搜尋字詞、頁內 checkbox、註記與長按狀態；來自 `/practice` 的字母勾選結果只讀取不覆寫。
- Rationale: 這樣能維持 route ownership，同時不重複建立跨 route 的共享狀態來源。
- Alternatives considered:
  - 把 vocabulary filter 直接塞進 `usePracticeSession.ts`
    - 拒絕原因：會污染第一頁狀態責任，違反 route-specific scope。
  - 讓 `/vocabulary` 完全不依賴 `/practice`
    - 拒絕原因：與功能需求直接衝突。

## Decision 6: 長按揭露統一以 pointer events 為主

- Decision: 長按互動以 pointer events 建立統一計時器與 reveal state，必要時補觸控環境保險。
- Rationale: 需求同時要求手機與 PC 支援；pointer events 能以較少分支覆蓋兩種裝置。
- Alternatives considered:
  - 只用 `mousedown` / `mouseup`
    - 拒絕原因：手機支援不完整。
  - 只用 `touchstart` / `touchend`
    - 拒絕原因：桌機支援不完整。

## Decision 7: 參考頁為 fidelity 基準，但驗證方式以本地重建與手動 route 檢查為主

- Decision: 以 `https://psplover16.github.io/Japanese_Word_Practice_Vue/word-practice` 作為 fidelity 基準，但因其為 SPA route，規劃以本地實作 + 手動瀏覽 route 驗證為主，不把靜態 HTML 抓取當唯一依據。
- Rationale: 使用者已提醒這是 SPA 網站，直接抓 route HTML 並不能穩定拿到主內容；因此規格、私有筆記與實際瀏覽路由需一起對照。
- Alternatives considered:
  - 只依賴 route 的原始 HTML
    - 拒絕原因：SPA 下內容可能不在初始 HTML 中，容易誤判。
  - 完全不理會參考頁，只照私有筆記實作
    - 拒絕原因：與「參考頁視為唯一內容基準」衝突。
