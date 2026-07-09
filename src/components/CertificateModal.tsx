import React, { useState, useEffect, useRef } from "react";
import {
  trackCertificateActivity,
  getCertificateCookie,
  setCertificateCookie,
  checkServerCertificateStatus,
} from "@/lib/trackCertificateActivity";
import { safeLocalStorage } from "@/lib/storage";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  mobile?: string;
  initialName?: string;
  daysAttended?: number | null;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  mobile,
  initialName,
  daysAttended,
}) => {
  const [name, setName] = useState<string>(initialName || "");
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [templateImg, setTemplateImg] = useState<HTMLImageElement | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [checkedPrior, setCheckedPrior] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Pre-fill name when prop changes or from local storage
  useEffect(() => {
    if (initialName) {
      setName(initialName);
    } else {
      const storedName = safeLocalStorage.getItem("user_name");
      if (storedName && storedName !== "Student") {
        setName(storedName);
      }
    }
  }, [initialName]);

  // When modal opens, check if certificate was already generated (local cookie → Firestore)
  // If yes, skip the name form and go straight to the certificate preview.
  useEffect(() => {
    if (!isOpen) {
      // Reset check flag when modal closes so it re-checks next time
      setCheckedPrior(false);
      return;
    }
    if (checkedPrior) return;
    setCheckedPrior(true);

    const cleanMobile = mobile || "";

    // 1. Check local cookie/localStorage first (instant, no network)
    const localStatus = getCertificateCookie(cleanMobile);
    if (localStatus.generated && localStatus.name) {
      setName(localStatus.name);
      setHasGenerated(true);
      return;
    }

    // 2. Fallback: check Firestore (async)
    if (cleanMobile) {
      checkServerCertificateStatus(cleanMobile).then((serverStatus) => {
        if (serverStatus && serverStatus.generated && serverStatus.name) {
          setName(serverStatus.name);
          setHasGenerated(true);
          // Also persist locally so next time it's instant
          setCertificateCookie(cleanMobile, serverStatus.name);
        }
      });
    }
  }, [isOpen, mobile, checkedPrior]);

  // Load template image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/FINAL.jpg";
    img.onload = () => {
      setTemplateImg(img);
    };
    img.onerror = () => {
      console.error("Failed to load certificate template /FINAL.jpg");
    };
  }, []);

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

    if (document.fonts && document.fonts.load) {
      document.fonts.load(fontSpec, displayName)
        .then(() => {
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
          drawTextOverlay();
        })
        .catch(() => {
          drawTextOverlay();
        });
    } else {
      drawTextOverlay();
    }
  };

  useEffect(() => {
    if (!hasGenerated || !templateImg) return;
    renderCertificate(templateImg);
    const id1 = setTimeout(() => renderCertificate(templateImg), 60);
    const id2 = setTimeout(() => renderCertificate(templateImg), 250);
    return () => {
      clearTimeout(id1);
      clearTimeout(id2);
    };
  }, [hasGenerated, templateImg, name]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsGenerating(true);
    safeLocalStorage.setItem("user_name", name.trim());

    // Persist certificate status locally so next open skips the name form
    setCertificateCookie(mobile || "", name.trim());

    // Switch to step 2 preview immediately
    setHasGenerated(true);

    // Track generation & save to Firestore / Cloud Storage in background
    try {
      let imageBase64: string | undefined;
      if (templateImg) {
        const offscreenCanvas = document.createElement("canvas");
        const w = templateImg.naturalWidth || 1414;
        const h = templateImg.naturalHeight || 2000;
        offscreenCanvas.width = w;
        offscreenCanvas.height = h;
        const offCtx = offscreenCanvas.getContext("2d");
        if (offCtx) {
          offCtx.drawImage(templateImg, 0, 0, w, h);
          const scaledFS = Math.round(fontSize * (w / 500));
          offCtx.font = `normal ${scaledFS}px "Times New Roman", serif`;
          offCtx.fillStyle = textColor;
          offCtx.textAlign = "center";
          offCtx.textBaseline = "middle";
          offCtx.fillText(name.trim(), w / 2, Math.round(h * (yPercent / 100)));
          imageBase64 = offscreenCanvas.toDataURL("image/jpeg", 0.9);
        }
      }

      await trackCertificateActivity({
        mobile,
        name: name.trim(),
        activity: "generated",
        daysAttended: daysAttended ?? undefined,
        imageBase64,
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
    const blob = await getCanvasBlob();
    if (!blob) return;

    const safeName = (name || "Student").replace(/[^a-zA-Z0-9_-]/g, "_");
    const filename = `Healthyday_Certificate_${safeName}.jpg`;
    const file = new File([blob], filename, { type: "image/jpeg" });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "My 21-Day Yoga Certificate",
          text: `I just completed my 21-Day Yoga Program with Healthyday! Here is my official completion certificate.`,
        });
        trackCertificateActivity({
          mobile,
          name: name.trim(),
          activity: "shared",
          daysAttended: daysAttended ?? undefined,
        });
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Share failed", err);
        }
      }
    } else {
      await handleDownload();
    }
  };

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
          maxWidth: "512px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          padding: "24px",
          maxHeight: "90vh",
          overflowY: "auto",
          fontFamily: "Outfit, sans-serif",
          zIndex: 1000000,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "#f3f4f6",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#4b5563",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: "16px",
          }}
          aria-label="Close modal"
        >
          ✕
        </button>

        {!hasGenerated ? (
          /* Step 1: Name Entry Form */
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#0F5132] mb-2">
                Enter Your Name for the Certificate
              </h2>
              <p className="text-sm text-gray-600">
                Please enter your full name as you want it to appear on your official completion certificate.
              </p>
            </div>

            <form onSubmit={handleGenerate} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Koyyana Sujatha"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0F5132] text-gray-900 font-medium text-base"
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating || !name.trim()}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#0F5132] to-[#198754] text-white font-bold text-base shadow-lg hover:shadow-xl hover:opacity-95 transition-all disabled:opacity-50"
              >
                {isGenerating ? "Generating..." : "GENERATE MY CERTIFICATE"}
              </button>
            </form>
          </div>
        ) : (
          /* Step 2: Certificate Preview & Actions */
          <div>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setHasGenerated(false)}
                className="text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1"
              >
                ← Edit Name
              </button>
              <span className="text-sm font-bold text-[#0F5132]">
                Your Official Completion Certificate
              </span>
            </div>

            {/* Certificate Canvas Preview */}
            <div className="w-full bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-inner mb-5 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="w-full h-auto block"
                style={{ maxHeight: "400px", objectFit: "contain" }}
              />
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
                className="w-full py-3.5 px-4 bg-[#0D468B] hover:bg-[#083060] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M7 10L12 15M12 15L17 10M12 15V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Download Certificate
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#1EBD5A] hover:to-[#0E7064] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer btn-vibrate btn-shimmer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Share Certificate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
