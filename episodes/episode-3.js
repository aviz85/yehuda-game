"use strict";

const EPISODE_3 = {
  id: 3,
  title: "החניה",
  emoji: "🚗",
  subtitle: "דני חנה בשתי חניות. יהודה לא יכול להיכנס. מרים ראתה הכל.",
  goal: "יישב את סכסוך החניה לפני שמישהו שורט למישהו את הרכב",

  activeChars: ["dani", "miriam", "yossi", "uri", "valentina"],

  initialScores: {
    dani: 40, miriam: 50, yossi: 50, uri: 50, valentina: 50
  },

  dateLabel: "היום, יום ראשון",

  beats: [
    // ========== BEAT 1: הגילוי ==========
    {
      id: "beat_1",
      messages: [
        { from: "miriam", text: 'יהודה!! יהודה!! ראיתי שאתה מחפש חניה! 👀 דני מקומה 5 שוב חנה בשתי מקומות!! הרכב שלו דיוקן!! רכב של ישראלי!!', delay: 600, typingMs: 1800 },
        { from: "yossi",  text: 'מה? מה קרה? 😴 רק קמתי...', delay: 300, typingMs: 900 },
        { from: "miriam", text: 'יוסי!! דני!! שתי חניות!! שוב!! זה הפעם השלישית החודש!! ספרתי!!', delay: 200, typingMs: 1400 },
        { from: "uri",    text: 'לפי תקנון הבניין סעיף 11ג, כל דייר זכאי לחניה אחת בלבד. אשלח את התקנון. 14 עמודים.', delay: 300, typingMs: 1600 },
        { from: "valentina", text: 'בבלארוס אין חניות בכלל. כולם עומדים על המדרכה. 🤷', delay: 200, typingMs: 1300 },
        { from: "dani",   text: 'מה הבעיה?? הרכב שלי גדול! יש מקום! אף אחד לא היה שם!! 😤', delay: 300, typingMs: 1500 },
        { from: "miriam", text: 'לא היה שם?! יהודה לא יכול להיכנס!! הרכב שלו בחוץ!! בחוץ!!', delay: 200, typingMs: 1200 }
      ],
      choices: [
        {
          text: 'דני, אני צריך לחנות. בבקשה תזיז את הרכב 🙏',
          effects: { dani: -5, miriam: +10, uri: +5 },
          goalDelta: 15,
          next: "beat_2",
          path: "polite"
        },
        {
          text: 'חברים בואו נרגע 😅 דני, תזיז. אבל בלי מלחמות, בסדר?',
          effects: { dani: +5, miriam: +5, yossi: +10 },
          goalDelta: 20,
          next: "beat_2",
          path: "calm"
        },
        {
          text: '@דני מה זה "הרכב שלי גדול"?! זה לא מגרש שלך!! 😤',
          effects: { dani: -20, miriam: +20, yossi: -5 },
          goalDelta: 5,
          next: "beat_2",
          path: "angry"
        }
      ]
    },

    // ========== BEAT 2: עימות ==========
    {
      id: "beat_2",
      branchMessages: {
        "angry": [
          { from: "dani",   text: 'אתה רוצה להתחיל?! בוא נדבר בחוץ! 😡', delay: 200, typingMs: 1200 },
          { from: "yossi",  text: 'וואו וואו וואו 🍿 זה נהיה מעניין', delay: 200, typingMs: 900 },
          { from: "miriam", text: 'תראו!! אמרתי!! הוא אגרסיבי!! פרוטוקולית — דני קניג הוא איום על הבניין!! 😤', delay: 200, typingMs: 1400 }
        ],
        "default": [
          { from: "dani",   text: '...בסדר בסדר, אני יורד להזיז. אבל בפעם הבאה תדברו יפה.', delay: 200, typingMs: 1300 },
          { from: "miriam", text: 'הוא יורד! הוא יורד! 🎉 יהודה עשה את זה!!', delay: 200, typingMs: 1000 },
          { from: "yossi",  text: '👍', delay: 200, typingMs: 600, isEmoji: true }
        ]
      },
      autoNext: "beat_3"
    },

    // ========== BEAT 3: הצבעה על פתרון ==========
    {
      id: "beat_3",
      messages: [
        { from: "uri",    text: 'חברים, הגיע הזמן לסדר את נושא החניות פעם אחת ולתמיד. אני מציע לאמץ תקנון חניה מסודר. 📋 מי בעד?', delay: 400, typingMs: 1600 },
        { from: "miriam", text: 'בעד! ואני רוצה גם מצלמות! ותאורה! ושלט "חנייה לדיירים בלבד"!!', delay: 200, typingMs: 1400 },
        { from: "dani",   text: 'מה זה הוועד שלכם... אוקי, בסדר. אבל הרכב שלי באמת גדול.', delay: 200, typingMs: 1200 },
        { from: "yossi",  text: 'יש לי רעיון — מי שיש לו רכב גדול ישלם יותר? 💡', delay: 200, typingMs: 1100 },
        { from: "valentina", text: 'בבלארוס... לא, לא רלוונטי. אני בעד כל פתרון שיש שקט. 😊', delay: 200, typingMs: 1300 },
        { from: "dani",   text: 'יוסי! תפסיק לפתח רעיונות!! 😤', delay: 200, typingMs: 900 },
        { from: "miriam", text: 'יהודה! תחליט!! אתה התחלת את זה!!', delay: 200, typingMs: 1000 }
      ],
      choices: [
        {
          text: 'אני מציע: כל רכב גדול מחויב לחנות ממוקד. מי שחונה בשניים — קנס 50 ש"ח לקופת הוועד 💰',
          effects: { uri: +18, miriam: +15, dani: -10, yossi: +8 },
          goalDelta: 45,
          next: "beat_4a",
          path: "fine"
        },
        {
          text: 'בואו נעשה רוטציה: כל חודש, דייר אחר מקבל את החניה הכפולה. הוגן לכולם 🔄',
          effects: { uri: +10, miriam: +8, dani: +12, yossi: +10, valentina: +12 },
          goalDelta: 50,
          next: "beat_4b",
          path: "rotation"
        },
        {
          text: 'דני, אני שם מדבקה על הרכב שלך אם זה יקרה שוב. הוזהרת. 🔖',
          effects: { dani: -25, miriam: +25, yossi: +15, valentina: -5 },
          goalDelta: 30,
          next: "beat_4c",
          path: "sticker"
        }
      ]
    },

    // ========== BEAT 4a: קנס ==========
    {
      id: "beat_4a",
      messages: [
        { from: "uri",    text: 'הצעה מצוינת! מנגנון אכיפה ברור! אכין מסמך. 8 עמודים.', delay: 200, typingMs: 1400 },
        { from: "miriam", text: 'יהודה גאון!! סוף סוף יש נשיכה בחוקים שלנו!! 🎉', delay: 200, typingMs: 1200 },
        { from: "dani",   text: '...50 שקל? בסדר. אני אזהיר. אבל אם אני רואה שאחרים גם חונים בשניים — גם הם!', delay: 200, typingMs: 1600 },
        { from: "yossi",  text: 'הוא לא לא צודק...', delay: 200, typingMs: 900 },
        { from: "miriam", text: 'יוסי!!! אל תגיד שדני צודק!!', delay: 200, typingMs: 800 },
        { from: "yossi",  text: '😂', delay: 200, typingMs: 500, isEmoji: true },
        { from: "valentina", text: 'בבלארוס הקנסות היו הרבה יותר. ₪50 זה זול לכם. 🤷', delay: 200, typingMs: 1300 }
      ],
      ending: "fine"
    },

    // ========== BEAT 4b: רוטציה ==========
    {
      id: "beat_4b",
      messages: [
        { from: "dani",   text: 'רוטציה? אני ראשון? 😄', delay: 200, typingMs: 900 },
        { from: "miriam", text: 'אחרון!! דני — אחרון!! לפי הצבעה!! 😤', delay: 200, typingMs: 1000 },
        { from: "uri",    text: 'אכין לוח רוטציה. אשלח בסוף החודש עם הסברים. 11 עמודים.', delay: 200, typingMs: 1300 },
        { from: "yossi",  text: 'אני לא צריך חניה בעצם... ניתן לי לדלג?', delay: 200, typingMs: 1100 },
        { from: "miriam", text: 'יוסי!! אתה לא יכול לדלג!! זו זכות!!', delay: 200, typingMs: 900 },
        { from: "yossi",  text: 'אבל אני לא נוהג 😅', delay: 200, typingMs: 700 },
        { from: "miriam", text: '...לא ידעתי. לא נראה.', delay: 200, typingMs: 800 },
        { from: "valentina", text: 'זה ממש הגיוני! כל אחד בתורו! מאוד ציוילי! 😊', delay: 200, typingMs: 1200 },
        { from: "dani",   text: 'בסדר. לא גרוע. אבל אני עדיין חושב שהרכב שלי...', delay: 200, typingMs: 1100 },
        { from: "miriam", text: 'דני! שב!!', delay: 200, typingMs: 600 }
      ],
      ending: "rotation"
    },

    // ========== BEAT 4c: מדבקה ==========
    {
      id: "beat_4c",
      messages: [
        { from: "dani",   text: 'מדבקה?! תנסה!! תנסה!! אני אוציא ממך את המדבקה ואדביק אותה על הדלת שלך!! 😡', delay: 200, typingMs: 1500 },
        { from: "miriam", text: 'זה איום!! עדים!! כולם עדים!! 📸', delay: 200, typingMs: 900 },
        { from: "yossi",  text: 'וואו. קינמון 🍿', delay: 200, typingMs: 700 },
        { from: "valentina", text: 'ריב. כמו בסדרות. אני לא מתערבת. 😬', delay: 200, typingMs: 1100 },
        { from: "uri",    text: 'פניתי לעורך דין הבניין. נחכה לחוות דעתו. בינתיים — כולם רגועים.', delay: 200, typingMs: 1400 },
        { from: "dani",   text: '...טוב. בסוף. אבל תזכרו שאמרתם לי לחנות יפה. אני אחנה יפה. כשמתבקשים יפה.', delay: 200, typingMs: 1600 },
        { from: "miriam", text: 'ניצחנו?! ניצחנו!! 🎉', delay: 200, typingMs: 800 },
        { from: "yossi",  text: 'לא ממש...', delay: 200, typingMs: 700 }
      ],
      ending: "sticker"
    }
  ],

  endings: {
    fine: {
      headline: "קנס חניה אושר — דני לוקח צ'ק-בוק",
      sub: '"יהודה מוכיח: כסף מדבר בשפה שכולם מבינים, גם דני קניג"',
      badgeIcon: "💰",
      badgeLabel: '"שוטר החניה" — הכנסת אכיפה כלכלית לבניין!',
      goalScore: 90
    },
    rotation: {
      headline: "רוטציית חניות — כולם מרוצים, כמעט",
      sub: '"יהודה בנה מערכת הוגנת — גילינו שיוסי לא נוהג מעולם"',
      badgeIcon: "🔄",
      badgeLabel: '"מגדיר תורות" — יצרת סדר מתוך כאוס!',
      goalScore: 100
    },
    sticker: {
      headline: "מלחמת המדבקה — שביתת נשק קריר",
      sub: '"המדבקה לא הודבקה, אבל האיום עבד. בינתיים."',
      badgeIcon: "🔖",
      badgeLabel: '"הקשוח מהבניין" — לפעמים האיום מספיק!',
      goalScore: 70
    }
  }
};
