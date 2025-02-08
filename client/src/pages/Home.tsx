import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { PurchaseButton } from "@/components/PurchaseButton";
import ChatInterface from "@/components/ChatInterface";
import AudioCard from "@/components/AudioCard";
import { ArtistBioModal } from "@/components/ArtistBioModal";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-03-01T00:00:00');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const demoTracks = [
    {
      title: "Steel River Nights",
      imageSrc: "/images/srs-1.jpg",
    },
    {
      title: "The Bottle",
      imageSrc: "/images/srs-2.jpg",
      audioSrc: "/audio/The Bottle.mp3"
    },
    {
      title: "Southern Starlight",
      imageSrc: "/images/srs-3.jpg",
    },
  ];

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

        <div className="relative z-10 max-w-4xl mx-auto space-y-16">
          <section className="text-center space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1D1717] border border-[#8B0000]/20">
              <div className="w-2 h-2 rounded-full bg-[#8B0000] animate-pulse"></div>
              <span className="text-sm font-medium text-[#8B0000]">LAUNCHES: MARCH 1, 2025</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 font-western tracking-wide">
                Steel River Saints
              </h1>
              <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
                Steel River Saints is a virtual country artist owned by its fans and managed by artificial intelligence; purchase a membership below to join the community.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto">
              <div className="bg-[#1D1717] rounded-xl p-3 border border-[#8B0000]/10">
                <div className="text-2xl font-bold text-white">{timeLeft.days}</div>
                <div className="text-xs text-white/40 uppercase">Days</div>
              </div>
              <div className="bg-[#1D1717] rounded-xl p-3 border border-[#8B0000]/10">
                <div className="text-2xl font-bold text-white">{timeLeft.hours}</div>
                <div className="text-xs text-white/40 uppercase">Hours</div>
              </div>
              <div className="bg-[#1D1717] rounded-xl p-3 border border-[#8B0000]/10">
                <div className="text-2xl font-bold text-white">{timeLeft.minutes}</div>
                <div className="text-xs text-white/40 uppercase">Minutes</div>
              </div>
              <div className="bg-[#1D1717] rounded-xl p-3 border border-[#8B0000]/10">
                <div className="text-2xl font-bold text-white">{timeLeft.seconds}</div>
                <div className="text-xs text-white/40 uppercase">Seconds</div>
              </div>
            </div>
          </section>

          <div className="max-w-sm mx-auto">
            <PurchaseButton />
          </div>

          <div className="max-w-2xl mx-auto px-4">
            <ArtistBioModal />
          </div>

          <section className="py-8">
            <h2 className="text-3xl font-bold text-center text-white mb-8">Preview Tracks</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {demoTracks.map((track, index) => (
                <AudioCard
                  key={index}
                  title={track.title}
                  imageSrc={track.imageSrc}
                  audioSrc={track.audioSrc}
                />
              ))}
            </div>
          </section>

          <ChatInterface />
        </div>
      </motion.main>
    </div>
  );
}