import { expect, test } from '@playwright/test';
import { expectNoHorizontalOverflow, expectPrimaryTabs, gotoApp } from './testUtils';

test('375px 下的 /n5-grammar 可展開前兩個區塊、顯示儲存格例句且無瀏覽器錯誤', async ({ page }) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text());
    }
  });

  page.on('pageerror', (error) => {
    pageErrors.push(String(error));
  });

  await page.setViewportSize({ width: 375, height: 900 });
  await gotoApp(page, '/n5-grammar');

  await expectPrimaryTabs(page);
  await expect(page.getByTestId('n5-grammar-view')).toBeVisible();
  await expect(page.getByTestId('n5-grammar-section-polite-overview')).toBeVisible();
  await expect(page.getByTestId('n5-grammar-section-sentence-basics')).toBeVisible();
  await expect(page.getByText('製作中')).toHaveCount(0);

  const politeOverviewToggle = page.getByTestId('n5-grammar-toggle-polite-overview');
  const sentenceBasicsToggle = page.getByTestId('n5-grammar-toggle-sentence-basics');
  await expect(politeOverviewToggle).toHaveAttribute('aria-expanded', 'false');
  await expect(sentenceBasicsToggle).toHaveAttribute('aria-expanded', 'false');

  await politeOverviewToggle.click();
  await expect(politeOverviewToggle).toHaveAttribute('aria-expanded', 'true');

  const overviewSection = page.getByTestId('n5-grammar-section-polite-overview');
  const overviewTable = overviewSection.getByTestId('n5-grammar-compare-table-polite-overview');
  await expect(overviewTable).toBeVisible();
  await expect(overviewTable.getByRole('rowheader', { name: '現在肯定' })).toBeVisible();
  await expect(overviewSection.locator('[data-testid^="n5-grammar-table-example-"]')).toHaveCount(12);
  await expect(overviewSection.getByTestId('n5-grammar-table-example-present-positive-nominal')).toContainText('この部屋は静かです。');

  await sentenceBasicsToggle.click();
  await expect(sentenceBasicsToggle).toHaveAttribute('aria-expanded', 'true');

  const sentenceBasicsSection = page.getByTestId('n5-grammar-section-sentence-basics');
  await expect(sentenceBasicsSection.getByText('名詞與な形容詞的句尾變化與接名詞差異')).toBeVisible();
  await expect(sentenceBasicsSection.getByText('名詞句與な形容詞句')).toBeVisible();
  await expect(sentenceBasicsSection.locator('[data-testid^="n5-grammar-compare-table-"]')).toHaveCount(0);

  await expectNoHorizontalOverflow(page);
  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
});
