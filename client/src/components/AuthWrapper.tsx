import { usePrivy } from '@privy-io/react-auth';
import { useEffect } from 'react';
import { useSubscription } from '@/providers/SubscriptionProvider';

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, authenticated } = usePrivy();
  const { checkStatus } = useSubscription();

  useEffect(() => {
    if (authenticated && user?.id) {
      checkStatus(user.id);
    }
  }, [authenticated, user, checkStatus]);

  return <>{children}</>;
} 