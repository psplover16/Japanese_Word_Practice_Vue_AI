# 研究紀錄：日語學習 PWA

## 決策 1：以 `publicDir` 直接指向 `_private/_private_fileAssets/public`

- **Decision**: 在 Vite 設定 `publicDir: "_private/_private_fileAssets/public"`，讓 PWA icons 與 `vite.ico` 直接成為公開資產來源。
- **Rationale**: 這可以直接重用既有圖示與 favicon，避免再維護一份複製資產，並符合使用者指定路徑。
- **Alternatives considered**:
  - 複製圖示到新的 `public/`：會增加同步成本。
  - 把圖示改放進 `src/assets/`：不利 manifest 與 favicon 的直接引用。

## 決策 2：PWA 使用 `vite-plugin-pwa` 並採自訂更新控制器

- **Decision**: 使用 `vite-plugin-pwa` 產生 manifest 與 service worker，再由前端模組實作 5 秒提示、立即更新、下次開啟自動套用與快取清理。
- **Rationale**: 這是 Vite 生態中最穩定的 PWA 路徑，可以減少手寫 service worker 的錯誤率，同時保留足夠的更新流程控制能力。
- **Alternatives considered**:
  - 手寫 service worker：可控性高，但維護與測試成本都更高。
  - 只用預設自動更新：會違反「5 秒提示後下次開啟自動套用」的需求。

## 決策 3：跨路由但不跨重整的狀態使用 `provide/inject` store

- **Decision**: 以 `AppShell` 建立 session store，透過 `provide/inject` 提供第一頁可寫、第二與第三頁只讀的共享狀態。
- **Rationale**: 這能滿足跨路由保留但重整後回預設的需求，也避免為小型純前端應用加入額外全域狀態套件。
- **Alternatives considered**:
  - Pinia：可行，但對目前範圍而言屬額外依賴。
  - 模組級單例 reactive 物件：較難清楚區分可寫與只讀介面。

## 決策 4：持久化僅限最新測驗結果與 PWA 更新旗標

- **Decision**: 使用 `localStorage` 保存最近一次測驗結果、PWA 延後更新旗標與版本資訊；勾選狀態與教學顯示開關只存在記憶體。
- **Rationale**: 這可同時滿足「重整後勾選回預設」與「最新測驗結果跨重整保留」兩種不同生命週期。
- **Alternatives considered**:
  - 全部狀態都寫入 `localStorage`：會違反勾選重整回預設。
  - 全部狀態都只存記憶體：會讓最新測驗結果無法跨重整保存。

## 決策 5：教學區塊依獨立驗收要求拆成多個功能單元

- **Decision**: 古語假名開關、撥音、促音、清音拗音、合拗音、外來語擴張、長音規則、特殊音節都拆成獨立 component 與獨立資料來源，並能各自驗收。
- **Rationale**: 這是最新澄清的直接要求，也能降低單一巨型元件造成的維護與回歸風險。
- **Alternatives considered**:
  - 用單一 `PhoneticRuleSection.vue` 接所有區塊：驗收邊界不清楚，容易漏功能。
  - 保留單一資料檔但用不同畫面切片：仍容易讓資料與驗收耦合過重。

## 決策 6：測驗關閉確認與清除結果確認分開建模

- **Decision**: 「結束練習確認」與「清除結果確認」採兩個獨立對話狀態，不共用結果寫入邏輯。
- **Rationale**: 結束未完成測驗不應產生新的結算結果，而清除結果是針對既有資料；兩者混用容易造成誤刪或誤寫。
- **Alternatives considered**:
  - 共用單一 confirm dialog state：可重用 UI，但容易把商業流程耦合在一起。

## 決策 7：抽題策略採「先完整洗牌一輪，再視需要開新輪」

- **Decision**: 先將所有可出題字母隨機洗牌並逐一取題；若題數超過可出題數量，再重新洗牌並開始下一輪。
- **Rationale**: 這能把原本模糊的「盡量覆蓋、維持均衡」轉成具體可測規則。
- **Alternatives considered**:
  - 每題即時 `Math.random()`：容易重複且難保證覆蓋率。
  - 完全禁止重複出題：會違反題數大於題庫時的需求。

## 決策 8：效能預算以 Playwright + Lighthouse 驗證

- **Decision**: 互動延遲與路由切換由 Playwright 量測，頁面整體載入與互動品質由 Lighthouse 驗證。
- **Rationale**: `SC-012` 與 `SC-013` 都需要可觀測量測方式，不能只靠主觀體感驗收。
- **Alternatives considered**:
  - 僅人工測試：不可重現、不可回歸驗證。
  - 僅單元測試：無法反映實際渲染與路由切換時間。
