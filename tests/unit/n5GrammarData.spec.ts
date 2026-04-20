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
    expect(sentenceBasics.description).toBe('');
    expect(sentenceBasics.table).toBeUndefined();
    expect(sentenceBasics.topics.map((topic) => topic.id)).toEqual(['noun-na-basics', 'i-adjective-basics', 'masu-verb-basics']);
    expect(sentenceBasics.sharedNotes.map((note) => note.id)).toEqual(['noun-modifier-comparison', 'nominal-predicate']);
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

  it('sentence-basics 把名詞修飾名詞與な形容詞修飾名詞的比較放在 sharedNotes', () => {
    const sentenceBasics = getSection('sentence-basics');
    const topic = sentenceBasics.topics.find((entry) => entry.id === 'noun-na-basics');

    expect(topic).toBeDefined();
    expect(topic!.sharedNoteIds).toContain('noun-modifier-comparison');

    const note = sentenceBasics.sharedNotes.find((entry) => entry.id === 'noun-modifier-comparison');

    expect(note).toBeDefined();
    expect(note!.content).toContain('「日本人の子供」');
    expect(note!.content).toContain('名詞修飾名詞');
    expect(note!.content).toContain('「元気な子供」');
    expect(note!.content).toContain('な形容詞修飾名詞');
  });

  it('past-and-state 把 する → します → しました 抽成 sharedNote', () => {
    const section = getSection('past-and-state');
    const note = section.sharedNotes.find((entry) => entry.id === 'suru-polite-past');

    expect(note).toBeDefined();
    expect(note!.content).toContain('する');
    expect(note!.content).toContain('します');
    expect(note!.content).toContain('しました');
    expect(section.topics.find((entry) => entry.id === 'verb-past')?.sharedNoteIds).toEqual([]);
    expect(section.topics.find((entry) => entry.id === 'nominal-past')?.sharedNoteIds).toContain('suru-polite-past');
  });

  it('i-adjective-past 保留過去形加 から 表示原因的例句', () => {
    const section = getSection('past-and-state');
    const topic = section.topics.find((entry) => entry.id === 'i-adjective-past');
    const example = topic?.examples.find((entry) => entry.id === 'i-past-busy');

    expect(example).toBeDefined();
    expect(example!.japanese).toContain('ですから');
    expect(example!.note).toContain('原因');
    expect(example!.note).toContain('結果');
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

  it('particle-he 包含常見搭配動詞與北上例句', () => {
    const section = getSection('particle-he');
    const topic = section.topics.find((entry) => entry.id === 'he-common-collocations');

    expect(topic).toBeDefined();
    expect(topic!.details).toEqual([
      '行きます（いきます）：去',
      '来ます（きます）：來',
      '帰ります（かえります）：回去／回家',
      '向かいます（むかいます）：朝……前進、出發前往',
      '戻ります（もどります）：返回、回去',
      '走ります（はしります）：跑向……',
      '飛びます（とびます）：飛往……',
      '進みます（すすみます）：前進、邁向',
      '出発します（しゅっぱつします）：出發前往',
      '引っ越します（ひっこします）：搬家到……',
      '旅行します（りょこうします）：旅行到……',
      '送ります（おくります）：寄送到……'
    ]);
    expect(topic!.examples).toHaveLength(12);
    expect(topic!.examples.map((example) => example.japanese)).toContain('台風は北へ進んでいます。');
  });
});

describe('015 particle-to（助詞と）', () => {
  it('particleSectionIds 包含 particle-to 且 section 可以 id 查找', () => {
    expect(particleSectionIds).toContain('particle-to');
    const section = sortedN5GrammarSections.find((s) => s.id === 'particle-to');
    expect(section).toBeDefined();
    expect(section!.order).toBe(97);
    expect(section!.category).toBe('particle');
  });

  it('particle-to 的 sharedNotes 含 to-noun-listing 且內容非空', () => {
    const section = sortedN5GrammarSections.find((s) => s.id === 'particle-to')!;
    const note = section.sharedNotes.find((n) => n.id === 'to-noun-listing');
    expect(note).toBeDefined();
    expect(note!.content.length).toBeGreaterThan(0);
    const topic = section.topics.find((t) => t.id === 'to-action-partner')!;
    expect(topic.sharedNoteIds).toContain('to-noun-listing');
  });

  it('topic to-action-partner 有至少 2 個 examples，所有 origin 均為 supplemental，details 至少 2 條', () => {
    const section = sortedN5GrammarSections.find((s) => s.id === 'particle-to')!;
    const topic = section.topics.find((t) => t.id === 'to-action-partner')!;
    expect(topic.examples.length).toBeGreaterThanOrEqual(2);
    for (const example of topic.examples) {
      expect(example.origin).toBe('supplemental');
    }
    expect(topic.details.length).toBeGreaterThanOrEqual(2);
  });
});

