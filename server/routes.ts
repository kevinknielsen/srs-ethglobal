import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export function registerRoutes(app: Express): Server {
  // NFTs endpoint
  app.get('/api/nfts', async (req, res) => {
    try {
      // Mock NFT data for now
      const nfts = [
        { id: 1, name: 'Steel River Saints #1', owner: '0x123...'},
        { id: 2, name: 'Steel River Saints #2', owner: '0x456...'}
      ];
      res.json(nfts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch NFTs' });
    }
  });

  // Tokens endpoint
  app.get('/api/tokens', async (req, res) => {
    try {
      // Mock token data for now
      const tokens = [
        { symbol: 'SRS', balance: '1000', value: '0.5' }
      ];
      res.json(tokens);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tokens' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
