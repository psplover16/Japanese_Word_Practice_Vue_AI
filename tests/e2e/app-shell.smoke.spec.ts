import { expect, test } from '@playwright/test';
import { expectNoHorizontalOverflow, expectPrimaryTabs, gotoApp } from './testUtils';

test('首頁可載入並切換主要導覽', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await gotoApp(page, '/');

  await expect(page).toHaveURL(/\/practice$/);
  await expectPrimaryTabs(page);
  await expect(page.getByTestId('app-header').locator('h1')).toHaveCount(0);
  await expect(page.getByTestId('practice-seion-table')).toBeVisible();

  await page.getByRole('link', { name: '變化規則' }).click();
  await expect(page).toHaveURL(/\/grammar$/);
  await expect(page.getByTestId('grammar-sections')).toBeVisible();

  await page.getByRole('link', { name: 'N5文法' }).click();
  await expect(page).toHaveURL(/\/n5-grammar$/);
  await expect(page.getByTestId('n5-grammar-view')).toContainText('句型與詞類敬體基礎');
  await expect(page.getByTestId('n5-grammar-view')).not.toContainText('製作中');

  await expectPrimaryTabs(page);
  await expectNoHorizontalOverflow(page);
});

test('可直接以網址進入 N5 文法頁', async ({ page }) => {
  await gotoApp(page, '/n5-grammar');

  await expect(page.getByTestId('n5-grammar-view')).toContainText('助詞 は：主題標記與句子焦點');
  await expect(page.getByTestId('n5-grammar-view')).not.toContainText('製作中');
  await expectPrimaryTabs(page);
});
