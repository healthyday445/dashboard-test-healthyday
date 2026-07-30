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
// 2026-08-05
import imgWarmWater from "@/assets/diet/warm-water.webp";
import imgCinnamonMilk from "@/assets/diet/cinnamon-milk.webp";
import imgGreenMoongDosaPeanutChutney from "@/assets/diet/green-moong-dosa-peanut-chutney.webp";
import imgChapatiPalakPaneer from "@/assets/diet/chapati-palak-paneer.webp";
import imgBoiledSweetPotato from "@/assets/diet/boiled-sweet-potato.webp";
import imgMushroomPeasRoll from "@/assets/diet/mushroom-peas-roll.webp";
import imgGingerJeeraTea from "@/assets/diet/ginger-jeera-tea.webp";
// 2026-08-06
import imgSesameFlaxSeeds from "@/assets/diet/sesame-flax-seeds.webp";
import imgSoakedChiaSeedsAmlaWater from "@/assets/diet/soaked-chia-seeds-amla-water.webp";
import imgPaneerDosaVegetableSambar from "@/assets/diet/paneer-dosa-vegetable-sambar.webp";
import imgRagiMuddaVegetableSambar from "@/assets/diet/ragi-mudda-vegetable-sambar.webp";
import imgPeanutChikki from "@/assets/diet/peanut-chikki.webp";
import imgCoconutRiceBowlCapsicumRaita from "@/assets/diet/coconut-rice-bowl-capsicum-raita.webp";
import imgFennelTea from "@/assets/diet/fennel-tea.webp";
// 2026-08-07
import imgSoakedAlmondsBlackRaisins from "@/assets/diet/soaked-almonds-black-raisins.webp";
import imgTenderCoconutWater from "@/assets/diet/tender-coconut-water.webp";
import imgGodhumaRavvaUpmaPeanuts from "@/assets/diet/godhuma-ravva-upma-peanuts.webp";
import imgSteamedRiceLeafyDalIvyGourdKundruCurryCurd from "@/assets/diet/steamed-rice-leafy-dal-ivy-gourd-kundru-curry-curd.webp";
import imgPaneerCubesPepper from "@/assets/diet/paneer-cubes-pepper.webp";
import imgCucumberCapsicumCurdBowl from "@/assets/diet/cucumber-capsicum-curd-bowl.webp";
import imgCorianderSeedTea from "@/assets/diet/coriander-seed-tea.webp";
// 2026-08-08
import imgSoakedChiaFlaxSeeds from "@/assets/diet/soaked-chia-flax-seeds.webp";
import imgVegetablePohaPeanuts from "@/assets/diet/vegetable-poha-peanuts.webp";
import imgRiceMixedDalCurryCucumberBoiledPeanutSalad from "@/assets/diet/rice-mixed-dal-curry-cucumber-boiled-peanut-salad.webp";
import imgCornPakoda from "@/assets/diet/corn-pakoda.webp";
import imgSpinachCheelaTomatoChutney from "@/assets/diet/spinach-cheela-tomato-chutney.webp";
import imgAjwainTea from "@/assets/diet/ajwain-tea.webp";
// 2026-08-09
import imgSoakedPistachiosGoldRaisins from "@/assets/diet/soaked-pistachios-gold-raisins.webp";
import imgRagiMaltWithNutsSeeds from "@/assets/diet/ragi-malt-with-nuts-seeds.webp";
import imgPineapple from "@/assets/diet/pineapple.webp";
import imgRiceCarrotTomatoRasamFrenchBeansCoconutCurry from "@/assets/diet/rice-carrot-tomato-rasam-french-beans-coconut-curry.webp";
import imgMakhanaKajuNutsIceCream from "@/assets/diet/makhana-kaju-nuts-ice-cream.webp";
import imgMixedVegetableUttappamTomatoChutney from "@/assets/diet/mixed-vegetable-uttappam-tomato-chutney.webp";

/** Shorthand for a LocalizedText where the English and Telugu Figma screens showed the
 *  exact same word (a handful of ingredient/dish names were left untranslated in the
 *  Telugu design — transcribed as-authored, not "fixed" here). */
const same = (text: string): LocalizedText => ({ English: text, Telugu: text });
const t = (English: string, Telugu: string): LocalizedText => ({ English, Telugu });
/** Telugu translation not provided yet for 2026-08-05..09 (user said Telugu designs are
 *  coming later) — English text duplicated as a placeholder so the UI never shows blank
 *  Telugu content. Swap these for real Telugu via `t(...)` once translations arrive;
 *  search this file for `pending` to find every call site that needs updating. */
