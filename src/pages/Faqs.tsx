import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import logo from "@/assets/Primary_logo.svg";
import { toast } from "sonner";

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
      { question: "Change my language to English", answer: "ACTION_CHANGE_LANGUAGE" },
      { question: "Classes ఎప్పుడు start అవుతాయి?", answer: "మీ Free Batch June 21st నుండి మొదలవుతుంది.\n\nLink మీకు ఒక రోజు ముందే వస్తుంది. Class కి ముందు WhatsApp లో Reminder కూడా వస్తుంది." },
      { question: "Class Timings చెప్పండి", answer: "ఈ కింది Timings లో ఏ Batch లో అయినా మీరు Join అవ్వచ్చు\n\n☀️ Morning:\n* 5.30 AM - 6.25 AM\n* 6.30 AM - 7.25 AM\n* 7.30 AM - 8.25 AM\n* 8:30 AM - 9:25 AM\n\n🌝 Evening:\n* 4.30 PM - 5.25 PM\n* 5.30 PM - 6.25 PM\n* 6.30 PM - 7.25 PM\n\nమీ WhatsApp లో పెట్టిన Link కేవలం పైన ఉన్న Class Timings లో మాత్రమే open అవుతుంది.\n\nRecordings ఉండవు." },
      { question: "ఎలా Join అవ్వాలి? Class Link ఎప్పుడు పంపిస్తారు?", answer: "20th June రాత్రి మీకు Links and Updates వస్తాయి.\n\nClass ముందు కూడా మీకు directly WhatsApp లోనే Update వస్తుంది. మీకు పంపిన WhatsApp message లో Link నొక్కి Join అయితే చాలు." },
      { question: "Periods లో regular YOGA sessions Join అవ్వచ్చా?", answer: "Periods time లో ఈ Yoga మీరు చేయవచ్చు 👇🏻👇🏻\nhttps://youtu.be/-KRHtBPXae8\n\nFirst two days లేదా మీకు cramps & tiredness ఎప్పటి వరకు ఉంటే అప్పటి వరకు ఇదే session attend అవ్వచ్చు. తర్వాత నుండి regular sessions లో join అవ్వచ్చు." },
      { question: "Fees ఏమైనా చెల్లించాలా?", answer: "మీరు ఎటువంటి fees pay చేయాల్సిన అవసరం లేదు.\nఈ 21 days మీకు free Classes ఉంటాయి.\n\nమీరు గనుక ఒకవేళ Classes attend అవ్వడం లేదు అంటే మాత్రం Link రావటం ఆగిపోతుంది. Regular గా attend అవ్వడానికి try చేయండి." },
      { question: "Yoga Kit ఎలా గెలవాలి?", answer: "మీ referral Link ద్వారా మీ friends & family members ని invite చేయండి.\n\nవారు June 1st నుండి June 30th లోపు Register చేసుకుంటే మీకు referral Point వస్తుంది.\n\nఈ నెల చివరికి ఎక్కువ referrals చేసిన Top 500 మెంబర్స్ కి Yoga Kit గిఫ్ట్గా వస్తుంది!\n\nమీ ఫ్రెండ్స్ & ఫ్యామిలీ Invite చేయడానికి ఈ కింది Button ని నొక్కండి" },
      { question: "నా Referral count తప్పు చూపిస్తోంది", answer: "ఈ Link లో ఒకసారి “View your referrals” button ని Press చేయండి. వెంటనే మీకు మీ Link ద్వారా Join అయిన వారి వివరాలు వస్తాయి.\n\nఅందులో ఎవరైనా pending State లో ఉంటే వారిని WhatsApp లో మేము పంపిన Message లో “NEXT STEP - CLICK HERE” అని ఒక button ఉంటుంది, అది Click చేసి Verification చేయమని చెప్పండి.\n\nవెంటనే వారి Count కూడా మీకు చూపిస్తుంది.\n\nఒకవేళ ఎవరైనా మీ referral Link Join అయ్యి ఆ Person Number మీ List లో చూపించడం లేదు అంటే వారు Already మా Classes లో ముందే Register అయ్యారు అని అర్థం.\n\nవేరే ఏ సమస్య ఉన్నా ఈ Number కి WhatsApp Message చేయండి - <9052888968>" },
      { question: "Introduction Session Link పెట్టండి", answer: "Introduction session Miss అయ్యారా? Recording ఇందులో ఉంది.\n\nPlease watch now👇\nhttps://www.youtube.com/live/mnt9cvRztHA" },
      { question: "Yoga వల్లHealth Issues తక్కువ అవుతాయా?", answer: "ఇప్పటి వరకు మన Classes లో regular గా Yoga చేసి Health Issues ని recover చేసుకున్న వారి Stories మన Instagram Highlights లో ఉన్నాయి.\n\nPCOS/Thyroid  - https://www.instagram.com/stories/highlights/18050149328274421/ \nPeriods  - \nhttps://www.instagram.com/stories/highlights/18035071781713365/ \nKnee Pain/Back Pain/Joint pains -\nhttps://www.instagram.com/stories/highlights/18096553333638672/ \nWeight Loss - \nhttps://www.instagram.com/stories/highlights/17904516210250223/ \nSleep - \nhttps://www.instagram.com/stories/highlights/18091905466813292/ \n\nYoga చాలా వరకు” Lifestyle Issues ని reverse” చేసుకోవడానికి help అవుతుంది. అలా అని Yoga Medical Treatment కి Alternative కాదు.\n\nమీకు ఏదైనా severe Health Condition ఉంటే Doctor Consultation and Treatment తప్పనిసరి.\n\nఅలా కాకుండా General Lifestyle Issues ఏవి ఉన్నా consistently వారానికి 4-5 times Yoga చేస్తే మీకు మంచి Recovery ఉంటుంది." }
    ]
  },
  {
    category: "Ongoing Week 1",
    items: [
      { question: "Periods Yoga link పెట్టండి", answer: "Periods time లో ఈ Yoga మీరు చేయవచ్చు 👇🏻👇🏻\nhttps://youtu.be/-KRHtBPXae8\n\nFirst Two days లేదా మీకు cramps & tiredness ఎప్పటి వరకు ఉంటే అప్పటి వరకు ఇదే session attend అవ్వచ్చు. తర్వాత నుండి regular sessions లో join అవ్వచ్చు.\n\nఆ రోజులకు గాను మీకు attendance mark చేసుకోవాలి అంటే ఈ కింద option తో mark చేసుకోవచ్చు. Date select చేసి button నొక్కితే చాలు." },
      { question: "Class link open కావటం లేదు", answer: "ఒకవేళ మీకు live timings లో class link open అవ్వకపోతే ఈ కింది link తో join అవ్వండి\n\nhttps://class.healthyday.co.in/{mobile}\n\nLink కేవలం live timings లో మాత్రమే open అవుతుంది. Recordings ఉండవు." },
      { question: "Link open చేస్తే restricted mode అని వస్తుంది", answer: "Don’t worry.ఇది చాలా మంది ఎదుర్కొనే common issue. \n\nదీనికి solution మీ YouTube లో restricted mode off చేయాలి.\nఎలా off చేయాలో ఈ video లో detailed గా చెప్పాను.\n\nhttps://youtube.com/shorts/I7ooLzNAJ7s\n\nSimple process. 30 sec కూడా పట్టదు." },
      { question: "నా Referral Count తప్పు చూపిస్తోంది", answer: "ఈ link లో ఒకసారి “View your referrals” button ని press చేయండి. వెంటనే మీకు మీ link ద్వారా join అయిన వారి వివరాలు వస్తాయి.\n\nhttp://class.healthyday.co.in/Your mobile number/leaderboard \n\nఅందులో ఎవరైనా pending state లో ఉంటే వారిని WhatsApp లో మేము పంపిన message లో “NEXT STEP - CLICK HERE” అని ఒక button ఉంటుంది, అది click చేసి verification చేయమని చెప్పండి.\n\nవెంటనే వారి count కూడా మీకు చూపిస్తుంది.\n\nఒకవేళ ఎవరైనా మీ referral link join అయ్యి ఆ person number మీ list లో చూపించడం లేదు అంటే వారు ఆల్రెడీ మా classes లో ముందే register అయ్యారు అని అర్థం.\n\nవేరే ఏ సమస్య ఉన్నా ఈ నంబర్కి WhatsApp message చేయండి - <9052888968>" },
      { question: "Change my language to English", answer: "ACTION_CHANGE_LANGUAGE" },
      { question: "Attendance తప్పు చూపిస్తోంది.", answer: "కొన్ని కొన్ని సార్లు attendance tracking తప్పవచ్చు. అలా ఎప్పుడైనా miss అయితే, మీరు ఇక్కడ update చేసుకుంటే సరిపోతుంది." },
      { question: "Yoga చేశాను కానీ Body Pains వస్తున్నాయి", answer: "First week లో body pains common అండి! ఇవి good pains.. వీటి వల్ల మీ body develop అవుతుంది అని అర్థం.\n\nఎక్కడైనా joints లో ఏదైనా pains వస్తే అది మంచిది కాదు.. otherwise muscle pains are very good and healthy for your improvement." },
      { question: "Health Issues తగ్గుతాయా?", answer: "ఇప్పటి వరకు మన classes లో regular గా Yoga చేసి health issues ని recover చేసుకున్న వారి stories మన Instagram highlights లో ఉన్నాయి\n\nPCOS/Thyroid  - https://www.instagram.com/stories/highlights/18050149328274421/ \nPeriods  - \nhttps://www.instagram.com/stories/highlights/18035071781713365/ \nKnee Pain/Back Pain/Joint pains -\nhttps://www.instagram.com/stories/highlights/18096553333638672/ \nWeight Loss - \nhttps://www.instagram.com/stories/highlights/17904516210250223/ \nSleep - \nhttps://www.instagram.com/stories/highlights/18091905466813292/ \n\nYoga చాలా వరకు “Lifestyle issues ని Reverse” చేసుకోవడానికి help అవుతుంది. అలా అని Yoga medical treatment alternative కాదు.\n\nమీకు ఏదైనా severe health condition ఉంటే doctor consultation and treatment తప్పనిసరి.\n\nఅలా కాకుండా general lifestyle issues ఏవి ఉన్నా consistent గా వారానికి 4-5 times Yoga చేస్తే మీకు మంచి recovery ఉంటుంది." },
      { question: "TV కి ఎలా connect చేసుకోవాలి", answer: "మీ YouTube లో class open అయిన తర్వాత పైన cast button ఉంటుంది. అది click చేసి మీ Smart TV కి మీరు connect చేయొచ్చు.\n\nhttps://www.youtube.com/watch?v=pzar8KCCfjE" }
    ]
  }
];

