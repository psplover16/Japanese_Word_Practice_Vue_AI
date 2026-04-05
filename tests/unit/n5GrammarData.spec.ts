import { describe, expect, it } from 'vitest';
import { n5GrammarSourceCoverage, particleSectionIds, sortedN5GrammarSections } from '@/modules/n5Grammar/data/grammarNotes';

describe('n5GrammarData', () => {
  it('每個主題都有說明與至少一個例句', () => {
    for (const section of sortedN5GrammarSections) {
      expect(section.description.length).toBeGreaterThan(0);
      expect(section.topics.length).toBeGreaterThan(0);

      for (const topic of section.topics) {
        expect(topic.summary.length).toBeGreaterThan(0);
        expect(topic.examples.length).toBeGreaterThan(0);
        expect(topic.sourceRefs.length).toBeGreaterThan(0);
      }
    }
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
