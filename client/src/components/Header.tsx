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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ExternalLink } from "lucide-react";

// For demo purposes, we'll use a mock session
const mockSession = {
  isLoggedIn: true,
  user: {
    name: "Demo User",
    email: "demo@example.com",
    avatar: "/images/avatar.jpg",
    isArtist: true,
    isAdmin: true
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
        <div className="flex h-16 items-center gap-8">
          {/* Logo */}
          <Link href="/">
            <div className="text-xl font-bold text-white cursor-pointer">
              Superfan One
            </div>
          </Link>

          {/* Navigation */}
          <NavigationMenu className="flex">
            <NavigationMenuList className="flex gap-6">
              {/* Product Category */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm text-white/60 hover:text-white bg-transparent">
                  Product
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] bg-black/95 border border-white/10">
                    <div className="grid gap-2 p-4">
                      <NavigationMenuLink asChild>
                        <Link href="/dashboard">
                          <a className="block p-3 hover:bg-white/5 rounded-lg">
                            <div className="text-sm font-medium text-white">For Fans</div>
                            <p className="text-sm text-white/60 mt-1">
                              Invest in your favorite artists and earn from their success
                            </p>
                          </a>
                        </Link>
                      </NavigationMenuLink>
                      {isArtist && (
                        <NavigationMenuLink asChild>
                          <Link href="/artist-dashboard">
                            <a className="block p-3 hover:bg-white/5 rounded-lg">
                              <div className="text-sm font-medium text-white">For Artists</div>
                              <p className="text-sm text-white/60 mt-1">
                                Raise funds and manage your music projects
                              </p>
                            </a>
                          </Link>
                        </NavigationMenuLink>
                      )}
                      <NavigationMenuLink asChild>
                        <Link href="/about">
                          <a className="block p-3 hover:bg-white/5 rounded-lg">
                            <div className="text-sm font-medium text-white">About</div>
                            <p className="text-sm text-white/60 mt-1">
                              Learn about our artist-centric platform
                            </p>
                          </a>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Resources Category */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm text-white/60 hover:text-white bg-transparent">
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] bg-black/95 border border-white/10">
                    <div className="grid gap-2 p-4">
                      <NavigationMenuLink asChild>
                        <a
                          href="https://docs.originalworks.xyz"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-3 hover:bg-white/5 rounded-lg"
                        >
                          <div className="text-sm font-medium text-white flex items-center gap-2">
                            Original Works
                            <ExternalLink className="h-3 w-3" />
                          </div>
                          <p className="text-sm text-white/60 mt-1">
                            Learn about the protocol powering our platform
                          </p>
                        </a>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="/about#faq">
                          <a className="block p-3 hover:bg-white/5 rounded-lg">
                            <div className="text-sm font-medium text-white">FAQ</div>
                            <p className="text-sm text-white/60 mt-1">
                              Common questions about our platform
                            </p>
                          </a>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {isAdmin && (
                <NavigationMenuItem>
                  <Link href="/admin-dashboard">
                    <span className="text-sm text-white/60 hover:text-white cursor-pointer">
                      Admin
                    </span>
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Push profile menu to the right */}
          <div className="flex-1" />

          {/* Action Buttons / Profile */}
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <Button
                variant="default"
                className="bg-[#8B0000] hover:bg-[#A00000] text-white"
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
                <DropdownMenuContent className="w-56 bg-black/95 border-white/10" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-white">{mockSession.user.name}</p>
                      <p className="text-xs leading-none text-white/60">
                        {mockSession.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">For Fans</Link>
                  </DropdownMenuItem>
                  {isArtist && (
                    <DropdownMenuItem asChild>
                      <Link href="/artist-dashboard">For Artists</Link>
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
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="text-white/60 hover:text-white hover:bg-white/5">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}