import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ArtistBioModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="cursor-pointer relative overflow-hidden rounded-xl border border-white/5 bg-[#0D1021]"
        onClick={() => setIsOpen(true)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <img
          src="/images/artist-banner.png"
          alt="Steel River Saints"
          className="w-full h-48 object-cover object-center"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white mb-1">About the Artist</h3>
          <p className="text-white/60 text-sm">
            Click to learn more about Steel River Saints
          </p>
        </div>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl bg-[#0D1021] text-white border-white/5">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">Steel River Saints</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <img
              src="/images/artist-banner.png"
              alt="Steel River Saints"
              className="w-full h-48 object-cover object-center rounded-lg"
            />
            <p className="text-white/80 leading-relaxed">
              Steel River Saints is a gritty, irreverent country music act blending raw storytelling, 
              sharp humor, and modern authenticity to stand out in a crowded market. Known for their 
              relatable, no-nonsense personality, they engage fans with unfiltered humor, behind-the-scenes 
              insights, and interactive songwriting moments.
            </p>
            <p className="text-white/80 leading-relaxed">
              The agent enhances this connection, acting as a witty extension of the band's voice, sharing lyrics, 
              sparking conversations, and deepening engagement with fans. With ambitions to break into the Billboard 
              Hot 100 and grow its dedicated fanbase, Steel River Saints leverages authenticity and humor to create 
              a unique space in country music.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}