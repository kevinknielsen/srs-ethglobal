import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SubscriptionState {
  isSubscribed: boolean;
  setIsSubscribed: (status: boolean) => void;
}

export const useSubscriptionStatus = create<SubscriptionState>()(
  persist(
    (set) => ({
      isSubscribed: false,
      setIsSubscribed: (status) => set({ isSubscribed: status }),
    }),
    {
      name: 'subscription-storage',
    }
  )
); 