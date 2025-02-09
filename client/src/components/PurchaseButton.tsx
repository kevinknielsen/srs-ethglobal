import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FundCard } from '@coinbase/onchainkit/fund';
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { usePrivy } from '@privy-io/react-auth';

const isDevelopment = import.meta.env.MODE === "development";

const developmentAmounts = ['0.10', '0.50', '1.00'] as const;
const productionAmounts = ['2.00', '5.00', '10.00'] as const;

export function PurchaseButton() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { login, authenticated } = usePrivy();
  const { toast } = useToast();

  const handlePurchaseClick = async () => {
    if (!authenticated) {
      await login();
    } else {
      setDialogOpen(true);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <Button
        onClick={handlePurchaseClick}
        variant="default"
        className="bg-[#8B0000] hover:bg-[#8B0000]/90 w-full"
      >
        {authenticated ? "Purchase Membership" : "Login to Purchase"}
      </Button>

      {authenticated && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Purchase Steel River Saints Membership</DialogTitle>
          </DialogHeader>

          <div>
            <div className="text-sm font-medium mb-4">
              Join the Steel River Saints community and get access to exclusive content and features.
            </div>

            <div className="bg-[#1D1717] rounded-xl p-4 border border-[#8B0000]/10">
              <FundCard
                assetSymbol="USDC"
                country="US"
                currency="USD"
                presetAmountInputs={isDevelopment ? developmentAmounts : productionAmounts}
                headerText="Select payment amount and method"
                buttonText="Purchase Membership"
                onSuccess={() => {
                  toast({
                    title: "Payment successful!",
                    description: "Welcome to Steel River Saints community!",
                  });
                  setDialogOpen(false);
                }}
                onError={(e) => {
                  toast({
                    title: "Payment failed",
                    description: e?.toString() || "Payment could not be processed",
                    variant: "destructive",
                  });
                }}
              />
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}