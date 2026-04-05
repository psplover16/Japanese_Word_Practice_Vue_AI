import { describe, expect, it } from 'vitest';
import N5GrammarView from '@/modules/n5Grammar/views/N5GrammarView.vue';
import { mountWithPracticeSession } from './testUtils';

describe('N5GrammarSections', () => {
  it('預設先顯示群組標題，展開後才顯示說明與內容', async () => {
    const { wrapper } = mountWithPracticeSession(N5GrammarView);
    const toggle = wrapper.get('[data-testid="n5-grammar-toggle-sentence-basics"]');
    const body = wrapper.find('[data-testid="n5-grammar-body-sentence-basics"]');

    expect(wrapper.find('[data-testid="n5-grammar-section-sentence-basics"]').exists()).toBe(true);
    expect(toggle.attributes('aria-expanded')).toBe('false');
    expect(body.attributes('style')).toContain('display: none;');

    await toggle.trigger('click');

    expect(toggle.attributes('aria-expanded')).toBe('true');
    expect(body.attributes('style') ?? '').not.toContain('display: none;');
    expect(wrapper.find('[data-testid="n5-grammar-description-sentence-basics"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="n5-grammar-compare-table-sentence-basics"]').exists()).toBe(true);
  });

  it('依群組內容型態顯示 compare-table、bullet-list 與 info-stack', async () => {
    const { wrapper } = mountWithPracticeSession(N5GrammarView);

    await wrapper.get('[data-testid="n5-grammar-toggle-particle-wa"]').trigger('click');
    await wrapper.get('[data-testid="n5-grammar-toggle-particle-mo"]').trigger('click');
    await wrapper.get('[data-testid="n5-grammar-toggle-past-and-state"]').trigger('click');

    expect(wrapper.find('[data-testid="n5-grammar-topic-wa-topic-marker"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('主題標記');
    expect(wrapper.find('[data-testid="n5-grammar-compare-table-particle-mo"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('原本助詞');
    expect(wrapper.find('[data-testid="n5-grammar-topic-verb-past"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('動詞過去敬體與完成語感');
  });
});
