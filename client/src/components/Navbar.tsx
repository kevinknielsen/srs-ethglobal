import { Button } from "@/components/ui/button";

interface NavbarProps {
  onJoinClick: () => void;
}

export default function Navbar({ onJoinClick }: NavbarProps) {
  return (
    <nav className="bg-black/10 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-western text-white">SRS</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-white hover:text-white/80"
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
