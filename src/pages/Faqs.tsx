import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
        answer: "June 21st nunchi start avutayi andi"
      },
      {
        question: "Timings cheppandi",
        answer: "Timings (Join any batch any day)\n\n☀️ Morning:\n* 5.30 AM - 6.30 AM\n* 6.30 AM - 7.30 AM\n* 7.30 AM - 8.30 AM\n* 8:30 AM - 9:30 AM\n\n🌝 Evening:\n* 4.30 PM - 5.30 PM\n* 5.30 PM - 6.30 PM\n* 6.30 PM - 7.30 PM\n\nమీ link తో ఈ timings లో మీరు ఏ batch అయినా join కావచ్చు.\nLink కేవలం పైన పెట్టిన timings లో మాత్రమే open అవుతుంది. Recordings వుండవు."
      },
      { question: "Ela join avvali? Class Link epudu pampistaaru", answer: "For more details on this, please check our WhatsApp updates or contact support." },
      { question: "Periods lo join kavacha?", answer: "Yes, we have a separate link for period yoga. Please check your WhatsApp messages or reach out to support." },
      { question: "Fee emaina pay cheyaala?", answer: "The initial 14-day program is completely free. After that, you can choose to upgrade to a paid plan." },
      { question: "Yoga Kit ela win avvali?", answer: "You can win a Yoga kit by referring friends to our program! Check your dashboard for referral milestones." },
      { question: "Naa Referral Count Tappu Chupistundi", answer: "Sometimes it takes a few minutes to sync. Please contact our support team if the issue persists." },
      { question: "Introduction Session Link pettandi", answer: "You will receive the introduction session link via WhatsApp before your batch starts." },
      { question: "Health Issues cure avutaaya?", answer: "Yoga is a great way to manage many health issues, but for specific conditions, please consult your doctor first." }
    ]
  },
  {
    category: "Ongoing Week1",
    items: [
      { question: "Periods Yoga link pettandi", answer: "Please check your WhatsApp messages or contact support for the Period Yoga link." },
      { question: "Class link open kavatam ledu", answer: "Please make sure you are clicking the link during the class timings mentioned in your schedule." },
      { question: "Link open cheste restricted mode ani vastundi", answer: "Please ensure your device or YouTube app does not have Restricted Mode enabled in settings." },
      { question: "Naa Referral Count Tappu Chupistundi", answer: "Sometimes it takes a few minutes to sync. Please contact our support team if the issue persists." },
      { question: "Attendance Tappu Vachindi", answer: "Attendance might take up to an hour to update. If it's still incorrect, please contact support." },
      { question: "Body Pains Vastunnayi", answer: "Mild body pains are common when starting yoga. They will subside as your body gets used to the practice." },
      { question: "Health Issues cure avutaaya?", answer: "Consistent yoga practice can help manage and alleviate many issues, but please consult your doctor for medical advice." },
      { question: "TV ki ela connect chesukovaali", answer: "You can use a chromecast, a smart TV with the YouTube app, or an HDMI cable from your laptop." }
    ]
  }
];

const englishFaqs = [
  {
    category: "Registered",
    items: [
      {
        question: "When will classes start?",
        answer: "Classes will start from June 21st."
      },
      {
        question: "What are the timings?",
        answer: "Timings (Join any batch any day)\n\n☀️ Morning:\n* 5.30 AM - 6.30 AM\n* 6.30 AM - 7.30 AM\n* 7.30 AM - 8.30 AM\n* 8:30 AM - 9:30 AM\n\n🌝 Evening:\n* 4.30 PM - 5.30 PM\n* 5.30 PM - 6.30 PM\n* 6.30 PM - 7.30 PM\n\nYou can join any batch during these timings using your link.\nThe link will only be active during the above timings. No recordings are provided."
      },
      { question: "How to join? When will I get the class link", answer: "You will receive the class link on WhatsApp before your batch starts." },
      { question: "Can I join during periods?", answer: "Yes, we have a separate period yoga link. Please check WhatsApp or contact support." },
      { question: "Do we need to pay any fee?", answer: "The initial 14-day program is completely free. After that, you can choose to upgrade to a paid plan." },
      { question: "How to win a Yoga Kit?", answer: "You can win a Yoga kit by referring friends to our program! Check your dashboard for referral milestones." },
      { question: "My referral count is incorrect", answer: "Sometimes it takes a few minutes to sync. Please contact our support team if the issue persists." },
      { question: "How to join Introduction Session?", answer: "You will receive the introduction session link via WhatsApp before your batch starts." },
      { question: "I have health issues, will they be cured with yoga?", answer: "Consistent yoga practice helps manage many conditions, but please consult your doctor for medical advice." }
    ]
  },
  {
    category: "Ongoing Week 1",
    items: [
      { question: "I am in Periods. Can I do yoga?", answer: "Yes! Please request the special period yoga link via WhatsApp or contact support." },
      { question: "Class Link is not opening", answer: "Please ensure you are clicking the link during the class timings mentioned in your schedule." },
      { question: "Getting restricted mode error", answer: "Please ensure your device or YouTube app does not have Restricted Mode enabled in settings." },
      { question: "My referral count is incorrect", answer: "Sometimes it takes a few minutes to sync. Please contact our support team if the issue persists." },
      { question: "My attendance is incorrect", answer: "Attendance might take up to an hour to update. If it's still incorrect, please contact support." },
      { question: "I am having body pains after class", answer: "Mild body pains are common when starting yoga. They will subside as your body gets used to the practice." },
      { question: "I have a health issue, can it be cured by these classes?", answer: "Consistent yoga practice helps manage many conditions, but please consult your doctor for medical advice." },
      { question: "How to connect the class to TV", answer: "You can cast from your phone, use the YouTube app on a smart TV, or connect an HDMI cable." }
    ]
  }
];

const renderText = (text: string) => {
  return text.split('\n').map((line, i) => {
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
    return <span key={i}>{line}<br /></span>;
  });
};

const Faqs = () => {
  const { mobile } = useParams<{ mobile: string }>();
  const [language, setLanguage] = useState<"Telugu" | "English">("Telugu");
  const [studentName, setStudentName] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!mobile) return;
      const cleanedMobile = mobile.replace(/[\s\-\(\)\+]/g, "");
      try {
        const response = await fetch(`/.netlify/functions/student?mobile=${encodeURIComponent("+" + cleanedMobile)}`);
        if (response.ok) {
          const data = await response.json();
          if (data?.name) {
            setStudentName(data.name);
          }
        }
      } catch (err) {
        console.error("Failed to fetch student data", err);
      }
    };
    fetchStudentData();
  }, [mobile]);

  const activeFaqs = language === "Telugu" ? teluguFaqs : englishFaqs;

  return (
    <div className="hd-page min-h-screen bg-[#FDFDFD] px-4 py-8" style={{ fontFamily: "Outfit, sans-serif" }}>
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Healthyday" className="h-10" />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Hi {studentName ? `${studentName} ji` : "ji"}
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            Do you have any query or issue?<br />
            I answered the most common questions here. Please check it out.
          </p>

          <div className="flex items-center gap-3 bg-orange-50 p-1.5 rounded-lg w-fit">
            <button
              onClick={() => setLanguage("Telugu")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                language === "Telugu"
                  ? "bg-white text-orange-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Telugu
            </button>
            <button
              onClick={() => setLanguage("English")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                language === "English"
                  ? "bg-white text-orange-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              English
            </button>
          </div>
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
                      {renderText(item.answer)}
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
                    {renderText(item.answer)}
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
