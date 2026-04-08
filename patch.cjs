const fs = require('fs');
let code = fs.readFileSync('src/pages/Index.tsx', 'utf8');

const targetStr = `{/* Referral Milestones Section */}
        <>
          {(() => {
            const refCount = studentData?.total_referral_count ?? 0;
            const milestones = [
              { label: "10 Free Classes", reward: "+10", refs: 5 },
              { label: "20 Free Classes", reward: "+20", refs: 10 },
              { label: "Healthyday T-shirt", reward: null, refs: 20 },
              { label: "Water Bottle", reward: null, refs: 40 },
              { label: "Yoga Mat", reward: null, refs: 60 },
            ];
            const nextIdx = milestones.findIndex(m => refCount < m.refs);
            return (
              <div style={{ padding: "28px 20px 0" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <h3 style={{ color: "#202020", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, margin: 0 }}>Referral Milestones</h3>
                  <span
                    onClick={() => {
                      const dest = (refCount > 0 && (studentStatus === "14DaysOngoing" || studentStatus === "14daysongoing"))
                        ? \`/referral-status?count=\${refCount}&mobile=\${mobile || ""}\`
                        : \`/referral?count=\${refCount}&mobile=\${mobile || ""}\`;
                      navigate(dest);
                    }}
                    style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
                  >
                    View More
                  </span>
                </div>
                <div style={{ width: "360px", borderRadius: "16px", background: "#FFF", boxShadow: "0 0 10px 0 rgba(0,0,0,0.25)", padding: "20px 16px", boxSizing: "border-box" }}>
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: "15px", top: "16px", bottom: "16px", width: "3px", background: "#DDDEDE", borderRadius: "2px", zIndex: 0 }} />
                    {(() => {
                      const indicatorColor = refCount === 0 ? "#FF0000" : "#FEAB27";
                      return (
                        <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "14px", position: "relative", zIndex: 1 }}>
                          <div style={{ marginLeft: "-2.5px", flexShrink: 0, width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ aspectRatio: "1/1" }}>
                              <circle cx="11" cy="11" r="11" fill={indicatorColor} />
                            </svg>
                          </div>
                          <span style={{ color: indicatorColor, fontFamily: "Outfit", fontSize: "16px", fontWeight: 600 }}>{refCount} Referrals</span>
                          <div style={{ width: "106px", height: "28px", borderRadius: "20px", border: \`1px solid \${indicatorColor}\`, background: "rgba(254,171,39,0.20)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ color: indicatorColor, fontFamily: "Outfit", fontSize: "14px", fontWeight: 600 }}>You are here</span>
                          </div>
                        </div>
                      );
                    })()}
                    {milestones.map((m, idx) => {
                      const claimed = refCount >= m.refs;
                      const isNext = idx === nextIdx;
                      return (
                        <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: idx < milestones.length - 1 ? "14px" : "0", position: "relative", zIndex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            {claimed ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none" style={{ flexShrink: 0 }}>
                                <circle cx="16.5" cy="16.5" r="16.5" fill="#64A45E" />
                                {m.reward && <text x="16.5" y="21" textAnchor="middle" fontFamily="Outfit" fontSize="10" fontWeight="700" fill="white">{m.reward}</text>}
                                {!m.reward && <path d="M10 16.5L14.5 21L23 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />}
                              </svg>
                            ) : (
                              <div style={{ position: "relative", flexShrink: 0, width: "33px", height: "33px" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                                  {isNext ? <circle cx="16.5" cy="16.5" r="14.5" fill="white" stroke="#FEAB27" strokeWidth="4" /> : <circle cx="16.5" cy="16.5" r="16.5" fill="#DDDEDE" />}
                                </svg>
                                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M5.3335 7.33333V4.66667C5.3335 3.95942 5.61445 3.28115 6.11454 2.78105C6.61464 2.28095 7.29292 2 8.00016 2C8.70741 2 9.38568 2.28095 9.88578 2.78105C10.3859 3.28115 10.6668 3.95942 10.6668 4.66667V7.33333M3.3335 8.66667C3.3335 8.31304 3.47397 7.97391 3.72402 7.72386C3.97407 7.47381 4.31321 7.33333 4.66683 7.33333H11.3335C11.6871 7.33333 12.0263 7.47381 12.2763 7.72386C12.5264 7.97391 12.6668 8.31304 12.6668 8.66667V12.6667C12.6668 13.0203 12.5264 13.3594 12.2763 13.6095C12.0263 13.8595 11.6871 14 11.3335 14H4.66683C4.31321 14 3.97407 13.8595 3.72402 13.6095C3.47397 13.3594 3.3335 13.0203 3.3335 12.6667V8.66667Z" stroke={isNext ? "#FEAB27" : "#A2A2A2"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </div>
                              </div>
                            )}
                            <div>
                              <div style={{ fontFamily: "Outfit", fontSize: "16px", fontWeight: 600, lineHeight: "normal", color: claimed ? "#202020" : isNext ? "#FEAB27" : "#9A9797" }}>
                                {claimed && m.reward ? <><span style={{ color: "#377456" }}>{m.reward}</span> Free Classes</> : m.label}
                              </div>
                              <div style={{ color: "#9C9C9C", fontFamily: "Outfit", fontSize: "12px", fontWeight: 500 }}>{m.refs} Referrals</div>
                            </div>
                          </div>
                          {claimed && <span style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700 }}>CLAIMED 🎁 </span>}
                          {isNext && <span style={{ color: "#9C9C9C", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700 }}>IN PROGRESS</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );

          })()}


          {/* Refer and Win banner */}
          <div style={{ padding: "28px 20px 40px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="50" fill="#FFF5E5" />
              <path d="M33.2979 32.2937H37.8857H33.2979Z" fill="#FEAB27" />
              <path d="M35.5918 30V34.5875V30Z" fill="#FEAB27" />
              <path d="M50.502 30L49.3551 34.5875L50.502 30Z" fill="#FEAB27" />
              <path d="M65.4122 32.2937H70H65.4122Z" fill="#FEAB27" />
              <path d="M67.7061 30V34.5875V30Z" fill="#FEAB27" />
              <path d="M58.5306 41.4687L56.2367 43.7625L58.5306 41.4687Z" fill="#FEAB27" />
              <path d="M65.4122 50.6437L70 49.4968L65.4122 50.6437Z" fill="#FEAB27" />
              <path d="M65.4122 64.4062H70H65.4122Z" fill="#FEAB27" />
              <path d="M67.7061 62.1124V66.6999V62.1124Z" fill="#FEAB27" />
              <path d="M56.2367 58.7131L41.2852 43.7625L31.2151 65.7366C31.016 66.1632 30.9531 66.6408 31.0348 67.1044C31.1165 67.568 31.339 67.9953 31.6719 68.3282C32.0048 68.6611 32.4321 68.8835 32.8957 68.9652C33.3594 69.0469 33.837 68.984 34.2636 68.7849L56.2367 58.7131Z" fill="#FEAB27" />
              <path d="M33.2979 32.2937H37.8857M35.5918 30V34.5875M50.502 30L49.3551 34.5875M65.4122 32.2937H70M67.7061 30V34.5875M58.5306 41.4687L56.2367 43.7625M65.4122 50.6437L70 49.4968M65.4122 64.4062H70M67.7061 62.1124V66.6999M56.2367 58.7131L41.2852 43.7625L31.2151 65.7366C31.016 66.1632 30.9531 66.6408 31.0348 67.1044C31.1165 67.568 31.339 67.9953 31.6719 68.3282C32.0048 68.6611 32.4321 68.8835 32.8957 68.9652C33.3594 69.0469 33.837 68.984 34.2636 68.7849L56.2367 58.7131Z" stroke="#FEAB27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3 style={{ color: "#000", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, lineHeight: "normal", margin: 0 }}>Refer and Win!</h3>
            <p style={{ color: "#ADADAD", fontFamily: "Outfit", fontSize: "18px", fontWeight: 500, lineHeight: "normal", textAlign: "center", width: "286px", margin: 0 }}>Every active referral earn gifts and rewards for you</p>
          </div>
        </>`;

