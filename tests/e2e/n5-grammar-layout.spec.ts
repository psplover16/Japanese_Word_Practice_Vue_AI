import { expect, test } from '@playwright/test';
import { expectNoHorizontalOverflow, expectPrimaryTabs, gotoApp } from './testUtils';

test('375px 下的 /n5-grammar 可展開主要群組且不破版', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await gotoApp(page, '/n5-grammar');

  await expectPrimaryTabs(page);
  await expect(page.getByTestId('n5-grammar-view')).toBeVisible();
  await expect(page.getByTestId('n5-grammar-section-sentence-basics')).toBeVisible();
  await expect(page.getByTestId('n5-grammar-section-particle-wa')).toBeVisible();
  await expect(page.getByText('製作中')).toHaveCount(0);

  await page.getByTestId('n5-grammar-toggle-sentence-basics').click();
  const basicsTable = page.getByTestId('n5-grammar-compare-table-sentence-basics');
  await expect(basicsTable).toBeVisible();
  await expect(basicsTable.getByRole('rowheader', { name: '現在肯定' })).toBeVisible();

  await page.getByTestId('n5-grammar-toggle-particle-wa').click();
  await expect(page.getByText('「は」是主題標記，不一定是主語標記')).toBeVisible();

  await expectNoHorizontalOverflow(page);
});
