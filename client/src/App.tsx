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
      appId={"cm6rbnitw01gz1k0i8vnq9nff"}
      config={{
        appearance: {
          accentColor: "#6A6FF5",
          theme: "#FFFFFF",
          showWalletLoginFirst: false,
          logo: "https://auth.privy.io/logos/privy-logo.png",
          walletList: [
            "detected_wallets",
            "phantom",
            "solflare",
            "backpack",
            "okx_wallet"
          ]
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
          ethereum: {
            createOnLogin: "users-without-wallets"
          },
          solana: {
            createOnLogin: "users-without-wallets"
          }
        },
        defaultChainId: 1, // Ethereum mainnet
        supportedChainIds: [1, 137], // Ethereum and Polygon
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
