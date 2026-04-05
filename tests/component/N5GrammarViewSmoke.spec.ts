import { describe, expect, it } from 'vitest';
import N5GrammarView from '@/modules/n5Grammar/views/N5GrammarView.vue';
import { mountWithPracticeSession } from './testUtils';

describe('N5GrammarViewSmoke', () => {
  it('預設 render 顯示正式 N5 文法群組，且不出現其他 route 的內容', () => {
    const { wrapper } = mountWithPracticeSession(N5GrammarView);

    expect(wrapper.find('[data-testid="n5-grammar-view"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('句型與詞類敬體基礎');
    expect(wrapper.text()).toContain('助詞 は：主題標記與句子焦點');
    expect(wrapper.text()).not.toContain('製作中');
    expect(wrapper.text()).not.toContain('語法系統差異');
    expect(wrapper.text()).not.toContain('單字練習預備區');
    expect(wrapper.find('[data-testid="selection-detail-panel"]').exists()).toBe(false);
  });
});
