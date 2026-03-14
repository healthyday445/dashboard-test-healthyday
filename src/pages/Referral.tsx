import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/Primary_logo.svg";

const referrals = [
    { name: "T Raviskrishna", phone: "+91 98 ******12", status: "ACTIVE" },
    { name: "Kiran Narayana", phone: "+91 98 ******12", status: "ACTIVE" },
    { name: "Meera Sharma", phone: "+91 98 ******12", status: "PENDING" },
    { name: "Srikant S.", phone: "+91 98 ******12", status: "PENDING" },
];

const PersonIcon = () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" r="14" fill="#FFF3D6" />
        <path
            d="M14 8C15.1 8 16 8.9 16 10C16 11.1 15.1 12 14 12C12.9 12 12 11.1 12 10C12 8.9 12.9 8 14 8ZM14 18C16.7 18 19.8 19.29 20 20H8C8.23 19.29 11.3 18 14 18ZM14 6C11.79 6 10 7.79 10 10C10 12.21 11.79 14 14 14C16.21 14 18 12.21 18 10C18 7.79 16.21 6 14 6ZM14 16C11.33 16 6 17.34 6 20V22H22V20C22 17.34 16.67 16 14 16Z"
            fill="#FEAB27"
        />
    </svg>
);

const StepIcon = ({ type }: { type: "link" | "register" | "gift" }) => {
    const bgColor = "#FFF3D6";
    const iconColor = "#FEAB27";

    return (
        <div
            style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: bgColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
            }}
        >
            {type === "link" && (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 7H13V9H17C18.65 9 20 10.35 20 12C20 13.65 18.65 15 17 15H13V17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7ZM11 15H7C5.35 15 4 13.65 4 12C4 10.35 5.35 9 7 9H11V7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H11V15ZM8 11H16V13H8V11Z" fill={iconColor} />
                </svg>
            )}
            {type === "register" && (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" fill={iconColor} />
                </svg>
            )}
            {type === "gift" && (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6H17.82C17.93 5.69 18 5.35 18 5C18 3.34 16.66 2 15 2C13.95 2 13.04 2.54 12.5 3.35L12 4.02L11.5 3.34C10.96 2.54 10.05 2 9 2C7.34 2 6 3.34 6 5C6 5.35 6.07 5.69 6.18 6H4C2.89 6 2.01 6.89 2.01 8L2 19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM15 4C15.55 4 16 4.45 16 5C16 5.55 15.55 6 15 6C14.45 6 14 5.55 14 5C14 4.45 14.45 4 15 4ZM9 4C9.55 4 10 4.45 10 5C10 5.55 9.55 6 9 6C8.45 6 8 5.55 8 5C8 4.45 8.45 4 9 4ZM20 19H4V17H20V19ZM20 14H4V8H9.08L7 10.83L8.62 12L11 8.76L12 7.4L13 8.76L15.38 12L17 10.83L14.92 8H20V14Z" fill={iconColor} />
                </svg>
            )}
        </div>
    );
};

