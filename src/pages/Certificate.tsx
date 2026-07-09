import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { safeLocalStorage } from "@/lib/storage";
import {
  getCertificateCookie,
  setCertificateCookie,
  checkServerCertificateStatus,
  trackCertificateActivity,
} from "@/lib/trackCertificateActivity";
import logo from "@/assets/Primary_logo.svg";

const CERTIFICATE_IMG_URL = "/FINAL.jpg";

const COUNTRIES = [
  { code: "91", iso: "in", name: "India" },
  { code: "1", iso: "us", name: "USA/Canada" },
  { code: "44", iso: "gb", name: "UK" },
  { code: "61", iso: "au", name: "Australia" },
  { code: "971", iso: "ae", name: "UAE" },
  { code: "65", iso: "sg", name: "Singapore" },
  { code: "60", iso: "my", name: "Malaysia" },
  { code: "966", iso: "sa", name: "Saudi Arabia" },
  { code: "968", iso: "om", name: "Oman" },
  { code: "974", iso: "qa", name: "Qatar" },
  { code: "965", iso: "kw", name: "Kuwait" },
  { code: "973", iso: "bh", name: "Bahrain" },
  { code: "49", iso: "de", name: "Germany" },
  { code: "33", iso: "fr", name: "France" },
  { code: "39", iso: "it", name: "Italy" },
  { code: "81", iso: "jp", name: "Japan" },
  { code: "86", iso: "cn", name: "China" },
];

