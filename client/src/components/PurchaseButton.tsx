import { usePrivy } from '@privy-io/react-auth';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from 'react';
import { FundCard } from '@coinbase/onchainkit/fund';
import { toast } from "@/components/ui/use-toast";

// The wallet address where all membership payments will be received
const MEMBERSHIP_WALLET = {
  recipientAddress: "0x48cD33D0F7A1660Ec029f41f41eE773E38639bDA",
  blockchain: "base",
  assets: ["USDC"]
} as const;

export function PurchaseButton() {
  const { login, authenticated } = usePrivy();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showFundCard, setShowFundCard] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleContinueToPayment = async () => {
    try {
      if (!authenticated) {
        await login();
      } else {
        setShowFundCard(true);
        setDialogOpen(false);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast({
        title: "Error",
        description: "Failed to authenticate. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePaymentSuccess = async (data: any) => {
    try {
      setIsProcessing(true);
      console.log('Payment successful', data);
      
      // Log successful transaction for analytics
      if (process.env.NODE_ENV === 'production') {
        // Add your analytics tracking here
      }

      toast({
        title: "Success",
        description: "Your payment has been processed successfully!",
      });
    } catch (error) {
      console.error('Payment processing error:', error);
      toast({
        title: "Error",
        description: "There was an issue processing your payment. Please contact support.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentError = (error: Error) => {
    console.error('Payment error:', error);
    toast({
      title: "Error",
      description: "Payment failed. Please try again or contact support.",
      variant: "destructive",
    });
  };

  if (showFundCard) {
    return (
      <div className="max-w-md mx-auto p-6 bg-[#1D254A] rounded-xl border border-blue-500/20">
        <div className="mb-6">
          <button 
            onClick={() => setShowFundCard(false)}
            className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
            disabled={isProcessing}
          >
            <span>←</span> Back
          </button>
        </div>
        
        <FundCard
          assetSymbol="USDC"
          country="US"
          currency="USD"
          headerText="Purchase Membership"
          buttonText={isProcessing ? "Processing..." : "Complete Purchase"}
          presetAmountInputs={['5']}
          defaultAmount="5"
          destinationAddress={MEMBERSHIP_WALLET.recipientAddress}
          destinationWallets={[
            {
              address: MEMBERSHIP_WALLET.recipientAddress,
              assets: ["USDC"],
              blockchains: ["base"]
            }
          ]}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      </div>
    );
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          className="w-full h-12 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white rounded-xl font-medium transition-all duration-300 hover:from-[#1D4ED8] hover:to-[#2563EB] shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
          disabled={isProcessing}
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
              <span className="text-2xl font-bold text-white">$5.00</span>
            </div>
          </div>

          <Button 
            onClick={handleContinueToPayment}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600"
            disabled={isProcessing}
          >
            {authenticated ? "Continue to Payment" : "Sign In to Purchase"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}