import { describe, expect, it } from 'vitest';
import {
  conjugationMeaningRules,
  godanTableSpec,
  grammarSections,
  inflectionTableSpecs,
  posConversionSections,
  systemDifferenceRows,
  verbClassificationRules
} from '@/modules/grammar/data/changeRules';

describe('changeRules data', () => {
  it('grammar section 順序與 id 唯一且共 11 個', () => {
    expect(grammarSections).toHaveLength(11);

    const ids = grammarSections.map((section) => section.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids[0]).toBe('system-difference');
    expect(ids.at(-1)).toBe('pos-conversion');
  });

  it('關鍵 payload 完整存在', () => {
    expect(systemDifferenceRows).toHaveLength(10);
    expect(conjugationMeaningRules.length).toBeGreaterThanOrEqual(5);
    expect(verbClassificationRules.length).toBeGreaterThanOrEqual(5);
    expect(godanTableSpec.soundChangeRows).toHaveLength(3);
    expect(Object.keys(inflectionTableSpecs)).toEqual(['ichidan', 'sahen', 'kahen', 'iAdjective', 'naiAdjective', 'daAuxiliary']);
    expect(posConversionSections.length).toBeGreaterThanOrEqual(7);
  });
});
