import { describe, expect, it } from 'vitest';
import PracticeView from '@/modules/practice/views/PracticeView.vue';
import GrammarView from '@/modules/grammar/views/GrammarView.vue';
import VocabularyView from '@/modules/vocabulary/views/VocabularyView.vue';
import N5GrammarView from '@/modules/n5Grammar/views/N5GrammarView.vue';
import { mountWithPracticeSession } from './testUtils';

describe('route ownership', () => {
  it('第一頁不得顯示共享明細 panel', () => {
    const { wrapper } = mountWithPracticeSession(PracticeView);
    expect(wrapper.find('[data-testid="selection-detail-panel"]').exists()).toBe(false);
    expect(wrapper.find('[data-testid="choon-section"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="loanword-section"]').exists()).toBe(true);
  });

  it('文法頁、單字頁與 N5 文法頁各自維持正確 ownership', () => {
    const grammar = mountWithPracticeSession(GrammarView).wrapper;
    const vocabulary = mountWithPracticeSession(VocabularyView).wrapper;
    const n5Grammar = mountWithPracticeSession(N5GrammarView).wrapper;

    expect(grammar.find('[data-testid="selection-detail-panel"]').exists()).toBe(false);
    expect(vocabulary.find('[data-testid="selection-detail-panel"]').exists()).toBe(false);
    expect(n5Grammar.find('[data-testid="selection-detail-panel"]').exists()).toBe(false);
    expect(grammar.find('[data-testid="choon-section"]').exists()).toBe(false);
    expect(grammar.find('[data-testid="loanword-section"]').exists()).toBe(false);
    expect(vocabulary.find('[data-testid="choon-section"]').exists()).toBe(false);
    expect(vocabulary.find('[data-testid="loanword-section"]').exists()).toBe(false);
    expect(n5Grammar.find('[data-testid="choon-section"]').exists()).toBe(false);
    expect(n5Grammar.find('[data-testid="loanword-section"]').exists()).toBe(false);
    expect(grammar.text()).toContain('語法系統差異');
    expect(grammar.text()).toContain('詞性變化規則');
    expect(vocabulary.find('[data-testid="vocabulary-control-bar"]').exists()).toBe(true);
    expect(vocabulary.find('[data-testid="vocabulary-table"]').exists()).toBe(true);
    expect(vocabulary.text()).not.toContain('單字練習預備區');
    expect(vocabulary.text()).not.toContain('語法系統差異');
    expect(n5Grammar.find('[data-testid="n5-grammar-view"]').exists()).toBe(true);
    expect(n5Grammar.text()).toContain('製作中');
    expect(n5Grammar.text()).not.toContain('語法系統差異');
    expect(n5Grammar.text()).not.toContain('單字練習預備區');
  });
});
