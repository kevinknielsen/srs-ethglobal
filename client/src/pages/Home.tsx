import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative container mx-auto px-4 py-16"
      >
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ 
              backgroundImage: 'url("/images/artist-banner.png")',
              backgroundPosition: '50% 30%',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <section className="text-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 font-western tracking-wide">
                Coda Collective
              </h1>
              <p className="text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
                The Label That Works for You, Not Against You—Where Artists Keep 100% of Their Rights, Royalties, and Control.
              </p>
            </div>

            <div>
              <Link href="/releases/srs">
                <a className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-[#8B0000] rounded-full hover:bg-[#8B0000]/90 transition-colors">
                  View Latest Release
                </a>
              </Link>
            </div>
          </section>
        </div>
      </motion.main>
    </div>
  );
}