const replacementStr = `{/* Referral Milestones Section */}
        {week === 1 && (
          <>
            {(() => {
              const refCount = studentData?.total_referral_count ?? 0;
              const milestones = [
                { label: "10 Free Classes", reward: "+10", refs: 5 },
                { label: "20 Free Classes", reward: "+20", refs: 10 },
                { label: "Healthyday T-shirt", reward: null, refs: 20 },
                { label: "Special Gift", reward: null, refs: 40 },
                { label: "Yoga Mat", reward: null, refs: 60 },
              ];
              const nextIdx = milestones.findIndex(m => refCount < m.refs);

              type MRow = { type: "milestone"; m: typeof milestones[0]; claimed: boolean; isNext: boolean };
              type HRow = { type: "here" };
              type Row = MRow | HRow;

              const rows: Row[] = [];
              let hereInserted = false;
              milestones.forEach((m, idx) => {
                const claimed = refCount >= m.refs;
                const isNext = idx === nextIdx;
                if (idx === nextIdx && !hereInserted && refCount > 0) {
                  rows.push({ type: "here" });
                  hereInserted = true;
                }
                rows.push({ type: "milestone", m, claimed, isNext });
              });
              if (!hereInserted && refCount > 0) rows.push({ type: "here" });

              return (
                <div style={{ padding: "28px 20px 0" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                    <h3 style={{ color: "#202020", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, margin: 0 }}>Referral Milestones</h3>
                    <span
                      onClick={() => {
                        const dest = (refCount > 0 && (studentStatus === "14DaysOngoing" || studentStatus === "14daysongoing"))
                          ? \`/referral-status?count=\${refCount}&mobile=\${mobile || ""}\`
                          : \`/referral?count=\${refCount}&mobile=\${mobile || ""}\`;
                        navigate(dest);
                      }}
                      style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
                    >
                      View More
                    </span>
                  </div>
                  <div style={{ width: "360px", borderRadius: "16px", background: "#FFF", boxShadow: "0 0 10px 0 rgba(0,0,0,0.25)", padding: "20px 16px", boxSizing: "border-box" }}>
                    <div style={{ position: "relative" }}>
                      <div style={{ position: "absolute", left: "15px", top: "16px", bottom: "16px", width: "3px", background: "#DDDEDE", borderRadius: "2px", zIndex: 0 }} />
                      {rows.map((row, ri) => {
                        if (row.type === "here") {
                          return (
                            <div
                              key="here"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                marginBottom: "14px",
                                position: "relative",
                                zIndex: 1,
                              }}
                            >
                              <div
                                style={{
                                  flexShrink: 0,
                                  width: "33px",
                                  height: "24px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <div
                                  style={{
                                    width: "12px",
                                    height: "12px",
                                    borderRadius: "50%",
                                    background: "#FEAB27",
                                    boxShadow: "0 0 0 4px rgba(254,171,39,0.25)",
                                  }}
                                />
                              </div>
                              <span style={{ color: "#202020", fontFamily: "Outfit", fontSize: "14px", fontWeight: 600 }}>
                                {refCount} Referrals
                              </span>
                              <div
                                style={{
                                  height: "21px",
                                  borderRadius: "20px",
                                  border: "1px solid #FEAB27",
                                  background: "rgba(254,171,39,0.20)",
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "0 10px",
                                }}
                              >
                                <span style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "12px", fontWeight: 600 }}>
                                  You are here
                                </span>
                              </div>
                            </div>
                          );
                        }

                        const { m, claimed, isNext } = row as MRow;
                        const isLastRow = ri === rows.length - 1;
                        return (
                          <div
                            key={m.refs}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginBottom: isLastRow ? 0 : "14px",
                              position: "relative",
                              zIndex: 1,
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                              {claimed ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none" style={{ flexShrink: 0 }}>
                                  <circle cx="16.5" cy="16.5" r="16.5" fill="#64A45E" />
                                  {m.reward ? (
                                    <text x="16.5" y="21" textAnchor="middle" fontFamily="Outfit" fontSize="10" fontWeight="700" fill="white">{m.reward}</text>
                                  ) : (
                                    <path d="M10 16.5L14.5 21L23 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                  )}
                                </svg>
                              ) : (
                                <div style={{ position: "relative", flexShrink: 0, width: "33px", height: "33px" }}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                                    {isNext
                                      ? <circle cx="16.5" cy="16.5" r="14.5" fill="white" stroke="#FEAB27" strokeWidth="4" />
                                      : <circle cx="16.5" cy="16.5" r="16.5" fill="#DDDEDE" />
                                    }
                                  </svg>
                                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                      <path d="M5.3335 7.33333V4.66667C5.3335 3.95942 5.61445 3.28115 6.11454 2.78105C6.61464 2.28095 7.29292 2 8.00016 2C8.70741 2 9.38568 2.28095 9.88578 2.78105C10.3859 3.28115 10.6668 3.95942 10.6668 4.66667V7.33333M3.3335 8.66667C3.3335 8.31304 3.47397 7.97391 3.72402 7.72386C3.97407 7.47381 4.31321 7.33333 4.66683 7.33333H11.3335C11.6871 7.33333 12.0263 7.47381 12.2763 7.72386C12.5264 7.97391 12.6668 8.31304 12.6668 8.66667V12.6667C12.6668 13.0203 12.5264 13.3594 12.2763 13.6095C12.0263 13.8595 11.6871 14 11.3335 14H4.66683C4.31321 14 3.97407 13.8595 3.72402 13.6095C3.47397 13.3594 3.3335 13.0203 3.3335 12.6667V8.66667Z" stroke={isNext ? "#FEAB27" : "#A2A2A2"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </div>
                                </div>
                              )}
                              <div>
                                <div style={{ fontFamily: "Outfit", fontSize: "16px", fontWeight: 600, lineHeight: "normal", color: claimed ? "#377456" : isNext ? "#FEAB27" : "#9A9797" }}>
                                  {claimed && m.reward
                                    ? <><span style={{ color: "#377456" }}>{m.reward}</span> Free Classes</>
                                    : m.label}
                                </div>
                                <div style={{ color: "#9C9C9C", fontFamily: "Outfit", fontSize: "12px", fontWeight: 500 }}>
                                  {m.refs} Referrals
                                </div>
                              </div>
                            </div>
                            {claimed && (
                              <span style={{ color: "#FEAB27", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700 }}>
                                CLAIMED 🎁
                              </span>
                            )}
                            {isNext && (
                              <span style={{ color: "#9C9C9C", fontFamily: "Outfit", fontSize: "11px", fontWeight: 700 }}>
                                NEXT GOAL
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}


            {/* Refer and Win banner */}
            <div style={{ padding: "28px 20px 40px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="50" fill="#FFF5E5" />
                <path d="M33.2979 32.2937H37.8857H33.2979Z" fill="#FEAB27" />
                <path d="M35.5918 30V34.5875V30Z" fill="#FEAB27" />
                <path d="M50.502 30L49.3551 34.5875L50.502 30Z" fill="#FEAB27" />
                <path d="M65.4122 32.2937H70H65.4122Z" fill="#FEAB27" />
                <path d="M67.7061 30V34.5875V30Z" fill="#FEAB27" />
                <path d="M58.5306 41.4687L56.2367 43.7625L58.5306 41.4687Z" fill="#FEAB27" />
                <path d="M65.4122 50.6437L70 49.4968L65.4122 50.6437Z" fill="#FEAB27" />
                <path d="M65.4122 64.4062H70H65.4122Z" fill="#FEAB27" />
                <path d="M67.7061 62.1124V66.6999V62.1124Z" fill="#FEAB27" />
                <path d="M56.2367 58.7131L41.2852 43.7625L31.2151 65.7366C31.016 66.1632 30.9531 66.6408 31.0348 67.1044C31.1165 67.568 31.339 67.9953 31.6719 68.3282C32.0048 68.6611 32.4321 68.8835 32.8957 68.9652C33.3594 69.0469 33.837 68.984 34.2636 68.7849L56.2367 58.7131Z" fill="#FEAB27" />
                <path d="M33.2979 32.2937H37.8857M35.5918 30V34.5875M50.502 30L49.3551 34.5875M65.4122 32.2937H70M67.7061 30V34.5875M58.5306 41.4687L56.2367 43.7625M65.4122 50.6437L70 49.4968M65.4122 64.4062H70M67.7061 62.1124V66.6999M56.2367 58.7131L41.2852 43.7625L31.2151 65.7366C31.016 66.1632 30.9531 66.6408 31.0348 67.1044C31.1165 67.568 31.339 67.9953 31.6719 68.3282C32.0048 68.6611 32.4321 68.8835 32.8957 68.9652C33.3594 69.0469 33.837 68.984 34.2636 68.7849L56.2367 58.7131Z" stroke="#FEAB27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 style={{ color: "#000", fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, lineHeight: "normal", margin: 0 }}>Refer and Win!</h3>
              <p style={{ color: "#ADADAD", fontFamily: "Outfit", fontSize: "18px", fontWeight: 500, lineHeight: "normal", textAlign: "center", width: "286px", margin: 0 }}>Every active referral earn gifts and rewards for you</p>
            </div>
          </>
        )}

        {week === 2 && (
          <>
            {/* Want More FREE Classes heading */}
            <div style={{ padding: "32px 27px 0", textAlign: "center" }}>
              <div style={{ width: "358px", height: "1.5px", background: "#D1D1D1", margin: "0 auto 25px" }} />
              <p style={{ width: "343px", margin: "0 auto", color: "#0D468B", textAlign: "center", fontFamily: "Outfit", fontSize: "24px", fontWeight: 600, lineHeight: "normal" }}>Want More FREE Classes?</p>
            </div>
            {/* Refer & Earn */}
            <div style={{ padding: "32px 27px 32px", display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  width: "358px",
                  borderRadius: "16px",
                  background: "linear-gradient(0deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.20) 100%), #0D468B",
                  boxShadow: "0 0 10px 0 rgba(0,0,0,0.25)",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {/* Title + subtitle — left aligned */}
                <div>
                  <h3 style={{ color: "#FFF", fontFamily: "Outfit", fontSize: "21px", fontWeight: 700, lineHeight: "normal", margin: "0 0 4px" }}>
                    Refer &amp; Earn
                  </h3>
                  <p style={{ color: "#FFFCFC", fontFamily: "Outfit", fontSize: "14px", fontWeight: 400, lineHeight: "normal", margin: 0 }}>
                    Invite your friends &amp; family and get exciting gifts!
                  </p>
                </div>

                {/* Share Link */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 20px",
                    borderRadius: "16px",
                    background: "#0E4EA1",
                    color: "#FFF",
                    fontFamily: "Outfit",
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  <span style={{opacity: 0.8}}>https://healthyday.in/{mobile || "user"}</span>
                  <div
                    onClick={() => {
                       navigator.clipboard.writeText(\`https://healthyday.in/\${mobile || "user"}\`);
                       alert("Referral link copied!");
                    }}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "#FEAB27",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M12.5 12.5V14.1667C12.5 15.0871 11.7538 15.8333 10.8333 15.8333H5.83333C4.91286 15.8333 4.16667 15.0871 4.16667 14.1667V9.16667C4.16667 8.24619 4.91286 7.5 5.83333 7.5H7.5M8.33333 12.5H13.3333C14.2538 12.5 15 11.7538 15 10.8333V5.83333C15 4.91286 14.2538 4.16667 13.3333 4.16667H8.33333C7.41286 4.16667 6.66667 4.91286 6.66667 5.83333V10.8333C6.66667 11.7538 7.41286 12.5 8.33333 12.5Z" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const dest = (refCount > 0 && (studentStatus === "14DaysOngoing" || studentStatus === "14daysongoing"))
                      ? \`/referral-status?count=\${refCount}&mobile=\${mobile || ""}\`
                      : \`/referral?count=\${refCount}&mobile=\${mobile || ""}\`;
                    navigate(dest);
                  }}
                  style={{
                    width: "100%",
                    height: "48px",
                    borderRadius: "16px",
                    background: "#0E4EA1",
                    color: "#FEAB27",
                    fontFamily: "Outfit",
                    fontSize: "14px",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  View Details &gt;
                </button>
              </div>
            </div>
          </>`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replacementStr);
  fs.writeFileSync('src/pages/Index.tsx', code);
  console.log('SUCCESS: String replaced successfully.');
} else {
  console.log('ERROR: Target string not found in Index.tsx. Did the exact formatting change?');
}
