export type TarotCard = {
  name: string;
  meaning: string;
  meaningEn: string;
  family: "Major Arcana" | "Wands" | "Cups" | "Swords" | "Coins";
  symbol: string;
  image?: string;
};

const majorArcana: Array<[string, string]> = [
  ["The Fool", "En ny begyndelse, uskyld, eventyr, frihed og modet til at tage en chance."],
  ["The Magician", "Manifestation, handlekraft, evner og magisk fokus."],
  ["The High Priestess", "Intuition, skjult viden, det ubevidste og mystik."],
  ["The Empress", "Frugtbarhed, skønhed, natur og overflod."],
  ["The Emperor", "Struktur, autoritet, stabilitet og faderenergi."],
  ["The Hierophant", "Tradition, tro, åndelig visdom og ritualer."],
  ["The Lovers", "Kærlighed, valg, harmoni og dybe relationer."],
  ["The Chariot", "Viljestyrke, sejr, målrettethed og bevægelse fremad."],
  ["Strength", "Mod, indre styrke, medfølelse og balance."],
  ["The Hermit", "Indadvendthed, sjælesøgning, visdom og alenetid."],
  ["Wheel of Fortune", "Skæbne, cyklusser, held og forandring."],
  ["Justice", "Retfærdighed, sandhed, konsekvenser og balance."],
  ["The Hanged Man", "Nye perspektiver, overgivelse og at give slip."],
  ["Death", "Transformation, afslutning, forvandling og fornyelse."],
  ["Temperance", "Balance, tålmodighed, heling og harmoni."],
  ["The Devil", "Afhængighed, kontrol, skygger og fristelser."],
  ["The Tower", "Pludselig forandring, chok, sammenbrud og opvågning."],
  ["The Star", "Håb, tro, fornyelse og inspiration."],
  ["The Moon", "Illusion, frygt, drømme og intuition."],
  ["The Sun", "Glæde, succes, varme og positivitet."],
  ["Judgement", "Indre kald, tilgivelse og opvågning."],
  ["The World", "Fuldendelse, integration, rejser og resultater."],
];

