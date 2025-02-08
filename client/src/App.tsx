import { PrivyProvider, type User as PrivyUser } from '@privy-io/react-auth';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { privyConfig } from './config/privy';
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import { Switch, Route } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Providers } from './providers';
import '@coinbase/onchainkit/styles.css';
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
  return (
    <Providers>
      <PrivyProvider {...privyConfig}>
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen bg-black text-white">
            <Router />
            <Toaster />
          </div>
        </QueryClientProvider>
      </PrivyProvider>
    </Providers>
  );
}

export default App;