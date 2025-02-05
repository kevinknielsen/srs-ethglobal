import { usePrivy } from '@privy-io/react-auth';
import { Button } from './ui/button';

export default function Navbar({ onJoinClick }: { onJoinClick: () => void }) {
  const { login, authenticated, user, logout } = usePrivy();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-western text-white">Steel River Saints</h1>
          </div>

          <div className="flex items-center space-x-4">
            {authenticated ? (
              <>
                <span className="text-white/60">
                  {user?.email || user?.wallet?.address?.slice(0, 6)}...
                </span>
                <Button
                  variant="outline"
                  className="border-white/10 text-white hover:bg-white/10"
                  onClick={() => logout()}
                >
                  Disconnect
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                className="border-white/10 text-white hover:bg-white/10"
                onClick={() => login()}
              >
                Connect Wallet
              </Button>
            )}
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={onJoinClick}
            >
              Join Now
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}