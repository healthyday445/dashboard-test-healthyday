import React from "react";

const plans = [
  { name: "1 Year Plan", price: 1999, originalPrice: 5988, discount: 63, bestValue: true, url: "https://healthyday.co.in/1-year-plan/" },
  { name: "6 Months Plan", price: 1499, originalPrice: 2994, discount: 38, bestValue: false, url: "https://healthyday.co.in/6-months-plan/" },
  { name: "3 Months Plan", price: 999, originalPrice: 1497, discount: 25, bestValue: false, url: "https://healthyday.co.in/3-months-plan/" },
];

const features = [
  { name: "Daily YOGA", year: true, sixMonth: true, threeMonth: true },
  { name: "24-Hour Recording", year: true, sixMonth: true, threeMonth: true },
  { name: "Reminders & Tracking", year: true, sixMonth: true, threeMonth: true },
  { name: "108 Surya Namaskar", year: true, sixMonth: true, threeMonth: false },
  { name: "Breath Mastery", year: true, sixMonth: true, threeMonth: false },
  { name: "Face YOGA", year: true, sixMonth: false, threeMonth: false },
  { name: "Masterclass", year: true, sixMonth: false, threeMonth: false },
];

const CompletedDayBox = ({ status, dayLabel }: { status: string; dayLabel: string }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "42px" }}>
    <div style={{ width: "36.763px", height: "36.763px", aspectRatio: "1/1", borderRadius: "5px", background: status === "yellow" ? "#FEAB27" : "#0D9400", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "4px" }}>
      {status === "green" && (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8.7071" cy="8.7071" r="8.7071" fill="white" /><path d="M4.5 8.90237L7.77251 11.8047L14.3175 6" stroke="#0D9400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      )}
      {status === "yellow" && (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8.7071" cy="8.7071" r="8.7071" fill="white" /><path d="M11.9619 4.83728L4.10791 12.5769M4.10791 4.83728L11.9619 12.5769" stroke="#FEAB27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      )}
    </div>
    <span style={{ color: "#666", fontFamily: "Outfit", fontSize: "10px", fontWeight: 600 }}>{dayLabel}</span>
  </div>
);

export const PricingAndComparisonSection = ({ selectedPlanIdx, setSelectedPlanIdx, daysLeft, completedDateRangeLabel, completedDayStatus, hideDaysLeft }: any) => {
  return (
    <>
      {completedDayStatus && (
        <div style={{ padding: "28px 20px 0" }}>
          <h3 style={{ color: "#000", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, marginBottom: "12px" }}>Your 14 Days Attendance</h3>
          <div style={{ width: "372px", borderRadius: "15px", border: "1px solid #FFC76F", padding: "16px 12px", background: "#FFE5BA" }}>
            {completedDateRangeLabel && <p style={{ color: "#0D468B", fontFamily: "Outfit", fontSize: "14px", fontWeight: 700, marginBottom: "14px" }}>{completedDateRangeLabel}</p>}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}>
              {completedDayStatus.slice(0, 7).map((status: any, i: number) => <CompletedDayBox key={i} status={status} dayLabel={`Day ${i + 1}`} />)}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {completedDayStatus.slice(7, 14).map((status: any, i: number) => <CompletedDayBox key={i} status={status} dayLabel={`Day ${i + 8}`} />)}
            </div>
          </div>
        </div>
      )}

      {!hideDaysLeft && (
      <div style={{ padding: completedDayStatus ? "28px 20px 0" : "24px 20px 0", textAlign: "center" }}>
        {completedDayStatus ? (
          <div style={{ width: "372px", borderRadius: "16px", background: "linear-gradient(180deg, #0D468B 0%, #072D5A 100%)", padding: "28px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}><span style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "48px", fontWeight: 800, lineHeight: "1" }}>{daysLeft}</span><span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "20px", fontWeight: 700 }}>Days Left in your</span></div>
            <span style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "20px", fontWeight: 800, lineHeight: "normal" }}>FREE Yoga</span>
            <span style={{ color: "#FFFFFFAA", fontFamily: "Outfit", fontSize: "14px", fontWeight: 500, marginTop: "2px" }}>JOIN DAILY CLASSES</span>
          </div>
        ) : (
          <>
            <div style={{ color: "#0D468B", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, lineHeight: "normal", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
              <span style={{ fontSize: "24px", fontWeight: 800 }}>{daysLeft}</span> <span>Days Left in your FREE Yoga</span>
            </div>
            <div style={{ color: "#0D468B", fontFamily: "Outfit", fontSize: "14px", fontWeight: 700, marginTop: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>JOIN DAILY CLASSES</div>
          </>
        )}
      </div>
      )}

      <div style={{ padding: "32px 27px 0", textAlign: "center" }}>
        {!hideDaysLeft && (
          <>
            <p style={{ width: "343px", margin: "0 auto", color: "#0D468B", textAlign: "center", fontFamily: "Outfit", fontSize: "24px", fontWeight: 700, lineHeight: "normal", marginBottom: "2px" }}>Join our community for</p>
            <h3 style={{ width: "221px", margin: "0 auto", color: "#0D468B", textAlign: "center", fontFamily: "Outfit", fontSize: "20px", fontWeight: 700, lineHeight: "normal" }}>DAILY YOGA SESSIONS</h3>
          </>
        )}
      </div>

      <div style={{ padding: "24px 27px 0" }}>
        {plans.map((plan, idx) => {
          const isSelected = selectedPlanIdx === idx;
          return (
            <div key={idx} onClick={() => setSelectedPlanIdx(idx)} style={{ width: plan.bestValue ? "360px" : "358px", minHeight: plan.bestValue ? "198px" : "160px", borderRadius: "16px", background: plan.bestValue ? "#0D468B" : "#FFF", border: !plan.bestValue && isSelected ? "2.5px solid #0D468B" : "none", boxShadow: plan.bestValue ? "none" : "0 4px 10px 2px rgba(0, 0, 0, 0.25)", padding: plan.bestValue ? "0 2px 2px 2px" : "0", marginBottom: "16px", position: "relative", overflow: "hidden", cursor: "pointer" }}>
              {plan.bestValue && (
                <div style={{ padding: "10px 16px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M17.5 9.16917H17.3534L15.8342 4.725L2.79504 9.16917L2.50004 9.16667M2.08337 9.17H2.50004L11.7884 1.75L14.1359 5.04167" stroke="#FEAB27" strokeWidth="2" strokeLinecap="square" /><path d="M12.0834 13.3333C12.0834 13.8859 11.8639 14.4158 11.4732 14.8065C11.0825 15.1972 10.5526 15.4167 10.0001 15.4167C9.44755 15.4167 8.91764 15.1972 8.52694 14.8065C8.13624 14.4158 7.91675 13.8859 7.91675 13.3333C7.91675 12.7808 8.13624 12.2509 8.52694 11.8602C8.91764 11.4695 9.44755 11.25 10.0001 11.25C10.5526 11.25 11.0825 11.4695 11.4732 11.8602C11.8639 12.2509 12.0834 12.7808 12.0834 13.3333Z" stroke="#FEAB27" strokeWidth="2" strokeLinecap="square" /><path d="M17.9167 9.16699V17.5003H2.08337V9.16699H17.9167Z" stroke="#FEAB27" strokeWidth="2" strokeLinecap="square" /><path d="M2.08337 9.16699H3.75004C3.75004 9.60902 3.57445 10.0329 3.26189 10.3455C2.94932 10.6581 2.5254 10.8337 2.08337 10.8337V9.16699ZM17.9167 9.16699H16.25C16.25 9.60902 16.4256 10.0329 16.7382 10.3455C17.0508 10.6581 17.4747 10.8337 17.9167 10.8337V9.16699ZM2.08337 17.5003H3.75171C3.75193 17.2812 3.70892 17.0641 3.62516 16.8616C3.5414 16.6591 3.41852 16.4751 3.26355 16.3201C3.10859 16.1652 2.92459 16.0423 2.72208 15.9585C2.51957 15.8748 2.30252 15.8318 2.08337 15.832V17.5003ZM17.9167 17.5003H16.25C16.25 17.0583 16.4256 16.6344 16.7382 16.3218C17.0508 16.0093 17.4747 15.8337 17.9167 15.8337V17.5003Z" stroke="#FEAB27" strokeWidth="2" strokeLinecap="square" /></svg>
                  <span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "16px", fontWeight: 700, lineHeight: "normal" }}>Best Value</span>
                </div>
              )}
              <div style={{ padding: "16px 18px 18px", background: "#fff", borderRadius: plan.bestValue ? "14px" : "16px", height: "100%" }}>
                <h4 style={{ color: "#0D468B", fontFamily: "Outfit", fontSize: "20px", fontWeight: 700, lineHeight: "normal", marginBottom: "8px" }}>{plan.name}</h4>
                <div className="flex items-center gap-3" style={{ marginBottom: "8px" }}><span style={{ color: "#809AB9", fontFamily: "Outfit", fontSize: "16px", fontWeight: 700, lineHeight: "normal", textDecoration: "line-through" }}>₹{plan.originalPrice}/-</span><span style={{ color: "#0D468B", fontFamily: "Outfit", fontSize: "30px", fontWeight: 700, lineHeight: "normal" }}>₹{plan.price}/-</span></div>
                <div style={{ display: "inline-flex", height: "18.167px", padding: "2px 10px", justifyContent: "center", alignItems: "center", gap: "10px", borderRadius: "10.093px", background: "#F00", marginBottom: "16px" }}><span style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "10.496px", fontWeight: 700, lineHeight: "normal", textTransform: "uppercase" }}>{plan.discount}% OFF</span></div>
                <button onClick={() => window.open(plan.url, "_blank")} style={{ width: "314px", height: "32.3px", borderRadius: "30px", background: "#FEAB27", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                  <span style={{ width: "249.333px", height: "17.1px", color: "#202020", textAlign: "center", fontFamily: "Outfit", fontSize: "14px", fontStyle: "normal", fontWeight: 500, lineHeight: "normal", textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center" }}>Join {plan.bestValue ? "1 YEAR" : plan.name.toUpperCase().replace(" PLAN", "")} PLAN</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ padding: "16px 27px 0" }}>
        <h3 style={{ width: "343px", color: "#0D468B", fontSize: "24px", fontWeight: 600, fontFamily: "Outfit", textAlign: "center", marginBottom: "20px", margin: "0 auto 20px" }}>Compare and choose your plan!</h3>
        <div style={{ position: "relative", width: "358px" }}>
          <div style={{ position: "absolute", top: 0, left: selectedPlanIdx === 0 ? "calc(100% - 207px)" : selectedPlanIdx === 1 ? "calc(100% - 138px)" : "calc(100% - 69px)", width: "69px", height: "312px", borderRadius: "5px", border: "1px solid #0D468B", background: "#FFF5E5", zIndex: 0 }} />
          <div style={{ display: "flex", alignItems: "center", paddingBottom: "10px", position: "relative", zIndex: 1 }}>
            <div style={{ flex: 1, color: "#919191", fontFamily: "Outfit", fontSize: "10px", fontWeight: 700, lineHeight: "normal" }}>Features</div>
            <div style={{ width: "69px", textAlign: "center", color: "#202020", fontFamily: "Outfit", fontSize: "15px", fontWeight: 600, lineHeight: "normal" }}>1 Year</div>
            <div style={{ width: "69px", textAlign: "center", color: "#202020", fontFamily: "Outfit", fontSize: "15px", fontWeight: 600, lineHeight: "normal" }}>6 Months</div>
            <div style={{ width: "69px", textAlign: "center", color: "#202020", fontFamily: "Outfit", fontSize: "15px", fontWeight: 600, lineHeight: "normal" }}>3 Months</div>
          </div>
          {features.map((feature, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", padding: "10px 0", borderTop: "1px solid #F0F0F0", position: "relative", zIndex: 1 }}>
              <div style={{ flex: 1, color: "#202020", fontFamily: "Outfit", fontSize: "12px", fontWeight: 600, lineHeight: "normal" }}>{feature.name}</div>
              <div style={{ width: "69px", display: "flex", justifyContent: "center" }}>
                {feature.year ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15" fill="none"><path d="M14.7343 0L6.82974 10.356L2.1564 5.7154L0 7.85826L7.18689 15L17.2512 2.14286L14.7343 0Z" fill="#0D468B" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12.41 0.5C12.56 0.35 12.74 0.22 12.94 0.14C13.14 0.05 13.36 0 13.57 0C13.79 0 14.01 0.04 14.21 0.12C14.41 0.2 14.59 0.32 14.75 0.48C14.9 0.63 15.02 0.81 15.1 1.01C15.18 1.22 15.22 1.43 15.22 1.65C15.22 1.87 15.17 2.08 15.08 2.28C15 2.48 14.87 2.66 14.71 2.81L9.95 7.57C9.94 7.58 9.94 7.59 9.93 7.6C9.93 7.6 9.93 7.61 9.93 7.62C9.93 7.63 9.93 7.64 9.93 7.65C9.94 7.66 9.94 7.66 9.95 7.67L14.71 12.44C14.87 12.59 14.99 12.77 15.07 12.96C15.15 13.16 15.2 13.37 15.2 13.59C15.2 13.8 15.16 14.02 15.08 14.21C15 14.41 14.87 14.59 14.72 14.74C14.57 14.9 14.39 15.02 14.19 15.1C13.99 15.18 13.78 15.22 13.57 15.22C13.35 15.22 13.14 15.18 12.94 15.09C12.74 15.01 12.56 14.89 12.41 14.74L7.65 9.97C7.64 9.96 7.63 9.96 7.63 9.96C7.62 9.95 7.61 9.95 7.6 9.95C7.59 9.95 7.58 9.95 7.57 9.96C7.57 9.96 7.56 9.96 7.55 9.97L2.79 14.74C2.64 14.89 2.46 15.01 2.26 15.09C2.06 15.18 1.85 15.22 1.63 15.22C1.42 15.22 1.21 15.18 1.01 15.1C0.81 15.02 0.63 14.9 0.48 14.75C0.32 14.59 0.2 14.41 0.12 14.21C0.04 14.02 0 13.8 0 13.59C0 13.37 0.04 13.16 0.13 12.96C0.21 12.77 0.33 12.59 0.49 12.44L5.25 7.67C5.26 7.66 5.26 7.66 5.27 7.65C5.27 7.64 5.27 7.63 5.27 7.62C5.27 7.61 5.27 7.6 5.27 7.6C5.26 7.59 5.26 7.58 5.25 7.57L0.49 2.81C0.18 2.5 0.02 2.09 0.02 1.66C0.02 1.23 0.19 0.82 0.49 0.52C0.8 0.21 1.21 0.04 1.64 0.04C2.07 0.04 2.48 0.21 2.79 0.51L7.55 5.27C7.56 5.28 7.56 5.29 7.57 5.29C7.58 5.29 7.59 5.29 7.6 5.29C7.61 5.29 7.62 5.29 7.62 5.29C7.63 5.29 7.64 5.28 7.65 5.27L12.41 0.5Z" fill="#FF0000" /></svg>
                )}
              </div>
              <div style={{ width: "69px", display: "flex", justifyContent: "center" }}>
                {feature.sixMonth ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15" fill="none"><path d="M14.7343 0L6.82974 10.356L2.1564 5.7154L0 7.85826L7.18689 15L17.2512 2.14286L14.7343 0Z" fill="#0D468B" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12.41 0.5C12.56 0.35 12.74 0.22 12.94 0.14C13.14 0.05 13.36 0 13.57 0C13.79 0 14.01 0.04 14.21 0.12C14.41 0.2 14.59 0.32 14.75 0.48C14.9 0.63 15.02 0.81 15.1 1.01C15.18 1.22 15.22 1.43 15.22 1.65C15.22 1.87 15.17 2.08 15.08 2.28C15 2.48 14.87 2.66 14.71 2.81L9.95 7.57C9.94 7.58 9.94 7.59 9.93 7.6C9.93 7.6 9.93 7.61 9.93 7.62C9.93 7.63 9.93 7.64 9.93 7.65C9.94 7.66 9.94 7.66 9.95 7.67L14.71 12.44C14.87 12.59 14.99 12.77 15.07 12.96C15.15 13.16 15.2 13.37 15.2 13.59C15.2 13.8 15.16 14.02 15.08 14.21C15 14.41 14.87 14.59 14.72 14.74C14.57 14.9 14.39 15.02 14.19 15.1C13.99 15.18 13.78 15.22 13.57 15.22C13.35 15.22 13.14 15.18 12.94 15.09C12.74 15.01 12.56 14.89 12.41 14.74L7.65 9.97C7.64 9.96 7.63 9.96 7.63 9.96C7.62 9.95 7.61 9.95 7.6 9.95C7.59 9.95 7.58 9.95 7.57 9.96C7.57 9.96 7.56 9.96 7.55 9.97L2.79 14.74C2.64 14.89 2.46 15.01 2.26 15.09C2.06 15.18 1.85 15.22 1.63 15.22C1.42 15.22 1.21 15.18 1.01 15.1C0.81 15.02 0.63 14.9 0.48 14.75C0.32 14.59 0.2 14.41 0.12 14.21C0.04 14.02 0 13.8 0 13.59C0 13.37 0.04 13.16 0.13 12.96C0.21 12.77 0.33 12.59 0.49 12.44L5.25 7.67C5.26 7.66 5.26 7.66 5.27 7.65C5.27 7.64 5.27 7.63 5.27 7.62C5.27 7.61 5.27 7.6 5.27 7.6C5.26 7.59 5.26 7.58 5.25 7.57L0.49 2.81C0.18 2.5 0.02 2.09 0.02 1.66C0.02 1.23 0.19 0.82 0.49 0.52C0.8 0.21 1.21 0.04 1.64 0.04C2.07 0.04 2.48 0.21 2.79 0.51L7.55 5.27C7.56 5.28 7.56 5.29 7.57 5.29C7.58 5.29 7.59 5.29 7.6 5.29C7.61 5.29 7.62 5.29 7.62 5.29C7.63 5.29 7.64 5.28 7.65 5.27L12.41 0.5Z" fill="#FF0000" /></svg>
                )}
              </div>
              <div style={{ width: "69px", display: "flex", justifyContent: "center" }}>
                {feature.threeMonth ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15" fill="none"><path d="M14.7343 0L6.82974 10.356L2.1564 5.7154L0 7.85826L7.18689 15L17.2512 2.14286L14.7343 0Z" fill="#0D468B" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12.41 0.5C12.56 0.35 12.74 0.22 12.94 0.14C13.14 0.05 13.36 0 13.57 0C13.79 0 14.01 0.04 14.21 0.12C14.41 0.2 14.59 0.32 14.75 0.48C14.9 0.63 15.02 0.81 15.1 1.01C15.18 1.22 15.22 1.43 15.22 1.65C15.22 1.87 15.17 2.08 15.08 2.28C15 2.48 14.87 2.66 14.71 2.81L9.95 7.57C9.94 7.58 9.94 7.59 9.93 7.6C9.93 7.6 9.93 7.61 9.93 7.62C9.93 7.63 9.93 7.64 9.93 7.65C9.94 7.66 9.94 7.66 9.95 7.67L14.71 12.44C14.87 12.59 14.99 12.77 15.07 12.96C15.15 13.16 15.2 13.37 15.2 13.59C15.2 13.8 15.16 14.02 15.08 14.21C15 14.41 14.87 14.59 14.72 14.74C14.57 14.9 14.39 15.02 14.19 15.1C13.99 15.18 13.78 15.22 13.57 15.22C13.35 15.22 13.14 15.18 12.94 15.09C12.74 15.01 12.56 14.89 12.41 14.74L7.65 9.97C7.64 9.96 7.63 9.96 7.63 9.96C7.62 9.95 7.61 9.95 7.6 9.95C7.59 9.95 7.58 9.95 7.57 9.96C7.57 9.96 7.56 9.96 7.55 9.97L2.79 14.74C2.64 14.89 2.46 15.01 2.26 15.09C2.06 15.18 1.85 15.22 1.63 15.22C1.42 15.22 1.21 15.18 1.01 15.1C0.81 15.02 0.63 14.9 0.48 14.75C0.32 14.59 0.2 14.41 0.12 14.21C0.04 14.02 0 13.8 0 13.59C0 13.37 0.04 13.16 0.13 12.96C0.21 12.77 0.33 12.59 0.49 12.44L5.25 7.67C5.26 7.66 5.26 7.66 5.27 7.65C5.27 7.64 5.27 7.63 5.27 7.62C5.27 7.61 5.27 7.6 5.27 7.6C5.26 7.59 5.26 7.58 5.25 7.57L0.49 2.81C0.18 2.5 0.02 2.09 0.02 1.66C0.02 1.23 0.19 0.82 0.49 0.52C0.8 0.21 1.21 0.04 1.64 0.04C2.07 0.04 2.48 0.21 2.79 0.51L7.55 5.27C7.56 5.28 7.56 5.29 7.57 5.29C7.58 5.29 7.59 5.29 7.6 5.29C7.61 5.29 7.62 5.29 7.62 5.29C7.63 5.29 7.64 5.28 7.65 5.27L12.41 0.5Z" fill="#FF0000" /></svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
