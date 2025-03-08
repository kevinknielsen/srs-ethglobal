import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Coda Collective</h3>
            <p className="text-sm text-white/60">
              The future of artist-owned music finance—a decentralized, transparent, and scalable model.
            </p>
          </div>

          {/* Platform Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <span className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer">
                    About
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard">
                  <span className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer">
                    Fans
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/artist-dashboard">
                  <span className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer">
                    Artists
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <Link href="/about">
                  <span className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer">
                    FAQ
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-sm text-white/60 text-center">
            © {new Date().getFullYear()} Coda Collective. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}