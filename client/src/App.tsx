import { PrivyProvider } from '@privy-io/react-auth';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import { Switch, Route, useLocation } from "wouter";
import "./index.css";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [, setLocation] = useLocation();

  return (
    <PrivyProvider
      appId="cm6verhsy0091polc34fxcm7s"
      config={{
        loginMethods: ["email", "wallet", "google", "twitter", "farcaster"],
        embeddedWallets: {
          createOnLogin: 'users-without-wallets'
        },
        appearance: {
          accentColor: "#8B0000",
          theme: "dark",
          showWalletLoginFirst: false,
          logo: "/images/artist-banner.png",
        }
      }}
    >
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-black text-white">
          <Router />
          <Toaster />
        </div>
      </QueryClientProvider>
    </PrivyProvider>
  );
}

export default App;