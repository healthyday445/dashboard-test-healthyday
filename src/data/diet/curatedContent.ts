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
// 2026-08-10 (English only — no Telugu Figma screen yet, see `pending`)
import imgSoakedAlmondsRaisins from "@/assets/diet/soaked-almonds-raisins.webp";
import imgSoakedChiaSeedsWater from "@/assets/diet/soaked-chia-seeds-water.webp";
import imgMoongDalChillaCoconutChutney from "@/assets/diet/moong-dal-chilla-coconut-chutney.webp";
import imgSteamedRiceMethiDalLadiesFingerCurryCurd from "@/assets/diet/steamed-rice-methi-dal-ladies-finger-curry-curd.webp";
import imgTomatoVegetableSoup from "@/assets/diet/tomato-vegetable-soup.webp";
import imgVegetableUpmaCarrotBeans from "@/assets/diet/vegetable-upma-carrot-beans.webp";
// 2026-08-11 — both languages (Figma 1331:15937 English, 1398:33989 Telugu)
import imgPumpkinSunflowerSeedsSoakedWalnuts from "@/assets/diet/pumpkin-sunflower-seeds-soaked-walnuts.webp";
import imgThinButtermilkWithJeera from "@/assets/diet/thin-buttermilk-with-jeera.webp";
import imgKorraUpma from "@/assets/diet/korra-upma.webp";
import imgGreenLeafyPulavCarrotRaita from "@/assets/diet/green-leafy-pulav-carrot-raita.webp";
import imgRoastedGroundnutsSprouts from "@/assets/diet/roasted-groundnuts-sprouts.webp";
import imgVegetableSaladPaneerCubes from "@/assets/diet/vegetable-salad-paneer-cubes.webp";
import imgWarmChamomileTea from "@/assets/diet/warm-chamomile-tea.webp";
// 2026-08-12 (English only — Figma 1331:16532; no Telugu screen yet, see `pending`)
import imgJamunMintLemon from "@/assets/diet/jamun-mint-lemon.webp";
import imgChapatiRajmaCurry from "@/assets/diet/chapati-rajma-curry.webp";
import imgPanRoastedPaneerCubesPepper from "@/assets/diet/pan-roasted-paneer-cubes-pepper.webp";
import imgOatsDosaRajmaCurryCurd from "@/assets/diet/oats-dosa-rajma-curry-curd.webp";
import imgCinnamonWarmMilk from "@/assets/diet/cinnamon-warm-milk.webp";
// 2026-08-13 (English only — Figma 1331:17109)
import imgTurmericJeeraWater from "@/assets/diet/turmeric-jeera-water.webp";
import imgGreenJuiceSpinachMintLemonChia from "@/assets/diet/green-juice-spinach-mint-lemon-chia.webp";
import imgVegetableSproutsSaladCucumberCarrotLemon from "@/assets/diet/vegetable-sprouts-salad-cucumber-carrot-lemon.webp";
import imgKorraRiceMoongDalBeerakayaCurryCurd from "@/assets/diet/korra-rice-moong-dal-beerakaya-curry-curd.webp";
import imgBoiledChanaOnionLemon from "@/assets/diet/boiled-chana-onion-lemon.webp";
// 2026-08-14 (English only — Figma 1398:35803)
import imgSoakedWalnuts from "@/assets/diet/soaked-walnuts.webp";
import imgWarmMilk from "@/assets/diet/warm-milk.webp";
import imgPaneerVegetableBhurjiPhulka from "@/assets/diet/paneer-vegetable-bhurji-phulka.webp";
import imgAppleSoakedBlackRaisins from "@/assets/diet/apple-soaked-black-raisins.webp";
import imgSteamedRiceDrumsticksDalFrenchBeansCurryCurd from "@/assets/diet/steamed-rice-drumsticks-dal-french-beans-curry-curd.webp";
import imgBoiledSweetPotatoPepper from "@/assets/diet/boiled-sweet-potato-pepper.webp";
import imgRagiMuddaDrumsticksDal from "@/assets/diet/ragi-mudda-drumsticks-dal.webp";
import imgWarmGreenTea from "@/assets/diet/warm-green-tea.webp";
// 2026-08-15 (English only — Figma 1398:36390)
import imgSunflowerSeeds from "@/assets/diet/sunflower-seeds.webp";
import imgVegetableJuiceCarrotTomatoGinger from "@/assets/diet/vegetable-juice-carrot-tomato-ginger.webp";
import imgOnionUthappamPeanutChutney from "@/assets/diet/onion-uthappam-peanut-chutney.webp";
import imgJamun from "@/assets/diet/jamun.webp";
import imgTamarindLemonRiceTraditionalChutney from "@/assets/diet/tamarind-lemon-rice-traditional-chutney.webp";
import imgCucumberCarrotSaladLemon from "@/assets/diet/cucumber-carrot-salad-lemon.webp";
import imgVegetableChapatiRollCarrotCapsicumBeans from "@/assets/diet/vegetable-chapati-roll-carrot-capsicum-beans.webp";
import imgElaichiMilk from "@/assets/diet/elaichi-milk.webp";
// 2026-08-16 (English only — Figma 1398:36948)
import imgSoakedRaisins from "@/assets/diet/soaked-raisins.webp";
import imgVegetablePohaPeanutsCurryLeaves from "@/assets/diet/vegetable-poha-peanuts-curry-leaves.webp";
import imgRiceRasamSoyaChunksCurry from "@/assets/diet/rice-rasam-soya-chunks-curry.webp";
import imgJaggeryNutsLaddu from "@/assets/diet/jaggery-nuts-laddu.webp";
import imgTomatoRiceSoyaChunksCurry from "@/assets/diet/tomato-rice-soya-chunks-curry.webp";

/** Shorthand for a LocalizedText where the English and Telugu Figma screens showed the
 *  exact same word (a handful of ingredient/dish names were left untranslated in the
 *  Telugu design — transcribed as-authored, not "fixed" here). */
const same = (text: string): LocalizedText => ({ English: text, Telugu: text });
const t = (English: string, Telugu: string): LocalizedText => ({ English, Telugu });
/** Placeholder for a date/slot with no Telugu Figma screen yet — English text duplicated
 *  so the UI never shows blank Telugu content. 2026-08-10 (Figma node 1331:15298) is the
 *  only currently-curated date that's English-only and uses `pending(...)` throughout —
 *  swap for real `t(...)` once that date's Telugu screen arrives, and search this file for
 *  `pending` to find every call site that still needs updating. */
const pending = same;

/**
 * Hand-authored overrides matching the Figma detail screens, keyed by ISO date then slot
 * id. Curated dates today: 2026-08-03 through 2026-08-11. 2026-08-03 through 2026-08-09
 * all have real Telugu (Telugu screens are per-date sections under the M2W2-Telugu parent
 * frame 970:32654 — 03: 970:32655, 04: 970:33289, 05: 970:33879, 06: 970:34451, 07:
 * 970:35060, 08: 970:35696, 09: 978:45985); 2026-08-10 (Figma node 1331:15298) is
 * English-only so far, see `pending`; 2026-08-11 (English 1331:15937, Telugu 1398:33989)
 * has real Telugu but the two screens aren't fully symmetric — several benefit rows exist
 * only in English, marked `visibleLanguages: ["English"]` below. Any date with no entry
 * here falls back entirely to the generic sheet content in weekBlocks/. Add more dates the
 * same way as
 * more days get designed; nothing else needs to change.
 */
