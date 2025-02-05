import { Button } from "@/components/ui/button";

interface NavbarProps {
  onJoinClick: () => void;
}

export default function Navbar({ onJoinClick }: NavbarProps) {
  return (
    <nav className="bg-black/50 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-western bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">SRS</span>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/5"
              onClick={onJoinClick}
            >
              Join Now
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}