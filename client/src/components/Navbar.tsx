import { UserMenu } from "./UserMenu";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4">
      <div className="text-blue-500 text-2xl font-bold">SRS</div>
      <UserMenu />
    </nav>
  );
}