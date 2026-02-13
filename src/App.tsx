import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BuilderProvider } from "@/contexts/BuilderContext";
import Loader from "@/components/ui/loader";

import RouteGuard from "@/components/ui/route-guard";

import ScrollToAnchor from "@/components/ScrollToAnchor";

const Admin = lazy(() => import("./pages/Admin"));
const Index = lazy(() => import("./pages/Index"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const FAQ = lazy(() => import("./pages/FAQ"));
const NotFound = lazy(() => import("./pages/NotFound"));
const DemoPage = lazy(() => import("./pages/DemoPage"));
const HardwarePage = lazy(() => import("./pages/HardwarePage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BuilderProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToAnchor />
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/builder" element={<RouteGuard />}>
                <Route index element={<Admin />} />
              </Route>
              <Route path="/demo" element={<DemoPage />} />
              <Route path="/hardware" element={<HardwarePage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/website" element={<UserDashboard />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </BuilderProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
