import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export function registerRoutes(app: Express): Server {
  // Chat endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { message } = req.body;

      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a friendly chat assistant for the Steel River Saints fan community. You're knowledgeable about country music and the band. Keep responses concise and engaging."
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 150
      });

      const response = completion.choices[0].message.content;
      res.json({ response });
    } catch (error) {
      console.error('Chat error:', error);
      res.status(500).json({ 
        error: 'Failed to process chat message',
        details: error.message 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}