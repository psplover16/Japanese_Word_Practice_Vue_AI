import { describe, expect, it } from 'vitest';
import N5GrammarView from '@/modules/n5Grammar/views/N5GrammarView.vue';
import { mountWithPracticeSession } from './testUtils';

describe('N5GrammarSections', () => {
  it('敬體變化速覽預設收合，展開後顯示 compare table 與 12 組儲存格例句', async () => {
    const { wrapper } = mountWithPracticeSession(N5GrammarView);
    const toggle = wrapper.get('[data-testid="n5-grammar-toggle-polite-overview"]');
    const body = wrapper.find('[data-testid="n5-grammar-body-polite-overview"]');

    expect(wrapper.get('[data-testid="n5-grammar-title-polite-overview"]').text()).toBe('敬體變化速覽');
    expect(wrapper.get('[data-testid="n5-grammar-title-sentence-basics"]').text()).toBe('敬體句型：現在型與詞類基礎');
    expect(toggle.attributes('aria-expanded')).toBe('false');
    expect(body.attributes('style')).toContain('display: none;');

    await toggle.trigger('click');

    expect(toggle.attributes('aria-expanded')).toBe('true');
    expect(body.attributes('style') ?? '').not.toContain('display: none;');
    expect(wrapper.find('[data-testid="n5-grammar-compare-table-polite-overview"]').exists()).toBe(true);
    expect(wrapper.findAll('[data-testid^="n5-grammar-table-example-"]')).toHaveLength(12);
    expect(wrapper.text()).toContain('對應變化');
    expect(wrapper.text()).toContain('この部屋は静かです。');
  });

  it('不同 section 仍依 mode 顯示對應 renderer，且 sentence-basics 不再有 compare table', async () => {
    const { wrapper } = mountWithPracticeSession(N5GrammarView);
    const sentenceBasics = wrapper.get('[data-testid="n5-grammar-section-sentence-basics"]');

    await wrapper.get('[data-testid="n5-grammar-toggle-sentence-basics"]').trigger('click');
    await wrapper.get('[data-testid="n5-grammar-toggle-particle-wa"]').trigger('click');
    await wrapper.get('[data-testid="n5-grammar-toggle-particle-mo"]').trigger('click');

    expect(sentenceBasics.text()).toContain('名詞與な形容詞的句尾變化與接名詞差異');
    expect(sentenceBasics.find('[data-testid="n5-grammar-topic-noun-na-basics"]').exists()).toBe(true);
    expect(sentenceBasics.find('[data-testid="n5-grammar-compare-table-sentence-basics"]').exists()).toBe(false);
    expect(wrapper.find('[data-testid="n5-grammar-topic-wa-topic-marker"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="n5-grammar-compare-table-particle-mo"]').exists()).toBe(true);
  });
});
