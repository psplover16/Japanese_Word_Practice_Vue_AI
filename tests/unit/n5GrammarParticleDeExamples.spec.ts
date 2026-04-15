import { describe, expect, it } from 'vitest';
import { sortedN5GrammarSections } from '@/modules/n5Grammar/data/grammarNotes';

describe('n5Grammar particle-de examples', () => {
  it('keeps the requested transportation examples and the 徒歩 noun reminder', () => {
    const section = sortedN5GrammarSections.find((entry) => entry.id === 'particle-de');

    expect(section).toBeDefined();

    const topic = section!.topics.find((entry) => entry.id === 'de-transportation');

    expect(topic).toBeDefined();

    const exampleSentences = topic!.examples.map((example) => example.japanese);

    expect(exampleSentences).toContain('電車で会社へ行きます。');
    expect(exampleSentences).toContain('自転車でここへ来ました。');
    expect(exampleSentences).toContain('飛行機で行きますか。車で行きますか。それとも、バイクで行きますか。');
    expect(exampleSentences).toContain('もう時間がありませんから、タクシーで行きましょう。');
    expect(exampleSentences).toContain('私は大阪から船で行きます。');
    expect(exampleSentences).toContain('駅から学校まで徒歩で行きます。');

    expect(topic!.details.some((detail) => detail.includes('徒歩'))).toBe(true);
    expect(topic!.details.some((detail) => detail.includes('歩いて'))).toBe(true);
  });
});
