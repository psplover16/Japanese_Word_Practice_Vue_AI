import { expect, test } from '@playwright/test';
import { expectNoHorizontalOverflow, expectPrimaryTabs, gotoApp } from './testUtils';

test('單字練習頁可搜尋、持久化註記並支援長按揭露', async ({ page }) => {
  page.on('dialog', async (dialog) => {
    await dialog.accept();
  });

  await gotoApp(page, '/vocabulary');

  await expectPrimaryTabs(page);
  await expect(page.getByTestId('vocabulary-control-bar')).toBeVisible();
  await expect(page.getByTestId('vocabulary-count-summary')).toContainText('1076個單字');

  await page.getByTestId('vocabulary-mark-checkbox-1').check();
  await page.getByTestId('vocabulary-save-marks-button').click();

  await page.reload();
  await expect(page.getByTestId('vocabulary-mark-checkbox-1')).toBeChecked();

  const combinedContent = page.getByTestId('vocabulary-combined-content-1');
  await expect(combinedContent).toHaveClass(/vocabulary-hidden-content/);

  await page.getByTestId('vocabulary-row-1').dispatchEvent('pointerdown');
  await page.waitForTimeout(450);
  await expect(combinedContent).not.toHaveClass(/vocabulary-hidden-content/);

  await page.getByTestId('vocabulary-row-1').dispatchEvent('pointerup');
  await expect(combinedContent).toHaveClass(/vocabulary-hidden-content/);

  await page.getByTestId('vocabulary-search-input').fill('概念');
  await expect(page.getByTestId('vocabulary-count-summary')).not.toContainText('1076個單字');

  await page.setViewportSize({ width: 375, height: 812 });
  await expect(page.getByTestId('vocabulary-control-bar')).toBeVisible();
  await expectNoHorizontalOverflow(page);
});
