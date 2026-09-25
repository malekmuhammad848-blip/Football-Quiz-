/**
 * محاكاة كأس كاملة — التحقق من سلامة المحرك بعد الإصلاح
 * تشغيل: bun scripts/simCup.ts
 */
import {
  newCup,
  answerResult,
  finishMatch,
  currentMatch,
  oppTeam,
  type CupState,
  type CupMatch,
} from "../src/domain/cupEngine";

interface Outcome {
  cup: CupState;
  my: number;
  opp: number;
  won: boolean | "pks";
  pksCorrect: number;
}

function playMatch(cup: CupState, myCorrect: number): Outcome {
  let c = cup;
  for (let i = 1; i <= 4; i++) c = answerResult(c, i, i <= myCorrect);
  const draw = c.myGoals === c.oppGoals;
  if (!draw) return { cup: c, my: c.myGoals, opp: c.oppGoals, won: c.myGoals > c.oppGoals, pksCorrect: 0 };
  return { cup: c, my: c.myGoals, opp: c.oppGoals, won: "pks", pksCorrect: 1 };
}

let bugs = 0;
const report = (msg: string) => {
  console.error("❌ " + msg);
  bugs++;
};

for (let trial = 0; trial < 400; trial++) {
  let cup = newCup("sa", trial * 7919 + 13);
  let matchesPlayed = 0;

  while (!cup.champion && !cup.eliminated && matchesPlayed < 8) {
    const m: CupMatch | null = currentMatch(cup);
    if (!m) {
      report(`[${trial}] محجوز بلا مباراة: round=${cup.round} idx=${cup.matchIndex}`);
      break;
    }
    if (!oppTeam(cup)) {
      report(`[${trial}] خصم غير موجود`);
      break;
    }
    const myCorrect = Math.floor(Math.random() * 5);
    const res = playMatch(cup, myCorrect);
    const beforeRound = cup.round;
    const playedMy = res.my;
    const playedOpp = res.opp;
    const oppId = m.home === cup.myTeamId ? m.away : m.home;
    matchesPlayed++;

    cup = finishMatch(res.cup, res.pksCorrect);

    // 1) نتيجة اللاعب تُسجَّل كما لُعبت تمامًا
    const mAfter = cup.bracket[beforeRound]?.find((mm) => mm.home === m.home && mm.away === m.away);
    if (!mAfter) {
      report(`[${trial}] مباراة اللاعب اختفت بعد finishMatch`);
    } else {
      const myIsHome = m.home === cup.myTeamId;
      const recMy = myIsHome ? mAfter.homeGoals : mAfter.awayGoals;
      const recOpp = myIsHome ? mAfter.awayGoals : mAfter.homeGoals;
      if (recMy !== playedMy || recOpp !== playedOpp) {
        report(`[${trial}] سُجّل ${recMy}-${recOpp} بدل ${playedMy}-${playedOpp}`);
      }
      // 2) الفائز صحيح
      const expectedWinner = res.won === "pks" ? (cup.champion === cup.myTeamId || !cup.eliminated ? cup.myTeamId : oppId) : res.won ? cup.myTeamId : oppId;
      if (mAfter.winner !== expectedWinner && !(res.won === "pks" && mAfter.viaPenalties)) {
        report(`[${trial}] winner=${mAfter.winner} متوقع=${expectedWinner}`);
      }
    }

    // 3) فوز ← يجب أن توجد مباراة تالية (كشف الشاشة الفارغة)
    if (!cup.eliminated && !cup.champion) {
      const next = currentMatch(cup);
      if (!next) {
        report(`[${trial}] فوز ثم شاشة فارغة: round=${cup.round} idx=${cup.matchIndex} bracket=${JSON.stringify(cup.bracket[cup.round])}`);
        break;
      }
      if (!oppTeam(cup)) report(`[${trial}] فوز ثم لا خصم في ${cup.round}`);
    }

    // 4) خسارة ← إقصاء + بطل محسوم
    if (cup.eliminated && !cup.champion) report(`[${trial}] إقصاء بلا بطل`);
    // 5) لقب فقط لفريق اللاعب بعد فوز النهائي
    if (cup.champion && cup.champion !== cup.myTeamId && !cup.eliminated) {
      report(`[${trial}] لقب لفريق آخر بلا إقصاء: ${cup.champion}`);
    }
  }

  if (matchesPlayed > 4) report(`[${trial}] مباريات ${matchesPlayed} > 4`);
}

// لعب مثالي يجب أن يفوز بالغالبية
let cupsForPerfect = 0;
for (let trial = 0; trial < 50; trial++) {
  let cup = newCup("br", 1000 + trial);
  let guard = 0;
  while (!cup.champion && !cup.eliminated && guard++ < 6) {
    let c = cup;
    for (let i = 1; i <= 4; i++) c = answerResult(c, i, true);
    cup = finishMatch(c, 2);
  }
  if (cup.champion === "br") cupsForPerfect++;
}
console.log(`لعب مثالي (4/4): لقب ${cupsForPerfect}/50 — المتوقع مرتفع (>35)`);

// لعب صفري يجب ألا يفوز أبدًا
let zeroWonCups = 0;
for (let trial = 0; trial < 50; trial++) {
  let cup = newCup("sa", 5000 + trial);
  let guard = 0;
  while (!cup.champion && !cup.eliminated && guard++ < 6) {
    let c = cup;
    for (let i = 1; i <= 4; i++) c = answerResult(c, i, false);
    cup = finishMatch(c, 0);
  }
  if (cup.champion === "sa") zeroWonCups++;
}
console.log(`لعب صفر أهداف: ألقاب ${zeroWonCups}/50 — المتوقع 0`);

console.log(bugs === 0 ? "✅ المحرك سليم — لا أخطاء" : `💥 ${bugs} خطأ`);
process.exit(bugs === 0 ? 0 : 1);
