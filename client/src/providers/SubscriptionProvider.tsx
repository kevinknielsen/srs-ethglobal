import { ReactNode, createContext, useContext, useState } from 'react';
import { checkSubscriptionStatus } from '@/services/subscription';
import { toast } from '@/components/ui/use-toast';
import { AuthWrapper } from '@/components/AuthWrapper';

interface SubscriptionContextType {
  isSubscribed: boolean;
  isLoading: boolean;
  setIsSubscribed: (value: boolean) => void;
  checkStatus: (userId: string) => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkStatus = async (userId: string) => {
    try {
      setIsLoading(true);
      const status = await checkSubscriptionStatus(userId);
      setIsSubscribed(status);
    } catch (error) {
      console.error('Error checking subscription:', error);
      toast({
        title: "Error",
        description: "Failed to check subscription status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SubscriptionContext.Provider value={{ isSubscribed, isLoading, setIsSubscribed, checkStatus }}>
      <AuthWrapper>{children}</AuthWrapper>
    </SubscriptionContext.Provider>
  );
}

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}; 