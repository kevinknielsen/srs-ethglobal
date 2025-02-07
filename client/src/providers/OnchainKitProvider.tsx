'use client';

import { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'viem/chains';

export function OnchainProvider({ children }: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey="8NdGA85x3gfXp2qysToIwLqik6jlj4PI"
      projectId="ebf44f63-9bb7-4f08-9fa0-5c743b337016"
      chain={base}
    >
      {children}
    </OnchainKitProvider>
  );
} 