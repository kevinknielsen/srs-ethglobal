import { UserMenu } from "./UserMenu";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4">
      <div></div>
      <UserMenu />
    </nav>
  );
}