const englishFaqs = [
  {
    category: "Registered",
    items: [
      { question: "Change my language to Telugu", answer: "ACTION_CHANGE_LANGUAGE" },
      { question: "When will classes start?", answer: "Your yoga batch will start on 21st June" },
      { question: "What are the timings?", answer: "Timings (Join any batch on any day)\n\n☀️ Morning:\n5:30 AM – 6:30 AM\n6:30 AM – 7:30 AM\n7:30 AM – 8:30 AM\n8:30 AM – 9:30 AM\n\n🌝 Evening:\n4:30 PM – 5:30 PM\n5:30 PM – 6:30 PM\n6:30 PM – 7:30 PM\n\nYou can join any batch at these timings any day using the link sent to you on WhatsApp\n\nThe link will open only during the above timings.\nNo recordings will be available." },
      { question: "How to join? When will I get the class link", answer: "You will receive the links and updates on the night of June 20th. \n\nYou can use that link to join the live session during the scheduled timings the next day." },
      { question: "Can I join during periods?", answer: "During periods, you can practice this specially curated session. This will help relieving your back pain and improve the mood\n\nhttps://youtu.be/ipJ_v1EJ1tw \n\nYou can follow this session for the first two days or till you have cramps and pain. After that you can continue in regular classes\n\nIf you wish to get attendance during those days, use the option below" },
      { question: "Do we need to pay any fee?", answer: "You do not need to pay any fee. These 21 days of classes will be completely free for you.\n\nThe only rule is you need to attend the classes consistently. If you miss 3 consecutive classes, then we will stop sending whatsapp notifications to your numbers. They will resume again when you join at least one class" },
      { question: "How to win a Yoga Kit?", answer: "Invite your Friends, Family to our 21 Days FREE Yoga batch. \nWhen they register, you can WIN Yoga kit\n\n🏆 *500 TOP WINNERS get Yoga Kit*\n1️⃣ Invite = Healthy Diet Recipes e-Book\n\nReferrals from 1st to 21st June will be counted" },
      { question: "How to join the Introduction Session?", answer: "If you missed our introduction session, you can access the recording here 👇 \n\nhttps://www.youtube.com/live/OskBc7sb-_0" },
      { question: "I have health issues, will they be cured with yoga?", answer: "There are a lot of students who have seen recovery from consistently practicing Yoga, you can check their stories here \n\nPCOS/Thyroid  - https://www.instagram.com/stories/highlights/18050149328274421/ \nPeriods  - \nhttps://www.instagram.com/stories/highlights/18035071781713365/ \nKnee Pain/Back Pain/Joint pains -\nhttps://www.instagram.com/stories/highlights/18096553333638672/ \nWeight Loss - \nhttps://www.instagram.com/stories/highlights/17904516210250223/ \nSleep - \nhttps://www.instagram.com/stories/highlights/18091905466813292/ \n\nYoga helps in resolving many lifestyle issues naturally. However you need to practice atleast 4-5 times a week consistently" }
    ]
  },
  {
    category: "Ongoing Week 1",
    items: [
      { question: "I am in Periods. Can I do yoga?", answer: "During periods, you can practice this specially curated session. This will help relieving your back pain and improve the mood\n\nhttps://youtu.be/ipJ_v1EJ1tw \n\nYou can follow this session for the first two days or till you have cramps and pain. After that you can continue in regular classes\n\nIf you wish to get attendance during those days, use the option below" },
      { question: "Class Link is not opening", answer: "If your class link is not opening during live hours, you can join using the link below \n\nhttps://class.healthyday.co.in/{mobile}\n\nThe link will only open during live timings\nNo recordings available" },
      { question: "Getting restricted mode error", answer: "This is a very common error. You can resolve this simply by disabling restricted mode on your Youtube App\n\nI have explained steps to disable in the video here👇\nhttps://youtube.com/shorts/I7ooLzNAJ7s\n\nIt is very simple and takes hardly 30 sec to do it" },
      { question: "My referral count is incorrect", answer: "Please click on the \"View Your Referrals\" button in the link below 👇\nhttp://class.healthyday.co.in/918143754968/leaderboard\n\nYou will instantly see the details of people who joined through your referral link.\n\nIf anyone is showing in Pending status, please ask them to click the \"NEXT STEP - CLICK HERE\" button in the WhatsApp message we sent and complete their verification.\n\nOnce they complete verification, their count will automatically be added to your referrals ✅\n\nIf someone joined using your referral link but their number is not showing in your list, it means they had already registered for our classes earlier.\n\nIf you face any other issue, please send a WhatsApp message to 📞 9052888968" },
      { question: "Change my language to Telugu", answer: "ACTION_CHANGE_LANGUAGE" },
      { question: "My attendance is incorrect", answer: "Sometime we might miss the attendance tracking. If you ever see your attendance marked incorrectly, you can update it here" },
      { question: "I am having body pains after class", answer: "Body pains are totally common in the first week! These are good pains and It means your body is developing. \n\nIf you feel a sharp, pinching pain in any joint, that is not good. Otherwise, muscle pains are very good and healthy for your improvement." },
      { question: "I have a specific health issue, can it be cured by these classes?", answer: "There are a lot of students who have seen recovery from consistently practicing Yoga, you can check their stories here \n\nPCOS/Thyroid  - https://www.instagram.com/stories/highlights/18050149328274421/ \nPeriods  - \nhttps://www.instagram.com/stories/highlights/18035071781713365/ \nKnee Pain/Back Pain/Joint pains -\nhttps://www.instagram.com/stories/highlights/18096553333638672/ \nWeight Loss - \nhttps://www.instagram.com/stories/highlights/17904516210250223/ \nSleep - \nhttps://www.instagram.com/stories/highlights/18091905466813292/ \n\nYoga helps in resolving many lifestyle issues naturally. However you need to practice atleast 4-5 times a week consistently" },
      { question: "How to connect the class to TV", answer: "Once the class opens on YouTube, you will see a 'Cast' button at the top. Click that button to connect it to your Smart TV\n\nhttps://www.youtube.com/watch?v=pzar8KCCfjE" }
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
  const [studentStatus, setStudentStatus] = useState<string | null>(null);
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const cleanedMobile = mobile ? mobile.replace(/[\s\-\(\)\+]/g, "") : "";

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!cleanedMobile) {
        navigate("/leaderboard");
        return;
      }
      try {
        const response = await fetch(`/.netlify/functions/student?mobile=${encodeURIComponent("+" + cleanedMobile)}`);
        if (response.ok) {
          const data = await response.json();
          if (data?.name) {
            setStudentName(data.name);
          } else {
            navigate("/leaderboard");
          }

          if (data?.status) {
            setStudentStatus(data.status);
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
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudentData();
  }, [cleanedMobile, navigate]);

  const handleLanguageChange = async () => {
    setIsChangingLanguage(true);
    const newLanguage = language === "English" ? "Telugu" : "English";
    try {
      const response = await fetch("/.netlify/functions/update-language", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile: "+" + cleanedMobile,
          language: newLanguage
        })
      });
      if (response.ok) {
        setLanguage(newLanguage);
        setShowSuccessPopup(true);
      } else {
        toast.error("Failed to change language. Please try again.");
      }
    } catch (err) {
      console.error("Error changing language", err);
      toast.error("Failed to change language. Please try again.");
    } finally {
      setIsChangingLanguage(false);
    }
  };

  const activeFaqs = language === "Telugu" ? teluguFaqs : englishFaqs;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hd-page min-h-screen bg-[#FDFDFD]" style={{ fontFamily: "Outfit, sans-serif" }}>
      <header className="hd-header bg-white mb-8">
        <img src={logo} alt="Healthyday" className="h-7" />
      </header>
      <div className="max-w-3xl mx-auto px-4 pb-8">

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Hi {studentName ? `${studentName} ${language === 'English' ? 'ji' : 'గారు'}` : (language === 'English' ? 'ji' : 'అండీ')}
          </h1>
          <p className="text-gray-600 mb-6 text-base">
            I answered the most common questions here. Please check it out.
          </p>

        </div>

        {studentStatus?.toLowerCase() === 'paid' && (
          <div className="mb-8">
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
        )}

        {activeFaqs.filter(category => {
          if (!studentStatus) return true;
          const statusLower = studentStatus.toLowerCase();
          if (statusLower === 'paid') return true;
          
          const categoryLower = category.category.toLowerCase();
          if (statusLower === 'registered' && categoryLower.includes('registered')) return true;
          if (statusLower === 'ongoing' && categoryLower.includes('ongoing')) return true;
          return false;
        }).map((category, idx) => (
          <div key={idx} className="mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <Accordion type="single" collapsible className="w-full">
                {category.items.map((item, itemIdx) => (
                  <AccordionItem value={`item-${idx}-${itemIdx}`} key={itemIdx} className="border-b last:border-none px-6">
                    <AccordionTrigger className="text-left text-gray-800 font-semibold hover:no-underline hover:text-orange-600 transition-colors">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                      {item.answer === "ACTION_CHANGE_LANGUAGE" ? (
                        <div className="flex flex-col items-start gap-4">
                          <p>{language === 'English' ? "Would you like to switch the language to Telugu?" : "మీరు భాషను ఆంగ్లానికి (English) మార్చాలనుకుంటున్నారా?"}</p>
                          <button
                            onClick={handleLanguageChange}
                            disabled={isChangingLanguage}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
                          >
                            {isChangingLanguage ? "Changing..." : (language === 'English' ? "Change to Telugu" : "Change to English")}
                          </button>
                        </div>
                      ) : (
                        renderText(item.answer, cleanedMobile)
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        ))}



        <div className="flex justify-center mt-8 mb-8">
          <button
            onClick={() => {
              const message = language === 'English'
                ? "Namaste! I have a query."
                : "నమస్తే! నాకు ఒక ప్రశ్న ఉంది.";
              window.open(`https://wa.me/919052888968?text=${encodeURIComponent(message)}`, "_blank");
            }}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl shadow-sm transition-colors text-lg"
          >
            Contact Support Team
          </button>
        </div>

      </div>

      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setShowSuccessPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex flex-col items-center text-center mt-2">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Success!</h3>
              <p className="text-gray-600 text-lg">
                {language === "English" 
                  ? "Your language preference has been successfully updated to English." 
                  : "మీ భాష ప్రాధాన్యత విజయవంతంగా తెలుగుకు నవీకరించబడింది."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Faqs;
