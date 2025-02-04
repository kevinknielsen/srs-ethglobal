import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { sampleMessages } from "@/lib/sample-data";

export default function ChatInterface() {
  return (
    <Card className="p-4 bg-gradient-to-br from-[#2C1810]/90 to-[#1A0F0A]/90 backdrop-blur-sm rounded-lg shadow-xl border border-[#F4D03F]/20">
      <h2 className="text-2xl font-bold mb-4 font-western text-[#F4D03F]">Fan Chat</h2>

      <ScrollArea className="h-[400px] mb-4 pr-4">
        <div className="space-y-4">
          {sampleMessages.map((message, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.isUser
                    ? 'bg-[#F4D03F] text-black ml-auto'
                    : 'bg-[#2C1810] text-[#F4D03F] border border-[#F4D03F]/20'
                }`}
              >
                <p className="text-sm font-medium mb-1">
                  {message.isUser ? 'You' : 'Steel River Saints'}
                </p>
                <p>{message.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      <div className="flex space-x-2">
        <Input
          placeholder="Type your message..."
          className="flex-1 bg-[#2C1810] border-[#F4D03F]/20 text-[#F4D03F] placeholder-[#F4D03F]/50"
        />
        <Button className="bg-[#F4D03F] hover:bg-[#D35400] text-black font-bold transition-colors duration-300">
          Send
        </Button>
      </div>
    </Card>
  );
}