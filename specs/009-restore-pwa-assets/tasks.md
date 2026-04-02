# Tasks: 補回網站 Icon 與 PWA 資產

**Input**: Design documents from `/specs/009-restore-pwa-assets/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/public-assets-contract.md, quickstart.md

**Tests**: 本功能要求先補上對公開資產來源與 build 輸出的驗證，再進行設定修正。

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 建立公開資產驗證所需的檔案與共用檢查基礎

- [x] T001 Create public asset regression test scaffold in tests/unit/publicAssets.spec.ts
- [x] T002 [P] Verify current ignore coverage remains valid for build artifacts in .gitignore
- [x] T003 [P] Confirm whether `PROJECT_ARCHITECTURE.md` and originating PWA spec require write-back in PROJECT_ARCHITECTURE.md and specs/001-japanese-pwa-study/spec.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 建立資產來源與 build 驗證的共用模型

- [x] T004 Implement reusable asset existence helpers and fixture expectations in tests/unit/publicAssets.spec.ts
- [x] T005 [P] Inspect and document current public asset source mismatch in specs/009-restore-pwa-assets/research.md and specs/009-restore-pwa-assets/plan.md

**Checkpoint**: 測試與規格都已鎖定「公開資產來源失配」這個核心問題

---

## Phase 3: User Story 1 - 桌面瀏覽器顯示正確網站 Icon (Priority: P1)

**Goal**: 讓首頁與 build 產物都包含桌面瀏覽器可用的正確 favicon

**Independent Test**: 執行 `npx vitest run tests/unit/publicAssets.spec.ts` 與 `npm run build`，確認首頁引用的 favicon 路徑正確，且 `dist/vite.ico` 存在

### Tests for User Story 1

- [x] T006 [P] [US1] Add favicon source and output regression tests in tests/unit/publicAssets.spec.ts
- [x] T007 [P] [US1] Add negative-ownership checks proving favicon no longer points at missing public paths in tests/unit/publicAssets.spec.ts

### Implementation for User Story 1

- [x] T008 [US1] Update public asset source configuration for favicon delivery in vite.config.ts
- [x] T009 [US1] Verify favicon output contract and homepage linkage through build validation in specs/009-restore-pwa-assets/quickstart.md

**Checkpoint**: 桌面 icon 問題可獨立驗證並修正

---

## Phase 4: User Story 2 - 支援 PWA 的環境可辨識安裝資產 (Priority: P2)

**Goal**: 讓 manifest 與安裝圖示指向可公開存取且實際存在的資產

**Independent Test**: 執行 `npx vitest run tests/unit/publicAssets.spec.ts` 與 `npm run build`，確認 `dist/manifest.webmanifest` 與 `dist/icons/*` 都符合契約

### Tests for User Story 2

- [x] T010 [P] [US2] Add manifest icon path and output presence tests in tests/unit/publicAssets.spec.ts
- [x] T011 [P] [US2] Add regression checks for all required PWA icon files in tests/unit/publicAssets.spec.ts

### Implementation for User Story 2

- [x] T012 [US2] Update PWA public asset source and icon inclusion rules in vite.config.ts
- [x] T013 [US2] Validate manifest/icon output against specs/009-restore-pwa-assets/contracts/public-assets-contract.md

**Checkpoint**: PWA 安裝資產可獨立驗證並對外可見

---

## Phase 5: User Story 3 - 發布後資產不再遺失 (Priority: P3)

**Goal**: 讓本地 build 與部署路徑都穩定引用正確的公開資產來源，避免每次發版再次遺失

**Independent Test**: 執行 `npm run build`，確認 `dist/index.html`、`dist/manifest.webmanifest`、`dist/vite.ico`、`dist/icons/*` 都穩定存在

### Tests for User Story 3

- [x] T014 [P] [US3] Add build-output stability checks for icon and manifest artifacts in tests/unit/publicAssets.spec.ts

### Implementation for User Story 3

- [x] T015 [US3] Update build verification guidance and deployment-facing documentation in specs/009-restore-pwa-assets/quickstart.md
- [x] T016 [US3] Ensure originating PWA behavior spec stays authoritative in specs/001-japanese-pwa-study/spec.md

**Checkpoint**: build 與發布後的 icon/PWA 資產穩定性有文件與驗證共同保護

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 文件同步、架構更新與最終驗證

- [x] T017 [P] Update architecture documentation for public asset source responsibility in PROJECT_ARCHITECTURE.md
- [x] T018 [P] Sync final implementation details back into specs/009-restore-pwa-assets/spec.md, specs/009-restore-pwa-assets/plan.md, and specs/009-restore-pwa-assets/quickstart.md
- [x] T019 [P] Record consistency findings in specs/009-restore-pwa-assets/analyze.md
- [x] T020 Run public asset regression tests and build validation via tests/unit/publicAssets.spec.ts and package.json scripts

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1) 無依賴，可立即開始
- Foundational (Phase 2) 依賴 Setup 完成，會阻擋所有 user story
- User Stories 依賴 Foundational 完成，建議依 P1 → P2 → P3 執行
- Polish (Phase 6) 依賴所有 user story 完成

### User Story Dependencies

- US1 是 MVP，先修正 favicon
- US2 依賴相同的公開資產來源修正，再擴展到 manifest 與 PWA icons
- US3 建立在 US1/US2 已修正的設定之上，補齊穩定驗證與規格回寫

### Within Each User Story

- 先寫測試並確認需求被明確鎖定
- 再修公開資產設定
- 最後以 build 與文件驗證收尾

## Parallel Opportunities

- T002、T003 可與 T001 並行
- T005 可與 T004 並行
- 每個 user story 中標記 `[P]` 的測試任務可並行準備
- T017、T018、T019 可在功能完成後並行整理

## Parallel Example: User Story 2

```text
Task: "Add manifest icon path and output presence tests in tests/unit/publicAssets.spec.ts"
Task: "Add regression checks for all required PWA icon files in tests/unit/publicAssets.spec.ts"
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. 完成 Setup 與 Foundational
2. 完成 US1 測試與 favicon 修正
3. 驗證桌面 icon 已恢復

### Incremental Delivery

1. 先修 favicon
2. 再修 manifest 與 PWA icons
3. 最後補 build 穩定性與文件回寫

## Notes

- `[P]` tasks 代表可以平行準備，但同一檔案實作仍需依序整合
- 所有規格與文件回寫都必須保持繁體中文
- `src/modules/*` 的既有頁面與互動屬負向範圍，不應因本功能被修改
