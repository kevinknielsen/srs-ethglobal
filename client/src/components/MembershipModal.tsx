import { usePrivy } from '@privy-io/react-auth';
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    CoinbaseOnrampEmbed?: any;
  }
}

export function MembershipModal() {
  const { login, authenticated } = usePrivy();

  const handleClick = async () => {
    if (!authenticated) {
      await login();
    }
  };

  return (
    <Button 
      variant="default" 
      onClick={handleClick}
      className="bg-blue-600 hover:bg-blue-700"
    >
      {authenticated ? 'Member' : 'Join Now'}
    </Button>
  );
}