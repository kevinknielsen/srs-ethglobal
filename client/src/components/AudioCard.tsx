import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AudioCardProps {
  title: string;
  imageSrc: string;
  audioSrc?: string;
}

export default function AudioCard({ title, imageSrc, audioSrc }: AudioCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(audioSrc));

  const togglePlay = () => {
    if (!audioSrc) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
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

      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button
          onClick={togglePlay}
          className="size-16 rounded-full bg-[#8B0000]/90 hover:bg-[#6B0000]/90 text-white shadow-lg hover:shadow-[#8B0000]/20 transition-all duration-300"
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
      </div>
    </motion.div>
  );
}