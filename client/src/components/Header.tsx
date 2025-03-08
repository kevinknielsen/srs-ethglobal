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
import { ExternalLink, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
            <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-b from-blue-100 via-white to-white/50 tracking-tight">
              Superfan One
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
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

          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-black/95 border-white/10 p-0">
              <nav className="flex flex-col h-full">
                <div className="p-4 border-b border-white/10">
                  <h2 className="text-lg font-semibold text-white">Menu</h2>
                </div>
                <div className="flex-1 overflow-auto py-4">
                  <div className="px-4 py-2">
                    <h3 className="text-sm font-medium text-white mb-2">Product</h3>
                    <div className="space-y-2">
                      <Link href="/dashboard">
                        <a className="block p-2 text-white/60 hover:text-white">For Fans</a>
                      </Link>
                      {isArtist && (
                        <Link href="/artist-dashboard">
                          <a className="block p-2 text-white/60 hover:text-white">For Artists</a>
                        </Link>
                      )}
                      <Link href="/about">
                        <a className="block p-2 text-white/60 hover:text-white">About</a>
                      </Link>
                    </div>
                  </div>
                  <div className="px-4 py-2">
                    <h3 className="text-sm font-medium text-white mb-2">Resources</h3>
                    <div className="space-y-2">
                      <a
                        href="https://docs.originalworks.xyz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-2 text-white/60 hover:text-white"
                      >
                        Original Works
                        <ExternalLink className="inline-block ml-2 h-3 w-3" />
                      </a>
                      <Link href="/about#faq">
                        <a className="block p-2 text-white/60 hover:text-white">FAQ</a>
                      </Link>
                    </div>
                  </div>
                  {isAdmin && (
                    <div className="px-4 py-2">
                      <Link href="/admin-dashboard">
                        <a className="block p-2 text-white/60 hover:text-white">Admin</a>
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Action Buttons / Profile */}
          <div className="flex items-center">
            {!isLoggedIn ? (
              <Button
                variant="default"
                className="bg-[#4B0082] hover:bg-[#380062] text-white"
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