import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import PracticeView from '@/modules/practice/views/PracticeView.vue';
import { mountWithPracticeSession } from './testUtils';
import { clearLatestUnknownResults, writeLatestUnknownResults } from '@/modules/exam/storage/latestUnknownResultStorage';

describe('PracticeView', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    clearLatestUnknownResults();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('預設 render 不會出錯，且古語假名位置先顯示 placeholder', () => {
    const { wrapper } = mountWithPracticeSession(PracticeView);

    expect(wrapper.text()).toContain('清音');
    expect(wrapper.text()).toContain('濁音／半濁音');
    expect(wrapper.text()).toContain('撥音的發音規則');
    expect(wrapper.find('[data-testid="selection-detail-panel"]').exists()).toBe(false);
    expect(wrapper.text()).toContain('-');
  });

  it('進入第一頁且已有最近一次結果時會觸發 smooth scroll', async () => {
    vi.useFakeTimers();
    const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);

    writeLatestUnknownResults({
      updatedAt: '2026-03-24T00:00:00.000Z',
      totalUnknownCount: 1,
      results: [
        {
          kanaId: 'tableA-ka',
          hiragana: 'か',
          katakana: 'カ',
          romaji: 'ka',
          count: 1
        }
      ]
    });

    mountWithPracticeSession(PracticeView);
    await vi.runAllTimersAsync();

    expect(scrollSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        behavior: 'smooth'
      })
    );
  });
});
