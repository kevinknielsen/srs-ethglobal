import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import MembershipModal from "@/components/MembershipModal";
import ChatInterface from "@/components/ChatInterface";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4D03F] to-[#D35400]">
      <Navbar onJoinClick={() => setShowModal(true)} />
      
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="max-w-4xl mx-auto space-y-12">
          <section className="text-center space-y-6">
            <h1 className="text-6xl font-bold text-white font-western">
              Steel River Saints
            </h1>
            <p className="text-xl text-white/90">
              Join our community of country music lovers and get exclusive access to behind-the-scenes content
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-black/80 text-white rounded-lg font-bold hover:bg-black/90 transition-colors"
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
