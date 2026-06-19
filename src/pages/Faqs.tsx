import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import logo from "@/assets/Primary_logo.svg";

const generalFaqs = [
  {
    question: "How to register?",
    answer: "We have a free batch starting almost every monday. Registration is super simple. Just enter your number in below link and submit. You will receive a confirmation in whatsapp and thats it. You are ready to join classes from next monday.\n\n[Join free classes](https://yoga.healthyday.co.in)"
  },
  {
    question: "Are there any breathing and meditation sessions?",
    answer: "We give special care to breathing and meditation for your mental wellbeing. Every session has dedicated breathwork and meditation time allocated. We also conduct special breathwork and meditation sessions for community members regularly."
  },
  {
    question: "Do I buy any props to start the classes?",
    answer: "All you need is a Simple Yoga mat. Even if you don’t have it, you can attend the classes using a chair or your bed or a sofa."
  },
  {
    question: "Do you currently offer Live Zoom Classes?",
    answer: "We want to make daily yoga easy and accessible for everyone, so we offer 7 different time slots with complete flexibility — all at the most affordable price. Live Zoom classes don’t allow us to provide this level of flexibility and quality at scale, so we currently offer recorded streams of carefully curated sessions every day.\n\nEach session is designed and taught exactly like a live class, so you still feel guided, supported, and connected throughout the practice.\n\nTry our 14-Day Free Yoga Program, and you’ll instantly understand how close the experience is to having a live teacher with you on the mat."
  },
  {
    question: "I am over 60 years of age. I am worried if I can do yoga",
    answer: "In every session we have two instructors, one demonstrates a chair or easier version for elders and another a challenging version for advanced and younger students. You can easily start with chair version and progress to challenging versions."
  },
  {
    question: "I have no experience in Yoga, can I attend your classes?",
    answer: "Absolutely. We crafted the program for beginners to fall in love with this great science. 80% of our new community members are beginners. Register to know more"
  },
  {
    question: "Are there any demo sessions?",
    answer: "We offer a 14 Day FREE Program for all our new community members, so they can experience this magical journey themselves. It is completely FREE."
  }
];

const teluguFaqs = [
  {
    category: "Registered",
    items: [
      {
        question: "Classes epudu start avutaayi?",
        answer: "Namate andi! Classes June 21st nunchi start avutayi andi"
      },
      {
        question: "Timings cheppandi",
        answer: "Timings (Join any batch any day)\n\n☀️ Morning:\n* 5.30 AM - 6.30 AM\n* 6.30 AM - 7.30 AM\n* 7.30 AM - 8.30 AM\n* 8:30 AM - 9:30 AM\n\n🌝 Evening:\n* 4.30 PM - 5.30 PM\n* 5.30 PM - 6.30 PM\n* 6.30 PM - 7.30 PM\n\nమీ link తో ఈ timings లో మీరు ఏ batch అయినా join కావచ్చు.\n\nLink కేవలం పైన పెట్టిన timings లో మాత్రమే open అవుతుంది. Recordings వుండవు"
      },
      { question: "Ela join avvali? Class Link epudu pampistaaru", answer: "Namaste andi! 20th june night miku links and updates vastayi andi aa link lo miru next day live timings lo join avachu andi" },
      { question: "Periods lo join kavacha?", answer: "Periods Time లో ఈ యోగ మీరు చేయవచ్చు 👇🏻👇🏻\nhttps://youtu.be/-KRHtBPXae8" },
      { question: "Fee emaina pay cheyaala?", answer: "21 days miru eatuvanti fee pay cheyyalsina avasaram ledu andi.\ne 21days miku free classes vuntayi andi " },
      { question: "Yoga Kit ela win avvali?", answer: "Namaste andi! Mee referral link dhwara mee friends mariyu family members ni invite cheyandi. Varu June 1st nundi June 30th lopu register chesukune laa chusukondi. Ee nela chivaraku ekkuva referrals chesina Top 500 mandhi Yoga Kit ni geluchukuntaru!  Ippude share cheyadam prarambhinchandi mariyu leaderboard lo paiki vellandi!\nREFERRAL LINK👇\n\nRegister Now 👇🏻👇🏻\nhttps://yoga.healthyday.co.in?ref=$MobileNumber\n\nJoin me in\n21-Days FREE YOGA 🧘‍♀️😊\n🗓️ Starts 21st JUNE\n\n🧘 Daily Yoga\n🥗 Simple Diet\n🌿 Lifestyle Habits\n\nWith JAGAN 🧘🏻‍♂️\n🌍Internationally Certified Yoga Teacher\n👥 6,00,000+ Students" },
      { question: "Naa Referral Count Tappu Chupistundi", answer: "Namaste andi! Ok andi!  meeru refer chesina vaalla details ni ikkada share cheyandi memu check chesi manual ga add chetamu" },
      { question: "Introduction Session Link pettandi", answer: "INTRODUCTION SESSION👇 \nhttps://class.healthyday.co.in/$MobileNumber" },
      { question: "Health Issues cure avutaaya?", answer: "Namaste andi !Yoga valla chaala rakaala aarogya samasyalu (Health issues) khachithamga nayamavuthayi.Regular gaa yoga practice cheyandi..okavela severe health problem ayithe, meeru doctor ni consult cheyyali andi" }
    ]
  },
  {
    category: "Ongoing Week1",
    items: [
      { question: "Periods Yoga link pettandi", answer: "Periods Time లో ఈ యోగ మీరు చేయవచ్చు 👇🏻👇🏻\nhttps://youtu.be/-KRHtBPXae8" },
      { question: "Class link open kavatam ledu", answer: "Link kevalam live timings lo mathrame open avuthundhi. Recordings undavu.okavela miku live timings lo class link open avvakapothe youtube link tho join avvandi andi." },
      { question: "Link open cheste restricted mode ani vastundi", answer: "Mee youtube lo restricted mode off cheyaali. Ela off cheyalo ee video lo vundi\n\nhttps://youtube.com/shorts/I7ooLzNAJ7s" },
      { question: "Naa Referral Count Tappu Chupistundi", answer: "Namaste andi! Ok andi!  meeru refer chesina vaalla details ni ikkada share cheyandi memu check chesi manual ga add chetamu" },
      { question: "Attendance Tappu Vachindi", answer: "Attendance might take up to an hour to update. If it's still incorrect, please contact support." },
      { question: "Body Pains Vastunnayi", answer: "First week lo body pains common andi! ivi good pains.. veeti valla mee body develop avutundi ani ardam. Ekkadaina joint lo pinching pain vaste adi manchidi kaadu.. otherwise muscle pains are very good and healthy for your improvement." },
      { question: "Health Issues cure avutaaya?", answer: "Namaste andi !Yoga valla chaala rakaala aarogya samasyalu (Health issues) khachithamga nayamavuthayi.Regular gaa yoga practice cheyandi..okavela severe health problem ayithe, meeru doctor ni consult cheyyali andi" },
      { question: "TV ki ela connect chesukovaali", answer: "mee youtube lo class open ayina tarvata paina cast button vuntundi. Adi click chesi mee smart tv ki meeru connect cheyochu" }
    ]
  }
];

