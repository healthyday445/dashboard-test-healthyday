import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Maintenance from "./pages/Maintenance";
import logo from "@/assets/Primary_logo.svg";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Referral = lazy(() => import("./pages/Referral"));
const ReferralStatus = lazy(() => import("./pages/ReferralStatus"));
const AttendancePage = lazy(() => import("./pages/AttendancePage"));
const AttendancePageWeekly = lazy(() => import("./pages/AttendancePageWeekly"));
const AllRecordings = lazy(() => import("./pages/AllRecordings"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Login = lazy(() => import("./pages/Login"));
const Faqs = lazy(() => import("./pages/Faqs"));
const IndexFourteenDays = lazy(() => import("./pages/IndexFourteenDays"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Certificate = lazy(() => import("./pages/Certificate"));
const SNCertificate = lazy(() => import("./pages/SNCertificate"));
const Grace = lazy(() => import("./pages/Grace"));
const Diet = lazy(() => import("./pages/Diet"));
const DietMealDetail = lazy(() => import("./pages/DietMealDetail"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="hd-page bg-background flex flex-col items-center justify-center" style={{ fontFamily: "Outfit, sans-serif" }}>
    <img src={logo} alt="Healthyday" className="h-10 mb-8" />
    <div style={{
      width: "48px", height: "48px",
      border: "4px solid #EDF6FF", borderTop: "4px solid #FEAB27",
      borderRadius: "50%", animation: "spin 0.8s linear infinite",
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const App = () => {
  if (import.meta.env.VITE_MAINTENANCE_MODE === "true") {
    return <Maintenance />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/certificate" element={<Certificate />} />
              <Route path="/:mobile/certificate" element={<Certificate />} />
              <Route path="/sn-certificate" element={<SNCertificate />} />
              <Route path="/:mobile/sn-certificate" element={<SNCertificate />} />
              <Route path="/testsncertificate" element={<SNCertificate />} />
              <Route path="/test-sn-certificate" element={<SNCertificate />} />
              <Route path="/faqs" element={<Faqs />} />
              <Route path="/:mobile/faqs" element={<Faqs />} />
              <Route path="/:mobile" element={<Dashboard />} />
              <Route path="/referral" element={<Referral />} />
              <Route path="/referral-status" element={<ReferralStatus />} />
              <Route path="/" element={<IndexFourteenDays />} />
              <Route path="/:mobile/referrals" element={<ReferralStatus />} />
              <Route path="/attendance-page" element={<AttendancePage />} />
              <Route path="/:mobile/attendance" element={<AttendancePageWeekly />} />
              <Route path="/:mobile/recordings" element={<AllRecordings />} />
              <Route path="/leaderboard" element={<Login />} />
              <Route path="/:mobile/leaderboard" element={<Leaderboard />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/:mobile/grace" element={<Grace />} />
              <Route path="/:mobile/diet" element={<Diet />} />
              <Route path="/:mobile/diet/:date/:slotId" element={<DietMealDetail />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
