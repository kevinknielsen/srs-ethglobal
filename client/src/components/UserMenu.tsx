import { usePrivy } from '@privy-io/react-auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export function UserMenu() {
  const { authenticated, logout, user } = usePrivy();

  if (!authenticated) return null;

  // Safely get display name with proper type handling
  const emailStr = user?.email?.toString();
  const displayName = emailStr
    ? emailStr.split('@')[0]
    : user?.wallet?.address?.slice(0, 6)
    ?? 'User';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-8 w-8 rounded-full bg-black/20 text-white"
        >
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-black/90 text-white border-white/10">
        <DropdownMenuItem className="flex-col items-start">
          <div className="font-medium">{displayName}</div>
          {emailStr && (
            <div className="text-xs text-white/60">{emailStr}</div>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-red-400 cursor-pointer hover:text-red-300 hover:bg-white/5"
          onClick={() => logout()}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}