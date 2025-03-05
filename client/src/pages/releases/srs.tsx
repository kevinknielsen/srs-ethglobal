import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { PurchaseButton } from "@/components/PurchaseButton";
import ChatInterface from "@/components/ChatInterface";
import AudioCard from "@/components/AudioCard";
import { ArtistBioModal } from "@/components/ArtistBioModal";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

interface ReleaseData {
  id: number;
  title: string;
  tagline: string;
  description: string;
  coverImage: string;
  fundingProgress: number;
  fundingGoal: number;
  amountRaised: number;
  releaseDate: string;
  status: string;
  tracks: Array<{
    id: number;
    title: string;
    duration: string;
    previewUrl: string;
    isPreview: boolean;
  }>;
  milestones: Array<{
    id: number;
    name: string;
    status: string;
    date: string;
  }>;
  revenueSharing: {
    fans: number;
    platform: number;
    artist: number;
  };
}

export default function SteelRiverSaintsRelease() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const { data: releaseData, isLoading } = useQuery<ReleaseData>({
    queryKey: ['/api/releases/srs'],
    queryFn: async () => {
      const response = await fetch('/api/releases/srs');
      if (!response.ok) {
        throw new Error('Failed to fetch release data');
      }
      return response.json();
    }
  });

  useEffect(() => {
    if (!releaseData?.releaseDate) return;

    const targetDate = new Date(releaseData.releaseDate);

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
  }, [releaseData?.releaseDate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading release details...</div>
      </div>
    );
  }

  if (!releaseData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Failed to load release details.</div>
      </div>
    );
  }

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
              backgroundImage: `url(${releaseData.coverImage})`,
              backgroundPosition: '50% 30%',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-16">
          <section className="text-center space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1D1717] border border-[#8B0000]/20">
              <div className="w-2 h-2 rounded-full bg-[#8B0000] animate-pulse"></div>
              <span className="text-sm font-medium text-[#8B0000]">
                LAUNCHES: {new Date(releaseData.releaseDate).toLocaleDateString('en-US', { 
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                }).toUpperCase()}
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 font-western tracking-wide">
                {releaseData.title}
              </h1>
              <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
                {releaseData.description}
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

            {/* Progress Bar */}
            <div className="max-w-sm mx-auto space-y-2">
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#8B0000] rounded-full transition-all duration-500"
                  style={{ width: `${releaseData.fundingProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">
                  ${releaseData.amountRaised.toLocaleString()} raised
                </span>
                <span className="text-white/60">
                  ${releaseData.fundingGoal.toLocaleString()} goal
                </span>
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
              {releaseData.tracks.map((track) => (
                <AudioCard
                  key={track.id}
                  title={track.title}
                  imageSrc={releaseData.coverImage}
                  audioSrc={track.previewUrl}
                />
              ))}
            </div>
          </section>

          {/* Revenue Sharing Section */}
          <section className="py-8">
            <h2 className="text-3xl font-bold text-center text-white mb-8">Revenue Sharing</h2>
            <div className="grid grid-cols-3 gap-6">
              {Object.entries(releaseData.revenueSharing).map(([key, value]) => (
                <div key={key} className="bg-[#1D1717] rounded-xl p-6 text-center border border-[#8B0000]/10">
                  <div className="text-3xl font-bold text-white mb-2">{value}%</div>
                  <div className="text-sm text-white/60 capitalize">{key}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Milestones Section */}
          <section className="py-8">
            <h2 className="text-3xl font-bold text-center text-white mb-8">Project Milestones</h2>
            <div className="space-y-4">
              {releaseData.milestones.map((milestone) => (
                <div key={milestone.id} className="bg-[#1D1717] rounded-xl p-6 border border-[#8B0000]/10">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{milestone.name}</h3>
                      <p className="text-sm text-white/60">
                        {new Date(milestone.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      milestone.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      milestone.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {milestone.status.replace('_', ' ').charAt(0).toUpperCase() + milestone.status.slice(1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <ChatInterface />
        </div>
      </motion.main>
    </div>
  );
}