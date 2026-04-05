import type { N5GrammarSection, N5GrammarSourceCoverageItem } from '@/modules/n5Grammar/types/grammarNotes';

export const particleSectionIds = ['particle-wa', 'particle-ga', 'particle-wo', 'particle-mo', 'particle-no', 'particle-ni', 'particle-he', 'particle-ka'] as const;

export const n5GrammarSections: N5GrammarSection[] = [
  {
    id: 'sentence-basics',
    title: '句型與詞類敬體基礎',
    description: '',
    presentationMode: 'compare-table',
    order: 1,
    category: 'core',
    sharedNotes: [
      {
        id: 'nominal-predicate',
        title: '名詞句與な形容詞句',
        content: '名詞與な形容詞放在句尾時，敬體變化相同，都用「です／じゃありません／でした／じゃありませんでした」。'
      }
    ],
    table: {
      columns: ['變化項目', '名詞 / な形容詞', 'い形容詞', '動詞'],
      rows: [
        { id: 'present-positive', label: '現在肯定', values: ['です', 'いです', 'ます'] },
        { id: 'present-negative', label: '現在否定', values: ['じゃありません。\nではありません', 'くないです', 'ません'] },
        { id: 'past-positive', label: '過去肯定', values: ['でした', 'かったです', 'ました'] },
        { id: 'past-negative', label: '過去否定', values: ['じゃありませんでした。\nではありませんでした', 'くなかったです', 'ませんでした'] }
      ]
    },
    topics: [
      {
        id: 'noun-na-basics',
        title: '名詞與な形容詞的句尾變化與接名詞差異',
        summary: '名詞與な形容詞放在句尾時都能用「です」說明身分或狀態；但接在名詞前面時，な形容詞要加「な」，一般名詞則直接接續。',
        details: [
          '「日本人の子供」是名詞修飾名詞',
          '「元気な子供」則是な形容詞修飾名詞。'
        ],
        sourceRefs: ['note-ch1-noun-positive-negative', 'note-ch1-na-adjective-positive-negative'],
        sharedNoteIds: ['nominal-predicate'],
        examples: [
          {
            id: 'noun-student-positive',
            japanese: '私は学生です。',
            reading: 'わたし は がくせい です。',
            translation: '我是學生。',
            origin: 'source'
          },
          {
            id: 'noun-student-negative',
            japanese: '私は学生じゃありません。',
            reading: 'わたし は がくせい じゃありません。',
            translation: '我不是學生。',
            note: '',
            origin: 'source'
          },
          {
            id: 'na-town-negative',
            japanese: 'この町はにぎやかじゃありません。',
            reading: 'この まち は にぎやか じゃありません。',
            translation: '這個城鎮不熱鬧。',
            origin: 'source'
          },
          {
            id: 'na-kirei-flower',
            japanese: 'これは綺麗な花です。。',
            reading: 'これ は きれいな はな です。',
            translation: '這是漂亮的花。',
            note: '「綺麗（きれい）」雖然字面以 い 結尾，但實際上屬於な形容詞。',
            origin: 'supplemental'
          }
        ]
      },
      {
        id: 'i-adjective-basics',
        title: 'い形容詞的基本肯定與否定',
        summary: 'い形容詞放在句尾時直接接「です」；做否定時要先把詞尾「い」改成「く」，再接「ないです」。',
        details: [
          '「いいです」與「よいです」在現在肯定都可以使用，但做變化時統一以「よい」系列活用。',
          '因此現在否定要說「よくないです」，不是「いいくないです」。'
        ],
        sourceRefs: ['note-ch1-i-adjective-positive-negative'],
        sharedNoteIds: [],
        examples: [
          {
            id: 'i-oishii-positive',
            japanese: '台湾料理はおいしいです。',
            reading: 'たいわんりょうり は おいしい です。',
            translation: '台灣料理很好吃。',
            origin: 'source'
          },
          {
            id: 'i-oishii-negative',
            japanese: '台湾料理はおいしくないです。',
            reading: 'たいわんりょうり は おいしくない です。',
            translation: '台灣料理不好吃。',
            origin: 'source'
          },
          {
            id: 'i-yoi-variants',
            japanese: 'この本はいいです。 / この本はよいです。 / この本はよくないです。',
            reading: 'この ほん は いい です。 / この ほん は よい です。 / この ほん は よくない です。',
            translation: '這本書很好。／這本書很好。／這本書不好。',
            note: '用同一組例句展示 いい／よい 與其否定形。',
            origin: 'supplemental'
          }
        ]
      },
      {
        id: 'masu-verb-basics',
        title: '動詞ます形可表現在、習慣與已安排的未來',
        summary: '動詞的敬體基本型是「ます」。它除了能說現在正在進行的習慣，也常用來表達已安排的未來動作。',
        details: [],
        sourceRefs: ['note-ch1-verb-present-future'],
        sharedNoteIds: [],
        examples: [
          {
            id: 'masu-hatarakimasu',
            japanese: '明日、働きます。',
            reading: 'あした、はたらきます。',
            translation: '明天要工作。',
            origin: 'source'
          },
          {
            id: 'masu-hatarakimasen',
            japanese: '明日、働きません。',
            reading: 'あした、はたらきません。',
            translation: '明天不工作。',
            origin: 'source'
          },
          {
            id: 'masu-hospital',
            japanese: '明日、病院へ行きます。',
            reading: 'あした、びょういん へ いきます。',
            translation: '明天要去醫院。',
            origin: 'supplemental'
          },
          {
            id: 'masu-habit',
            japanese: '毎日、7時に起きます。',
            reading: 'まいにち、しちじ に おきます。',
            translation: '每天七點起床。',
            note: '屬於習慣性動作，語意是平常就會這樣做。',
            origin: 'source'
          }
        ]
      }
    ]
  },
  {
    id: 'past-and-state',
    title: '過去、狀態與補充表現',
    description: '過去敬體、狀態持續與常見補充語法。「發生過」、「當時的狀態」與「原因」。',
    presentationMode: 'info-stack',
    order: 2,
    category: 'core',
    sharedNotes: [
      {
        id: 'te-iru-state',
        title: '～ている / ～ていました',
        content: '除了表示進行，還常用來表達某種狀態正在持續；放到過去時，就能描述「當時正處於那個狀態」。'
      },
      {
        id: 'kara-reason',
        title: '～から',
        content: '「から」接在句子後面可以表示原因，相當於「因為……所以……」。'
      }
    ],
    topics: [
      {
        id: 'verb-past',
        title: '動詞過去敬體與完成語感',
        summary: '動詞的敬體過去形是「ました」，可用來表示過去做了某件事，也能表示某件事已經完成。',
        details: [],
        sourceRefs: ['note-ch6-verb-past-positive-negative'],
        sharedNoteIds: [],
        examples: [
          {
            id: 'past-movie',
            japanese: '昨日、映画を見ました。',
            reading: 'きのう、えいが を みました。',
            translation: '昨天看了電影。',
            origin: 'source'
          },
          {
            id: 'past-cooking-done',
            japanese: '料理ができました。',
            reading: 'りょうり が できました。',
            translation: '料理做好了。',
            note: '「できました」依語境可解讀成「做好了／完成了」',
            origin: 'source'
          },
          {
            id: 'past-tempura',
            japanese: '上野で友達といっしょに天ぷらを食べました。',
            reading: 'うえの で ともだち と いっしょに てんぷら を たべました。',
            translation: '在上野和朋友一起吃了天婦羅。',
            note: '句中同時出現場所助詞「で」、共同動作者「と」與副詞「いっしょに」。',
            origin: 'source'
          }
        ]
      },
      {
        id: 'nominal-past',
        title: '名詞與な形容詞的過去說法',
        summary: '名詞與な形容詞的過去敬體都用「でした / じゃありませんでした」，差別仍然只在接名詞時是否需要加「な」。',
        details: [],
        sourceRefs: ['note-ch5-noun-past', 'note-ch7-na-adjective-past'],
        sharedNoteIds: [],
        examples: [
          {
            id: 'nominal-past-student',
            japanese: '学生でした。 / 学生じゃありませんでした。',
            reading: 'がくせい でした。 / がくせい じゃありませんでした。',
            translation: '以前是學生。／以前不是學生。',
            origin: 'source'
          },
          {
            id: 'na-past-river',
            japanese: 'この川は昔、とてもきれいでした。',
            reading: 'この かわ は むかし、とても きれい でした。',
            translation: '這條河以前非常漂亮。',
            origin: 'source'
          },
          {
            id: 'na-past-flower-viewing',
            japanese: '昨日、お花見をしました。とてもきれいでした。',
            reading: 'きのう、おはなみ を しました。とても きれい でした。',
            translation: '昨天去賞花了。非常漂亮。',
            note: '「でした」是在描述當時的感想。\n「きれい」是在描述過去的動作。',
            origin: 'source'
          },
          {
            id: 'na-past-traffic',
            japanese: '駅ができるまえ、ここは交通が便利じゃありませんでした。',
            reading: 'えき が できる まえ、ここ は こうつう が べんり じゃありませんでした。',
            translation: '在車站建好以前，這裡的交通不方便。',
            note: '「じゃありませんでした」是回顧過去某段時間的狀態。',
            origin: 'source'
          }
        ]
      },
      {
        id: 'i-adjective-past',
        title: 'い形容詞過去肯定與否定',
        summary: 'い形容詞要變成過去肯定時，把詞尾「い」改成「かったです」；要變成過去否定時，則改成「くなかったです」。',
        details: [
          '「いいです」的過去與否定仍然走「よい」系列，所以要說「よかったです / よくなかったです」。',
          '這一類句子也常與「から」連用，表達造成後句動作的原因。'
        ],
        sourceRefs: ['note-ch8-i-adjective-past'],
        sharedNoteIds: ['kara-reason'],
        examples: [
          {
            id: 'i-past-unagi',
            japanese: 'うなぎは昔、とても安かったです。',
            reading: 'うなぎ は むかし、とても やすかった です。',
            translation: '鰻魚以前非常便宜。',
            origin: 'source'
          },
          {
            id: 'i-past-oishii',
            japanese: '昨日、うなぎを食べました。とてもおいしかったです。',
            reading: 'きのう、うなぎ を たべました。とても おいしかった です。',
            translation: '昨天吃了鰻魚，非常好吃。',
            origin: 'source'
          },
          {
            id: 'i-past-busy',
            japanese: '先週は忙しかったですから、どこも行きませんでした。',
            reading: 'せんしゅう は いそがしかった です から、どこも いきませんでした。',
            translation: '上週因為很忙，哪裡都沒去。',
            origin: 'source'
          }
        ]
      },
      {
        id: 'continuous-state',
        title: '～ていました 與持續狀態',
        summary: '「～ていました」常用來描述過去某一時點正在持續的狀態，而不只是單純說動作「正在做」。',
        details: [],
        sourceRefs: ['note-ch2-wa-relative-clause', 'note-ch7-te-iru-state'],
        sharedNoteIds: ['te-iru-state'],
        examples: [
          {
            id: 'continuous-cold',
            japanese: '先生は風邪をひいていました。',
            reading: 'せんせい は かぜ を ひいていました。',
            translation: '老師那時感冒了。',
            note: '「風邪をひく」是固定搭配，表示感冒。',
            origin: 'source'
          },
          {
            id: 'continuous-live',
            japanese: '私が住んでいるアパートの大家さんの子供は小学生です。',
            reading: 'わたし が すんでいる アパート の おおやさん の こども は しょうがくせい です。',
            translation: '我住的公寓房東的小孩是小學生。',
            note: '這個例句同時示範修飾子句中的主語常用「が」\n「住む → 住んでいる」也示範了五段動詞接「ている」的用法。',
            origin: 'source'
          },
          {
            id: 'continuous-reason',
            japanese: '先週はとても暇でしたから、たくさん本を読みました。',
            reading: 'せんしゅう は とても ひま でした から、たくさん ほん を よみました。',
            translation: '上週因為很閒，所以讀了很多書。',
            note: '「から」表示原因。',
            origin: 'source'
          }
        ]
      }
    ]
  },
  {
    id: 'particle-wa',
    title: '助詞 は：主題標記與句子焦點',
    description: '把筆記中與「は」有關的主題概念、主題與主語的差異、主語省略與修飾子句說明整理在同一組，方便建立整體觀念。',
    presentationMode: 'bullet-list',
    order: 90,
    category: 'particle',
    sharedNotes: [
      {
        id: 'wa-pronunciation',
        title: '寫作與發音的例外',
        content: '助詞「は」寫作は、發音讀わ；方向助詞「へ」則寫作へ、發音讀え。'
      }
    ],
    topics: [
      {
        id: 'wa-topic-marker',
        title: '「は」是主題標記，不一定是主語標記',
        summary: '「A は B です」的重點是「關於 A，現在要說明 B」。因此「は」標記的是主題，而不是機械式地等於主語。',
        details: [
          '放在「は」前面的，常常是整個名詞塊，而不是單獨一個名詞。',
          '理解成「關於 A 這件事」比單純背成「主詞助詞」更不容易誤會。'
        ],
        sourceRefs: ['note-ch2-wa-core'],
        sharedNoteIds: ['wa-pronunciation'],
        examples: [
          {
            id: 'wa-a-is-b',
            japanese: 'A は B です。',
            translation: '關於 A，它是 B。',
            note: '這是整理後保留的抽象句型骨架。',
            origin: 'source'
          },
          {
            id: 'wa-student-example',
            japanese: '私は学生です。',
            reading: 'わたし は がくせい です。',
            translation: '我是學生。',
            origin: 'source'
          }
        ]
      },
      {
        id: 'wa-topic-vs-subject',
        title: '主題等於主語與主題不等於主語',
        summary: '有些句子中主題剛好也是主語，但也有很多時候，真正執行動作或描述狀態的主語會改用「が」標示。',
        details: [
          '「お弁当」前面的「お」是美化語（敬語前綴），屬於固定用法，讓說法更禮貌。',
          '「を」是受詞助詞，標示動作的直接對象；「ました」則是ます形的過去敬體。'
        ],
        sourceRefs: ['note-ch2-wa-subject-difference'],
        sharedNoteIds: [],
        examples: [
          {
            id: 'wa-subject-same',
            japanese: '妻はお弁当を作りました。',
            reading: 'つま は おべんとう を つくりました。',
            translation: '太太做了便當。',
            origin: 'source'
          },
          {
            id: 'wa-subject-different',
            japanese: 'この弁当は妻が作りました。',
            reading: 'この べんとう は つま が つくりました。',
            translation: '這個便當是太太做的。',
            note: '「この弁当」是主題，「妻」才是做便當的人。',
            origin: 'source'
          }
        ]
      },
      {
        id: 'wa-omission',
        title: '主語或主題可以因語境而省略',
        summary: '當主題很明顯、語境很清楚，或前面已經有時間詞時，日文常省略重複出現的主語與主題。',
        details: [
          '「明日、何をしますか。」中只有時間詞，沒有再補「は」也完全自然。',
          '「あなたは明日は、何をしますか。」屬於大主題與小主題並存的例子。'
        ],
        sourceRefs: ['note-ch2-wa-omission'],
        sharedNoteIds: [],
        examples: [
          {
            id: 'wa-omission-1',
            japanese: '明日、何をしますか。',
            reading: 'あした、なに を しますか。',
            translation: '明天要做什麼呢？',
            origin: 'source'
          },
          {
            id: 'wa-omission-2',
            japanese: '明日は、何をしますか。',
            reading: 'あした は、なに を しますか。',
            translation: '明天要做什麼呢？',
            note: '把明天立成小主題時，就會顯得是在談「關於明天」這件事。',
            origin: 'source'
          },
          {
            id: 'wa-omission-3',
            japanese: 'あなたは明日は、何をしますか。',
            reading: 'あなた は あした は、なに を しますか。',
            translation: '那你明天要做什麼？',
            origin: 'source'
          }
        ]
      },
      {
        id: 'wa-relative-clause',
        title: '修飾子句中的主語與範圍表達',
        summary: '當句子拿來修飾後面的名詞時，子句內真正的主語常用「が」；另外，「場所 / 範圍 + で + いちばん + 形容詞」可表達某範圍內最……。',
        details: [
          '「私が住んでいるアパート」中的「私」是修飾子句的主語，所以用「が」。',
          '「住む → 住んでいる」展示的是五段動詞進入 ている 後描述狀態持續的用法。'
        ],
        sourceRefs: ['note-ch2-wa-relative-clause', 'note-ch2-wa-range'],
        sharedNoteIds: [],
        examples: [
          {
            id: 'wa-relative-apartment',
            japanese: '私が住んでいるアパートの大家さんの子供は小学生です。',
            reading: 'わたし が すんでいる アパート の おおやさん の こども は しょうがくせい です。',
            translation: '我住的公寓房東的小孩是小學生。',
            origin: 'source'
          },
          {
            id: 'wa-range-fuji',
            japanese: '富士山は日本でいちばん高い山です。',
            reading: 'ふじさん は にほん で いちばん たかい やま です。',
            translation: '富士山是日本最高的山。',
            origin: 'source'
          },
          {
            id: 'wa-range-inside',
            japanese: '富士山は日本の山の中でいちばん高い山です。',
            reading: 'ふじさん は にほん の やま の なか で いちばん たかい やま です。',
            translation: '富士山是在日本群山之中最高的山。',
            origin: 'supplemental'
          }
        ]
      }
    ]
  },
  {
    id: 'particle-ga',
    title: '助詞 が：標示狀態主體',
    description: '把「が」在狀態、感覺與能力這類句型中的作用獨立整理出來，方便和前面的「は」主題概念對照閱讀。',
    presentationMode: 'info-stack',
    order: 90.5,
    category: 'particle',
    sharedNotes: [],
    topics: [
      {
        id: 'ga-state-subject',
        title: 'が 常用來標示正在被描述的對象',
        summary: '在狀態句裡，「が」常標示的是正在被說明的對象，也就是這個句子裡的狀態主體。',
        details: [
          '和「は」相比，「が」更常把焦點放在句子裡被描述的對象本身，而不是把它立成整句的主題。',
          '因此在「できる」「好きだ」「わかる」這類表現裡，很常看到「が」出現。'
        ],
        sourceRefs: ['note-ch2-wa-subject-difference', 'note-ch6-verb-past-positive-negative'],
        sharedNoteIds: [],
        examples: [
          {
            id: 'ga-cooking-done',
            japanese: '料理ができました。',
            reading: 'りょうり が できました。',
            translation: '料理做好了。',
            note: '這裡的「が」標示的是正在被描述的狀態主體，也就是「料理這件事」已經完成了。',
            origin: 'source'
          },
          {
            id: 'ga-sushi-like',
            japanese: '寿司が好きです。',
            reading: 'すし が すき です。',
            translation: '喜歡壽司。',
            note: '句子的重點是在說「壽司」這個對象具有「喜歡」的關係，所以常用「が」來標示。',
            origin: 'supplemental'
          },
          {
            id: 'ga-japanese-understand',
            japanese: '日本語がわかります。',
            reading: 'にほんご が わかります。',
            translation: '懂日文。',
            note: '「わかる」這類表現也常用「が」來標示被理解的內容。',
            origin: 'supplemental'
          }
        ]
      }
    ]
  },
  {
    id: 'particle-wo',
    title: '助詞 を：標示動作直接作用的對象',
    description: '承接前面的「が」狀態主體概念，這一組把「を」最核心的用法獨立整理成「動作直接作用到哪個對象」。',
    presentationMode: 'info-stack',
    order: 90.75,
    category: 'particle',
    sharedNotes: [],
    topics: [
      {
        id: 'wo-direct-object',
        title: 'を 常用來標示動作的受詞',
        summary: '當句子要表達「做某件事、吃某個東西、看某樣東西」時，「を」常用來標示那個直接受到動作影響的對象。',
        details: [
          '和前一組的「が」相比，「が」常標示狀態、感覺或能力句型中的主體；「を」則更常出現在實際動作直接作用到某個對象的句子裡。',
          '初學時先把它記成「動作做在什麼東西上」，大多數情況都能快速判斷。'
        ],
        sourceRefs: ['note-ch1-verb-present-future', 'note-ch2-mo-wo'],
        sharedNoteIds: [],
        examples: [
          {
            id: 'wo-movie-watch',
            japanese: '映画を見ます。',
            reading: 'えいが を みます。',
            translation: '看電影。',
            note: '「映画」是被觀看的對象，所以用「を」標示。',
            origin: 'supplemental'
          },
          {
            id: 'wo-breakfast-eat',
            japanese: '朝ごはんを食べました。',
            reading: 'あさごはん を たべました。',
            translation: '吃了早餐。',
            note: '「朝ごはん」是被吃的內容，也就是這個動作直接作用的對象。',
            origin: 'supplemental'
          },
          {
            id: 'wo-cooking-contrast',
            japanese: '料理を作りました。',
            reading: 'りょうり を つくりました。',
            translation: '做了料理。',
            note: '這句和前面的「料理ができました」剛好能對照來看：前者強調「做了料理」這個動作，後者強調「料理完成了」這個狀態。',
            origin: 'supplemental'
          }
        ]
      }
    ]
  },
  {
    id: 'particle-mo',
    title: '助詞 も：也、同樣，與其他助詞的搭配',
    description: '把原筆記中「も」如何取代或保留原本助詞的規則整理成對照表，再補上每種情況的代表例句。',
    presentationMode: 'compare-table',
    order: 91,
    category: 'particle',
    sharedNotes: [
      {
        id: 'mo-ga-role',
        title: 'が 的兩種常見功能',
        content: '「が」可以標示主語，也常和喜好、感覺、能力等狀態型表現連用；放在句子中間時，還可能有「但是／可是」的轉折語氣。'
      },
      {
        id: 'giver-verbs',
        title: 'あげる・くれる・もらう',
        content: 'あげる是我或我方給別人，くれる是別人給我，もらう是我收到。這一組動詞常與「に」一起標示接受動作的人。'
      }
    ],
    table: {
      columns: ['原本助詞', '和 も 的搭配方式', '代表語感'],
      rows: [
        { id: 'mo-wa', label: 'は', values: ['直接被 も 取代', '……也……'] },
        { id: 'mo-ga', label: 'が', values: ['直接被 も 取代', '同樣喜歡／同樣會'] },
        { id: 'mo-wo', label: 'を', values: ['通常被 も 取代', '也做這個動作'] },
        { id: 'mo-he', label: 'へ', values: ['常寫成 へも，也可省略成 も', '也往那個方向去'] },
        { id: 'mo-ni', label: 'に', values: ['通常保留成 にも', '也把動作給某人／對某人'] },
        { id: 'mo-de', label: 'で', values: ['通常保留成 でも', '用那個手段也可以'] }
      ]
    },
    topics: [
      {
        id: 'mo-must-replace',
        title: 'は 與 が 常直接被 も 取代',
        summary: '當「也」的焦點正好落在原本由「は」或「が」標示的內容上時，原助詞通常直接消失，改由「も」接手。',
        details: [
          '這種用法很常出現在兩個人、兩個選項或兩個狀態的並列比較。',
          '和喜好、感覺一起用時，原本的「が」也會被「も」接替。'
        ],
        sourceRefs: ['note-ch2-mo-wa-ga'],
        sharedNoteIds: ['mo-ga-role'],
        examples: [
          {
            id: 'mo-student',
            japanese: '高橋さんは学生です。山田さんも学生です。',
            reading: 'たかはしさん は がくせい です。やまださん も がくせい です。',
            translation: '高橋先生是學生，山田先生也是學生。',
            origin: 'source'
          },
          {
            id: 'mo-like',
            japanese: '寿司が好きです。ラーメンも好きです。',
            reading: 'すし が すき です。ラーメン も すき です。',
            translation: '喜歡壽司，也喜歡拉麵。',
            origin: 'source'
          }
        ]
      },
      {
        id: 'mo-wo-he',
        title: 'を 常被取代，へ 多半保留成 へも',
        summary: '受詞助詞「を」放進「也」的句型時，大多直接讓位給「も」；方向助詞「へ」則很常變成「へも」，有時口語裡也會省略成單純的「も」。',
        details: [
          '「買う → 買います → 買いました」與「行く → 行きます → 行きました」都在原筆記中被當作敬體變化複習。',
          '方向助詞保留成「へも」時，讀者最容易看出「也往那裡去」的方向感。'
        ],
        sourceRefs: ['note-ch2-mo-wo', 'note-ch2-mo-he'],
        sharedNoteIds: [],
        examples: [
          {
            id: 'mo-magazine',
            japanese: '新聞を買いました。雑誌も買いました。',
            reading: 'しんぶん を かいました。ざっし も かいました。',
            translation: '買了報紙，也買了雜誌。',
            origin: 'source'
          },
          {
            id: 'mo-nara',
            japanese: '京都へ行きました。奈良へも行きました。',
            reading: 'きょうと へ いきました。なら へも いきました。',
            translation: '去了京都，也去了奈良。',
            origin: 'source'
          }
        ]
      },
      {
        id: 'mo-ni-de',
        title: 'に 與 で 多半保留，再和 も 組合',
        summary: '當原句中的「に」或「で」承擔明確語法功能時，通常不會直接消失，而是保留成「にも」「でも」。',
        details: [
          '「に」在這裡標示接受動作的人，所以不能只剩下「も」。',
          '「で」放在交通工具或手段前面時，保留成「でも」最能維持原本的語意。'
        ],
        sourceRefs: ['note-ch2-mo-ni', 'note-ch2-mo-de'],
        sharedNoteIds: ['giver-verbs'],
        examples: [
          {
            id: 'mo-father',
            japanese: '母にプレゼントをあげました。父にもあげました。',
            reading: 'はは に プレゼント を あげました。ちち にも あげました。',
            translation: '送了禮物給媽媽，也送給爸爸。',
            origin: 'source'
          },
          {
            id: 'mo-bus',
            japanese: '電車で行くことができます。バスでも行くことができます。',
            reading: 'でんしゃ で いく こと が できます。バス でも いく こと が できます。',
            translation: '可以搭電車去，也可以搭巴士去。',
            origin: 'source'
          }
        ]
      }
    ]
  },
  {
    id: 'particle-no',
    title: '助詞 の：名詞與名詞之間的關係',
    description: '把原筆記中的所屬、所有、位置與產地四類「名詞 の 名詞」關係整理成一組，幫助讀者分辨「の」不是只有所有格。',
    presentationMode: 'info-stack',
    order: 92,
    category: 'particle',
    sharedNotes: [],
    topics: [
      {
        id: 'no-belonging',
        title: '所屬與所有關係',
        summary: '「の」最常見的功能是把兩個名詞串起來，表示某人屬於某個單位，或某個東西屬於某個人。',
        details: [
          '前項不一定是「人」，也可以是公司、群體或其他能表示歸屬的名詞。',
          '翻譯時常會變成「……的……」，但實際關係要靠語境判讀。'
        ],
        sourceRefs: ['note-ch3-no'],
        sharedNoteIds: [],
        examples: [
          {
            id: 'no-company',
            japanese: '私はSONYの社員です。',
            reading: 'わたし は ソニー の しゃいん です。',
            translation: '我是 SONY 的員工。',
            origin: 'source'
          },
          {
            id: 'no-umbrella',
            japanese: 'これは私の傘です。',
            reading: 'これ は わたし の かさ です。',
            translation: '這是我的傘。',
            origin: 'source'
          }
        ]
      },
      {
        id: 'no-location-origin',
        title: '所在位置與產地來源',
        summary: '「の」也可以用來說明某個東西位於哪裡前面，或某樣東西來自哪個國家、地方。',
        details: [
          '位置句中常和表示方位的名詞一起用，例如「前（まえ）」。',
          '產地用法雖然表面像所有格，但實際上是在說「來自哪裡」。'
        ],
        sourceRefs: ['note-ch3-no'],
        sharedNoteIds: [],
        examples: [
          {
            id: 'no-postbox',
            japanese: 'ポストは市役所の前です。',
            reading: 'ポスト は しやくしょ の まえ です。',
            translation: '郵筒在市公所前面。',
            origin: 'supplemental'
          },
          {
            id: 'no-apple',
            japanese: 'これは日本のりんごです。',
            reading: 'これ は にほん の りんご です。',
            translation: '這是日本的蘋果。',
            origin: 'source'
          }
        ]
      }
    ]
  },
  {
    id: 'particle-ka',
    title: '助詞 か：把句子變成疑問句',
    description: '把原筆記中最基本的疑問句用法補成可直接套用的整理版，除了 yes / no 問答，也一起整理和疑問詞連用時的句尾形式。',
    presentationMode: 'info-stack',
    order: 96,
    category: 'particle',
    sharedNotes: [],
    topics: [
      {
        id: 'ka-question',
        title: '句尾加 か，形成 yes / no 疑問句',
        summary: '在敬體句尾加上「か」，就可以把陳述句改成禮貌的疑問句，常用來詢問對方「是不是……」。',
        details: [
          '回答時常搭配「はい、……です」或「いいえ、……じゃありません / ではありません」。',
          '句尾有了「か」就已經表示疑問，寫正式句子時不一定要再加問號。',
          '學習時最好把問句和回答型一起記住，這樣比較能直接套進對話。',
          '這一組先聚焦句尾的「か」；至於句中的「か」還有選擇、不確定等其他用法。'
        ],
        sourceRefs: ['note-ch4-ka'],
        sharedNoteIds: [],
        examples: [
          {
            id: 'ka-student',
            japanese: 'あなたは学生ですか。',
            reading: 'あなた は がくせい ですか。',
            translation: '你是學生嗎？',
            origin: 'source'
          },
          {
            id: 'ka-answer',
            japanese: 'はい、学生です。 / いいえ、学生じゃありません。',
            reading: 'はい、がくせい です。 / いいえ、がくせい じゃありません。',
            translation: '是的，我是學生。／不，我不是學生。',
            origin: 'supplemental'
          },
          {
            id: 'ka-teacher',
            japanese: 'あの人は先生ですか。',
            reading: 'あの ひと は せんせい ですか。',
            translation: '那個人是老師嗎？',
            origin: 'supplemental'
          },
          {
            id: 'ka-teacher-answer',
            japanese: 'はい、先生です。 / いいえ、先生ではありません。',
            reading: 'はい、せんせい です。 / いいえ、せんせい ではありません。',
            translation: '是的，是老師。／不，不是老師。',
            note: '用同一組例句順手補上較正式的否定說法「ではありません」。',
            origin: 'supplemental'
          }
        ]
      },
      {
        id: 'ka-question-word',
        title: '疑問詞句尾也常用 か 收尾',
        summary: '當句子裡出現「何」「だれ」「どこ」「いつ」這類疑問詞時，敬體問句的句尾一樣常用「か」收尾。',
        details: [
          '這時候問句的重點不再是 yes / no，而是要對方補出未知資訊。',
          '可以把它理解成：疑問詞負責指出「不知道的是哪一部分」，句尾的「か」則負責把整句收成疑問句。'
        ],
        sourceRefs: ['note-ch4-ka'],
        sharedNoteIds: [],
        examples: [
          {
            id: 'ka-what',
            japanese: 'これは何ですか。',
            reading: 'これ は なん ですか。',
            translation: '這是什麼？',
            origin: 'supplemental'
          },
          {
            id: 'ka-where',
            japanese: 'トイレはどこですか。',
            reading: 'トイレ は どこ ですか。',
            translation: '廁所在哪裡？',
            origin: 'supplemental'
          },
          {
            id: 'ka-when',
            japanese: '試験はいつですか。',
            reading: 'しけん は いつ ですか。',
            translation: '考試是什麼時候？',
            origin: 'supplemental'
          }
        ]
      }
    ]
  },
  {
    id: 'particle-ni',
    title: '助詞 に：動作發生的時間點',
    description: '把原筆記中和時間點「に」相關的可加、可不加與常見時間詞整理在一起，避免把所有時間名詞都一律接「に」。',
    presentationMode: 'info-stack',
    order: 94,
    category: 'particle',
    sharedNotes: [],
    topics: [
      {
        id: 'ni-time-point',
        title: '有明確時間點且後面有動作時，常用 に',
        summary: '當句子要表達「在某個具體時間點做某件事」時，常在時間名詞後面接「に」。',
        details: [
          '絕對時間詞（像 7 時）與星期幾常常都要接「に」。',
          '「朝 8 時に」這種寫法同時包含相對時段與具體時間點，所以仍然保留「に」。'
        ],
        sourceRefs: ['note2-ch9-ni'],
        sharedNoteIds: [],
        examples: [
          {
            id: 'ni-seven',
            japanese: '7時に起きます。',
            reading: 'しちじ に おきます。',
            translation: '七點起床。',
            origin: 'source'
          },
          {
            id: 'ni-monday',
            japanese: '月曜日に国へ帰ります。',
            reading: 'げつようび に くに へ かえります。',
            translation: '星期一回國。',
            origin: 'source'
          },
          {
            id: 'ni-eight-morning',
            japanese: '朝8時に家を出ます。',
            reading: 'あさ はちじ に いえ を でます。',
            translation: '早上八點出門。',
            origin: 'source'
          }
        ]
      },
      {
        id: 'ni-no-need',
        title: '相對時間與不特定時間詞常不需要 に',
        summary: '像「明日」「朝」「夜」這些相對或不特定時間詞，若只是標出背景時間，通常可以不接「に」。',
        details: [
          '原筆記特別提醒：口語裡有些時間詞即使可加「に」，也常被省略。',
          '沒有動作的句子本身也不需要硬加「に」。'
        ],
        sourceRefs: ['note2-ch9-ni'],
        sharedNoteIds: [],
        examples: [
          {
            id: 'ni-now-eight',
            japanese: '今、八時です。',
            reading: 'いま、はちじ です。',
            translation: '現在八點。',
            origin: 'source'
          },
          {
            id: 'ni-tomorrow-hospital',
            japanese: '明日、病院へ行きます。',
            reading: 'あした、びょういん へ いきます。',
            translation: '明天去醫院。',
            origin: 'source'
          },
          {
            id: 'ni-morning-shower',
            japanese: '朝、シャワーを浴びます。',
            reading: 'あさ、シャワー を あびます。',
            translation: '早上洗澡。',
            note: '「浴びる」在這裡是「沖、淋」的意思。',
            origin: 'source'
          }
        ]
      },
      {
        id: 'ni-others',
        title: '節日、晚上的固定背景與常見問句',
        summary: '像節日名稱這種有固定時間感的名詞，也常接「に」；搭配問句時則能直接詢問某人通常在幾點做某動作。',
        details: [
          '「食事します」是サ變動詞寫法，來自名詞「食事」加上「する」。',
          '這一組句子有助於把時間點「に」和動詞敬體一起複習。'
        ],
        sourceRefs: ['note2-ch9-ni'],
        sharedNoteIds: [],
        examples: [
          {
            id: 'ni-christmas',
            japanese: 'クリスマスに彼女と食事します。',
            reading: 'クリスマス に かのじょ と しょくじ します。',
            translation: '聖誕節和女朋友一起吃飯。',
            origin: 'source'
          },
          {
            id: 'ni-bedtime-question',
            japanese: '木村さんは毎晩何時に寝ますか。',
            reading: 'きむらさん は まいばん なんじ に ねますか。',
            translation: '木村先生每天晚上幾點睡覺？',
            origin: 'source'
          }
        ]
      }
    ]
  },
  {
    id: 'particle-he',
    title: '助詞 へ：移動的方向',
    description: '原筆記在第二份文件中只留下「移動方向 へ」的章節標題，這裡補成可學習的整理版，並與前面已出現的例句對接。',
    presentationMode: 'info-stack',
    order: 95,
    category: 'particle',
    sharedNotes: [
      {
        id: 'he-pronunciation',
        title: '寫作 へ，發音讀 え',
        content: '方向助詞「へ」和主題助詞「は」一樣，都屬於寫法與實際發音不同的常見例外。'
      }
    ],
    topics: [
      {
        id: 'he-direction',
        title: 'へ 強調移動的方向',
        summary: '「へ」用在移動動詞前面時，重點放在朝哪個方向前進，而不一定強調到達點本身。',
        details: [
          '這就是為什麼原筆記把它和「は」一起列成發音例外：寫作和發音都需要另外記。',
          '在「奈良へも行きました」這類句型中，へ 和 も 可以同時出現。'
        ],
        sourceRefs: ['note2-ch10-he', 'note-ch2-mo-he'],
        sharedNoteIds: ['he-pronunciation'],
        examples: [
          {
            id: 'he-kyoto',
            japanese: '京都へ行きます。',
            reading: 'きょうと へ いきます。',
            translation: '前往京都。',
            origin: 'supplemental'
          },
          {
            id: 'he-nara-too',
            japanese: '奈良へも行きました。',
            reading: 'なら へも いきました。',
            translation: '也去了奈良。',
            origin: 'source'
          }
        ]
      },
      {
        id: 'he-vs-ni',
        title: 'へ 與 に 的差別',
        summary: '兩者都能和移動動詞一起用，但「へ」較強調方向感，「に」則常讓人感到目的地或到達點更明確。',
        details: [
          '在入門階段，先把「へ = 朝著某方向」這個印象記穩，之後再去分辨細微語感即可。',
          '因此像「病院へ行きます」就很適合當成方向助詞的起點例句。'
        ],
        sourceRefs: ['note2-ch10-he'],
        sharedNoteIds: ['he-pronunciation'],
        examples: [
          {
            id: 'he-hospital',
            japanese: '明日、病院へ行きます。',
            reading: 'あした、びょういん へ いきます。',
            translation: '明天前往醫院。',
            origin: 'source'
          },
          {
            id: 'he-school-ni',
            japanese: '学校に行きます。',
            reading: 'がっこう に いきます。',
            translation: '去學校。',
            note: '用來對照「へ」較偏方向感，「に」較像把學校當作到達點。',
            origin: 'supplemental'
          }
        ]
      }
    ]
  }
];

