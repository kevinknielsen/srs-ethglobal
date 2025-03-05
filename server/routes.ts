import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";
import { ZodError } from "zod";

export function registerRoutes(app: Express): Server {
  // User routes
  app.post('/api/users', async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json(user);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid user data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create user" });
      }
    }
  });

  app.get('/api/users/:id', async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  // Investment routes
  app.get('/api/user/investments', async (req, res) => {
    try {
      // For demo purposes, using Steel River Saints as our sample investment
      const sampleInvestment = {
        totalInvested: 25000,
        expectedReturns: 35000,
        pendingPayouts: 5000,
        activeInvestments: [
          {
            id: 1,
            projectName: "Steel River Saints",
            coverImage: "/images/srs-1.jpg",
            fundingProgress: 75,
            nextMilestone: "2025-04-01T00:00:00.000Z"
          }
        ]
      };

      res.json(sampleInvestment);
    } catch (error) {
      console.error('Failed to fetch investment data:', error);
      res.status(500).json({ message: "Failed to fetch investment data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}