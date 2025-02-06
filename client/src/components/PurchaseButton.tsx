import { usePrivy } from '@privy-io/react-auth';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";

// The wallet address where all membership payments will be received
const MEMBERSHIP_WALLET = {
  address: "0xd8BaD9e3832233001BA5a5979Fd149382E1583b7",
  blockchain: "ethereum",
  assets: ["ETH", "USDC"]
};

export function PurchaseButton() {
  const { login, authenticated } = usePrivy();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handlePurchaseClick = async () => {
    if (!authenticated) {
      await login();
      return;
    }

    try {
      const onrampURL = new URL('https://pay.coinbase.com/buy/select-asset');

      // Construct the destination wallet configuration
      const destinationWallet = {
        address: MEMBERSHIP_WALLET.address,
        blockchain: MEMBERSHIP_WALLET.blockchain,
        assets: MEMBERSHIP_WALLET.assets
      };

      // Add parameters according to Coinbase docs
      onrampURL.searchParams.append('appId', '2d056fb6-dcba-4e2d-8a02-ed823dd9627d');
      onrampURL.searchParams.append('destinationWallets', JSON.stringify([destinationWallet]));
      onrampURL.searchParams.append('presetFiatAmount', '5.99'); // ✅ Updated price to 5.99
      onrampURL.searchParams.append('defaultNetwork', 'ethereum');

      // Open Coinbase Onramp in a new tab
      window.open(onrampURL.toString(), '_blank');
      setDialogOpen(false);

      toast({
        title: "Payment Started",
        description: "Coinbase payment window opened in a new tab",
      });

    } catch (error) {
      console.error('Failed to process payment:', error);
      toast({
        title: "Error",
        description: "Failed to open payment window. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          className="w-full h-12 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white rounded-xl font-medium transition-all duration-300 hover:from-[#1D4ED8] hover:to-[#2563EB] shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
        >
          {authenticated ? "Purchase Membership" : "Join Now"}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black/95 border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white">Membership Purchase</DialogTitle>
          <DialogDescription className="text-white/60">
            Complete your membership payment
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="bg-[#0D1021] rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-white">Membership Fee</span>
              <span className="text-2xl font-bold text-white">$5.99</span> {/* ✅ Updated price */}
            </div>
          </div>

          <Button 
            onClick={handlePurchaseClick}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600"
          >
            {authenticated ? "Continue to Payment" : "Sign In to Purchase"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}