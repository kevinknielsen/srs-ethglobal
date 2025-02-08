import { usePrivy } from '@privy-io/react-auth';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from 'react';

declare global {
  interface Window {
    CoinbasePaySDK?: any;
  }
}

export function PurchaseButton() {
  const { login, authenticated } = usePrivy();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handlePurchaseClick = async () => {
    if (!authenticated) {
      await login();
      return;
    }

    // Basic Coinbase onramp URL for testing
    const onrampURL = new URL('https://pay.coinbase.com/buy/select-asset');
    onrampURL.searchParams.append('appId', '2d056fb6-dcba-4e2d-8a02-ed823dd9627d');
    onrampURL.searchParams.append('assets', JSON.stringify(['ETH']));
    onrampURL.searchParams.append('presetFiatAmount', '19.99');

    // Open Coinbase onramp in a new tab
    window.open(onrampURL.toString(), '_blank');
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          className="w-full h-12 bg-gradient-to-r from-[#8B0000] to-[#6B0000] text-white rounded-xl font-medium transition-all duration-300 hover:from-[#6B0000] hover:to-[#4B0000] shadow-[0_0_20px_rgba(139,0,0,0.3)] hover:shadow-[0_0_30px_rgba(139,0,0,0.5)]"
        >
          {authenticated ? "Purchase Premium Membership" : "Purchase Membership"}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black/95 border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white">Join Steel River Saints</DialogTitle>
          <DialogDescription className="text-white/60">
            Get exclusive access to behind-the-scenes content and more.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="bg-[#1D1717] rounded-xl p-6 border border-[#8B0000]/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-white">Premium Membership</span>
              <span className="text-2xl font-bold text-white">$19.99</span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-white/80">
                <span className="mr-2">✓</span>
                Exclusive content access
              </li>
              <li className="flex items-center text-white/80">
                <span className="mr-2">✓</span>
                Early access to releases
              </li>
              <li className="flex items-center text-white/80">
                <span className="mr-2">✓</span>
                Members-only chat
              </li>
            </ul>
          </div>

          <Button 
            onClick={handlePurchaseClick}
            className="w-full bg-gradient-to-r from-[#8B0000] to-[#6B0000]"
          >
            {authenticated ? "Continue to Payment" : "Sign In to Purchase"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}