import { LoginButton } from './LoginButton';

export function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <div className="text-blue-500 text-2xl font-bold">SRS</div>
      <LoginButton />
    </header>
  );
} 