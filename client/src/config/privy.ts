import type { PrivyProviderProps, User as PrivyUser } from '@privy-io/react-auth';

const appId = import.meta.env.VITE_PRIVY_APP_ID;

if (!appId) {
  throw new Error('VITE_PRIVY_APP_ID environment variable is required');
}

export const privyConfig: Omit<PrivyProviderProps, 'children' | 'onLoginComplete'> = {
  appId,
  config: {
    appearance: {
      accentColor: "#8B0000",
      theme: "dark",
      showWalletLoginFirst: false,
      logo: "/images/artist-banner.png",
    },
    loginMethods: ["email", "wallet", "google", "twitter", "farcaster"],
    embeddedWallets: {
      createOnLogin: 'users-without-wallets'
    }
  }
};