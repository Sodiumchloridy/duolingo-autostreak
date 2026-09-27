try { process.loadEnvFile?.(); } catch {}

const today = new Date().toISOString().slice(0, 10);
const jwt = process.env.DUOLINGO_JWT?.trim();

if (!jwt) {
  console.error(`❌ [${today}] DUOLINGO_JWT environment variable is missing.`);
  process.exit(1);
}

const maxDelay = Number(process.env.RANDOM_DELAY || 0);
if (maxDelay > 0) {
  const delaySec = Math.floor(Math.random() * maxDelay);
  console.log(`⏳ [${today}] Waiting ${delaySec}s before starting...`);
  await new Promise((resolve) => setTimeout(resolve, delaySec * 1000));
}

try {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt}`,
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  };

  const { sub } = JSON.parse(Buffer.from(jwt.split(".")[1], "base64url").toString());

  const userRes = await fetch(
    `https://www.duolingo.com/2017-06-30/users/${sub}?fields=fromLanguage,learningLanguage`,
    { headers },
  );
  if (!userRes.ok) throw new Error(`User fetch failed (${userRes.status}): ${await userRes.text()}`);
  const { fromLanguage, learningLanguage } = await userRes.json();

  const challengeTypes = [
    "assist", "characterIntro", "characterMatch", "characterPuzzle", "characterSelect",
    "characterTrace", "characterWrite", "completeReverseTranslation", "definition",
    "dialogue", "extendedMatch", "extendedListenMatch", "form", "freeResponse",
    "gapFill", "judge", "listen", "listenComplete", "listenMatch", "match", "name",
    "listenComprehension", "listenIsolation", "listenSpeak", "listenTap",
    "orderTapComplete", "partialListen", "partialReverseTranslate", "patternTapComplete",
    "radioBinary", "radioImageSelect", "radioListenMatch", "radioListenRecognize",
    "radioSelect", "readComprehension", "reverseAssist", "sameDifferent", "select",
    "selectPronunciation", "selectTranscription", "svgPuzzle", "syllableTap",
    "syllableListenTap", "speak", "tapCloze", "tapClozeTable", "tapComplete",
    "tapCompleteTable", "tapDescribe", "translate", "transliterate",
    "transliterationAssist", "typeCloze", "typeClozeTable", "typeComplete",
    "typeCompleteTable", "writeComprehension",
  ];

  let xp = 0;
  const lessons = Number(process.env.LESSONS) || 1;

  for (let i = 0; i < lessons; i++) {
    const sessionRes = await fetch("https://www.duolingo.com/2017-06-30/sessions", {
      method: "POST",
      headers,
      body: JSON.stringify({
        challengeTypes,
        fromLanguage,
        learningLanguage,
        isFinalLevel: false,
        isV2: true,
        juicy: true,
        smartTipsVersion: 2,
        type: "GLOBAL_PRACTICE",
      }),
    });
    if (!sessionRes.ok) throw new Error(`Session creation failed (${sessionRes.status}): ${await sessionRes.text()}`);
    const session = await sessionRes.json();

    const now = Math.floor(Date.now() / 1000);
    const resultRes = await fetch(`https://www.duolingo.com/2017-06-30/sessions/${session.id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        ...session,
        heartsLeft: 0,
        startTime: now - 60,
        enableBonusPoints: false,
        endTime: now,
        failed: false,
        maxInLessonStreak: 9,
        shouldLearnThings: true,
      }),
    });
    if (!resultRes.ok) throw new Error(`Session submission failed (${resultRes.status}): ${await resultRes.text()}`);
    const result = await resultRes.json();

    xp += result.xpGain ?? 0;
  }

  console.log(`🎉 [${today}] Won ${xp} XP!`);
} catch (error) {
  console.error(`❌ [${today}] Error:`, error?.message || error);
  process.exit(1);
}