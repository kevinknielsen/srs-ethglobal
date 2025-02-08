import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePrivy } from '@privy-io/react-auth';

interface UserProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserProfileModal({ open, onOpenChange }: UserProfileModalProps) {
  const { user } = usePrivy();

  const wallets = user?.linkedAccounts?.filter(account => account.type === 'wallet') || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-black/95 border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh] px-1">
          <div className="space-y-6 py-4">
            {user?.email && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-white/70">Email</h3>
                <p className="text-sm">{user.email.address}</p>
              </div>
            )}
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-white/70">Authentication Method</h3>
              <p className="text-sm capitalize">
                {user?.email ? 'Email' : 'Wallet'}
              </p>
            </div>

            {wallets.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-white/70">Connected Wallets</h3>
                <div className="space-y-2">
                  {wallets.map((wallet, index) => (
                    <div key={index} className="text-sm font-mono break-all bg-white/5 p-2 rounded">
                      {wallet.address}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-white/70">Member Since</h3>
              <p className="text-sm">
                {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
