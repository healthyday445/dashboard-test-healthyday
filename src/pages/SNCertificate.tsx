import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { safeLocalStorage } from "@/lib/storage";
import { fitFontSizeToWidth } from "@/lib/canvasText";
import {
  getCertificateCookie,
  setCertificateCookie,
  setCertificateChecked,
  checkServerCertificateStatus,
  trackCertificateActivity,
} from "@/lib/trackCertificateActivity";
import logo from "@/assets/Primary_logo.svg";
import { useStudentData } from "@/hooks/use-student-data";
import { Skeleton } from "@/components/ui/skeleton";
import snCertificateTemplate from "@/assets/badges/SN_Challenge_Certificate.webp";

function formatCertDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const yyyy = d.getUTCFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

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

export default function SNCertificate() {
  const { mobile: pathMobile } = useParams<{ mobile?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const queryMobile = searchParams.get("mobile");
  const queryName = searchParams.get("name");
  const isTestRoute = location.pathname.toLowerCase().includes("testsncertificate") || location.pathname.toLowerCase().includes("test-sn-certificate");
  const previewOverride = isTestRoute || searchParams.get("preview_sn") !== null || searchParams.get("preview") !== null || searchParams.get("preview_levels") !== null;
  const mobile = pathMobile || queryMobile || safeLocalStorage.getItem("user_mobile") || safeLocalStorage.getItem("mobile") || (previewOverride ? "test_user" : "");

  const [name, setName] = useState<string>(() => {
    if (queryName) return queryName;
    const stored = safeLocalStorage.getItem("user_name");
    if (stored && stored !== "Student") return stored;
    return "";
  });

  const [isEligible, setIsEligible] = useState<boolean | null>(previewOverride ? true : null);

  const [fontSize] = useState<number>(37);
  const [yPercent] = useState<number>(41.0);
  const [textColor] = useState<string>("#0D468B"); // Vivid Blue (#0D468B)
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false);
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  const [certificateDate, setCertificateDate] = useState<string | null>(null);
  const [checkingCertStatus, setCheckingCertStatus] = useState<boolean>(false);
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
    navigate(`/${finalMobile}/sn-certificate`);
  };

  // Fetch student data if mobile is present to evaluate paid status & pre-fill name
  const skipStudentFetch = !mobile || mobile === "test_user";
  const cleanedMobile = mobile ? mobile.replace(/[\s\-\(\)\+]/g, "") : "";
  const isValidMobile = /^\d{7,15}$/.test(cleanedMobile);
  const shouldFetchStudent = !skipStudentFetch && isValidMobile;
  const studentQuery = useStudentData(cleanedMobile, shouldFetchStudent);

  useEffect(() => {
    if (skipStudentFetch) return;
    if (!isValidMobile) {
      if (!previewOverride) setIsEligible(false);
      return;
    }
    if (studentQuery.isLoading) return; // wait for this fetch to settle before deriving anything

    const data = studentQuery.data;
    if (data) {
      if (data.name && data.name !== "Student") {
        setName((prev) => {
          if (!prev || prev === "Student") {
            safeLocalStorage.setItem("user_name", data.name);
            return data.name;
          }
          return prev;
        });
      }

      if (!previewOverride) {
        const isPaid = data.status === "paid" || data.status?.toLowerCase() === "paid";
        setIsEligible(isPaid);
      }
    } else {
      if (!previewOverride) setIsEligible(false);
    }
  }, [skipStudentFetch, isValidMobile, studentQuery.isLoading, studentQuery.data, previewOverride]);

  const loadingStudent = shouldFetchStudent && studentQuery.isLoading;

  // Check local storage & server status for rate limiting in production mode
  useLayoutEffect(() => {
    if (!mobile || previewOverride) return;
    const localStatus = getCertificateCookie(`sn_${mobile}`);

    if (localStatus.generated) {
      setIsRateLimited(true);
      setHasGenerated(true);
      setCertificateDate(localStatus.firstGeneratedAt ?? null);
      if (localStatus.name) {
        setName(localStatus.name);
      }
      return;
    }

    if (localStatus.checked) return;

    setCheckingCertStatus(true);
    checkServerCertificateStatus(`sn_${mobile}`)
      .then((serverStatus) => {
        if (!serverStatus) return;
        if (serverStatus.generated) {
          setIsRateLimited(true);
          setHasGenerated(true);
          setCertificateDate(serverStatus.firstGeneratedAt ?? null);
          if (serverStatus.name) {
            setName(serverStatus.name);
            setCertificateCookie(`sn_${mobile}`, serverStatus.name, serverStatus.firstGeneratedAt);
          }
        } else {
          setCertificateChecked(`sn_${mobile}`);
        }
      })
      .finally(() => setCheckingCertStatus(false));
  }, [mobile, previewOverride]);

  // Load certificate template image
  useEffect(() => {
    let active = true;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = snCertificateTemplate;
    const onImgReady = () => {
      if (!active) return;
      imgRef.current = img;
      setTemplateImg(img);
    };
    img.onload = onImgReady;
    if (img.complete && img.naturalWidth > 0) {
      onImgReady();
    }
    img.onerror = () => {
      console.error("Failed to load certificate template");
    };
    return () => {
      active = false;
    };
  }, []);

  const renderCertificate = useCallback((img: HTMLImageElement, targetCanvas?: HTMLCanvasElement | null) => {
    const canvas = targetCanvas || canvasRef.current;
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = img.naturalWidth || img.width || 1414;
    const height = img.naturalHeight || img.height || 2000;
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    const displayName = (name || "Your Name Here").trim();
    const baseFontSize = Math.round(fontSize * (width / 500));
    const maxTextWidth = width * 0.72;
    const fittedFontSize = fitFontSizeToWidth(ctx, displayName, maxTextWidth, baseFontSize);
    const fontSpec = `normal ${fittedFontSize}px "Times New Roman", serif`;

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

      const activeDate = certificateDate || new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString();
      const dateStr = formatCertDate(activeDate);
      if (dateStr) {
        ctx.save();
        ctx.font = `bold ${Math.round(width * 0.024)}px "Outfit", sans-serif`;
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "alphabetic";
        ctx.fillText(dateStr, width * 0.259, height * 0.865);
        ctx.restore();
      }
    };

    if (document.fonts && document.fonts.load) {
      document.fonts.load(fontSpec, displayName).then(() => {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        drawTextOverlay();
      }).catch(() => {
        drawTextOverlay();
      });
    } else {
      drawTextOverlay();
    }
  }, [name, fontSize, yPercent, textColor, certificateDate]);

  // Callback ref so whenever the canvas element mounts into the DOM, it immediately renders
  const canvasCallbackRef = useCallback((node: HTMLCanvasElement | null) => {
    canvasRef.current = node;
    if (node && templateImg && hasGenerated) {
      renderCertificate(templateImg, node);
      setTimeout(() => renderCertificate(templateImg, node), 50);
      setTimeout(() => renderCertificate(templateImg, node), 200);
      setTimeout(() => renderCertificate(templateImg, node), 600);
    }
  }, [templateImg, hasGenerated, renderCertificate]);

  // Synchronously draw canvas whenever templateImg loads, hasGenerated changes, or parameters change
  useEffect(() => {
    if (!hasGenerated || !templateImg) return;
    renderCertificate(templateImg);
    const id1 = setTimeout(() => renderCertificate(templateImg), 50);
    const id2 = setTimeout(() => renderCertificate(templateImg), 200);
    const id3 = setTimeout(() => renderCertificate(templateImg), 600);
    const id4 = setTimeout(() => renderCertificate(templateImg), 1200);
    return () => {
      clearTimeout(id1);
      clearTimeout(id2);
      clearTimeout(id3);
      clearTimeout(id4);
    };
  }, [hasGenerated, templateImg, renderCertificate]);

  // Redraw when document fonts are ready
  useEffect(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (hasGenerated && templateImg) {
          renderCertificate(templateImg);
        }
      });
    }
  }, [hasGenerated, templateImg, renderCertificate]);

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

    const nowIST = new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString();
    setCertificateDate(nowIST);

    if (!previewOverride) {
      await trackCertificateActivity({
        mobile: mobile ? `sn_${mobile}` : "sn_anonymous",
        name: finalName,
        activity: "generated",
        certificateType: "108_surya_namaskar",
      });
      setCertificateCookie(`sn_${mobile}`, finalName, nowIST);
      setIsRateLimited(true);
    }

    setIsGenerating(false);
    setHasGenerated(true);

    setTimeout(() => {
      if (templateImg) renderCertificate(templateImg);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

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

  const handleDownload = async () => {
    const blob = await getCanvasBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeName = (name || "Student").replace(/[^a-zA-Z0-9_-]/g, "_");
    a.download = `Healthyday_108_Surya_Namaskar_Certificate_${safeName}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (!previewOverride) {
      trackCertificateActivity({
        mobile: mobile ? `sn_${mobile}` : "sn_anonymous",
        name: name.trim(),
        activity: "downloaded",
        certificateType: "108_surya_namaskar",
      });
    }

    showFeedback("Certificate downloaded successfully! 🎉");
  };

  const handleNativeShare = async (shareType: "general" | "whatsapp" | "status" = "general") => {
    const blob = await getCanvasBlob();
    if (!blob) return;

    const safeName = (name || "Student").replace(/[^a-zA-Z0-9_-]/g, "_");
    const filename = `Healthyday_108_Surya_Namaskar_Certificate_${safeName}.jpg`;
    const file = new File([blob], filename, { type: "image/jpeg" });

    const referralLink = mobile ? `https://yoga.healthyday.co.in/?ref=${mobile}` : "https://yoga.healthyday.co.in/";
    const shareText =
      `I just completed the 108 Surya Namaskar Challenge with Healthyday! 🧘‍♀️💙\n\nIf I can do it, you can too. 😊\n\nStart your yoga journey for FREE.\nRegister Here 👇🏼\n${referralLink}\n\n🧘‍♀️ 14 Days FREE\n🗓 Starts NEXT MONDAY\nWith JAGAN 🧘‍♂️\n\n🌍 Internationally Certified Yoga Teacher\n👥 Trusted by 6,00,000+ Students`;

    if (!previewOverride) {
      trackCertificateActivity({
        mobile: mobile ? `sn_${mobile}` : "sn_anonymous",
        name: name.trim(),
        activity: "shared",
        shareType,
        certificateType: "108_surya_namaskar",
      });
    }

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        const isIOS = typeof navigator !== "undefined" && (/iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));
        const shareData: ShareData = {
          files: [file],
          title: `My 108 Surya Namaskar Challenge Certificate`,
        };
        if (!isIOS) {
          shareData.text = shareText;
        }
        await navigator.share(shareData);
        showFeedback("Shared successfully! 🌿");
        return;
      } catch (err: any) {
        if (err.name === "AbortError") {
          return;
        }
        console.error("Native share error:", err);
      }
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

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
          Back
        </button>
      </header>

      {/* Hero Banner */}
      <div className="w-full max-w-3xl px-4 mt-8 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0D468B] tracking-tight leading-tight">
          Congratulations !
        </h1>
        <p className="text-[#5A6577] text-base md:text-lg mt-2 max-w-xl mx-auto">
          You have completed the 108 Surya Namaskar Challenge. Here's your certificate..
        </p>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-3xl px-4 mt-6">
        {!mobile ? (
          /* Mobile Number Entry State when accessed directly at /SN-certificate */
          <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-[#FCE8CD] relative overflow-hidden animate-fade-in max-w-md mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-[#202020] mb-2 text-center">
              Enter Your WhatsApp Number
            </h2>
            <p className="text-sm text-[#798089] mb-6 text-center">
              Please enter your registered WhatsApp number to check your membership status and generate your completion certificate.
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
        ) : loadingStudent ? (
          <div className="bg-white rounded-[24px] p-12 text-center shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-[#FCE8CD]">
            <div className="w-10 h-10 border-4 border-[#FEAB27] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-lg font-bold text-[#0D468B]">Verifying Membership Status...</p>
            <p className="text-sm text-[#798089] mt-1">Please wait just a moment.</p>
          </div>
        ) : isEligible === false ? (
          /* Ineligible State: Non-paid / free users */
          <div className="bg-white rounded-[24px] p-8 md:p-10 text-center shadow-[0_15px_50px_rgba(0,0,0,0.08)] border border-[#FCE8CD] relative overflow-hidden">
            <div className="w-16 h-16 bg-[#FFF3D8] text-[#B37D00] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-inner">
              🔒
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D468B] mb-2">
              Certificate Access Restricted
            </h2>
            <p className="text-[#5A6577] text-base md:text-lg mb-6 max-w-md mx-auto leading-relaxed">
              The 108 Surya Namaskar Challenge Certificate is exclusively available for <span className="font-bold text-[#202020]">Paid Members</span>.
            </p>
            <div>
              <button
                onClick={() => navigate(mobile ? `/${mobile}` : "/")}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#FEAB27] to-[#F39C12] hover:from-[#F39C12] hover:to-[#E67E22] text-[#111111] font-extrabold text-base rounded-full shadow-[0_6px_20px_rgba(254,171,39,0.35)] hover:shadow-[0_8px_25px_rgba(254,171,39,0.5)] transform hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        ) : checkingCertStatus ? (
          <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-[#FCE8CD]">
            <Skeleton className="h-6 w-64 mx-auto mb-6 rounded-md" />
            <Skeleton className="h-3 w-24 mb-2 rounded-md" />
            <Skeleton className="h-14 w-full mb-6 rounded-xl" />
            <Skeleton className="h-14 w-full rounded-full" />
          </div>
        ) : !hasGenerated ? (
          /* Name Entry & Generate Card */
          <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-[#FCE8CD] relative overflow-hidden animate-fade-in">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FEAB27]/10 to-transparent rounded-bl-full pointer-events-none" />

            <h2 className="text-xl md:text-2xl font-bold text-[#202020] mb-6">
              Enter Your Name for the Certificate
            </h2>

            <div className="space-y-6">
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
                </div>
              </div>

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
          /* Certificate Preview & Actions */
          <div
            ref={certificateSectionRef}
            className="bg-white rounded-[24px] p-6 md:p-8 shadow-[0_15px_50px_rgba(0,0,0,0.08)] border border-[#FCE8CD] animate-fade-in"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#F5EADC]">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[#202020]">
                  Your 108 Surya Namaskar Completion Certificate
                </h2>
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
                  ref={canvasCallbackRef}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full py-3.5 px-5 bg-[#0D468B] hover:bg-[#083060] text-white font-bold text-base rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M7 10L12 15M12 15L17 10M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Download Certificate
                </button>

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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
