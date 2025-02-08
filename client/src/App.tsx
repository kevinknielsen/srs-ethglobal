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

  const handleLogin = () => {
    setLocation('/dashboard');
  };

  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      onSuccess={handleLogin}
      config={{
        appearance: {
          accentColor: "#8B0000",
          theme: "dark",
          showWalletLoginFirst: false,
          logo: "/images/artist-banner.png",
        },
        loginMethods: [
          "email",
          "wallet",
          "google",
          "apple",
          "github",
          "discord",
          "twitter",
          "farcaster"
        ],
        embeddedWallets: {
          requireUserPasswordOnCreate: false,
          showWalletUIs: true,
          createOnLogin: 'users-without-wallets',
          noPromptOnSignature: true
        },
        supportedWallets: [
          "metamask",
          "walletconnect"
        ],
        defaultChain: "ethereum",
        supportedChains: ["ethereum"]
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