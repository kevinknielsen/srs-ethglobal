import { usePrivy } from '@privy-io/react-auth';
import { useLocation } from 'wouter';
import { Button } from "@/components/ui/button";

export function LoginButton() {
  const { login, authenticated, user } = usePrivy();
  const [, setLocation] = useLocation();

  const handleLogin = async () => {
    await login();
    setLocation('/dashboard');
  };

  if (authenticated) {
    return (
      <Button 
        variant="outline"
        className="bg-[#8B0000] text-white hover:bg-[#6B0000]"
      >
        {user?.email?.toString() || 'Account'}
      </Button>
    );
  }

  return (
    <Button
      onClick={handleLogin}
      variant="outline"
      className="bg-[#8B0000] text-white hover:bg-[#6B0000]"
    >
      Login
    </Button>
  );
}