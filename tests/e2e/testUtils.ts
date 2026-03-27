import { expect, type Page } from '@playwright/test';

export async function gotoApp(page: Page, path = '/'): Promise<void> {
  await page.goto(path);
  await expect(page.getByTestId('app-shell')).toBeVisible();
}

export async function expectPrimaryTabs(page: Page): Promise<void> {
  await expect(page.getByRole('link', { name: '字母練習' })).toBeVisible();
  await expect(page.getByRole('link', { name: '變化規則' })).toBeVisible();
  await expect(page.getByRole('link', { name: '單字練習' })).toBeVisible();
}

export async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(hasOverflow).toBe(false);
}
