import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  trackCertificateActivity,
  getCertificateCookie,
  setCertificateCookie,
  setCertificateChecked,
  checkServerCertificateStatus,
} from "@/lib/trackCertificateActivity";
import { safeLocalStorage } from "@/lib/storage";
import { fitFontSizeToWidth } from "@/lib/canvasText";
import { Skeleton } from "@/components/ui/skeleton";
import certificate14Days from "@/assets/badges/certificate_14days.webp";
import certificate21Days from "@/assets/badges/certificate_21days.webp";

const CERTIFICATE_TEMPLATES: Record<14 | 21, string> = {
  14: certificate14Days,
  21: certificate21Days,
};

// certificate_21days.jpg has a fake sample date ("13-07-2026") baked into its artwork
// (pre-dates this codebase's history) — drawing a real date on top of it would double up as
// garbled overlapping text, so only the 14-day template (a genuinely blank line) gets one
// until that asset is cleaned up.
const CAN_RENDER_DATE: Record<14 | 21, boolean> = { 14: true, 21: false };

function formatCertDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  // `iso` is already IST-shifted then ISO-stringified (see certificate-logs.js's `nowIST`),
  // so reading UTC getters here yields the correct IST calendar date without a second shift.
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const yyyy = d.getUTCFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  mobile?: string;
  initialName?: string;
  daysAttended?: number | null;
  programDays: 14 | 21;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  mobile,
  initialName,
  daysAttended,
  programDays,
}) => {
  const [name, setName] = useState<string>(initialName || "");
  const [certificateDate, setCertificateDate] = useState<string | null>(null);
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [templateImg, setTemplateImg] = useState<HTMLImageElement | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [checkedPrior, setCheckedPrior] = useState<boolean>(false);
  const [canvasReady, setCanvasReady] = useState<boolean>(false);
  const [checkingExistence, setCheckingExistence] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Pre-fill name when prop changes or from local storage
  useEffect(() => {
    if (initialName && initialName !== "Student") {
      setName(initialName);
    } else {
      const storedName = safeLocalStorage.getItem("user_name");
      if (storedName && storedName !== "Student") {
        setName(storedName);
      }
    }
  }, [initialName]);

  // When modal opens, decide whether to show the name form or jump straight to the
  // certificate preview. `useLayoutEffect` (not `useEffect`) so a cached local answer is
  // applied before the browser paints — otherwise the name form flashes for a frame before
  // swapping to the preview. Local storage is checked first and, once we've ever confirmed
  // an answer from the server for this mobile (the `checked` flag), it's trusted forever —
  // a "not generated yet" student would otherwise trigger a fresh Firestore read on every
  // single open, which is the slow path this is specifically avoiding.
  useLayoutEffect(() => {
    if (!isOpen) {
      // Reset check flag when modal closes so it re-checks next time
      setCheckedPrior(false);
      setCheckingExistence(false);
      return;
    }
    if (checkedPrior) return;
    setCheckedPrior(true);

    const cleanMobile = mobile || "";
    const localStatus = getCertificateCookie(cleanMobile);

    if (localStatus.generated && localStatus.name) {
      setName(localStatus.name);
      setCertificateDate(localStatus.firstGeneratedAt ?? null);
      setHasGenerated(true);
      return;
    }

    if (localStatus.checked) return; // already asked the server once before — trust it

    if (cleanMobile) {
      setCheckingExistence(true);
      checkServerCertificateStatus(cleanMobile)
        .then((serverStatus) => {
          if (!serverStatus) return; // network/parse failure — don't cache, retry next open
          if (serverStatus.generated && serverStatus.name) {
            setName(serverStatus.name);
            setCertificateDate(serverStatus.firstGeneratedAt ?? null);
            setHasGenerated(true);
            setCertificateCookie(cleanMobile, serverStatus.name, serverStatus.firstGeneratedAt);
          } else {
            setCertificateChecked(cleanMobile);
          }
        })
        .finally(() => setCheckingExistence(false));
    }
  }, [isOpen, mobile, checkedPrior]);

  // Load template image
  useEffect(() => {
    const templateSrc = CERTIFICATE_TEMPLATES[programDays];
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = templateSrc;
    img.onload = () => {
      setTemplateImg(img);
    };
    img.onerror = () => {
      console.error(`Failed to load certificate template ${templateSrc}`);
    };
  }, [programDays]);

  const fontSize = 37;
  const yPercent = 42;
  const textColor = "#0F5132";

  const renderCertificate = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
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
    const maxTextWidth = width * 0.72; // leaves margin for the certificate's decorative border
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

      if (CAN_RENDER_DATE[programDays] && certificateDate) {
        const dateStr = formatCertDate(certificateDate);
        if (dateStr) {
          ctx.save();
          ctx.font = `bold ${Math.round(width * 0.024)}px "Outfit", sans-serif`;
          ctx.fillStyle = textColor;
          ctx.textAlign = "center";
          ctx.textBaseline = "alphabetic";
          // Sits just above the template's printed "Date" underline (measured on the
          // certificate artwork directly — both the 14/21-day templates share this layout).
          ctx.fillText(dateStr, width * 0.259, height * 0.848);
          ctx.restore();
        }
      }
    };

    if (document.fonts && document.fonts.load) {
      document.fonts.load(fontSpec, displayName)
        .then(() => {
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
          drawTextOverlay();
          setCanvasReady(true);
        })
        .catch(() => {
          drawTextOverlay();
          setCanvasReady(true);
        });
    } else {
      drawTextOverlay();
      setCanvasReady(true);
    }
  };

  // Always render the certificate client-side from the local template + name — the Firebase
  // Storage bucket has no CORS config, so loading the stored image cross-origin into the canvas
  // was non-deterministic (worked once, then blank on later opens). Re-runs on every reopen
  // (isOpen dependency) since closing the modal unmounts the <canvas> DOM node (see the
  // `if (!isOpen) return null` below) — without `isOpen` here, a reopen with otherwise-unchanged
  // hasGenerated/templateImg/name would skip this effect and leave the freshly remounted canvas
  // blank until a full page refresh forced everything to re-run from scratch.
  useEffect(() => {
    if (!isOpen || !hasGenerated || !templateImg) return;
    setCanvasReady(false);
    renderCertificate(templateImg);
  }, [isOpen, hasGenerated, templateImg, name, certificateDate]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsGenerating(true);
    safeLocalStorage.setItem("user_name", name.trim());

    // Same IST-shift the server uses for `firstGeneratedAt` (see certificate-logs.js) — set
    // optimistically now so the very first canvas render already shows the correct date
    // instead of waiting on the POST round trip below.
    const nowIST = new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString();
    setCertificateDate(nowIST);

    // Persist certificate status locally so next open skips the name form
    setCertificateCookie(mobile || "", name.trim(), nowIST);

    // Switch to step 2 preview immediately
    setHasGenerated(true);

    // Track generation in Firestore (analytics only, no image upload)
    try {
      await trackCertificateActivity({
        mobile,
        name: name.trim(),
        activity: "generated",
        daysAttended: daysAttended ?? undefined,
      });
    } catch (err) {
      console.error("Error logging certificate generation:", err);
    } finally {
      setIsGenerating(false);
    }
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
    if (!canvasReady) return;
    const blob = await getCanvasBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeName = (name || "Student").replace(/[^a-zA-Z0-9_-]/g, "_");
    a.download = `Healthyday_${programDays}Days_Certificate_${safeName}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    trackCertificateActivity({
      mobile,
      name: name.trim(),
      activity: "downloaded",
      daysAttended: daysAttended ?? undefined,
    });

    setFeedback("Certificate downloaded successfully!");
    setTimeout(() => setFeedback(""), 3000);
  };

  const handleShare = async () => {
    if (!canvasReady) return;
    const blob = await getCanvasBlob();
    if (!blob) return;

    const safeName = (name || "Student").replace(/[^a-zA-Z0-9_-]/g, "_");
    const filename = `Healthyday_Certificate_${safeName}.jpg`;
    const file = new File([blob], filename, { type: "image/jpeg" });

    const referralLink = mobile ? `https://yoga.healthyday.co.in?ref=${mobile}` : "https://yoga.healthyday.co.in";

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: `My ${programDays}-Day Yoga Certificate`,
        });
        trackCertificateActivity({
          mobile,
          name: name.trim(),
          activity: "shared",
          daysAttended: daysAttended ?? undefined,
        });
        setFeedback("Shared successfully!");
        setTimeout(() => setFeedback(""), 3000);
        return;
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Share failed", err);
        }
      }
    } else {
      await handleDownload();
    }
  };

  // Defense-in-depth: callers only open this modal once a level/day is fully complete, but
  // guard here too in case it's ever reached earlier (e.g. a direct deep link) — mirrors the
  // same 7-day minimum used on the standalone /certificate page.
  const isLocked = !hasGenerated && daysAttended != null && daysAttended < 7;

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.65)",
        backdropFilter: "blur(4px)",
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "385px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          maxHeight: "90vh",
          overflowY: "auto",
          fontFamily: "Outfit, sans-serif",
          zIndex: 1000000,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header banner */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "91px",
            borderRadius: "16px 16px 0 0",
            background: "linear-gradient(180deg, #022651 0%, #013A7D 37.5%, #024AA0 71.63%, #0057BF 100%)",
            boxShadow: "0 1px 8px 0 rgba(0, 0, 0, 0.30)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <p
            style={{
              width: "267px",
              margin: 0,
              color: "#FFF",
              textAlign: "center",
              fontFamily: "Playball, cursive",
              fontSize: "40px",
              fontWeight: 400,
              lineHeight: "normal",
            }}
          >
            Congratulations!
          </p>
          <p
            style={{
              margin: 0,
              color: "#FD5",
              textAlign: "center",
              fontFamily: "Outfit, sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "normal",
            }}
          >
            You have completed the {programDays}-Days Yoga Program
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: "16px",
          }}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div style={{ padding: "24px 21px" }}>
        {checkingExistence ? (
          <div>
            <Skeleton className="h-[18px] w-[220px] mx-auto mb-5 rounded-md" />
            <Skeleton className="h-[10px] w-16 mb-2 rounded-md" />
            <Skeleton className="h-11 w-full max-w-[343px] mb-5 rounded-[9px]" />
            <Skeleton className="h-10 w-full max-w-[343px] rounded-[30px]" />
          </div>
        ) : isLocked ? (
          <div style={{ textAlign: "center", padding: "8px 0" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "#FFF3D8",
                color: "#B37D00",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                fontSize: "24px",
              }}
            >
              🔒
            </div>
            <p style={{ margin: "0 0 8px", color: "#000", fontFamily: "Outfit, sans-serif", fontSize: "16px", fontWeight: 700 }}>
              Certificate Locked
            </p>
            <p style={{ margin: "0 0 16px", color: "#5A6577", fontFamily: "Outfit, sans-serif", fontSize: "13px", lineHeight: "1.5" }}>
              You need to attend at least 7 days of live yoga classes to unlock and generate your official completion certificate.
            </p>
            <p style={{ margin: 0, color: "#FEAB27", fontFamily: "Outfit, sans-serif", fontSize: "14px", fontWeight: 700 }}>
              {daysAttended} / 7 Days Attended
            </p>
          </div>
        ) : !hasGenerated ? (
          /* Step 1: Name Entry Form */
          <div>
            <p
              style={{
                margin: "0 0 20px",
                color: "#000",
                textAlign: "center",
                fontFamily: "Outfit, sans-serif",
                fontSize: "18px",
                fontWeight: 700,
                lineHeight: "normal",
              }}
            >
              Enter your name for the certificate
            </p>

            <form onSubmit={handleGenerate}>
              <label
                style={{
                  display: "block",
                  margin: "0 0 8px",
                  color: "#757373",
                  fontFamily: "Outfit, sans-serif",
                  fontSize: "10px",
                  fontWeight: 700,
                  lineHeight: "normal",
                  textTransform: "uppercase",
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Koyyana Sujatha"
                required
                style={{
                  width: "100%",
                  maxWidth: "343px",
                  height: "44px",
                  boxSizing: "border-box",
                  borderRadius: "9px",
                  border: "1px solid #D9E8FF",
                  background: "#FAFBFF",
                  boxShadow: "-1px -1px 4px 0 rgba(0, 0, 0, 0.15) inset, 1px 1px 4px 0 rgba(0, 0, 0, 0.15) inset",
                  padding: "0 14px",
                  color: "#202020",
                  fontFamily: "Outfit, sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  outline: "none",
                  display: "block",
                  margin: "0 0 20px",
                }}
              />

              <button
                type="submit"
                disabled={isGenerating || !name.trim()}
                style={{
                  width: "100%",
                  maxWidth: "343px",
                  height: "40px",
                  borderRadius: "30px",
                  border: "none",
                  background: "#FEAB27",
                  cursor: "pointer",
                  display: "block",
                  opacity: isGenerating || !name.trim() ? 0.5 : 1,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "270.242px",
                    color: "#202020",
                    textAlign: "center",
                    fontFamily: "Outfit, sans-serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    lineHeight: "normal",
                    textTransform: "uppercase",
                  }}
                >
                  {isGenerating ? "Generating..." : "Generate certificate"}
                </span>
              </button>
            </form>
          </div>
        ) : (
          /* Step 2: Certificate Preview & Actions */
          <div>
            {/* Certificate Canvas Preview — cream/gold frame matching Certificate.tsx */}
            <div className="w-full bg-gradient-to-b from-[#FFFDF9] via-[#FFF3D8]/60 to-[#FFFDF9] p-4 rounded-2xl border-2 border-[#FEE3A2] shadow-sm overflow-hidden mb-5 flex justify-center">
              <div className="relative rounded-xl shadow-2xl bg-white border border-[#F5EADC] overflow-hidden flex items-center justify-center w-fit">
                <canvas
                  ref={canvasRef}
                  className="max-w-full h-auto block"
                  style={{ maxHeight: "400px", objectFit: "contain", visibility: canvasReady ? "visible" : "hidden" }}
                />
                {!canvasReady && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-500 text-sm font-medium" style={{ minHeight: "160px" }}>
                    <div className="w-6 h-6 border-2 border-gray-300 border-t-[#0D468B] rounded-full animate-spin" />
                    Preparing your certificate...
                  </div>
                )}
              </div>
            </div>

            {feedback && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 text-sm font-medium rounded-lg text-center">
                {feedback}
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              {/* Download Button */}
              <button
                onClick={handleDownload}
                disabled={!canvasReady}
                className="w-full py-3 px-2 bg-gradient-to-r from-[#0156BB] to-[#01408A] hover:brightness-95 text-white font-bold rounded-xl shadow-[0_0_8px_1px_rgba(0,0,0,0.05)] transition-all flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M7 10L12 15M12 15L17 10M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontSize: "clamp(9px, 3vw, 13px)" }}>Download Certificate</span>
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                disabled={!canvasReady}
                className="w-full py-3 px-2 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#1EBD5A] hover:to-[#0E7064] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap btn-vibrate btn-shimmer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontSize: "clamp(9px, 3vw, 13px)" }}>Share Certificate</span>
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};