const englishFaqs = [
  {
    category: "Registered",
    items: [
      {
        question: "When will classes start?",
        answer: "Namaste ji! the classes will start on June 21st"
      },
      {
        question: "What are the timings?",
        answer: "Timings (Join any batch on any day)\n\n☀️ Morning:\n5:30 AM – 6:30 AM\n6:30 AM – 7:30 AM\n7:30 AM – 8:30 AM\n8:30 AM – 9:30 AM\n\n🌝 Evening:\n4:30 PM – 5:30 PM\n5:30 PM – 6:30 PM\n6:30 PM – 7:30 PM\n\nWith your link, you can join any batch at these timings\n\nThe link will open only during the above timings.\nNo recordings will be available."
      },
      { question: "How to join? When will I get the class link", answer: "Namaste ji! You will receive the links and updates on the night of June 20th. You can use that link to join the live session during the scheduled timings the next day." },
      { question: "Can I join during periods?", answer: "During periods yoga:- https://youtu.be/ipJ_v1EJ1tw" },
      { question: "Do we need to pay any fee?", answer: "You do not need to pay any fee for 21 days. These 21 days of classes will be completely free for you." },
      { question: "How to win a Yoga Kit?", answer: "Namaste ji! Invite your friends and family using your unique referral link. Make sure they register between June 1st and June 30th. The Top 500 referrers at the end of the month will win a Yoga Kit!  Start sharing now and climb the leaderboard! \nREFERRAL LINK👇\nRegister Now 👇🏻👇🏻\nhttps://yoga.healthyday.co.in?ref=$MobileNumber\n\nJoin me in\n21-Days FREE YOGA 🧘‍♀️😊\n🗓️ Starts 21st JUNE\n\n🧘 Daily Yoga\n🥗 Simple Diet\n🌿 Lifestyle Habits\n\nWith JAGAN 🧘🏻‍♂️\n🌍Internationally Certified Yoga Teacher\n👥 6,00,000+ Students" },
      { question: "How to join Introduction Session?", answer: "INTRODUCTION SESSION👇 \nhttps://class.healthyday.co.in/$MobileNumber" },
      { question: "I have health issues, will they be cured with yoga?", answer: "Namaste! Yoga can definitely cure many types of health issues. Please practice yoga regularly. However, if it is a severe health problem, you must consult a doctor." }
    ]
  },
  {
    category: "Ongoing Week 1",
    items: [
      { question: "I am in Periods. Can I do yoga?", answer: "During periods yoga:- https://youtu.be/ipJ_v1EJ1tw" },
      { question: "Class Link is not opening", answer: "The link will only open during live timings. There will be no recordings available. If the class link does not open during the live timings, please join using the YouTube link." },
      { question: "Getting restricted mode error", answer: "Please turn Restricted Mode OFF on YouTube.\nHow to turn it off is explained in this video👇\nhttps://youtube.com/shorts/I7ooLzNAJ7s" },
      { question: "My referral count is incorrect", answer: "Namaste! Please share the details of the people you referred here. We will check the details and add them manually" },
      { question: "My attendance is incorrect", answer: "Attendance might take up to an hour to update. If it's still incorrect, please contact support." },
      { question: "I am having body pains after class", answer: "Body pains are totally common in the first week! These are good pains... it means your body is developing. If you feel a sharp, pinching pain in any joint, that is not good. Otherwise, muscle pains are very good and healthy for your improvement." },
      { question: "I have a health issue, can it be cured by these classes?", answer: "Namaste! Yoga can definitely cure many types of health issues. Please practice yoga regularly. However, if it is a severe health problem, you must consult a doctor." },
      { question: "How to connect the class to TV", answer: "Once the class opens on YouTube, you will see a 'Cast' button at the top. Click that button to connect it to your Smart TV" }
    ]
  }
];

