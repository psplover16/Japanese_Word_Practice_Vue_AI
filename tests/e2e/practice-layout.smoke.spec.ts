import { expect, test } from '@playwright/test';
import { expectNoHorizontalOverflow, expectPrimaryTabs, gotoApp } from './testUtils';

test('375px 下的 /practice 首屏可讀且下半部區塊穩定顯示', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await gotoApp(page, '/practice');

  await expect(page.getByTestId('app-header')).toContainText('50音');
  await expectPrimaryTabs(page);
  await expect(page.getByTestId('practice-reference-sections')).toBeVisible();
  await expect(page.getByTestId('seion-yoon-section')).toBeVisible();
  await expect(page.getByTestId('dakuon-yoon-section')).toBeVisible();
  await expect(page.getByTestId('loanword-section')).toBeVisible();
  await expect(page.getByTestId('choon-section')).toBeVisible();
  await expect(page.getByTestId('loanword-section')).toContainText('ファ');
  await expect(page.getByTestId('choon-section')).toContainText('ケーキ');

  await expectNoHorizontalOverflow(page);
});