export const CURATED_CONTENT_BY_DATE: CuratedContentByDate = {
  "2026-08-03": {
    earlyMorning: {
      name: t("Walnuts & Dates", "Walnuts & ఖర్జూరాలు"),
      imageUrl: imgWalnutsDates,
      items: [{ label: same("2 Walnuts") }, { label: t("2 Dates", "2 ఖర్జూరాలు") }],
      tips: t("Soak overnight and eat in the morning.", "రాత్రంతా నానబెట్టి, ఉదయం తినండి."),
      precautions: t(
        "For people with Diabetes, dates are high in sugar, so limit the quantity.",
        "Diabetes ఉన్నవారు ఖర్జూరాలు limit గా తీసుకోండి, ఎందుకంటే వీటిలో Natural sugars ఎక్కువగా ఉంటుంది."
      ),
      nutritionalBenefits: [
        { ingredient: same("Walnuts"), benefits: [{ benefitLabel: t("Heart Health", "Heart health కి మంచిది"), iconKey: "heart" }] },
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
        { ingredient: same("Turmeric"), benefits: [{ benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" }] },
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
        { ingredient: same("Sunflower Seeds"), benefits: [
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
          { benefitLabel: t("Sustained Energy", "ఎక్కువసేపు energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
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
        { ingredient: t("Mixed Vegetables", "Mixed కూరగాయలు"), benefits: [{ benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" }] },
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
        "Thyroid problem ఉన్నవారు పచ్చి sprouts ను ఎక్కువగా తీసుకోవద్దు."
      ),
      nutritionalBenefits: [
        { ingredient: t("Sprouts", "Sprouts"), benefits: [
          { benefitLabel: t("Protein-Rich", "Protein ఎక్కువగా ఉంటుంది"), iconKey: "muscle-health" },
          // Figma 970:33289 (Telugu) has no row for this — English-only, per 924:21411.
          { benefitLabel: t("Supports Metabolism", "జీవక్రియ (మెటాబాలిజం)కు మద్దతు"), iconKey: "healthy-eating", visibleLanguages: ["English"] },
          { benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" },
          { benefitLabel: t("Better Digestion", "Digestion కి support చేస్తుంది"), iconKey: "stomach" },
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
      items: [{ label: same("1 Glass") }],
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
      recommendedQuantity: [{ ingredient: t("Water", "గోరువెచ్చని నీరు"), qty: same("1 Glass") }],
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
          { benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" },
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
          { benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
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
          { benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
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
          { benefitLabel: t("Sustained Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
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
        { ingredient: t("Rice", "అన్నం"), benefits: [{ benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" }] },
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
        "కూరగాయలు వేయించి, నానబెట్టిన  అటుకులు & వేరుసెనగలు వేసి మెతగా అయ్యెవరకు ఊడించండి."
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
  // 2026-08-10 — Figma node 1331:15298, English only (no Telugu screen yet, hence `pending`).
  "2026-08-10": {
    earlyMorning: {
      name: t("Soaked Almonds & Raisins", " Soaked బాదం & ఎండు ద్రాక్ష"),
      imageUrl: imgSoakedAlmondsRaisins,
      items: [{ label: pending("5 Almonds") }, { label: pending("4 Raisins") }],
      precautions: t(
        "For people with Diabetes, limit the portion to 4 almonds and 2 raisins to help avoid a blood sugar spike.",
        "Diabetes ఉన్నవారు Blood sugar levels పెరగకుండా 4 బాదం & 2 ఎండు ద్రాక్షకు limit చేసుకోవాలి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Almonds", "బాదం"), benefits: [
          { benefitLabel: t("Brain Health", "Brain కి మంచిది"), iconKey: "brain-health" },
          { benefitLabel: t("Healthy Skin", "Skin కు మంచిది"), iconKey: "healthy-skin" },
        ] },
        { ingredient: t("Raisins", "ఎండు ద్రాక్ష"), benefits: [
          { benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" },
          { benefitLabel: t("Improves bone health", "Bone health కి మంచిది"), iconKey: "dog-bone" },
        ] },
      ],
      recommendedQuantity: [
        { ingredient: t("Soaked Almonds", "Soaked బాదం"), qty: pending("5 pcs") },
        { ingredient: t("Soaked Raisins", "Soaked ఎండు ద్రాక్ష"), qty: pending("4 pcs") },
      ],
      groceryListAvailable: true,
    },
    postYogaDrink: {
      name: same("Soaked Chia Seeds Water"),
      imageUrl: imgSoakedChiaSeedsWater,
      items: [{ label: pending("1 tbsp") }],
      tips: t("Soak overnight and eat in the morning.", "రాత్రంతా నానబెట్టి, ఉదయం తినండి."),
      precautions: t("For People with Thyroid Concerns, limit the intake to 1 tbsp per serving.", "Thyroid ఉన్నవారు 1 tbsp వరకు మాత్రమే తీసుకోవాలి."),
      nutritionalBenefits: [
        { ingredient: same("Chia Seeds"), benefits: [
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
          { benefitLabel: t("Hydration", "Body ని Hydrated గా ఉంచుతుంది"), iconKey: "water" },
        ] },
      ],
      recommendedQuantity: [{ ingredient: pending("Chia Seeds"), qty: pending("1 tbsp") }],
      groceryListAvailable: true,
    },
    breakfast: {
      name: t("Moong Dal Chilla & Coconut Chutney", "పెసరపప్పు చిల్లా & కొబ్బరి చట్నీ"),
      imageUrl: imgMoongDalChillaCoconutChutney,
      tips: t("Moong dal is naturally gluten-free, making it suitable for people with gluten allergy.", "పెసరపప్పు -  Gluten free, కాబట్టి gluten allergy ఉన్నవారికి మంచిది."),
      precautions: t("For People with Diabetes, limit the portion to 2 medium chillas.", "Diabetes ఉన్నవారు 2 medium చిల్లా మాత్రమే తీసుకోండి"),
      nutritionalBenefits: [
        { ingredient: same("Moong Dal Chilla"), benefits: [
          { benefitLabel: t("Muscle Health", "Muscle health ని పెంచుతుంది"), iconKey: "muscle-health" },
          { benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" },
          { benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" },
        ] },
        { ingredient: same("Coconut Chutney"), benefits: [
          { benefitLabel: t("Brain Health", "Brain కి మంచిది"), iconKey: "brain-health" },
          { benefitLabel: t("Quick Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
          { benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" },
        ] },
      ],
      groceryListAvailable: true,
    },
    morningSnack: {
      name: same("Apple"),
      imageUrl: imgApple,
      items: [{ label: pending("1 Apple") }],
      precautions: t("For people with Diabetes, limit the portion to ½ an apple per serving.", "Diabetes ఉన్నవారు  1  medium ఆపిల్‌ మాత్రమే"),
      nutritionalBenefits: [{ ingredient: pending("Apple"), benefits: [{ benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" }] }],
      recommendedQuantity: [{ ingredient: pending("Apple"), qty: pending("1") }],
      groceryListAvailable: true,
    },
    lunch: {
      name: t("Steamed Rice, Methi Dal, Ladies Finger Curry & Curd", "అన్నం, మెంతికూర పప్పు, బెండకాయ కూర & పెరుగు"),
      imageUrl: imgSteamedRiceMethiDalLadiesFingerCurryCurd,
      tips: t("Follow the 80% full rule—stop eating when you feel comfortably satisfied, not completely full.", "80% rule పాటించండి - కడుపు పూర్తిగా నిండే వరకు కాకుండా, 80% నిండినప్పుడు తినడం ఆపండి."),
      nutritionalBenefits: [
        { ingredient: t("Steamed Rice", "అన్నం"), benefits: [{ benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" }] },
        { ingredient: t("Methi Dal", "మెంతికూర పప్పు"), benefits: [
          { benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" },
          { benefitLabel: t("Muscle Health", "Muscle health ని పెంచుతుంది"), iconKey: "muscle-health" },
        ] },
        { ingredient: t("Ladies Finger (Okra)", "బెండకాయ కూర"), benefits: [{ benefitLabel: t("Healthy Blood Sugar", "Hemoglobin ని పెంచుతుంది"), iconKey: "sugar-cubes" }] },
        { ingredient: t("Curd", "పెరుగు"), benefits: [{ benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" }] },
      ],
      groceryListAvailable: true,
    },
    eveningSnack: {
      name: t("Tomato Vegetable Soup", "టమాటా soup"),
      imageUrl: imgTomatoVegetableSoup,
      tips: t("Cook tomatoes and vegetables, blend until smooth, and serve the soup warm.", "టమాటాలు, కూరగాయలను మెత్తగా అయ్యే వరకు ఉడికించి, blend చేసి వెచ్చగా వడ్డించండి."),
      nutritionalBenefits: [
        { ingredient: t("Tomato", "టమాటా"), benefits: [
          { benefitLabel: t("Heart Health", "Heart health కి మంచిది"), iconKey: "heart" },
          { benefitLabel: t("Eye Health", "Eyes కి మంచిది"), iconKey: "eye-health" },
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
          { benefitLabel: t("Antioxidant Protection", "Antioxidant Protection ని పెంచుతుంది"), iconKey: "healthy-food", visibleLanguages: ["English"] },
        ] },
        { ingredient: same("Mixed Vegetables"), benefits: [
          { benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" },
          { benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" },
        ] },
        { ingredient: t("Warm Soup", "Soup"), benefits: [
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
          { benefitLabel: t("Hydration", "Body ని Hydrated గా ఉంచుతుంది"), iconKey: "water" },
        ] },
      ],
      groceryListAvailable: true,
    },
    dinner: {
      name: t("Vegetable Upma with Carrot & Beans", "Carrot & Beans Upma"),
      imageUrl: imgVegetableUpmaCarrotBeans,
      tips: t("Avoid heavy spices, and try to finish dinner by 7:30 PM.", "ఎక్కువ spices వాడకండి, రాత్రి dinner 7:30 PM లోపు finish  చేయండి."),
      nutritionalBenefits: [
        { ingredient: same("Rava (Semolina)"), benefits: [
          { benefitLabel: t("Sustained Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
          { benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" },
        ] },
        { ingredient: same("Mixed Vegetables"), benefits: [
          { benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" },
          { benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" },
        ] },
      ],
      groceryListAvailable: true,
    },
    nightDrink: {
      name: t("Tulasi Tea", "తులసి టీ"),
      imageUrl: imgTulasiTea,
      tips: t("Boil tulasi leaves in water for 5 minutes, strain, and drink warm.", "తులసి ఆకులను నీటిలో 5 minutes మరిగించి, వడకట్టి వెచ్చగా తాగండి"),
      precautions: t("Avoid using mobile phones or watching TV after 9:30 PM.", "రాత్రి 9:30 PM తర్వాత మొబైల్ ఫోన్ లేదా టీవీ వాడకండి.."),
      nutritionalBenefits: [
        { ingredient: same("Tulasi Tea"), benefits: [
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
          { benefitLabel: same("Antioxidant Protection"), iconKey: "healthy-food" },
          { benefitLabel: t("Relaxation", "Relax గా ఉంటుంది."), iconKey: "meditation" },
        ] },
      ],
      groceryListAvailable: true,
    },
  },
  // 2026-08-11 — Figma 1331:15937 (English), 1398:33989 (Telugu).
  "2026-08-11": {
    earlyMorning: {
      name: same("Pumpkin, Sunflower Seeds & Soaked Walnuts"),
      imageUrl: imgPumpkinSunflowerSeedsSoakedWalnuts,
      items: [{ label: same("1 tbsp in total") }, { label: same("2 Walnuts") }],
      tips: t("For People with High Blood Pressure, Magnesium-rich seeds are an excellent choice.", "High BP ఉన్నవారికి Magnesium ఉన్న ఈ seeds చాలా మంచి choice."),
      precautions: t("For people with Diabetes, watch your seed portion size.", "Diabetes ఉన్నవారు quantity ని జాగ్రత్తగా చూసుకోవాలి"),
      nutritionalBenefits: [
        { ingredient: same("Pumpkin Seeds"), benefits: [{ benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" }] },
        { ingredient: same("Sunflower Seeds"), benefits: [{ benefitLabel: same("Antioxidant Protection"), iconKey: "healthy-food" }], visibleLanguages: ["English"] },
        { ingredient: same("Walnuts"), benefits: [{ benefitLabel: t("Heart Health", "Heart health కి మంచిది"), iconKey: "heart" }] },
      ],
      recommendedQuantity: [
        { ingredient: same("Mixed Seeds"), qty: same("1 tbsp") },
        { ingredient: same("Soaked Walnuts"), qty: same("2 pcs") },
      ],
      groceryListAvailable: true,
    },
    postYogaDrink: {
      name: t("Thin Buttermilk with Jeera", "జీలకర్రతో మజ్జిగ"),
      imageUrl: imgThinButtermilkWithJeera,
      tips: t(
        "Thin buttermilk is an excellent post-workout drink for hydration and electrolyte replenishment.",
        "Workout/ Exercise తర్వాత body కి hydration & electrolytes ఇవ్వడానికి మజ్జిగ మంచి choice."
      ),
      // Telugu detail screen (1398:34561) has no Precautions section for this meal — reusing
      // the English text for both languages rather than dropping real English content.
      precautions: ("For People with Lactose Intolerance, start with small sips to check your tolerance."),
      nutritionalBenefits: [
        { ingredient: same("Buttermilk"), benefits: [
          { benefitLabel: t("Muscle Recovery", "Muscle health ని పెంచుతుంది"), iconKey: "muscle-health" },
          { benefitLabel: t("Bone Health", "Bone health కి మంచిది"), iconKey: "dog-bone" },
          { benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" },
        ] },
        { ingredient: t("Jeera (Cumin)", "జీలకర్ర"), benefits: [
          { benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" },
          { benefitLabel: t("Supports Metabolism", "Metabolism ని పెంచుతుంది"), iconKey: "healthy-eating" },
          // Figma 1398:34588 (Telugu) has no row for this — English-only, per 1331:16205.
          { benefitLabel: same("Anti-inflammatory Support"), iconKey: "anti-inflammatory", visibleLanguages: ["English"] },
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
        ] },
      ],
      groceryListAvailable: true,
    },
    breakfast: {
      name: t("Korra Upma (Foxtail Millet Upma)", "కొర్ర ఉప్మా"),
      imageUrl: imgKorraUpma,
      tips: t(
        "Foxtail millet is naturally gluten-free, making it completely safe for those with gluten sensitivity.",
        "Gluten sensitivity ఉన్నవారికి naturally gluten-free అయిన కొర్ర మంచి choice."
      ),
      precautions: t(
        "For People with Diabetes, Korra upma is an excellent alternative to white rice.",
        "Diabetes ఉన్నవారు కొర్ర ఉప్మాను limited quantity లో తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Korra (Foxtail Millet)", "కొర్ర"), benefits: [
          { benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" },
          { benefitLabel: t("Muscle Health", "Muscle health ని పెంచుతుంది"), iconKey: "muscle-health" },
          { benefitLabel: t("Bone Health", "Bone health కి మంచిది"), iconKey: "dog-bone" },
          { benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
        ] },
      ],
      groceryListAvailable: true,
    },
    morningSnack: {
      name: same("Apple"),
      imageUrl: imgApple,
      items: [{ label: same("1 Apple") }],
      precautions: t("For people with Diabetes, limit the portion to ½ an apple per serving.", "Diabetes ఉన్నవారు ½ Apple మాత్రమే తీసుకోండి."),
      nutritionalBenefits: [{ ingredient: same("Apple"), benefits: [{ benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" }] }],
      recommendedQuantity: [{ ingredient: same("Apple"), qty: same("1") }],
      groceryListAvailable: true,
    },
    lunch: {
      name: t("Green Leafy Pulav & Carrot Raita", "ఆకుకూరల పులావ్ & క్యారెట్ రాయితా"),
      imageUrl: imgGreenLeafyPulavCarrotRaita,
      tips: t(
        "Follow the 80% full rule—stop eating when you feel comfortably satisfied, not completely full.",
        "80% rule ని follow చేయండి — కడుపు 80% నిండినప్పుడు తినడం ఆపండి."
      ),
      precautions: t("For people with Diabetes, practice portion control", "Diabetes ఉన్నవారు portion control లో తినండి."),
      nutritionalBenefits: [
        { ingredient: same("Green Leafy Pulav"), benefits: [
          { benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" },
          // Figma 1398:34451 (Telugu) has no row for this — English-only, per 1370:45278.
          { benefitLabel: same("Antioxidant Protection"), iconKey: "healthy-food", visibleLanguages: ["English"] },
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
        ] },
        { ingredient: same("Carrot Raita"), benefits: [
          { benefitLabel: t("Eye Health", "Eyes కి మంచిది"), iconKey: "eye-health" },
          { benefitLabel: t("Healthy Skin", "Skin కు మంచిది"), iconKey: "healthy-skin" },
          { benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" },
          { benefitLabel: t("Bone Health", "Bone health కి మంచిది"), iconKey: "dog-bone" },
        ] },
      ],
      groceryListAvailable: true,
    },
    eveningSnack: {
      name: t("Roasted Groundnuts & Sprouts", "వేయించిన వేరుశెనగలు & మొలకలు"),
      imageUrl: imgRoastedGroundnutsSprouts,
      // Figma puts this Diabetes note in the Tips section (not Precautions) for this meal,
      // in both languages — transcribed as-authored, not "fixed" to Precautions.
      tips: t(
        "For People with Diabetes, roasted groundnuts are a good low-GI, filling snack.",
        "Diabetes ఉన్నవారు roasted groundnuts ని snack గా తీసుకోవచ్చు."
      ),
      nutritionalBenefits: [
        { ingredient: same("Roasted Groundnuts"), benefits: [
          { benefitLabel: t("Muscle Health", "Muscle health ని పెంచుతుంది"), iconKey: "muscle-health" },
          { benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
          { benefitLabel: t("Brain Health", "Brain కి మంచిది"), iconKey: "brain-health" },
          { benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" },
          { benefitLabel: t("Heart Health", "Heart health కి మంచిది"), iconKey: "heart" },
        ] },
        { ingredient: same("Sprouts"), benefits: [
          { benefitLabel: t("Protein-Rich", "Protein ఎక్కువగా ఉంటుంది"), iconKey: "muscle-health" },
          { benefitLabel: t("Supports Metabolism", "Metabolism ని పెంచుతుంది"), iconKey: "healthy-eating" },
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
          { benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" },
        ] },
      ],
      groceryListAvailable: true,
    },
    dinner: {
      name: t("Vegetable Salad & Paneer Cubes", "Vegetable Salad & Paneer Cubes"),
      imageUrl: imgVegetableSaladPaneerCubes,
      tips: t("Avoid heavy spices at night for better sleep.", "రాత్రిపూట మంచి నిద్ర కోసం ఎక్కువ Spices వాడకండి."),
      nutritionalBenefits: [
        { ingredient: same("Vegetable Salad"), benefits: [
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
          // Figma 1398:34229 (Telugu) has no row for this — English-only, per 1373:45353.
          { benefitLabel: same("Antioxidant Protection"), iconKey: "healthy-food", visibleLanguages: ["English"] },
          { benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" },
        ] },
        { ingredient: same("Paneer"), benefits: [
          { benefitLabel: t("Muscle Health", "Muscle health ని పెంచుతుంది"), iconKey: "muscle-health" },
          { benefitLabel: t("Bone Health", "Bone health కి మంచిది"), iconKey: "dog-bone" },
        ] },
      ],
      groceryListAvailable: true,
    },
    nightDrink: {
      name: same("Warm Chamomile Tea"),
      imageUrl: imgWarmChamomileTea,
      tips: t("Get 7 hours of restful sleep (10:00 PM – 5:00 AM).", "7 గంటలు ప్రశాంతంగా నిద్రపోండి (రాత్రి 10:00 PM – ఉదయం 5:00 AM)."),
      precautions: t(
        "Choose a caffeine-free herbal tea and avoid green tea at night. During pregnancy, avoid ashwagandha.",
        "రాత్రిపూట green tea ని avoid చేయండి. Pregnancy సమయంలో ashwagandha ని avoid చేయండి."
      ),
      nutritionalBenefits: [
        // Figma's English benefits card is labeled "Tulasi Tea" even though the dish itself
        // is Warm Chamomile Tea (970:32654-style leftover); the Telugu card correctly says
        // "Chamomile Tea". Transcribed as-authored on each screen, not reconciled.
        { ingredient: t("Tulasi Tea", "Chamomile Tea"), benefits: [
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
          // Figma 1398:34273 (Telugu) has no row for these two — English-only, per 1331:16210.
          { benefitLabel: same("Antioxidant Protection"), iconKey: "healthy-food", visibleLanguages: ["English"] },
          { benefitLabel: same("Anti-inflammatory Support"), iconKey: "anti-inflammatory", visibleLanguages: ["English"] },
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
        ] },
      ],
      groceryListAvailable: true,
    },
  },
  // 2026-08-12: real Telugu (Figma 1398:34634, parent "M1W1-Telugu" 1398:33383). The Figma
  // design has no Post Yoga Drink card that day (see OMITTED_SLOTS_BY_DATE below);
  // Breakfast's card visually absorbs that slot's start time.
  "2026-08-12": {
    earlyMorning: {
      name: same("Warm Water"),
      imageUrl: imgWarmWater,
      items: [{ label: same("1 Glass") }],
      tips: t(
        "Drink warm water throughout the day to help cleanse the system and kickstart digestion.",
        "రోజంతా గోరువెచ్చని నీరు తాగడం వల్ల body cleaning కి, digestion improvement కి help అవుతుంది."
      ),
      recommendedQuantity: [{ ingredient: same("Water"), qty: same("1 Glass") }],
      nutritionalBenefits: [
        { ingredient: same("Warm Water"), benefits: [
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
          { benefitLabel: t("Healthy Metabolism", "Metabolism ని పెంచుతుంది"), iconKey: "healthy-eating" },
        ] },
      ],
      groceryListAvailable: true,
    },
    breakfast: {
      name: t("Ragi Malt with Nuts & Seeds", "రాగి malt (nuts & seeds తో)"),
      imageUrl: imgRagiMaltWithNutsSeeds,
      timeRangeLabel: "06:30AM - 09:30AM",
      // Telugu tips (1398:34634) mention avoiding lumps rather than salt — as-authored.
      tips: t(
        "Cook ragi flour in water or milk with salt, stir continuously, and top with crushed nuts and seeds.",
        "రాగి పిండిని water లేదా milk లో వేసి lumps రాకుండా బాగా కలుపుతూ ఉడికించండి. చివరగా nuts & seeds వేసి కలపండి."
      ),
      nutritionalBenefits: [
        { ingredient: same("Ragi"), benefits: [{ benefitLabel: t("Bone Health", "Bone health కి మంచిది"), iconKey: "dog-bone" }] },
        { ingredient: same("Nuts & Seeds"), benefits: [{ benefitLabel: t("Sustained Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" }] },
      ],
      groceryListAvailable: true,
    },
    morningSnack: {
      name: t("Jamun, Mint Leaves with a squeeze of Lemon", "నేరేడు పండ్లు, పుదీనా ఆకులు & నిమ్మరసం"),
      imageUrl: imgJamunMintLemon,
      items: [{ label: same("1 Bowl") }],
      precautions: t(
        "For people with Diabetes, limit the portion to 8–10 jamuns (approximately 100 g) per serving.",
        "Diabetes ఉన్నవారు ఒకసారి 8–10 నేరేడు పండ్లు (సుమారు 100g) మాత్రమే తీసుకోండి."
      ),
      recommendedQuantity: [{ ingredient: t("Jamun", "నేరేడు"), qty: same("1 Bowl") }],
      nutritionalBenefits: [
        { ingredient: same("Jamun"), benefits: [
          { benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" },
          // Figma 1398:34634 (Telugu) has no row for this — English-only, per 924:21411.
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food", visibleLanguages: ["English"] },
          { benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" },
        ] },
        { ingredient: same("Mint"), benefits: [{ benefitLabel: t("Aids Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" }] },
        { ingredient: same("Lemon"), benefits: [{ benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" }] },
      ],
      groceryListAvailable: true,
    },
    lunch: {
      name: t("Chapati & Rajma Curry", "చపాతీ & రాజ్మా కర్రీ"),
      imageUrl: imgChapatiRajmaCurry,
      tips: t(
        "Follow the 80% full rule—stop eating when you feel comfortably satisfied, not completely full.",
        "80% rule ని follow చేయండి — కడుపు 80% నిండినప్పుడు తినడం ఆపండి."
      ),
      precautions: t(
        "For Kidney Concerns, limit the intake of rajma. For People with Gas/Bloating, start with smaller portions.",
        "Kidney సమస్యలు ఉన్నవారు Rajma ని limit గా తీసుకోండి. Gas లేదా Bloating ఉంటే, మొదట తక్కువ quantity తో ప్రారంభించండి."
      ),
      nutritionalBenefits: [
        { ingredient: same("Chapati"), benefits: [{ benefitLabel: t("Sustained Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" }] },
        { ingredient: same("Rajma"), benefits: [
          { benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" },
          { benefitLabel: t("Muscle Health", "Muscle health ని పెంచుతుంది"), iconKey: "muscle-health" },
          { benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" },
          { benefitLabel: t("Heart Health", "Heart health కి మంచిది"), iconKey: "heart" },
        ] },
      ],
      groceryListAvailable: true,
    },
    eveningSnack: {
      name: t("Pan-Roasted Paneer Cubes with Pepper", "మిరియాల పనీర్ cubes"),
      imageUrl: imgPanRoastedPaneerCubesPepper,
      precautions: t(
        "For People with High Cholesterol, practice portion control.",
        "High Cholesterol ఉన్నవారు ఒకేసారి ఎక్కువగా తినకుండా portion control పాటించండి."
      ),
      nutritionalBenefits: [
        { ingredient: same("Paneer"), benefits: [
          { benefitLabel: t("Muscle Health", "Muscle health ని పెంచుతుంది"), iconKey: "muscle-health" },
          { benefitLabel: t("Bone Health", "Bone health కి మంచిది"), iconKey: "dog-bone" },
        ] },
        { ingredient: same("Pepper"), benefits: [{ benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" }] },
      ],
      groceryListAvailable: true,
    },
    dinner: {
      name: t("Oats Dosa, Rajma curry & Curd", "ఓట్స్ దోసె, రాజ్మా కర్రీ & పెరుగు"),
      imageUrl: imgOatsDosaRajmaCurryCurd,
      items: [{ label: same("2 tbsp of Curd") }],
      tips: t("Avoid heavy spices at dinner, as they may disturb sleep.", "రాత్రిపూట మంచి నిద్ర కోసం ఎక్కువ Spices వాడకండి."),
      // recommendedQuantity keeps "Curd" in English on the Telugu screen too (matches
      // the established pattern, e.g. Warm Water's "Water" on 2026-08-05).
      recommendedQuantity: [{ ingredient: same("Curd"), qty: same("2 tbsp") }],
      nutritionalBenefits: [
        // Both the English (1331:16734) and Telugu (1398:34634) screens list Rajma's card
        // before Oats Dosa's — verified directly against a re-fetch of the English screen.
        { ingredient: t("Rajma", "రాజ్మా"), benefits: [
          { benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" },
          { benefitLabel: t("Muscle Health", "Muscle health ని పెంచుతుంది"), iconKey: "muscle-health" },
          { benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" },
          { benefitLabel: t("Heart Health", "Heart health కి మంచిది"), iconKey: "heart" },
        ] },
        { ingredient: t("Oats Dosa", "ఓట్స్ దోసె"), benefits: [{ benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" }] },
        { ingredient: t("Curd", "పెరుగు"), benefits: [{ benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" }] },
      ],
      groceryListAvailable: true,
    },
    nightDrink: {
      name: t("Cinnamon Warm Milk", "దాల్చిన చెక్క పాలు"),
      // Figma 1398:34634 (Telugu) has no separate Precautions box for this dish — its Tips
      // box instead reads the standard sleep-hygiene message used elsewhere, replacing the
      // English "avoid mobile phones" tip rather than supplementing it. Transcribed as-authored.
      tips: t("Avoid mobile phones or TV after 9:30 PM.", "7 గంటలు ప్రశాంతంగా నిద్రపోండి (రాత్రి 10:00 PM – ఉదయం 5:00 AM)."),
      imageUrl: imgCinnamonWarmMilk,
      nutritionalBenefits: [
        // Both English (1331:16786) and Telugu (1398:34634) list Cinnamon's card before
        // Milk's — verified directly against a re-fetch of the English screen.
        { ingredient: same("Cinnamon"), benefits: [
          // Figma 1398:34634 (Telugu) shows a Supports Hemoglobin row here instead of
          // Healthy Blood Sugar — the row's own frame is still named "sugar" (a stale
          // layer name) but its actual text/content is the Hemoglobin benefit.
          { benefitLabel: t("Healthy Blood Sugar", "ఆరోగ్యకరమైన రక్తంలో చక్కెర అందిస్తుంది"), iconKey: "sugar-cubes", visibleLanguages: ["English"] },
          { benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin", visibleLanguages: ["Telugu"] },
          { benefitLabel: t("Healthy Metabolism", "Metabolism ని పెంచుతుంది"), iconKey: "healthy-eating" },
        ] },
        { ingredient: same("Milk"), benefits: [{ benefitLabel: t("Bone Strength", "Bone health కి మంచిది"), iconKey: "dog-bone" }] },
      ],
      groceryListAvailable: true,
    },
  },
  // 2026-08-13: real Telugu (Figma 1398:35145, parent "M1W1-Telugu" 1398:33383).
  "2026-08-13": {
    earlyMorning: {
      name: t("Turmeric Jeera water", "పసుపు, జీలకర్ర water"),
      imageUrl: imgTurmericJeeraWater,
      items: [{ label: same("1/2 tbsp Jeera") }],
      tips: t(
        "Boil ½ tsp jeera in water for 5 minutes, switch off the flame, add a pinch of turmeric, and drink warm.",
        "½ tsp జీలకర్ర ని water లో 5 minutes మరిగించండి. తర్వాత flame off చేసి, చిటికెడు పసుపు వేసి గోరువెచ్చగా తాగండి."
      ),
      precautions: t(
        "For People with Gallbladder Issues or Kidney Stones, avoid consuming excess turmeric regularly.",
        "Gallbladder సమస్యలు లేదా Kidney Stones ఉన్నవారు పసుపు ని ఎక్కువగా తీసుకోకండి."
      ),
      recommendedQuantity: [{ ingredient: t("Jeera", "జీలకర్ర"), qty: same("1/2 tbsp") }],
      nutritionalBenefits: [
        { ingredient: t("Turmeric", "పసుపు"), benefits: [{ benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" }] },
        { ingredient: t("Jeera (Cumin)", "జీలకర్ర"), benefits: [
          { benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" },
          { benefitLabel: t("Supports Metabolism", "Metabolism ని పెంచుతుంది"), iconKey: "healthy-eating" },
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
          // Figma 1398:35145 (Telugu) has no row for this — English-only, per 924:21411.
          { benefitLabel: same("Anti-inflammatory Support"), iconKey: "anti-inflammatory", visibleLanguages: ["English"] },
        ] },
      ],
      groceryListAvailable: true,
    },
    postYogaDrink: {
      name: t("Green Juice- Spinach, Mint, Lemon & chia seeds", "Green Juice - పాలకూర, పుదీనా, నిమ్మరసం & chia seeds"),
      imageUrl: imgGreenJuiceSpinachMintLemonChia,
      tips: t("Drink on an empty stomach for maximum absorption.", "ఉదయం ఖాళీ కడుపుతో తాగితే nutrients బాగా absorb అవుతాయి."),
      nutritionalBenefits: [
        { ingredient: same("Spinach"), benefits: [{ benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" }] },
        { ingredient: same("Mint"), benefits: [{ benefitLabel: t("Aids Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" }] },
        { ingredient: same("Lemon"), benefits: [{ benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" }] },
      ],
      groceryListAvailable: true,
    },
    breakfast: {
      name: t("Vegetable Sprouts Salad with Cucumber, Carrot & Lemon", "Vegetable sprouts salad (దోసకాయ, క్యారెట్ & నిమ్మరసం)"),
      imageUrl: imgVegetableSproutsSaladCucumberCarrotLemon,
      tips: t("Chew slowly and practice mindful eating.", "నెమ్మదిగా నమిలి, mindful eating practice చేయండి."),
      nutritionalBenefits: [
        { ingredient: same("Sprouts"), benefits: [
          { benefitLabel: t("Protein-Rich", "Protein ఎక్కువగా ఉంటుంది"), iconKey: "muscle-health" },
          { benefitLabel: t("Supports Metabolism", "Metabolism ని పెంచుతుంది"), iconKey: "healthy-eating" },
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
          { benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" },
        ] },
        { ingredient: t("Cucumber", "దోసకాయ"), benefits: [
          { benefitLabel: t("Hydration", "Body ని Hydrated గా ఉంచుతుంది"), iconKey: "water" },
          { benefitLabel: t("Cooling", "Body న్ని cool గా ఉంచుతుంది"), iconKey: "snowflake" },
        ] },
        { ingredient: t("Carrot", "క్యారెట్"), benefits: [
          { benefitLabel: t("Eye Health", "Eyes కి మంచిది"), iconKey: "eye-health" },
          // Figma 1398:35145 (Telugu) has no row for this — English-only, per 924:21411.
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food", visibleLanguages: ["English"] },
        ] },
        { ingredient: t("Lemon", "నిమ్మరసం"), benefits: [{ benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" }] },
      ],
      groceryListAvailable: true,
    },
    morningSnack: {
      name: t("Guava", "జామ పండు"),
      imageUrl: imgGuava,
      items: [{ label: same("1 Medium Fruit") }],
      precautions: t(
        "For people with Diabetes, consume 1/2 guava per serving. Avoid adding salt or sugar.",
        "Diabetes ఉన్నవారు ½ జామ పండు మాత్రమే తినండి. Salt లేదా Sugar కలపకండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Guava", "జామ పండు"), benefits: [
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
          { benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" },
          // Figma 1398:35145 (Telugu) has no row for these two — English-only, per 924:21411.
          { benefitLabel: t("Healthy Blood Sugar", "ఆరోగ్యకరమైన రక్తంలో చక్కెర అందిస్తుంది"), iconKey: "sugar-cubes", visibleLanguages: ["English"] },
          // Telugu-only: this Guava card's "sugar" row shows a Supports Hemoglobin benefit
          // instead — same swap seen on 2026-08-12's Cinnamon and 2026-08-16's Guava.
          { benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin", visibleLanguages: ["Telugu"] },
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food", visibleLanguages: ["English"] },
          { benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" },
        ] },
      ],
      recommendedQuantity: [{ ingredient: t("Guava", "జామ పండు"), qty: same("1") }],
      groceryListAvailable: true,
    },
    lunch: {
      name: t("Korra (Foxtail Millet) Rice, Moong Dal, Beerakaya Curry & Curd", "కొర్ర అన్నం, పెసరపప్పు, బీరకాయ కూర & పెరుగు"),
      imageUrl: imgKorraRiceMoongDalBeerakayaCurryCurd,
      tips: t(
        "Follow the 80% full rule—stop eating when you feel comfortably satisfied, not completely full.",
        "80% rule ని follow చేయండి — కడుపు 80% నిండినప్పుడు తినడం ఆపండి."
      ),
      precautions: t(
        "For People with Diabetes, limit korra rice to 150 g per serving and avoid heavy oil.",
        "Diabetes ఉన్నవారు కొర్ర అన్నం ని 150g వరకు మాత్రమే తీసుకోండి. ఎక్కువ oil వాడకండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Korra (Foxtail Millet)", "కొర్ర అన్నం"), benefits: [
          { benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" },
          { benefitLabel: t("Muscle Health", "Muscle health ని పెంచుతుంది"), iconKey: "muscle-health" },
          { benefitLabel: t("Bone Health", "Bone health కి మంచిది"), iconKey: "dog-bone" },
          { benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
        ] },
        { ingredient: t("Moong Dal", "పెసరపప్పు"), benefits: [
          { benefitLabel: t("Protein-Rich", "Protein ఎక్కువగా ఉంటుంది"), iconKey: "muscle-health" },
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
        ] },
        { ingredient: t("Beerakaya (Ridge Gourd)", "బీరకాయ"), benefits: [
          { benefitLabel: t("Hydration", "Body ని Hydrated గా ఉంచుతుంది"), iconKey: "water" },
          { benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" },
        ] },
        { ingredient: t("Curd", "పెరుగు"), benefits: [{ benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" }] },
      ],
      groceryListAvailable: true,
    },
    eveningSnack: {
      name: t("Boiled Chana with Onion & Lemon", "ఉడికించిన శనగలు"),
      imageUrl: imgBoiledChanaOnionLemon,
      precautions: t(
        "Take a smaller portion if you have gas or bloating. If you have IBS, consult your doctor before consuming regularly.",
        "Gas లేదా Bloating ఉంటే, మొదట తక్కువ quantity తో ప్రారంభించండి."
      ),
      nutritionalBenefits: [
        { ingredient: same("Chana"), benefits: [
          { benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" },
          { benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" },
          { benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" },
          { benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
        ] },
        { ingredient: same("Onion"), benefits: [
          // Figma 1398:35145 (Telugu) has no row for these two — English-only, per 924:21411.
          { benefitLabel: same("Anti-inflammatory Support"), iconKey: "anti-inflammatory", visibleLanguages: ["English"] },
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food", visibleLanguages: ["English"] },
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
        ] },
        { ingredient: same("Lemon"), benefits: [{ benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" }] },
      ],
      groceryListAvailable: true,
    },
    dinner: {
      // Figma 1331:17109 (English) / 1398:35145 (Telugu) spell this "Uthappam" (single t) —
      // transcribed as-authored, not reconciled with 2026-08-09's "Uttappam" spelling for
      // the same dish/photo.
      name: t("Mixed Vegetable Uthappam & Tomato Chutney", "Mixed vegetable ఉత్తప్పం & టమాటా చట్నీ"),
      imageUrl: imgMixedVegetableUttappamTomatoChutney,
      tips: t(
        "Pour a thick batter onto the pan, add vegetables on top, and cook slowly on both sides for a soft texture.",
        "Batter ని కొంచెం మందంగా pan పై పోసి, పైన vegetables వేసి, రెండు వైపులా నెమ్మదిగా కాల్చండి.."
      ),
      precautions: t(
        "For People with Diabetes, practice portion control as uthappam has a moderate glycemic index (GI).",
        "Diabetes ఉన్నవారు ఉత్తప్పం తినేటప్పుడు portion control చూసుకోండి"
      ),
      nutritionalBenefits: [
        { ingredient: t("Uthappam", "ఉత్తప్పం"), benefits: [{ benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" }] },
        { ingredient: same("Mixed Vegetables"), benefits: [{ benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" }] },
        // Figma 1398:35145 (Telugu) has no card for Tomato at all — English-only.
        { ingredient: t("Tomato", "టమాటా"), benefits: [{ benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food" }], visibleLanguages: ["English"] },
      ],
      groceryListAvailable: true,
    },
    nightDrink: {
      name: t("Turmeric Milk", "పసుపు పాలు"),
      imageUrl: imgTurmericMilk,
      tips: t("Heat milk with turmeric and a pinch of pepper for 3–4 minutes.", "Milk లో పసుపు, చిటికెడు మిరియాల పొడి వేసి 3–4 minutes వేడి చేసి గోరువెచ్చగా తాగండి."),
      // Telugu precautions (1398:35145) only carry the sleep-hygiene sentence, dropping the
      // "avoid mobile phones" clause English has — transcribed as-authored, not padded out.
      precautions: t(
        "Avoid mobile phones or TV after 9:30 PM and aim for 7 hours of sound sleep (10:00 PM–5:00 AM).",
        "7 గంటలు ప్రశాంతంగా నిద్రపోండి (రాత్రి 10:00 PM – ఉదయం 5:00 AM)."
      ),
      nutritionalBenefits: [
        { ingredient: same("Turmeric"), benefits: [{ benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" }] },
        { ingredient: t("Milk", "పాలు"), benefits: [{ benefitLabel: t("Bone Strength", "Bone health కి మంచిది"), iconKey: "dog-bone" }] },
      ],
      groceryListAvailable: true,
    },
  },
  // 2026-08-14: real Telugu (Figma 1430:52221, parent "M1W1-Telugu" 1398:33383) — every
  // field matched the English design exactly except nightDrink's precautions (see below).
  "2026-08-14": {
    earlyMorning: {
      name: t("Soaked Walnuts", "నానబెట్టిన walnuts"),
      imageUrl: imgSoakedWalnuts,
      items: [{ label: same("5 Walnuts") }],
      tips: t("Soak 5 walnuts overnight and eat them in the morning.", "5 walnuts ని రాత్రంతా నానబెట్టి, ఉదయం తినండి."),
      recommendedQuantity: [{ ingredient: same("Walnuts"), qty: same("5 pcs") }],
      nutritionalBenefits: [
        { ingredient: same("Walnuts"), benefits: [{ benefitLabel: t("Heart Health", "Heart health కి మంచిది"), iconKey: "heart" }] },
      ],
      groceryListAvailable: true,
    },
    postYogaDrink: {
      name: t("Warm Milk", "గోరువెచ్చని పాలు"),
      imageUrl: imgWarmMilk,
      tips: t(
        "Drink 1 cup of warm milk in the morning for a nourishing start to the day.",
        "ఉదయం 1 cup గోరువెచ్చని milk తాగితే, day healthy గా start అవుతుంది."
      ),
      nutritionalBenefits: [
        { ingredient: same("Milk"), benefits: [{ benefitLabel: t("Bone Strength", "Bone health కి మంచిది"), iconKey: "dog-bone" }] },
      ],
      groceryListAvailable: true,
    },
    breakfast: {
      name: t("Paneer Vegetable Bhurji & a Small Phulka", "పనీర్ vegetable భుర్జీ & ఫుల్కా"),
      imageUrl: imgPaneerVegetableBhurjiPhulka,
      items: [{ label: same("1 small Phulka") }],
      precautions: t("For People with High Cholesterol, limit the paneer portion.", "High Cholesterol ఉన్నవారు Paneer ని limit గా తీసుకోండి."),
      recommendedQuantity: [{ ingredient: same("Phulka"), qty: same("1 small") }],
      nutritionalBenefits: [
        { ingredient: same("Paneer"), benefits: [
          { benefitLabel: t("Muscle Health", "Muscle health ని పెంచుతుంది"), iconKey: "muscle-health" },
          { benefitLabel: t("Bone Health", "Bone health కి మంచిది"), iconKey: "dog-bone" },
        ] },
        { ingredient: same("Mixed Vegetables"), benefits: [{ benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" }] },
        { ingredient: same("Phulka"), benefits: [{ benefitLabel: t("Sustained Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" }] },
      ],
      groceryListAvailable: true,
    },
    morningSnack: {
      name: t("Apple & Soaked Black Raisins", "Apple & నానబెట్టిన కిస్‌మిస్"),
      imageUrl: imgAppleSoakedBlackRaisins,
      items: [{ label: same("1 Apple") }, { label: same("6 Black Raisins") }],
      tips: t(
        "Soak the black raisins overnight for better nutrient absorption.",
        "Black కిస్‌మిస్ ని రాత్రంతా నానబెట్టి, ఉదయం తింటే nutrients బాగా absorb అవుతాయి"
      ),
      precautions: t(
        "For People with Diabetes, limit the portion to ½ an apple and 4 soaked black raisins.",
        "Diabetes ఉన్నవారు ½ apple మరియు 4 black కిస్‌మిస్ మాత్రమే తీసుకోండి."
      ),
      recommendedQuantity: [
        { ingredient: same("Apple"), qty: same("1") },
        { ingredient: t("Black Raisins", "Black కిస్‌మిస్"), qty: same("6 pcs") },
      ],
      nutritionalBenefits: [
        { ingredient: same("Apple"), benefits: [{ benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" }] },
        { ingredient: t("Black Raisins", "Black కిస్‌మిస్"), benefits: [
          { benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" },
          { benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
        ] },
      ],
      groceryListAvailable: true,
    },
    lunch: {
      name: t("Steamed Rice, Drumsticks Dal, French beans curry & Curd", "అన్నం, మునగకాయ పప్పు, బీన్స్ కూర & పెరుగు"),
      imageUrl: imgSteamedRiceDrumsticksDalFrenchBeansCurryCurd,
      precautions: t(
        "For People with Diabetes, practice portion control with white rice.",
        "Diabetes ఉన్నవారు అన్నం ని 150g వరకు మాత్రమే తీసుకోండి. ఎక్కువ oil వాడకండి."
      ),
      nutritionalBenefits: [
        { ingredient: same("Rice"), benefits: [{ benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" }] },
        { ingredient: same("Drumsticks"), benefits: [
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
          { benefitLabel: t("Bone Health", "Bone health కి మంచిది"), iconKey: "dog-bone" },
        ] },
        { ingredient: same("French beans"), benefits: [
          { benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" },
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
        ] },
        { ingredient: same("Curd"), benefits: [{ benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" }] },
      ],
      groceryListAvailable: true,
    },
    eveningSnack: {
      name: t("Boiled Sweet Potato & Pepper", "ఉడికించిన చిలగడదుంప"),
      imageUrl: imgBoiledSweetPotatoPepper,
      precautions: t("For People with Diabetes, consume a small portion.", "Diabetes ఉన్నవారు తక్కువ portion మాత్రమే తీసుకోండి."),
      nutritionalBenefits: [
        { ingredient: t("Sweet Potato", "చిలగడదుంప"), benefits: [
          { benefitLabel: t("Sustained Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
        ] },
      ],
      groceryListAvailable: true,
    },
    dinner: {
      name: t("Ragi Mudda & Drumsticks Dal", "రాగి ముద్ద & మునగకాయ పప్పు"),
      imageUrl: imgRagiMuddaDrumsticksDal,
      // Telugu precautions (1430:52221) drop the "Gas Issues" clause English has —
      // transcribed as-authored, not padded out.
      precautions: t(
        "For Thyroid Concerns, consume ragi in moderation. For Gas Issues, start with a small portion.",
        "Thyroid సమస్యలు ఉన్నవారు రాగి ని limit గా తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Ragi", "రాగి ముద్ద"), benefits: [{ benefitLabel: t("Bone Health", "Bone health కి మంచిది"), iconKey: "dog-bone" }] },
        { ingredient: t("Drumsticks", "మునగకాయ"), benefits: [
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
          { benefitLabel: t("Bone Health", "Bone health కి మంచిది"), iconKey: "dog-bone" },
        ] },
      ],
      groceryListAvailable: true,
    },
    nightDrink: {
      // Figma 1430:52221 (Telugu) has only a Tips box for this dish (no separate
      // Precautions box at all) whose text is the standard sleep-hygiene message —
      // mapped to `tips` here since that's the box it actually lives in. `precautions`
      // has no Telugu equivalent authored for this dish, so it stays `pending()`
      // (English duplicated) rather than guessing a translation that doesn't exist.
      name: t("Warm Green Tea", "Warm Green Tea"),
      imageUrl: imgWarmGreenTea,
      tips: t("Avoid mobile phones or TV after 9:30 PM.", "7 గంటలు ప్రశాంతంగా నిద్రపోండి (రాత్రి 10:00 PM – ఉదయం 5:00 AM)."),
      precautions: pending("For Better Sleep, choose a caffeine-free green tea alternative or avoid caffeine in the evening."),
      nutritionalBenefits: [
        { ingredient: same("Green Tea"), benefits: [
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
          { benefitLabel: t("Relaxation", "Relax గా ఉంటుంది."), iconKey: "meditation" },
        ] },
      ],
      groceryListAvailable: true,
    },
  },
  // 2026-08-15: real Telugu (Figma 1430:52837, parent "M1W1-Telugu" 1398:33383).
  "2026-08-15": {
    earlyMorning: {
      name: same("Sunflower Seeds"),
      imageUrl: imgSunflowerSeeds,
      items: [{ label: same("1 tbsp") }],
      tips: t("Enjoy them lightly roasted or soaked overnight.", "Light గా roast చేసి లేదా రాత్రంతా నానబెట్టి తీసుకోండి."),
      recommendedQuantity: [{ ingredient: same("Sunflower Seeds"), qty: same("1 tbsp") }],
      nutritionalBenefits: [
        { ingredient: same("Sunflower Seeds"), benefits: [
          // Figma 1430:52837 (Telugu) shows a Healthy Skin row here instead — same swap as
          // 2026-08-04's Sunflower Seeds.
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food", visibleLanguages: ["English"] },
          { benefitLabel: t("Healthy Skin", "Skin కు మంచిది"), iconKey: "healthy-skin", visibleLanguages: ["Telugu"] },
        ] },
      ],
      groceryListAvailable: true,
    },
    postYogaDrink: {
      name: t("Vegetable Juice (Carrot, Tomato & Ginger)", "Vegetable Juice (క్యారెట్, టమాటా & అల్లం)"),
      imageUrl: imgVegetableJuiceCarrotTomatoGinger,
      precautions: t(
        "For People with Acidity, reduce the quantity of ginger. In case of Diabetes, limit the juice to 100–150 ml.",
        "Acidity ఉన్నవారు అల్లం ని తక్కువగా తీసుకోండి. Diabetes ఉన్నవారు juice ని 100–150 ml వరకు మాత్రమే తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Carrot", "క్యారెట్"), benefits: [
          { benefitLabel: t("Eye Health", "Eyes కి మంచిది"), iconKey: "eye-health" },
          // Figma 1430:52837 (Telugu) has no row for this — English-only, per 924:21411.
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food", visibleLanguages: ["English"] },
        ] },
        // Figma 1430:52837 (Telugu) has no card for Tomato at all — English-only.
        { ingredient: t("Tomato", "టమాటా"), benefits: [{ benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food" }], visibleLanguages: ["English"] },
        { ingredient: t("Ginger", "అల్లం"), benefits: [{ benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" }] },
      ],
      groceryListAvailable: true,
    },
    breakfast: {
      name: t("Onion Uthappam & Peanut Chutney", "Onion ఉత్తప్పం & వేరుశెనగ చట్నీ"),
      imageUrl: imgOnionUthappamPeanutChutney,
      tips: t("Use minimal oil while preparing the uttappam.", "ఉత్తప్పం తయారు చేసేటప్పుడు తక్కువ oil వాడండి (1-2tsp)"),
      precautions: t(
        "For People with Diabetes, limit the portion to 1 medium uttappam.",
        "Diabetes ఉన్నవారు ఒకసారి 1 -2 small ఉత్తప్పం మాత్రమే తినండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Uthappam", "ఉత్తప్పం"), benefits: [{ benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" }] },
        { ingredient: t("Peanut Chutney", "వేరుశెనగ చట్నీ"), benefits: [{ benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" }] },
      ],
      groceryListAvailable: true,
    },
    morningSnack: {
      name: t("Jamun", "నేరేడు పండ్లు"),
      imageUrl: imgJamun,
      items: [{ label: same("1 Bowl") }],
      precautions: t(
        "For people with Diabetes, limit the portion to 8–10 jamuns (approximately 100 g) per serving.",
        "Diabetes ఉన్నవారు ఒకసారి 8–10 నేరేడు పండ్లు (సుమారు 100g) మాత్రమే తీసుకోండి."
      ),
      recommendedQuantity: [{ ingredient: t("Jamun", "నేరేడు"), qty: same("1 Bowl") }],
      nutritionalBenefits: [
        { ingredient: t("Jamun", "నేరేడు"), benefits: [
          { benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" },
          // Figma 1430:52837 (Telugu) has no row for this — English-only, per 924:21411.
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food", visibleLanguages: ["English"] },
          { benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" },
        ] },
      ],
      groceryListAvailable: true,
    },
    lunch: {
      // Telugu title (పులిహోర & vegetable చట్నీ) only names the tamarind-rice option and a
      // plain "vegetable chutney", not "traditional chutney" — transcribed as-authored.
      name: t("Tamarind Rice or Lemon Rice with traditional chutney", "పులిహోర & vegetable చట్నీ"),
      imageUrl: imgTamarindLemonRiceTraditionalChutney,
      // Telugu precautions (1430:52837) only carry the acid-reflux clause, dropping the
      // diabetes/portion-control sentence English has — transcribed as-authored.
      precautions: t(
        "In Acid Reflux, prefer lemon rice instead of tamarind rice. For Diabetes, practice portion control with rice.",
        "Acid Reflux ఉన్నవారు పులిహోర కంటే నిమ్మకాయ అన్నం తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Tamarind Rice / Lemon Rice", "పులిహోర"), benefits: [
          { benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
        ] },
        { ingredient: same("Peanuts"), benefits: [{ benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" }] },
      ],
      groceryListAvailable: true,
    },
    eveningSnack: {
      name: t("Cucumber Carrot Salad with Lemon", "దోసకాయ, క్యారెట్ సలాడ్"),
      imageUrl: imgCucumberCarrotSaladLemon,
      tips: t("Sprinkle a pinch of salt and pepper for added taste.", "రుచి కోసం చిటికెడు salt మరియు pepper చల్లుకోండి."),
      nutritionalBenefits: [
        { ingredient: t("Cucumber", "దోసకాయ"), benefits: [
          { benefitLabel: t("Hydration", "Body ని Hydrated గా ఉంచుతుంది"), iconKey: "water" },
          { benefitLabel: t("Cooling", "Body న్ని cool గా ఉంచుతుంది"), iconKey: "snowflake" },
        ] },
        { ingredient: t("Carrot", "క్యారెట్"), benefits: [
          { benefitLabel: t("Eye Health", "Eyes కి మంచిది"), iconKey: "eye-health" },
          // Figma 1430:52837 (Telugu) has no row for this — English-only, per 924:21411.
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food", visibleLanguages: ["English"] },
        ] },
        { ingredient: same("Lemon"), benefits: [{ benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" }] },
      ],
      groceryListAvailable: true,
    },
    dinner: {
      name: t("Vegetable Chapati Roll (Carrot, Capsicum & Beans)", "Vegetable చపాతీ roll (క్యారెట్, క్యాప్సికమ్ & బీన్స్)"),
      imageUrl: imgVegetableChapatiRollCarrotCapsicumBeans,
      tips: t("Avoid using excess oil or sauces.", "ఎక్కువ oil లేదా sauces వాడకండి."),
      precautions: t(
        "For Thyroid Concerns, avoid raw cabbage. Instead, use carrot, capsicum, beans, or bottle gourd as the stuffing.",
        "Thyroid ఉన్నవారు పచ్చి cabbage వాడకండి. బదులుగా క్యారెట్, capsicum, బీన్స్ లేదా సొరకాయ ని stuffing గా వాడండి."
      ),
      nutritionalBenefits: [
        { ingredient: same("Mixed Vegetables"), benefits: [{ benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" }] },
        { ingredient: same("Chapati"), benefits: [{ benefitLabel: t("Sustained Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" }] },
      ],
      groceryListAvailable: true,
    },
    nightDrink: {
      name: same("Elaichi Milk"),
      imageUrl: imgElaichiMilk,
      precautions: t(
        "Use only 2 elaichi pods. Don’t add sugar, especially if you have diabetes. If lactose intolerant, choose a plant-based milk.",
        "2 యాలకులు మాత్రమే వాడండి. Sugar వేయకండి, ముఖ్యంగా Diabetes ఉన్నవారు."
      ),
      nutritionalBenefits: [
        { ingredient: same("Elaichi Milk"), benefits: [
          { benefitLabel: t("Bone Health", "Bone health కి మంచిది"), iconKey: "dog-bone" },
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
          // Figma 1430:52837 (Telugu) has no row for this — English-only, per 924:21411.
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food", visibleLanguages: ["English"] },
          { benefitLabel: t("Oral Health", "Oral health కి మంచిది"), iconKey: "oral-health" },
        ] },
      ],
      groceryListAvailable: true,
    },
  },
  // 2026-08-16: Figma literally shows Breakfast starting at 06:30AM (overlapping the Post
  // Yoga Drink slot) despite that slot also having its own card — transcribed as-authored,
  // not "fixed" to the usual 07:30AM start.
  // 2026-08-16: real Telugu (Figma 1430:53435, parent "M1W1-Telugu" 1398:33383). Figma
  // literally shows Breakfast starting at 06:30AM (overlapping the Post Yoga Drink slot)
  // despite that slot also having its own card, in both languages — transcribed
  // as-authored, not "fixed" to the usual 07:30AM start.
  "2026-08-16": {
    earlyMorning: {
      name: t("Soaked Raisins", "Soaked కిస్‌మిస్"),
      imageUrl: imgSoakedRaisins,
      items: [{ label: same("5 Raisins") }],
      tips: t("Soak 5 raisins overnight and eat them in the morning.", "5 కిస్‌మిస్ రాత్రంతా నానబెట్టి తీసుకోండి."),
      precautions: t(
        "For people with Diabetes, limit the quantity of raisins due to their high sugar content.",
        "Diabetes ఉన్నవారు Blood sugar levels పెరగకుండా limit చేసుకోవాలి."
      ),
      recommendedQuantity: [{ ingredient: t("Soaked Raisins", "Soaked కిస్‌మిస్"), qty: same("5 pcs") }],
      nutritionalBenefits: [
        { ingredient: t("Raisins", "కిస్‌మిస్"), benefits: [
          { benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
          { benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" },
        ] },
      ],
      groceryListAvailable: true,
    },
    postYogaDrink: {
      name: same("Tender Coconut Water"),
      imageUrl: imgTenderCoconutWater,
      precautions: t(
        "For people with Diabetes, limit the quantity as coconut water contains natural sugars.",
        "Diabetes ఉన్నవారు కొబ్బరి నీరు ని Limit గా తీసుకోండి. ఇందులో natural sugars ఉంటాయి"
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
      // Telugu title (Vegetable Poha) drops the "with Peanuts & Curry Leaves" qualifier —
      // transcribed as-authored.
      name: t("Vegetable Poha with Peanuts & Curry Leaves", "Vegetable Poha"),
      imageUrl: imgVegetablePohaPeanutsCurryLeaves,
      timeRangeLabel: "06:30AM - 09:30AM",
      tips: t("Use minimal oil while preparing the poha.", "పోహా చేసేటప్పుడు తక్కువ oil వాడండి."),
      precautions: t("For People with Diabetes, limit the portion to 150 g.", "Diabetes ఉన్నవారు పోహా ని 150g వరకు మాత్రమే తీసుకోండి."),
      nutritionalBenefits: [
        { ingredient: same("Poha"), benefits: [
          { benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
        ] },
        { ingredient: same("Peanuts"), benefits: [{ benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" }] },
        { ingredient: same("Vegetables"), benefits: [{ benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" }] },
      ],
      groceryListAvailable: true,
    },
    morningSnack: {
      name: t("Guava", "జామ పండు"),
      imageUrl: imgGuava,
      items: [{ label: same("1 Medium Fruit") }],
      precautions: t(
        "For people with Diabetes, consume 1/2 guava per serving. Avoid adding salt or sugar.",
        "Diabetes ఉన్నవారు ½ జామ పండు మాత్రమే తినండి. Salt లేదా Sugar కలపకండి"
      ),
      nutritionalBenefits: [
        { ingredient: t("Guava", "జామ పండు"), benefits: [
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
          { benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" },
          // Figma 1430:53435 (Telugu) has no row for these two — English-only, per 924:21411.
          { benefitLabel: t("Healthy Blood Sugar", "ఆరోగ్యకరమైన రక్తంలో చక్కెర అందిస్తుంది"), iconKey: "sugar-cubes", visibleLanguages: ["English"] },
          // Telugu-only: this Guava card's "sugar" row shows a Supports Hemoglobin benefit
          // instead — same swap seen on 2026-08-12's Cinnamon and 2026-08-13's Guava.
          { benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin", visibleLanguages: ["Telugu"] },
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food", visibleLanguages: ["English"] },
          { benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" },
        ] },
      ],
      recommendedQuantity: [{ ingredient: t("Guava", "జామ పండు"), qty: same("1") }],
      groceryListAvailable: true,
    },
    lunch: {
      name: t("Rice, Rasam & Soya Chunks Curry", "అన్నం, రసం & సోయా కూర"),
      imageUrl: imgRiceRasamSoyaChunksCurry,
      tips: t(
        "Avoid excess soya. Choose moong dal or paneer curry as alternatives.",
        "సోయా ని ఎక్కువగా తీసుకోకండి. బదులుగా పెసరపప్పు లేదా Paneer Curry తీసుకోవచ్చు."
      ),
      precautions: t(
        "In Diabetes, practice portion control with rice. People with Gas or Bloating, consume soya chunks in moderation.",
        "Diabetes ఉన్నవారు అన్నం తినేటప్పుడు portion control పాటించండి. Gas లేదా Bloating ఉంటే, సోయా చంక్స్ ని limit గా తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: same("Rice"), benefits: [{ benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" }] },
        { ingredient: same("Rasam"), benefits: [{ benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" }] },
        { ingredient: t("Soya Chunks", "సోయా కూర"), benefits: [{ benefitLabel: t("Muscle Health", "Muscle health ని పెంచుతుంది"), iconKey: "muscle-health" }] },
      ],
      groceryListAvailable: true,
    },
    eveningSnack: {
      name: t("Jaggery Nuts Laddu", "బెల్లం nuts లడ్డు"),
      imageUrl: imgJaggeryNutsLaddu,
      items: [{ label: same("1 small Laddu") }],
      precautions: t(
        "In Diabetes, avoid or consume only a very small portion. For weight loss, enjoy occasionally due to calories.",
        "Diabetes ఉన్నవారు తక్కువ portion లో మాత్రమే తీసుకోండి. Weight loss కోసం అప్పుడప్పుడు మాత్రమే తినండి."
      ),
      recommendedQuantity: [{ ingredient: t("Laddu", "లడ్డు"), qty: same("1 small") }],
      nutritionalBenefits: [
        { ingredient: t("Jaggery", "బెల్లం"), benefits: [{ benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" }] },
        { ingredient: same("Nuts"), benefits: [{ benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" }] },
      ],
      groceryListAvailable: true,
    },
    dinner: {
      name: t("Tomato Rice & Soya Chunks Curry", "టమాటా rice & సోయా కూర"),
      imageUrl: imgTomatoRiceSoyaChunksCurry,
      precautions: t(
        "For People with Thyroid Concerns, avoid consuming excess soya regularly.",
        "Thyroid - సోయా ని ఎక్కువగా తీసుకోకండి"
      ),
      nutritionalBenefits: [
        // Figma 1430:53435 (Telugu) has no card for Tomato at all — English-only.
        { ingredient: t("Tomato", "టమాటా"), benefits: [{ benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food" }], visibleLanguages: ["English"] },
        { ingredient: same("Soya Chunks"), benefits: [{ benefitLabel: t("Muscle Health", "Muscle health ని పెంచుతుంది"), iconKey: "muscle-health" }] },
      ],
      groceryListAvailable: true,
    },
    nightDrink: {
      name: t("Tulasi Tea", "తులసి టీ"),
      imageUrl: imgTulasiTea,
      tips: t("Boil tulasi leaves in water for 5 minutes, strain, and drink warm.", "తులసి ఆకులు ని water లో 5 minutes మరిగించి, వడకట్టి గోరువెచ్చగా తాగండి."),
      nutritionalBenefits: [
        { ingredient: t("Tulasi Tea", "తులసి టీ"), benefits: [
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
          { benefitLabel: t("Relaxation", "Relax గా ఉంటుంది."), iconKey: "meditation" },
          // Figma 1430:53435 (Telugu) has no row for this — English-only, per 924:21411.
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food", visibleLanguages: ["English"] },
        ] },
      ],
      groceryListAvailable: true,
    },
  },
  // 2026-08-17 through 2026-08-23 — transcribed from the nutrition team's Google Sheet
  // ("M2W2" tab), not a Figma detail screen — no per-meal photography exists yet, so
  // `imageUrl` is omitted throughout; the UI falls back to the category-icon placeholder.
  // The sheet's own ingredient→benefit lookup table has several real data-entry bugs
  // (duplicated/misaligned Telugu cells, missing translations for some benefits) — noted
  // per-row below where a benefit is marked `visibleLanguages` for that reason, and a
  // couple of English/Telugu benefit-label mismatches are transcribed as-authored (same
  // convention already used elsewhere in this file, e.g. 2026-08-12's Cinnamon).
  "2026-08-17": {
    earlyMorning: {
      name: t("Soaked Pistachios & Dates", "నానబెట్టిన పిస్తా & ఖర్జూరం"),
      items: [{ label: same("3 Pistachios") }, { label: same("2 Dates") }],
      tips: t("Soak pistachios & dates overnight and take them in the morning.", "పిస్తా & ఖర్జూరాలను రాత్రి soak చేసి morning తీసుకోండి."),
      precautions: t(
        "If you have diabetes, limit dates to 1–2 and do not add extra dried fruits.",
        "Diabetes ఉన్నవారు dates ని 1–2 వరకే తీసుకుని extra dried fruits తీసుకోకండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Dates", "ఖర్జూరం"), benefits: [
          { benefitLabel: t("Heart Health", "Heart health కి మంచిది"), iconKey: "heart" },
          { benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
        ] },
        { ingredient: t("Pistachios", "పిస్తా"), benefits: [{ benefitLabel: t("Heart Health", "Heart health కి మంచిది"), iconKey: "heart" }] },
      ],
      groceryListAvailable: true,
    },
    postYogaDrink: {
      name: t("Thin Buttermilk with Curry Leaves & Jeera", "కరివేపాకు & జీలకర్ర మజ్జిగ"),
      tips: t("Take 1 glass thin buttermilk with curry leaves and a pinch of jeera.", "1 glass thin మజ్జిగలో కరివేపాకు & a pinch జీలకర్ర వేసుకుని తీసుకోండి."),
      precautions: t("For BP, avoid extra salt.", "BP ఉన్నవారు added salt తీసుకోకండి."),
      nutritionalBenefits: [
        { ingredient: t("Curd", "పెరుగు"), benefits: [{ benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" }] },
      ],
      groceryListAvailable: true,
    },
    breakfast: {
      name: t("Bajra Vegetable Upma", "సజ్జ vegetable ఉప్మా"),
      tips: t("Take 1 medium bowl bajra upma with at least 1/2 cup vegetables.", "1 medium bowl సజ్జ ఉప్మాతో కనీసం 1/2 cup vegetables తీసుకోండి."),
      precautions: t(
        "For diabetes, keep the portion moderate and take more vegetables.",
        "Diabetes ఉన్నవారు portion moderate గా ఉంచి vegetables ఎక్కువగా తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Millet", "మిల్లెట్స్"), benefits: [
          { benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" },
          { benefitLabel: t("Manages Blood Sugar levels", "Blood sugar levels ని manage చేస్తుంది."), iconKey: "sugar-cubes" },
        ] },
        { ingredient: t("Mixed Vegetables", "Mixed వెజిటబుల్స్"), benefits: [{ benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" }] },
      ],
      groceryListAvailable: true,
    },
    morningSnack: {
      name: t("Green Grapes", " ద్రాక్ష"),
      items: [{ label: same("1 Cup") }],
      tips: t("Take about 1 cup green grapes as a whole fruit.", "సుమారు 1 cup పచ్చ ద్రాక్షను whole fruit గా తీసుకోండి."),
      precautions: t("If you have diabetes, keep the portion to about 1/2 cup.", "Diabetes ఉన్నవారు సుమారు 1/2 cup వరకే తీసుకోండి."),
      recommendedQuantity: [{ ingredient: t("Green Grapes", "పచ్చ ద్రాక్ష"), qty: same("1 Cup") }],
      nutritionalBenefits: [
        { ingredient: t("Green Grapes", "పచ్చ ద్రాక్ష"), benefits: [
          { benefitLabel: t("Hydration", "Body ని Hydrated గా ఉంచుతుంది"), iconKey: "water" },
          { benefitLabel: t("Antioxidant Protection", "Immunity ని పెంచుతుంది"), iconKey: "healthy-food" },
        ] },
      ],
      groceryListAvailable: true,
    },
    lunch: {
      name: t("Rice, Palak Dal, Carrot Coconut Curry & Curd", "అన్నం, పాలకూర పప్పు, క్యారెట్ కొబ్బరి కూర & పెరుగు"),
      tips: t("Adjust the rice portion based on your hunger and activity.", "మీ ఆకలి, activity బట్టి rice portion adjust చేసుకోండి."),
      precautions: t("For diabetes, do not take more than 150 g cooked rice.", "Diabetes ఉన్నవారు 150 g కంటే ఎక్కువ cooked rice తీసుకోకండి."),
      nutritionalBenefits: [
        { ingredient: same("Rice"), benefits: [{ benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" }] },
        { ingredient: t("Palak", "పాలకూర"), benefits: [
          { benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" },
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
        ] },
      ],
      groceryListAvailable: true,
    },
    eveningSnack: {
      name: t("Mixed Vegetable Soup", "Mixed vegetable సూప్"),
      precautions: t("For BP, keep salt low and avoid cream or butter.", "BP ఉన్నవారు salt తక్కువగా ఉంచి cream లేదా butter add చేయకండి."),
      nutritionalBenefits: [
        { ingredient: t("Mixed Vegetables", "Mixed వెజిటబుల్స్"), benefits: [{ benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" }] },
      ],
      groceryListAvailable: true,
    },
    dinner: {
      name: t("Green Salad with Cucumber & Sprouts", "కీరదోసకాయ & మొలకల salad"),
      tips: t("Take 1 cup salad with cucumber, sprouts and lemon.", "1 cup cucumber, sprouts salad కి lemon add చేసుకుని తీసుకోండి."),
      precautions: t("If you have gas or bloating, start with 1/2 cup sprouts.", "Gas లేదా bloating ఉంటే 1/2 cup sprouts తో start చేయండి."),
      nutritionalBenefits: [
        { ingredient: t("Cucumber", "కీరదోసకాయ"), benefits: [
          { benefitLabel: t("Hydration", "Body ని Hydrated గా ఉంచుతుంది"), iconKey: "water" },
          { benefitLabel: t("Cooling", "Body న్ని cool గా ఉంచుతుంది"), iconKey: "snowflake", visibleLanguages: ["English"] },
        ] },
        { ingredient: t("Sprouts", "మొలకలు"), benefits: [
          { benefitLabel: t("Protein-Rich", "Protein ఎక్కువగా ఉంటుంది"), iconKey: "muscle-health" },
          { benefitLabel: t("Healthy Metabolism", "Metabolism ని పెంచుతుంది"), iconKey: "healthy-eating" },
          { benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" },
        ] },
      ],
      groceryListAvailable: true,
    },
    nightDrink: {
      name: t("Warm Ginger Herbal Tea", "వేడి అల్లం టీ"),
      tips: t("Take 1 cup warm ginger herbal tea without sugar.", "1 cup warm ginger herbal tea ని sugar లేకుండా తీసుకోండి."),
      precautions: t("Avoid sugar or honey, especially if you have diabetes.", "Diabetes ఉన్నవారు sugar లేదా honey add చేయకండి."),
      nutritionalBenefits: [
        { ingredient: t("Ginger", "అల్లం"), benefits: [
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food", visibleLanguages: ["English"] },
        ] },
      ],
      groceryListAvailable: true,
    },
  },
  "2026-08-18": {
    earlyMorning: {
      name: t("Soaked Watermelon Seeds", "నానబెట్టిన పుచ్చకాయ గింజలు"),
      items: [{ label: same("1 tbsp") }],
      tips: t("Soak 1 tbsp watermelon seeds overnight and take them in the morning.", "1 tbsp పుచ్చకాయ గింజలను రాత్రి soak చేసి morning తీసుకోండి."),
      precautions: t("Choose unsalted seeds if you have BP.", "BP ఉన్నవారు salt లేని seeds తీసుకోండి."),
      recommendedQuantity: [{ ingredient: t("Watermelon Seeds", "పుచ్చకాయ గింజలు"), qty: same("1 tbsp") }],
      nutritionalBenefits: [
        // Sheet's ingredient row gives Antioxidant Protection in English only and, oddly,
        // two different Telugu-only benefits (Healthy Metabolism + Cooling) — transcribed
        // as separate rows per language rather than forcing a 1:1 match that isn't there.
        { ingredient: t("Watermelon Seeds", "పుచ్చకాయ గింజలు"), benefits: [
          { benefitLabel: same("Antioxidant Protection"), iconKey: "healthy-food", visibleLanguages: ["English"] },
          { benefitLabel: t("Healthy Metabolism", "Metabolism ని పెంచుతుంది"), iconKey: "healthy-eating", visibleLanguages: ["Telugu"] },
          { benefitLabel: t("Cooling", "Body న్ని cool గా ఉంచుతుంది"), iconKey: "snowflake", visibleLanguages: ["Telugu"] },
        ] },
      ],
      groceryListAvailable: true,
    },
    postYogaDrink: {
      name: t("Green Juice with Chia", "చియా seeds తో Green జ్యూస్"),
      tips: t(
        "Blend coriander, amla, mint & lemon with 1 tsp soaked chia; do not add sugar.",
        "కొత్తిమీర, ఉసిరికాయ, పుదీనా & lemon తో 1 tsp soaked chia blend చేసి sugar add చేయకండి."
      ),
      precautions: t("If you have diabetes, keep it to 1 small glass and avoid honey.", "Diabetes ఉన్నవారు 1 small glass వరకే తీసుకుని honey add చేయకండి."),
      nutritionalBenefits: [
        { ingredient: t("Amla Water", "ఉసిరి నీళ్లు"), benefits: [{ benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" }] },
        { ingredient: t("Mint", "పుదీనా"), benefits: [{ benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" }] },
      ],
      groceryListAvailable: true,
    },
    breakfast: {
      name: t("Sabudana Salad with Peanuts", "పల్లీలు సగ్గుబియ్యం సలాడ్"),
      tips: t(
        "Take 1 medium cup cooked sabudana with 1 tbsp peanuts and vegetables.",
        "1 medium cup cooked సగ్గుబియ్యంతో 1 tbsp పల్లీలు మరియు vegetables తీసుకోండి."
      ),
      precautions: t("For diabetes or PCOS, keep sabudana moderate.", "Diabetes లేదా PCOS ఉన్నవారు sabudana portion moderate గా ఉంచండి."),
      nutritionalBenefits: [
        { ingredient: t("Peanuts", "పల్లీలు"), benefits: [{ benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" }] },
      ],
      groceryListAvailable: true,
    },
    morningSnack: {
      name: same("Pineapple"),
      items: [{ label: same("1 Cup") }],
      tips: t("Take fresh pineapple as a whole fruit.", "fresh pineapple whole fruit గా తీసుకోండి."),
      precautions: t("If you have diabetes, keep it to about 2-3 small peices cup and avoid sugar.", "Diabetes ఉన్నవారు 2-3 peices  వరకే తీసుకుని sugar add చేయకండి."),
      recommendedQuantity: [{ ingredient: same("Pineapple"), qty: same("1 Cup") }],
      nutritionalBenefits: [
        { ingredient: same("Pineapple"), benefits: [
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
          { benefitLabel: same("Antioxidant Protection"), iconKey: "healthy-food", visibleLanguages: ["English"] },
        ] },
      ],
      groceryListAvailable: true,
    },
    lunch: {
      name: t("Tomato Rice & Cucumber Raita", "టమాటా rice & కీరదోసకాయ raita"),
      tips: t("Take more raita and vegetables.", "Raita మరియు vegetables ఎక్కువగా తీసుకోండి."),
      precautions: t(
        "For diabetes, do not take more than 150 g cooked rice. For BP, keep salt low.",
        "Diabetes ఉన్నవారు 150 g కంటే ఎక్కువ cooked rice తీసుకోకండి. BP ఉన్నవారు salt తక్కువగా ఉంచండి."
      ),
      nutritionalBenefits: [
        // Sheet's Telugu benefit cell for tomato translates to "Metabolism" rather than
        // "Antioxidant Protection" — an authoring mismatch in the source, transcribed as-is.
        { ingredient: t("Tomato", "టమాటా"), benefits: [{ benefitLabel: t("Antioxidant Protection", "Metabolism ని పెంచుతుంది"), iconKey: "healthy-food" }] },
        { ingredient: t("Cucumber", "కీరదోసకాయ"), benefits: [
          { benefitLabel: t("Hydration", "Body ని Hydrated గా ఉంచుతుంది"), iconKey: "water" },
          { benefitLabel: t("Cooling", "Body న్ని cool గా ఉంచుతుంది"), iconKey: "snowflake", visibleLanguages: ["English"] },
        ] },
      ],
      groceryListAvailable: true,
    },
    eveningSnack: {
      name: t("Roasted Soya Chunks", "Roasted సోయా చంక్స్"),
      tips: t("Take 1 cup cooked soya chunks with pepper and lemon.", "1 cup cooked soya chunks కి pepper & lemon add చేసుకుని తీసుకోండి."),
      precautions: t("If you have thyroid concerns, avoid very large daily portions.", "Thyroid ఉన్నవారు soya ని daily తీసుకోకండి."),
      nutritionalBenefits: [
        { ingredient: t("Soya Chunks", "సోయా చంక్స్"), benefits: [
          { benefitLabel: t("Protein-Rich", "Protein ఎక్కువగా ఉంటుంది"), iconKey: "muscle-health" },
          { benefitLabel: t("Healthy Metabolism", "Metabolism ని పెంచుతుంది"), iconKey: "healthy-eating" },
        ] },
      ],
      groceryListAvailable: true,
    },
    dinner: {
      name: t("Plain Dosa & Ginger Chutney", "ప్లెయిన్ దోస & అల్లం చట్నీ"),
      tips: t("Use only 1/2 tsp oil.", "Oil 1/2tsp వాడండి."),
      precautions: t("For diabetes or PCOS, keep it to 2 small dosa and avoid extra dosa.", "Diabetes లేదా PCOS ఉన్నవారు 2 small dosa వరకే తీసుకుని extra dosa తీసుకోకండి."),
      nutritionalBenefits: [
        { ingredient: t("Ginger", "అల్లం"), benefits: [
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food", visibleLanguages: ["English"] },
        ] },
      ],
      groceryListAvailable: true,
    },
    nightDrink: {
      name: t("Warm Cardamom Milk", " యాలకుల పాలు"),
      tips: t("Take 1 cup warm milk with a pinch of cardamom.", "1 cup warm milk లో a pinch యాలకుల పొడి వేసుకుని తీసుకోండి."),
      precautions: t("For diabetes or PCOS, do not add sugar or jaggery.", "Diabetes లేదా PCOS ఉన్నవారు sugar లేదా jaggery add చేయకండి."),
      nutritionalBenefits: [
        { ingredient: t("Cardamom", "యాలకులు"), benefits: [
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
          { benefitLabel: t("Relaxation", "Relax గా ఉంటుంది."), iconKey: "meditation" },
        ] },
      ],
      groceryListAvailable: true,
    },
  },
  // 2026-08-19 has no distinct Post Yoga Drink card — see `OMITTED_SLOTS_BY_DATE` below.
  "2026-08-19": {
    earlyMorning: {
      name: t("Sesame & Sunflower Seeds", "నువ్వులు & sunflower గింజలు"),
      items: [{ label: same("1 tbsp Sesame Seeds") }, { label: same("1 tbsp Sunflower Seeds") }],
      tips: t("Take 1 tbsp sesame seeds & 1 tbsp sunflower seeds.", "1 tbsp నువ్వులు & 1 tbsp sunflower గింజలు తీసుకోండి."),
      precautions: t(
        "Keep the given nuts/seeds portion; avoid extra handfuls.",
        "ఇచ్చిన nuts/seeds portion వరకే తీసుకోండి; extra గా handfuls తీసుకోకండి."
      ),
      nutritionalBenefits: [
        // Sheet's Telugu benefit cell for sunflower seeds translates to "Metabolism" rather
        // than "Antioxidant Protection" — an authoring mismatch in the source, transcribed as-is.
        { ingredient: t("Sunflower Seeds", "Sunflower గింజలు"), benefits: [{ benefitLabel: t("Antioxidant Protection", "Metabolism ని పెంచుతుంది"), iconKey: "healthy-food" }] },
      ],
      groceryListAvailable: true,
    },
    breakfast: {
      name: t("Mixed Millet Protein Veg Jaava", "Mixed మిల్లెట్ ప్రోటీన్ జావ"),
      tips: t(
        "Take 1 medium cup millet jaava with at least 1/2 cup vegetables.",
        "1 medium cup మిల్లెట్ జావలో కనీసం 1/2 cup vegetables add చేసుకోండి."
      ),
      precautions: t("For diabetes, avoid sugar or jaggery.", "Diabetes ఉన్నవారు sugar లేదా jaggery తీసుకోండి."),
      nutritionalBenefits: [
        { ingredient: t("Millet", "మిల్లెట్స్"), benefits: [
          { benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" },
          { benefitLabel: t("Manages Blood Sugar levels", "Blood sugar levels ని manage చేస్తుంది."), iconKey: "sugar-cubes" },
        ] },
      ],
      groceryListAvailable: true,
    },
    morningSnack: {
      name: t("Green Grapes", " ద్రాక్ష"),
      items: [{ label: same("1 Cup") }],
      tips: t("Take about 1 cup green grapes as a whole fruit.", "సుమారు 1 cup పచ్చ ద్రాక్షను whole fruit గా తీసుకోండి."),
      precautions: t("If you have diabetes, keep the portion to about 1/2 cup.", "Diabetes ఉన్నవారు సుమారు 1/2 cup వరకే తీసుకోండి."),
      recommendedQuantity: [{ ingredient: t("Green Grapes", "పచ్చ ద్రాక్ష"), qty: same("1 Cup") }],
      nutritionalBenefits: [
        { ingredient: t("Green Grapes", "పచ్చ ద్రాక్ష"), benefits: [
          { benefitLabel: t("Hydration", "Body ని Hydrated గా ఉంచుతుంది"), iconKey: "water" },
          { benefitLabel: t("Antioxidant Protection", "Immunity ని పెంచుతుంది"), iconKey: "healthy-food" },
        ] },
      ],
      groceryListAvailable: true,
    },
    lunch: {
      name: t("Chapati, Moong Dal Tomato Curry & Curd", "చపాతీ, పెసరపప్పు టమాటా కూర & పెరుగు"),
      precautions: t(
        "For diabetes or PCOS, avoid extra chapati and keep dal more.",
        "Diabetes లేదా PCOS ఉన్నవారు extra chapati తీసుకోకుండా dal portion ఎక్కువగా తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Moong", "పెసరపప్పు"), benefits: [
          { benefitLabel: t("Protein-Rich", "Protein ఎక్కువగా ఉంటుంది"), iconKey: "muscle-health" },
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
        ] },
        { ingredient: t("Curd", "పెరుగు"), benefits: [{ benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" }] },
      ],
      groceryListAvailable: true,
    },
    eveningSnack: {
      name: t("Boiled Black Chana", "ఉడికించిన నల్ల శనగలు"),
      tips: t("Take 1/2–1 cup boiled black chana with onion and lemon.", "1/2–1 cup boiled నల్ల శనగలుకు onion & lemon add చేసుకుని తీసుకోండి."),
      precautions: t("If you have gas/bloating, start with 1/2 cup.", "Gas/bloating ఉంటే 1/2 cup తో start చేయండి."),
      nutritionalBenefits: [
        { ingredient: t("Black Chana", "నల్ల శనగలు"), benefits: [
          { benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
          { benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" },
          { benefitLabel: same("Protein-Rich"), iconKey: "muscle-health", visibleLanguages: ["English"] },
        ] },
      ],
      groceryListAvailable: true,
    },
    dinner: {
      name: t("Corn Soup with Vegetables", "Vegetable corn సూప్"),
      tips: t("Take 1 medium bowl corn soup with plenty of vegetables.", "1 medium bowl corn soup లో vegetables ఎక్కువగా add చేసుకోండి."),
      precautions: t("For diabetes, keep corn moderate and avoid extra flour.", "Diabetes ఉన్నవారు corn portion moderate గా ఉంచి extra flour avoid చేయండి."),
      nutritionalBenefits: [
        { ingredient: t("Corn", "మొక్కజొన్న"), benefits: [
          { benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
        ] },
      ],
      groceryListAvailable: true,
    },
    nightDrink: {
      name: t("Warm Cardamom Milk", " యాలకుల పాలు"),
      tips: t("Take 1 cup warm milk with a pinch of cardamom.", "1 cup warm milk లో a pinch యాలకుల పొడి వేసుకుని తీసుకోండి."),
      precautions: t("For diabetes or PCOS, do not add sugar or jaggery.", "Diabetes లేదా PCOS ఉన్నవారు sugar లేదా jaggery add చేయకండి."),
      nutritionalBenefits: [
        { ingredient: t("Cardamom", "యాలకులు"), benefits: [
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
          { benefitLabel: t("Relaxation", "Relax గా ఉంటుంది."), iconKey: "meditation" },
        ] },
      ],
      groceryListAvailable: true,
    },
  },
  "2026-08-20": {
    earlyMorning: {
      name: t("Pumpkin Seeds & Flax Seeds", "గుమ్మడి గింజలు & అవిసె గింజలు"),
      items: [{ label: same("1 tbsp Pumpkin Seeds") }, { label: same("1 tbsp Flax Seeds") }],
      tips: t("Take 1 tbsp pumpkin seeds & 1 tbsp ground flax seeds.", "1 tbsp గుమ్మడి గింజలు & 1 tbsp ground flax seeds తీసుకోండి."),
      precautions: t(
        "Keep total seeds to 2 tbsp and drink enough water.",
        "Total seeds ని 2 tbsp వరకే ఉంచి రోజంతా సరిపడా water తాగండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Pumpkin Seeds", "గుమ్మడి గింజలు"), benefits: [{ benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" }] },
        { ingredient: t("Flax Seeds", "అవిసె గింజలు"), benefits: [{ benefitLabel: t("Heart Health", "Heart health కి మంచిది"), iconKey: "heart" }] },
      ],
      groceryListAvailable: true,
    },
    postYogaDrink: {
      name: t("Warm Cinnamon Milk", "దాల్చిన చెక్కతో వేడి పాలు"),
      precautions: t("For diabetes or PCOS, do not add sugar or jaggery.", "Diabetes లేదా PCOS ఉన్నవారు sugar లేదా jaggery add చేయకండి."),
      nutritionalBenefits: [
        { ingredient: t("Cinnamon", "దాల్చిన చెక్క"), benefits: [
          { benefitLabel: t("Healthy Blood Sugar", "Blood sugar levels ని manage చేస్తుంది."), iconKey: "sugar-cubes" },
          { benefitLabel: t("Healthy Metabolism", "Metabolism ని పెంచుతుంది"), iconKey: "healthy-eating" },
        ] },
      ],
      groceryListAvailable: true,
    },
    breakfast: {
      name: t("Chickpea & Grated Coconut", "శనగలు & తురిమిన కొబ్బరి"),
      tips: t("Take 1 cup boiled chickpea sundal with 1 tbsp grated coconut.", "1 cup ఉడికించిన శనగలు తో 1 tbsp తురిమిన కొబ్బరి తీసుకోండి."),
      precautions: t("If you have gas or bloating, start with 1/2 cup.", "Gas లేదా bloating ఉంటే 1/2 cup తో start చేయండి."),
      nutritionalBenefits: [
        { ingredient: t("Boiled Chana", "ఉడికించిన శనగలు"), benefits: [
          { benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" },
          { benefitLabel: t("Protein-Rich", "Protein ఎక్కువగా ఉంటుంది"), iconKey: "muscle-health" },
        ] },
        { ingredient: t("Coconut", "కొబ్బరి"), benefits: [{ benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" }] },
      ],
      groceryListAvailable: true,
    },
    morningSnack: {
      name: t("Banana", "అరటిపండు"),
      items: [{ label: same("1 Small–Medium Banana") }],
      precautions: t("If you have diabetes, choose 1 small–medium banana.", "Diabetes ఉన్నవారు 1 small–medium అరటిపండు తీసుకోండి."),
      recommendedQuantity: [{ ingredient: t("Banana", "అరటిపండు"), qty: same("1") }],
      nutritionalBenefits: [
        { ingredient: t("Banana", "అరటిపండు"), benefits: [
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
          { benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" },
        ] },
      ],
      groceryListAvailable: true,
    },
    lunch: {
      name: t("Korra Thotakura Kichid, Potato Fry & Curd", "కొర్ర తోటకూర కిచిడీ, ఆలూ ఫ్రై & పెరుగు"),
      tips: t("Take more thotakura and keep potato smaller.", "తోటకూర ఎక్కువగా, potato portion తక్కువగా తీసుకోండి."),
      precautions: t(
        "For diabetes, keep cooked millet around 150 g and potato fry about 1/2 cup.",
        "Diabetes ఉన్నవారు cooked millet సుమారు 150 g, potato fry 1/2 cup వరకే తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Millet", "మిల్లెట్స్"), benefits: [
          { benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" },
          { benefitLabel: t("Manages Blood Sugar levels", "Blood sugar levels ని manage చేస్తుంది."), iconKey: "sugar-cubes" },
        ] },
        { ingredient: t("Curd", "పెరుగు"), benefits: [{ benefitLabel: t("Gut Health", "Gut health కి మంచిది"), iconKey: "stomach" }] },
      ],
      groceryListAvailable: true,
    },
    eveningSnack: {
      name: t("Boiled Rajma ", " ఉడికించిన రాజ్మా"),
      tips: t("Take 1/2–1 cup well-cooked rajma with pepper and lemon.", "1/2–1 cup బాగా ఉడికించిన రాజ్మాకు pepper & lemon add చేసుకుని తీసుకోండి."),
      precautions: t("If you have gas/bloating, start with 1/2 cup.", "Gas/bloating ఉంటే 1/2 cup తో start చేయండి."),
      nutritionalBenefits: [
        { ingredient: t("Rajma", "రాజ్మా"), benefits: [
          { benefitLabel: t("Protein-Rich", "Protein ఎక్కువగా ఉంటుంది"), iconKey: "muscle-health" },
          { benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" },
        ] },
      ],
      groceryListAvailable: true,
    },
    dinner: {
      name: t("Ragi Dosa & Roti Pachadi", "రాగి దోస & రోటి పచ్చడి"),
      precautions: t(
        "For diabetes or PCOS, keep dosa to 2 small and use less oil.",
        "Diabetes లేదా PCOS ఉన్నవారు 2 small dosa వరకే తీసుకుని oil తక్కువగా వాడండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Ragi", "రాగి"), benefits: [{ benefitLabel: t("Bone Health", "Bone health కి మంచిది"), iconKey: "dog-bone" }] },
      ],
      groceryListAvailable: true,
    },
    nightDrink: {
      name: t(" Tulasi  Tea", " తులసి  టీ"),
      tips: t("Take 1 cup warm tulasi tea without sugar.", "1 cup warm తులసి టీని sugar లేకుండా తీసుకోండి."),
      precautions: t("Avoid sugar or honey, especially if you have diabetes.", "Diabetes ఉన్నవారు sugar లేదా honey add చేయకండి."),
      nutritionalBenefits: [
        { ingredient: t("Tulasi Tea", "తులసి టీ"), benefits: [
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
          { benefitLabel: t("Relaxation", "Relax గా ఉంటుంది."), iconKey: "meditation" },
          { benefitLabel: t("Antioxidant Protection", "యాంటీఆక్సిడెంట్ల రక్షణను అందిస్తుంది"), iconKey: "healthy-food", visibleLanguages: ["English"] },
        ] },
      ],
      groceryListAvailable: true,
    },
  },
  "2026-08-21": {
    earlyMorning: {
      name: t("Cashews & Soaked Black Raisins", "జీడిపప్పు & నానబెట్టిన నల్ల ఎండు ద్రాక్ష"),
      items: [{ label: same("4 Cashews") }, { label: same("5 Black Raisins") }],
      precautions: t("If you have diabetes, keep raisins to 5 only.", "Diabetes ఉన్నవారు raisins ని 5 వరకే తీసుకోండి."),
      nutritionalBenefits: [
        { ingredient: t("Cashews", "జీడిపప్పు"), benefits: [{ benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" }] },
        { ingredient: t("Black Raisins", "నల్ల ఎండు ద్రాక్ష"), benefits: [
          { benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
          { benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" },
        ] },
      ],
      groceryListAvailable: true,
    },
    postYogaDrink: {
      name: t("Ash Gourd juice", "బూడిద గుమ్మడికాయ juice"),
      tips: t("Blend ash gourd with mint and lemon; take 1 small glass fresh.", "బూడిద గుమ్మడికాయను పుదీనా & lemon తో blend చేసి 1 small glass fresh గా తీసుకోండి."),
      precautions: t("Do not add sugar or honey.", "Sugar లేదా honey add చేయకండి."),
      nutritionalBenefits: [
        { ingredient: t("Ash Gourd", "బూడిద గుమ్మడికాయ"), benefits: [
          { benefitLabel: t("Healthy Metabolism", "Metabolism ని పెంచుతుంది"), iconKey: "healthy-eating" },
          { benefitLabel: t("Manages Blood Sugar levels", "Blood sugar levels ని manage చేస్తుంది."), iconKey: "sugar-cubes" },
        ] },
      ],
      groceryListAvailable: true,
    },
    breakfast: {
      name: t("Ragi Idli & Coriander Chutney", "రాగి ఇడ్లీ & కొత్తిమీర చట్నీ"),
      tips: t(
        "Ferment the ragi idli batter well for better digestion and texture.",
        "రాగి ఇడ్లీ batter ని బాగా ferment చేయండి, digestion కి మంచిగా ఉంటుంది."
      ),
      precautions: t(
        "For diabetes, keep it to 3 idli and use less oil in chutney.",
        "Diabetes ఉన్నవారు 3 idli వరకే తీసుకుని chutney లో oil తక్కువగా వాడండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Ragi", "రాగి"), benefits: [{ benefitLabel: t("Bone Health", "Bone health కి మంచిది"), iconKey: "dog-bone" }] },
      ],
      groceryListAvailable: true,
    },
    morningSnack: {
      name: t("Banana", "అరటిపండు"),
      items: [{ label: same("1 Small–Medium Banana") }],
      precautions: t("If you have diabetes, choose 1 small–medium banana.", "Diabetes ఉన్నవారు 1 small–medium అరటిపండు తీసుకోండి."),
      recommendedQuantity: [{ ingredient: t("Banana", "అరటిపండు"), qty: same("1") }],
      nutritionalBenefits: [
        { ingredient: t("Banana", "అరటిపండు"), benefits: [
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
          { benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" },
        ] },
      ],
      groceryListAvailable: true,
    },
    lunch: {
      name: t("Rice, Pumpkin Dal, Brinjal Curry & Curd", "అన్నం, దోసకాయ పప్పు, వంకాయ కూర & పెరుగు"),
      tips: t(
        "Adjust rice based on hunger and activity. Take more vegetables and dal.",
        "మీ ఆకలి, activity బట్టి rice portion adjust చేసుకోండి. Vegetables మరియు dal ఎక్కువగా తీసుకోండి."
      ),
      precautions: t(
        "For diabetes, do not take more than 150 g cooked rice. For BP, keep salt low.",
        "Diabetes ఉన్నవారు 150 g కంటే ఎక్కువ cooked rice తీసుకోకండి. BP ఉన్నవారు salt తక్కువగా ఉంచండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Pumpkin Dal", "దోసకాయ పప్పు"), benefits: [
          { benefitLabel: t("Protein-Rich", "Protein ఎక్కువగా ఉంటుంది"), iconKey: "muscle-health" },
          { benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" },
        ] },
        { ingredient: same("Rice"), benefits: [{ benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" }] },
      ],
      groceryListAvailable: true,
    },
    eveningSnack: {
      name: t("Boiled Corn Chaat", "ఉడికించిన మొక్కజొన్న చాట్"),
      tips: t("Take 1 cup boiled corn with onion and lemon.", "1 cup boiled మొక్కజొన్నకు onion & lemon add చేసుకుని తీసుకోండి."),
      precautions: t(
        "For diabetes, keep corn to 1/2–1 cup and avoid butter or sweet sauces.",
        "Diabetes ఉన్నవారు corn ని 1/2–1 cup వరకే తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Corn", "మొక్కజొన్న"), benefits: [
          { benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
        ] },
      ],
      groceryListAvailable: true,
    },
    dinner: {
      // Sheet's Benefits_items column for this dish repeats the same "Pumpkin Dal, Rice"
      // pair used for the M84 lunch dish, even though this dinner is roti-based (no
      // separate rice item) — transcribed as-authored.
      name: t("Roti / Phulka, Pumpkin Dal & Buttermilk", "రోటీ / ఫుల్కా, దోసకాయ పప్పు & మజ్జిగ"),
      precautions: t("For diabetes or PCOS, avoid extra roti.", "Diabetes లేదా PCOS ఉన్నవారు extra roti తీసుకోకండి."),
      nutritionalBenefits: [
        { ingredient: t("Pumpkin Dal", "దోసకాయ పప్పు"), benefits: [
          { benefitLabel: t("Protein-Rich", "Protein ఎక్కువగా ఉంటుంది"), iconKey: "muscle-health" },
          { benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" },
        ] },
        { ingredient: same("Rice"), benefits: [{ benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" }] },
      ],
      groceryListAvailable: true,
    },
    nightDrink: {
      name: t("Warm Nutmeg Milk", "జాజికాయ వేసిన వేడి పాలు"),
      precautions: t("Do not use more than the tiny pinch nutmeg.", "1 pinch కంటే ఎక్కువ జాజికాయ powder వాడకండి."),
      nutritionalBenefits: [
        { ingredient: t("Nutmeg", "జాజికాయ"), benefits: [
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
          { benefitLabel: same("Antioxidant Protection"), iconKey: "healthy-food", visibleLanguages: ["English"] },
        ] },
      ],
      groceryListAvailable: true,
    },
  },
  "2026-08-22": {
    earlyMorning: {
      name: t("Melon Seeds & Chia Seeds", "watermelon & చియా గింజలు"),
      items: [{ label: same("1 tbsp Melon Seeds") }, { label: same("1 tsp Chia Seeds") }],
      tips: t("Soak chia seeds well.", "1 tsp chia seeds ని బాగా soak చేసి 1 tbsp melon seeds తో తీసుకోండి."),
      nutritionalBenefits: [
        { ingredient: t("Watermelon Seeds", "పుచ్చకాయ గింజలు"), benefits: [
          { benefitLabel: same("Antioxidant Protection"), iconKey: "healthy-food", visibleLanguages: ["English"] },
          { benefitLabel: t("Healthy Metabolism", "Metabolism ని పెంచుతుంది"), iconKey: "healthy-eating", visibleLanguages: ["Telugu"] },
          { benefitLabel: t("Cooling", "Body న్ని cool గా ఉంచుతుంది"), iconKey: "snowflake", visibleLanguages: ["Telugu"] },
        ] },
      ],
      groceryListAvailable: true,
    },
    postYogaDrink: {
      name: same("Tender Coconut Water"),
      precautions: t(
        "For people with Diabetes, limit the quantity as coconut water contains natural sugars.",
        "Diabetes ఉన్నవారు కొబ్బరి నీరు ని Limit గా తీసుకోండి. ఇందులో natural sugars ఉంటాయి"
      ),
      nutritionalBenefits: [
        { ingredient: t("Coconut Water", "కొబ్బరి నీళ్లు"), benefits: [
          { benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
          { benefitLabel: t("Hydration", "Body ని Hydrated గా ఉంచుతుంది"), iconKey: "water" },
        ] },
      ],
      groceryListAvailable: true,
    },
    breakfast: {
      name: t("Vegetable Poha", "Vegetable పోహా"),
      tips: t(
        "Take 1 medium bowl vegetable poha with 1 tbsp peanuts and vegetables.",
        "1 medium bowl వెజిటబుల్ పోహాలో 1 tbsp పల్లీలు & vegetables తీసుకోండి."
      ),
      precautions: t(
        "If you have thyroid concerns, limit peanuts to 1–2 tbsp.",
        "Thyroid ఉన్నవారు peanuts ని 1–2 tbsp వరకు మాత్రమే తీసుకోండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Poha", "అటుకులు"), benefits: [
          { benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
        ] },
      ],
      groceryListAvailable: true,
    },
    morningSnack: {
      name: same("Pineapple"),
      items: [{ label: same("1 Cup") }],
      tips: t("Take fresh pineapple as a whole fruit.", "fresh pineapple whole fruit గా తీసుకోండి."),
      precautions: t("If you have diabetes, keep it to about 2-3 small peices cup and avoid sugar.", "Diabetes ఉన్నవారు 2-3 peices  వరకే తీసుకుని sugar add చేయకండి."),
      recommendedQuantity: [{ ingredient: same("Pineapple"), qty: same("1 Cup") }],
      nutritionalBenefits: [
        { ingredient: same("Pineapple"), benefits: [
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
          { benefitLabel: same("Antioxidant Protection"), iconKey: "healthy-food", visibleLanguages: ["English"] },
        ] },
      ],
      groceryListAvailable: true,
    },
    lunch: {
      name: t("Mixed Dal Kichidi, Ridge gourd Curry & Curd", "Mixed dal కిచిడీ, బీరకాయ పచ్చనిపప్పు కూర & పెరుగు"),
      tips: t("You can use any available millet.", ".Available millet ఏదైనా use చేసుకోవచ్చు."),
      nutritionalBenefits: [
        { ingredient: t("Mixed Dal", "మిక్స్‌డ్ పప్పు"), benefits: [{ benefitLabel: t("Muscle Health", "Muscle health ని పెంచుతుంది"), iconKey: "muscle-health" }] },
        { ingredient: t("Ridge Gourd", "బీరకాయ"), benefits: [{ benefitLabel: t("Manages Blood Sugar levels", "Blood sugar levels ని manage చేస్తుంది."), iconKey: "sugar-cubes" }] },
      ],
      groceryListAvailable: true,
    },
    eveningSnack: {
      name: t("Grilled Tofu / Paneer Cubes", "Grilled టోఫు / పనీర్ cubes"),
      items: [{ label: same("30–40 g") }],
      tips: t("Take 30–40 g grilled tofu or paneer with pepper; avoid deep-frying.", "30–40 g grilled tofu లేదా paneer ని pepper తో తీసుకోండి; deep-frying చేయకండి."),
      precautions: t("For joint pains, pair the protein with vegetables.", "Joint pains ఉన్నవారు protein తో vegetables add చేయండి."),
      nutritionalBenefits: [
        { ingredient: t("Paneer", "పనీర్"), benefits: [{ benefitLabel: t("Muscle Health", "Muscle health ని పెంచుతుంది"), iconKey: "muscle-health" }] },
      ],
      groceryListAvailable: true,
    },
    dinner: {
      name: t("Curd Rice, Grated Carrot & Pomegranate", "క్యారెట్ & దానిమ్మతో పెరుగు అన్నం"),
      tips: t(
        "Take 1 medium cup curd rice with carrot and 2 tbsp pomegranate.",
        "1 medium cup పెరుగు అన్నంతో 1/2 cup grated carrot & 2 tbsp దానిమ్మ తీసుకోండి."
      ),
      precautions: t(
        "For diabetes, keep cooked rice to 150 g and pomegranate to 2 tbsp. For BP, keep salt low.",
        "Diabetes ఉన్నవారు cooked rice 150 g, దానిమ్మ 2 tbsp వరకే తీసుకోండి. BP ఉన్నవారు salt తక్కువగా ఉంచండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Carrot", "క్యారెట్"), benefits: [{ benefitLabel: t("Eye Health", "Eyes కి మంచిది"), iconKey: "eye-health" }] },
        { ingredient: t("Pomegranate", "దానిమ్మ"), benefits: [
          { benefitLabel: same("Anti-inflammatory Support"), iconKey: "anti-inflammatory", visibleLanguages: ["English"] },
          { benefitLabel: t("Healthy Metabolism", "Metabolism ని పెంచుతుంది"), iconKey: "healthy-eating" },
        ] },
      ],
      groceryListAvailable: true,
    },
    nightDrink: {
      name: t("Warm Cinnamon Herbal Tea", "దాల్చిన చెక్క టీ"),
      precautions: t("Avoid sugar or honey, especially if you have diabetes.", "Diabetes ఉన్నవారు sugar లేదా honey add చేయకండి."),
      nutritionalBenefits: [
        { ingredient: t("Cinnamon", "దాల్చిన చెక్క"), benefits: [
          { benefitLabel: t("Healthy Blood Sugar", "Blood sugar levels ని manage చేస్తుంది."), iconKey: "sugar-cubes" },
          { benefitLabel: t("Healthy Metabolism", "Metabolism ని పెంచుతుంది"), iconKey: "healthy-eating" },
        ] },
      ],
      groceryListAvailable: true,
    },
  },
  "2026-08-23": {
    earlyMorning: {
      name: t("Soaked Golden Raisins", "నానబెట్టిన golden ఎండు ద్రాక్ష"),
      items: [{ label: same("5 Raisins") }],
      precautions: t(
        "If you have diabetes, keep the portion to 5 and do not add extra dried fruits.",
        "Diabetes ఉన్నవారు 5 raisins వరకే తీసుకుని extra dried fruits తీసుకోకండి."
      ),
      recommendedQuantity: [{ ingredient: t("Soaked Golden Raisins", "Soaked golden ఎండు ద్రాక్ష"), qty: same("5 pcs") }],
      nutritionalBenefits: [
        { ingredient: t("Raisins", "ఎండు ద్రాక్ష"), benefits: [
          { benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" },
          { benefitLabel: t("Supports Hemoglobin", "Hemoglobin ని పెంచుతుంది"), iconKey: "hemoglobin" },
        ] },
      ],
      groceryListAvailable: true,
    },
    postYogaDrink: {
      name: t("Chia Seeds Water with Lemon", "నిమ్మరసం తో చియా seeds water"),
      precautions: t(
        "Drink enough water through the day after taking chia seeds.",
        "Chia seeds తీసుకున్న తర్వాత రోజంతా సరిపడా water తాగండి."
      ),
      nutritionalBenefits: [
        { ingredient: t("Chia Seeds", "చియా seeds"), benefits: [
          { benefitLabel: t("Hydration", "Body ని Hydrated గా ఉంచుతుంది"), iconKey: "water" },
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
        ] },
      ],
      groceryListAvailable: true,
    },
    breakfast: {
      name: t("Eggless Besan Chilla & Mint Chutney", "Eggless బేసన్ చిల్లా & పుదీనా చట్నీ"),
      precautions: t("For diabetes use about 1–2 tsp oil for the serving.", "Diabetes ఉన్నవారు 1–2 tsp oil వరకే use చేయండి."),
      nutritionalBenefits: [
        { ingredient: t("Besan", "శెనగపిండి"), benefits: [{ benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" }] },
      ],
      groceryListAvailable: true,
    },
    morningSnack: {
      name: t("Banana", "అరటిపండు"),
      items: [{ label: same("1 Small–Medium Banana") }],
      precautions: t("If you have diabetes, choose 1 small–medium banana.", "Diabetes ఉన్నవారు 1 small–medium అరటిపండు తీసుకోండి."),
      recommendedQuantity: [{ ingredient: t("Banana", "అరటిపండు"), qty: same("1") }],
      nutritionalBenefits: [
        { ingredient: t("Banana", "అరటిపండు"), benefits: [
          { benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" },
          { benefitLabel: t("Keeps You Full Longer", "ఎక్కువసేపు stomach full గా ఉంచుతుంది"), iconKey: "happy" },
        ] },
      ],
      groceryListAvailable: true,
    },
    lunch: {
      name: t("Rice, Pepper Rasam & Green Gram Curry", "అన్నం, మిరియాల రసం & పెసలు కూర"),
      tips: t("Take more green gram curry and vegetables.", "పెసలు కూర మరియు vegetables ఎక్కువగా తీసుకోండి."),
      nutritionalBenefits: [
        { ingredient: same("Rice"), benefits: [{ benefitLabel: t("Energy", "Energy ని ఇస్తుంది"), iconKey: "lightning-bolt" }] },
        { ingredient: t("Pepper", "మిరియాలు"), benefits: [{ benefitLabel: t("Better Digestion", "Digestion ని support చేస్తుంది"), iconKey: "stomach" }] },
      ],
      groceryListAvailable: true,
    },
    eveningSnack: {
      name: t("Cucumber Tomato Salad with Lemon", "కీరదోసకాయ టమాటా సలాడ్"),
      tips: t("Take 1 cup cucumber and tomato salad with lemon.", "1 cup cucumber & tomato salad కి lemon add చేసుకుని తీసుకోండి."),
      precautions: t("Wash raw vegetables well.", "Raw vegetables ని బాగా wash చేసి తీసుకోండి."),
      nutritionalBenefits: [
        { ingredient: t("Cucumber", "కీరదోసకాయ"), benefits: [
          { benefitLabel: t("Hydration", "Body ని Hydrated గా ఉంచుతుంది"), iconKey: "water" },
          { benefitLabel: t("Cooling", "Body న్ని cool గా ఉంచుతుంది"), iconKey: "snowflake", visibleLanguages: ["English"] },
        ] },
        { ingredient: t("Tomato", "టమాటా"), benefits: [{ benefitLabel: t("Antioxidant Protection", "Metabolism ని పెంచుతుంది"), iconKey: "healthy-food" }] },
      ],
      groceryListAvailable: true,
    },
    dinner: {
      // Sheet has no Benefits_items entry for this dish at all — no nutritionalBenefits
      // card, matching the type's "omit entirely for not curated" convention.
      name: t("Broken wheat upma", "పల్లీలతో గోధుమ రవ్వ ఉప్మా"),
      precautions: t(
        "For diabetes keep the portion moderate and add more vegetables.",
        "Diabetes ఉన్నవారు portion moderate గా ఉంచి vegetables ఎక్కువగా తీసుకోండి."
      ),
      groceryListAvailable: true,
    },
    nightDrink: {
      name: t(" Tulasi  Tea", " తులసి  టీ"),
      tips: t("Take 1 cup warm tulasi tea without sugar.", "1 cup warm తులసి టీని sugar లేకుండా తీసుకోండి."),
      precautions: t("Avoid sugar or honey, especially if you have diabetes.", "Diabetes ఉన్నవారు sugar లేదా honey add చేయకండి."),
      nutritionalBenefits: [
        { ingredient: t("Tulasi Tea", "తులసి టీ"), benefits: [
          { benefitLabel: t("Immunity", "Immunity ని పెంచుతుంది"), iconKey: "shield" },
          { benefitLabel: t("Relaxation", "Relax గా ఉంటుంది."), iconKey: "meditation" },
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
 * 2026-08-19 likewise has no Post Yoga Drink card per the M2W2 sheet's day schedule.
 */
export const OMITTED_SLOTS_BY_DATE: Partial<Record<string, MealSlotId[]>> = {
  "2026-08-09": ["postYogaDrink"],
  "2026-08-12": ["postYogaDrink"],
  "2026-08-19": ["postYogaDrink"],
};
