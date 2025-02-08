import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause } from 'lucide-react';
import { Button } from './ui/button';

interface WaveformPlayerProps {
  audioUrl: string;
  title: string;
  containerRef?: React.RefObject<HTMLDivElement>;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export default function WaveformPlayer({ 
  audioUrl, 
  title,
  containerRef,
  onPlayStateChange 
}: WaveformPlayerProps) {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');

  useEffect(() => {
    if (waveformRef.current) {
      try {
        // Initialize WaveSurfer
        wavesurfer.current = WaveSurfer.create({
          container: waveformRef.current,
          waveColor: '#4a5568',
          progressColor: '#3b82f6',
          cursorColor: '#3b82f6',
          barWidth: 2,
          barGap: 1,
          height: 60,
          normalize: true,
        });

        // Load audio file
        wavesurfer.current.load(audioUrl);

        // Add event listeners
        wavesurfer.current.on('ready', () => {
          if (wavesurfer.current) {
            const audioDuration = wavesurfer.current.getDuration();
            setDuration(formatTime(audioDuration));
          }
        });

        wavesurfer.current.on('audioprocess', () => {
          if (wavesurfer.current) {
            const time = wavesurfer.current.getCurrentTime();
            setCurrentTime(formatTime(time));
          }
        });

        wavesurfer.current.on('play', () => {
          setIsPlaying(true);
          onPlayStateChange?.(true);
        });

        wavesurfer.current.on('pause', () => {
          setIsPlaying(false);
          onPlayStateChange?.(false);
        });

        // Cleanup function
        return () => {
          if (wavesurfer.current) {
            try {
              // First pause any playback
              if (isPlaying) {
                wavesurfer.current.pause();
              }
              // Remove all event listeners first
              wavesurfer.current.unAll();
              // Then destroy the instance
              wavesurfer.current.destroy();
              wavesurfer.current = null;
            } catch (error) {
              console.error('Error cleaning up wavesurfer:', error);
            }
          }
        };
      } catch (error) {
        console.error('Error initializing wavesurfer:', error);
      }
    }
  }, [audioUrl]);

  const togglePlayPause = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 bg-black/40 rounded-lg backdrop-blur-sm">
      <div className="mb-2">
        <h3 className="text-white font-medium">{title}</h3>
      </div>
      <div ref={waveformRef} className="mb-2" />
      <div className="flex items-center justify-between">
        <Button
          onClick={togglePlayPause}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>
        <div className="text-sm text-white/80">
          {currentTime} / {duration}
        </div>
      </div>
    </div>
  );
}