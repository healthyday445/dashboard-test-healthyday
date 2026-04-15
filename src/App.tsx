import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Referral from "./pages/Referral";
import ReferralStatus from "./pages/ReferralStatus";
import AttendancePage from "./pages/AttendancePage";
import AllRecordings from "./pages/AllRecordings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/:mobile" element={<Index />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/referral-status" element={<ReferralStatus />} />
          <Route path="/attendance-page" element={<AttendancePage />} />
          <Route path="/all-recordings" element={<AllRecordings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
