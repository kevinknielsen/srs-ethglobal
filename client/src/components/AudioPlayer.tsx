import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

interface AudioPlayerProps {
  title: string;
  imageSrc?: string;
  audioSrc?: string;
}

export default function AudioPlayer({ title, imageSrc, audioSrc }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audio && audioSrc) {
      const newAudio = new Audio(audioSrc);
      setAudio(newAudio);
      newAudio.play();
      setIsPlaying(true);
    } else if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative aspect-square rounded-lg overflow-hidden group"
    >
      {/* Background Image or Placeholder */}
      <div 
        className={`w-full h-full bg-[#0D1021] ${!imageSrc ? 'flex items-center justify-center' : ''}`}
        style={imageSrc ? {
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        } : {}}
      >
        {!imageSrc && (
          <span className="text-white/40">{title}</span>
        )}
      </div>

      {/* Overlay on Hover */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-4 rounded-full bg-blue-500/90 text-white hover:bg-blue-600/90 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8" />
          ) : (
            <Play className="w-8 h-8" />
          )}
        </motion.button>
      </div>

      {/* Title Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-white font-medium">{title}</p>
      </div>
    </motion.div>
  );
}