describe('015 particle-de（助詞で）', () => {
  it('section particle-de 可以 id 查找，order=98，category=particle，sharedNotes 含 de-with-mo', () => {
    const section = sortedN5GrammarSections.find((s) => s.id === 'particle-de');
    expect(section).toBeDefined();
    expect(section!.order).toBe(98);
    expect(section!.category).toBe('particle');
    const note = section!.sharedNotes.find((n) => n.id === 'de-with-mo');
    expect(note).toBeDefined();
    expect(note!.content.length).toBeGreaterThan(0);
  });

  it('topic de-transportation 有至少 2 個 examples，所有 origin 均為 supplemental，details 至少 2 條', () => {
    const section = sortedN5GrammarSections.find((s) => s.id === 'particle-de')!;
    const topic = section.topics.find((t) => t.id === 'de-transportation')!;
    expect(topic.examples.length).toBeGreaterThanOrEqual(2);
    for (const example of topic.examples) {
      expect(example.origin).toBe('supplemental');
    }
    expect(topic.details.length).toBeGreaterThanOrEqual(2);
  });
});

describe('015 US3 排列順序與來源覆蓋', () => {
  it('particleSectionIds 末尾依序為 particle-to 然後 particle-de', () => {
    const ids = [...particleSectionIds];
    expect(ids.at(-2)).toBe('particle-to');
    expect(ids.at(-1)).toBe('particle-de');
  });

  it('sortedN5GrammarSections 中所有 particle 類別排在所有 core 類別之後，且 particle-to order 小於 particle-de', () => {
    const sections = sortedN5GrammarSections;
    const lastCoreIndex = sections.map((s) => s.category).lastIndexOf('core');
    const firstParticleIndex = sections.map((s) => s.category).indexOf('particle');
    expect(firstParticleIndex).toBeGreaterThan(lastCoreIndex);

    const to = sections.find((s) => s.id === 'particle-to')!;
    const de = sections.find((s) => s.id === 'particle-de')!;
    expect(to.order).toBeLessThan(de.order);
  });

  it('n5GrammarSourceCoverage 含 note-v14-ch1 與 note-v14-ch2，mappedSectionId 與 status 正確', () => {
    const ch1 = n5GrammarSourceCoverage.find((item) => item.sourceId === 'note-v14-ch1');
    const ch2 = n5GrammarSourceCoverage.find((item) => item.sourceId === 'note-v14-ch2');
    expect(ch1).toBeDefined();
    expect(ch1!.mappedSectionId).toBe('particle-to');
    expect(ch1!.status).toBe('supplemented');
    expect(ch2).toBeDefined();
    expect(ch2!.mappedSectionId).toBe('particle-de');
    expect(ch2!.status).toBe('supplemented');
  });
});

