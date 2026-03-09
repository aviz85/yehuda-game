"use strict";

const EPISODE_8 = {
  id: 8,
  title: "השכן הסודי",
  emoji: "🔍",
  subtitle: "מישהו עבר לדירה 3ב. אף אחד לא ראה אותו. ולנטינה אופה. מרים חוקרת.",
  goal: "גלה מי השכן החדש לפני שמרים תגיע למסקנות שגויות",

  activeChars: ["miriam", "yossi", "uri", "liat", "valentina"],

  initialScores: {
    miriam: 50, yossi: 50, uri: 50, liat: 50, valentina: 50
  },

  dateLabel: "לילה, יום חמישי",

  beats: [
    // ========== BEAT 1: הסימנים הראשונים ==========
    {
      id: "beat_1",
      messages: [
        { from: "miriam", text: 'שלום לכולם. שאלה חשובה. מי עבר לדירה 3ב? ✋ כי יש שם מישהו. 🌙', delay: 600, typingMs: 1500 },
        { from: "yossi",  text: 'מה? מישהו חדש? מתי? 😴 ישנתי', delay: 200, typingMs: 900 },
        { from: "miriam", text: 'אתמול. שלשום. שבוע. חבילות! ערימות של חבילות בכניסה!! מי הזמין?!', delay: 200, typingMs: 1400 },
        { from: "uri",    text: 'אין לי רישום של שכן חדש בדירה 3ב. לפי הניירת — הדירה ריקה מאז ינואר.', delay: 200, typingMs: 1400 },
        { from: "valentina", text: 'ראיתי אור בדירה ב-2 לילה. ועוד פעם ב-3. וב-3:30. 🕯️', delay: 200, typingMs: 1200 },
        { from: "yossi",  text: 'ולנטינה, מה את עושה ערה ב-3:30?', delay: 200, typingMs: 900 },
        { from: "valentina", text: 'שומעת מוזיקה קלאסית. לא קשור.', delay: 200, typingMs: 800 },
        { from: "miriam", text: 'אור!! בלילה!! חבילות!! ו-אף-אחד-לא-ראה-אותו!! מסוכן!! 😤😱', delay: 200, typingMs: 1300 },
        { from: "liat",   text: 'מרים... אולי פשוט ביישן? אולי צריך זמן להסתגל?', delay: 200, typingMs: 1100 },
        { from: "miriam", text: 'ביישן?! ביישן לא מזמין 14 חבילות אמזון!!', delay: 200, typingMs: 1000 }
      ],
      choices: [
        {
          text: 'בואו ניגש לדלת ב-3ב ונדפוק. פשוט ושפוי 🚪',
          effects: { miriam: +10, uri: +8, yossi: +5 },
          goalDelta: 20,
          next: "beat_2",
          path: "knock"
        },
        {
          text: 'ולנטינה, את אופה, נכון? למה לא תכיני משהו ותלכי להכיר? 🍰',
          effects: { valentina: +22, liat: +12, yossi: +8, miriam: +5 },
          goalDelta: 25,
          next: "beat_2",
          path: "bake"
        },
        {
          text: 'בואו נחכה. הוא יצא בסוף. ואז נדבר 🕵️',
          effects: { yossi: +10, liat: +8, uri: +5, miriam: -8 },
          goalDelta: 10,
          next: "beat_2",
          path: "wait"
        }
      ]
    },

    // ========== BEAT 2: הפעולה הראשונה ==========
    {
      id: "beat_2",
      branchMessages: {
        "knock": [
          { from: "miriam", text: 'מי הולך?! אני הולכת! אבל צריך עדים! 📸', delay: 200, typingMs: 1100 },
          { from: "yossi",  text: 'אני אבוא! רוצה לראות את המסתורין 🍿', delay: 200, typingMs: 900 },
          { from: "miriam", text: 'יוסי, אתה לא עד, אתה קהל.', delay: 200, typingMs: 800 }
        ],
        "bake": [
          { from: "valentina", text: 'כן!! אני אאפה!! חייבת! 🍰 מה מתאים? עוגת גבינה? לחם? בורשט?!', delay: 200, typingMs: 1200 },
          { from: "miriam",  text: 'בורשט!! ולנטינה, לא מביאים בורשט להכרות!!', delay: 200, typingMs: 1000 },
          { from: "valentina", text: 'בבלארוס מביאים בורשט לכל אירוע.', delay: 200, typingMs: 800 },
          { from: "liat",   text: 'עוגת גבינה! תקשיבי למרים! 😂', delay: 200, typingMs: 800 }
        ],
        "default": [
          { from: "yossi",  text: 'נחכה? בסדר. כמה זמן? כי יש לי דברים... 😅', delay: 200, typingMs: 1000 },
          { from: "miriam", text: 'יהודה אמר לחכות. אני חוכה. אבל מתעדת. 📸', delay: 200, typingMs: 1000 }
        ]
      },
      autoNext: "beat_3"
    },

    // ========== BEAT 3: המסתורין מעמיק ==========
    {
      id: "beat_3",
      messages: [
        { from: "miriam", text: 'עדכון: שבוע שלישי. עדיין לא ראינו אותו. חבילות: 23. 📦 מהן הצווארים? לא יודעת. לא פתחתי.', delay: 400, typingMs: 1800 },
        { from: "yossi",  text: 'לא פתחת?! מרים!! זה שיא שלך!! 🎉', delay: 200, typingMs: 1000 },
        { from: "miriam", text: 'אני לא פותחת חבילות!! אני רק... מחזיקה אותן נגד האור.', delay: 200, typingMs: 1100 },
        { from: "valentina", text: 'הכנתי עוגת גבינה ודפקתי. אמר "תודה" מאחורי הדלת. זה הכל. 🍰', delay: 200, typingMs: 1300 },
        { from: "miriam", text: 'לא פתח?! לא יצא?! אמר רק תודה?!', delay: 200, typingMs: 1000 },
        { from: "valentina", text: 'קול חרישי. נעים. רגיש.', delay: 200, typingMs: 800 },
        { from: "liat",   text: 'ניצן ישב ליד הדלת שלו שעה אחת. לא יצא ולא ניסה להפחיד 🐕', delay: 200, typingMs: 1200 },
        { from: "uri",    text: 'שלחתי הודעת ברוכים הבאים רשמית. 3 עמודים. לא ענה.', delay: 200, typingMs: 1100 },
        { from: "yossi",  text: 'אולי פשוט בן אדם שאוהב להיות לבד? 🤷', delay: 200, typingMs: 1000 },
        { from: "miriam", text: 'יוסי! בן אדם שאוהב להיות לבד לא מזמין 23 חבילות!! אלא אם הוא... מסתיר משהו!! 😱', delay: 200, typingMs: 1500 }
      ],
      choices: [
        {
          text: 'בואו ניגש שוב, הפעם עם כולנו, בחיוך. קבוצה שלמה =\u00a0פחות מאיים 😊',
          effects: { miriam: +10, valentina: +12, liat: +10, yossi: +10 },
          goalDelta: 30,
          next: "beat_4a",
          path: "group_visit"
        },
        {
          text: 'מרים, מה אם הוא מפורסם ומסתתר מהתקשורת? 🎬',
          effects: { miriam: +15, yossi: +18, valentina: +12 },
          goalDelta: 20,
          next: "beat_4b",
          path: "celebrity"
        },
        {
          text: 'חברים, בואו נכבד את הפרטיות שלו. כשיהיה מוכן — יצא. 🙏',
          effects: { liat: +15, yossi: +12, uri: +10, miriam: -10 },
          goalDelta: 15,
          next: "beat_4c",
          path: "privacy"
        }
      ]
    },

    // ========== BEAT 4a: ביקור קבוצתי ==========
    {
      id: "beat_4a",
      messages: [
        { from: "miriam", text: 'כולנו הלכנו! דפקנו! ו...', delay: 400, typingMs: 1000 },
        { from: "yossi",  text: 'פתח!! 😮😮😮', delay: 200, typingMs: 700 },
        { from: "valentina", text: 'פתח! ממש נחמד! שם אלכסנדר! 30 ומשהו! כתב תסריטים לטלוויזיה!! 🎬', delay: 200, typingMs: 1400 },
        { from: "yossi",  text: 'תסריטאי?! מה הסדרה?! 😄', delay: 200, typingMs: 900 },
        { from: "valentina", text: 'אמר שם של סדרה. מרים קפאה.', delay: 200, typingMs: 900 },
        { from: "miriam", text: '...אני... צופה בסדרה הזאת!! שנתיים!! כל ביצה!! 😱😱😱', delay: 200, typingMs: 1300 },
        { from: "liat",   text: 'מרים אוהדת!! 🎉', delay: 200, typingMs: 800 },
        { from: "miriam", text: 'אני לא "אוהדת"!! אני... צרכנית תוכן!! זה שונה!! ...האם אוכל לקחת חתימה?!', delay: 200, typingMs: 1400 },
        { from: "yossi",  text: '😂😂😂😂 מרים מבקשת חתימה 😂', delay: 200, typingMs: 900 },
        { from: "valentina", text: 'אלכסנדר אמר שהוא בא לבניין הזה דווקא כי "שמע שיש דיירים עם אופי" לסדרה החדשה! 😮', delay: 200, typingMs: 1500 },
        { from: "miriam", text: '..."דיירים עם אופי"... 🤔 ...האם... האם אני אהיה בסדרה?!', delay: 200, typingMs: 1100 }
      ],
      ending: "friendly"
    },

    // ========== BEAT 4b: תיאוריית הסלבריטי ==========
    {
      id: "beat_4b",
      messages: [
        { from: "miriam", text: 'מפורסם!! ידעתי!! ידעתי!! 😱 מי?! שחקן? זמר? פוליטיקאי?!', delay: 200, typingMs: 1200 },
        { from: "yossi",  text: 'שמעתי שאחד השחקנים ממשחקי הכס גר בישראל עכשיו 👀', delay: 200, typingMs: 1100 },
        { from: "miriam", text: 'יוסי!! זה לא—', delay: 200, typingMs: 700 },
        { from: "valentina", text: 'נסיתי שוב. אמר שמו: אלכסנדר. עובד בבית ועדיף שקט. כותב. 📝', delay: 200, typingMs: 1200 },
        { from: "liat",   text: 'כותב! אולי סופר! 📚', delay: 200, typingMs: 800 },
        { from: "uri",    text: 'בדקתי. יש תסריטאי בשם אלכסנדר נחמן. 35. זכה בפרס הטלוויזיה הישראלית 2023.', delay: 200, typingMs: 1400 },
        { from: "miriam", text: '...זו הסדרה שאני צופה!! שנתיים!! 😱😱😱 הוא... גר... פה?!', delay: 200, typingMs: 1300 },
        { from: "yossi",  text: 'מרים, מה אמרת קודם? "פרטיות חשובה"? 😂', delay: 200, typingMs: 1000 },
        { from: "miriam", text: 'אמרתי?! לא אמרתי!! אני הולכת להכיר!! פרוטוקולית!! בתור שכנה!! 😤', delay: 200, typingMs: 1200 },
        { from: "valentina", text: 'הוא גם אמר שיצא לאחר שבוע אחרי שיגמור פרק. שבוע.', delay: 200, typingMs: 1100 },
        { from: "miriam", text: 'שבוע!! אני אחכה!! שבוע זה כלום!! 😤 (וולנטינה — שמרי עליו)', delay: 200, typingMs: 1100 }
      ],
      ending: "celebrity"
    },

    // ========== BEAT 4c: פרטיות ==========
    {
      id: "beat_4c",
      messages: [
        { from: "liat",   text: 'יהודה צודק. אם הוא רוצה שקט — נכבד.', delay: 300, typingMs: 1000 },
        { from: "miriam", text: '...בסדר. אני כובדת. 🙏 עד... גבול מסוים.', delay: 200, typingMs: 1000 },
        { from: "yossi",  text: 'גבול מסוים?', delay: 200, typingMs: 700 },
        { from: "miriam", text: 'עד שארגיש שאני חייבת לדעת מי גר 3 מטר ממני! 😤', delay: 200, typingMs: 1000 },
        { from: "_notify", text: '📦 שבועיים לאחר מכן...', delay: 1200 },
        { from: "valentina", text: 'הוא יצא!! ראיתי!! ממש נחמד!! שמו אלכסנדר!! מחייך!! 😊', delay: 400, typingMs: 1300 },
        { from: "miriam", text: 'אלכסנדר?! יצא?! איפה?! מה הוא לובש?! עגול? שטוח? גבוה?! 😤', delay: 200, typingMs: 1200 },
        { from: "yossi",  text: 'ולנטינה, מה הוא עושה?', delay: 200, typingMs: 800 },
        { from: "valentina", text: 'כותב. תסריטים. אמר שהבניין הזה השרה לו את הדמויות לסדרה החדשה. 😊', delay: 200, typingMs: 1400 },
        { from: "miriam", text: '...אנחנו... דמויות... בסדרה?! 😱 אני דמות?! אני בפרייםטיים?!', delay: 200, typingMs: 1200 },
        { from: "liat",   text: 'יהודה! כיבדנו את הפרטיות שלו! וגילינו שמישהו כותב עלינו! 🎬', delay: 200, typingMs: 1200 }
      ],
      ending: "ghost_reveal"
    }
  ],

  endings: {
    friendly: {
      headline: "השכן הסודי גילה את עצמו — והוא כותב סדרה על הבניין",
      sub: '"מרים ביקשה חתימה. זה יכנס לסדרה."',
      badgeIcon: "🎬",
      badgeLabel: '"שבירת הקרח" — פתחת דלת שאיש לא העז לדפוק!',
      goalScore: 100
    },
    celebrity: {
      headline: "אלכסנדר נחמן גר בבניין — מרים מכירה כל פרק שלו",
      sub: '"התיאוריה על שחקן ממשחקי הכס הייתה שגויה — אבל קרובה."',
      badgeIcon: "⭐",
      badgeLabel: '"מגלה הסלבריטי" — תיאוריה מוצלחת שהתממשה בערך!',
      goalScore: 85
    },
    ghost_reveal: {
      headline: "כיבוד פרטיות — השכן יצא, הסדרה מתחילה",
      sub: '"הסבלנות של יהודה הפכה את הבניין לסט צילומים."',
      badgeIcon: "📝",
      badgeLabel: '"דמות בסדרה" — כבדת פרטיות ויצאת כוכב!',
      goalScore: 90
    }
  }
};
