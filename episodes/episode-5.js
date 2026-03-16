"use strict";

const EPISODE_5 = {
  id: 5,
  title: "חג סוכות",
  emoji: "🌿",
  subtitle: "אורי בנה סוכה ב-80% מהגג. מרים איבדה את הלוויין. ולנטינה שואלת שאלות.",
  goal: "שרוד את מלחמת הסוכה ושמור על שלום הבניין",

  activeChars: ["uri", "miriam", "yossi", "liat", "valentina"],

  initialScores: {
    uri: 50, miriam: 50, yossi: 50, liat: 50, valentina: 50
  },

  dateLabel: "ערב חג הסוכות",

  beats: [
    // ========== BEAT 1: הסוכה עולה ==========
    {
      id: "beat_1",
      messages: [
        { from: "uri",    text: 'שנה טובה לכולם! 🌿 קמתי בחמש בבוקר ובניתי סוכה על הגג. היא מוכנה! כולם מוזמנים לבוא ולשבת!', delay: 600, typingMs: 1800 },
        { from: "miriam", text: 'אורי!! קמתי לראות את הטלוויזיה בבוקר!! הלוויין שלי מת!! מת!! אורי!!!', delay: 300, typingMs: 1400 },
        { from: "uri",    text: 'מרים, הסוכה על צד אחד של הגג בלבד. הלוויין שלך...', delay: 200, typingMs: 1200 },
        { from: "miriam", text: 'הלוויין שלי מסתכל לכיוון הדרום!! הסוכה שלך בדרום!! אני לא רואה בסלוניקי!!', delay: 200, typingMs: 1600 },
        { from: "yossi",  text: 'סוכה!! חג שמח!! אפשר לאכול שם? 🌿', delay: 200, typingMs: 900 },
        { from: "valentina", text: 'מה זה סוכה? לא ראיתי כזה. זה בית? זה אוהל? זה מהעץ? למה עץ?', delay: 200, typingMs: 1500 },
        { from: "uri",    text: 'ולנטינה, סוכה היא מבנה זמני עם גג צמחי, שבונים לחג סוכות כזכר ליציאת מצרים. 🌿 ישמח להסביר עוד.', delay: 200, typingMs: 1800 },
        { from: "valentina", text: 'מצרים?! אתם בנו בית בגלל מצרים?! ולמה עכשיו?!', delay: 200, typingMs: 1200 },
        { from: "liat",   text: 'ניצן ירוץ בגג אם הסוכה שם?! 🐕 זה נחמד!! אורי אתה מדהים!!', delay: 200, typingMs: 1200 },
        { from: "miriam", text: 'ניצן בגג לא!! 🐕🚫 הסוכה בגג — לא!! הלוויין שלי — לא!!', delay: 200, typingMs: 1200 }
      ],
      choices: [
        {
          text: 'אורי, הסוכה נהדרת! אבל כדאי לבדוק עם מרים על הלוויין — פשרה קלה 🙏',
          effects: { uri: +10, miriam: +12, liat: +5, valentina: +8 },
          goalDelta: 20,
          next: "beat_2",
          path: "mediate"
        },
        {
          text: 'ולנטינה — סוכה זה כמו праздник! חג ישראלי מסורתי! בוא אסביר לך! 🌿',
          effects: { valentina: +22, uri: +8, yossi: +8 },
          goalDelta: 15,
          next: "beat_2",
          path: "explain"
        },
        {
          text: 'חג שמח כולם! אורי, מחר נדון על המיקום. הלילה — חג! 🌿🎉',
          effects: { uri: +8, yossi: +15, liat: +10, miriam: -8 },
          goalDelta: 10,
          next: "beat_2",
          path: "tonight"
        }
      ]
    },

    // ========== BEAT 2: הכאוס ==========
    {
      id: "beat_2",
      branchMessages: {
        "explain": [
          { from: "valentina", text: 'אוי! זה כמו наш Купала! חג הקיץ שלנו! גם אנחנו עושים שם ו... ממ... שונה. אבל דומה! 🌸', delay: 200, typingMs: 1500 },
          { from: "uri",    text: 'כן! בדיוק! חגים של טבע ואמונה! 🌿', delay: 200, typingMs: 900 },
          { from: "miriam", text: 'חג שמח. עכשיו — הלוויין!!', delay: 200, typingMs: 800 }
        ],
        "default": [
          { from: "uri",    text: 'מרים, אני בדקתי — הסוכה לא אמורה לחסום את הלוויין שלך.', delay: 200, typingMs: 1200 },
          { from: "miriam", text: 'לא אמורה?! אז למה הסלוניקי שחור?!', delay: 200, typingMs: 1000 }
        ]
      },
      autoNext: "beat_3"
    },

    // ========== BEAT 3: עימות ==========
    {
      id: "beat_3",
      messages: [
        { from: "miriam", text: 'עלתי לגג לבדוק! הסוכה של אורי תופסת שמונים אחוז!! שמונים!! יש לי מטר ריבועי אחד לגג!! אחד!!', delay: 400, typingMs: 1800 },
        { from: "liat",   text: 'אורי! זה יותר מדי... ליאת יכולה לגשת לגינה?', delay: 200, typingMs: 1200 },
        { from: "uri",    text: 'הסוכה היא 3x4 מטר. זה ממש לא שמונים אחוז. יש לי תוכנית. אשלח.', delay: 200, typingMs: 1400 },
        { from: "yossi",  text: 'יוסי כאן. רוצה לאכול ב-סוכה. מי מביא מנגל? 🍖', delay: 200, typingMs: 1200 },
        { from: "miriam", text: 'יוסי! מנגל!! עכשיו!! על הגג!!', delay: 200, typingMs: 800 },
        { from: "yossi",  text: 'בסדר בסדר, רק שאלתי 😅', delay: 200, typingMs: 800 },
        { from: "valentina", text: 'שאלה: בסוכה אוכלים? ישנים? מה עושים בסוכה? 🤔 מסקרן.', delay: 200, typingMs: 1300 },
        { from: "uri",    text: 'ולנטינה, אוכלים, מתפללים, ולפעמים ישנים בה. מהחלל הפתוח לומדים על האמונה. 🌿', delay: 200, typingMs: 1500 },
        { from: "valentina", text: 'ישנים?! בחוץ?! בלילה?! בבניין עם מרים?!', delay: 200, typingMs: 1100 },
        { from: "miriam", text: 'מה זאת אומרת "עם מרים"?!', delay: 200, typingMs: 800 }
      ],
      choices: [
        {
          text: 'אורי, בואו נזיז את הסוכה מטר וחצי צפונה. הלוויין ינשום, הגינה תהיה נגישה 📐',
          effects: { uri: +5, miriam: +20, liat: +15 },
          goalDelta: 35,
          next: "beat_4a",
          path: "move"
        },
        {
          text: 'הצעה: שתי סוכות! אורי בונה אחת קטנה, שאר הגג פתוח. חג משותף! 🌿🌿',
          effects: { uri: -5, miriam: +10, liat: +12, yossi: +18, valentina: +15 },
          goalDelta: 45,
          next: "beat_4b",
          path: "two_sukkot"
        },
        {
          text: 'כולנו בונים את הסוכה ביחד — שכנים בוועד! חג משותף לכל הבניין! 🏠',
          effects: { uri: +15, miriam: +10, liat: +18, yossi: +20, valentina: +22 },
          goalDelta: 50,
          next: "beat_4c",
          path: "together"
        }
      ]
    },

    // ========== BEAT 4a: להזיז את הסוכה ==========
    {
      id: "beat_4a",
      messages: [
        { from: "uri",    text: 'אם זה ישחרר את הלוויין... בסדר. אני מזיז.', delay: 200, typingMs: 1200 },
        { from: "miriam", text: 'ממש עכשיו!!', delay: 200, typingMs: 700 },
        { from: "uri",    text: 'מחכה לשקיעה. לא מזיז סוכה בחג.', delay: 200, typingMs: 900 },
        { from: "miriam", text: '...אוקי. זה הגיוני. 🙏', delay: 200, typingMs: 800 },
        { from: "yossi",  text: 'אורי! אני עוזר להזיז! רק תגיד מתי 🤙', delay: 200, typingMs: 1000 },
        { from: "liat",   text: 'ואנחנו מזמינים את כולם לאכול בסוכה! ניצן גם! 🐕🌿', delay: 200, typingMs: 1100 },
        { from: "miriam", text: 'ניצן לא.', delay: 200, typingMs: 600 },
        { from: "valentina", text: 'אני אביא ממתקים מבלארוס! יש לי בבית! 🍬', delay: 200, typingMs: 1000 }
      ],
      ending: "move"
    },

    // ========== BEAT 4b: שתי סוכות ==========
    {
      id: "beat_4b",
      messages: [
        { from: "uri",    text: 'שתי סוכות... מעניין הלכתית... בפסיקה של הרב אשכנזי... אחד רגע.', delay: 200, typingMs: 1400 },
        { from: "yossi",  text: 'אורי! לא צריך רב! פשוט תבנה עוד אחת! 😂', delay: 200, typingMs: 900 },
        { from: "miriam", text: 'יהודה! רעיון גאוני!! סוכה של אורי ו... סוכה של כולנו!! מרים בונה גינת עגבניות בצד!! 🍅', delay: 200, typingMs: 1500 },
        { from: "valentina", text: 'אני רוצה לבנות!! לא בנה כלום מעולם! 😄', delay: 200, typingMs: 1100 },
        { from: "liat",   text: 'ניצן יעזור לשאת את העצים!! 🐕', delay: 200, typingMs: 800 },
        { from: "miriam", text: 'ניצן לא יוגש לבנייה. הוא כלב.', delay: 200, typingMs: 800 },
        { from: "uri",    text: 'שתי סוכות על גג אחד... זה... יוצא דופן. אבל מעניין. אוסיף לתקנון הגג.', delay: 200, typingMs: 1400 }
      ],
      ending: "two_sukkot"
    },

    // ========== BEAT 4c: ביחד ==========
    {
      id: "beat_4c",
      messages: [
        { from: "yossi",  text: 'יהודה!! זה הטוב ביותר שאמרת!! 🎉 ביחד!!', delay: 200, typingMs: 900 },
        { from: "liat",   text: 'כן!! ניצן יעזור לקשור את הסכך!! 🐕🌿', delay: 200, typingMs: 1000 },
        { from: "miriam", text: 'ניצן לא יגע ב... 🤔 אוקי. אוקי. ניצן יכול לשאת עלים. בפיו.', delay: 200, typingMs: 1300 },
        { from: "valentina", text: 'ביחד!! כמו в деревне שלנו!! קהילה!! 🌸', delay: 200, typingMs: 1100 },
        { from: "uri",    text: 'סוכה קהילתית. יש לכך תקדים. אורגניזציה מסורה. אני מנהל הפרויקט.', delay: 200, typingMs: 1400 },
        { from: "yossi",  text: 'כולנו מנהלים! מחר ב-9! מי מביא אוכל?! 🍖🌽', delay: 200, typingMs: 1000 },
        { from: "miriam", text: 'אני מביאה עגבניות מהגינה שלי. 🍅 ...אם הלוויין עובד.', delay: 200, typingMs: 1100 },
        { from: "uri",    text: 'מרים, אזיז את הסוכה הנוכחית מטר. הלוויין יעבוד. 🙏', delay: 200, typingMs: 1200 },
        { from: "miriam", text: 'חג שמח אורי. 🌿 ...אמרתי את זה.', delay: 200, typingMs: 900 },
        { from: "valentina", text: 'חג שמח! (מה זה חג שמח? זה כמו שאלא בלארוסית? 😅)', delay: 200, typingMs: 1200 }
      ],
      ending: "together"
    }
  ],

  endings: {
    move: {
      headline: "הסוכה עברה — הלוויין חי, החג בעיצומו",
      sub: '"יהודה ידע: לפעמים מטר וחצי שווים שלום שכנים"',
      badgeIcon: "📡",
      badgeLabel: '"מציל הלוויין" — שמרת על הסלוניקי של מרים!',
      goalScore: 80
    },
    two_sukkot: {
      headline: "שתי סוכות על גג אחד — שיא ישראלי חדש",
      sub: '"הבניין שבו כל שכן בנה סוכה משלו — ולנטינה בנתה הכי יפה"',
      badgeIcon: "🌿🌿",
      badgeLabel: '"ממציא הסוכה הכפולה" — חידוש הלכתי אמיתי!',
      goalScore: 90
    },
    together: {
      headline: "סוכת הבניין קמה — קהילה אחת, עלים אחד",
      sub: '"ניצן שאל עלים בפיו. מרים הכחישה שזה חמוד."',
      badgeIcon: "🏠",
      badgeLabel: '"מאחד הבניין" — הפכת קבוצת שכנים לקהילה!',
      goalScore: 100
    }
  }
};
