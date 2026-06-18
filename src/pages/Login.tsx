import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/Primary_logo.svg";

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

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [error, setError] = useState("");

  const selectedCountry = COUNTRIES.find(c => c.code === countryCode) || COUNTRIES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    const cleanedMobile = mobile.replace(/[\s\-\(\)\+]/g, "");
    if (!/^\d{7,15}$/.test(cleanedMobile)) {
      setError("Please enter a valid mobile number");
      return;
    }
    // Store the name in localStorage just in case we need it
    localStorage.setItem("user_name", name);
    
    let finalMobile = cleanedMobile;
    
    if (countryCode === "91") {
      if (finalMobile.length === 10) {
        finalMobile = `91${finalMobile}`;
      } else if (finalMobile.length === 12 && finalMobile.startsWith("91")) {
        // already has 91, do nothing
      } else if (!finalMobile.startsWith("91")) {
        finalMobile = `91${finalMobile}`;
      }
    } else {
      if (!finalMobile.startsWith(countryCode)) {
        finalMobile = `${countryCode}${finalMobile}`;
      }
    }
    
    navigate(`/${finalMobile}/leaderboard`);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-4" style={{ fontFamily: "Outfit, sans-serif" }}>
      <div className="w-full max-w-md bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8">
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Healthyday" className="h-10" />
        </div>

        <h1 className="text-[24px] font-bold text-center text-[#202020] mb-2">Welcome</h1>
        <p className="text-center text-[#888] mb-8 text-[15px]">Enter your details to access your dashboard</p>

        <form onSubmit={handleSubmit} className="space-y-[14px]">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="w-full px-[18px] py-[14px] rounded-[8px] border border-[#D4D4D4] focus:outline-none focus:ring-1 focus:ring-[#FEAB27] focus:border-[#FEAB27] transition-all bg-white placeholder:text-[#919CB4] text-[#202020] text-[15px]"
            />
          </div>

          <div>
            <div className="relative flex items-center border border-[#D4D4D4] rounded-[8px] bg-white overflow-hidden focus-within:ring-1 focus-within:ring-[#FEAB27] focus-within:border-[#FEAB27] transition-all">
              <div className="flex items-center pl-[18px] pr-2 py-[14px] bg-white relative">
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
                <img src={`https://flagcdn.com/w20/${selectedCountry.iso}.png`} alt={selectedCountry.name} className="w-[20px] rounded-[2px]" />
                <span className="text-[#202020] font-medium ml-[8px] text-[15px]">+{countryCode}</span>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-[6px]">
                  <path d="M1 1L5 5L9 1" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-[#D4D4D4] ml-[8px] mr-[2px] text-[15px]">·</span>
              </div>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter Your Whatsapp Number"
                className="w-full py-[14px] pr-[18px] focus:outline-none bg-white placeholder:text-[#919CB4] text-[#202020] text-[15px]"
              />
            </div>
          </div>

          {error && <p className="text-[#D32F2F] text-[13px] font-medium bg-[#FFF3F3] p-3 rounded-lg">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#FEAB27] text-[#111111] font-[700] py-[15px] rounded-[30px] hover:bg-[#F39C12] transition-colors mt-[8px] text-[15px] tracking-[0.5px]"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
