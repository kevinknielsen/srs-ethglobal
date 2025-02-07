import { FundCard } from '@coinbase/onchainkit/fund';
import { usePrivy } from '@privy-io/react-auth';
import { useState, useEffect } from 'react';

export function FundingCard() {
  const { user, authenticated } = usePrivy();
  const [hasFunded, setHasFunded] = useState(false);

  // You can add listeners for funding events
  useEffect(() => {
    if (authenticated && user) {
      // Check if user has already funded
      checkUserFundingStatus(user.id);
    }
  }, [authenticated, user]);

  const checkUserFundingStatus = async (userId: string) => {
    // Implement your logic to check if user has funded
    // This could be an API call to your backend
    try {
      // const response = await fetch(`/api/check-funding/${userId}`);
      // const data = await response.json();
      // setHasFunded(data.hasFunded);
    } catch (error) {
      console.error('Error checking funding status:', error);
    }
  };

  if (!authenticated) {
    return <div>Please login first</div>;
  }

  if (hasFunded) {
    return <div>You already have access!</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Purchase Access</h2>
      <FundCard
        assetSymbol="ETH"
        country="US"
        currency="USD"
        onSuccess={() => {
          setHasFunded(true);
          // Implement your logic for successful funding
        }}
        onError={(error) => {
          console.error('Funding error:', error);
          // Handle funding errors
        }}
      />
    </div>
  );
} 