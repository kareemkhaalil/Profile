import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form API endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      // Validate request body
      const validatedData = contactSchema.parse(req.body);
      
      // In a real app, you might want to save this to a database or send an email
      // For now, we'll just log it and return success
      const result = await storage.saveContactMessage(validatedData);
      
      res.status(200).json({ message: "Message received successfully", id: result.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation failed", errors: error.errors });
      }
      
      console.error('Contact form error:', error);
      res.status(500).json({ message: "Failed to process your message" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
