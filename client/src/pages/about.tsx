import { motion } from "framer-motion";
import { Header } from "@/components/Header";

export default function About() {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-16"
      >
        <section className="max-w-4xl mx-auto space-y-16">
          {/* About Section */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              A New Age Artist-Centric Label
            </h1>
            <div className="prose prose-invert mx-auto">
              <p className="text-lg text-white/70 leading-relaxed">
                The convergence of decentralized finance (DeFi) and tokenized royalty streams (RTs) presents a paradigm shift in music industry financing. Built on the Original Works protocol, our platform ensures that artists retain complete control over their music rights forever.
              </p>
              <p className="text-lg text-white/70 leading-relaxed">
                By transforming royalties into liquid assets, artists can access upfront capital, establish revolving credit lines tied to real-time earnings, and engage fans as direct stakeholders in their success.
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-4">Production Capital</h3>
                <p className="text-white/70">
                  Before release, artists raise funds by pre-selling Royalty Token Futures. Funds are distributed in milestones—recording, mixing, and marketing—ensuring capital is used efficiently.
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-4">Revolving Credit</h3>
                <p className="text-white/70">
                  Once live, RTs convert streaming royalties into on-chain assets tradable via Original Works. Artists can borrow against future earnings through DeFi credit lines.
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-4">Services Marketplace</h3>
                <p className="text-white/70">
                  Artists choose how to spend their funding through our curated marketplace for marketing, PR, playlisting, and touring—without label lock-ins or hidden fees.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white/5 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-2">How does Coda differ from traditional labels?</h3>
                <p className="text-white/70">
                  Unlike traditional labels that own artists' catalogs, Coda is a financial backbone, not a gatekeeper. Artists keep 100% of their master rights, while Coda earns revenue from transaction fees, DeFi lending spreads, and SaaS partnerships.
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-2">What services does Coda provide?</h3>
                <p className="text-white/70">
                  Coda provides crowdfunding through Royalty Token Futures, real-time liquidity through DeFi credit lines, and access to a curated marketplace for marketing, PR, playlisting, and touring services.
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-2">How do artists maintain control?</h3>
                <p className="text-white/70">
                  Artists keep 100% of their master rights and have complete control over how to allocate their funding. They can choose which services to use and when, without being locked into traditional label contracts.
                </p>
              </div>
            </div>
          </div>
        </section>
      </motion.main>
    </div>
  );
}