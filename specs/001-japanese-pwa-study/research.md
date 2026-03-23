# Research: 日語學習 PWA

## Decision 1: 前端技術棧採用 Vue 3 + TypeScript + Vite + Tailwind CSS

### Decision

使用 Vue 3 Composition API、TypeScript、Vite 與 Tailwind CSS 建立單一前端專案。

### Rationale

- 與 private `plan.txt` 指定技術一致。
- Vite 對 PWA、TypeScript 與測試工具整合成本低，從零建立專案較快。
- Tailwind 可快速落地 `375px` 優先的 RWD 與大量表格／容器 spacing 規則。

### Alternatives considered

- 使用純 CSS：可行，但在大量小尺寸 spacing 與 responsive state 上維護成本較高。
- 使用其他框架：不符合既定技術規範。

## Decision 2: 第一頁共享勾選狀態以 app-level session store 管理，不跨重新整理保存

### Decision

第一頁勾選狀態、題目範圍、題數與古語假名顯示狀態以 app-level composable 管理，透過 provide/inject 供三個路由共用。

### Rationale

- 符合「跨路由保留、重整後回預設」的需求。
- 第二頁與第三頁只需唯讀共享狀態，不需要額外持久化。

### Alternatives considered

- 把勾選狀態寫入 localStorage：不符合重新整理後回預設的需求。
- 使用第三方狀態管理套件：此案規模小，不需要增加套件。

## Decision 3: 最近一次結算結果以固定 localStorage key 保存

### Decision

把最近一次考試中標記為 `我不清楚` 的假名結果，寫入固定 localStorage key，並在新一輪結算時覆蓋。

### Rationale

- 符合「跨重新整理與重開網站保留，直到下一次結果覆蓋或使用者清除」的需求。
- localStorage 對此小型資料量足夠，實作簡單。

### Alternatives considered

- sessionStorage：無法跨重開網站保留。
- IndexedDB：資料量太小，複雜度過高。

## Decision 4: 表格拆成固定格表與內容撐寬表兩種樣式系統

### Decision

把 `tableA`、`tableB`、拗音類表格視為固定格表；把 `table撥音`、`table促音` 視為內容撐寬表，使用不同 class 與元件約束。

### Rationale

- private 規格已明確指出 `table撥音` / `table促音` 不得沿用固定欄寬。
- 這能直接避免「過度共用樣式」導致規格被覆蓋。

### Alternatives considered

- 所有表格共用同一套 class：最容易違反 `table撥音` / `table促音` 規則。

## Decision 5: 考試流程使用顯式 state machine

### Decision

考試 session 以 `題目索引`、`答案是否揭曉`、`本題是否已記錄我不清楚`、`累積錯誤結果` 組成顯式狀態機。

### Rationale

- 可直接實作 `下一步` 與 `我不清楚` 在答案揭曉前後的不同行為。
- 便於支援「關閉 modal 後也要立即結算」。

### Alternatives considered

- 只靠臨時布林值散落在元件中：容易漏掉中途關閉與同題只記錄一次等邏輯。

## Decision 6: PWA 更新提示採 prompt 模式，並在特定條件下自動套用更新

### Decision

使用 `vite-plugin-pwa` 的 prompt register strategy；當偵測到更新時，只在手機獨立 app 模式顯示底部提示。若本次未更新，記錄待更新狀態，下次開啟網站時自動更新。

### Rationale

- 符合 private `clarify.txt` 的顯示條件與更新策略。
- 可在更新完成後清除 Cache Storage 而保留其他 localStorage。

### Alternatives considered

- 一律立即更新：會違反需要提示與延後到下次重開自動更新的需求。
- 一律顯示提示：會違反只在手機獨立 app 模式顯示的需求。
