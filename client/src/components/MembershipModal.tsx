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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          >
            <Card className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
              <h2 className="text-3xl font-bold mb-4 font-western">
                Premium Membership
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold">$19.99</span>
                  <span className="text-gray-600">/month</span>
                </div>
                
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Exclusive behind-the-scenes content
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Early access to new releases
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Members-only chat access
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Virtual meet & greets
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full bg-[#F4D03F] hover:bg-[#D35400] text-black font-bold"
                  onClick={() => {
                    // Static success for demo
                    onClose();
                  }}
                >
                  Join Now
                </Button>
                <Button 
                  variant="outline"
                  className="w-full"
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