const englishMeanings: Record<string, string> = {
  "The Fool": "A new beginning, innocence, adventure, freedom, and the courage to take a chance.",
  "The Magician": "Manifestation, action, ability, and focused intention.",
  "The High Priestess": "Intuition, hidden knowledge, the unconscious, and mystery.",
  "The Empress": "Abundance, beauty, nature, and creative growth.",
  "The Emperor": "Structure, authority, stability, and protective energy.",
  "The Hierophant": "Tradition, belief, spiritual wisdom, and ritual.",
  "The Lovers": "Love, choices, harmony, and deep relationships.",
  "The Chariot": "Willpower, victory, determination, and forward movement.",
  Strength: "Courage, inner strength, compassion, and balance.",
  "The Hermit": "Introspection, soul-searching, wisdom, and solitude.",
  "Wheel of Fortune": "Destiny, cycles, luck, and change.",
  Justice: "Justice, truth, consequences, and balance.",
  "The Hanged Man": "New perspectives, surrender, and letting go.",
  Death: "Transformation, endings, change, and renewal.",
  Temperance: "Balance, patience, healing, and harmony.",
  "The Devil": "Attachment, control, shadows, and temptation.",
  "The Tower": "Sudden change, upheaval, collapse, and awakening.",
  "The Star": "Hope, faith, renewal, and inspiration.",
  "The Moon": "Illusion, fear, dreams, and intuition.",
  "The Sun": "Joy, success, warmth, and positivity.",
  Judgement: "An inner calling, forgiveness, and awakening.",
  "The World": "Completion, integration, journeys, and achievement.",
  "Ace of Wands": "New inspiration, energy, potential, and creation.",
  "2 of Wands": "Planning, decisions, and a view toward the future.",
  "3 of Wands": "Progress, expansion, exploration, and opportunity.",
  "4 of Wands": "Celebration, homecoming, harmony, and community.",
  "5 of Wands": "Competition, conflict, and disagreement.",
  "6 of Wands": "Victory, recognition, success, and confidence.",
  "7 of Wands": "Defence, holding your ground, resistance, and courage.",
  "8 of Wands": "Swift movement, progress, and news.",
  "9 of Wands": "Resilience, trials, and boundaries.",
  "10 of Wands": "Burdens, responsibility, and overload.",
  "Page of Wands": "Adventure, discovery, and new inspiration.",
  "Knight of Wands": "Passion, speed, spontaneity, and courage.",
  "Queen of Wands": "Confidence, warmth, charisma, and independence.",
  "King of Wands": "Leadership, vision, creativity, and strength.",
  "Ace of Cups": "New love, emotion, intuition, and joy.",
  "2 of Cups": "Partnership, harmony, attraction, and balance.",
  "3 of Cups": "Friendship, celebration, and community.",
  "4 of Cups": "Withdrawal, stillness, and reflection.",
  "5 of Cups": "Grief, loss, disappointment, and dwelling on the negative.",
  "6 of Cups": "Nostalgia, childhood, joy, and reconciliation.",
  "7 of Cups": "Choices, illusions, and dreams.",
  "8 of Cups": "Walking away, searching for meaning, and change.",
  "9 of Cups": "Contentment, wishes fulfilled, and happiness.",
  "10 of Cups": "Family happiness, harmony, joy, and love.",
  "Page of Cups": "Creativity, intuition, and surprises.",
  "Knight of Cups": "Romance, charm, and dreamy energy.",
  "Queen of Cups": "Care, empathy, intuition, and compassion.",
  "King of Cups": "Emotional balance, reason, and maturity.",
  "Ace of Swords": "Clarity, truth, breakthroughs, and new ideas.",
  "2 of Swords": "Decisions, balance, and a stalemate.",
  "3 of Swords": "Heartbreak, grief, and separation.",
  "4 of Swords": "Rest, healing, pause, and reflection.",
  "5 of Swords": "Conflict, defeat, and self-interest.",
  "6 of Swords": "Transition, travel, and moving forward.",
  "7 of Swords": "Deception, strategy, and hidden actions.",
  "8 of Swords": "Feeling trapped and restricted.",
  "9 of Swords": "Anxiety, worry, and sleeplessness.",
  "10 of Swords": "An ending, pain, and defeat.",
  "Page of Swords": "Curiosity, learning, and new ideas.",
  "Knight of Swords": "Speed, focus, and determination.",
  "Queen of Swords": "Independence, clear communication, and insight.",
  "King of Swords": "Authority, truth, and intellectual strength.",
  "Ace of Coins": "Opportunity, new beginnings, and material gain.",
  "2 of Coins": "Balance, flexibility, and adaptation.",
  "3 of Coins": "Collaboration, skill, and recognition.",
  "4 of Coins": "Stability, control, and holding on.",
  "5 of Coins": "Scarcity, uncertainty, and support through difficulty.",
  "6 of Coins": "Generosity, support, and balance between giving and receiving.",
  "7 of Coins": "Patience, evaluation, and long-term investment.",
  "8 of Coins": "Diligence, skill, learning, and mastery.",
  "9 of Coins": "Independence, luxury, and success.",
  "10 of Coins": "Wealth, legacy, and family traditions.",
  "Page of Coins": "Opportunity, ambition, and learning.",
  "Knight of Coins": "Stability, patience, and responsibility.",
  "Queen of Coins": "Care, security, and abundance.",
  "King of Coins": "Security, success, stability, and prosperity.",
};

