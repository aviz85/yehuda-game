"use strict";

const EPISODE_7 = {
  id: 7,
  title: "הבחירות",
  emoji: "🗳️",
  subtitle: "אורי מועמד לוועד. יוסי מבטיח פיצה. ולנטינה מצביעת בכל מקרה.",
  goal: "הגיע יום הבחירות — נצח את אורי או מנע דיקטטורה של נהלים",

  activeChars: ["uri", "miriam", "yossi", "liat", "valentina"],

  initialScores: {
    uri: 50, miriam: 50, yossi: 50, liat: 50, valentina: 50
  },

  dateLabel: "יום הבחירות לוועד",

  beats: [
    // ========== BEAT 1: אורי מכריז ==========
    {
      id: "beat_1",
      messages: [
        { from: "uri",    text: 'חברי הבניין, אני מודיע רשמית על מועמדותי לתפקיד יו"ר ועד הבית. 📋 תוכניתי: ניהול מסמכים, תיקון מיידי לכל ליקוי, וישיבות חודשיות של 3 שעות.', delay: 600, typingMs: 2000 },
        { from: "miriam", text: 'שלוש שעות!! שלוש!! 😱', delay: 300, typingMs: 1000 },
        { from: "yossi",  text: 'אורי, אתה יודע שמעולם לא הגעת לאסיפה עם פיצה ⚠️', delay: 200, typingMs: 1200 },
        { from: "uri",    text: 'ישיבות הוועד אינן מצריכות כיבוד.', delay: 200, typingMs: 900 },
        { from: "yossi",  text: 'ובכן...', delay: 200, typingMs: 600 },
        { from: "valentina", text: 'מה זה "יו"ר"? כמו президент של הבניין? יש כוח?! 🤩', delay: 200, typingMs: 1200 },
        { from: "uri",    text: 'לא בדיוק "כוח". יש אחריות, סמכות חתימה, ותקציב.', delay: 200, typingMs: 1100 },
        { from: "valentina", text: 'תקציב!! זה כוח!! בבלארוס עם תקציב — זה כוח!! 😮', delay: 200, typingMs: 1200 },
        { from: "miriam", text: 'אורי, אתה טוב אבל שלוש שעות ישיבה זה עינוי. 😤', delay: 200, typingMs: 1100 },
        { from: "liat",   text: 'יהודה! תתמודד!! אתה הרבה יותר אנושי מאורי!! 😅', delay: 200, typingMs: 1100 }
      ],
      choices: [
        {
          text: 'כולם — אני מציג מועמדות! מבטיח: ישיבות של שעה מקסימום, ופיצה 🍕',
          effects: { yossi: +22, miriam: +15, liat: +18, valentina: +12, uri: -10 },
          goalDelta: 30,
          next: "beat_2",
          path: "run"
        },
        {
          text: 'אורי, בחן שוב. 3 שעות ישיבה לא תקבל קוורום. אולי קצר יותר? 🤔',
          effects: { uri: +8, miriam: +10, yossi: +8 },
          goalDelta: 15,
          next: "beat_2",
          path: "advise"
        },
        {
          text: 'יוסי, אתה מתמודד? פיצה + ישיבות קצרות — אתה תנצח 😄',
          effects: { yossi: +25, uri: -5, miriam: +8, liat: +10 },
          goalDelta: 20,
          next: "beat_2",
          path: "push_yossi"
        }
      ]
    },

    // ========== BEAT 2: קמפיין ==========
    {
      id: "beat_2",
      branchMessages: {
        "run": [
          { from: "yossi",  text: 'יהודה מתמודד!! 🎉 אני מוסיף לפלטפורמה שלו: גם מנגל חודשי!', delay: 200, typingMs: 1100 },
          { from: "uri",    text: 'אני מכיר את הנהלים כמו כף ידי. מועמד חדש צריך 6 חודשים לפחות ללמוד את המערכת.', delay: 200, typingMs: 1500 },
          { from: "miriam", text: 'אורי, אנחנו כבר מכירים אותך שלוש שנים. יהודה מביא אויר רענן 🌬️', delay: 200, typingMs: 1300 }
        ],
        "push_yossi": [
          { from: "yossi",  text: 'אני?! יו"ר?! ממ... אוקי. הפלטפורמה שלי: פיצה לכל ישיבה, ישיבות קצרות, ואני לא קורא מסמכים. 😂', delay: 200, typingMs: 1600 },
          { from: "uri",    text: 'זו לא פלטפורמה. זה... 😑', delay: 200, typingMs: 900 },
          { from: "miriam", text: 'יוסי!! אני בעד!! 🎉', delay: 200, typingMs: 800 }
        ],
        "default": [
          { from: "uri",    text: 'אני שמח לשמוע הצעות. אבל הניסיון שלי בניהול הוועד מדבר בעד עצמו.', delay: 200, typingMs: 1400 },
          { from: "miriam", text: 'ניסיון כן, אבל 3 שעות — לא.', delay: 200, typingMs: 900 }
        ]
      },
      autoNext: "beat_3"
    },

    // ========== BEAT 3: הוויכוח הגדול ==========
    {
      id: "beat_3",
      messages: [
        { from: "miriam", text: 'אני הכנתי רשימת דרישות! מי שרוצה את קולי — צריך להבטיח: שתיקה בבוקר, כלבים רק בחצר, ותקנון כביסה. 📋', delay: 400, typingMs: 1800 },
        { from: "yossi",  text: 'תקנון כביסה?!', delay: 200, typingMs: 700 },
        { from: "miriam", text: 'מישהו השאיר כביסה על הגג שבועיים! שבועיים!! לא אומר שמות!! 😤', delay: 200, typingMs: 1300 },
        { from: "yossi",  text: '...אחפש את הכביסה שלי.', delay: 200, typingMs: 900 },
        { from: "liat",   text: 'ניצן מצביע ליהודה! 🐕🗳️', delay: 200, typingMs: 800 },
        { from: "miriam", text: 'ניצן לא מצביע!! הוא לא בעל דירה!! הוא כלב!!', delay: 200, typingMs: 1000 },
        { from: "valentina", text: 'בבלארוס הצבעתי פעם אחת ולא הבנתי על מה. כאן לפחות מסבירים. 🤔', delay: 200, typingMs: 1300 },
        { from: "uri",    text: 'אני מתחייב לכל דרישות מרים. ואוסיף: דו"ח חודשי לכל דייר. 12 עמודים.', delay: 200, typingMs: 1400 },
        { from: "miriam", text: '12 עמודים חודשי?! ...בעד! 🎉', delay: 200, typingMs: 900 }
      ],
      choices: [
        {
          text: 'אני מבטיח: שעה ישיבה, פיצה, דוח של עמוד אחד, ו... תקנון כביסה. 🍕📋',
          effects: { miriam: +20, yossi: +18, liat: +15, valentina: +10, uri: -15 },
          goalDelta: 40,
          next: "beat_4_run",
          path: "campaign_run"
        },
        {
          text: 'אורי, אתה המועמד הטוב ביותר. אני תומך בך אם תקצר ל-90 דקות. 🤝',
          effects: { uri: +25, miriam: +5, yossi: -5 },
          goalDelta: 20,
          next: "beat_4_uri",
          path: "support_uri"
        },
        {
          text: 'הצעה: ועדה משותפת! יהודה + אורי. חזק + מאורגן. 💪',
          effects: { uri: +12, miriam: +12, yossi: +12, liat: +12, valentina: +12 },
          goalDelta: 50,
          next: "beat_4_joint",
          path: "joint"
        }
      ]
    },

    // ========== BEAT 4a: יהודה מנצח ==========
    {
      id: "beat_4_run",
      messages: [
        { from: "_notify", text: '🗳️ ההצבעה מתחילה!', delay: 800 },
        { from: "yossi",  text: '✋ יהודה!!', delay: 400, typingMs: 700 },
        { from: "liat",   text: '✋ יהודה! (וניצן — לא רשמי 🐕)', delay: 200, typingMs: 800 },
        { from: "valentina", text: '✋ יהודה! עם פיצה!', delay: 200, typingMs: 800 },
        { from: "miriam", text: '...✋ יהודה. הוא הבטיח תקנון כביסה.', delay: 200, typingMs: 1000 },
        { from: "uri",    text: '4-1. יהודה, מזל טוב. 😶 אשמח לעזור בניהול הנהלים.', delay: 200, typingMs: 1300 },
        { from: "yossi",  text: '🎉🎉🎉 ועד חדש!! עם פיצה!! 🎉🎉🎉', delay: 200, typingMs: 900 },
        { from: "liat",   text: 'יהודה הוא יו"ר הבניין!! ❤️', delay: 200, typingMs: 800 },
        { from: "valentina", text: 'יהודה нашПрезидент!! 🎉', delay: 200, typingMs: 900 }
      ],
      ending: "yehuda_wins"
    },

    // ========== BEAT 4b: אורי מנצח ==========
    {
      id: "beat_4_uri",
      messages: [
        { from: "uri",    text: 'תודה יהודה. אני מתחייב ל-90 דקות.', delay: 200, typingMs: 1000 },
        { from: "_notify", text: '🗳️ ההצבעה מתחילה!', delay: 800 },
        { from: "uri",    text: '✋ אורי.', delay: 400, typingMs: 500 },
        { from: "miriam", text: '✋ אורי. 12 עמודים. בטחון.', delay: 200, typingMs: 900 },
        { from: "liat",   text: '🤔 ...✋ אורי. יהודה הצביע לו.', delay: 200, typingMs: 900 },
        { from: "yossi",  text: '...✋ אורי. אבל אני מצפה לפיצה פעם.', delay: 200, typingMs: 1000 },
        { from: "valentina", text: '✋ אורי! (לא ידעתי למי אבל כולם הצביעו)', delay: 200, typingMs: 1100 },
        { from: "uri",    text: '5-0!! מזל טוב לעצמי. 📋 אוכין לוח שנה לישיבות. 90 דקות.', delay: 200, typingMs: 1400 },
        { from: "yossi",  text: '😂 אורי ניצח... 90 דקות... אנחנו גמורים 😂', delay: 200, typingMs: 1000 }
      ],
      ending: "uri_wins"
    },

    // ========== BEAT 4c: ועד משותף ==========
    {
      id: "beat_4_joint",
      messages: [
        { from: "uri",    text: 'ועדה משותפת? מעניין. מה תפקיד כל אחד?', delay: 200, typingMs: 1100 },
        { from: "yossi",  text: 'יהודה אחראי על פיצה. אורי על נהלים. 🍕📋', delay: 200, typingMs: 1000 },
        { from: "miriam", text: 'ואני — אחראית על תקנון הכביסה! 🎉', delay: 200, typingMs: 900 },
        { from: "liat",   text: 'ניצן אחראי על פינות הכלבים! 🐕', delay: 200, typingMs: 800 },
        { from: "miriam", text: 'ניצן לא מקבל תפקיד! הוא כלב!', delay: 200, typingMs: 800 },
        { from: "valentina", text: 'בבלארוס ועד מפלגתי תמיד ניצח. ועד משותף — מה זה?! 😮', delay: 200, typingMs: 1300 },
        { from: "uri",    text: 'אני מקבל. יהודה — יו"ר. אני — מנהל נהלים. מחלקים אחריות.', delay: 200, typingMs: 1400 },
        { from: "yossi",  text: '✋ בעד!! ישיבה ראשונה עם פיצה!! 🎉', delay: 200, typingMs: 900 },
        { from: "miriam", text: '✋ בעד. בתנאי שאני חותמת על תקנון הכביסה.', delay: 200, typingMs: 1000 },
        { from: "liat",   text: '✋ בעד! ✋ (וניצן)', delay: 200, typingMs: 700 },
        { from: "valentina", text: '✋ בעד! אני לא ידעתי מה אני בוחרת אבל אני בעד!', delay: 200, typingMs: 1100 }
      ],
      ending: "joint_committee"
    }
  ],

  endings: {
    yehuda_wins: {
      headline: "יהודה נבחר לוועד — בניין הפרחים נכנס לעידן חדש",
      sub: '"הפיצה הכריעה. תמיד הפיצה מכריעה. מרים מקבלת תקנון כביסה."',
      badgeIcon: "🏆",
      badgeLabel: '"יו"ר הבניין" — ניצחת בדמוקרטיה הכי ישראלית שיש!',
      goalScore: 100
    },
    uri_wins: {
      headline: "אורי נבחר — 90 דקות, 12 עמודים, ועד ממושמע",
      sub: '"יהודה הפסיד אבל הרוויח את אמון אורי — עסקה לא רעה"',
      badgeIcon: "📋",
      badgeLabel: '"עושה שלום" — בחרת יציבות על ניצחון!',
      goalScore: 75
    },
    joint_committee: {
      headline: "ועד משותף — יהודה ואורי שולטים יחד (כמעט)",
      sub: '"ניצן קיבל תפקיד לא רשמי. מרים הכחישה שזה חמוד."',
      badgeIcon: "🤝",
      badgeLabel: '"מגדיר האיזון" — יצרת מנגנון שלא ריגז אף אחד!',
      goalScore: 90
    }
  }
};