export const n5GrammarSourceCoverage: N5GrammarSourceCoverageItem[] = [
  { sourceId: 'note-ch1-noun-positive-negative', summary: '名詞肯定與否定', mappedSectionId: 'sentence-basics', mappedTopicIds: ['noun-na-basics'], status: 'covered' },
  { sourceId: 'note-ch1-na-adjective-positive-negative', summary: 'な形容詞肯定與否定', mappedSectionId: 'sentence-basics', mappedTopicIds: ['noun-na-basics'], status: 'covered' },
  { sourceId: 'note-ch1-i-adjective-positive-negative', summary: 'い形容詞肯定與否定', mappedSectionId: 'sentence-basics', mappedTopicIds: ['i-adjective-basics'], status: 'covered' },
  { sourceId: 'note-ch1-verb-present-future', summary: '動詞現在、未來與習慣性動作', mappedSectionId: 'sentence-basics', mappedTopicIds: ['masu-verb-basics'], status: 'covered' },
  { sourceId: 'note-ch2-wa-core', summary: '助詞は的主題概念', mappedSectionId: 'particle-wa', mappedTopicIds: ['wa-topic-marker'], status: 'covered' },
  { sourceId: 'note-ch2-wa-subject-difference', summary: '主題等於主語與不等於主語', mappedSectionId: 'particle-wa', mappedTopicIds: ['wa-topic-vs-subject'], status: 'covered' },
  { sourceId: 'note-ch2-wa-omission', summary: '主語與主題省略', mappedSectionId: 'particle-wa', mappedTopicIds: ['wa-omission'], status: 'covered' },
  { sourceId: 'note-ch2-wa-relative-clause', summary: '修飾子句與 ている 狀態', mappedSectionId: 'particle-wa', mappedTopicIds: ['wa-relative-clause'], status: 'merged' },
  { sourceId: 'note-ch2-wa-range', summary: '範圍中的最高級與 で', mappedSectionId: 'particle-wa', mappedTopicIds: ['wa-relative-clause'], status: 'merged' },
  { sourceId: 'note-ch2-mo-wa-ga', summary: '助詞も 取代 は 與 が', mappedSectionId: 'particle-mo', mappedTopicIds: ['mo-must-replace'], status: 'covered' },
  { sourceId: 'note-ch2-mo-wo', summary: '助詞も 與 を', mappedSectionId: 'particle-mo', mappedTopicIds: ['mo-wo-he'], status: 'covered' },
  { sourceId: 'note-ch2-mo-he', summary: '助詞も 與 へ', mappedSectionId: 'particle-mo', mappedTopicIds: ['mo-wo-he'], status: 'covered' },
  { sourceId: 'note-ch2-mo-ni', summary: '助詞も 與 に', mappedSectionId: 'particle-mo', mappedTopicIds: ['mo-ni-de'], status: 'covered' },
  { sourceId: 'note-ch2-mo-de', summary: '助詞も 與 で', mappedSectionId: 'particle-mo', mappedTopicIds: ['mo-ni-de'], status: 'covered' },
  { sourceId: 'note-ch3-no', summary: '助詞の：所屬、所有、所在、所產', mappedSectionId: 'particle-no', mappedTopicIds: ['no-belonging', 'no-location-origin'], status: 'covered' },
  { sourceId: 'note-ch4-ka', summary: '助詞か：句子疑問', mappedSectionId: 'particle-ka', mappedTopicIds: ['ka-question'], status: 'covered' },
  { sourceId: 'note-ch5-noun-past', summary: '名詞過去肯定與否定', mappedSectionId: 'past-and-state', mappedTopicIds: ['nominal-past'], status: 'covered' },
  { sourceId: 'note-ch6-verb-past-positive-negative', summary: '動詞過去肯定與否定、完成語感', mappedSectionId: 'past-and-state', mappedTopicIds: ['verb-past'], status: 'covered' },
  { sourceId: 'note-ch7-na-adjective-past', summary: 'な形容詞過去肯定與否定、過去狀態', mappedSectionId: 'past-and-state', mappedTopicIds: ['nominal-past', 'continuous-state'], status: 'merged' },
  { sourceId: 'note-ch8-i-adjective-past', summary: 'い形容詞過去肯定與否定', mappedSectionId: 'past-and-state', mappedTopicIds: ['i-adjective-past'], status: 'covered' },
  { sourceId: 'note2-ch9-ni', summary: '助詞に：動作進行時間點', mappedSectionId: 'particle-ni', mappedTopicIds: ['ni-time-point', 'ni-no-need', 'ni-others'], status: 'covered' },
  { sourceId: 'note2-ch10-he', summary: '助詞へ：移動方向', mappedSectionId: 'particle-he', mappedTopicIds: ['he-direction', 'he-vs-ni'], status: 'supplemented' }
];

export const sortedN5GrammarSections = [...n5GrammarSections].sort((left, right) => left.order - right.order);
