import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FundCard } from "@coinbase/onchainkit/fund";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const isDevelopment = import.meta.env.MODE === "development";

const developmentAmounts = ['0.10', '0.50', '1.00'] as const;
const productionAmounts = ['2.00', '5.00', '10.00'] as const;

export function PurchaseButton() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-[#8B0000] hover:bg-[#8B0000]/90 w-full"
        >
          Purchase Membership
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Purchase Steel River Saints Membership</DialogTitle>
          <DialogDescription>
            Join the Steel River Saints community and get access to exclusive content and features.
          </DialogDescription>
        </DialogHeader>

        <div>
          <div className="text-sm font-medium mb-4">
            Select payment amount and method:
          </div>

          <div className="bg-[#1D1717] rounded-xl p-4 border border-[#8B0000]/10">
            <FundCard
              assetSymbol="USDC"
              country="US"
              currency="USD"
              presetAmountInputs={isDevelopment ? developmentAmounts : productionAmounts}
              onSuccess={() => {
                toast({
                  title: "Payment successful!",
                  description: "Welcome to Steel River Saints community!",
                });
                setDialogOpen(false);
              }}
              headerText="Purchase Membership"
              buttonText="Pay Now"
              toAddress="0x48cD33D0F7A1660Ec029f41f41eE773E38639bDA"
              paymentMethods={["card", "coinbase", "applepay"]}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}