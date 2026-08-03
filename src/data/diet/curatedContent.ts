import type { CuratedContentByDate, LocalizedText, MealSlotId } from "./types";
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
/** Placeholder for a date/slot with no Telugu Figma screen yet — English text duplicated
 *  so the UI never shows blank Telugu content. Currently unused (every curated date has
 *  real Telugu as of 2026-08-09's screens landing), but kept for the next batch of dates:
 *  swap `pending(...)` for real `t(...)` once a date's Telugu screen arrives, and search
 *  this file for `pending` to find every call site that still needs updating. */
const pending = same;

/**
 * Hand-authored overrides matching the Figma detail screens, keyed by ISO date then slot
 * id. Curated dates today: 2026-08-03 through 2026-08-09, all with real Telugu (Telugu
 * screens are per-date sections under the M2W2-Telugu parent frame 970:32654 — 03:
 * 970:32655, 04: 970:33289, 05: 970:33879, 06: 970:34451, 07: 970:35060, 08: 970:35696,
 * 09: 978:45985). Any date with no entry here falls back entirely to the generic sheet
 * content in weekBlocks/. Add more dates the same way as more days get designed; nothing
 * else needs to change.
 */
export const CURATED_CONTENT_BY_DATE: CuratedContentByDate = {
  "2026-08-03": {
    earlyMorning: {
      name: t("Walnuts & Dates", "Walnuts & ఖర్జూరాలు"),
      imageUrl: imgWalnutsDates,
      items: [{ label: t("2 Walnuts", "2 ఆక్రోట్లు") }, { label: t("2 Dates", "2 ఖర్జూరాలు") }],
      tips: t("Soak overnight and eat in the morning.", "రాత్రంతా నానబెట్టి, ఉదయం తినండి."),
      precautions: t(
        "For people with Diabetes, dates are high in sugar, so limit the quantity.",
        "Diabetes ఉన్నవారు ఖర్జూరాలు limit గా తీసుకోండి, ఎందుకంటే వీటిలో Natural sugars ఎక్కువగా ఉంటుంది."
      ),
      nutritionalBenefits: [
        { ingredient: t("Walnuts", "ఆక్రోట్లు"), benefits: [{ benefitLabel: t("Heart Health", "Heart health కి మంచిది"), iconKey: "heart" }] },
        { ingredient: t("Dates", "ఖర్జూరాలు"), benefits: [{ benefitLabel: t("Quick Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" }] },
      ],
      recommendedQuantity: [
        { ingredient: same("Walnuts"), qty: same("2 pcs") },
        { ingredient: t("Dates", "ఖర్జూరాలు"), qty: same("2 pcs") },
      ],
      groceryListAvailable: true,
    },
    postYogaDrink: {
      name: t("Cucumber & Lemon Detox Juice", "Keera & lemon Detox juice"),
      imageUrl: imgCucumberLemonDetoxJuice,
      tips: t(
        "Blend cucumber with water, strain if needed, and add fresh lemon juice before drinking.",
        "Keera దోసకాయను water తో blend చేసి, strain చేసి, తాగే ముందు fresh lemon కలపండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Cucumber", "కీర దోసకాయ"), benefits: [
          { benefitLabel: t("Hydration", "Body ని Hydrated గా ఉంచుతుంది"), iconKey: "water" },
          { benefitLabel: t("Cooling", "Body న్ని cool గా ఉంచుతుంది"), iconKey: "snowflake" },
        ] },
        { ingredient: t("Lemon", "నిమ్మకాయ"), benefits: [{ benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" }] },
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
        { ingredient: t("Cucumber", "కీర దోసకాయ"), benefits: [
          { benefitLabel: t("Hydration", "Body ని Hydrated గా ఉంచుతుంది"), iconKey: "water" },
          { benefitLabel: t("Cooling", "Body న్ని cool గా ఉంచుతుంది"), iconKey: "snowflake" },
        ] },
        { ingredient: t("Spinach", "పాలకూర"), benefits: [{ benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" }] },
        { ingredient: t("Paneer", "పనీర్"), benefits: [{ benefitLabel: t("Muscle Health", "Muscle health ని పెంచుతుంది"), iconKey: "muscle-health" }] },
      ],
      groceryListAvailable: true,
    },
    morningSnack: {
      name: t("Guava", "జామపండు"),
      imageUrl: imgGuava,
      items: [{ label: t("1 medium fruit", "1 Medium Size Fruit") }],
      precautions: t(
        "For people with Diabetes, limit to 1 medium guava (100–150g) and avoid adding salt or sugar.",
        "Diabetes ఉన్నవారు 1 medium fruit (100–150g) మాత్రమే తీసుకోండి. Salt లేదా sugar కలపకండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Guava", "జామపండు"), benefits: [
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
          { benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" },
          // Figma 970:32655 (Telugu) has no row for these two — English-only, per 924:21411.
          { benefitLabel: t("Healthy Blood Sugar", "ఆరోగ్యకరమైన రక్తంలో చక్కెర అందిస్తుంది"), iconKey: "sugar-cubes", visibleLanguages: ["English"] },
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food", visibleLanguages: ["English"] },
          { benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" },
        ] },
      ],
      recommendedQuantity: [{ ingredient: t("Medium Guava", "Medium జామపండు"), qty: same("1") }],
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
        "Diabetes ఉన్నవారు white rice limit లో తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Steamed Rice", "అన్నం"), benefits: [{ benefitLabel: t("Energy", "Energy ఇస్తుంది"), iconKey: "lightning-bolt" }] },
        { ingredient: t("Leafy Dal", "ఆకుకూర పప్పు"), benefits: [
          { benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" },
          { benefitLabel: t("Muscle Health", "Muscle health ని పెంచుతుంది"), iconKey: "muscle-health" },
        ] },
        { ingredient: t("Mixed Vegetables", "Mixed కూరగాయలు"), benefits: [{ benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" }] },
        { ingredient: t("Curd", "పెరుగు"), benefits: [{ benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" }] },
      ],
      groceryListAvailable: true,
    },
    eveningSnack: {
      name: t("Mushroom Soup", "Mushroom soup"),
      imageUrl: imgMushroomSoup,
      tips: t(
        "Sauté mushrooms, cook with water and spices, blend, and simmer with pepper before serving.",
        "Mushrooms ను కొద్దిగా వేయించి, water & మసాలాలు వేసి ఉడికించి, blend చేసి, మిరియాల పొడి వేసి serve చేయండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Mushroom", "మష్రూమ్"), benefits: [
          { benefitLabel: t("Immunity Support", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
          // Figma 970:32655 (Telugu) has no row for this — English-only, per 924:21411.
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food", visibleLanguages: ["English"] },
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
        { ingredient: t("Ragi", "రాగి"), benefits: [{ benefitLabel: t("Bone Health", "Bone health కి మంచిది"), iconKey: "dog-bone" }] },
        { ingredient: t("Curry Leaves", "కరివేపాకు"), benefits: [{ benefitLabel: t("Healthy Metabolism", "Metabolism ని పెంచుతుంది"), iconKey: "healthy-eating" }] },
        { ingredient: t("Ghee", "నెయ్యి"), benefits: [{ benefitLabel: t("Improves Nutrient Absorption", "Healthy fats, Vitamin A & Vitamin K2 ఎక్కువగా ఉంటాయి"), iconKey: "nutrient-absorption" }] },
      ],
      groceryListAvailable: true,
    },
    nightDrink: {
      name: t("Turmeric Milk", "Turmeric పాలు"),
      imageUrl: imgTurmericMilk,
      tips: t(
        "Heat milk with turmeric and a pinch of pepper for 3–4 minutes.",
        "పాలలో పసుపు & చిటికెడు మిరియాల పొడి వేసి 3–4 నిమిషాలు వేడి చేయండి."
      ),
      precautions: t(
        "Avoid mobile phones or TV after 9:30 PM and aim for 7 hours of sound sleep (10:00 PM–5:00 AM).",
        "9:30pm తర్వాత మొబైల్ లేదా TV వాడకండి. రాత్రి 10:00-5:00am వరకు కనీసం 7 గం నిద్రపోవడానికి try చేయండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Turmeric", "పసుపు"), benefits: [{ benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" }] },
        { ingredient: t("Milk", "పాలు"), benefits: [{ benefitLabel: t("Bone Strength", "Bone health కి మంచిది"), iconKey: "dog-bone" }] },
      ],
      groceryListAvailable: true,
    },
  },
  "2026-08-04": {
    earlyMorning: {
      name: t("Pumpkin & Sunflower Seeds", "Pumpkin seeds & sunflower seeds"),
      imageUrl: imgPumpkinSunflowerSeeds,
      items: [{ label: t("1 tbsp in total", "1 tbsp") }],
      tips: t(
        "Enjoy them lightly roasted or soaked overnight.",
        "1tbsp రాత్రంతా నానబెట్టి morning తీసుకోవచ్చు."
      ),
      nutritionalBenefits: [
        { ingredient: t("Pumpkin Seeds", "Pumpkin Seeds"), benefits: [{ benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" }] },
        { ingredient: t("Sunflower Seeds", "సన్‌ఫ్లవర్ గింజలు"), benefits: [
          // Figma 970:33289 (Telugu) shows a Skin Health row here instead — English-only.
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food", visibleLanguages: ["English"] },
          // Telugu-only: Figma 970:33289 shows this row instead of Antioxidant Protection.
          { benefitLabel: t("Healthy Skin", "Skin health ని improve చేస్తుంది"), iconKey: "healthy-skin", visibleLanguages: ["Telugu"] },
        ] },
      ],
      recommendedQuantity: [{ ingredient: t("Mixed Seeds", "Seeds"), qty: same("1 tbsp") }],
      groceryListAvailable: true,
    },
    postYogaDrink: {
      name: t("Moringa & Mint Vegetable Juice", "మునగాకు & పుదీనా vegetable juice"),
      imageUrl: imgMoringaMintVegetableJuice,
      tips: t(
        "Blend cleaned munagaku leaves with mint and water, strain, and drink fresh.",
        "మునగాకులు, పుదీనా Clean చేసిన, water తో blend చేసి, strain చేసి వెంటనే తాగండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Munagaku", "మునగాకు"), benefits: [{ benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" }] },
        { ingredient: t("Mint", "పుదీనా"), benefits: [{ benefitLabel: t("Aids Digestion", "Digestion కి support చేస్తుంది"), iconKey: "stomach" }] },
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
        { ingredient: t("Adai", "అడై"), benefits: [
          { benefitLabel: t("Protein-Rich", "Protein ఎక్కువగా ఉంటుంది"), iconKey: "muscle-health" },
          { benefitLabel: t("Sustained Energy", "ఎక్కువసేపుenergy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
        ] },
        { ingredient: t("Coconut", "కొబ్బరి"), benefits: [{ benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" }] },
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
      nutritionalBenefits: [{ ingredient: same("Apple"), benefits: [{ benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" }] }],
      recommendedQuantity: [{ ingredient: same("Apple"), qty: same("1") }],
      groceryListAvailable: true,
    },
    lunch: {
      name: t("Pudina Rice Bowl & Carrot Beetroot Raita", "పుదీనా రైస్ & క్యారెట్ బీట్‌రూట్ రైతా"),
      imageUrl: imgPudinaRiceBowlCarrotBeetrootRaita,
      tips: t(
        "Mix mint paste with cooked rice and prepare raita with grated carrot and beetroot in curd.",
        "ఉడికించిన అన్నంలో పుదీనా paste కలపండి. పెరుగులో తురిమిన క్యారెట్ & బీట్‌రూట్ వేసి రైతా తయారు చేయండి."
      ),
      precautions: t(
        "For people with Diabetes, practice portion control with rice.",
        "Diabetes ఉన్నవారు rice limit లో తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Rice", "అన్నం"), benefits: [{ benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" }] },
        { ingredient: t("Mint", "పుదీనా"), benefits: [{ benefitLabel: t("Digestive Support", "Digestion కి support చేస్తుంది"), iconKey: "stomach" }] },
        { ingredient: t("Mixed Vegetables", "మిక్స్‌డ్ కూరగాయలు"), benefits: [{ benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" }] },
        { ingredient: t("Curd", "పెరుగు"), benefits: [{ benefitLabel: t("Better Digestion", "Digestion కి support చేస్తుంది"), iconKey: "stomach" }] },
      ],
      groceryListAvailable: true,
    },
    eveningSnack: {
      name: t(
        "Protein and Energy Boost Sprouts Chaat (Lightly Steamed)",
        "Sprouts chat (కొద్దిగా ఆవిరిలో ఉడికించినవి)"
      ),
      imageUrl: imgSproutsChaat,
      tips: t(
        "Lightly steam the sprouts, then mix with onion, lemon, and spices.",
        "Sprouts ను కొద్దిగా steam చేసి, ఉల్లిపాయ, నిమ్మరసం & మసాలాలు కలపండి."
      ),
      precautions: t(
        "For People with Thyroid Concerns, avoid consuming excess raw sprouts regularly.",
        "Thyroidడ problem ఉన్నవారు పచ్చి sprouts ను ఎక్కువగా తీసుకోవద్దు."
      ),
      nutritionalBenefits: [
        { ingredient: t("Sprouts", "Sprouts"), benefits: [
          { benefitLabel: t("Protein-Rich", "Protein ఎక్కువగా ఉంటుంది"), iconKey: "muscle-health" },
          // Figma 970:33289 (Telugu) has no row for this — English-only, per 924:21411.
          { benefitLabel: t("Supports Metabolism", "జీవక్రియ (మెటాబాలిజం)కు మద్దతు"), iconKey: "healthy-eating", visibleLanguages: ["English"] },
          { benefitLabel: t("Better Digestion", "Digestion కి support చేస్తుంది"), iconKey: "stomach" },
          { benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" },
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
        { ingredient: t("Jowar", "జొన్న"), benefits: [{ benefitLabel: t("Sustained Energy", "ఎక్కువసేపు energy ని ఇస్తుంది"), iconKey: "lightning-bolt" }] },
        { ingredient: t("Coconut", "కొబ్బరి"), benefits: [{ benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" }] },
      ],
      groceryListAvailable: true,
    },
    nightDrink: {
      name: t("Tulasi Tea", "తులసి టీ"),
      imageUrl: imgTulasiTea,
      tips: t(
        "Boil tulasi leaves in water for 5 minutes, strain, and drink warm.",
        "తులసి ఆకులను water లో 5 నిమిషాలు మరిగించి, strain చేసి గోరువెచ్చగా తాగండి."
      ),
      precautions: t(
        "Avoid using mobile phones or watching TV after 9:30 PM.",
        "రాత్రి 9:30 తర్వాత మొబైల్ లేదా TV చూడకండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Tulasi Tea", "తులసి టీ"), benefits: [
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
          // Figma 970:33289 (Telugu) shows a "Digestion Support" row here instead of
          // Antioxidant Protection/Relaxation (not modeled as its own benefit entry yet) —
          // English-only for now, per 924:21411.
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food", visibleLanguages: ["English"] },
          { benefitLabel: t("Relaxation", "శరీరం & మనసుకు రిలాక్సేషన్ అందిస్తుంది"), iconKey: "meditation", visibleLanguages: ["English"] },
        ] },
      ],
      groceryListAvailable: true,
    },
  },
  // Below: 2026-08-05 through 2026-08-09 all have real Telugu now too (from Figma nodes
  // 970:33879 / 970:34451 / 970:35060 / 970:35696 / 978:45985).
  "2026-08-05": {
    earlyMorning: {
      name: t("Warm Water", "గోరువెచ్చని నీరు"),
      imageUrl: imgWarmWater,
      items: [{ label: t("1 Glass", "1 గ్లాస్") }],
      tips: t(
        "Drink warm water throughout the day to help cleanse the system and kickstart digestion.",
        "రోజంతా గోరువెచ్చని నీరు తాగండి. ఇది digestion కు మంచిది."
      ),
      nutritionalBenefits: [
        { ingredient: t("Warm Water", "గోరువెచ్చని నీరు"), benefits: [
          { benefitLabel: t("Better Digestion", "Digestion కి support చేస్తుంది"), iconKey: "stomach" },
          { benefitLabel: t("Healthy Metabolism", "Metabolism ని పెంచుతుంది"), iconKey: "healthy-eating" },
        ] },
      ],
      recommendedQuantity: [{ ingredient: t("Water", "గోరువెచ్చని నీరు"), qty: t("1 Glass", "1 గ్లాస్") }],
      groceryListAvailable: true,
    },
    postYogaDrink: {
      name: t("Cinnamon Milk", "దాల్చిన చెక్క పాలు"),
      imageUrl: imgCinnamonMilk,
      tips: t(
        "Boil milk with a small cinnamon stick for 5 minutes and serve warm.",
        "పాలలో చిన్న దాల్చిన చెక్క ముక్క వేసి 5 నిమిషాలు మరిగించి గోరువెచ్చగా తాగండి."
      ),
      precautions: t(
        "For People with Thyroid Concerns, avoid consuming excess cinnamon daily.",
        "Thyroid: దాల్చిన చెక్క రోజూ ఎక్కువగా వద్దు."
      ),
      nutritionalBenefits: [
        { ingredient: t("Milk", "పాలు"), benefits: [{ benefitLabel: t("Bone Health", "Bone health కి మంచిది"), iconKey: "dog-bone" }] },
        { ingredient: t("Cinnamon", "దాల్చిన చెక్క"), benefits: [
          // Figma 970:33879 (Telugu) has no row for this — English-only, per 924:21411.
          { benefitLabel: t("Healthy Blood Sugar", "ఆరోగ్యకరమైన రక్తంలో చక్కెర అందిస్తుంది"), iconKey: "sugar-cubes", visibleLanguages: ["English"] },
          { benefitLabel: t("Healthy Metabolism", "Metabolism ని పెంచుతుంది"), iconKey: "healthy-eating" },
        ] },
      ],
      groceryListAvailable: true,
    },
    breakfast: {
      name: t("Green Moong Dosa & Peanut Chutney", "పెసర దోసె & వేరుశెనగ చట్నీ"),
      imageUrl: imgGreenMoongDosaPeanutChutney,
      tips: t(
        "Soak green gram, grind into a batter, prepare dosa, and serve with peanut chutney.",
        "పెసలను నానబెట్టి batter తయారు చేసి దోసె వేసి, వేరుశెనగ చట్నీతో తినండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Green Gram", "పెసలు"), benefits: [
          { benefitLabel: t("Protein-Rich", "Protein ఎక్కువగా ఉంటుంది"), iconKey: "muscle-health" },
          { benefitLabel: t("Better Digestion", "Digestion కి support చేస్తుంది"), iconKey: "stomach" },
        ] },
        { ingredient: t("Peanuts", "వేరుశెనగ"), benefits: [{ benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" }] },
      ],
      groceryListAvailable: true,
    },
    morningSnack: {
      name: same("Apple"),
      imageUrl: imgApple,
      items: [{ label: same("1 Apple") }],
      precautions: t(
        "For people with Diabetes, limit the portion to ½ an apple per serving.",
        "Diabetes: ½ Apple మాత్రమే."
      ),
      nutritionalBenefits: [
        { ingredient: same("Apple"), benefits: [
          { benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" },
          { benefitLabel: t("Better Digestion", "Digestion కి support చేస్తుంది"), iconKey: "stomach" },
          { benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" },
        ] },
      ],
      recommendedQuantity: [{ ingredient: same("Apple"), qty: same("1") }],
      groceryListAvailable: true,
    },
    lunch: {
      name: t("Chapati & Palak Paneer", "చపాతీ & palak paneer"),
      imageUrl: imgChapatiPalakPaneer,
      tips: t(
        "Cook spinach, blend into a puree, sauté with spices, and add paneer cubes.",
        "పాలకూరను ఉడికించి puree చేసి, మసాలాలతో వేయించి పనీర్ cubes కలపండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Chapati", "చపాతీ"), benefits: [{ benefitLabel: t("Sustained Energy", "ఎక్కువసేపు energy ని ఇస్తుంది"), iconKey: "lightning-bolt" }] },
        { ingredient: t("Spinach", "పాలకూర"), benefits: [{ benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" }] },
        { ingredient: t("Paneer", "పనీర్"), benefits: [{ benefitLabel: t("Muscle Health", "Muscle strength ని పెంచుతుంది"), iconKey: "muscle-health" }] },
      ],
      groceryListAvailable: true,
    },
    eveningSnack: {
      name: t("Boiled Sweet Potato", "ఉడికించిన చిలగడదుంప"),
      imageUrl: imgBoiledSweetPotato,
      tips: t(
        "Boil the sweet potato until soft, peel, and sprinkle with pepper or jeera.",
        "చిలగడదుంపను ఉడికించి తొక్క తీసి, మిరియాల పొడి లేదా జీలకర్ర పొడి చల్లి తినండి."
      ),
      precautions: t(
        "For People with Diabetes, practice portion control due to its moderate to high glycemic index.",
        "Diabetes: Limit గా తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Sweet Potato", "చిలగడదుంప"), benefits: [
          { benefitLabel: t("Sustained Energy", "ఎక్కువసేపు energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
          { benefitLabel: t("Better Digestion", "Digestion support ని ఇస్తుంది"), iconKey: "stomach" },
        ] },
      ],
      groceryListAvailable: true,
    },
    dinner: {
      name: t("Mushroom & Peas Roll", "మష్రూమ్ బఠానీ roll"),
      imageUrl: imgMushroomPeasRoll,
      tips: t(
        "Sauté mushrooms and peas, fill into a chapati, and roll before serving.",
        "మష్రూమ్ & బఠానీని వేయించి చపాతీలో పెట్టి roll చేసి తినండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Mushroom", "మష్రూమ్"), benefits: [
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
          // Figma 970:33879 (Telugu) has no row for this — English-only, per 924:21411.
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food", visibleLanguages: ["English"] },
        ] },
        { ingredient: t("Peas", "బఠానీ"), benefits: [{ benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" }] },
      ],
      groceryListAvailable: true,
    },
    nightDrink: {
      name: t("Ginger Jeera Tea", "అల్లం జీలకర్ర టీ"),
      imageUrl: imgGingerJeeraTea,
      tips: t(
        "Boil ginger and jeera in water for 5 minutes, strain, and drink warm.",
        "అల్లం & జీలకర్రను నీటిలో 5 నిమిషాలు మరిగించి, strain చేసి గోరువెచ్చగా తాగండి."
      ),
      nutritionalBenefits: [{ ingredient: t("Ginger & Jeera", "అల్లం & జీలకర్ర"), benefits: [{ benefitLabel: t("Better Digestion", "Digestion కి support చేస్తుంది"), iconKey: "stomach" }] }],
      groceryListAvailable: true,
    },
  },
  "2026-08-06": {
    earlyMorning: {
      name: t("Sesame & Flax Seeds", "నువ్వులు & అవిసె గింజలు"),
      imageUrl: imgSesameFlaxSeeds,
      items: [{ label: t("1 tbsp total", "1tbsp") }],
      tips: t(
        "Lightly roast and powder the sesame and flax seeds before consuming.",
        "నువ్వులు & అవిసె గింజలను రాత్రంతా soak చేసి తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Sesame Seeds", "నువ్వులు"), benefits: [{ benefitLabel: t("Bone Health", "Bone health కి మంచిది"), iconKey: "dog-bone" }] },
        { ingredient: t("Flax Seeds", "అవిసె గింజలు"), benefits: [{ benefitLabel: t("Heart Health", "Heart health కి మంచిది"), iconKey: "heart" }] },
      ],
      recommendedQuantity: [{ ingredient: t("Total Quantity", "Total"), qty: same("1 tbsp") }],
      groceryListAvailable: true,
    },
    postYogaDrink: {
      name: t("Soaked Chia Seeds & Amla Water", "నానబెట్టిన Chia seeds & Amla water"),
      imageUrl: imgSoakedChiaSeedsAmlaWater,
      items: [{ label: same("1 tbsp chia seeds") }, { label: same("1 small glass amla water") }],
      tips: t(
        "Soak the chia seeds for 30 minutes to overnight before drinking with amla water.",
        "చియా గింజలను 30 నిమిషాల నుంచి రాత్రంతా నానబెట్టి, ఉసిరి నీటితో తాగండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Chia Seeds", "చియా గింజలు"), benefits: [
          { benefitLabel: t("Better Digestion", "Digestion కి support చేస్తుంది"), iconKey: "stomach" },
          { benefitLabel: t("Hydration", "Body న్ని Hydrated గా ఉంచుతుంది"), iconKey: "water" },
        ] },
        { ingredient: t("Amla", "ఉసిరి"), benefits: [{ benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" }] },
      ],
      recommendedQuantity: [
        { ingredient: t("Chia Seeds", "Chia seeds"), qty: same("1 tbsp") },
        { ingredient: same("Amla Water"), qty: same("1 small glass") },
      ],
      groceryListAvailable: true,
    },
    breakfast: {
      name: t("Paneer Dosa & Vegetable Sambar", "పనీర్ దోసె & vegetable సాంబార్"),
      imageUrl: imgPaneerDosaVegetableSambar,
      tips: t(
        "Spread dosa batter, add grated paneer, cook until golden, and serve with vegetable sambar.",
        "దోసె batter వేసి, తురిమిన పనీర్ వేసి, రెండు వైపులా కాల్చి వెజిటేబుల్ సాంబార్‌తో తినండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Paneer", "పనీర్"), benefits: [{ benefitLabel: t("Muscle Health", "Muscle strength ని పెంచుతుంది"), iconKey: "muscle-health" }] },
        { ingredient: t("Dosa", "దోసె"), benefits: [{ benefitLabel: t("Better Digestion", "Digestion కు support ఇస్తుంది"), iconKey: "stomach" }] },
        { ingredient: t("Sambar", "సాంబార్"), benefits: [
          { benefitLabel: t("Protein-Rich", "Protein ఎక్కువగా ఉంటుంది"), iconKey: "muscle-health" },
          { benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" },
        ] },
      ],
      groceryListAvailable: true,
    },
    morningSnack: {
      name: t("Guava", "జామపండు"),
      imageUrl: imgGuava,
      items: [{ label: same("1 Medium Fruit") }],
      precautions: t(
        "For people with Diabetes, consume 1/2 guava per serving. Avoid adding salt or sugar.",
        "Diabetes: ½ జామపండు మాత్రమే. salt/sugar వద్దు."
      ),
      nutritionalBenefits: [
        { ingredient: t("Guava", "జామపండు"), benefits: [
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
          { benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" },
          // Figma 970:34451 (Telugu) has no row for these two — English-only, per 924:21411,
          // same as the other Guava dates.
          { benefitLabel: t("Healthy Blood Sugar", "ఆరోగ్యకరమైన రక్తంలో చక్కెర అందిస్తుంది"), iconKey: "sugar-cubes", visibleLanguages: ["English"] },
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food", visibleLanguages: ["English"] },
          { benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" },
        ] },
      ],
      recommendedQuantity: [{ ingredient: t("Guava", "జామపండు"), qty: same("1") }],
      groceryListAvailable: true,
    },
    lunch: {
      name: t("Ragi Mudda & Vegetable Sambar", "రాగి సంకటి & vegetable సాంబార్"),
      imageUrl: imgRagiMuddaVegetableSambar,
      tips: t(
        "Cook ragi flour in boiling water, shape into balls (sankati/mudde), and serve with hot sambar.",
        "రాగి పిండిని మరిగే నీటిలో ఉడికించి సంకటి చేసి, వేడి సాంబార్‌తో తినండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Ragi", "రాగి"), benefits: [{ benefitLabel: t("Bone Health", "Bone health కి మంచిది"), iconKey: "dog-bone" }] },
        { ingredient: t("Sambar", "సాంబార్"), benefits: [
          { benefitLabel: t("Protein-Rich", "Protein ఎక్కువగా ఉంటుంది"), iconKey: "muscle-health" },
          { benefitLabel: t("Better Digestion", "Gut health కి మంచిది"), iconKey: "stomach" },
        ] },
      ],
      groceryListAvailable: true,
    },
    eveningSnack: {
      name: t("Peanut Chikki", "Peanut chikki"),
      imageUrl: imgPeanutChikki,
      tips: t(
        "Melt jaggery, mix with roasted peanuts, spread the mixture, and cut into pieces once set.",
        "బెల్లం కరిగించి, roast చేసిన వేరుశెనగ కలిపి, చల్లారిన తర్వాత ముక్కలుగా కట్ చేయండి."
      ),
      precautions: t(
        "For People with Diabetes, limit the portion due to the high sugar content.",
        "Diabetes: limit గా తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Peanuts", "వేరుశెనగ"), benefits: [{ benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" }] },
        { ingredient: t("Jaggery", "బెల్లం"), benefits: [{ benefitLabel: t("Energy", "ఎక్కువసేపు energy ని ఇస్తుంది"), iconKey: "lightning-bolt" }] },
      ],
      groceryListAvailable: true,
    },
    dinner: {
      name: t("Coconut Rice Bowl & Capsicum Raita", "Coconut rice & capsicum రైతా"),
      imageUrl: imgCoconutRiceBowlCapsicumRaita,
      tips: t(
        "Mix grated coconut with cooked rice and prepare raita with capsicum and curd.",
        "ఉడికిన అన్నంలో తురిమిన కొబ్బరి కలపండి. క్యాప్సికం & పెరుగుతో రైతా తయారు చేయండి."
      ),
      precautions: t(
        "For People with Diabetes, practice portion control with rice.",
        "Diabetes: Rice limit గా తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Rice", "అన్నం"), benefits: [{ benefitLabel: t("Energy", "ఎక్కువసేపు energy ని ఇస్తుంది"), iconKey: "lightning-bolt" }] },
        { ingredient: t("Coconut", "కొబ్బరి"), benefits: [{ benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" }] },
        // Figma 970:34451 (Telugu) has no card for Capsicum (only Rice, Coconut, Curd) —
        // English-only, per 924:21411.
        { ingredient: t("Capsicum", "క్యాప్సికం"), benefits: [{ benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food" }], visibleLanguages: ["English"] },
        { ingredient: t("Curd", "పెరుగు"), benefits: [{ benefitLabel: t("Better Digestion", "Digestion కి support చేస్తుంది"), iconKey: "stomach" }] },
      ],
      groceryListAvailable: true,
    },
    nightDrink: {
      name: t("Fennel Tea", "సోంపు టీ"),
      imageUrl: imgFennelTea,
      tips: t(
        "Boil fennel seeds in water for 5 minutes, strain, and drink warm.",
        "సోంపును నీటిలో 5 నిమిషాలు మరిగించి, strain చేసి గోరువెచ్చగా తాగండి."
      ),
      nutritionalBenefits: [{ ingredient: t("Fennel Tea", "సోంపు టీ"), benefits: [{ benefitLabel: t("Better Digestion", "Digestion కి support చేస్తుంది"), iconKey: "stomach" }] }],
      groceryListAvailable: true,
    },
  },
  "2026-08-07": {
    earlyMorning: {
      name: t("Soaked Almonds & Black Raisins", "నానబెట్టిన బాదం & నల్ల కిస్‌మిస్"),
      imageUrl: imgSoakedAlmondsBlackRaisins,
      items: [{ label: t("4 Almonds", "4 బాదం") }, { label: t("4 Black Raisins", "4 నల్ల కిస్‌మిస్") }],
      tips: t(
        "Soak 4 almonds and 4 black raisins overnight and eat them in the morning.",
        "4 బాదం & 4 నల్ల కిస్‌మిస్ రాత్రంతా నానబెట్టి, ఉదయం తినండి."
      ),
      precautions: t(
        "For people with Diabetes, limit the quantity of raisins due to their high sugar content.",
        "Diabetes: కిస్‌మిస్ limit గా తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Almonds", "బాదం"), benefits: [
          { benefitLabel: t("Brain Health", "Brain కి మంచిది"), iconKey: "brain-health" },
          { benefitLabel: t("Healthy Skin", "Skin కు మంచిది"), iconKey: "healthy-skin" },
        ] },
        { ingredient: t("Black Raisins", "నల్ల కిస్‌మిస్"), benefits: [
          { benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" },
          { benefitLabel: t("Energy", "Energy ఇస్తుంది"), iconKey: "lightning-bolt" },
        ] },
      ],
      recommendedQuantity: [
        { ingredient: t("Almonds", "బాదం"), qty: same("4 pcs") },
        { ingredient: t("Black Raisins", "నల్ల కిస్‌మిస్"), qty: same("4 pcs") },
      ],
      groceryListAvailable: true,
    },
    postYogaDrink: {
      name: t("Tender Coconut Water", "కొబ్బరి నీరు"),
      imageUrl: imgTenderCoconutWater,
      precautions: t(
        "For people with Diabetes, limit the quantity as coconut water contains natural sugars.",
        "Diabetes: కొబ్బరి నీరు limit గా తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Coconut Water", "కొబ్బరి నీరు"), benefits: [
          { benefitLabel: t("Energy", "Energy ఇస్తుంది"), iconKey: "lightning-bolt" },
          { benefitLabel: t("Hydration", "Body ని Hydrated గా ఉంచుతుంది"), iconKey: "water" },
        ] },
      ],
      groceryListAvailable: true,
    },
    breakfast: {
      name: t("Godhuma Ravva Upma with Peanuts", "Peanuts తో గోధుమ రవ్వ ఉప్మా"),
      imageUrl: imgGodhumaRavvaUpmaPeanuts,
      tips: t(
        "Roast the broken wheat (godhuma ravva), then cook with sautéed vegetables and peanuts until soft.",
        "గోధుమ రవ్వను roast చేసి, కూరగాయలు & వేరుశెనగతో ఉడికించండి."
      ),
      precautions: t(
        "For people with Diabetes, practice portion control due to its moderate glycemic index.",
        "Diabetes: limit గా తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Broken Wheat (Godhuma Ravva)", "గోధుమ రవ్వ"), benefits: [
          { benefitLabel: t("Sustained Energy", "Energy ఇస్తుంది"), iconKey: "lightning-bolt" },
          { benefitLabel: t("Better Digestion", "Digestion కి support చేస్తుంది"), iconKey: "stomach" },
        ] },
        { ingredient: t("Peanuts", "వేరుశెనగ"), benefits: [{ benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" }] },
      ],
      groceryListAvailable: true,
    },
    morningSnack: {
      name: t("Guava", "జామపండు"),
      imageUrl: imgGuava,
      items: [{ label: same("1 Medium Fruit") }],
      precautions: t(
        "For people with Diabetes, consume 1/2 guava per serving. Avoid adding salt or sugar.",
        "Diabetes: ½ జామపండు మాత్రమే. salt/sugar వద్దు."
      ),
      nutritionalBenefits: [
        { ingredient: t("Guava", "జామపండు"), benefits: [
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
          { benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" },
          // Figma 970:35060 (Telugu) has no row for these two — English-only, per 924:21411,
          // same as the other Guava dates.
          { benefitLabel: t("Healthy Blood Sugar", "ఆరోగ్యకరమైన రక్తంలో చక్కెర అందిస్తుంది"), iconKey: "sugar-cubes", visibleLanguages: ["English"] },
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food", visibleLanguages: ["English"] },
          { benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" },
        ] },
      ],
      recommendedQuantity: [{ ingredient: t("Guava", "జామపండు"), qty: same("1") }],
      groceryListAvailable: true,
    },
    lunch: {
      name: t("Steamed Rice, Leafy Dal, Ivy Gourd (Kundru) Curry & Curd", "అన్నం, ఆకుకూర పప్పు, దొండకాయ కూర & పెరుగు"),
      imageUrl: imgSteamedRiceLeafyDalIvyGourdKundruCurryCurd,
      tips: t(
        "Cook dal with gongura, sauté ivy gourd (dondakaya) separately, and serve with rice and curd.",
        "గోంగూర పప్పు తయారు చేసి, దొండకాయ కూరతో పాటు అన్నం & పెరుగుతో తినండి."
      ),
      precautions: t(
        "For people with Diabetes, practice portion control with white rice.",
        "Diabetes: White rice limit గా తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Rice", "అన్నం"), benefits: [{ benefitLabel: t("Energy", "Energy ఇస్తుంది"), iconKey: "lightning-bolt" }] },
        { ingredient: t("Gongura", "గోంగూర"), benefits: [
          { benefitLabel: t("Better Digestion", "Digestion కి support చేస్తుంది"), iconKey: "stomach" },
          // Figma 970:35060 (Telugu) has no row for this — English-only, per 924:21411.
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food", visibleLanguages: ["English"] },
        ] },
        { ingredient: t("Dal", "పప్పు"), benefits: [{ benefitLabel: t("Muscle Health", "Muscle strength కి మంచిది"), iconKey: "muscle-health" }] },
        { ingredient: t("Curd", "పెరుగు"), benefits: [{ benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" }] },
      ],
      groceryListAvailable: true,
    },
    eveningSnack: {
      name: t("Paneer Cubes & Pepper", "పనీర్ pepper cubes"),
      imageUrl: imgPaneerCubesPepper,
      tips: t(
        "Cut paneer into cubes, sprinkle with pepper, and lightly sauté or serve fresh.",
        "పనీర్‌ను cubes గా కట్ చేసి, మిరియాల పొడి చల్లి sauté చేసి లేదా అలాగే తినండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Paneer", "పనీర్"), benefits: [
          { benefitLabel: t("Muscle Health", "Muscle strength కి మంచిది"), iconKey: "muscle-health" },
          { benefitLabel: t("Bone Health", "Bone health కి మంచిది"), iconKey: "dog-bone" },
        ] },
        { ingredient: t("Pepper", "మిరియాలు"), benefits: [{ benefitLabel: t("Better Digestion", "Digestion కి support చేస్తుంది"), iconKey: "stomach" }] },
      ],
      groceryListAvailable: true,
    },
    dinner: {
      name: t("Cucumber & Capsicum Curd Bowl", "పెరుగు తో keera దోసకాయ & capsicum"),
      imageUrl: imgCucumberCapsicumCurdBowl,
      tips: t(
        "Mix chopped cucumber and capsicum into curd, then add pepper and salt.",
        "పెరుగులో keera దోసకాయ & capsicum ముక్కలు వేసి, మిరియాల పొడి & ఉప్పు కలపండి."
      ),
      precautions: t(
        "For People with Thyroid Concerns, avoid consuming this at night if sensitive.",
        "Thyroid: రాత్రి తీసుకోవద్దు."
      ),
      nutritionalBenefits: [
        { ingredient: t("Cucumber", "కీర దోసకాయ"), benefits: [
          { benefitLabel: t("Hydration", "Body ని Hydrated గా ఉంచుతుంది"), iconKey: "water" },
          // Figma 970:35060 (Telugu) has no row for this — English-only, per 924:21411.
          { benefitLabel: t("Cooling", "శరీరానికి Cooling అందిస్తుంది"), iconKey: "snowflake", visibleLanguages: ["English"] },
        ] },
        // Figma 970:35060 (Telugu) has no card for Capsicum (only Cucumber and Curd) —
        // English-only, per 924:21411.
        { ingredient: t("Capsicum", "క్యాప్సికం"), benefits: [{ benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food" }], visibleLanguages: ["English"] },
        { ingredient: t("Curd", "పెరుగు"), benefits: [{ benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" }] },
      ],
      groceryListAvailable: true,
    },
    nightDrink: {
      name: t("Coriander Seed Tea", "ధనియాల టీ"),
      imageUrl: imgCorianderSeedTea,
      tips: t(
        "Boil coriander seeds in water for 5–7 minutes, strain, and drink warm.",
        "ధనియాలను నీటిలో 5–7 నిమిషాలు మరిగించి, strain చేసి గోరువెచ్చగా తాగండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Coriander Seed Tea", "ధనియాల టీ"), benefits: [
          { benefitLabel: t("Better Digestion", "Digestion కి support చేస్తుంది"), iconKey: "stomach" },
          // Figma 970:35060 (Telugu) has no row for this — English-only, per 924:21411.
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food", visibleLanguages: ["English"] },
        ] },
      ],
      groceryListAvailable: true,
    },
  },
  "2026-08-08": {
    earlyMorning: {
      name: t("Soaked Chia & Flax Seeds", "నానబెట్టిన chia seeds & అవిసె గింజలు"),
      imageUrl: imgSoakedChiaFlaxSeeds,
      items: [{ label: t("1 tbsp total", "Total - 1tbsp") }],
      tips: t(
        "Soak the chia seeds, and lightly roast and powder the flax seeds before consuming.",
        "Chia గింజలను, అవిసె గింజలను నానబెట్టి, తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Chia Seeds", "చియా గింజలు"), benefits: [
          { benefitLabel: t("Better Digestion", "Digestion కి support చేస్తుంది"), iconKey: "stomach" },
          { benefitLabel: t("Hydration", "Body ని Hydrated గా ఉంచుతుంది"), iconKey: "water" },
        ] },
        { ingredient: t("Flax Seeds", "అవిసె గింజలు"), benefits: [
          { benefitLabel: t("Heart Health", "Heart health కి మంచిది"), iconKey: "heart" },
          { benefitLabel: t("Sustained Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
        ] },
      ],
      recommendedQuantity: [{ ingredient: same("Total"), qty: same("1 tbsp") }],
      groceryListAvailable: true,
    },
    postYogaDrink: {
      name: t("Tender Coconut Water", "కొబ్బరి నీరు"),
      imageUrl: imgTenderCoconutWater,
      precautions: t(
        "For people with Diabetes, limit the quantity as coconut water contains natural sugars.",
        "Diabetes: కొబ్బరి నీరు limit గా తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Coconut Water", "కొబ్బరి నీరు"), benefits: [
          { benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
          { benefitLabel: t("Hydration", "Body ని Hydrated గా ఉంచుతుంది"), iconKey: "water" },
        ] },
      ],
      groceryListAvailable: true,
    },
    breakfast: {
      name: t("Vegetable Poha & Peanuts", "Vegetable Peanuts Poha"),
      imageUrl: imgVegetablePohaPeanuts,
      tips: t(
        "Sauté vegetables, add soaked poha and peanuts, then mix and cook until soft.",
        "కూరగాయలను sauté చేసి, నానబెట్టిన అటుకులు & వేరుశెనగ వేసి మెత్తగా అయ్యే వరకు ఉడికించండి."
      ),
      precautions: t(
        "For people with Diabetes, practice portion control due to its moderate to high glycemic index.",
        "Diabetes: Limit గా తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Poha", "అటుకులు"), benefits: [
          { benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
          { benefitLabel: t("Better Digestion", "Digestion కి support చేస్తుంది"), iconKey: "stomach" },
        ] },
        { ingredient: t("Peanuts", "వేరుశెనగ"), benefits: [{ benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" }] },
        { ingredient: t("Vegetables", "కూరగాయలు"), benefits: [{ benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" }] },
      ],
      groceryListAvailable: true,
    },
    morningSnack: {
      name: same("Apple"),
      imageUrl: imgApple,
      items: [{ label: same("1 Apple") }],
      precautions: t(
        "For people with Diabetes, consume 1 medium apple. Pair it with few nuts or seeds for better blood sugar balance.",
        "Diabetes: 1 Apple తో నట్స్/సీడ్స్ తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: same("Apple"), benefits: [
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
          { benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" },
          { benefitLabel: t("Heart Health", "Heart health కి మంచిది"), iconKey: "heart" },
          // Figma 970:35696 (Telugu) has no row for this — English-only, per 964:30250.
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food", visibleLanguages: ["English"] },
        ] },
      ],
      recommendedQuantity: [{ ingredient: same("Apple"), qty: same("1") }],
      groceryListAvailable: true,
    },
    lunch: {
      name: t("Rice, Mixed Dal Curry & Cucumber Boiled Peanut Salad", "అన్నం, mixed పప్పు & దోసకాయ వేరుశెనగ salad"),
      imageUrl: imgRiceMixedDalCurryCucumberBoiledPeanutSalad,
      tips: t(
        "Cook mixed dal with spices, and prepare a salad with boiled peanuts and cucumber.",
        "Mixed పప్పు ఉడికించి, ఉడికించిన వేరుశెనగ & దోసకాయతో salad చేయండి."
      ),
      precautions: t(
        "For People with Diabetes, practice portion control with white rice.",
        "Diabetes: white rice limit గా తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Rice", "అన్నం"), benefits: [{ benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" }] },
        { ingredient: t("Mixed Dal", "పప్పు"), benefits: [{ benefitLabel: t("Muscle Health", "Muscle strength కి మంచిది"), iconKey: "muscle-health" }] },
        { ingredient: t("Peanuts", "వేరుశెనగ"), benefits: [{ benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" }] },
        { ingredient: t("Cucumber", "కీర దోసకాయ"), benefits: [
          { benefitLabel: t("Hydration", "Body ని Hydrated గా ఉంచుతుంది"), iconKey: "water" },
          // Figma 970:35696 (Telugu) has no row for this — English-only, per 964:30250.
          { benefitLabel: t("Cooling", "శరీరానికి Cooling అందిస్తుంది"), iconKey: "snowflake", visibleLanguages: ["English"] },
        ] },
      ],
      groceryListAvailable: true,
    },
    eveningSnack: {
      name: t("Corn Pakoda", "Corn పకోడీ"),
      imageUrl: imgCornPakoda,
      tips: t(
        "Mix boiled corn with besan, onion, and spices, shape loosely, and shallow fry until crisp.",
        "ఉడికించిన మొక్కజొన్నలో శెనగపిండి, ఉల్లిపాయ & మసాలాలు కలిపి, టిక్కీలుగా చేసి shallow fry చేయండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Corn", "మొక్కజొన్న"), benefits: [
          { benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
          // Figma 970:35696 (Telugu) has no row for this — English-only, per 964:30250.
          { benefitLabel: t("Better Digestion", "Digestion కి support చేస్తుంది"), iconKey: "stomach", visibleLanguages: ["English"] },
        ] },
        { ingredient: t("Besan", "శెనగపిండి"), benefits: [{ benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" }] },
        { ingredient: t("Spices", "మసాలాలు"), benefits: [{ benefitLabel: t("Better Digestion", "Digestion కి support చేస్తుంది"), iconKey: "stomach" }] },
      ],
      groceryListAvailable: true,
    },
    dinner: {
      name: t("Spinach Cheela & Tomato Chutney", "పాలకూర చీలా & టమాటా చట్నీ"),
      imageUrl: imgSpinachCheelaTomatoChutney,
      tips: t(
        "Blend spinach into the moong batter, cook like a dosa, and serve with chutney.",
        "పెసర పిండిలో పాలకూర blend చేసి, దోసెలా వేసి చట్నీతో తినండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Moong Batter", "పెసర పిండి"), benefits: [
          { benefitLabel: t("Protein-Rich", "Protein ఎక్కువ ఉంటుంది"), iconKey: "muscle-health" },
          { benefitLabel: t("Better Digestion", "Digestion కి support చేస్తుంది"), iconKey: "stomach" },
        ] },
        { ingredient: t("Spinach", "పాలకూర"), benefits: [{ benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" }] },
      ],
      groceryListAvailable: true,
    },
    nightDrink: {
      name: t("Ajwain Tea", "వాము టీ"),
      imageUrl: imgAjwainTea,
      tips: t(
        "Boil ajwain in water for 5 minutes, strain, and drink warm.",
        "వాము నీటిలో 5 నిమిషాలు మరిగించి, strain చేసి గోరువెచ్చగా తాగండి."
      ),
      nutritionalBenefits: [{ ingredient: t("Ajwain Tea", "వాము టీ"), benefits: [{ benefitLabel: t("Better Digestion", "Digestion కి support చేస్తుంది"), iconKey: "stomach" }] }],
      groceryListAvailable: true,
    },
  },
  // 2026-08-09: the Figma design only has 7 meal cards — there is no postYogaDrink card
  // at all that day (see OMITTED_SLOTS_BY_DATE below, which drops it from the resolved
  // plan entirely rather than falling back to the generic sheet layer).
  "2026-08-09": {
    earlyMorning: {
      name: t("Soaked Pistachios & Gold Raisins", "నానబెట్టిన పిస్తా & gold కిస్‌మిస్"),
      imageUrl: imgSoakedPistachiosGoldRaisins,
      items: [{ label: t("3 Pistachios", "3 పిస్తా") }, { label: t("5 Gold Raisins", "5 gold కిస్‌మిస్") }],
      tips: t(
        "Soak 3 pistachios and 5 raisins overnight and eat them in the morning.",
        "3 పిస్తా & 5 కిస్‌మిస్ రాత్రంతా నానబెట్టి, ఉదయం తినండి."
      ),
      precautions: t(
        "For people with Diabetes, limit the quantity of raisins due to their high sugar content.",
        "Diabetes: కిస్‌మిస్ limit గా తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Raisins", "నానబెట్టిన కిస్‌మిస్"), benefits: [
          { benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
          { benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" },
        ] },
        { ingredient: t("Pistachios", "పిస్తా"), benefits: [{ benefitLabel: t("Heart Health", "Heart health కి మంచిది"), iconKey: "heart" }] },
      ],
      recommendedQuantity: [
        { ingredient: t("Soaked Pistachios", "నానబెట్టిన పిస్తా"), qty: same("3 pcs") },
        { ingredient: t("Soaked Raisins", "నానబెట్టిన కిస్‌మిస్"), qty: same("5 pcs") },
      ],
      groceryListAvailable: true,
    },
    breakfast: {
      name: t("Ragi Malt with Nuts & Seeds", "Nuts & seeds తో రాగి malt"),
      imageUrl: imgRagiMaltWithNutsSeeds,
      // Figma shows "06:30AM - 09:30AM" here, not the usual "07:30AM - 09:30AM" — this
      // date has no separate Post Yoga Drink card, so Breakfast's card visually absorbs
      // that slot's start time.
      timeRangeLabel: "06:30AM - 09:30AM",
      // NOTE: the Telugu Figma tips text (970:46335) cuts off mid-sentence ("...చివర్లో")
      // — transcribed as-authored, not completed/guessed.
      tips: t(
        "Cook ragi flour in water or milk, stir continuously, and top with crushed nuts and seeds.",
        "రాగి పిండిని నీరు లేదా పాలలో ఉడికించి, బాగా కలుపుతూ చివర్లో"
      ),
      nutritionalBenefits: [
        { ingredient: t("Ragi", "రాగి"), benefits: [{ benefitLabel: t("Bone Health", "Bone health కి మంచిది"), iconKey: "dog-bone" }] },
        { ingredient: t("Nuts & Seeds", "నట్స్ & సీడ్స్"), benefits: [{ benefitLabel: t("Sustained Energy", "ఎక్కువసేపు energy ని ఇస్తుంది"), iconKey: "lightning-bolt" }] },
      ],
      groceryListAvailable: true,
    },
    morningSnack: {
      name: t("Pineapple", "అనాస పండు"),
      imageUrl: imgPineapple,
      items: [{ label: t("1 small cup (100gms)", "Small cup (100 gms)") }],
      precautions: t(
        "For people with Diabetes, limit the quantity to 60 - 70 gms per serving",
        "Diabetes: 60- 70 gms మాత్రమే."
      ),
      nutritionalBenefits: [
        { ingredient: t("Pineapple", "అనాస పండు"), benefits: [
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
          { benefitLabel: t("Better Digestion", "Digestion కి support చేస్తుంది"), iconKey: "stomach" },
          // Figma 978:45985 (Telugu) has no row for this — English-only, per 977:44974.
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food", visibleLanguages: ["English"] },
        ] },
      ],
      recommendedQuantity: [{ ingredient: t("Pineapple", "అనాస పండు"), qty: t("1 small cup (100gms)", "1 small cup (100gms)") }],
      groceryListAvailable: true,
    },
    lunch: {
      name: t("Rice, Carrot Tomato Rasam, French Beans & Coconut Curry", "అన్నం, క్యారెట్ టమాటా రసం, బీన్స్ కొబ్బరి కూర"),
      imageUrl: imgRiceCarrotTomatoRasamFrenchBeansCoconutCurry,
      tips: t(
        "Prepare rasam with tomato and carrot, and sauté beans with coconut and spices.",
        "టమాటా & క్యారెట్‌తో రసం తయారు చేసి, బీన్స్‌ను కొబ్బరి & మసాలాలతో వేపండి."
      ),
      precautions: t(
        "For People with Diabetes, practice portion control with white rice.",
        "Diabetes: White rice limit గా తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Rice", "అన్నం"), benefits: [{ benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" }] },
        { ingredient: t("Rasam", "రసం"), benefits: [{ benefitLabel: t("Better Digestion", "Digestion కి support చేస్తుంది"), iconKey: "stomach" }] },
        { ingredient: t("Beans", "బీన్స్"), benefits: [{ benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" }] },
        { ingredient: t("Coconut", "కొబ్బరి"), benefits: [{ benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" }] },
      ],
      groceryListAvailable: true,
    },
    eveningSnack: {
      name: t("Makhana Kaju Nuts Ice Cream (Home-made)", "ఇంట్లో తయారుచేసిన మఖానా జీడిపప్పు ice cream"),
      imageUrl: imgMakhanaKajuNutsIceCream,
      tips: t(
        "Blend soaked makhana, cashews, and milk, then freeze until set.",
        "నానబెట్టిన మఖానా, జీడిపప్పు & పాలను blend చేసి, set అయ్యే వరకు freeze చేయండి."
      ),
      precautions: t(
        "For People with Diabetes, limit the portion as it contains natural sugars.",
        "Diabetes: limit గా తీసుకోండి. (one scoop)"
      ),
      nutritionalBenefits: [
        { ingredient: t("Cashews", "జీడిపప్పు"), benefits: [{ benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" }] },
        { ingredient: t("Makhana", "మఖానా"), benefits: [{ benefitLabel: t("Bone Health", "Bone health కి మంచిది"), iconKey: "dog-bone" }] },
      ],
      groceryListAvailable: true,
    },
    dinner: {
      name: t("Mixed Vegetable Uttappam & Tomato Chutney", "Mixed vegetable ఉత్తప్పం & టమాటా చట్నీ"),
      imageUrl: imgMixedVegetableUttappamTomatoChutney,
      tips: t(
        "Pour the batter thick, add vegetables on top, cook both sides, and serve with chutney.",
        "Batter ని మందంగా పోసి, పైపైగా కూరగాయలు వేసి రెండు వైపులా కాల్చి చట్నీతో తినండి."
      ),
      precautions: t(
        "For People with Diabetes, practice portion control as uttappam has a moderate glycemic index (GI).",
        "Diabetes: 2 small ఉత్తప్పం తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Uttappam", "ఉత్తప్పం"), benefits: [{ benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" }] },
        { ingredient: t("Vegetables", "కూరగాయలు"), benefits: [{ benefitLabel: t("Better Digestion", "Digestion కి support చేస్తుంది"), iconKey: "stomach" }] },
        // Figma 978:45985 (Telugu) has no row for this — English-only, per 977:44974.
        { ingredient: t("Tomato", "టమాటా"), benefits: [{ benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food" }], visibleLanguages: ["English"] },
      ],
      groceryListAvailable: true,
    },
    nightDrink: {
      name: t("Tulasi Tea", "తులసి టీ"),
      imageUrl: imgTulasiTea,
      tips: t(
        "Boil tulasi leaves in water for 5 minutes, strain, and drink warm.",
        "తులసి ఆకులను నీటిలో 5 నిమిషాలు మరిగించి, strain చేసి గోరువెచ్చగా తాగండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Tulasi Tea", "తులసి టీ"), benefits: [
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
          { benefitLabel: t("Relaxation", "Body & mind ని relax చేస్తుంది"), iconKey: "meditation" },
          // Figma 978:45985 (Telugu) has no row for this — English-only, per 977:44974.
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food", visibleLanguages: ["English"] },
        ] },
      ],
      groceryListAvailable: true,
    },
  },
};

/**
 * Slots that don't exist at all for a given date — the Figma design has no card for
 * them, so `getResolvedDayPlan` must drop them from the resolved meal list rather than
 * falling back to the generic sheet layer (which would render a card the design never
 * shows). 2026-08-09 has only 7 meal cards: postYogaDrink has no distinct card that day.
 */
export const OMITTED_SLOTS_BY_DATE: Partial<Record<string, MealSlotId[]>> = {
  "2026-08-09": ["postYogaDrink"],
};
