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
      // For demo purposes, using a hardcoded user ID
      // In production, this would come from the authenticated session
      const userId = 1;

      // Get all investments for the user
      const investments = await storage.getInvestmentsByUser(userId);

      // Calculate totals
      const totalInvested = investments.reduce((sum, inv) => sum + Number(inv.amount), 0);
      const expectedReturns = totalInvested * 1.4; // Example ROI calculation
      const pendingPayouts = totalInvested * 0.2; // Example pending payout calculation

      // Get project details for active investments
      const activeInvestments = await Promise.all(
        investments.map(async (investment) => {
          const project = await storage.getProject(investment.projectId);
          if (!project) return null;

          const fundingProgress = (Number(project.amountRaised) / Number(project.fundingGoal)) * 100;

          // Get next milestone
          const milestones = await storage.getMilestonesByProject(project.id);
          const nextMilestone = milestones.find(m => m.status === 'locked')?.createdAt || project.releaseDate || new Date();

          return {
            id: investment.id,
            projectName: project.title,
            coverImage: `/images/srs-${investment.id}.jpg`, // This would come from project metadata in production
            fundingProgress,
            nextMilestone: nextMilestone.toISOString()
          };
        })
      );

      res.json({
        totalInvested,
        expectedReturns,
        pendingPayouts,
        activeInvestments: activeInvestments.filter(Boolean)
      });
    } catch (error) {
      console.error('Failed to fetch investment data:', error);
      res.status(500).json({ message: "Failed to fetch investment data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}