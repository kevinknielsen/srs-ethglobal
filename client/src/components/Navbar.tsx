import { Button } from "@/components/ui/button";

interface NavbarProps {
  onJoinClick: () => void;
}

export default function Navbar({ onJoinClick }: NavbarProps) {
  return (
    <nav className="fixed w-full top-0 z-50 bg-gradient-to-b from-black via-black/80 to-transparent">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-western text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">SRS</span>
          </div>

          <div className="flex items-center space-x-6">
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Early Benefits</a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Reviews</a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">FAQ's</a>
            <Button
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/5"
              onClick={onJoinClick}
            >
              Get Template
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}