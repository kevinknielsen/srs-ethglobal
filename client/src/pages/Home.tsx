import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { PurchaseButton } from "@/components/PurchaseButton";
import ChatInterface from "@/components/ChatInterface";
import AudioPlayer from "@/components/AudioPlayer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative container mx-auto px-4 py-24"
      >
        {/* Background image with overlay */}
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

        <div className="relative z-10 max-w-4xl mx-auto space-y-24">
          <section className="text-center space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1D254A] border border-blue-500/20">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="text-sm font-medium text-blue-400">LAUNCHES: MARCH 1, 2025</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 font-western tracking-wide">
                Steel River Saints
              </h1>
              <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
                Steel River Saints is a virtual country artist owned by its fans and managed by artificial intelligence. Purchase a membership below to join the community.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto">
              <div className="bg-[#0D1021] rounded-xl p-3 border border-white/5">
                <div className="text-2xl font-bold text-white">22</div>
                <div className="text-xs text-white/40 uppercase">Days</div>
              </div>
              <div className="bg-[#0D1021] rounded-xl p-3 border border-white/5">
                <div className="text-2xl font-bold text-white">18</div>
                <div className="text-xs text-white/40 uppercase">Hours</div>
              </div>
              <div className="bg-[#0D1021] rounded-xl p-3 border border-white/5">
                <div className="text-2xl font-bold text-white">45</div>
                <div className="text-xs text-white/40 uppercase">Minutes</div>
              </div>
              <div className="bg-[#0D1021] rounded-xl p-3 border border-white/5">
                <div className="text-2xl font-bold text-white">30</div>
                <div className="text-xs text-white/40 uppercase">Seconds</div>
              </div>
            </div>
          </section>

          <div className="max-w-sm mx-auto mb-24">
            <PurchaseButton />
          </div>

          {/* Demo Tracks Section */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Preview Tracks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AudioPlayer 
                title="Demo Track 1"
                // imageSrc and audioSrc will be added when files are provided
              />
              <AudioPlayer 
                title="Demo Track 2"
                // imageSrc and audioSrc will be added when files are provided
              />
              <AudioPlayer 
                title="Demo Track 3"
                // imageSrc and audioSrc will be added when files are provided
              />
            </div>
          </section>

          <ChatInterface />
        </div>
      </motion.main>
    </div>
  );
}