export default function Certificate() {
  const { mobile: pathMobile } = useParams<{ mobile?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const queryMobile = searchParams.get("mobile");
  const queryName = searchParams.get("name");
  const mobile = pathMobile || queryMobile || safeLocalStorage.getItem("user_mobile") || safeLocalStorage.getItem("mobile") || "";

  // State for student name
  const [name, setName] = useState<string>(() => {
    if (queryName) return queryName;
    const stored = safeLocalStorage.getItem("user_name");
    if (stored) return stored;
    return "";
  });

  // State for attendance check (at least 7 days required)
  const [daysAttended, setDaysAttended] = useState<number | null>(() => {
    const previewParam = searchParams.get("preview_levels") || searchParams.get("preview") || searchParams.get("force_days");
    if (previewParam !== null) {
      if (previewParam === "true") return 21;
      const parsed = parseInt(previewParam, 10);
      if (!isNaN(parsed)) return parsed;
    }
    return null;
  });

  const [loadingStudent, setLoadingStudent] = useState(!!mobile && daysAttended === null);
  const [fontSize, setFontSize] = useState<number>(37); // Default size 37 as requested
  const [yPercent, setYPercent] = useState<number>(42); // Vertical positioning (~48% moves name slightly higher as requested)
  const [textColor, setTextColor] = useState<string>("#0F5132"); // Dark green default as requested
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false);
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  const [certificateUrl, setCertificateUrl] = useState<string | null>(null);
  const [shareFeedback, setShareFeedback] = useState<string>("");
  const [templateImg, setTemplateImg] = useState<HTMLImageElement | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const certificateSectionRef = useRef<HTMLDivElement | null>(null);

  const [inputMobile, setInputMobile] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("91");
  const [mobileError, setMobileError] = useState<string>("");

  const selectedCountry = COUNTRIES.find((c) => c.code === countryCode) || COUNTRIES[0];

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = inputMobile.replace(/[\s\-\(\)\+]/g, "");
    if (!/^\d{7,15}$/.test(cleaned)) {
      setMobileError("Please enter a valid mobile number");
      return;
    }
    let finalMobile = cleaned;
    if (countryCode === "91") {
      if (finalMobile.length === 10) {
        finalMobile = `91${finalMobile}`;
      } else if (!finalMobile.startsWith("91")) {
        finalMobile = `91${finalMobile}`;
      }
    } else {
      if (!finalMobile.startsWith(countryCode)) {
        finalMobile = `${countryCode}${finalMobile}`;
      }
    }
    safeLocalStorage.setItem("user_mobile", finalMobile);
    safeLocalStorage.setItem("mobile", finalMobile);
    navigate(`/${finalMobile}/certificate`);
  };

  // Fetch student data if mobile is present to pre-fill name and check 7 days attendance
  useEffect(() => {
    if (!mobile) {
      setLoadingStudent(false);
      return;
    }
    const cleanedMobile = mobile.replace(/[\s\-\(\)\+]/g, "");
    if (!/^\d{7,15}$/.test(cleanedMobile)) {
      setLoadingStudent(false);
      return;
    }
    const apiMobile = `+${cleanedMobile}`;
    const encodedMobile = encodeURIComponent(apiMobile);

    fetch(`/.netlify/functions/student?mobile=${encodedMobile}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        if (data) {
          if (data.name) {
            setName((prev) => {
              if (!prev || prev === "Student") {
                safeLocalStorage.setItem("user_name", data.name);
                return data.name;
              }
              return prev;
            });
          }
          // Check live attendance count
          if (daysAttended === null) {
            const freeBatches = (data.free_batches ?? []) as { batch_start_date: string; attendance_tracker: string[] }[];
            const activeBatches = freeBatches.filter((b) => b.batch_start_date === data.free_batch_start_date);
            const batchesToCheck = activeBatches.length > 0 ? activeBatches : freeBatches;
            const allDates = new Set<string>(batchesToCheck.flatMap((b) => b.attendance_tracker ?? []));
            setDaysAttended(Math.min(allDates.size, 21));
          }
        }
      })
      .catch(() => {
        if (daysAttended === null) setDaysAttended(21);
      })
      .finally(() => setLoadingStudent(false));
  }, [mobile]);

  // Check server-side generation status to sync from Firestore & Firebase Storage
  useEffect(() => {
    if (!mobile) return;
    checkServerCertificateStatus(mobile).then((status) => {
      if (status && status.generated) {
        setIsRateLimited(true);
        setHasGenerated(true);
        if (status.name) {
          setName(status.name);
        }
        if (status.certificateUrl) {
          setCertificateUrl(status.certificateUrl);
        }
      }
    });
  }, [mobile]);

  // Load the template image once and store in React state
  useEffect(() => {
    const img = new Image();
    img.src = CERTIFICATE_IMG_URL;
    const onImgReady = () => {
      imgRef.current = img;
      setTemplateImg(img);
    };
    img.onload = onImgReady;
    if (img.complete && img.naturalWidth > 0) {
      onImgReady();
    }
    img.onerror = () => {
      console.error("Failed to load certificate template FINAL.jpg");
    };
  }, []);

  // Synchronously draw canvas whenever templateImg loads, hasGenerated changes, or parameters change
  useEffect(() => {
    if (!hasGenerated || !templateImg) return;
    renderCertificate(templateImg);
    const id1 = setTimeout(() => renderCertificate(templateImg), 60);
    const id2 = setTimeout(() => renderCertificate(templateImg), 250);
    return () => {
      clearTimeout(id1);
      clearTimeout(id2);
    };
  }, [hasGenerated, templateImg, name, fontSize, yPercent, textColor]);

  const renderCertificate = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set native high-res dimensions
    const width = img.naturalWidth || img.width || 1414;
    const height = img.naturalHeight || img.height || 2000;
    canvas.width = width;
    canvas.height = height;

    // 1. Immediately draw background template synchronously so canvas is NEVER blank white
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    const displayName = (name || "Your Name Here").trim();
    const scaledFontSize = Math.round(fontSize * (width / 500));
    const fontSpec = `normal ${scaledFontSize}px "Times New Roman", serif`;

    const drawTextOverlay = () => {
      ctx.save();
      ctx.font = fontSpec;
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 2;

      const x = width / 2;
      const y = Math.round(height * (yPercent / 100));

      ctx.fillText(displayName, x, y);
      ctx.restore();
    };

    // 2. Overlay student name after ensuring font is loaded
    if (document.fonts && document.fonts.load) {
      document.fonts.load(fontSpec, displayName).then(() => {
        // Redraw base + text when font resolves
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        drawTextOverlay();
      }).catch(() => {
        drawTextOverlay();
      });
    } else {
      drawTextOverlay();
    }
  };

  const handleGenerate = async () => {
    if (isRateLimited) {
      alert("You have already generated your certificate (Rate limit: 1). You can download or share your existing certificate as many times as you like below.");
      setHasGenerated(true);
      return;
    }
    if (!name.trim()) {
      alert("Please enter your name for the certificate.");
      return;
    }
    const finalName = name.trim();
    safeLocalStorage.setItem("user_name", finalName);
    setIsGenerating(true);

    // Use offscreen canvas so high-res image base64 is guaranteed even before canvasRef is mounted
    let imageBase64: string | undefined;
    if (templateImg && templateImg.complete && templateImg.naturalWidth > 0) {
      const offscreen = document.createElement("canvas");
      const width = templateImg.naturalWidth || 1414;
      const height = templateImg.naturalHeight || 2000;
      offscreen.width = width;
      offscreen.height = height;
      const ctx = offscreen.getContext("2d");
      if (ctx) {
        ctx.drawImage(templateImg, 0, 0, width, height);
        const displayName = (finalName || "Your Name Here").trim();
        const scaledFontSize = Math.round(fontSize * (width / 500));
        ctx.font = `normal ${scaledFontSize}px "Times New Roman", serif`;
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 2;
        ctx.fillText(displayName, width / 2, Math.round(height * (yPercent / 100)));
        imageBase64 = offscreen.toDataURL("image/jpeg", 0.88);
      }
    }

    // Log certificate generation to Firestore collection 'certificate logs' & upload image to Cloud Storage
    const res = await trackCertificateActivity({
      mobile,
      name: finalName,
      activity: "generated",
      daysAttended,
      imageBase64,
    });

    if (res && res.updated && res.updated.certificateUrl) {
      setCertificateUrl(res.updated.certificateUrl);
    }

    setIsGenerating(false);
    setCertificateCookie(mobile, finalName);
    setIsRateLimited(true);
    setHasGenerated(true);

    setTimeout(() => {
      if (templateImg) renderCertificate(templateImg);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };


  // Helper to convert canvas to Blob
  const getCanvasBlob = (): Promise<Blob | null> => {
    return new Promise((resolve) => {
      if (!canvasRef.current) {
        resolve(null);
        return;
      }
      canvasRef.current.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg", 0.95);
    });
  };

  // Download action
  const handleDownload = async () => {
    const blob = await getCanvasBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeName = (name || "Student").replace(/[^a-zA-Z0-9_-]/g, "_");
    a.download = `Healthyday_21Days_Certificate_${safeName}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Log download activity to Firestore collection 'certificate logs'
    trackCertificateActivity({
      mobile,
      name: name.trim(),
      activity: "downloaded",
      daysAttended,
    });

    showFeedback("Certificate downloaded successfully! 🎉");
  };

  // Native Web Share action (for WhatsApp & WhatsApp Status)
  const handleNativeShare = async (shareType: "general" | "whatsapp" | "status" = "general") => {
    const blob = await getCanvasBlob();
    if (!blob) return;

    const safeName = (name || "Student").replace(/[^a-zA-Z0-9_-]/g, "_");
    const filename = `Healthyday_Certificate_${safeName}.jpg`;
    const file = new File([blob], filename, { type: "image/jpeg" });

    const shareText =
      "🌿 I just completed the 21-Days Yoga Challenge with Healthyday and earned my official certificate! 🧘‍♀️✨\n\nConsistency and dedication truly transform life. If I can build this healthy habit, you can do it too! 💚\n\n👇 Register for the next FREE Yoga Challenge here:\nhttps://yoga.healthyday.co.in";

    // Log share activity to Firestore collection 'certificate logs'
    trackCertificateActivity({
      mobile,
      name: name.trim(),
      activity: "shared",
      shareType,
      daysAttended,
    });

    // Check if browser supports sharing files via Web Share API
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "My 21-Days Yoga Completion Certificate",
          text: shareText,
        });
        showFeedback("Shared successfully! 🌿");
        return;
      } catch (err: any) {
        if (err.name === "AbortError") {
          return;
        }
        console.error("Native share error:", err);
      }
    }

    // Fallback if file sharing is unsupported (e.g., Desktop browsers or older WebViews)
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Open WhatsApp Web/mobile with text prompt
    const waUrl = `https://wa.me/?text=${encodeURIComponent(
      shareType === "status"
        ? `[Certificate Downloaded! Attach image to your WhatsApp Status]\n\n${shareText}`
        : shareText
    )}`;
    window.open(waUrl, "_blank");
    showFeedback("Image downloaded! Attach it to your WhatsApp Status or send to friends. ✨");
  };

  const showFeedback = (msg: string) => {
    setShareFeedback(msg);
    setTimeout(() => {
      setShareFeedback("");
    }, 4500);
  };

  // Check if attendance is under 7 days
  const isLocked = daysAttended !== null && daysAttended < 7;

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#FFFDF9] via-[#FFF8EE] to-[#FFF0DB] flex flex-col items-center pb-16"
      style={{ fontFamily: "Outfit, sans-serif", color: "#202020" }}
    >
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-[#F3E5D0] shadow-xs py-3 px-4 flex items-center justify-between max-w-4xl mx-auto rounded-b-2xl">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(mobile ? `/${mobile}` : "/")}>
          <img src={logo} alt="Healthyday" className="h-7" />
        </div>
        <button
          onClick={() => navigate(-1 as any)}
          className="flex items-center gap-1.5 text-sm font-semibold text-[#0D468B] hover:text-[#FEAB27] transition-colors bg-[#F4F8FF] px-3.5 py-1.5 rounded-full border border-[#D5E5FF]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Journey
        </button>
      </header>

      {/* Hero Banner */}
      <div className="w-full max-w-3xl px-4 mt-8 text-center">
        <div className="inline-flex items-center gap-2 bg-[#FFF3D8] text-[#B37D00] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-[#FEE3A2] shadow-xs">
          <span>🎉 21-Days Yoga Completion Certificate</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0D468B] tracking-tight leading-tight">
          Your Official Completion Certificate
        </h1>
        <p className="text-[#5A6577] text-base md:text-lg mt-2 max-w-xl mx-auto">
          Celebrate your consistency and devotion! Verify your name and generate your high-resolution certificate.
        </p>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-3xl px-4 mt-6">
        {!mobile ? (
          /* Mobile Number Entry State when accessed directly at /certificate */
          <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-[#FCE8CD] relative overflow-hidden animate-fade-in max-w-md mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-[#202020] mb-2 text-center">
              Enter Your WhatsApp Number
            </h2>
            <p className="text-sm text-[#798089] mb-6 text-center">
              Please enter your registered WhatsApp number to check your attendance and unlock your completion certificate.
            </p>
            <form onSubmit={handleMobileSubmit} className="space-y-4">
              <div className="relative flex items-center border border-[#D4D4D4] rounded-xl bg-white overflow-hidden focus-within:ring-1 focus-within:ring-[#FEAB27] focus-within:border-[#FEAB27] transition-all">
                <div className="flex items-center pl-4 pr-2 py-3.5 bg-white relative">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full"
                    title="Select Country Code"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.iso + c.code} value={c.code}>
                        {c.name} (+{c.code})
                      </option>
                    ))}
                  </select>
                  <img src={`https://flagcdn.com/w20/${selectedCountry.iso}.png`} alt={selectedCountry.name} className="w-5 rounded-[2px]" />
                  <span className="text-[#202020] font-medium ml-2 text-sm">+{countryCode}</span>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1.5">
                    <path d="M1 1L5 5L9 1" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[#D4D4D4] ml-2 mr-0.5 text-sm">·</span>
                </div>
                <input
                  type="tel"
                  value={inputMobile}
                  onChange={(e) => {
                    setInputMobile(e.target.value);
                    if (mobileError) setMobileError("");
                  }}
                  placeholder="Enter Your Whatsapp Number"
                  className="w-full py-3.5 pr-4 focus:outline-none bg-white placeholder:text-[#919CB4] text-[#202020] text-sm font-semibold"
                />
              </div>
              {mobileError && <p className="text-[#D32F2F] text-xs font-medium bg-[#FFF3F3] p-2.5 rounded-lg text-center">{mobileError}</p>}
              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-[#FEAB27] to-[#F39C12] hover:from-[#F39C12] hover:to-[#E67E22] text-[#111111] font-extrabold text-base rounded-full shadow-[0_6px_20px_rgba(254,171,39,0.35)] hover:shadow-[0_8px_25px_rgba(254,171,39,0.5)] transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Continue to Certificate →
              </button>
            </form>
          </div>
        ) : loadingStudent && daysAttended === null ? (
          <div className="bg-white rounded-[24px] p-12 text-center shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-[#FCE8CD]">
            <div className="w-10 h-10 border-4 border-[#FEAB27] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-lg font-bold text-[#0D468B]">Verifying Your Attendance & Eligibility...</p>
            <p className="text-sm text-[#798089] mt-1">Please wait just a moment.</p>
          </div>
        ) : isLocked ? (
          /* Locked State: Under 7 days attended */
          <div className="bg-white rounded-[24px] p-8 md:p-10 text-center shadow-[0_15px_50px_rgba(0,0,0,0.08)] border border-[#FCE8CD] relative overflow-hidden">
            <div className="w-16 h-16 bg-[#FFF3D8] text-[#B37D00] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-inner">
              🔒
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D468B] mb-2">
              Certificate Locked
            </h2>
            <p className="text-[#5A6577] text-base md:text-lg mb-6 max-w-md mx-auto leading-relaxed">
              You need to attend <span className="font-bold text-[#202020]">at least 7 days</span> of live yoga classes to unlock and generate your official completion certificate.
            </p>
            <div className="bg-[#FFFDF9] border-2 border-[#F5EADC] rounded-2xl p-5 mb-8 inline-block w-full max-w-sm shadow-xs">
              <div className="text-xs uppercase font-bold tracking-wider text-[#798089] mb-1">Your Live Attendance</div>
              <div className="text-3xl font-extrabold text-[#FEAB27]">{daysAttended} / 7 Days</div>
              <div className="text-xs font-semibold text-[#5A6577] mt-1.5">
                Attend {7 - (daysAttended || 0)} more class{7 - (daysAttended || 0) !== 1 ? "es" : ""} to unlock!
              </div>
            </div>
            <div>
              <button
                onClick={() => navigate(mobile ? `/${mobile}` : "/")}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#FEAB27] to-[#F39C12] hover:from-[#F39C12] hover:to-[#E67E22] text-[#111111] font-extrabold text-base rounded-full shadow-[0_6px_20px_rgba(254,171,39,0.35)] hover:shadow-[0_8px_25px_rgba(254,171,39,0.5)] transform hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                Go to My Journey &amp; Join Today's Class
              </button>
            </div>
          </div>
        ) : !hasGenerated ? (
          /* Name Entry & Generate Card (Disappears after clicking Generate My Certificate) */
          <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-[#FCE8CD] relative overflow-hidden animate-fade-in">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FEAB27]/10 to-transparent rounded-bl-full pointer-events-none" />

            <h2 className="text-xl md:text-2xl font-bold text-[#202020] mb-2">
              Enter Your Name for the Certificate
            </h2>
            <p className="text-sm text-[#798089] mb-6">
              We showed the name already present in our system. If you want to edit or change how it appears, you can customize it right here.
            </p>

            <div className="space-y-6">
              {/* Name Input */}
              <div>
                <label htmlFor="student-name" className="block text-xs font-bold uppercase tracking-wider text-[#5A6577] mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="student-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={loadingStudent ? "Loading your name..." : "Enter your full name"}
                    disabled={loadingStudent}
                    className="w-full px-4 py-3.5 text-lg font-semibold text-[#202020] bg-[#F9FBFF] rounded-xl border-2 border-[#DCE8FF] focus:border-[#FEAB27] focus:bg-white focus:outline-none transition-all shadow-inner"
                  />
                  {loadingStudent && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[#888] animate-pulse">
                      Loading...
                    </div>
                  )}
                </div>
              </div>

              {/* Generate Button */}
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating || !name.trim()}
                className="w-full py-4 px-6 bg-gradient-to-r from-[#FEAB27] to-[#F39C12] hover:from-[#F39C12] hover:to-[#E67E22] text-[#111111] font-extrabold text-lg rounded-full shadow-[0_6px_20px_rgba(254,171,39,0.35)] hover:shadow-[0_8px_25px_rgba(254,171,39,0.5)] transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer tracking-wide"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Generating Your Certificate...
                  </>
                ) : (
                  <>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                    </svg>
                    GENERATE MY CERTIFICATE
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Certificate Preview & Actions (Shown after window disappears) */
          <div
            ref={certificateSectionRef}
            className="bg-white rounded-[24px] p-6 md:p-8 shadow-[0_15px_50px_rgba(0,0,0,0.08)] border border-[#FCE8CD] animate-fade-in"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#F5EADC]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl md:text-2xl font-bold text-[#202020]">
                    Your Official Certificate Preview
                  </h2>
                  {isRateLimited && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F8F0] border border-[#A9DFBF] text-[#145A32] text-xs font-bold">
                      ✓ Issued (Limit 1/1)
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#798089]">
                  High-definition completion certificate ready for unlimited download and sharing.
                </p>
              </div>
              {!isRateLimited && (
                <button
                  type="button"
                  onClick={() => setHasGenerated(false)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D468B] hover:text-[#FEAB27] bg-[#F4F8FF] hover:bg-[#E8F1FF] px-3.5 py-2 rounded-full border border-[#D5E5FF] transition-all self-start md:self-center cursor-pointer"
                >
                  ← Edit Name
                </button>
              )}
            </div>

            {/* Feedback Toast */}
            {shareFeedback && (
              <div className="mb-6 p-4 bg-[#E8F8F0] border border-[#2ECC71]/30 text-[#1E824C] font-semibold text-sm rounded-xl flex items-center justify-between shadow-sm animate-fade-in">
                <span className="flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {shareFeedback}
                </span>
                <button onClick={() => setShareFeedback("")} className="text-[#1E824C] hover:text-[#145A32] font-bold">
                  ✕
                </button>
              </div>
            )}

            {/* Canvas Display */}
            <div className="w-full flex justify-center bg-gradient-to-b from-[#FFFDF9] via-[#FFF3D8]/60 to-[#FFFDF9] p-4 md:p-8 rounded-2xl border-2 border-[#FEE3A2] shadow-sm overflow-hidden mb-8">
              <div className="relative max-w-full overflow-auto rounded-xl shadow-2xl bg-white border border-[#F5EADC]">
                <canvas
                  ref={canvasRef}
                  className="max-w-full h-auto block rounded-xl mx-auto"
                  style={{ maxHeight: "75vh", width: "auto" }}
                />
              </div>
            </div>

            {/* Action Buttons Bar */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#5A6577] text-center mb-3">
                Download or Share Your Achievement
              </h3>

              {/* Primary Actions Grid: Download & General Native Share */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Download Button */}
                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full py-3.5 px-5 bg-[#0D468B] hover:bg-[#083060] text-white font-bold text-base rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M7 10L12 15M12 15L17 10M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Download Certificate
                </button>

                {/* Native Share Button */}
                <button
                  type="button"
                  onClick={() => handleNativeShare("general")}
                  className="w-full py-3.5 px-5 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#1EBD5A] hover:to-[#0E7064] text-white font-bold text-base rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer btn-vibrate btn-shimmer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Share Certificate
                </button>
              </div>

              {/* Dedicated WhatsApp Mobile & Status Buttons */}
              <div className="pt-3 border-t border-[#F5EADC]">
                <p className="text-xs text-center text-[#798089] mb-3">
                  📱 <span className="font-semibold text-[#202020]">Mobile Tip:</span> Click below to open WhatsApp directly with your certificate image ready for your friends or WhatsApp Status!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Share on WhatsApp Mobile */}
                  <button
                    type="button"
                    onClick={() => handleNativeShare("whatsapp")}
                    className="w-full py-3 px-4 bg-[#E8FBF0] hover:bg-[#D2F7E2] text-[#128C7E] border border-[#A5EAC6] font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer btn-vibrate btn-shimmer"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.031 6.172C8.814 6.172 6.195 8.791 6.195 12.008C6.195 13.044 6.467 14.041 6.974 14.912L6.147 17.935L9.231 17.126C10.069 17.587 11.037 17.842 12.031 17.842C15.248 17.842 17.867 15.223 17.867 12.006C17.867 8.789 15.248 6.172 12.031 6.172ZM12.031 4C16.447 4 20.039 7.592 20.039 12.008C20.039 16.424 16.447 20.016 12.031 20.016C10.627 20.016 9.309 19.652 8.161 19.014L4 20.108L5.115 16.038C4.417 14.838 4.023 13.461 4.023 12.008C4.023 7.592 7.615 4 12.031 4ZM16.068 14.184C15.847 14.847 14.779 15.4 14.227 15.474C13.784 15.534 13.232 15.57 11.428 14.871C9.122 13.978 7.63 11.644 7.513 11.488C7.403 11.332 6.576 10.229 6.576 9.088C6.576 7.947 7.165 7.395 7.403 7.156C7.587 6.972 7.881 6.898 8.157 6.898C8.249 6.898 8.332 6.903 8.405 6.907C8.626 6.917 8.736 6.935 8.883 7.284C9.067 7.726 9.518 8.83 9.573 8.94C9.628 9.051 9.683 9.216 9.61 9.363C9.536 9.51 9.472 9.584 9.362 9.713C9.252 9.842 9.141 9.934 9.031 10.072C8.93 10.191 8.81 10.32 8.939 10.54C9.067 10.761 9.513 11.488 10.166 12.068C11.008 12.815 11.725 13.054 11.964 13.155C12.148 13.238 12.35 13.219 12.479 13.082C12.645 12.907 12.847 12.604 13.049 12.301C13.197 12.08 13.381 12.052 13.583 12.126C13.785 12.2 14.87 12.734 15.091 12.844C15.312 12.955 15.459 13.01 15.514 13.102C15.569 13.194 15.569 13.636 15.348 14.299" />
                    </svg>
                    Share on WhatsApp Mobile
                  </button>

                  {/* Add to WhatsApp Status */}
                  <button
                    type="button"
                    onClick={() => handleNativeShare("status")}
                    className="w-full py-3 px-4 bg-[#FFF9E6] hover:bg-[#FFF2CD] text-[#B37D00] border border-[#FFE18E] font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z" />
                    </svg>
                    Add to WhatsApp Status ✨
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
