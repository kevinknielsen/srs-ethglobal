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

  app.get('/api/users/privy/:privyUserId', async (req, res) => {
    try {
      const user = await storage.getUserByPrivyId(req.params.privyUserId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  app.patch('/api/users/:id/wallets', async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const { walletAddresses } = req.body;

      if (!Array.isArray(walletAddresses)) {
        res.status(400).json({ message: "walletAddresses must be an array" });
        return;
      }

      const user = await storage.updateUserWallets(userId, walletAddresses);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user wallets" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}