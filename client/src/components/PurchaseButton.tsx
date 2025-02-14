import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function PurchaseButton() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handlePurchaseClick = () => {
    setDialogOpen(true);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <Button
        onClick={handlePurchaseClick}
        variant="default"
        className="bg-[#8B0000] hover:bg-[#8B0000]/90 w-full"
      >
        Purchase Membership
      </Button>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Purchase Steel River Saints Membership</DialogTitle>
        </DialogHeader>

        <div>
          <div className="text-sm font-medium mb-4">
            Join the Steel River Saints community and get access to exclusive content and features.
          </div>

          <div className="bg-[#1D1717] rounded-xl p-4 border border-[#8B0000]/10">
            <p className="text-center text-sm text-white/60">
              Payment integration coming soon!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}