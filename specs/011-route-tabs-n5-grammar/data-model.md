# Data Model: 路由切換與 N5 文法入口優化

## Overview

本 feature 不新增後端資料或持久化狀態；主要資料模型屬於共享導覽設定、route ownership 與局部排版規則。目標是讓新的主路由與 UI 約束能被清楚實作、測試與回寫文件。

## Entities

### PrimaryRouteTab

- Purpose: 定義共享頁首中的一個主路由按鈕。
- Fields:
  - `to`: 導向的 route path。
  - `label`: 按鈕顯示文字。
  - `order`: 在 tabs 中的固定順序。
  - `activeMatch`: 判定 active 狀態所依據的 path。
- Relationships:
  - 多個 `PrimaryRouteTab` 共同組成 `RouteTabs` 的顯示順序。
- Validation Rules:
  - `order` 必須唯一。
  - `N5文法` 的 `order` 必須緊接在 `單字練習` 後。

### HeaderNavigationLayout

- Purpose: 描述共享頁首的版面約束。
- Fields:
  - `showRouteTitle`: 是否顯示舊的 route title 區塊。
  - `align`: tabs 群組的主要對齊方式。
  - `allowWrap`: 是否允許多列換行。
  - `buttonTextWrap`: 每顆按鈕文字是否允許斷行。
  - `fontScale`: tabs 文字相對於目前版本的放大倍率。
- Validation Rules:
  - `showRouteTitle` 在本 feature 中必須為 `false`。
  - `allowWrap` 必須為 `true`。
  - `buttonTextWrap` 必須為 `false`。
  - `fontScale` 目標為約 `1.15`。

### PracticeTableTypographyRule

- Purpose: 定義 `/practice` 指定表格的字級調整範圍。
- Fields:
  - `surface`: 被調整的畫面區塊，例如清音表、濁音／半濁音表。
  - `fontScale`: 相對於現況的放大倍率。
  - `ownership`: 是否只限於 `/practice`。
  - `allowedCompanions[]`: 允許一起微調的輔助排版屬性，例如 `line-height`、`padding`。
- Validation Rules:
  - `surface` 只允許指向本次明示的兩個表格。
  - `fontScale` 目標為約 `1.1`。
  - 不得將規則套用到 `/grammar`、`/vocabulary` 或 exam modal。

### N5PlaceholderRoute

- Purpose: 表示新的 `N5文法` route 及其初期狀態。
- Fields:
  - `path`: 新 route path。
  - `label`: 對應 tabs 顯示文字。
  - `headline`: 首屏主要占位文案。
  - `module`: 所屬 route-specific 模組位置。
  - `defaultState`: 初始顯示狀態。
- Validation Rules:
  - `headline` 必須為 `製作中`。
  - `defaultState` 必須是 render-safe placeholder，而不是空白容器。
  - 不得共用既有 `/grammar` 的規則內容資料。

## Derived View Rules

- `PrimaryRouteTab[]`
  - 由 `RouteTabs.vue` 渲染為四個主路由按鈕。
- `HeaderNavigationLayout`
  - 由 `AppShell.vue` 與 `RouteTabs.vue` 共同實現。
- `PracticeTableTypographyRule`
  - 由 `PracticeView.vue` 的結構與 `main.css` 的 route-specific selector 實現。
- `N5PlaceholderRoute`
  - 由 `router.ts` 與 `N5GrammarView.vue` 共同實現。

## Validation Notes

- 主路由按鈕順序、標籤與 active 行為必須在 component / e2e 測試中可直接驗證。
- 共享頁首在 `320px` 至 `375px` 寬度下不得出現水平溢出或按鈕內文字換行。
- `N5PlaceholderRoute` 必須支援直接網址進入。
- `PracticeTableTypographyRule` 必須只影響明示表格，且放大後不得造成對齊破壞。
