import type { N5GrammarExample } from '@/modules/n5Grammar/types/grammarNotes';

export interface N5GrammarHighlightedPart {
  text: string;
  highlighted: boolean;
}

export function getN5GrammarHighlightedParts(example: N5GrammarExample): N5GrammarHighlightedPart[] {
  const terms = [...(example.highlightTerms ?? [])].filter(Boolean).sort((left, right) => right.length - left.length);

  if (terms.length === 0) {
    return [{ text: example.japanese, highlighted: false }];
  }

  const parts: N5GrammarHighlightedPart[] = [];
  let cursor = 0;

  while (cursor < example.japanese.length) {
    const match = terms.find((term) => example.japanese.startsWith(term, cursor));

    if (match) {
      parts.push({ text: match, highlighted: true });
      cursor += match.length;
      continue;
    }

    parts.push({ text: example.japanese.charAt(cursor), highlighted: false });
    cursor += 1;
  }

  return parts;
}
