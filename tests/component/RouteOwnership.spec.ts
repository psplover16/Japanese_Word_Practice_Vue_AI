import { describe, expect, it } from 'vitest';
import PracticeView from '@/modules/practice/views/PracticeView.vue';
import GrammarView from '@/modules/grammar/views/GrammarView.vue';
import VocabularyView from '@/modules/vocabulary/views/VocabularyView.vue';
import { mountWithPracticeSession } from './testUtils';

describe('route ownership', () => {
  it('第一頁不得顯示共享明細 panel', () => {
    const { wrapper } = mountWithPracticeSession(PracticeView);
    expect(wrapper.find('[data-testid="selection-detail-panel"]').exists()).toBe(false);
  });

  it('第二頁與第三頁必須顯示共享明細 panel', () => {
    const grammar = mountWithPracticeSession(GrammarView).wrapper;
    const vocabulary = mountWithPracticeSession(VocabularyView).wrapper;

    expect(grammar.find('[data-testid="selection-detail-panel"]').exists()).toBe(true);
    expect(vocabulary.find('[data-testid="selection-detail-panel"]').exists()).toBe(true);
  });
});
