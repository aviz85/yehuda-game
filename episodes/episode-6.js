"use strict";

const EPISODE_6 = {
  id: 6,
  title: "האיירביאנבי",
  emoji: "🏨",
  subtitle: "תיירים בשלוש לילה. דלת מבחוץ. מרים חושבת. יוסי מתיידד.",
  goal: "גלה מי מוריד תיירים ומה עושים עם זה",

  activeChars: ["miriam", "yossi", "uri", "liat", "valentina"],

  initialScores: {
    miriam: 50, yossi: 50, uri: 50, liat: 50, valentina: 50
  },

  dateLabel: "היום, יום חמישי",

  beats: [
    // ========== BEAT 1: התחושה הזרה ==========
    {
      id: "beat_1",
      messages: [
        { from: "miriam", text: 'מישהו שם לב שיש אנשים זרים בבניין? אנשים עם מזוודות. שלשום. אתמול. הבוקר. 🧳', delay: 600, typingMs: 1600 },
        { from: "yossi",  text: 'אה כן! ראיתי אותם! זוג גרמני! ממש נחמדים! הם אמרו שזה "beautiful neighborhood" 😄', delay: 300, typingMs: 1500 },
        { from: "miriam", text: 'יוסי!! הם דיברו איתך?!! נתת להם מידע על הבניין?!', delay: 200, typingMs: 1200 },
        { from: "yossi",  text: 'נתתי להם גם המלצה על המסעדה של פלפל 😅', delay: 200, typingMs: 1000 },
        { from: "miriam", text: 'יוסי!!! 😤😤😤', delay: 200, typingMs: 700 },
        { from: "valentina", text: 'הבוקר בכניסה ראיתי אישה מצלמת הכל. גם את תיבות הדואר. מוזר. 🤔', delay: 200, typingMs: 1300 },
        { from: "uri",    text: 'אפשר לדעת מי גר בדירה 3ב? זה לא ברשימה שלי. 📋', delay: 300, typingMs: 1200 },
        { from: "miriam", text: 'דירה 3ב!! זה!! ראיתם?! ראיתם?! כל הזמן מ-3ב!!', delay: 200, typingMs: 1100 }
      ],
      choices: [
        {
          text: 'מרים, מה אנחנו יודעים בוודאות? בואו נאסוף עובדות לפני שמאשימים 🕵️',
          effects: { miriam: +8, uri: +12, yossi: +5 },
          goalDelta: 20,
          next: "beat_2",
          path: "detective"
        },
        {
          text: 'יוסי, אתה מדבר עם כולם — מה אמרו לך הגרמנים על המקום? 🔍',
          effects: { yossi: +18, miriam: +10, valentina: +8 },
          goalDelta: 15,
          next: "beat_2",
          path: "ask_yossi"
        },
        {
          text: 'אורי, תבדוק את רשימת הדיירים. מי גר ב-3ב? 📋',
          effects: { uri: +20, miriam: +12 },
          goalDelta: 25,
          next: "beat_2",
          path: "check_list"
        }
      ]
    },

    // ========== BEAT 2: הבדיקה ==========
    {
      id: "beat_2",
      branchMessages: {
        "ask_yossi": [
          { from: "yossi",  text: 'הגרמנים אמרו שהם הזמינו דרך אפליקציה. Airbnb. כתוב "apartment in Tel Aviv, ground floor". 🤔', delay: 200, typingMs: 1500 },
          { from: "miriam", text: 'Airbnb!! ידעתי!! ידעתי!!! 😤', delay: 200, typingMs: 900 },
          { from: "uri",    text: 'Airbnb בבניין שלנו?! זה דורש בירור מיידי.', delay: 200, typingMs: 1000 }
        ],
        "check_list": [
          { from: "uri",    text: 'בדקתי. דירה 3ב שייכת... ל... ליאת. 😮', delay: 200, typingMs: 1400 },
          { from: "miriam", text: 'לִיאַת!!!! 😱😱😱', delay: 200, typingMs: 800 },
          { from: "yossi",  text: 'ליאת? וואו. לא ציפיתי. 😮', delay: 200, typingMs: 1000 }
        ],
        "default": [
          { from: "miriam", text: 'עובדות? עובדה אחת: יש זרים בבניין שלי!! זו עובדה!! 😤', delay: 200, typingMs: 1200 },
          { from: "uri",    text: 'בדקתי. דירה 3ב שייכת ל... ליאת.', delay: 200, typingMs: 1100 },
          { from: "yossi",  text: 'ליאת! המפתיע!!', delay: 200, typingMs: 900 }
        ]
      },
      autoNext: "beat_3"
    },

    // ========== BEAT 3: הגילוי הגדול ==========
    {
      id: "beat_3",
      messages: [
        { from: "miriam", text: 'ליאת!! ליאת!! מה זה הדירה 3ב?! מי הם האנשים?! אפליקציה?! 😤', delay: 400, typingMs: 1500 },
        { from: "liat",   text: '...אה. כן. ממ. הדירה הקטנה של הורי שפנויה... הוצאנו אותה ל-Airbnb לפני שישה חודשים. 😅', delay: 300, typingMs: 1600 },
        { from: "miriam", text: 'שישה חודשים!!! שישה!! חודשים!!!! ולא אמרת כלום?!?!', delay: 200, typingMs: 1300 },
        { from: "yossi",  text: 'ליאת אחלה עסק! כמה עושים? 💰', delay: 200, typingMs: 900 },
        { from: "miriam", text: 'יוסי!! זה לא "כמה עושים"!! זה אנרכיה!! זה בטחון!! זה... זה... יש לי עוד 14 נקודות!! 😤', delay: 200, typingMs: 1500 },
        { from: "valentina", text: 'בבלארוס השכרת דירה לזרים = בעיות עם השלטון. כאן אפשר? 😮', delay: 200, typingMs: 1300 },
        { from: "uri",    text: 'לפי חוק הרשויות והתקנון, השכרה לתיירים לא מוסדרת בתקנון הבניין הנוכחי. זה פרצה. 📋', delay: 200, typingMs: 1600 },
        { from: "liat",   text: 'אנחנו בודקים את האורחים! הם נחמדים! לא פגעו בכלום!', delay: 200, typingMs: 1100 },
        { from: "miriam", text: '3 בלילה!! דלת!! רעש!! ידעת?!', delay: 200, typingMs: 900 },
        { from: "liat",   text: 'אה. הטיסה שלהם הגיעה מאוחר... 😓', delay: 200, typingMs: 800 }
      ],
      choices: [
        {
          text: 'ליאת, אני מבין שאת צריכה הכנסה. אבל צריך להסדיר. בואו נצביע על כללים 📋',
          effects: { liat: +8, uri: +18, miriam: +12, yossi: +5 },
          goalDelta: 35,
          next: "beat_4a",
          path: "regulate"
        },
        {
          text: 'ליאת, זה לא הוגן לשכנים. צריך להפסיק. 🙏',
          effects: { liat: -20, miriam: +22, uri: +15, valentina: +8 },
          goalDelta: 20,
          next: "beat_4b",
          path: "stop"
        },
        {
          text: 'רגע — אם ליאת מרוויחה, אולי הרווח ישמש את קופת הוועד? הכנסה לבניין! 💡',
          effects: { liat: +15, yossi: +20, uri: +10, miriam: +10 },
          goalDelta: 50,
          next: "beat_4c",
          path: "profit_share"
        }
      ]
    },

    // ========== BEAT 4a: הסדרה ==========
    {
      id: "beat_4a",
      messages: [
        { from: "uri",    text: 'הצעה: ליאת ממשיכה אבל עם כללים. אורחים עד 22:00, תיאום מראש, ודיירים מקבלים סיכום חודשי. 📋', delay: 200, typingMs: 1600 },
        { from: "miriam", text: 'ו-אני-מקבלת-מפתח-ל-3ב. בטחון בניין.', delay: 200, typingMs: 1000 },
        { from: "liat",   text: 'מרים, אין סיכוי שתקבלי מפתח 😅', delay: 200, typingMs: 900 },
        { from: "miriam", text: 'בסדר. אז לפחות שתי שעות שקט בבוקר.', delay: 200, typingMs: 900 },
        { from: "yossi",  text: 'הגרמנים שאלו אותי אם אני מדריך. אמרתי שכן. אם יהיה שיתוף — אני מדריך עיר! 😎', delay: 200, typingMs: 1500 },
        { from: "valentina", text: 'אני יכולה ללמד אורחים בלארוסית! שפה שימושית... פחות. 😅', delay: 200, typingMs: 1300 },
        { from: "liat",   text: '✋ מסכימה לכללים! ותודה יהודה על הגישה 🙏', delay: 200, typingMs: 1000 }
      ],
      ending: "regulate"
    },

    // ========== BEAT 4b: עצירה ==========
    {
      id: "beat_4b",
      messages: [
        { from: "liat",   text: '...אני מבינה. זה לא הגיוני מול כולם. נפסיק. 😔', delay: 200, typingMs: 1200 },
        { from: "miriam", text: 'נכון!! בניין לא מלון!! 🎉', delay: 200, typingMs: 900 },
        { from: "yossi",  text: 'הי ליאת, אם צריכים הכנסה — ניצן מצייר? אפשר למכור ציורים של כלבים 😂', delay: 200, typingMs: 1400 },
        { from: "liat",   text: 'יוסי!! ניצן לא מצייר!! 😂😂', delay: 200, typingMs: 800 },
        { from: "uri",    text: 'הכניס לתקנון: "אין השכרה לתיירים ללא אישור ועד". 3 עמודים.', delay: 200, typingMs: 1300 },
        { from: "valentina", text: 'בבלארוס מה שאסור — אסור. מה שמותר — גם לפעמים אסור. עדיף לשאול. 🤷', delay: 200, typingMs: 1400 }
      ],
      ending: "stop"
    },

    // ========== BEAT 4c: חלוקת רווחים ==========
    {
      id: "beat_4c",
      messages: [
        { from: "yossi",  text: 'יהודה!! גאון!! כסף לבניין!! 🎉🎉', delay: 200, typingMs: 1000 },
        { from: "liat",   text: 'ממ... כמה אחוזים אתם חושבים?', delay: 200, typingMs: 1000 },
        { from: "miriam", text: 'עשרים אחוז! ועדיפות לשקט בבוקר! ועוגת ארוחת בוקר לי!', delay: 200, typingMs: 1100 },
        { from: "liat",   text: 'עוגת ארוחת בוקר?! 😂 מרים, זה לא קשור—', delay: 200, typingMs: 900 },
        { from: "miriam", text: 'הכל קשור. תמיד הכל קשור.', delay: 200, typingMs: 800 },
        { from: "uri",    text: 'אני מציע: 15% לקופת הוועד, אורחים עד 22:00, ולנטינה מדריכה ברוסית לתיירים מרוסיה.', delay: 200, typingMs: 1600 },
        { from: "valentina", text: 'אני מדריכה?! אני רוצה!! בבלארוסית?!', delay: 200, typingMs: 1100 },
        { from: "yossi",  text: 'ואני מדריך בעברית! 😎 יהודה, פתחנו עסק!!', delay: 200, typingMs: 1100 },
        { from: "liat",   text: '15% + אורחים עד 22:00 + ניצן בסרטוני ה-Airbnb שלנו 🐕❤️', delay: 200, typingMs: 1200 },
        { from: "miriam", text: 'ניצן ב-Airbnb... ניצן פופולרי יותר ממני... 😤 ...בסדר. מסכימה. 🤝', delay: 200, typingMs: 1400 }
      ],
      ending: "profit_share"
    }
  ],

  endings: {
    regulate: {
      headline: "Airbnb בניין מוסדר — דיירים, כללים, ושקט יחסי",
      sub: '"יהודה הפך מצב לא חוקי למשהו שכולם יכולים לחיות איתו"',
      badgeIcon: "📋",
      badgeLabel: '"מסדיר הכאוס" — הכנסת סדר למצב פרוע!',
      goalScore: 85
    },
    stop: {
      headline: "ה-Airbnb נסגר — מרים ניצחה, ליאת עצובה",
      sub: '"לפעמים הנכון לא הכי נעים — אבל ליאת מחפשת הכנסה אחרת"',
      badgeIcon: "🚫",
      badgeLabel: '"שומר הסדר" — עמדת על עקרונות!',
      goalScore: 70
    },
    profit_share: {
      headline: "בניין מרוויח מהתיירים — מרים מנחה, ניצן כוכב",
      sub: '"מה שהתחיל כסכסוך הפך לעסק משפחתי. ניצן מופיע ב-TikTok."',
      badgeIcon: "💰",
      badgeLabel: '"מנכ"ל הבניין" — הפכת בעיה לרווח!',
      goalScore: 100
    }
  }
};
