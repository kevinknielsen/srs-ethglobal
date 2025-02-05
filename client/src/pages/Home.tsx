import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import MembershipModal from "@/components/MembershipModal";
import ChatInterface from "@/components/ChatInterface";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-black">
      <Navbar onJoinClick={() => setShowModal(true)} />

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-24"
      >
        <div className="max-w-4xl mx-auto space-y-24">
          <section className="text-center space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1D254A] border border-blue-500/20">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="text-sm font-medium text-blue-400">LAUNCHES: MAY 5, 2025</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 font-western tracking-wide">
                Steel River Saints
              </h1>
              <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
                Join our community of country music lovers and get exclusive access to behind-the-scenes content
              </p>
            </div>

            <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto">
              <div className="bg-[#0D1021] rounded-xl p-3 border border-white/5">
                <div className="text-2xl font-bold text-white">89</div>
                <div className="text-xs text-white/40 uppercase">Days</div>
              </div>
              <div className="bg-[#0D1021] rounded-xl p-3 border border-white/5">
                <div className="text-2xl font-bold text-white">03</div>
                <div className="text-xs text-white/40 uppercase">Hours</div>
              </div>
              <div className="bg-[#0D1021] rounded-xl p-3 border border-white/5">
                <div className="text-2xl font-bold text-white">51</div>
                <div className="text-xs text-white/40 uppercase">Minutes</div>
              </div>
              <div className="bg-[#0D1021] rounded-xl p-3 border border-white/5">
                <div className="text-2xl font-bold text-white">31</div>
                <div className="text-xs text-white/40 uppercase">Seconds</div>
              </div>
            </div>

            <div className="max-w-sm mx-auto space-y-4">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0D1021] border-white/10 text-white placeholder-white/40 h-12 rounded-xl focus:border-blue-500/50"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-12 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white rounded-xl font-medium transition-all duration-300 hover:from-[#1D4ED8] hover:to-[#2563EB] shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
                onClick={() => setShowModal(true)}
              >
                Join waitlist
              </motion.button>
            </div>
          </section>

          <ChatInterface />
        </div>
      </motion.main>

      <MembershipModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  );
}