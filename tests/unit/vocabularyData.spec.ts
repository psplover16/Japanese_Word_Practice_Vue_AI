import { describe, expect, it } from 'vitest';
import { rawVocabularyEntries, vocabularyEntries, vocabularyStageGroups } from '@/modules/vocabulary/data/jpWords';

describe('vocabulary data', () => {
  it('將字典正規化為穩定 id 與 stage 分組', () => {
    expect(rawVocabularyEntries).toHaveLength(1076);
    expect(vocabularyEntries).toHaveLength(1076);
    expect(vocabularyEntries[0]?.id).toBe(1);
    expect(vocabularyEntries.at(-1)?.id).toBe(1076);
    expect(vocabularyStageGroups).toHaveLength(19);
    expect(vocabularyStageGroups[0]?.stage).toBe('Stage1_基礎生活');
    expect(vocabularyStageGroups.at(-1)?.stage).toBe('Stage5_抽象核心');
  });
});
