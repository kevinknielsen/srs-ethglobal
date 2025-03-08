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
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="text-xl font-bold text-white cursor-pointer">
              Coda Collective
            </div>
          </Link>

          {/* Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {/* Product Category */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-white/60 hover:text-white">
                  Product
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/dashboard">
                          <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/5">
                            <div className="text-sm font-medium leading-none text-white">For Fans</div>
                            <p className="line-clamp-2 text-sm leading-snug text-white/60">
                              Invest in your favorite artists and earn from their success
                            </p>
                          </a>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {isArtist && (
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/artist-dashboard">
                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/5">
                              <div className="text-sm font-medium leading-none text-white">For Artists</div>
                              <p className="line-clamp-2 text-sm leading-snug text-white/60">
                                Raise funds and manage your music projects
                              </p>
                            </a>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    )}
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/about">
                          <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/5">
                            <div className="text-sm font-medium leading-none text-white">About</div>
                            <p className="line-clamp-2 text-sm leading-snug text-white/60">
                              Learn about our artist-centric platform
                            </p>
                          </a>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Resources Category */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-white/60 hover:text-white">
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href="https://docs.originalworks.xyz"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/5"
                        >
                          <div className="text-sm font-medium leading-none text-white inline-flex items-center gap-2">
                            Original Works
                            <ExternalLink className="h-3 w-3" />
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-white/60">
                            Learn about the protocol powering our platform
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/about#faq">
                          <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/5">
                            <div className="text-sm font-medium leading-none text-white">FAQ</div>
                            <p className="line-clamp-2 text-sm leading-snug text-white/60">
                              Common questions about our platform
                            </p>
                          </a>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {isAdmin && (
                <NavigationMenuItem>
                  <Link href="/admin-dashboard">
                    <span className={`text-sm ${location === "/admin-dashboard" ? "text-white" : "text-white/60"} hover:text-white transition-colors cursor-pointer px-4 py-2`}>
                      Admin
                    </span>
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>

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