const pending = same;

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
        { ingredient: same("Walnuts"), benefits: [{ benefitLabel: t("Heart Health", "గుండె ఆరోగ్యానికి మంచిది"), iconKey: "heart" }] },
        { ingredient: same("Dates"), benefits: [{ benefitLabel: t("Quick Energy", "శక్తిని అందిస్తుంది"), iconKey: "lightning-bolt" }] },
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
        { ingredient: same("Cucumber"), benefits: [
          { benefitLabel: t("Hydration", "శరీరాన్ని Hydrated గా ఉంచుతుంది"), iconKey: "water" },
          { benefitLabel: t("Cooling", "శరీరానికి Cooling అందిస్తుంది"), iconKey: "snowflake" },
        ] },
        { ingredient: same("Lemon"), benefits: [{ benefitLabel: t("Immunity", "రోగనిరోధక శక్తికి మద్దతు"), iconKey: "shield" }] },
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
        { ingredient: same("Cucumber"), benefits: [
          { benefitLabel: t("Hydration", "శరీరాన్ని Hydrated గా ఉంచుతుంది"), iconKey: "water" },
          { benefitLabel: t("Cooling", "శరీరానికి Cooling అందిస్తుంది"), iconKey: "snowflake" },
        ] },
        { ingredient: same("Spinach"), benefits: [{ benefitLabel: t("Supports Hemoglobin", "హిమోగ్లోబిన్‌కు మద్దతు"), iconKey: "hemoglobin" }] },
        { ingredient: same("Paneer"), benefits: [{ benefitLabel: t("Muscle Health", "కండరాల ఆరోగ్యానికి మంచిది"), iconKey: "muscle-health" }] },
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
        { ingredient: same("Guava"), benefits: [
          { benefitLabel: t("Immunity", "రోగనిరోధక శక్తికి మద్దతు"), iconKey: "shield" },
          { benefitLabel: t("Gut Health", "Gut ఆరోగ్యానికి మంచిది"), iconKey: "stomach" },
          { benefitLabel: t("Healthy Blood Sugar", "ఆరోగ్యకరమైన రక్తంలో చక్కెర అందిస్తుంది"), iconKey: "sugar-cubes" },
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food" },
          { benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు కడుపు నిండుగా ఉంచుతుంది"), iconKey: "happy" },
        ] },
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
        { ingredient: same("Steamed Rice"), benefits: [{ benefitLabel: t("Energy", "శక్తిని అందిస్తుంది"), iconKey: "lightning-bolt" }] },
        { ingredient: same("Leafy Dal"), benefits: [
          { benefitLabel: t("Supports Hemoglobin", "హిమోగ్లోబిన్‌కు మద్దతు"), iconKey: "hemoglobin" },
          { benefitLabel: t("Muscle Health", "కండరాల ఆరోగ్యానికి మంచిది"), iconKey: "muscle-health" },
        ] },
        { ingredient: same("Mixed Vegetables"), benefits: [{ benefitLabel: t("Better Digestion", "జీర్ణక్రియను మెరుగుపరుస్తుంది"), iconKey: "stomach" }] },
        { ingredient: same("Curd"), benefits: [{ benefitLabel: t("Gut Health", "Gut ఆరోగ్యానికి మంచిది"), iconKey: "stomach" }] },
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
        { ingredient: same("Mushroom"), benefits: [
          { benefitLabel: t("Immunity Support", "రోగనిరోధక శక్తికి మద్దతు"), iconKey: "shield" },
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food" },
        ] },
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
        { ingredient: same("Ragi"), benefits: [{ benefitLabel: t("Bone Health", "ఎముకల ఆరోగ్యానికి మంచిది"), iconKey: "dog-bone" }] },
        { ingredient: same("Curry Leaves"), benefits: [{ benefitLabel: t("Healthy Metabolism", "జీవక్రియ (మెటాబాలిజం)కు మద్దతు"), iconKey: "healthy-eating" }] },
        { ingredient: same("Ghee"), benefits: [{ benefitLabel: t("Improves Nutrient Absorption", "పోషకాలను మెరుగుపరుస్తుంది"), iconKey: "nutrient-absorption" }] },
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
        { ingredient: same("Turmeric"), benefits: [{ benefitLabel: t("Immunity", "రోగనిరోధక శక్తికి మద్దతు"), iconKey: "shield" }] },
        { ingredient: same("Milk"), benefits: [{ benefitLabel: t("Bone Strength", "ఎముకల ఆరోగ్యానికి మంచిది"), iconKey: "dog-bone" }] },
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
        { ingredient: same("Pumpkin Seeds"), benefits: [{ benefitLabel: t("Immunity", "రోగనిరోధక శక్తికి మద్దతు"), iconKey: "shield" }] },
        { ingredient: same("Sunflower Seeds"), benefits: [{ benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food" }] },
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
        { ingredient: same("Munagaku"), benefits: [{ benefitLabel: t("Supports Hemoglobin", "హిమోగ్లోబిన్‌కు మద్దతు"), iconKey: "hemoglobin" }] },
        { ingredient: same("Mint"), benefits: [{ benefitLabel: t("Aids Digestion", "జీర్ణక్రియకు సహాయపడుతుంది"), iconKey: "stomach" }] },
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
        { ingredient: same("Adai"), benefits: [
          { benefitLabel: t("Protein-Rich", "ప్రోటీన్ సమృద్ధిగా ఉంటుంది"), iconKey: "muscle-health" },
          { benefitLabel: t("Sustained Energy", "ఎక్కువసేపు శక్తిని అందిస్తుంది"), iconKey: "lightning-bolt" },
        ] },
        { ingredient: same("Coconut"), benefits: [{ benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు కడుపు నిండుగా ఉంచుతుంది"), iconKey: "happy" }] },
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
      nutritionalBenefits: [{ ingredient: same("Apple"), benefits: [{ benefitLabel: t("Immunity", "రోగనిరోధక శక్తికి మద్దతు"), iconKey: "shield" }] }],
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
        { ingredient: same("Rice"), benefits: [{ benefitLabel: t("Energy", "శక్తిని అందిస్తుంది"), iconKey: "lightning-bolt" }] },
        { ingredient: same("Mint"), benefits: [{ benefitLabel: t("Digestive Support", "జీర్ణక్రియకు మద్దతు"), iconKey: "stomach" }] },
        { ingredient: same("Mixed Vegetables"), benefits: [{ benefitLabel: t("Gut Health", "Gut ఆరోగ్యానికి మంచిది"), iconKey: "stomach" }] },
        { ingredient: same("Curd"), benefits: [{ benefitLabel: t("Better Digestion", "జీర్ణక్రియను మెరుగుపరుస్తుంది"), iconKey: "stomach" }] },
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
        { ingredient: same("Sprouts"), benefits: [
          { benefitLabel: t("Protein-Rich", "ప్రోటీన్ సమృద్ధిగా ఉంటుంది"), iconKey: "muscle-health" },
          { benefitLabel: t("Supports Metabolism", "జీవక్రియ (మెటాబాలిజం)కు మద్దతు"), iconKey: "healthy-eating" },
          { benefitLabel: t("Better Digestion", "జీర్ణక్రియను మెరుగుపరుస్తుంది"), iconKey: "stomach" },
          { benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు కడుపు నిండుగా ఉంచుతుంది"), iconKey: "happy" },
        ] },
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
        { ingredient: same("Jowar"), benefits: [{ benefitLabel: t("Sustained Energy", "ఎక్కువసేపు శక్తిని అందిస్తుంది"), iconKey: "lightning-bolt" }] },
        { ingredient: same("Coconut"), benefits: [{ benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు కడుపు నిండుగా ఉంచుతుంది"), iconKey: "happy" }] },
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
        { ingredient: same("Tulasi Tea"), benefits: [
          { benefitLabel: t("Immunity", "రోగనిరోధక శక్తికి మద్దతు"), iconKey: "shield" },
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food" },
          { benefitLabel: t("Relaxation", "శరీరం & మనసుకు రిలాక్సేషన్ అందిస్తుంది"), iconKey: "meditation" },
        ] },
      ],
      groceryListAvailable: true,
    },
  },
  // Below: 2026-08-05 through 2026-08-09 (English only for now — see `pending` above).
  "2026-08-05": {
    earlyMorning: {
      name: pending("Warm Water"),
      imageUrl: imgWarmWater,
      items: [{ label: pending("1 Glass") }],
      tips: pending("Drink warm water throughout the day to help cleanse the system and kickstart digestion."),
      nutritionalBenefits: [
        { ingredient: pending("Warm Water"), benefits: [
          { benefitLabel: pending("Better Digestion"), iconKey: "stomach" },
          { benefitLabel: pending("Healthy Metabolism"), iconKey: "healthy-eating" },
        ] },
      ],
      recommendedQuantity: [{ ingredient: pending("Water"), qty: pending("1 Glass") }],
      groceryListAvailable: true,
    },
    postYogaDrink: {
      name: pending("Cinnamon Milk"),
      imageUrl: imgCinnamonMilk,
      tips: pending("Boil milk with a small cinnamon stick for 5 minutes and serve warm."),
      precautions: pending("For People with Thyroid Concerns, avoid consuming excess cinnamon daily."),
      nutritionalBenefits: [
        { ingredient: pending("Milk"), benefits: [{ benefitLabel: pending("Bone Health"), iconKey: "dog-bone" }] },
        { ingredient: pending("Cinnamon"), benefits: [
          { benefitLabel: pending("Healthy Blood Sugar"), iconKey: "sugar-cubes" },
          { benefitLabel: pending("Healthy Metabolism"), iconKey: "healthy-eating" },
        ] },
      ],
      groceryListAvailable: true,
    },
    breakfast: {
      name: pending("Green Moong Dosa & Peanut Chutney"),
      imageUrl: imgGreenMoongDosaPeanutChutney,
      tips: pending("Soak green gram, grind into a batter, prepare dosa, and serve with peanut chutney."),
      nutritionalBenefits: [
        { ingredient: pending("Green Gram"), benefits: [
          { benefitLabel: pending("Protein-Rich"), iconKey: "muscle-health" },
          { benefitLabel: pending("Better Digestion"), iconKey: "stomach" },
        ] },
        { ingredient: pending("Peanuts"), benefits: [{ benefitLabel: pending("Keeps You Full Longer"), iconKey: "happy" }] },
      ],
      groceryListAvailable: true,
    },
    morningSnack: {
      name: pending("Apple"),
      imageUrl: imgApple,
      items: [{ label: pending("1 Apple") }],
      precautions: pending("For people with Diabetes, limit the portion to ½ an apple per serving."),
      nutritionalBenefits: [
        { ingredient: pending("Apple"), benefits: [
          { benefitLabel: pending("Gut Health"), iconKey: "stomach" },
          { benefitLabel: pending("Better Digestion"), iconKey: "stomach" },
          { benefitLabel: pending("Keeps You Full Longer"), iconKey: "happy" },
        ] },
      ],
      recommendedQuantity: [{ ingredient: pending("Apple"), qty: pending("1") }],
      groceryListAvailable: true,
    },
    lunch: {
      name: pending("Chapati & Palak Paneer"),
      imageUrl: imgChapatiPalakPaneer,
      tips: pending("Cook spinach, blend into a puree, sauté with spices, and add paneer cubes."),
      nutritionalBenefits: [
        { ingredient: pending("Chapati"), benefits: [{ benefitLabel: pending("Sustained Energy"), iconKey: "lightning-bolt" }] },
        { ingredient: pending("Spinach"), benefits: [{ benefitLabel: pending("Supports Hemoglobin"), iconKey: "hemoglobin" }] },
        { ingredient: pending("Paneer"), benefits: [{ benefitLabel: pending("Muscle Health"), iconKey: "muscle-health" }] },
      ],
      groceryListAvailable: true,
    },
    eveningSnack: {
      name: pending("Boiled Sweet Potato"),
      imageUrl: imgBoiledSweetPotato,
      tips: pending("Boil the sweet potato until soft, peel, and sprinkle with pepper or jeera."),
      precautions: pending("For People with Diabetes, practice portion control due to its moderate to high glycemic index."),
      nutritionalBenefits: [
        { ingredient: pending("Sweet Potato"), benefits: [
          { benefitLabel: pending("Sustained Energy"), iconKey: "lightning-bolt" },
          { benefitLabel: pending("Better Digestion"), iconKey: "stomach" },
        ] },
      ],
      groceryListAvailable: true,
    },
    dinner: {
      name: pending("Mushroom & Peas Roll"),
      imageUrl: imgMushroomPeasRoll,
      tips: pending("Sauté mushrooms and peas, fill into a chapati, and roll before serving."),
      nutritionalBenefits: [
        { ingredient: pending("Mushroom"), benefits: [
          { benefitLabel: pending("Immunity"), iconKey: "shield" },
          { benefitLabel: pending("Antioxidant Protection"), iconKey: "healthy-food" },
        ] },
        { ingredient: pending("Peas"), benefits: [{ benefitLabel: pending("Keeps You Full Longer"), iconKey: "happy" }] },
      ],
      groceryListAvailable: true,
    },
    nightDrink: {
      name: pending("Ginger Jeera Tea"),
      imageUrl: imgGingerJeeraTea,
      tips: pending("Boil ginger and jeera in water for 5 minutes, strain, and drink warm."),
      nutritionalBenefits: [{ ingredient: pending("Ginger & Jeera"), benefits: [{ benefitLabel: pending("Better Digestion"), iconKey: "stomach" }] }],
      groceryListAvailable: true,
    },
  },
  "2026-08-06": {
    earlyMorning: {
      name: pending("Sesame & Flax Seeds"),
      imageUrl: imgSesameFlaxSeeds,
      items: [{ label: pending("1 tbsp total") }],
      tips: pending("Lightly roast and powder the sesame and flax seeds before consuming."),
      nutritionalBenefits: [
        { ingredient: pending("Sesame Seeds"), benefits: [{ benefitLabel: pending("Bone Health"), iconKey: "dog-bone" }] },
        { ingredient: pending("Flax Seeds"), benefits: [{ benefitLabel: pending("Heart Health"), iconKey: "heart" }] },
      ],
      recommendedQuantity: [{ ingredient: pending("Total Quantity"), qty: pending("1 tbsp") }],
      groceryListAvailable: true,
    },
    postYogaDrink: {
      name: pending("Soaked Chia Seeds & Amla Water"),
      imageUrl: imgSoakedChiaSeedsAmlaWater,
      items: [{ label: pending("1 tbsp seeds") }],
      tips: pending("Soak the chia seeds for 30 minutes to overnight before drinking with amla water."),
      nutritionalBenefits: [
        { ingredient: pending("Chia Seeds"), benefits: [
          { benefitLabel: pending("Better Digestion"), iconKey: "stomach" },
          { benefitLabel: pending("Hydration"), iconKey: "water" },
        ] },
        { ingredient: pending("Amla"), benefits: [{ benefitLabel: pending("Immunity"), iconKey: "shield" }] },
      ],
      recommendedQuantity: [{ ingredient: pending("Chia Seeds"), qty: pending("1 tbsp") }],
      groceryListAvailable: true,
    },
    breakfast: {
      name: pending("Paneer Dosa & Vegetable Sambar"),
      imageUrl: imgPaneerDosaVegetableSambar,
      tips: pending("Spread dosa batter, add grated paneer, cook until golden, and serve with vegetable sambar."),
      nutritionalBenefits: [
        { ingredient: pending("Paneer"), benefits: [{ benefitLabel: pending("Muscle Health"), iconKey: "muscle-health" }] },
        { ingredient: pending("Dosa"), benefits: [{ benefitLabel: pending("Better Digestion"), iconKey: "stomach" }] },
        { ingredient: pending("Sambar"), benefits: [
          { benefitLabel: pending("Protein-Rich"), iconKey: "muscle-health" },
          { benefitLabel: pending("Gut Health"), iconKey: "stomach" },
        ] },
      ],
      groceryListAvailable: true,
    },
    morningSnack: {
      name: pending("Guava"),
      imageUrl: imgGuava,
      items: [{ label: pending("1 Medium Fruit") }],
      precautions: pending("For people with Diabetes, consume 1/2 guava per serving. Avoid adding salt or sugar."),
      nutritionalBenefits: [
        { ingredient: pending("Guava"), benefits: [
          { benefitLabel: pending("Immunity"), iconKey: "shield" },
          { benefitLabel: pending("Gut Health"), iconKey: "stomach" },
          { benefitLabel: pending("Healthy Blood Sugar"), iconKey: "sugar-cubes" },
          { benefitLabel: pending("Antioxidant Protection"), iconKey: "healthy-food" },
          { benefitLabel: pending("Keeps You Full Longer"), iconKey: "happy" },
        ] },
      ],
      recommendedQuantity: [{ ingredient: pending("Guava"), qty: pending("1") }],
      groceryListAvailable: true,
    },
    lunch: {
      name: pending("Ragi Mudda & Vegetable Sambar"),
      imageUrl: imgRagiMuddaVegetableSambar,
      tips: pending("Cook ragi flour in boiling water, shape into balls (sankati/mudde), and serve with hot sambar."),
      nutritionalBenefits: [
        { ingredient: pending("Ragi"), benefits: [{ benefitLabel: pending("Bone Health"), iconKey: "dog-bone" }] },
        { ingredient: pending("Sambar"), benefits: [
          { benefitLabel: pending("Protein-Rich"), iconKey: "muscle-health" },
          { benefitLabel: pending("Better Digestion"), iconKey: "stomach" },
        ] },
      ],
      groceryListAvailable: true,
    },
    eveningSnack: {
      name: pending("Peanut Chikki"),
      imageUrl: imgPeanutChikki,
      tips: pending("Melt jaggery, mix with roasted peanuts, spread the mixture, and cut into pieces once set."),
      precautions: pending("For People with Diabetes, limit the portion due to the high sugar content."),
      nutritionalBenefits: [
        { ingredient: pending("Peanuts"), benefits: [{ benefitLabel: pending("Keeps You Full Longer"), iconKey: "happy" }] },
        { ingredient: pending("Jaggery"), benefits: [{ benefitLabel: pending("Energy"), iconKey: "lightning-bolt" }] },
      ],
      groceryListAvailable: true,
    },
    dinner: {
      name: pending("Coconut Rice Bowl & Capsicum Raita"),
      imageUrl: imgCoconutRiceBowlCapsicumRaita,
      tips: pending("Mix grated coconut with cooked rice and prepare raita with capsicum and curd."),
      precautions: pending("For People with Diabetes, practice portion control with rice."),
      nutritionalBenefits: [
        { ingredient: pending("Rice"), benefits: [{ benefitLabel: pending("Energy"), iconKey: "lightning-bolt" }] },
        { ingredient: pending("Coconut"), benefits: [{ benefitLabel: pending("Keeps You Full Longer"), iconKey: "happy" }] },
        { ingredient: pending("Capsicum"), benefits: [{ benefitLabel: pending("Antioxidant Protection"), iconKey: "healthy-food" }] },
        { ingredient: pending("Curd"), benefits: [{ benefitLabel: pending("Better Digestion"), iconKey: "stomach" }] },
      ],
      groceryListAvailable: true,
    },
    nightDrink: {
      name: pending("Fennel Tea"),
      imageUrl: imgFennelTea,
      tips: pending("Boil fennel seeds in water for 5 minutes, strain, and drink warm."),
      nutritionalBenefits: [{ ingredient: pending("Fennel Tea"), benefits: [{ benefitLabel: pending("Better Digestion"), iconKey: "stomach" }] }],
      groceryListAvailable: true,
    },
  },
  "2026-08-07": {
    earlyMorning: {
      name: pending("Soaked Almonds & Black Raisins"),
      imageUrl: imgSoakedAlmondsBlackRaisins,
      items: [{ label: pending("4 Almonds") }, { label: pending("4 Black Raisins") }],
      tips: pending("Soak 4 almonds and 4 black raisins overnight and eat them in the morning."),
      precautions: pending("For people with Diabetes, limit the quantity of raisins due to their high sugar content."),
      nutritionalBenefits: [
        { ingredient: pending("Almonds"), benefits: [
          { benefitLabel: pending("Brain Health"), iconKey: "brain-health" },
          { benefitLabel: pending("Healthy Skin"), iconKey: "healthy-skin" },
        ] },
        { ingredient: pending("Black Raisins"), benefits: [
          { benefitLabel: pending("Supports Hemoglobin"), iconKey: "hemoglobin" },
          { benefitLabel: pending("Energy"), iconKey: "lightning-bolt" },
        ] },
      ],
      recommendedQuantity: [
        { ingredient: pending("Almonds"), qty: pending("4 pcs") },
        { ingredient: pending("Black Raisins"), qty: pending("4 pcs") },
      ],
      groceryListAvailable: true,
    },
    postYogaDrink: {
      name: pending("Tender Coconut Water"),
      imageUrl: imgTenderCoconutWater,
      precautions: pending("For people with Diabetes, limit the quantity as coconut water contains natural sugars."),
      nutritionalBenefits: [
        { ingredient: pending("Coconut Water"), benefits: [
          { benefitLabel: pending("Energy"), iconKey: "lightning-bolt" },
          { benefitLabel: pending("Hydration"), iconKey: "water" },
        ] },
      ],
      groceryListAvailable: true,
    },
    breakfast: {
      name: pending("Godhuma Ravva Upma with Peanuts"),
      imageUrl: imgGodhumaRavvaUpmaPeanuts,
      tips: pending("Roast the broken wheat (godhuma ravva), then cook with sautéed vegetables and peanuts until soft."),
      precautions: pending("For people with Diabetes, practice portion control due to its moderate glycemic index."),
      nutritionalBenefits: [
        { ingredient: pending("Broken Wheat (Godhuma Ravva)"), benefits: [
          { benefitLabel: pending("Sustained Energy"), iconKey: "lightning-bolt" },
          { benefitLabel: pending("Better Digestion"), iconKey: "stomach" },
        ] },
        { ingredient: pending("Peanuts"), benefits: [{ benefitLabel: pending("Keeps You Full Longer"), iconKey: "happy" }] },
      ],
      groceryListAvailable: true,
    },
    morningSnack: {
      name: pending("Guava"),
      imageUrl: imgGuava,
      items: [{ label: pending("1 Medium Fruit") }],
      precautions: pending("For people with Diabetes, consume 1/2 guava per serving. Avoid adding salt or sugar."),
      nutritionalBenefits: [
        { ingredient: pending("Guava"), benefits: [
          { benefitLabel: pending("Immunity"), iconKey: "shield" },
          { benefitLabel: pending("Gut Health"), iconKey: "stomach" },
          { benefitLabel: pending("Healthy Blood Sugar"), iconKey: "sugar-cubes" },
          { benefitLabel: pending("Antioxidant Protection"), iconKey: "healthy-food" },
          { benefitLabel: pending("Keeps You Full Longer"), iconKey: "happy" },
        ] },
      ],
      recommendedQuantity: [{ ingredient: pending("Guava"), qty: pending("1") }],
      groceryListAvailable: true,
    },
    lunch: {
      name: pending("Steamed Rice, Leafy Dal, Ivy Gourd (Kundru) Curry & Curd"),
      imageUrl: imgSteamedRiceLeafyDalIvyGourdKundruCurryCurd,
      tips: pending("Cook dal with gongura, sauté ivy gourd (dondakaya) separately, and serve with rice and curd."),
      precautions: pending("For people with Diabetes, practice portion control with white rice."),
      nutritionalBenefits: [
        { ingredient: pending("Rice"), benefits: [{ benefitLabel: pending("Energy"), iconKey: "lightning-bolt" }] },
        { ingredient: pending("Gongura"), benefits: [
          { benefitLabel: pending("Better Digestion"), iconKey: "stomach" },
          { benefitLabel: pending("Antioxidant Protection"), iconKey: "healthy-food" },
        ] },
        { ingredient: pending("Dal"), benefits: [{ benefitLabel: pending("Muscle Health"), iconKey: "muscle-health" }] },
        { ingredient: pending("Curd"), benefits: [{ benefitLabel: pending("Gut Health"), iconKey: "stomach" }] },
      ],
      groceryListAvailable: true,
    },
    eveningSnack: {
      name: pending("Paneer Cubes & Pepper"),
      imageUrl: imgPaneerCubesPepper,
      tips: pending("Cut paneer into cubes, sprinkle with pepper, and lightly sauté or serve fresh."),
      nutritionalBenefits: [
        { ingredient: pending("Paneer"), benefits: [
          { benefitLabel: pending("Muscle Health"), iconKey: "muscle-health" },
          { benefitLabel: pending("Bone Health"), iconKey: "dog-bone" },
        ] },
        { ingredient: pending("Pepper"), benefits: [{ benefitLabel: pending("Better Digestion"), iconKey: "stomach" }] },
      ],
      groceryListAvailable: true,
    },
    dinner: {
      name: pending("Cucumber & Capsicum Curd Bowl"),
      imageUrl: imgCucumberCapsicumCurdBowl,
      tips: pending("Mix chopped cucumber and capsicum into curd, then add pepper and salt."),
      precautions: pending("For People with Thyroid Concerns, avoid consuming this at night if sensitive."),
      nutritionalBenefits: [
        { ingredient: pending("Cucumber"), benefits: [
          { benefitLabel: pending("Hydration"), iconKey: "water" },
          { benefitLabel: pending("Cooling"), iconKey: "snowflake" },
        ] },
        { ingredient: pending("Capsicum"), benefits: [{ benefitLabel: pending("Antioxidant Protection"), iconKey: "healthy-food" }] },
        { ingredient: pending("Curd"), benefits: [{ benefitLabel: pending("Gut Health"), iconKey: "stomach" }] },
      ],
      groceryListAvailable: true,
    },
    nightDrink: {
      name: pending("Coriander Seed Tea"),
      imageUrl: imgCorianderSeedTea,
      tips: pending("Boil coriander seeds in water for 5–7 minutes, strain, and drink warm."),
      nutritionalBenefits: [
        { ingredient: pending("Coriander Seed Tea"), benefits: [
          { benefitLabel: pending("Better Digestion"), iconKey: "stomach" },
          { benefitLabel: pending("Antioxidant Protection"), iconKey: "healthy-food" },
        ] },
      ],
      groceryListAvailable: true,
    },
  },
  "2026-08-08": {
    earlyMorning: {
      name: pending("Soaked Chia & Flax Seeds"),
      imageUrl: imgSoakedChiaFlaxSeeds,
      items: [{ label: pending("1 tbsp total") }],
      tips: pending("Soak the chia seeds, and lightly roast and powder the flax seeds before consuming."),
      nutritionalBenefits: [
        { ingredient: pending("Chia Seeds"), benefits: [
          { benefitLabel: pending("Better Digestion"), iconKey: "stomach" },
          { benefitLabel: pending("Hydration"), iconKey: "water" },
        ] },
        { ingredient: pending("Flax Seeds"), benefits: [
          { benefitLabel: pending("Heart Health"), iconKey: "heart" },
          { benefitLabel: pending("Sustained Energy"), iconKey: "lightning-bolt" },
        ] },
      ],
      recommendedQuantity: [{ ingredient: pending("Total"), qty: pending("1 tbsp") }],
      groceryListAvailable: true,
    },
    postYogaDrink: {
      name: pending("Tender Coconut Water"),
      imageUrl: imgTenderCoconutWater,
      precautions: pending("For people with Diabetes, limit the quantity as coconut water contains natural sugars."),
      nutritionalBenefits: [
        { ingredient: pending("Coconut Water"), benefits: [
          { benefitLabel: pending("Energy"), iconKey: "lightning-bolt" },
          { benefitLabel: pending("Hydration"), iconKey: "water" },
        ] },
      ],
      groceryListAvailable: true,
    },
    breakfast: {
      name: pending("Vegetable Poha & Peanuts"),
      imageUrl: imgVegetablePohaPeanuts,
      tips: pending("Sauté vegetables, add soaked poha and peanuts, then mix and cook until soft."),
      precautions: pending("For people with Diabetes, practice portion control due to its moderate to high glycemic index."),
      nutritionalBenefits: [
        { ingredient: pending("Poha"), benefits: [
          { benefitLabel: pending("Energy"), iconKey: "lightning-bolt" },
          { benefitLabel: pending("Better Digestion"), iconKey: "stomach" },
        ] },
        { ingredient: pending("Peanuts"), benefits: [{ benefitLabel: pending("Keeps You Full Longer"), iconKey: "happy" }] },
        { ingredient: pending("Vegetables"), benefits: [{ benefitLabel: pending("Gut Health"), iconKey: "stomach" }] },
      ],
      groceryListAvailable: true,
    },
    morningSnack: {
      name: pending("Apple"),
      imageUrl: imgApple,
      items: [{ label: pending("1 Apple") }],
      precautions: pending("For people with Diabetes, consume 1 medium apple. Pair it with few nuts or seeds for better blood sugar balance."),
      nutritionalBenefits: [
        { ingredient: pending("Apple"), benefits: [
          { benefitLabel: pending("Immunity"), iconKey: "shield" },
          { benefitLabel: pending("Gut Health"), iconKey: "stomach" },
          { benefitLabel: pending("Heart Health"), iconKey: "heart" },
          { benefitLabel: pending("Antioxidant Protection"), iconKey: "healthy-food" },
        ] },
      ],
      recommendedQuantity: [{ ingredient: pending("Apple"), qty: pending("1") }],
      groceryListAvailable: true,
    },
    lunch: {
      name: pending("Rice, Mixed Dal Curry & Cucumber Boiled Peanut Salad"),
      imageUrl: imgRiceMixedDalCurryCucumberBoiledPeanutSalad,
      tips: pending("Cook mixed dal with spices, and prepare a salad with boiled peanuts and cucumber."),
      precautions: pending("For People with Diabetes, practice portion control with white rice."),
      nutritionalBenefits: [
        { ingredient: pending("Rice"), benefits: [{ benefitLabel: pending("Energy"), iconKey: "lightning-bolt" }] },
        { ingredient: pending("Mixed Dal"), benefits: [{ benefitLabel: pending("Muscle Health"), iconKey: "muscle-health" }] },
        { ingredient: pending("Peanuts"), benefits: [{ benefitLabel: pending("Keeps You Full Longer"), iconKey: "happy" }] },
        { ingredient: pending("Cucumber"), benefits: [
          { benefitLabel: pending("Hydration"), iconKey: "water" },
          { benefitLabel: pending("Cooling"), iconKey: "snowflake" },
        ] },
      ],
      groceryListAvailable: true,
    },
    eveningSnack: {
      name: pending("Corn Pakoda"),
      imageUrl: imgCornPakoda,
      tips: pending("Mix boiled corn with besan, onion, and spices, shape loosely, and shallow fry until crisp."),
      nutritionalBenefits: [
        { ingredient: pending("Corn"), benefits: [
          { benefitLabel: pending("Energy"), iconKey: "lightning-bolt" },
          { benefitLabel: pending("Better Digestion"), iconKey: "stomach" },
        ] },
        { ingredient: pending("Besan"), benefits: [{ benefitLabel: pending("Keeps You Full Longer"), iconKey: "happy" }] },
        { ingredient: pending("Spices"), benefits: [{ benefitLabel: pending("Better Digestion"), iconKey: "stomach" }] },
      ],
      groceryListAvailable: true,
    },
    dinner: {
      name: pending("Spinach Cheela & Tomato Chutney"),
      imageUrl: imgSpinachCheelaTomatoChutney,
      tips: pending("Blend spinach into the moong batter, cook like a dosa, and serve with chutney."),
      nutritionalBenefits: [
        { ingredient: pending("Moong Batter"), benefits: [
          { benefitLabel: pending("Protein-Rich"), iconKey: "muscle-health" },
          { benefitLabel: pending("Better Digestion"), iconKey: "stomach" },
        ] },
        { ingredient: pending("Spinach"), benefits: [{ benefitLabel: pending("Supports Hemoglobin"), iconKey: "hemoglobin" }] },
      ],
      groceryListAvailable: true,
    },
    nightDrink: {
      name: pending("Ajwain Tea"),
      imageUrl: imgAjwainTea,
      tips: pending("Boil ajwain in water for 5 minutes, strain, and drink warm."),
      nutritionalBenefits: [{ ingredient: pending("Ajwain Tea"), benefits: [{ benefitLabel: pending("Better Digestion"), iconKey: "stomach" }] }],
      groceryListAvailable: true,
    },
  },
  // 2026-08-09: the Figma design only has 7 distinct meal cards — postYogaDrink shares
  // breakfast's dish with no separate card, and the generic sheet already matches ("Ragi
  // Malt with nuts and seeds" for both slots), so postYogaDrink is deliberately left
  // un-curated here and falls back to the generic layer rather than duplicating breakfast.
  "2026-08-09": {
    earlyMorning: {
      name: pending("Soaked Pistachios & Gold Raisins"),
      imageUrl: imgSoakedPistachiosGoldRaisins,
      items: [{ label: pending("3 Pistachios") }, { label: pending("5 Gold Raisins") }],
      tips: pending("Soak 3 pistachios and 5 raisins overnight and eat them in the morning."),
      precautions: pending("For people with Diabetes, limit the quantity of raisins due to their high sugar content."),
      nutritionalBenefits: [
        { ingredient: pending("Raisins"), benefits: [
          { benefitLabel: pending("Energy"), iconKey: "lightning-bolt" },
          { benefitLabel: pending("Supports Hemoglobin"), iconKey: "hemoglobin" },
        ] },
        { ingredient: pending("Pistachios"), benefits: [{ benefitLabel: pending("Heart Health"), iconKey: "heart" }] },
      ],
      recommendedQuantity: [
        { ingredient: pending("Soaked Pistachios"), qty: pending("3 pcs") },
        { ingredient: pending("Soaked Raisins"), qty: pending("5 pcs") },
      ],
      groceryListAvailable: true,
    },
    breakfast: {
      name: pending("Ragi Malt with Nuts & Seeds"),
      imageUrl: imgRagiMaltWithNutsSeeds,
      tips: pending("Cook ragi flour in water or milk, stir continuously, and top with crushed nuts and seeds."),
      nutritionalBenefits: [
        { ingredient: pending("Nuts & Seeds"), benefits: [{ benefitLabel: pending("Sustained Energy"), iconKey: "lightning-bolt" }] },
        { ingredient: pending("Ragi"), benefits: [{ benefitLabel: pending("Bone Health"), iconKey: "dog-bone" }] },
      ],
      groceryListAvailable: true,
    },
    morningSnack: {
      name: pending("Pineapple"),
      imageUrl: imgPineapple,
      precautions: pending("For people with Diabetes, limit the portion to 100–150 g (about 1 cup) per serving due to its natural sugar content."),
      nutritionalBenefits: [
        { ingredient: pending("Pineapple"), benefits: [
          { benefitLabel: pending("Immunity"), iconKey: "shield" },
          { benefitLabel: pending("Better Digestion"), iconKey: "stomach" },
          { benefitLabel: pending("Antioxidant Protection"), iconKey: "healthy-food" },
        ] },
      ],
      groceryListAvailable: true,
    },
    lunch: {
      name: pending("Rice, Carrot Tomato Rasam, French Beans & Coconut Curry"),
      imageUrl: imgRiceCarrotTomatoRasamFrenchBeansCoconutCurry,
      tips: pending("Prepare rasam with tomato and carrot, and sauté beans with coconut and spices."),
      precautions: pending("For People with Diabetes, practice portion control with white rice."),
      nutritionalBenefits: [
        { ingredient: pending("Rice"), benefits: [{ benefitLabel: pending("Energy"), iconKey: "lightning-bolt" }] },
        { ingredient: pending("Rasam"), benefits: [{ benefitLabel: pending("Better Digestion"), iconKey: "stomach" }] },
        { ingredient: pending("Beans"), benefits: [{ benefitLabel: pending("Gut Health"), iconKey: "stomach" }] },
        { ingredient: pending("Coconut"), benefits: [{ benefitLabel: pending("Keeps You Full Longer"), iconKey: "happy" }] },
      ],
      groceryListAvailable: true,
    },
    eveningSnack: {
      name: pending("Makhana Kaju Nuts Ice Cream (Home-made)"),
      imageUrl: imgMakhanaKajuNutsIceCream,
      tips: pending("Blend soaked makhana, cashews, and milk, then freeze until set."),
      precautions: pending("For People with Diabetes, limit the portion as it contains natural sugars."),
      nutritionalBenefits: [
        { ingredient: pending("Cashews"), benefits: [{ benefitLabel: pending("Keeps You Full Longer"), iconKey: "happy" }] },
        { ingredient: pending("Makhana"), benefits: [{ benefitLabel: pending("Bone Health"), iconKey: "dog-bone" }] },
      ],
      groceryListAvailable: true,
    },
    dinner: {
      name: pending("Mixed Vegetable Uttappam & Tomato Chutney"),
      imageUrl: imgMixedVegetableUttappamTomatoChutney,
      tips: pending("Pour the batter thick, add vegetables on top, cook both sides, and serve with chutney."),
      precautions: pending("For People with Diabetes, practice portion control as uttappam has a moderate glycemic index (GI)."),
      nutritionalBenefits: [
        { ingredient: pending("Uttappam"), benefits: [{ benefitLabel: pending("Gut Health"), iconKey: "stomach" }] },
        { ingredient: pending("Vegetables"), benefits: [{ benefitLabel: pending("Better Digestion"), iconKey: "stomach" }] },
        { ingredient: pending("Tomato"), benefits: [{ benefitLabel: pending("Antioxidant Protection"), iconKey: "healthy-food" }] },
      ],
      groceryListAvailable: true,
    },
    nightDrink: {
      name: pending("Tulasi Tea"),
      imageUrl: imgTulasiTea,
      tips: pending("Boil tulasi leaves in water for 5 minutes, strain, and drink warm."),
      nutritionalBenefits: [
        { ingredient: pending("Tulasi Tea"), benefits: [
          { benefitLabel: pending("Immunity"), iconKey: "shield" },
          { benefitLabel: pending("Relaxation"), iconKey: "meditation" },
          { benefitLabel: pending("Antioxidant Protection"), iconKey: "healthy-food" },
        ] },
      ],
      groceryListAvailable: true,
    },
  },
};
