import { expect, test } from '@playwright/test';
import { expectNoHorizontalOverflow, expectPrimaryTabs, gotoApp } from './testUtils';

test('375px 下的 /n5-grammar 可展開核心區塊並顯示新增邀約與變化表現內容', async ({ page }) => {
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
  await expect(page.getByTestId('n5-grammar-section-invitation-comparison')).toBeVisible();
  await expect(page.getByTestId('n5-grammar-section-state-change-naru')).toBeVisible();
  await expect(page.getByTestId('n5-grammar-section-state-change-suru')).toBeVisible();
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

  const invitationToggle = page.getByTestId('n5-grammar-toggle-invitation-comparison');
  await invitationToggle.scrollIntoViewIfNeeded();
  await expect(invitationToggle).toHaveAttribute('aria-expanded', 'true');

  const invitationSection = page.getByTestId('n5-grammar-section-invitation-comparison');
  await expect(invitationSection.getByTestId('n5-grammar-compare-table-invitation-comparison')).toBeVisible();
  await expect(
    invitationSection.getByTestId('n5-grammar-table-example-invitation-tone-masenka').getByText('疲れましたね。ちょっと休みませんか。')
  ).toBeVisible();
  await expect(
    invitationSection.getByTestId('n5-grammar-topic-invitation-core-difference').getByText('この週末、食事に行きませんか。')
  ).toBeVisible();
  await expect(invitationSection.getByText('一緒に映画を見ない？')).toBeVisible();
  await expect(
    invitationSection.getByTestId('n5-grammar-topic-mashou-plain-volitional').getByText('一緒に帰ろう。', { exact: true })
  ).toBeVisible();
  await expect(
    invitationSection
      .getByTestId('n5-grammar-topic-invitation-core-difference')
      .getByText('山の中ではごみは捨てないで、ちゃんと持って帰りましょう。')
  ).toBeVisible();
  await expect(invitationSection.locator('[data-testid^="n5-grammar-table-example-"]')).toHaveCount(2);

  const naruToggle = page.getByTestId('n5-grammar-toggle-state-change-naru');
  await naruToggle.scrollIntoViewIfNeeded();
  await naruToggle.click();
  await expect(naruToggle).toHaveAttribute('aria-expanded', 'true');

  const naruSection = page.getByTestId('n5-grammar-section-state-change-naru');
  await expect(naruSection.getByText('今日は寒くなりました。')).toBeVisible();
  await expect(naruSection.getByText('辞める / 止める / やめる')).toBeVisible();

  const suruToggle = page.getByTestId('n5-grammar-toggle-state-change-suru');
  await suruToggle.scrollIntoViewIfNeeded();
  await suruToggle.click();
  await expect(suruToggle).toHaveAttribute('aria-expanded', 'true');

  const suruSection = page.getByTestId('n5-grammar-section-state-change-suru');
  await expect(suruSection.getByText('図書館では静かにします。')).toBeVisible();
  await expect(suruSection.getByText('教室では静かにしてください。')).toBeVisible();

  await expectNoHorizontalOverflow(page);
  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
});
