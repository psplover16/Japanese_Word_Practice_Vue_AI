# 研究紀錄：日語學習 PWA

## 決策 1：以 `publicDir` 直接指向 `_private/_private_fileAssets/public`

- **Decision**: 在 Vite 設定 `publicDir: "_private/_private_fileAssets/public"`，讓 PWA icons 與 `vite.ico` 直接成為公開資產來源。
- **Rationale**: 這可以直接重用既有圖示與 favicon，避免多一份複製後的資產，並符合使用者指定路徑。
- **Alternatives considered**:
  - 複製圖示到新的 `public/`：會增加資產同步成本。
  - 把圖示改放進 `src/assets/`：不利於 manifest 與 favicon 的直接引用。

## 決策 2：PWA 使用 `vite-plugin-pwa` 並採自訂更新控制器

- **Decision**: 使用 `vite-plugin-pwa` 產生 manifest 與 service worker，再由前端模組實作 5 秒提示、立即更新、下次開啟自動套用與快取清理。
- **Rationale**: 這是 Vite 生態中最穩定的 PWA 路徑，可以減少手寫 service worker 的錯誤率，同時保留足夠的更新流程控制能力。
- **Alternatives considered**:
  - 手寫 service worker：可控性高，但維護成本與測試成本都更高。
  - 只用預設自動更新：會違反「5 秒提示後下次開啟自動套用」的需求。

## 決策 3：跨路由但不跨重整的狀態使用 `provide/inject` store

- **Decision**: 以 `AppShell` 建立 session store，透過 `provide/inject` 提供第一頁可寫、第二與第三頁只讀的共享狀態。
- **Rationale**: 這能滿足跨路由保留但重整後回預設的需求，也避免為小型純前端應用加入額外全域狀態套件。
- **Alternatives considered**:
  - Pinia：可行，但對目前範圍而言屬額外依賴。
  - 模組級單例 reactive 物件：較難清楚區分可寫與只讀介面。

## 決策 4：持久化僅限最新測驗結果與 PWA 更新旗標

- **Decision**: 使用 `localStorage` 保存最近一次測驗結果、PWA 延後更新旗標與版本資訊；勾選狀態只存在記憶體。
- **Rationale**: 這可同時滿足「重整後勾選回預設」與「最新測驗結果跨重整保留」兩種不同生命週期。
- **Alternatives considered**:
  - 全部狀態都寫入 `localStorage`：會違反勾選重整回預設。
  - 全部狀態都只存記憶體：會讓最新測驗結果無法跨重整保存。

## 決策 5：靜態內容拆分為 JSON 檔

- **Decision**: 將清音/濁音表、發音規則、範例字與特殊音節整理為 JSON 檔，由模組在執行時載入。
- **Rationale**: 資料與 UI 解耦後，更容易測試、擴充與調整內容，未來新增第二、第三頁資料也可沿用。
- **Alternatives considered**:
  - 直接寫死在 component：開發快，但不利維護。
  - 用 TypeScript 常數：型別較方便，但內容編修不如 JSON 清楚。

## 決策 6：測試分層為單元、元件、整合與 E2E

- **Decision**: 採 Vitest + Vue Test Utils + Playwright。
- **Rationale**: 字數統計、抽題邏輯與 storage parsing 適合單元測試；表格與 modal 適合元件測試；離線與更新流程需要 Playwright。
- **Alternatives considered**:
  - 只做單元測試：無法覆蓋 service worker 與離線生命週期。
  - 只做 E2E：回饋速度慢，不利迭代。
