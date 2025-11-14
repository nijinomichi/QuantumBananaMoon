import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-toggle";
import { Navigation } from "@/components/navigation";
import Home from "@/pages/home";
import NFTGallery from "@/pages/nft-gallery";
import QuantumDashboard from "@/pages/quantum-dashboard";
import IYQ2025 from "@/pages/iyq2025";
import Partnerships from "@/pages/partnerships";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/gallery" component={NFTGallery} />
      <Route path="/dashboard" component={QuantumDashboard} />
      <Route path="/iyq2025" component={IYQ2025} />
      <Route path="/partnerships" component={Partnerships} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <div className="min-h-screen bg-background">
              <Navigation />
              <Router />
            </div>
            <Toaster />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
