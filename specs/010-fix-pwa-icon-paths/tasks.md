# Tasks: 修正網站與 PWA 圖示資產位置

**Input**: Design documents from `/specs/010-fix-pwa-icon-paths/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/public-assets-contract.md, quickstart.md

**Tests**: 本功能要求先補強公開資產位置回歸測試，再調整正式來源與 build 驗證。

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 對齊正式公開資產切換前的共用前置條件

- [x] T001 確認 `.gitignore` 對 `public/` 正式來源檔與可重建產物的忽略策略正確，檔案位於 .gitignore
- [x] T002 [P] 確認 `PROJECT_ARCHITECTURE.md` 與 `specs/009-restore-pwa-assets/spec.md` 的文件回寫目標，依據 specs/010-fix-pwa-icon-paths/plan.md
- [x] T003 [P] 檢查目前公開資產契約假設是否完整，檔案位於 specs/010-fix-pwa-icon-paths/contracts/public-assets-contract.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 先把正式公開資產模型與驗證基礎調整到可支援所有 user story

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 將公開資產位置常數改為標準 `public/` 用法，檔案位於 src/shared/config/publicAssets.ts
- [x] T005 [P] 重整標準公開來源斷言所需的共用回歸測試 helper，檔案位於 tests/unit/publicAssets.spec.ts
- [x] T006 [P] 在 specs/010-fix-pwa-icon-paths/data-model.md 記錄 official-public 與 private-reference 的責任界線

**Checkpoint**: 正式來源模型、測試基礎與契約都已鎖定為根目錄 `public/`

---

## Phase 3: User Story 1 - 正確顯示網站圖示 (Priority: P1) 🎯 MVP

**Goal**: 讓首頁與 build 產物從標準公開位置提供 favicon

**Independent Test**: 執行 `npx vitest run tests/unit/publicAssets.spec.ts` 與 `npm run build`，確認 `public/vite.ico` 存在、首頁仍引用 `/vite.ico`，且 `dist/vite.ico` 會被輸出

### Tests for User Story 1

- [x] T007 [P] [US1] 在 tests/unit/publicAssets.spec.ts 補上 favicon 正式來源位置的回歸斷言
- [x] T008 [P] [US1] 在 tests/unit/publicAssets.spec.ts 補上負向範圍檢查，證明 favicon 不再依賴 `_private/_private_fileAssets/v1/public`

### Implementation for User Story 1

- [x] T009 [US1] 將正式 favicon 複製到 public/vite.ico
- [x] T010 [US1] 簡化 favicon 公開資產設定，檔案位於 vite.config.ts 與 src/shared/config/publicAssets.ts
- [x] T011 [US1] 確認首頁 favicon 預期仍成立，檔案位於 index.html 與 specs/010-fix-pwa-icon-paths/quickstart.md

**Checkpoint**: 首頁 favicon 可從標準 `public/` 來源獨立驗證成功

---

## Phase 4: User Story 2 - 正確提供安裝用圖示 (Priority: P2)

**Goal**: 讓 manifest 與 build 輸出都從標準公開位置提供完整的 PWA icon 組

**Independent Test**: 執行 `npx vitest run tests/unit/publicAssets.spec.ts` 與 `npm run build`，確認 `public/icons/*.png`、`dist/icons/*.png` 與 manifest icon 路徑都正確

### Tests for User Story 2

- [x] T012 [P] [US2] 在 tests/unit/publicAssets.spec.ts 補上 `public/icons/*.png` 的 manifest 來源與輸出斷言
- [x] T013 [P] [US2] 在 tests/unit/publicAssets.spec.ts 補上回歸檢查，證明 manifest icon 項目不再指向 `_private/` 路徑

### Implementation for User Story 2

- [x] T014 [P] [US2] 將 180px 的 PWA icon 複製到 public/icons/180.png
- [x] T015 [P] [US2] 將 192px 的 PWA icon 複製到 public/icons/192.png
- [x] T016 [P] [US2] 將 512px 的 PWA icon 複製到 public/icons/512.png
- [x] T017 [US2] 更新 PWA icon 描述與公開資產預期，檔案位於 src/shared/config/publicAssets.ts 與 vite.config.ts

**Checkpoint**: PWA 安裝圖示與 manifest 已完全改由標準 `public/` 來源提供

---

## Phase 5: User Story 3 - 穩定完成部署驗證 (Priority: P3)

**Goal**: 讓後續維護者能穩定驗證 build 與部署輸出，並清楚知道正式公開資產責任已轉移

**Independent Test**: 執行 `npx vitest run tests/unit/publicAssets.spec.ts`、根路徑 `npm run build`、子路徑 build，並檢查文件已說明 `public/` 為唯一正式來源

### Tests for User Story 3

- [x] T018 [P] [US3] 在 tests/unit/publicAssets.spec.ts 補上根路徑與子路徑下 `dist/index.html`、`dist/manifest.webmanifest` 的輸出穩定性檢查
- [x] T019 [P] [US3] 透過 tests/component/RouteOwnership.spec.ts 再次確認功能未出現在範圍外 UI surface

### Implementation for User Story 3

- [x] T020 [US3] 更新標準公開資產於根路徑與子路徑部署下的驗證與交接步驟，檔案位於 specs/010-fix-pwa-icon-paths/quickstart.md
- [x] T021 [US3] 將正式公開資產行為回寫到 specs/009-restore-pwa-assets/spec.md
- [x] T022 [US3] 更新公開資產責任文件，檔案位於 PROJECT_ARCHITECTURE.md

**Checkpoint**: build、部署驗證與文件責任都已明確轉向標準 `public/`

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 最終整合、驗證與規格一致性確認

- [x] T023 [P] 同步最終驗證說明，檔案位於 specs/010-fix-pwa-icon-paths/plan.md 與 specs/010-fix-pwa-icon-paths/quickstart.md
- [x] T024 [P] 重新檢查契約與資料模型文字，檔案位於 specs/010-fix-pwa-icon-paths/contracts/public-assets-contract.md 與 specs/010-fix-pwa-icon-paths/data-model.md
- [x] T025 執行公開資產回歸驗證，檔案位於 tests/unit/publicAssets.spec.ts 與 package.json
- [x] T026 [P] 重新確認根路徑與 staging 子路徑的 build 輸出可發布性，檔案位於 scripts/publishPages.mjs 與 vite.config.ts

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1) 無依賴，可立即開始
- Foundational (Phase 2) 依賴 Setup 完成，會阻擋所有 user story
- User Stories (Phase 3-5) 依賴 Foundational 完成，建議依 P1 → P2 → P3 執行
- Polish (Phase 6) 依賴所有 user story 完成

### User Story Dependencies

- US1 是 MVP，先把 favicon 正式來源改到 `public/vite.ico`
- US2 建立在 US1 的正式公開位置策略之上，擴展到 PWA icons 與 manifest
- US3 建立在 US1/US2 已完成的輸出之上，補齊部署驗證、負向範圍檢查與文件回寫

### Within Each User Story

- 先寫測試並確認它們能描述新的正式公開位置
- 再複製圖示資產到標準 `public/` 位置
- 最後調整設定與文件，並以 build 輸出收尾

## Parallel Opportunities

- T002 與 T003 可與 T001 並行
- T005 與 T006 可在 T004 的方向確立後並行
- US2 的三個圖示複製任務 T014、T015、T016 可並行處理
- T023、T024、T026 可在功能完成後並行整理

## Parallel Example: User Story 2

```text
Task: "Copy the 180px PWA icon into public/icons/180.png"
Task: "Copy the 192px PWA icon into public/icons/192.png"
Task: "Copy the 512px PWA icon into public/icons/512.png"
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. 完成 Setup 與 Foundational
2. 完成 US1 測試與 favicon 正式來源切換
3. 驗證首頁與 build 已從 `public/vite.ico` 提供 favicon

### Incremental Delivery

1. 先建立 `public/` 正式來源與 favicon 回歸保護
2. 再補齊 `public/icons/*.png` 與 manifest
3. 最後完成部署驗證與文件回寫

## Notes

- `[P]` tasks 代表檔案或責任可平行處理，但同一檔案整合仍需依序完成
- 本功能的負向範圍是 `src/modules/practice/`、`src/modules/grammar/`、`src/modules/vocabulary/` 與既有路由互動
- 所有規格、計畫、quickstart 與文件回寫都必須維持繁體中文
