import { expect, test } from '@playwright/test';
import { gotoApp } from './testUtils';

test('第一頁可啟動最小出題流程', async ({ page }) => {
  await gotoApp(page, '/practice');

  await page.getByTestId('toggle-all-kana').click();
  await page.getByTestId('question-count-input').getByRole('spinbutton').fill('3');

  const startExamButton = page.getByTestId('start-exam-button');
  await expect(startExamButton).toBeEnabled();
  await startExamButton.click();

  await expect(page.getByTestId('exam-modal')).toBeVisible();
  await expect(page.getByTestId('exam-actions')).toBeVisible();
  await expect(page.getByTestId('exam-next-button')).toBeVisible();
});
