import { Button } from "@/components/ui/button";

interface NavbarProps {
  onJoinClick: () => void;
}

export default function Navbar({ onJoinClick }: NavbarProps) {
  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-stone-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-western text-stone-800">SRS</span>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-stone-700 hover:text-stone-900 hover:bg-stone-50"
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