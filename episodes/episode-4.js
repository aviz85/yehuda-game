"use strict";

const EPISODE_4 = {
  id: 4,
  title: "השיפוץ",
  emoji: "🔨",
  subtitle: "קידוח ב-7 בבוקר. מרים מתעדת. ולנטינה אומרת שבבלארוס עושים בלילה.",
  goal: "שרוד את השיפוץ מבלי לאבד שכן אחד",

  activeChars: ["liat", "itai", "miriam", "yossi", "uri", "valentina"],

  initialScores: {
    liat: 50, itai: 50, miriam: 50, yossi: 50, uri: 50, valentina: 50
  },

  dateLabel: "היום, יום שלישי",

  beats: [
    // ========== BEAT 1: ההכרזה ==========
    {
      id: "beat_1",
      messages: [
        { from: "liat", text: 'היי לכולם! אנחנו מתחילים שיפוץ קטן בדירה 😊 רק שבועיים! נשתדל לא להפריע!', delay: 600, typingMs: 1400 },
        { from: "itai", text: 'נכון! הפועלים מגיעים מחר ב-7 בבוקר. אל דאגה 💪', delay: 200, typingMs: 1000 },
        { from: "miriam", text: 'מה?! שבעה?! בבוקר?! ב-7?! 😱😱😱', delay: 300, typingMs: 1000 },
        { from: "miriam", text: 'אני קמה ב-9!! בתי קמה ב-8!! החתול קם ב-10!! זה לא שיפוץ זה טרור!!', delay: 200, typingMs: 1600 },
        { from: "yossi",  text: 'מצד שני... קידוחים ב-7 זה... לא... מצוין...', delay: 200, typingMs: 1200 },
        { from: "valentina", text: 'שבועיים?! בבלארוס שיפוץ קטן לוקח שלוש שנים. שבועיים זה חלום. 😌', delay: 200, typingMs: 1500 },
        { from: "uri", text: 'לפי חוק הרשויות המקומיות, עבודות רעש מותרות מ-8:00 עד 20:00 בימי עבודה. 7 = בעיה. אשלח חוזר.', delay: 300, typingMs: 1800 },
        { from: "itai", text: 'אממ... הפועלים שלנו מגיעים מנצרת. מ-7 זה כולל נסיעה... 😅', delay: 200, typingMs: 1300 }
      ],
      choices: [
        {
          text: 'ליאת, איתי — 8 בבוקר זה מקסימום. 7 זה חוקי אבל לא הוגן לשכנים 🤝',
          effects: { liat: -5, itai: -5, miriam: +18, uri: +15, yossi: +10 },
          goalDelta: 25,
          next: "beat_2",
          path: "legal"
        },
        {
          text: 'בואו נסכים: 8:00 התחלה, 14:00 הפסקה, 16:00 המשך. כולם שמחים 📅',
          effects: { liat: +8, itai: +8, miriam: +12, uri: +12, yossi: +8, valentina: +10 },
          goalDelta: 35,
          next: "beat_2",
          path: "schedule"
        },
        {
          text: 'ליאת, אני מבין אתכם. אבל ב-7 גם אני לא יכול 😴 נסו 8:30?',
          effects: { liat: +5, itai: +5, miriam: +8, yossi: +12 },
          goalDelta: 20,
          next: "beat_2",
          path: "tired"
        }
      ]
    },

    // ========== BEAT 2: הקידוח מתחיל ==========
    {
      id: "beat_2",
      messages: [
        { from: "liat",   text: 'אוקי, הסכמנו ל-8:00! 🙏 תודה לכולם', delay: 400, typingMs: 1000 },
        { from: "miriam", text: '8:00. 8:00 בדיוק. לא 7:59. לא 8:01. 8:00. כתוב?', delay: 200, typingMs: 1200 },
        { from: "itai",   text: 'כתוב!', delay: 200, typingMs: 500 },
        { from: "_notify", text: '⏰ למחרת בבוקר...', delay: 1200 },
        { from: "miriam", text: '😱😱😱😱😱😱😱😱', delay: 800, typingMs: 800, isEmoji: true },
        { from: "miriam", text: '7:43!!! שבע וארבעים ושלוש!! קידוח!! רעש!! איתי!! ליאת!! זה בניין לא בית חרושת!!', delay: 300, typingMs: 1800 },
        { from: "miriam", text: 'הקלטתי 🎙️ 40 שניות של קידוח רצוף. שלחתי לעורך דין.', delay: 200, typingMs: 1200 },
        { from: "yossi",  text: '😂 מרים שלחת הקלטה לעו"ד בגלל קידוח?! 😂', delay: 200, typingMs: 1000 },
        { from: "miriam", text: 'יוסי!! זה לא מצחיק!! ראש שלי!!', delay: 200, typingMs: 900 },
        { from: "valentina", text: 'בבלארוס שכן שלי שיפץ בלילה. שלוש שנים. רק בלילה. 😐', delay: 200, typingMs: 1300 },
        { from: "itai",   text: 'מרים, סליחה!! הפועל לא ידע! הסברנו לו! זה לא יקרה שוב!!', delay: 200, typingMs: 1400 }
      ],
      choices: [
        {
          text: 'מרים, מבינה אותך. ליאת ואיתי — פעם שנייה כזאת ואני גם מגיש תלונה. 😐',
          effects: { miriam: +20, liat: -12, itai: -12, uri: +8 },
          goalDelta: 20,
          next: "beat_3",
          path: "strict"
        },
        {
          text: 'אוקי אוקי, כולם נרגעים! מרים, גב תרופה. ליאת ואיתי — אחריות! 🙏',
          effects: { miriam: +8, liat: +5, itai: +5, yossi: +10 },
          goalDelta: 15,
          next: "beat_3",
          path: "chill"
        },
        {
          text: 'ליאת, אולי תציעי לשכנים עוגה? כפצוי על ה-17 דקות הנוראיות 🎂',
          effects: { miriam: +15, liat: +10, itai: +10, yossi: +15, valentina: +12 },
          goalDelta: 30,
          next: "beat_3",
          path: "cake"
        }
      ]
    },

    // ========== BEAT 3: הפשרה ==========
    {
      id: "beat_3",
      branchMessages: {
        "cake": [
          { from: "liat",   text: 'עוגה!! מצוין!! אני מכינה עוגת שוקולד הערב! 🎂', delay: 200, typingMs: 1000 },
          { from: "miriam", text: 'עוגה... 🤔 אם זה עוגת שוקולד אמיתית... אולי אסלח... לרבע...', delay: 200, typingMs: 1300 },
          { from: "yossi",  text: 'עוגה?!! אני בא!! 🎉', delay: 200, typingMs: 800 },
          { from: "valentina", text: 'בבלארוס עוגות הן שפת אהבה. יהודה הבין הכל. 🌸', delay: 200, typingMs: 1200 }
        ],
        "default": [
          { from: "liat",   text: 'בסדר, בסדר. מרגישה רע. ממש 😔', delay: 200, typingMs: 900 },
          { from: "yossi",  text: 'בסדר ליאת, יוצא מהשיפוץ לא מהחיים 😅', delay: 200, typingMs: 1000 },
          { from: "miriam", text: 'יהודה הפרק מכבד!! סוף סוף!!', delay: 200, typingMs: 1000 }
        ]
      },
      autoNext: "beat_4"
    },

    // ========== BEAT 4: ההחלטה הסופית ==========
    {
      id: "beat_4",
      messages: [
        { from: "uri",    text: 'הכנתי טיוטת "הסכם שיפוץ בין שכנים". צריך חתימות. 6 עמודים.', delay: 400, typingMs: 1400 },
        { from: "yossi",  text: 'אורי! 6 עמודים לשיפוץ?!', delay: 200, typingMs: 900 },
        { from: "uri",    text: 'יש הרבה סעיפים. רעש. שעות. פיצויים. ביטוח.', delay: 200, typingMs: 1000 },
        { from: "miriam", text: 'חותמת!! כולם חותמים!! 😤', delay: 200, typingMs: 900 },
        { from: "valentina", text: 'בבלארוס גם חתמו. אחר כך אף אחד לא קרא.', delay: 200, typingMs: 1100 },
        { from: "itai",   text: 'ליאת, אנחנו חותמים, בסדר? 🙏 ורק שבועיים. מבטיחים.', delay: 200, typingMs: 1200 },
        { from: "liat",   text: 'חותמים. ואני עושה עוגה לכל הבניין. 🎂', delay: 200, typingMs: 900 },
        { from: "miriam", text: 'שוקולד. לא וניל. זה תנאי.', delay: 200, typingMs: 800 }
      ],
      choices: [
        {
          text: '✋ אני מצביע לאשר את "הסכם השיפוץ". כולם חותמים! 📋',
          effects: { uri: +20, miriam: +15, liat: +10, itai: +10 },
          goalDelta: 40,
          next: "beat_5_agreement",
          path: "agreement"
        },
        {
          text: 'ליאת, עוגה לכל הבניין ואנחנו מוחלים על הניירת. 🎂 פשוט יותר.',
          effects: { liat: +20, itai: +15, yossi: +20, valentina: +15, uri: -10, miriam: +10 },
          goalDelta: 45,
          next: "beat_5_cake",
          path: "cake_deal"
        },
        {
          text: 'מה אם ליאת ואיתי מסיימים תוך שבוע? אני מנהל צ\'קאין יומי עם הפועלים 🔨',
          effects: { liat: +12, itai: +12, miriam: +12, uri: +10 },
          goalDelta: 35,
          next: "beat_5_manager",
          path: "manager"
        }
      ]
    },

    // ========== BEAT 5a: הסכם ==========
    {
      id: "beat_5_agreement",
      messages: [
        { from: "uri",    text: '6 חתימות! ההסכם תקף! 🎉 יהודה — ביצוע מצוין!', delay: 200, typingMs: 1400 },
        { from: "miriam", text: 'סוף סוף יש מנגנון! 🙌', delay: 200, typingMs: 900 },
        { from: "yossi",  text: 'כולנו חתמנו על מה שאורי כתב... בלי לקרוא 😂', delay: 200, typingMs: 1100 },
        { from: "uri",    text: 'זה בסדר. לפחות יש מסמך.', delay: 200, typingMs: 800 },
        { from: "liat",   text: 'ואני עוד עושה את העוגה ❤️ תוך שבוע הכל נגמר!', delay: 200, typingMs: 1000 },
        { from: "valentina", text: 'בבלארוס גם כך עשו. חתמו על כל דבר. אין שאלות. 😌', delay: 200, typingMs: 1200 }
      ],
      ending: "agreement"
    },

    // ========== BEAT 5b: עוגה ==========
    {
      id: "beat_5_cake",
      messages: [
        { from: "yossi",  text: 'עוגה!!!! 🎉🎉🎉', delay: 200, typingMs: 700 },
        { from: "liat",   text: 'יהודה אתה גאון! מכינה מחר! שוקולד עם גנאש! 🎂', delay: 200, typingMs: 1200 },
        { from: "miriam", text: 'גנאש!! 😍 ...בסדר. אני מוחלת על הכל. גנאש זה חשוב.', delay: 200, typingMs: 1200 },
        { from: "uri",    text: 'ויתרנו על ההסכם בגלל עוגה. זה... לא איך שתכננתי. 😑', delay: 200, typingMs: 1200 },
        { from: "valentina", text: 'אורי, עוגה עדיפה על מסמכים. זו אמת אוניברסלית. 🌸', delay: 200, typingMs: 1300 },
        { from: "itai",   text: 'יהודה, תבוא לטעימה מחר! 🍰', delay: 200, typingMs: 900 }
      ],
      ending: "cake"
    },

    // ========== BEAT 5c: מנהל ==========
    {
      id: "beat_5_manager",
      messages: [
        { from: "liat",   text: 'יהודה! אתה תנהל את הפועלים?! 😮 זה... סבבה?!', delay: 200, typingMs: 1000 },
        { from: "itai",   text: 'בכיף! תבוא כל בוקר ב-8 וגם אנחנו מגיעים מ-17:00!', delay: 200, typingMs: 1200 },
        { from: "yossi",  text: 'יהודה הפך למנהל עבודה 😂', delay: 200, typingMs: 900 },
        { from: "miriam", text: 'טוב! יש אחראי! יהודה אחראי! 🎉', delay: 200, typingMs: 1000 },
        { from: "valentina", text: 'בבלארוס אין מנהלי עבודה. רק עבודה. זה הרבה יותר גרוע. 😌', delay: 200, typingMs: 1300 },
        { from: "liat",   text: 'ואגב — אנחנו עושים עוגה בסוף השיפוץ! 🎂 יהודה מוזמן!', delay: 200, typingMs: 1000 },
        { from: "miriam", text: 'שוקולד??', delay: 200, typingMs: 600 },
        { from: "liat",   text: 'שוקולד!! 🍫', delay: 200, typingMs: 600 },
        { from: "miriam", text: '✅', delay: 200, typingMs: 400 }
      ],
      ending: "manager"
    }
  ],

  endings: {
    agreement: {
      headline: "הסכם שיפוץ נחתם — בניין הפרחים 12 נכנס לעידן החוזי",
      sub: '"יהודה הנהיג סדר. מרים חתמה בלי לקרוא. אורי שמח מאוד."',
      badgeIcon: "📋",
      badgeLabel: '"מכונן החוזים" — הכנסת נהלים לבניין אנרכי!',
      goalScore: 90
    },
    cake: {
      headline: "עוגת גנאש מסיימת מחלוקת שיפוץ — הדמוקרטיה מנצחת",
      sub: '"יהודה גילה: עוגת שוקולד שווה יותר מ-6 עמודי הסכם"',
      badgeIcon: "🎂",
      badgeLabel: '"דיפלומט המאפים" — פתרת כל דבר עם קמח וחמאה!',
      goalScore: 100
    },
    manager: {
      headline: "יהודה מנהל את השיפוץ — הפך לקבלן הבניין בשוגג",
      sub: '"מה שהתחיל בניהול קטן הפך לקריירה שנייה"',
      badgeIcon: "🔨",
      badgeLabel: '"מנהל העבודה" — מעכשיו כולם ישאלו אותך לפני שיפוץ!',
      goalScore: 85
    }
  }
};
