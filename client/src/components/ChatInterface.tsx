import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { sampleMessages } from "@/lib/sample-data";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface Message {
  text: string;
  isUser: boolean;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    setError(null);

    try {
      // Check each environment variable individually for better error messages
      if (!import.meta.env.VITE_CHATBOT_API_URL) {
        throw new Error("Chat API URL is not configured");
      }
      if (!import.meta.env.VITE_CHATBOT_USERNAME) {
        throw new Error("Chat username is not configured");
      }
      if (!import.meta.env.VITE_CHATBOT_PASSWORD) {
        throw new Error("Chat password is not configured");
      }

      const credentials = btoa(`${import.meta.env.VITE_CHATBOT_USERNAME}:${import.meta.env.VITE_CHATBOT_PASSWORD}`);

      const response = await fetch(import.meta.env.VITE_CHATBOT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${credentials}`,
          "Accept": "application/json, text/plain, */*",
          "Accept-Language": "en-US,en;q=0.9",
        },
        body: JSON.stringify({ message: inputText })
      });

      if (!response.ok) {
        if (response.status === 503) {
          throw new Error("The chat service is temporarily unavailable. Please try again in a few moments.");
        }
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      if (!data.response) {
        throw new Error('Invalid response format from server');
      }

      setMessages((prev) => [...prev, { text: data.response, isUser: false }]);
    } catch (err) {
      console.error("Error sending message:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to send message. Please try again.";
      setError(errorMessage);
      setMessages((prev) => prev.slice(0, -1)); // Remove the user message if it failed
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-black/90 backdrop-blur-xl rounded-xl border border-white/10">
      <h2 className="text-2xl font-bold mb-6 font-western bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
        Fan Chat
      </h2>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

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
          onKeyPress={(e) => e.key === "Enter" && !isLoading && sendMessage()}
          placeholder="Type your message..."
          disabled={isLoading}
          className="flex-1 bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-blue-500/50"
        />
        <Button
          onClick={sendMessage}
          disabled={isLoading}
          className="min-w-[100px] bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium transition-all duration-300 hover:from-blue-600 hover:to-blue-700 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Sending...</span>
            </div>
          ) : (
            "Send"
          )}
        </Button>
      </div>
    </Card>
  );
}