const Referral = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const referralCount = Number(searchParams.get("count")) || Number(sessionStorage.getItem("total_referral_count")) || 0;
    const referrerMobile = searchParams.get("mobile") || sessionStorage.getItem("referrer_mobile") || "";
    const [copied, setCopied] = useState(false);
    const referralLink = "healthyday.app/ref=ggtujev58";

    const shareLink = referrerMobile ? `https://healthyday.co.in/free-programmes?ref=91${referrerMobile}` : referralLink;

    const handleCopy = () => {
        navigator.clipboard.writeText(shareLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleWhatsApp = () => {
        const message = encodeURIComponent(
            `Join me on Healthyday! Use my referral link: ${shareLink}`
        );
        window.open(`https://wa.me/?text=${message}`, "_blank");
    };

    return (
        <div
            className="mx-auto w-[412px] min-h-screen"
            style={{
                fontFamily: "Outfit, sans-serif",
                background: "linear-gradient(180deg, #FFF8EB 0%, #FFFFFF 30%)",
            }}
        >
            {/* Header */}
            <header
                className="flex w-[412px] h-[68px] items-center"
                style={{
                    padding: "20px",
                    background: "#FFFFFF",
                    boxShadow: "0 4px 30px 0 rgba(0, 0, 0, 0.10)",
                }}
            >
                <button
                    onClick={() => navigate("/")}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        marginRight: "12px",
                        padding: "4px",
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#202020" />
                    </svg>
                </button>
                <img src={logo} alt="Healthyday" className="h-7" />
            </header>

            {/* Referral Status Banner */}
            <div className="flex justify-center" style={{ marginTop: "20px" }}>
                <div
                    style={{
                        width: "358px",
                        borderRadius: "16px",
                        background: "linear-gradient(135deg, #FEAB27 0%, #F59E0B 100%)",
                        padding: "20px 24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div>
                        <div
                            style={{
                                color: "rgba(255,255,255,0.85)",
                                fontSize: "10px",
                                fontWeight: 600,
                                letterSpacing: "1px",
                                marginBottom: "4px",
                            }}
                        >
                            REFERRAL STATUS
                        </div>
                        <div style={{ color: "#fff", fontSize: "22px", fontWeight: 800 }}>
                            Your Referrals
                        </div>
                    </div>
                    <div
                        style={{
                            width: "52px",
                            height: "52px",
                            borderRadius: "12px",
                            background: "#0B2A4A",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontSize: "24px",
                            fontWeight: 800,
                        }}
                    >
                        {referralCount}
                    </div>
                </div>
            </div>

            {/* How to refer Section */}
            <div style={{ padding: "28px 27px 0" }}>
                <h2
                    style={{
                        color: "#202020",
                        fontSize: "20px",
                        fontWeight: 700,
                        textAlign: "center",
                        marginBottom: "24px",
                    }}
                >
                    How to refer?
                </h2>

                {/* Steps */}
                <div style={{ position: "relative", paddingLeft: "0" }}>
                    {/* Step 1 */}
                    <div className="flex items-start gap-3" style={{ marginBottom: "6px" }}>
                        <div className="flex flex-col items-center">
                            <StepIcon type="link" />
                            <div
                                style={{
                                    width: "2px",
                                    height: "28px",
                                    background: "#E5E5E5",
                                    margin: "4px 0",
                                }}
                            />
                        </div>
                        <div style={{ paddingTop: "4px" }}>
                            <div style={{ color: "#202020", fontSize: "15px", fontWeight: 700 }}>
                                Forward your link
                            </div>
                            <div style={{ color: "#888", fontSize: "12px", fontWeight: 400, marginTop: "2px" }}>
                                Send your unique link to your family & friends
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-start gap-3" style={{ marginBottom: "6px" }}>
                        <div className="flex flex-col items-center">
                            <StepIcon type="register" />
                            <div
                                style={{
                                    width: "2px",
                                    height: "28px",
                                    background: "#E5E5E5",
                                    margin: "4px 0",
                                }}
                            />
                        </div>
                        <div style={{ paddingTop: "4px" }}>
                            <div style={{ color: "#202020", fontSize: "15px", fontWeight: 700 }}>
                                Friends Register
                            </div>
                            <div style={{ color: "#888", fontSize: "12px", fontWeight: 400, marginTop: "2px" }}>
                                Ask them to register for the next FREE Batch
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-start gap-3">
                        <StepIcon type="gift" />
                        <div style={{ paddingTop: "4px" }}>
                            <div style={{ color: "#202020", fontSize: "15px", fontWeight: 700 }}>
                                Win FREE Classes & Gifts
                            </div>
                            <div style={{ color: "#888", fontSize: "12px", fontWeight: 400, marginTop: "2px" }}>
                                Get 10 FREE Classes on first 5 Referrals
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Referral Link Card */}
            <div className="flex justify-center" style={{ marginTop: "28px" }}>
                <div
                    style={{
                        width: "358px",
                        borderRadius: "16px",
                        background: "linear-gradient(135deg, #0B2A4A 0%, #0E3358 100%)",
                        padding: "20px",
                    }}
                >
                    <div
                        style={{
                            color: "#fff",
                            fontSize: "16px",
                            fontWeight: 700,
                            marginBottom: "14px",
                        }}
                    >
                        Your Referral Link
                    </div>

                    {/* Link display */}
                    <div
                        className="flex items-center justify-between"
                        style={{
                            background: "#fff",
                            borderRadius: "10px",
                            padding: "12px 14px",
                            marginBottom: "14px",
                        }}
                    >
                        <span
                            style={{
                                color: "#555",
                                fontSize: "13px",
                                fontWeight: 500,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {referralLink}
                        </span>
                        <button
                            onClick={handleCopy}
                            style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: "2px",
                                flexShrink: 0,
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="#999" />
                            </svg>
                        </button>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={handleCopy}
                            style={{
                                flex: 1,
                                padding: "12px",
                                borderRadius: "10px",
                                background: "#34C759",
                                border: "none",
                                cursor: "pointer",
                                color: "#fff",
                                fontSize: "13px",
                                fontWeight: 700,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "6px",
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="white" />
                            </svg>
                            {copied ? "Copied!" : "Copy Link"}
                        </button>
                        <button
                            onClick={handleWhatsApp}
                            style={{
                                flex: 1,
                                padding: "12px",
                                borderRadius: "10px",
                                background: "#F97316",
                                border: "none",
                                cursor: "pointer",
                                color: "#fff",
                                fontSize: "13px",
                                fontWeight: 700,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "6px",
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 14.382C17.177 14.233 15.746 13.527 15.474 13.427C15.202 13.328 15.002 13.278 14.802 13.577C14.602 13.875 14.038 14.531 13.862 14.731C13.686 14.931 13.51 14.956 13.215 14.807C12.92 14.658 11.978 14.348 10.862 13.349C9.993 12.571 9.406 11.612 9.23 11.314C9.054 11.015 9.21 10.854 9.357 10.707C9.49 10.575 9.652 10.364 9.801 10.188C9.95 10.012 10 9.887 10.1 9.687C10.2 9.487 10.15 9.312 10.075 9.163C10 9.013 9.413 7.578 9.165 6.981C8.923 6.399 8.677 6.479 8.493 6.469C8.317 6.46 8.117 6.458 7.917 6.458C7.717 6.458 7.397 6.533 7.125 6.832C6.853 7.131 6.098 7.837 6.098 9.272C6.098 10.707 7.15 12.093 7.299 12.293C7.448 12.493 9.403 15.508 12.327 16.767C13.033 17.074 13.588 17.256 14.019 17.391C14.727 17.614 15.371 17.581 15.88 17.504C16.449 17.418 17.619 16.792 17.867 16.108C18.115 15.424 18.115 14.834 18.04 14.71C17.965 14.585 17.765 14.511 17.472 14.362V14.382ZM12.025 21.785H12.021C10.241 21.785 8.497 21.308 6.976 20.408L6.638 20.206L2.872 21.195L3.878 17.525L3.655 17.175C2.668 15.601 2.147 13.789 2.148 11.927C2.15 6.482 6.555 2.077 12.029 2.077C14.687 2.078 17.191 3.113 19.069 4.996C20.947 6.879 21.974 9.386 21.973 12.048C21.97 17.493 17.565 21.898 12.025 21.898V21.785ZM20.478 3.594C18.226 1.335 15.213 0.077 12.025 0.077C5.462 0.077 0.15 5.389 0.148 11.952C0.147 14.048 0.7 16.094 1.748 17.889L0.045 24L6.301 22.336C8.031 23.286 9.989 23.786 11.985 23.787H11.99C18.553 23.787 23.865 18.475 23.867 11.912C23.868 8.727 22.618 5.718 20.366 3.459L20.478 3.594Z" fill="white" />
                            </svg>
                            Share on Whatsapp
                        </button>
                    </div>
                </div>
            </div>

            {/* Your Recent Referrals */}
            <div style={{ padding: "28px 27px 32px" }}>
                <div className="flex items-center justify-between" style={{ marginBottom: "16px" }}>
                    <h3 style={{ color: "#202020", fontSize: "18px", fontWeight: 700 }}>
                        Your Recent Referrals
                    </h3>
                    <span
                        style={{
                            color: "#34C759",
                            fontSize: "14px",
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        View All
                    </span>
                </div>

                {/* Referral cards */}
                <div
                    style={{
                        borderRadius: "14px",
                        border: "1px solid #F0F0F0",
                        overflow: "hidden",
                        background: "#fff",
                    }}
                >
                    {referrals.map((referral, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between"
                            style={{
                                padding: "14px 16px",
                                borderBottom: index < referrals.length - 1 ? "1px solid #F5F5F5" : "none",
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <PersonIcon />
                                <div>
                                    <div style={{ color: "#202020", fontSize: "14px", fontWeight: 700 }}>
                                        {referral.name}
                                    </div>
                                    <div style={{ color: "#999", fontSize: "11px", fontWeight: 400, marginTop: "2px" }}>
                                        {referral.phone}
                                    </div>
                                </div>
                            </div>
                            <span
                                style={{
                                    fontSize: "10px",
                                    fontWeight: 700,
                                    padding: "4px 12px",
                                    borderRadius: "20px",
                                    ...(referral.status === "ACTIVE"
                                        ? {
                                            color: "#34C759",
                                            background: "#E8F9ED",
                                            border: "1px solid #34C759",
                                        }
                                        : {
                                            color: "#888",
                                            background: "#F5F5F5",
                                            border: "1px solid #E0E0E0",
                                        }),
                                }}
                            >
                                {referral.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Referral;
