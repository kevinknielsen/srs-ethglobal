import { useState, useEffect, useRef } from "react";
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
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hoverPosition, setHoverPosition] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressCircleRef = useRef<SVGCircleElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (audioSrc) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
      });
      audioRef.current.addEventListener('timeupdate', () => {
        const currentProgress = (audioRef.current?.currentTime || 0) / (audioRef.current?.duration || 1);
        setProgress(currentProgress);
      });
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        setProgress(0);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('loadedmetadata', () => {});
        audioRef.current.removeEventListener('timeupdate', () => {});
        audioRef.current.removeEventListener('ended', () => {});
      }
    };
  }, [audioSrc]);

  const togglePlay = () => {
    if (!audioSrc || !audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const calculateAngle = (e: React.MouseEvent<SVGElement>) => {
    if (!svgRef.current) return 0;

    const rect = svgRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    let progress = (angle + Math.PI / 2) / (2 * Math.PI);
    if (progress < 0) progress += 1;

    return progress;
  };

  const handleProgressClick = (e: React.MouseEvent<SVGElement>) => {
    if (!audioRef.current) return;
    const progress = calculateAngle(e);
    audioRef.current.currentTime = progress * duration;
  };

  const handleMouseMove = (e: React.MouseEvent<SVGElement>) => {
    const progress = calculateAngle(e);
    setHoverPosition(progress);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);
  const hoverDashoffset = hoverPosition !== null ? circumference * (1 - hoverPosition) : circumference;

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
        <div className="relative">
          <svg 
            ref={svgRef}
            width="96" 
            height="96" 
            className="transform -rotate-90 cursor-pointer"
            onClick={handleProgressClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoverPosition(null)}
          >
            {/* Background circle */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="6"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              ref={progressCircleRef}
              cx="48"
              cy="48"
              r={radius}
              stroke="#8B0000"
              strokeWidth="6"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-100"
            />
            {/* Hover indicator */}
            {hoverPosition !== null && (
              <circle
                cx="48"
                cy="48"
                r={radius}
                stroke="rgba(139, 0, 0, 0.3)"
                strokeWidth="6"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={hoverDashoffset}
                className="transition-all duration-100"
              />
            )}
          </svg>
          <Button
            onClick={togglePlay}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-16 rounded-full bg-[#8B0000]/90 hover:bg-[#6B0000]/90 text-white shadow-lg hover:shadow-[#8B0000]/20 transition-all duration-300"
          >
            {isPlaying ? (
              <Pause className="size-8" />
            ) : (
              <Play className="size-8" />
            )}
          </Button>
        </div>
        <div className="mt-4 space-y-2 text-center">
          <h3 className="text-lg font-semibold text-white px-4">
            {title}
          </h3>
          {audioSrc && (
            <p className="text-sm text-white/60">
              {formatTime(progress * duration)} / {formatTime(duration)}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}