import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";
import { ZodError } from "zod";

// Project data - Single source of truth
const projectsData = [
  {
    id: 1,
    title: "Steel River Saints",
    description: "A virtual country artist owned by its fans and managed by artificial intelligence",
    fundingGoal: 100000,
    amountRaised: 75000,
    status: "funding",
    coverImage: "/images/artist-banner.png"
  }
];

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

  // Projects route for everyone
  app.get('/api/projects', async (req, res) => {
    try {
      res.json(projectsData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // User's projects route
  app.get('/api/user/projects', async (req, res) => {
    try {
      // For demo purposes, return all projects
      // In production, this would filter based on user ownership
      res.json(projectsData);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Admin route to fetch all projects
  app.get('/api/admin/projects', async (req, res) => {
    try {
      res.json(projectsData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Admin stats route
  app.get('/api/admin/stats', async (req, res) => {
    try {
      // Calculate real statistics from project data
      const stats = {
        totalInvestors: projectsData.reduce((acc: number, project: any) => {
          // Calculate based on average investment of $1500 per investor
          return acc + Math.floor(project.amountRaised / 1500);
        }, 0),
        totalInvested: projectsData.reduce((acc: number, project: any) => acc + project.amountRaised, 0),
        averageReturn: 15, // Set to realistic music industry average
        projectCount: projectsData.length
      };

      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch statistics" });
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

  app.get('/api/projects/:id', async (req, res) => {
    try {
      // Sample project data - will be replaced by database queries
      const projectData = {
        id: parseInt(req.params.id),
        title: "Steel River Saints",
        description: "A virtual country artist owned by its fans and managed by artificial intelligence",
        fundingGoal: 100000,
        amountRaised: 75000,
        status: "funding",
        milestones: [
          {
            id: 1,
            name: "Recording Complete",
            status: "unlocked",
            date: "2024-12-15T00:00:00.000Z"
          },
          {
            id: 2,
            name: "Marketing Campaign",
            status: "pending_approval",
            date: "2025-01-15T00:00:00.000Z"
          },
          {
            id: 3,
            name: "Distribution Setup",
            status: "locked",
            date: "2025-02-01T00:00:00.000Z"
          },
          {
            id: 4,
            name: "Release Event",
            status: "locked",
            date: "2025-03-01T00:00:00.000Z"
          }
        ]
      };

      res.json(projectData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project data" });
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


  const httpServer = createServer(app);
  return httpServer;
}