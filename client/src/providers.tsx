'use client';

import type { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base, baseSepolia } from 'wagmi/chains';

export function Providers({ children }: { children: ReactNode }) {
  const isDevelopment = import.meta.env.MODE === 'development';

  return (
    <OnchainKitProvider
      apiKey={import.meta.env.VITE_ONCHAINKIT_API_KEY}
      chain={isDevelopment ? baseSepolia : base}
    >
      {children}
    </OnchainKitProvider>
  );
}