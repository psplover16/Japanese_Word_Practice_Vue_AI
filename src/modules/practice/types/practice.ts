export type TableKey = 'tableA' | 'tableB';

export interface KanaCell {
  id: string;
  table: TableKey;
  rowKey: string;
  columnKey: string;
  romaji: string;
  hiragana: string;
  katakana: string;
  archaic?: boolean;
  selectable?: boolean;
}

export interface KanaMatrixRow {
  rowKey: string;
  label: string;
  cells: Array<KanaCell | null>;
}

export interface TableHeaderOption {
  key: string;
  label: string;
}

export interface ExampleRuleRow {
  label: string;
  values: string[];
}

export interface SpecialSyllableNote {
  kana: string;
  romaji: string;
  description: string;
}

export interface CheckboxOption {
  id: string;
  label: string;
}

export interface SelectionDetailItem {
  id: string;
  label: string;
  kind: 'kana' | 'option';
}
