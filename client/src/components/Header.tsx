import { LoginButton } from './LoginButton';

export function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <div></div>
      <LoginButton />
    </header>
  );
}