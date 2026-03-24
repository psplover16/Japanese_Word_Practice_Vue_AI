import { expect, test } from '@playwright/test';
import { expectPrimaryTabs, gotoApp } from './testUtils';

test('首頁可載入並切換主要導覽', async ({ page }) => {
  await gotoApp(page, '/');

  await expect(page).toHaveURL(/\/practice$/);
  await expect(page.getByTestId('app-header')).toContainText('50音');
  await expectPrimaryTabs(page);

  await page.getByRole('link', { name: '變化規則' }).click();

  await expect(page).toHaveURL(/\/grammar$/);
  await expect(page.getByTestId('app-header')).toContainText('變化規則');
  await expectPrimaryTabs(page);
});