describe('016 邀約與變化表現 core sections', () => {
  it('在既有三個 core 區塊後新增 3 個 core sections，且順序正確', () => {
    const coreSections = sortedN5GrammarSections.filter((section) => section.category === 'core');

    expect(coreSections.map((section) => section.id)).toEqual([
      'polite-overview',
      'sentence-basics',
      'past-and-state',
      'invitation-comparison',
      'state-change-naru',
      'state-change-suru'
    ]);

    expect(coreSections.map((section) => section.order)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('invitation-comparison 合併比較表與 ～ましょう 補充，並保留兩邊例句', () => {
    const section = getSection('invitation-comparison');
    const topic = section.topics.find((entry) => entry.id === 'invitation-core-difference');
    const restExample = section.tableExampleGroups
      ?.find((group) => group.id === 'invitation-tone-masenka')
      ?.examples.find((example) => example.id === 'invitation-tone-masenka-example');

    expect(section.presentationMode).toBe('compare-table');
    expect(typeof section.description).toBe('string');
    expect(section.table).toBeDefined();
    expect(section.tableExampleGroups).toHaveLength(2);
    expect(section.sharedNotes.map((note) => note.id)).toContain('invitation-plain-form-note');
    expect(section.topics.map((entry) => entry.id)).toEqual([
      'invitation-core-difference',
      'mashou-plain-volitional'
    ]);
    expect(topic).toBeDefined();
    expect(topic!.sourceRefs).toEqual(['note-v15-ch1', 'note-v15-ch4']);
    expect(topic!.sharedNoteIds).toContain('invitation-plain-form-note');
    expect(section.topics.find((entry) => entry.id === 'mashou-plain-volitional')?.sharedNoteIds).toEqual([
      'invitation-plain-form-note',
      'mashou-vs-masenka'
    ]);
    expect(topic?.examples.map((example) => example.japanese)).toContain('この週末、食事に行きませんか。');
    expect(topic?.examples.map((example) => example.japanese)).toContain('一緒に映画を見ない？');
    expect(topic?.examples.map((example) => example.japanese)).toContain('一緒に帰りましょう。');
    expect(topic?.examples.map((example) => example.japanese)).toContain('まずビールを注文しましょう。');
    expect(topic?.examples.map((example) => example.japanese)).toContain(
      '山の中ではごみは捨てないで、ちゃんと持って帰りましょう。'
    );
    expect(topic?.details.some((detail) => detail.includes('食べます。→ 食べませんか。'))).toBe(true);
    expect(topic?.details.some((detail) => detail.includes('食べます。→ 食べましょう。'))).toBe(true);
    expect(
      section.topics
        .find((entry) => entry.id === 'mashou-plain-volitional')
        ?.examples.find((example) => example.id === 'mashou-volitional-plain-example')?.note
    ).toContain('普通體意向形');
    expect(restExample?.japanese).toContain('ちょっと');
    expect(restExample?.japanese.toLowerCase()).not.toContain('chotto');
    expect(restExample?.note).toContain('chotto');
  });

  it('state-change-naru 與 state-change-suru 都完整保留三種詞類接續', () => {
    const naru = getSection('state-change-naru');
    const suru = getSection('state-change-suru');

    expect(naru.presentationMode).toBe('info-stack');
    expect(naru.topics.map((topic) => topic.id)).toEqual(['naru-i-adjective', 'naru-na-adjective', 'naru-noun']);
    expect(naru.sharedNotes.map((note) => note.id)).toContain('naru-yameru-note');
    expect(naru.topics.find((topic) => topic.id === 'naru-noun')?.sharedNoteIds).toContain('naru-yameru-note');
    expect(naru.topics.find((topic) => topic.id === 'naru-i-adjective')?.examples.map((example) => example.japanese)).toContain('髪が長くなりました。');
    expect(naru.topics.find((topic) => topic.id === 'naru-noun')?.examples.map((example) => example.japanese)).toContain('将来、医者になりたいです。');
    expect(naru.topics.find((topic) => topic.id === 'naru-noun')?.examples.map((example) => example.japanese)).toContain('消費税が十パーセントになりましたね。');

    expect(suru.presentationMode).toBe('info-stack');
    expect(suru.topics.map((topic) => topic.id)).toEqual(['suru-i-adjective', 'suru-na-adjective', 'suru-noun-choice']);
    expect(suru.topics.find((topic) => topic.id === 'suru-i-adjective')?.examples.map((example) => example.japanese)).toContain('髪を短くします。');
    expect(suru.topics.find((topic) => topic.id === 'suru-na-adjective')?.examples.map((example) => example.japanese)).toContain('教室では静かにしてください。');
    expect(suru.topics.find((topic) => topic.id === 'suru-noun-choice')?.examples.map((example) => example.japanese)).toContain('晩ご飯はカレーライスにします。');
  });

  it('source coverage 新增 note-v15-ch1 到 note-v15-ch4，且都映射到正確 section', () => {
    expect(n5GrammarSourceCoverage.find((item) => item.sourceId === 'note-v15-ch1')).toMatchObject({
      mappedSectionId: 'invitation-comparison',
      mappedTopicIds: ['invitation-core-difference'],
      status: 'supplemented'
    });
    expect(n5GrammarSourceCoverage.find((item) => item.sourceId === 'note-v15-ch2')).toMatchObject({
      mappedSectionId: 'state-change-naru',
      mappedTopicIds: ['naru-i-adjective', 'naru-na-adjective', 'naru-noun'],
      status: 'supplemented'
    });
    expect(n5GrammarSourceCoverage.find((item) => item.sourceId === 'note-v15-ch3')).toMatchObject({
      mappedSectionId: 'state-change-suru',
      mappedTopicIds: ['suru-i-adjective', 'suru-na-adjective', 'suru-noun-choice'],
      status: 'supplemented'
    });
    expect(n5GrammarSourceCoverage.find((item) => item.sourceId === 'note-v15-ch4')).toMatchObject({
      mappedSectionId: 'invitation-comparison',
      mappedTopicIds: ['invitation-core-difference', 'mashou-plain-volitional'],
      status: 'supplemented'
    });
  });
});
