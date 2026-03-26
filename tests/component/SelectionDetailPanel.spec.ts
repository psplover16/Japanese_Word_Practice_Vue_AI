import { describe, expect, it } from 'vitest';
import GrammarView from '@/modules/grammar/views/GrammarView.vue';
import { allKanaCells } from '@/modules/practice/data/kanaData';
import { mountWithPracticeSession } from './testUtils';

describe('SelectionDetailPanel', () => {
  it('在第二頁顯示第一頁勾選的實際文字', async () => {
    const targetCell = allKanaCells.find((item) => item.id === 'tableA-ka');

    const { wrapper } = mountWithPracticeSession(GrammarView, (createdSession) => {
      createdSession.toggleKana(targetCell!, true);
      createdSession.enableSokuon.value = true;
    });

    expect(wrapper.find('[data-testid="selection-detail-panel"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('か / カ ka');
    expect(wrapper.text()).toContain('促音');
  });
});
