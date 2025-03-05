import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// For demo purposes, we'll use a mock session
const mockSession = {
  isLoggedIn: true,
  user: {
    name: "Demo User",
    email: "demo@example.com",
    avatar: "/images/avatar.jpg",
    isArtist: true, // Added isArtist flag for demo
    isAdmin: true // Added isAdmin flag for demo
  }
};

export function Header() {
  const [location] = useLocation();

  const isLoggedIn = mockSession.isLoggedIn;
  const isArtist = mockSession.user.isArtist;
  const isAdmin = mockSession.user.isAdmin;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="text-xl font-bold text-white cursor-pointer">
              Coda Collective
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/">
              <span className={`text-sm ${location === "/" ? "text-white" : "text-white/60"} hover:text-white transition-colors`}>
                Home
              </span>
            </Link>
            <Link href="/dashboard">
              <span className={`text-sm ${location === "/dashboard" ? "text-white" : "text-white/60"} hover:text-white transition-colors`}>
                Fans
              </span>
            </Link>
            {isArtist && (
              <Link href="/artist-dashboard">
                <span className={`text-sm ${location === "/artist-dashboard" ? "text-white" : "text-white/60"} hover:text-white transition-colors`}>
                  Artists
                </span>
              </Link>
            )}
            {isAdmin && (
              <Link href="/admin-dashboard">
                <span className={`text-sm ${location === "/admin-dashboard" ? "text-white" : "text-white/60"} hover:text-white transition-colors`}>
                  Admin
                </span>
              </Link>
            )}
          </nav>

          {/* Action Buttons / Profile */}
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <Button 
                variant="default" 
                className="bg-[#C10000] hover:bg-[#A00000] text-white"
                asChild
              >
                <Link href="/#releases">Start Investing</Link>
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={mockSession.user.avatar} alt={mockSession.user.name} />
                      <AvatarFallback>DU</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{mockSession.user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {mockSession.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Fans</Link>
                  </DropdownMenuItem>
                  {isArtist && (
                    <DropdownMenuItem asChild>
                      <Link href="/artist-dashboard">Artists</Link>
                    </DropdownMenuItem>
                  )}
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin-dashboard">Admin</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}