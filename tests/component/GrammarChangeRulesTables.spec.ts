import { describe, expect, it } from 'vitest';
import GrammarView from '@/modules/grammar/views/GrammarView.vue';
import { mountWithPracticeSession } from './testUtils';

describe('Grammar change-rules tables', () => {
  it('五段動詞表展開後保留主表、音便表與表尾說明', async () => {
    const { wrapper } = mountWithPracticeSession(GrammarView);

    await wrapper.get('[data-testid="grammar-toggle-godan-table"]').trigger('click');

    const mainTable = wrapper.get('[data-testid="grammar-table-godan-table"]');
    const subTable = wrapper.get('[data-testid="grammar-subtable-godan-table"]');

    expect(mainTable.text()).toContain('五段動詞表(詞尾母音變化)');
    expect(mainTable.text()).toContain('派生可能');
    expect(mainTable.find('td[rowspan]').exists()).toBe(true);
    expect(subTable.text()).toContain('音便 (詞尾接尾一起改變)');
    expect(subTable.text()).toContain('書く→書き→書い(い音便)→書いて/書いた');
    expect(subTable.text()).toContain('以「す」做辭書型詞尾的五段動詞，不發生音便。ex.探す');
  });

  it('カ變動詞與だ助動詞保留多行標題與特殊文字', async () => {
    const { wrapper } = mountWithPracticeSession(GrammarView);

    await wrapper.get('[data-testid="grammar-toggle-kahen-table"]').trigger('click');
    await wrapper.get('[data-testid="grammar-toggle-da-auxiliary-table"]').trigger('click');

    expect(wrapper.get('[data-testid="grammar-table-kahen-table"]').text()).toContain('漢字發音會變動，標註在詞尾');
    expect(wrapper.get('[data-testid="grammar-table-da-auxiliary-table"]').text()).toContain('名詞＋だ (ex.彼は学生だ)');
    expect(wrapper.get('[data-testid="grammar-table-da-auxiliary-table"]').text()).toContain('被修飾');
  });

  it('詞性變化規則展開後顯示巢狀條列與範例', async () => {
    const { wrapper } = mountWithPracticeSession(GrammarView);

    await wrapper.get('[data-testid="grammar-toggle-pos-conversion"]').trigger('click');

    const posTable = wrapper.get('[data-testid="grammar-table-pos-conversion"]');

    expect(posTable.text()).toContain('一. 互轉有兩個層級');
    expect(posTable.text()).toContain('V(普通形)＋こと：把『動作／事情』名詞化');
    expect(posTable.text()).toContain('範例：');
    expect(posTable.text()).toContain('勉強する');
    expect(posTable.find('ol').exists()).toBe(true);
    expect(posTable.find('ul').exists()).toBe(true);
  });
});
