import type { CuratedContentByDate, LocalizedText } from "./types";
import imgWalnutsDates from "@/assets/diet/walnuts-dates.webp";
import imgCucumberLemonDetoxJuice from "@/assets/diet/cucumber-lemon-detox-juice.webp";
import imgCucumberPalakuraPaneerSalad from "@/assets/diet/cucumber-palakura-paneer-salad.webp";
import imgGuava from "@/assets/diet/guava.webp";
import imgSteamedRiceLeafyDal from "@/assets/diet/steamed-rice-leafy-dal-beans-carrot-curry-curd.webp";
import imgMushroomSoup from "@/assets/diet/mushroom-soup.webp";
import imgRagiIdliCurryLeavesChutneyGhee from "@/assets/diet/ragi-idli-curry-leaves-chutney-ghee.webp";
import imgTurmericMilk from "@/assets/diet/turmeric-milk.webp";
import imgPumpkinSunflowerSeeds from "@/assets/diet/pumpkin-sunflower-seeds.webp";
import imgMoringaMintVegetableJuice from "@/assets/diet/moringa-mint-vegetable-juice.webp";
import imgAdaiDosaCoconutChutney from "@/assets/diet/adai-dosa-coconut-chutney.webp";
import imgApple from "@/assets/diet/apple.webp";
import imgPudinaRiceBowlCarrotBeetrootRaita from "@/assets/diet/pudina-rice-bowl-carrot-beetroot-raita.webp";
import imgSproutsChaat from "@/assets/diet/sprouts-chaat.webp";
import imgJowarAppamCoconutChutney from "@/assets/diet/jowar-appam-coconut-chutney.webp";
import imgTulasiTea from "@/assets/diet/tulasi-tea.webp";

/** Shorthand for a LocalizedText where the English and Telugu Figma screens showed the
 *  exact same word (a handful of ingredient/dish names were left untranslated in the
 *  Telugu design — transcribed as-authored, not "fixed" here). */
const same = (text: string): LocalizedText => ({ English: text, Telugu: text });
const t = (English: string, Telugu: string): LocalizedText => ({ English, Telugu });

/**
 * Hand-authored overrides matching the Figma detail screens (English: node 890:8415 /
 * 924:21411; Telugu: node 970:32655 / 970:33289), keyed by ISO date then slot id. Only
 * 2026-08-03 and 2026-08-04 are curated today — every other date has no entry here and
 * falls back entirely to the generic sheet content in weekBlocks/. Add more dates the
 * same way as more days get designed; nothing else needs to change.
 */
