import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface Message {
  text: string;
  isUser: boolean;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const newMessage: Message = { text: inputText, isUser: true };
    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://autonome.alt.technology/eliza-rwvkai/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic ZWxpemE6clNrdnBmbnRTeQ==",
          },
          body: JSON.stringify({ message: inputText }),
        },
      );

      const data = await response.json();

      setMessages((prev) => [...prev, { text: data.response, isUser: false }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, I couldn't process your request.", isUser: false },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-black/90 backdrop-blur-xl rounded-xl border border-white/10">
      <h2 className="text-2xl font-bold mb-6 font-western bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
        Fan Chat
      </h2>

      <ScrollArea className="h-[400px] mb-6 pr-4">
        <div className="space-y-4">
          {messages.map((message, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg ${
                  message.isUser
                    ? "bg-blue-500/90 text-white ml-auto shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                    : "bg-white/5 text-white/90 border border-white/10"
                }`}
              >
                <p className="text-sm font-medium mb-1 opacity-60">
                  {message.isUser ? "You" : "Steel River Saints"}
                </p>
                <p>{message.text}</p>
              </div>
            </motion.div>
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <div className="flex space-x-3">
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          disabled={isLoading}
          className="flex-1 bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-blue-500/50"
        />
        <Button
          onClick={sendMessage}
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium transition-all duration-300 hover:from-blue-600 hover:to-blue-700 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
        >
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </div>
    </Card>
  );
}
