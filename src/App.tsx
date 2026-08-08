import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Maintenance from "./pages/Maintenance";
import NotFound from "./pages/NotFound";
import Referral from "./pages/Referral";
import ReferralStatus from "./pages/ReferralStatus";
import AttendancePage from "./pages/AttendancePage";
import AttendancePageWeekly from "./pages/AttendancePageWeekly";
import AllRecordings from "./pages/AllRecordings";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import Faqs from "./pages/Faqs";
import IndexFourteenDays from "./pages/IndexFourteenDays";
import Pricing from "./pages/Pricing";
import Certificate from "./pages/Certificate";
import SNCertificate from "./pages/SNCertificate";
import Grace from "./pages/Grace";
import Diet from "./pages/Diet";
import DietMealDetail from "./pages/DietMealDetail";

const queryClient = new QueryClient();

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
        <Routes>
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/:mobile/certificate" element={<Certificate />} />
          <Route path="/sn-certificate" element={<SNCertificate />} />
          <Route path="/:mobile/sn-certificate" element={<SNCertificate />} />
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
