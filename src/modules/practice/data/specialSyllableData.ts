import type { CheckboxOption, ExampleRuleRow, SpecialSyllableNote } from '@/modules/practice/types/practice';

export const checkboxGroupAOptions: CheckboxOption[] = [
  { id: 'include-hiragana', label: '題目包含：平假名' },
  { id: 'include-katakana', label: '題目包含：片假名' },
  { id: 'select-all', label: '全選／全不選' },
  { id: 'select-dakuon', label: '濁音／半濁音' },
  { id: 'sokuon', label: '促音' },
  { id: 'yoon-choon', label: '拗音／合拗音／長音符' },
  { id: 'archaic', label: '古語假名' }
];

export const hatsuonRows: ExampleRuleRow[] = [
  {
    label: 'ん / ン',
    values: ['さんぽ（sanpo）：散步', 'しんぶん（shinbun）：報紙', 'てんき（tenki）：天氣']
  }
];

export const sokuonRows: ExampleRuleRow[] = [
  {
    label: 'っ / ッ',
    values: ['がっこう（gakkou）：學校', 'きって（kitte）：郵票', 'ざっし（zasshi）：雜誌']
  }
];

export const seionYoonRows: ExampleRuleRow[] = [
  { label: 'き / キ', values: ['きゃ / キャ', 'きゅ / キュ', 'きょ / キョ'] },
  { label: 'し / シ', values: ['しゃ / シャ', 'しゅ / シュ', 'しょ / ショ'] },
  { label: 'ち / チ', values: ['ちゃ / チャ', 'ちゅ / チュ', 'ちょ / チョ'] },
  { label: 'に / ニ', values: ['にゃ / ニャ', 'にゅ / ニュ', 'にょ / ニョ'] },
  { label: 'ひ / ヒ', values: ['ひゃ / ヒャ', 'ひゅ / ヒュ', 'ひょ / ヒョ'] },
  { label: 'み / ミ', values: ['みゃ / ミャ', 'みゅ / ミュ', 'みょ / ミョ'] },
  { label: 'り / リ', values: ['りゃ / リャ', 'りゅ / リュ', 'りょ / リョ'] }
];

export const dakuonYoonRows: ExampleRuleRow[] = [
  { label: 'ぎ / ギ', values: ['ぎゃ / ギャ', 'ぎゅ / ギュ', 'ぎょ / ギョ'] },
  { label: 'じ / ジ', values: ['じゃ / ジャ', 'じゅ / ジュ', 'じょ / ジョ'] },
  { label: 'び / ビ', values: ['びゃ / ビャ', 'びゅ / ビュ', 'びょ / ビョ'] },
  { label: 'ぴ / ピ', values: ['ぴゃ / ピャ', 'ぴゅ / ピュ', 'ぴょ / ピョ'] }
];

export const loanwordRows: ExampleRuleRow[] = [
  { label: 'ティ / ti', values: ['ティー', 'パーティー', 'シティ'] },
  { label: 'ファ / fa', values: ['ファイル', 'カフェ', 'ソファ'] },
  { label: 'チェ / che', values: ['チェック', 'チェア', 'スケジュール'] }
];

export const choonRuleRows: ExampleRuleRow[] = [
  { label: '外來語通常使用長音符ー', values: ['ケーキ', 'スーパー', 'コーヒー'] },
  { label: 'え段假名 + い', values: ['せんせい', 'えいが', 'とけい'] },
  { label: 'お段假名 + う', values: ['とうきょう', 'がっこう', 'どうぶつ'] },
  { label: '同一母音連續', values: ['おおきい', 'にいさん', 'ちいさい'] },
  { label: 'あ段 + う 不一定屬於規則長音', values: ['かう → 買う（歷史用例）', '特殊詞彙需個別記憶'] }
];

export const specialSyllableNotes: SpecialSyllableNote[] = [
  {
    kana: 'ゔ / ヴ',
    romaji: 'vu',
    description: '主要出現在外來語與近代記音，日常詞彙中不常見。'
  },
  {
    kana: 'を / ヲ',
    romaji: 'wo',
    description: '現代日語多作助詞使用，實際發音常接近 o。'
  },
  {
    kana: 'ぢ / ヂ、づ / ヅ',
    romaji: 'di / du',
    description: '常見於連濁或固定詞，現代拼寫與讀音需搭配單字一起記。'
  }
];
