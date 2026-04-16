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
    const politeOverview = wrapper.get('[data-testid="n5-grammar-section-polite-overview"]');

    expect(politeOverview.find('[data-testid="n5-grammar-compare-table-polite-overview"]').exists()).toBe(true);
    expect(politeOverview.findAll('[data-testid^="n5-grammar-table-example-"]')).toHaveLength(12);
    expect(politeOverview.text()).toContain('對應變化');
    expect(politeOverview.text()).toContain('この部屋は静かです。');
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

  it('新增的邀約與變化表現區塊可依 mode 正確展開', async () => {
    const { wrapper } = mountWithPracticeSession(N5GrammarView);

    const invitationToggle = wrapper.get('[data-testid="n5-grammar-toggle-invitation-comparison"]');
    expect(invitationToggle.attributes('aria-expanded')).toBe('true');
    await wrapper.get('[data-testid="n5-grammar-toggle-state-change-naru"]').trigger('click');

    const invitationSection = wrapper.get('[data-testid="n5-grammar-section-invitation-comparison"]');
    const naruSection = wrapper.get('[data-testid="n5-grammar-section-state-change-naru"]');

    expect(invitationSection.text()).toContain('邀約與勸誘：ませんか 與 ましょう');
    expect(invitationSection.find('[data-testid="n5-grammar-compare-table-invitation-comparison"]').exists()).toBe(true);
    expect(invitationSection.text()).toContain('疲れましたね。ちょっと休みませんか。');
    expect(invitationSection.text()).toContain('一緒に映画を見ない？');
    expect(invitationSection.findAll('[data-testid^="n5-grammar-table-example-"]')).toHaveLength(2);
    expect(invitationSection.find('[data-testid="n5-grammar-topic-mashou-plain-volitional"]').exists()).toBe(true);
    expect(invitationSection.text()).toContain('一緒に帰ろう。');
    expect(invitationSection.text()).toContain('この週末、食事に行きませんか。');
    expect(invitationSection.text()).toContain('山の中ではごみは捨てないで、ちゃんと持って帰りましょう。');

    expect(naruSection.text()).toContain('狀態變化：～くなります / ～になります');
    expect(naruSection.find('[data-testid="n5-grammar-topic-naru-i-adjective"]').exists()).toBe(true);
    expect(naruSection.text()).toContain('髪が長くなりました。');
    expect(naruSection.text()).toContain('辞める / 止める / やめる');
  });
});
