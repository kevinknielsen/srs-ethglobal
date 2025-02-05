import { usePrivy } from '@privy-io/react-auth';
import { useLocation } from 'wouter';

export function LoginButton() {
  const { login, authenticated } = usePrivy();
  const [, setLocation] = useLocation();

  const handleLogin = async () => {
    await login();
    setLocation('/dashboard');
  };

  if (authenticated) {
    return null; // Or show a different button/component when logged in
  }

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
    >
      Login
    </button>
  );
} 