export const CURATED_CONTENT_BY_DATE: CuratedContentByDate = {
  "2026-08-03": {
    earlyMorning: {
      name: t("Walnuts & Dates", "ఆక్రోట్లు & ఖర్జూరాలు"),
      imageUrl: imgWalnutsDates,
      items: [{ label: t("2 Walnuts", "2 ఆక్రోట్లు") }, { label: t("2 Dates", "2 ఖర్జూరాలు") }],
      tips: t("Soak overnight and eat in the morning.", "రాత్రంతా నానబెట్టి, ఉదయం తినండి."),
      precautions: t(
        "For people with Diabetes, dates are high in sugar, so limit the quantity.",
        "డయాబెటిస్ ఉన్నవారు ఖర్జూరాలు limit గా తీసుకోండి, ఎందుకంటే వీటిలో సహజ చక్కెర ఎక్కువగా ఉంటుంది."
      ),
      nutritionalBenefits: [
        { ingredient: same("Walnuts"), benefitLabel: t("Heart Health", "గుండె ఆరోగ్యానికి మంచిది"), iconKey: "heart" },
        { ingredient: same("Dates"), benefitLabel: t("Quick Energy", "శక్తిని అందిస్తుంది"), iconKey: "lightning-bolt" },
      ],
      recommendedQuantity: [
        { ingredient: t("Walnuts", "ఆక్రోట్లు"), qty: same("2 pcs") },
        { ingredient: t("Dates", "ఖర్జూరాలు"), qty: same("2 pcs") },
      ],
      groceryListAvailable: true,
    },
    postYogaDrink: {
      name: t("Cucumber & Lemon Detox Juice", "దోసకాయ & నిమ్మకాయ డిటాక్స్ జ్యూస్"),
      imageUrl: imgCucumberLemonDetoxJuice,
      tips: t(
        "Blend cucumber with water, strain if needed, and add fresh lemon juice before drinking.",
        "దోసకాయను నీటితో blend చేసి, అవసరమైతే strain చేసి, తాగే ముందు తాజా నిమ్మరసం కలపండి."
      ),
      nutritionalBenefits: [
        { ingredient: same("Cucumber"), benefitLabel: t("Hydration", "శరీరాన్ని Hydrated గా ఉంచుతుంది"), iconKey: "water" },
        { ingredient: same("Cucumber"), benefitLabel: t("Cooling", "శరీరానికి Cooling అందిస్తుంది"), iconKey: "snowflake" },
        { ingredient: same("Lemon"), benefitLabel: t("Immunity", "రోగనిరోధక శక్తికి మద్దతు"), iconKey: "shield" },
      ],
      groceryListAvailable: true,
    },
    breakfast: {
      name: t("Cucumber, Palakura & Paneer Salad", "దోసకాయ, పాలకూర & పనీర్ సలాడ్"),
      imageUrl: imgCucumberPalakuraPaneerSalad,
      tips: t(
        "Lightly steam spinach, mix with cucumber and paneer cubes, then add lemon and salt.",
        "పాలకూరను కొద్దిగా steam చేసి, దోసకాయ & పనీర్ తో mix చేసి, నిమ్మరసం & ఉప్పు కలపండి."
      ),
      nutritionalBenefits: [
        { ingredient: same("Cucumber"), benefitLabel: t("Hydration", "శరీరాన్ని Hydrated గా ఉంచుతుంది"), iconKey: "water" },
        { ingredient: same("Cucumber"), benefitLabel: t("Cooling", "శరీరానికి Cooling అందిస్తుంది"), iconKey: "snowflake" },
        { ingredient: same("Spinach"), benefitLabel: t("Supports Hemoglobin", "హిమోగ్లోబిన్‌కు మద్దతు"), iconKey: "generic" },
        { ingredient: same("Paneer"), benefitLabel: t("Muscle Health", "కండరాల ఆరోగ్యానికి మంచిది"), iconKey: "generic" },
      ],
      groceryListAvailable: true,
    },
    morningSnack: {
      name: t("Guava", "జామపండు"),
      imageUrl: imgGuava,
      items: [{ label: t("1 medium fruit", "1 మధ్యస్థ పరిమాణం పండు") }],
      precautions: t(
        "For people with Diabetes, limit to 1 medium guava (100–150g) and avoid adding salt or sugar.",
        "Diabetes ఉన్నవారు 1 మధ్యస్థ జామపండు (100–150g) మాత్రమే తీసుకోండి. ఉప్పు లేదా చక్కెర కలపకండి."
      ),
      nutritionalBenefits: [
        { ingredient: same("Guava"), benefitLabel: t("Immunity", "రోగనిరోధక శక్తికి మద్దతు"), iconKey: "shield" },
        { ingredient: same("Guava"), benefitLabel: t("Gut Health", "Gut ఆరోగ్యానికి మంచిది"), iconKey: "stomach" },
        { ingredient: same("Guava"), benefitLabel: t("Healthy Blood Sugar", "ఆరోగ్యకరమైన రక్తంలో చక్కెర అందిస్తుంది"), iconKey: "sugar-cubes" },
        { ingredient: same("Guava"), benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food" },
        { ingredient: same("Guava"), benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు కడుపు నిండుగా ఉంచుతుంది"), iconKey: "happy" },
      ],
      recommendedQuantity: [{ ingredient: same("Medium Guava"), qty: same("1") }],
      groceryListAvailable: true,
    },
    lunch: {
      name: t("Steamed Rice, Leafy Dal, Beans Carrot Curry & Curd", "అన్నం, ఆకుకూర పప్పు, బీన్స్ క్యారెట్ కూర & పెరుగు"),
      imageUrl: imgSteamedRiceLeafyDal,
      tips: t(
        "Cook dal with any leafy greens, sauté beans and carrot, and serve with rice and curd.",
        "ఏదైనా ఆకుకూరతో పప్పు వండి, బీన్స్ & క్యారెట్ కూరతో పాటు అన్నం & పెరుగుతో తినండి."
      ),
      precautions: t(
        "For people with Diabetes, practice portion control with white rice.",
        "Diabetes ఉన్నవారు తెల్ల అన్నం limit లో తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: same("Steamed Rice"), benefitLabel: t("Energy", "శక్తిని అందిస్తుంది"), iconKey: "lightning-bolt" },
        { ingredient: same("Leafy Dal"), benefitLabel: t("Supports Hemoglobin", "హిమోగ్లోబిన్‌కు మద్దతు"), iconKey: "generic" },
        { ingredient: same("Leafy Dal"), benefitLabel: t("Muscle Health", "కండరాల ఆరోగ్యానికి మంచిది"), iconKey: "generic" },
        { ingredient: same("Mixed Vegetables"), benefitLabel: t("Better Digestion", "జీర్ణక్రియను మెరుగుపరుస్తుంది"), iconKey: "stomach" },
        { ingredient: same("Curd"), benefitLabel: t("Gut Health", "Gut ఆరోగ్యానికి మంచిది"), iconKey: "stomach" },
      ],
      groceryListAvailable: true,
    },
    eveningSnack: {
      name: t("Mushroom Soup", "మష్రూమ్ సూప్"),
      imageUrl: imgMushroomSoup,
      tips: t(
        "Sauté mushrooms, cook with water and spices, blend, and simmer with pepper before serving.",
        "మష్రూమ్స్‌ను కొద్దిగా sauté చేసి, నీరు & మసాలాలు వేసి ఉడికించి, blend చేసి, మిరియాల పొడి వేసి serve చేయండి."
      ),
      nutritionalBenefits: [
        { ingredient: same("Mushroom"), benefitLabel: t("Immunity Support", "రోగనిరోధక శక్తికి మద్దతు"), iconKey: "shield" },
        { ingredient: same("Mushroom"), benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food" },
      ],
      groceryListAvailable: true,
    },
    dinner: {
      name: t("Ragi Idli, Curry Leaves Chutney & Ghee", "రాగి ఇడ్లీ, కరివేపాకు చట్నీ & నెయ్యి"),
      imageUrl: imgRagiIdliCurryLeavesChutneyGhee,
      tips: t(
        "Prepare ragi dosa and serve with curry leaves chutney and 2 tsp ghee.",
        "రాగి ఇడ్లీ తయారు చేసి, కరివేపాకు చట్నీ & 2 tsp నెయ్యితో తినండి."
      ),
      precautions: t(
        "For people with Diabetes, practice portion control as ragi has a moderate GI.",
        "Diabetes ఉన్నవారు రాగిని కూడా limit లో తీసుకోండి, ఎందుకంటే దీనికి moderate GI ఉంటుంది."
      ),
      nutritionalBenefits: [
        { ingredient: same("Ragi"), benefitLabel: t("Bone Health", "ఎముకల ఆరోగ్యానికి మంచిది"), iconKey: "dog-bone" },
        { ingredient: same("Curry Leaves"), benefitLabel: t("Healthy Metabolism", "జీవక్రియ (మెటాబాలిజం)కు మద్దతు"), iconKey: "healthy-eating" },
        { ingredient: same("Ghee"), benefitLabel: t("Improves Nutrient Absorption", "పోషకాలను మెరుగుపరుస్తుంది"), iconKey: "heart" },
      ],
      groceryListAvailable: true,
    },
    nightDrink: {
      name: t("Turmeric Milk", "పసుపు పాలు"),
      imageUrl: imgTurmericMilk,
      tips: t(
        "Heat milk with turmeric and a pinch of pepper for 3–4 minutes.",
        "పాలలో పసుపు & చిటికెడు మిరియాల పొడి వేసి 3–4 నిమిషాలు వేడి చేయండి."
      ),
      precautions: t(
        "Avoid mobile phones or TV after 9:30 PM and aim for 7 hours of sound sleep (10:00 PM–5:00 AM).",
        "9:30pm తర్వాత మొబైల్ లేదా TV వాడకాన్ని తగ్గించండి. రాత్రి 10:00 - 5:00am వరకు కనీసం 7 గం నిద్రపోవడానికి ప్రయత్నించండి."
      ),
      nutritionalBenefits: [
        { ingredient: same("Turmeric"), benefitLabel: t("Immunity", "రోగనిరోధక శక్తికి మద్దతు"), iconKey: "shield" },
        { ingredient: same("Milk"), benefitLabel: t("Bone Strength", "ఎముకల ఆరోగ్యానికి మంచిది"), iconKey: "dog-bone" },
      ],
      groceryListAvailable: true,
    },
  },
  "2026-08-04": {
    earlyMorning: {
      name: t("Pumpkin & Sunflower Seeds", "గుమ్మడికాయ గింజలు & సన్‌ఫ్లవర్ గింజలు"),
      imageUrl: imgPumpkinSunflowerSeeds,
      items: [{ label: t("1 tbsp in total", "1 tbsp") }],
      tips: t(
        "Enjoy them lightly roasted or soaked overnight.",
        "స్వల్పంగా roast చేసి లేదా రాత్రంతా నానబెట్టి తీసుకోవచ్చు."
      ),
      nutritionalBenefits: [
        { ingredient: same("Pumpkin Seeds"), benefitLabel: t("Immunity", "రోగనిరోధక శక్తికి మద్దతు"), iconKey: "shield" },
        { ingredient: same("Sunflower Seeds"), benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food" },
      ],
      recommendedQuantity: [{ ingredient: same("Mixed Seeds"), qty: same("1 tbsp") }],
      groceryListAvailable: true,
    },
    postYogaDrink: {
      name: t("Moringa & Mint Vegetable Juice", "మునగాకు & పుదీనా వెజిటేబుల్ జ్యూస్"),
      imageUrl: imgMoringaMintVegetableJuice,
      tips: t(
        "Blend cleaned munagaku leaves with mint and water, strain, and drink fresh.",
        "శుభ్రం చేసిన మునగాకులు, పుదీనా & నీటితో blend చేసి, strain చేసి వెంటనే తాగండి."
      ),
      nutritionalBenefits: [
        { ingredient: same("Munagaku"), benefitLabel: t("Supports Hemoglobin", "హిమోగ్లోబిన్‌కు మద్దతు"), iconKey: "generic" },
        { ingredient: same("Mint"), benefitLabel: t("Aids Digestion", "జీర్ణక్రియకు సహాయపడుతుంది"), iconKey: "stomach" },
      ],
      groceryListAvailable: true,
    },
    breakfast: {
      name: t("Adai Dosa & Coconut Chutney", "అడై దోసె & కొబ్బరి చట్నీ"),
      imageUrl: imgAdaiDosaCoconutChutney,
      tips: t(
        "Soak toor dal, chana dal, and urad dal, grind into a batter, prepare adai, and serve with coconut chutney.",
        "కందిపప్పు, శనగపప్పు & మినప్పప్పు నానబెట్టి batter తయారు చేసి, అడై దోసె చేసి, కొబ్బరి చట్నీతో తినండి."
      ),
      nutritionalBenefits: [
        { ingredient: same("Adai"), benefitLabel: t("Protein-Rich", "ప్రోటీన్ సమృద్ధిగా ఉంటుంది"), iconKey: "generic" },
        { ingredient: same("Adai"), benefitLabel: t("Sustained Energy", "ఎక్కువసేపు శక్తిని అందిస్తుంది"), iconKey: "lightning-bolt" },
        { ingredient: same("Coconut"), benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు కడుపు నిండుగా ఉంచుతుంది"), iconKey: "happy" },
      ],
      groceryListAvailable: true,
    },
    morningSnack: {
      name: same("Apple"),
      imageUrl: imgApple,
      items: [{ label: same("1 Apple") }],
      precautions: t(
        "For people with Diabetes, limit the portion to ½ an apple per serving.",
        "Diabetes ఉన్నవారు ఒకసారి ½ Apple మాత్రమే తీసుకోండి."
      ),
      nutritionalBenefits: [{ ingredient: same("Apple"), benefitLabel: t("Immunity", "రోగనిరోధక శక్తికి మద్దతు"), iconKey: "shield" }],
      recommendedQuantity: [{ ingredient: same("Apple"), qty: same("1") }],
      groceryListAvailable: true,
    },
    lunch: {
      name: t("Pudina Rice Bowl & Carrot Beetroot Raita", "పుదీనా రైస్ బౌల్ & క్యారెట్ బీట్‌రూట్ రైతా"),
      imageUrl: imgPudinaRiceBowlCarrotBeetrootRaita,
      tips: t(
        "Mix mint paste with cooked rice and prepare raita with grated carrot and beetroot in curd.",
        "ఉడికించిన అన్నంలో పుదీనా paste కలపండి. పెరుగులో తురిమిన క్యారెట్ & బీట్‌రూట్ వేసి రైతా తయారు చేయండి."
      ),
      precautions: t(
        "For people with Diabetes, practice portion control with rice.",
        "డయాబెటిస్ ఉన్నవారు అన్నం limit లో తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: same("Rice"), benefitLabel: t("Energy", "శక్తిని అందిస్తుంది"), iconKey: "lightning-bolt" },
        { ingredient: same("Mint"), benefitLabel: t("Digestive Support", "జీర్ణక్రియకు మద్దతు"), iconKey: "stomach" },
        { ingredient: same("Mixed Vegetables"), benefitLabel: t("Gut Health", "Gut ఆరోగ్యానికి మంచిది"), iconKey: "stomach" },
        { ingredient: same("Curd"), benefitLabel: t("Better Digestion", "జీర్ణక్రియను మెరుగుపరుస్తుంది"), iconKey: "stomach" },
      ],
      groceryListAvailable: true,
    },
    eveningSnack: {
      name: t(
        "Protein and Energy Boost Sprouts Chaat (Lightly Steamed)",
        "స్ప్రౌట్స్ చాట్ (కొద్దిగా ఆవిరిలో ఉడికించినవి)"
      ),
      imageUrl: imgSproutsChaat,
      tips: t(
        "Lightly steam the sprouts, then mix with onion, lemon, and spices.",
        "స్ప్రౌట్స్‌ను కొద్దిగా steam చేసి, ఉల్లిపాయ, నిమ్మరసం & మసాలాలు కలపండి."
      ),
      precautions: t(
        "For People with Thyroid Concerns, avoid consuming excess raw sprouts regularly.",
        "థైరాయిడ్ సమస్య ఉన్నవారు పచ్చి స్ప్రౌట్స్‌ను ఎక్కువగా, తరచుగా తీసుకోవడం నివారించండి."
      ),
      nutritionalBenefits: [
        { ingredient: same("Sprouts"), benefitLabel: t("Protein-Rich", "ప్రోటీన్ సమృద్ధిగా ఉంటుంది"), iconKey: "generic" },
        { ingredient: same("Sprouts"), benefitLabel: t("Supports Metabolism", "జీవక్రియ (మెటాబాలిజం)కు మద్దతు"), iconKey: "healthy-eating" },
        { ingredient: same("Sprouts"), benefitLabel: t("Better Digestion", "జీర్ణక్రియను మెరుగుపరుస్తుంది"), iconKey: "stomach" },
        { ingredient: same("Sprouts"), benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు కడుపు నిండుగా ఉంచుతుంది"), iconKey: "happy" },
      ],
      groceryListAvailable: true,
    },
    dinner: {
      name: t("Jowar Appam & Coconut Chutney", "జొన్న అప్పం & కొబ్బరి చట్నీ"),
      imageUrl: imgJowarAppamCoconutChutney,
      tips: t(
        "Prepare a batter with jowar flour, ferment lightly, and cook in an appam pan.",
        "జొన్న పిండితో batter తయారు చేసి, కొద్దిగా ferment చేసి, అప్పం పాన్‌లో వండండి."
      ),
      nutritionalBenefits: [
        { ingredient: same("Jowar"), benefitLabel: t("Sustained Energy", "ఎక్కువసేపు శక్తిని అందిస్తుంది"), iconKey: "lightning-bolt" },
        { ingredient: same("Coconut"), benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు కడుపు నిండుగా ఉంచుతుంది"), iconKey: "happy" },
      ],
      groceryListAvailable: true,
    },
    nightDrink: {
      name: same("Tulasi Tea"),
      imageUrl: imgTulasiTea,
      tips: t(
        "Boil tulasi leaves in water for 5 minutes, strain, and drink warm.",
        "తులసి ఆకులను నీటిలో 5 నిమిషాలు మరిగించి, strain చేసి గోరువెచ్చగా తాగండి."
      ),
      precautions: t(
        "Avoid using mobile phones or watching TV after 9:30 PM.",
        "రాత్రి 9:30 తర్వాత మొబైల్ లేదా TV చూడడం నివారించండి."
      ),
      nutritionalBenefits: [
        { ingredient: same("Tulasi Tea"), benefitLabel: t("Immunity", "రోగనిరోధక శక్తికి మద్దతు"), iconKey: "shield" },
        { ingredient: same("Tulasi Tea"), benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food" },
        { ingredient: same("Tulasi Tea"), benefitLabel: t("Relaxation", "శరీరం & మనసుకు రిలాక్సేషన్ అందిస్తుంది"), iconKey: "meditation" },
      ],
      groceryListAvailable: true,
    },
  },
};
