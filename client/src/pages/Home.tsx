import { motion } from "framer-motion";
import { Link } from "wouter";
import { StatsGraph } from "@/components/StatsGraph";
import { ReleasesSection } from "@/components/ReleasesSection";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative container mx-auto px-2 sm:px-4 py-6 sm:py-16 mt-16"
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
          <section className="text-center space-y-4 sm:space-y-8">
            <div className="space-y-3 sm:space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 font-western tracking-wide">
                Superfan One
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
                The Label That Works for You, Not Against You—Where Artists Keep 100% of Their Rights, Royalties, and Control.
              </p>
            </div>

            <div>
              <Link href="/releases/srs">
                <a className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base md:text-lg font-medium text-white bg-[#8B0000] rounded-full hover:bg-[#8B0000]/90 transition-colors">
                  View Latest Release
                </a>
              </Link>
            </div>
          </section>

          <section className="mt-8 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatsGraph 
              title="Tracks Registered"
              value="870.50K"
              timestamp="Nov 6, 2024, 11:46AM"
            />
            <StatsGraph 
              title="Artists"
              value="870.50K"
              timestamp="Nov 6, 2024, 11:46AM"
            />
          </section>

          <ReleasesSection />
        </div>
      </motion.main>
    </div>
  );
}