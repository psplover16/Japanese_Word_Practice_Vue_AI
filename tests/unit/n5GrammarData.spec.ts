import { describe, expect, it } from 'vitest';
import { n5GrammarSourceCoverage, particleSectionIds, sortedN5GrammarSections } from '@/modules/n5Grammar/data/grammarNotes';

function getSection(sectionId: string) {
  const section = sortedN5GrammarSections.find((entry) => entry.id === sectionId);

  expect(section, `找不到 section: ${sectionId}`).toBeDefined();
  return section!;
}

describe('n5GrammarData', () => {
  it('前兩個核心區塊維持新的排序、命名與內容分工', () => {
    const firstTwoSectionIds = sortedN5GrammarSections.slice(0, 2).map((section) => section.id);
    const politeOverview = getSection('polite-overview');
    const sentenceBasics = getSection('sentence-basics');

    expect(firstTwoSectionIds).toEqual(['polite-overview', 'sentence-basics']);

    expect(politeOverview.title).toBe('敬體變化速覽');
    expect(politeOverview.presentationMode).toBe('compare-table');
    expect(politeOverview.description.length).toBeGreaterThan(0);
    expect(politeOverview.table).toBeDefined();
    expect(politeOverview.topics).toHaveLength(0);
    expect(politeOverview.tableExampleGroups).toHaveLength(12);

    expect(sentenceBasics.title).toBe('敬體句型：現在型與詞類基礎');
    expect(sentenceBasics.presentationMode).toBe('info-stack');
    expect(sentenceBasics.description.length).toBeGreaterThan(0);
    expect(sentenceBasics.table).toBeUndefined();
    expect(sentenceBasics.topics.map((topic) => topic.id)).toEqual(['noun-na-basics', 'i-adjective-basics', 'masu-verb-basics']);
    expect(sentenceBasics.sharedNotes.map((note) => note.id)).toEqual(['nominal-predicate']);
    expect(getSection('past-and-state').title).toBe('敬體句型：過去、狀態與補充表現');
  });

  it('所有教學 topic 都保有摘要、例句與來源對應', () => {
    for (const section of sortedN5GrammarSections) {
      if (section.id === 'polite-overview') {
        expect(section.topics).toHaveLength(0);
        continue;
      }

      expect(section.topics.length).toBeGreaterThan(0);

      for (const topic of section.topics) {
        expect(topic.summary.length).toBeGreaterThan(0);
        expect(topic.examples.length).toBeGreaterThan(0);
        expect(topic.sourceRefs.length).toBeGreaterThan(0);
      }
    }
  });

  it('敬體變化速覽的 12 組儲存格例句完整、唯一，且標記為 supplemental', () => {
    const politeOverview = getSection('polite-overview');
    const table = politeOverview.table!;
    const tableExampleGroups = politeOverview.tableExampleGroups ?? [];
    const rowIds = new Set(table.rows.map((row) => row.id));
    const existingExamples = new Set(
      sortedN5GrammarSections
        .filter((section) => section.id !== 'polite-overview')
        .flatMap((section) => section.topics.flatMap((topic) => topic.examples.map((example) => example.japanese)))
    );
    const overviewExamples = new Set<string>();
    const groupKeys = new Set<string>();

    expect(tableExampleGroups.length).toBe(table.rows.length * (table.columns.length - 1));
    expect(tableExampleGroups.map((group) => group.id)).toEqual([
      'present-positive-nominal',
      'present-negative-nominal',
      'past-positive-nominal',
      'past-negative-nominal',
      'present-positive-i-adjective',
      'present-negative-i-adjective',
      'past-positive-i-adjective',
      'past-negative-i-adjective',
      'present-positive-verb',
      'present-negative-verb',
      'past-positive-verb',
      'past-negative-verb'
    ]);

    for (const group of tableExampleGroups) {
      const groupKey = `${group.rowId}-${group.columnIndex}`;
      groupKeys.add(groupKey);

      expect(rowIds.has(group.rowId)).toBe(true);
      expect(group.columnIndex).toBeGreaterThanOrEqual(0);
      expect(group.columnIndex).toBeLessThan(table.columns.length - 1);
      expect(group.forms.length).toBeGreaterThan(0);
      expect(group.examples.length).toBeGreaterThan(0);

      for (const example of group.examples) {
        expect(example.japanese.trim().length).toBeGreaterThan(0);
        expect(example.reading?.trim().length ?? 0).toBeGreaterThan(0);
        expect(example.translation.trim().length).toBeGreaterThan(0);
        expect(example.origin).toBe('supplemental');
        expect(existingExamples.has(example.japanese)).toBe(false);
        expect(overviewExamples.has(example.japanese)).toBe(false);

        overviewExamples.add(example.japanese);
      }
    }

    expect(groupKeys.size).toBe(tableExampleGroups.length);
  });

  it('助詞群組固定排在最後，順序與來源筆記一致', () => {
    const actualParticleIds = sortedN5GrammarSections.filter((section) => section.category === 'particle').map((section) => section.id);
    const lastSectionIds = sortedN5GrammarSections.slice(-particleSectionIds.length).map((section) => section.id);

    expect(actualParticleIds).toEqual([...particleSectionIds]);
    expect(lastSectionIds).toEqual([...particleSectionIds]);
  });

  it('compare-table 群組都有合法的表格欄位與列資料', () => {
    const compareSections = sortedN5GrammarSections.filter((section) => section.presentationMode === 'compare-table');

    expect(compareSections.length).toBeGreaterThan(0);

    for (const section of compareSections) {
      expect(section.table).toBeDefined();
      expect(section.table!.columns.length).toBeGreaterThan(1);
      expect(section.table!.rows.length).toBeGreaterThan(0);

      for (const row of section.table!.rows) {
        expect(row.values.length).toBe(section.table!.columns.length - 1);
      }
    }
  });

  it('來源覆蓋清單都能對應到已存在的 section 與 topic', () => {
    const sectionIds = new Set(sortedN5GrammarSections.map((section) => section.id));
    const topicIds = new Set(sortedN5GrammarSections.flatMap((section) => section.topics.map((topic) => topic.id)));

    expect(n5GrammarSourceCoverage.length).toBeGreaterThan(0);

    for (const item of n5GrammarSourceCoverage) {
      expect(sectionIds.has(item.mappedSectionId)).toBe(true);
      expect(item.mappedTopicIds.length).toBeGreaterThan(0);
      expect(['covered', 'merged', 'supplemented']).toContain(item.status);

      for (const topicId of item.mappedTopicIds) {
        expect(topicIds.has(topicId)).toBe(true);
      }
    }
  });
});
