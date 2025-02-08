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
import "./index.css";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

async function syncUserData(privyUserId: string, email: string | null, wallets: string[]) {
  try {
    const userData = {
      privyUserId,
      email,
      walletAddresses: wallets,
      authMethod: email ? 'email' : 'wallet'
    };

    await apiRequest('/api/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  } catch (error) {
    console.error('Failed to sync user data:', error);
  }
}

function App() {
  const { toast } = useToast();

  const handleLoginComplete = async (user: PrivyUser) => {
    try {
      const email = user.email?.address || null;
      const wallets = user.linkedAccounts?.filter(account => account.type === 'wallet')
        .map(wallet => wallet.address) || [];

      await syncUserData(user.id, email, wallets);
      queryClient.invalidateQueries({ queryKey: ['/api/users'] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sync user data. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <PrivyProvider
      {...privyConfig}
      onLoginComplete={handleLoginComplete}
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