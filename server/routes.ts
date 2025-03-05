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

  // Project routes
  app.get('/api/projects', async (req, res) => {
    try {
      // For demo purposes, returning sample projects
      // In future, this will be fetched from database based on admin dashboard input
      const sampleProjects = [
        {
          id: 1,
          title: "Steel River Saints",
          description: "A virtual country artist owned by its fans and managed by artificial intelligence",
          coverImage: "/images/artist-banner.png",
          fundingProgress: 75,
          fundingGoal: 100000,
          amountRaised: 75000,
          releaseDate: "2025-03-01T00:00:00.000Z",
          status: "active"
        }
      ];

      res.json(sampleProjects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Latest releases route
  app.get('/api/releases/latest', async (req, res) => {
    try {
      // Sample latest release data - will be replaced by admin dashboard data
      const latestRelease = {
        id: 1,
        title: "Steel River Saints",
        description: "A virtual country artist owned by its fans and managed by artificial intelligence",
        coverImage: "/images/artist-banner.png",
        fundingProgress: 75,
        fundingGoal: 100000,
        releaseDate: "2025-03-01T00:00:00.000Z"
      };

      res.json(latestRelease);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch latest release" });
    }
  });

  // Specific release route
  app.get('/api/releases/:id', async (req, res) => {
    try {
      // Sample detailed release data - will be replaced by admin dashboard data
      const release = {
        id: 1,
        title: "Steel River Saints",
        tagline: "The Future of Country Music",
        description: "A virtual country artist owned by its fans and managed by artificial intelligence",
        coverImage: "/images/artist-banner.png",
        fundingProgress: 75,
        fundingGoal: 100000,
        amountRaised: 75000,
        releaseDate: "2025-03-01T00:00:00.000Z",
        status: "active",
        tracks: [
          {
            id: 1,
            title: "The Bottle",
            duration: "3:45",
            previewUrl: "/audio/srs-preview-1.mp3",
            isPreview: true
          },
          {
            id: 2,
            title: "Neon Dreams",
            duration: "4:12",
            previewUrl: "/audio/srs-preview-2.mp3",
            isPreview: true
          }
        ],
        milestones: [
          {
            id: 1,
            name: "Recording Complete",
            status: "completed",
            date: "2024-12-15T00:00:00.000Z"
          },
          {
            id: 2,
            name: "Marketing Campaign",
            status: "in_progress",
            date: "2025-01-15T00:00:00.000Z"
          },
          {
            id: 3,
            name: "Official Release",
            status: "upcoming",
            date: "2025-03-01T00:00:00.000Z"
          }
        ],
        revenueSharing: {
          fans: 70,
          platform: 10,
          artist: 20
        }
      };

      res.json(release);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch release details" });
    }
  });

  // Stats route
  app.get('/api/stats', async (req, res) => {
    try {
      // Sample statistics data
      const stats = {
        totalInvestors: 1500,
        totalInvested: 2500000,
        averageReturn: 40,
        projectCount: 25,
        monthlyData: [
          { month: 'Jan', invested: 150000 },
          { month: 'Feb', invested: 200000 },
          { month: 'Mar', invested: 300000 }
        ]
      };

      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });


  app.get('/api/artist/project', async (req, res) => {
    try {
      // Sample project data - will be replaced by database queries
      const projectData = {
        id: 1,
        title: "Steel River Saints",
        description: "A virtual country artist owned by its fans and managed by artificial intelligence",
        fundingGoal: 100000,
        amountRaised: 75000,
        status: "funding",
        milestones: [
          {
            id: 1,
            name: "Recording Complete",
            status: "unlocked"
          },
          {
            id: 2,
            name: "Marketing Campaign",
            status: "pending_approval"
          },
          {
            id: 3,
            name: "Distribution Setup",
            status: "locked"
          },
          {
            id: 4,
            name: "Release Event",
            status: "locked"
          }
        ]
      };

      res.json(projectData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}