const minorArcana: Record<string, Array<[string, string]>> = {
  Wands: [
    ["Ace", "Ny inspiration, energi, potentiale og skabelse."],
    ["2", "Planlægning, beslutninger og blik for fremtiden."],
    ["3", "Fremskridt, udvidelse, udforskning og muligheder."],
    ["4", "Fejring, hjemkomst, harmoni og samvær."],
    ["5", "Konkurrence, konflikt og uenigheder."],
    ["6", "Sejr, anerkendelse, succes og selvtillid."],
    ["7", "Forsvar, at stå fast, modstand og mod."],
    ["8", "Hurtig bevægelse, fremskridt og nyheder."],
    ["9", "Udholdenhed, prøvelser og grænser."],
    ["10", "Byrder, ansvar og overbelastning."],
    ["Page", "Eventyrlyst, opdagelse og ny inspiration."],
    ["Knight", "Passion, hastighed, spontanitet og mod."],
    ["Queen", "Selvsikkerhed, varme, karisma og uafhængighed."],
    ["King", "Lederskab, vision, skaberkraft og styrke."],
  ],
  Cups: [
    ["Ace", "Ny kærlighed, følelser, intuition og glæde."],
    ["2", "Partnerskab, harmoni, tiltrækning og balance."],
    ["3", "Venskab, fejring og fællesskab."],
    ["4", "Tilbagetrækning, stilstand og selvransagelse."],
    ["5", "Sorg, tab, skuffelse og fokus på det negative."],
    ["6", "Nostalgi, barndom, glæde og forsoning."],
    ["7", "Valgmuligheder, illusioner og drømme."],
    ["8", "At gå væk, søgen efter mening og forandring."],
    ["9", "Tilfredshed, ønsker opfyldt og lykke."],
    ["10", "Familielykke, harmoni, glæde og kærlighed."],
    ["Page", "Kreativitet, intuition og overraskelser."],
    ["Knight", "Romantik, charme og drømmende energi."],
    ["Queen", "Omsorg, empati, intuition og medfølelse."],
    ["King", "Balance mellem følelser og logik samt modenhed."],
  ],
  Swords: [
    ["Ace", "Klarhed, sandhed, gennembrud og nye idéer."],
    ["2", "Beslutninger, balance og en fastlåst situation."],
    ["3", "Hjertebrist, sorg og adskillelse."],
    ["4", "Hvile, heling, pause og refleksion."],
    ["5", "Konflikt, nederlag og selvinteresse."],
    ["6", "Overgang, rejse og at komme videre."],
    ["7", "Bedrag, strategi og skjulte handlinger."],
    ["8", "En følelse af fangenskab og begrænsning."],
    ["9", "Angst, bekymringer og søvnløshed."],
    ["10", "Afslutning, smerte og nederlag."],
    ["Page", "Nysgerrighed, læring og nye idéer."],
    ["Knight", "Hastighed, målrettethed og beslutsomhed."],
    ["Queen", "Uafhængighed, klar kommunikation og indsigt."],
    ["King", "Autoritet, sandhed og intellektuel styrke."],
  ],
  Coins: [
    ["Ace", "Muligheder, nye begyndelser og materiel gevinst."],
    ["2", "Balance, fleksibilitet og tilpasning."],
    ["3", "Samarbejde, færdigheder og anerkendelse."],
    ["4", "Stabilitet, kontrol og tilbageholdenhed."],
    ["5", "Mangel, usikkerhed og støtte i svære tider."],
    ["6", "Generøsitet, støtte og balance mellem at give og modtage."],
    ["7", "Tålmodighed, evaluering og langsigtet investering."],
    ["8", "Flid, færdigheder, læring og mestring."],
    ["9", "Selvstændighed, luksus og succes."],
    ["10", "Rigdom, arv og familietraditioner."],
    ["Page", "Muligheder, ambition og læring."],
    ["Knight", "Stabilitet, tålmodighed og ansvarlighed."],
    ["Queen", "Omsorg, tryghed og overflod."],
    ["King", "Sikkerhed, succes, stabilitet og velstand."],
  ],
};

const familyDetails: Record<string, { family: TarotCard["family"]; symbol: string }> = {
  Wands: { family: "Wands", symbol: "✦" },
  Cups: { family: "Cups", symbol: "♡" },
  Swords: { family: "Swords", symbol: "†" },
  Coins: { family: "Coins", symbol: "◇" },
};

const numberNames: Record<string, string> = {
  "2": "two",
  "3": "three",
  "4": "four",
  "5": "five",
  "6": "six",
  "7": "seven",
  "8": "eight",
  "9": "nine",
  "10": "ten",
};

const majorCardsWithImages = new Set(
  majorArcana.map(([name]) => name).filter((name) => name !== "The Sun"),
);

function slugify(value: string) {
  return value.toLowerCase().replaceAll(" ", "-");
}

function getMinorImage(suit: string, value: string) {
  if (suit === "Coins" && value === "10") {
    return undefined;
  }

  const imageValue = numberNames[value] ?? value.toLowerCase();

  if (suit === "Wands") {
    const wandValue = value === "5" ? "fine" : imageValue;
    return `/cards/wands/${wandValue}ofwands.svg`;
  }

  if (suit === "Swords") {
    return `/cards/swords/${imageValue}ofswords.svg`;
  }

  if (suit === "Coins" && value === "4") {
    return "/cards/Mayor-Arcana/four-of-pentacles.svg";
  }

  const folder = suit === "Coins" ? "pentacles" : suit.toLowerCase();
  const fileSuit = suit === "Coins" ? "pentacles" : suit.toLowerCase();
  return `/cards/${folder}/${imageValue}-of-${fileSuit}.svg`;
}

export const tarotDeck: TarotCard[] = [
  ...majorArcana.map(([name, meaning]) => ({
    name,
    meaning,
    meaningEn: englishMeanings[name],
    family: "Major Arcana" as const,
    symbol: "☾",
    image: majorCardsWithImages.has(name)
      ? `/cards/Mayor-Arcana/${slugify(name)}.svg`
      : undefined,
  })),
  ...Object.entries(minorArcana).flatMap(([suit, values]) =>
    values.map(([value, meaning]) => ({
      name: `${value} of ${suit}`,
      meaning,
      meaningEn: englishMeanings[`${value} of ${suit}`],
      family: familyDetails[suit].family,
      symbol: familyDetails[suit].symbol,
      image: getMinorImage(suit, value),
    })),
  ),
];
