import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import MembershipModal from "@/components/MembershipModal";
import ChatInterface from "@/components/ChatInterface";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

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
            <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm mb-8">
              LAUNCHES: MAY 5, 2025
            </div>
            <h1 className="text-7xl font-bold text-white font-western tracking-wide bg-clip-text bg-gradient-to-b from-white to-white/60">
              Steel River Saints
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Join our community of country music lovers and get exclusive access to behind-the-scenes content
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
              onClick={() => setShowModal(true)}
            >
              Become a Member
            </motion.button>
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