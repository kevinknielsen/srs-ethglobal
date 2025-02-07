import { PrivyProvider } from '@privy-io/react-auth';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import { Route, Switch } from "wouter";
import { OnchainProvider } from './providers/OnchainKitProvider';
import '@coinbase/onchainkit/styles.css';
import "./index.css";

function App() {
  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{
        loginMethods: ['email', 'wallet', 'google', 'twitter', 'discord', 'github', 'farcaster'],
        appearance: {
          theme: 'dark',
          accentColor: '#3B82F6',
          showWalletLoginFirst: false,
        },
      }}
    >
      <OnchainProvider>
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen bg-black text-white">
            <Switch>
              <Route path="/" component={Home} />
            </Switch>
            <Toaster />
          </div>
        </QueryClientProvider>
      </OnchainProvider>
    </PrivyProvider>
  );
}

export default App;