const renderText = (text: string, mobile?: string) => {
  let replacedText = text;
  if (mobile) {
    replacedText = replacedText.replace(/\$MobileNumber/g, mobile).replace(/\{mobile\}/g, mobile);
  }

  return replacedText.split('\n').map((line, i) => {
    // Basic markdown-like link parsing for the [text](url) pattern
    const linkMatch = line.match(/\[(.*?)\]\((.*?)\)/);
    if (linkMatch) {
      const beforeLink = line.substring(0, linkMatch.index);
      const afterLink = line.substring(linkMatch.index! + linkMatch[0].length);
      return (
        <span key={i}>
          {beforeLink}
          <a href={linkMatch[2]} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
            {linkMatch[1]}
          </a>
          {afterLink}
          <br />
        </span>
      );
    }

    // Auto-link naked http/https URLs
    const nakedUrlMatch = line.match(/(https?:\/\/[^\s]+)/);
    if (nakedUrlMatch) {
      const beforeLink = line.substring(0, nakedUrlMatch.index);
      const afterLink = line.substring(nakedUrlMatch.index! + nakedUrlMatch[0].length);
      return (
        <span key={i}>
          {beforeLink}
          <a href={nakedUrlMatch[1]} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
            {nakedUrlMatch[1]}
          </a>
          {afterLink}
          <br />
        </span>
      );
    }

    return <span key={i}>{line}<br /></span>;
  });
};

const Faqs = () => {
  const { mobile } = useParams<{ mobile: string }>();
  const navigate = useNavigate();
  const [language, setLanguage] = useState<"Telugu" | "English">("Telugu");
  const [studentName, setStudentName] = useState<string | null>(null);

  const cleanedMobile = mobile ? mobile.replace(/[\s\-\(\)\+]/g, "") : "";

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!cleanedMobile) return;
      try {
        const response = await fetch(`/.netlify/functions/student?mobile=${encodeURIComponent("+" + cleanedMobile)}`);
        if (response.ok) {
          const data = await response.json();
          if (data?.name) {
            setStudentName(data.name);
          } else {
            navigate("/leaderboard");
          }

          if (data?.language) {
             const lowerLang = data.language.toLowerCase();
             if (lowerLang.includes('english')) setLanguage('English');
             else setLanguage('Telugu');
          }
        } else {
          navigate("/leaderboard");
        }
      } catch (err) {
        console.error("Failed to fetch student data", err);
        navigate("/leaderboard");
      }
    };
    fetchStudentData();
  }, [cleanedMobile, navigate]);

  const activeFaqs = language === "Telugu" ? teluguFaqs : englishFaqs;

  return (
    <div className="hd-page min-h-screen bg-[#FDFDFD]" style={{ fontFamily: "Outfit, sans-serif" }}>
      <header className="hd-header bg-white mb-8">
        <img src={logo} alt="Healthyday" className="h-7" />
      </header>
      <div className="max-w-3xl mx-auto px-4 pb-8">

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Hi {studentName ? `${studentName} ${language === 'English' ? 'ji' : 'గారు'}` : (language === 'English' ? 'ji' : 'అండీ')}
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            Do you have any query or issue?<br />
            I answered the most common questions here. Please check it out.
          </p>

        </div>

        {activeFaqs.map((category, idx) => (
          <div key={idx} className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 px-2">{category.category}</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <Accordion type="single" collapsible className="w-full">
                {category.items.map((item, itemIdx) => (
                  <AccordionItem value={`item-${idx}-${itemIdx}`} key={itemIdx} className="border-b last:border-none px-6">
                    <AccordionTrigger className="text-left text-gray-800 font-semibold hover:no-underline hover:text-orange-600 transition-colors">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                      {renderText(item.answer, cleanedMobile)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        ))}

        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4 px-2">General FAQs</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              {generalFaqs.map((item, itemIdx) => (
                <AccordionItem value={`general-${itemIdx}`} key={itemIdx} className="border-b last:border-none px-6">
                  <AccordionTrigger className="text-left text-gray-800 font-semibold hover:no-underline hover:text-orange-600 transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                    {renderText(item.answer, cleanedMobile)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Faqs;
