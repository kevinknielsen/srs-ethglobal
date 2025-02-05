import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MembershipModal({ isOpen, onClose }: MembershipModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          >
            <Card className="w-full max-w-md p-8 bg-black/90 backdrop-blur-xl rounded-xl border border-white/10">
              <h2 className="text-3xl font-bold mb-6 font-western text-center bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
                Premium Membership
              </h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-center space-x-2 justify-center">
                  <span className="text-3xl font-bold text-white">$19.99</span>
                  <span className="text-white/60">/month</span>
                </div>

                <ul className="space-y-4">
                  <li className="flex items-center text-white/80">
                    <span className="mr-3 text-blue-400">✓</span>
                    Exclusive behind-the-scenes content
                  </li>
                  <li className="flex items-center text-white/80">
                    <span className="mr-3 text-blue-400">✓</span>
                    Early access to new releases
                  </li>
                  <li className="flex items-center text-white/80">
                    <span className="mr-3 text-blue-400">✓</span>
                    Members-only chat access
                  </li>
                  <li className="flex items-center text-white/80">
                    <span className="mr-3 text-blue-400">✓</span>
                    Virtual meet & greets
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium transition-all duration-300 hover:from-blue-600 hover:to-blue-700 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                  onClick={() => {
                    onClose();
                  }}
                >
                  Purchase Membership
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-white/10 text-white/80 hover:bg-white/5"
                  onClick={onClose}
                >
                  Maybe Later
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  );
}