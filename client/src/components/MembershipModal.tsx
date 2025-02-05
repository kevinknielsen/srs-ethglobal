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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20"
          >
            <Card className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-neutral-100">
              <h2 className="text-3xl font-bold mb-6 font-western text-center text-neutral-900">
                Premium Membership
              </h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-center space-x-2 justify-center">
                  <span className="text-3xl font-bold text-neutral-900">$19.99</span>
                  <span className="text-neutral-500">/month</span>
                </div>

                <ul className="space-y-4">
                  <li className="flex items-center text-neutral-700">
                    <span className="mr-3 text-amber-700">✓</span>
                    Exclusive behind-the-scenes content
                  </li>
                  <li className="flex items-center text-neutral-700">
                    <span className="mr-3 text-amber-700">✓</span>
                    Early access to new releases
                  </li>
                  <li className="flex items-center text-neutral-700">
                    <span className="mr-3 text-amber-700">✓</span>
                    Members-only chat access
                  </li>
                  <li className="flex items-center text-neutral-700">
                    <span className="mr-3 text-amber-700">✓</span>
                    Virtual meet & greets
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold transition-colors duration-300"
                  onClick={() => {
                    onClose();
                  }}
                >
                  Join Now
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-neutral-200 text-neutral-700 hover:bg-neutral-50"
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