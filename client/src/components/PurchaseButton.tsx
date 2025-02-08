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
import { useToast } from "@/hooks/use-toast";
import { FundCard } from '@coinbase/onchainkit/fund';

export function PurchaseButton() {
  const { login, authenticated } = usePrivy();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const isDevelopment = import.meta.env.MODE === 'development';

  const handleButtonClick = async () => {
    if (!authenticated) {
      await login();
      return;
    }
    setDialogOpen(true);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <Button 
        onClick={handleButtonClick}
        className="w-full h-12 bg-gradient-to-r from-[#8B0000] to-[#6B0000] text-white rounded-xl font-medium transition-all duration-300 hover:from-[#6B0000] hover:to-[#4B0000] shadow-[0_0_20px_rgba(139,0,0,0.3)] hover:shadow-[0_0_30px_rgba(139,0,0,0.5)]"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : authenticated ? "Purchase Premium Membership" : "Sign In to Purchase"}
      </Button>

      {authenticated && (
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
                <span className="text-2xl font-bold text-white">{isDevelopment ? "$0.10" : "$2.00"}</span>
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

            <div className="bg-[#1D1717] rounded-xl p-4 border border-[#8B0000]/10">
              <FundCard
                assetSymbol="ETH"
                country="US"
                currency="USD"
                presetAmountInputs={isDevelopment ? ['0.10', '0.50', '1.00'] as const : ['2.00', '5.00', '10.00'] as const}
                headerText="Purchase Premium Membership"
                buttonText="Purchase with Crypto"
                onSuccess={(transactionHash) => {
                  console.log('Transaction successful:', transactionHash);
                  toast({
                    title: "Purchase Successful",
                    description: "Welcome to Steel River Saints Premium!",
                  });
                  setDialogOpen(false);
                }}
                destinationAddress="0x48cD33D0F7A1660Ec029f41f41eE773E38639bDA"
              />
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}