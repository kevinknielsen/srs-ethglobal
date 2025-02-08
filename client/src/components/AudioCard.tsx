import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import WaveformPlayer from "./WaveformPlayer";

interface AudioCardProps {
  title: string;
  imageSrc: string;
  audioSrc?: string;
}

export default function AudioCard({ title, imageSrc, audioSrc }: AudioCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showWaveform, setShowWaveform] = useState(false);

  const handlePlayStateChange = (playing: boolean) => {
    setIsPlaying(playing);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-black/40 backdrop-blur-sm border border-white/10"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-80"
        style={{ backgroundImage: `url(${imageSrc})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />

      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center ${showWaveform ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`}
      >
        {showWaveform && audioSrc ? (
          <div className="w-full px-4">
            <WaveformPlayer
              audioUrl={audioSrc}
              title={title}
              onPlayStateChange={handlePlayStateChange}
            />
          </div>
        ) : (
          <>
            <Button
              onClick={() => audioSrc && setShowWaveform(true)}
              className="size-16 rounded-full bg-blue-500/90 hover:bg-blue-600/90 text-white shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
              disabled={!audioSrc}
            >
              {isPlaying ? (
                <Pause className="size-8" />
              ) : (
                <Play className="size-8" />
              )}
            </Button>
            <h3 className="mt-4 text-lg font-semibold text-white text-center px-4">
              {title}
            </h3>
            {!audioSrc && (
              <p className="text-sm text-white/60 mt-2">Coming soon</p>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}