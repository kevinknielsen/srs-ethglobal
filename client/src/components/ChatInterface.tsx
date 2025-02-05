import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { sampleMessages } from "@/lib/sample-data";

export default function ChatInterface() {
  return (
    <Card className="p-6 bg-white rounded-lg shadow-lg border border-neutral-100">
      <h2 className="text-2xl font-bold mb-6 font-western text-neutral-900">Fan Chat</h2>

      <ScrollArea className="h-[400px] mb-6 pr-4">
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
                className={`max-w-[80%] p-4 rounded-lg ${
                  message.isUser
                    ? 'bg-amber-700 text-white ml-auto'
                    : 'bg-neutral-50 text-neutral-800 border border-neutral-200'
                }`}
              >
                <p className="text-sm font-medium mb-1 opacity-80">
                  {message.isUser ? 'You' : 'Steel River Saints'}
                </p>
                <p>{message.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      <div className="flex space-x-3">
        <Input
          placeholder="Type your message..."
          className="flex-1 border-neutral-200 placeholder-neutral-400 focus:border-amber-700"
        />
        <Button className="bg-amber-700 hover:bg-amber-800 text-white font-bold transition-colors duration-300">
          Send
        </Button>
      </div>
    </Card>
  );
}