import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  contactSchema, 
  portfolioItemSchema, 
  skillSchema, 
  technologySchema,
  siteSettingsSchema
} from "@shared/schema";
import { z } from "zod";
import { setupAuth } from "./auth";

// Middleware to require authentication
const requireAuth = (req: Request, res: Response, next: Function) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);
  
  // Contact form API endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      // Validate request body
      const validatedData = contactSchema.parse(req.body);
      
      // Save the contact message to the database
      const result = await storage.saveContactMessage(validatedData);

      // Send email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_APP_PASSWORD
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'karem2003.kk@gmail.com', // Your email
        subject: `New Contact Form Submission: ${validatedData.subject}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          <p><strong>Message:</strong> ${validatedData.message}</p>
        `
      };

      await transporter.sendMail(mailOptions);
      
      res.status(200).json({ message: "Message received successfully", id: result.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation failed", errors: error.errors });
      }
      
      console.error('Contact form error:', error);
      res.status(500).json({ message: "Failed to process your message" });
    }
  });
  
  // Get all contact messages (requires auth)
  app.get('/api/contact-messages', requireAuth, async (req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      res.status(500).json({ message: "Failed to fetch contact messages" });
    }
  });
  
  // Portfolio items CRUD
  
  // Get all portfolio items
  app.get('/api/portfolio', async (req, res) => {
    try {
      const items = await storage.getPortfolioItems();
      res.status(200).json(items);
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
      res.status(500).json({ message: "Failed to fetch portfolio items" });
    }
  });
  
  // Get single portfolio item
  app.get('/api/portfolio/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const item = await storage.getPortfolioItem(id);
      
      if (!item) {
        return res.status(404).json({ message: "Portfolio item not found" });
      }
      
      res.status(200).json(item);
    } catch (error) {
      console.error('Error fetching portfolio item:', error);
      res.status(500).json({ message: "Failed to fetch portfolio item" });
    }
  });
  
  // Create portfolio item (requires auth)
  app.post('/api/portfolio', requireAuth, async (req, res) => {
    try {
      const validatedData = portfolioItemSchema.parse(req.body);
      const newItem = await storage.createPortfolioItem(validatedData);
      res.status(201).json(newItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation failed", errors: error.errors });
      }
      
      console.error('Error creating portfolio item:', error);
      res.status(500).json({ message: "Failed to create portfolio item" });
    }
  });
  
  // Update portfolio item (requires auth)
  app.put('/api/portfolio/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = portfolioItemSchema.partial().parse(req.body);
      
      const updatedItem = await storage.updatePortfolioItem(id, validatedData);
      
      if (!updatedItem) {
        return res.status(404).json({ message: "Portfolio item not found" });
      }
      
      res.status(200).json(updatedItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation failed", errors: error.errors });
      }
      
      console.error('Error updating portfolio item:', error);
      res.status(500).json({ message: "Failed to update portfolio item" });
    }
  });
  
  // Delete portfolio item (requires auth)
  app.delete('/api/portfolio/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deletePortfolioItem(id);
      
      if (!success) {
        return res.status(404).json({ message: "Portfolio item not found" });
      }
      
      res.status(200).json({ message: "Portfolio item deleted successfully" });
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
      res.status(500).json({ message: "Failed to delete portfolio item" });
    }
  });
  
  // Skills CRUD
  
  // Get all skills (with optional type filter)
  app.get('/api/skills', async (req, res) => {
    try {
      const type = req.query.type as string | undefined;
      const skills = await storage.getSkills(type);
      res.status(200).json(skills);
    } catch (error) {
      console.error('Error fetching skills:', error);
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });
  
  // Create skill (requires auth)
  app.post('/api/skills', requireAuth, async (req, res) => {
    try {
      const validatedData = skillSchema.parse(req.body);
      const newSkill = await storage.createSkill(validatedData);
      res.status(201).json(newSkill);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation failed", errors: error.errors });
      }
      
      console.error('Error creating skill:', error);
      res.status(500).json({ message: "Failed to create skill" });
    }
  });
  
  // Update skill (requires auth)
  app.put('/api/skills/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = skillSchema.partial().parse(req.body);
      
      const updatedSkill = await storage.updateSkill(id, validatedData);
      
      if (!updatedSkill) {
        return res.status(404).json({ message: "Skill not found" });
      }
      
      res.status(200).json(updatedSkill);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation failed", errors: error.errors });
      }
      
      console.error('Error updating skill:', error);
      res.status(500).json({ message: "Failed to update skill" });
    }
  });
  
  // Delete skill (requires auth)
  app.delete('/api/skills/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteSkill(id);
      
      if (!success) {
        return res.status(404).json({ message: "Skill not found" });
      }
      
      res.status(200).json({ message: "Skill deleted successfully" });
    } catch (error) {
      console.error('Error deleting skill:', error);
      res.status(500).json({ message: "Failed to delete skill" });
    }
  });
  
  // Technologies CRUD
  
  // Get all technologies
  app.get('/api/technologies', async (req, res) => {
    try {
      const techs = await storage.getTechnologies();
      res.status(200).json(techs);
    } catch (error) {
      console.error('Error fetching technologies:', error);
      res.status(500).json({ message: "Failed to fetch technologies" });
    }
  });
  
  // Create technology (requires auth)
  app.post('/api/technologies', requireAuth, async (req, res) => {
    try {
      const validatedData = technologySchema.parse(req.body);
      const newTech = await storage.createTechnology(validatedData);
      res.status(201).json(newTech);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation failed", errors: error.errors });
      }
      
      console.error('Error creating technology:', error);
      res.status(500).json({ message: "Failed to create technology" });
    }
  });
  
  // Update technology (requires auth)
  app.put('/api/technologies/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = technologySchema.partial().parse(req.body);
      
      const updatedTech = await storage.updateTechnology(id, validatedData);
      
      if (!updatedTech) {
        return res.status(404).json({ message: "Technology not found" });
      }
      
      res.status(200).json(updatedTech);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation failed", errors: error.errors });
      }
      
      console.error('Error updating technology:', error);
      res.status(500).json({ message: "Failed to update technology" });
    }
  });
  
  // Delete technology (requires auth)
  app.delete('/api/technologies/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteTechnology(id);
      
      if (!success) {
        return res.status(404).json({ message: "Technology not found" });
      }
      
      res.status(200).json({ message: "Technology deleted successfully" });
    } catch (error) {
      console.error('Error deleting technology:', error);
      res.status(500).json({ message: "Failed to delete technology" });
    }
  });
  
  // Site Settings
  
  // Get site settings
  app.get('/api/site-settings', async (req, res) => {
    try {
      const settings = await storage.getSiteSettings();
      
      if (!settings) {
        return res.status(404).json({ message: "Site settings not found" });
      }
      
      res.status(200).json(settings);
    } catch (error) {
      console.error('Error fetching site settings:', error);
      res.status(500).json({ message: "Failed to fetch site settings" });
    }
  });
  
  // Update site settings (requires auth)
  app.post('/api/site-settings', requireAuth, async (req, res) => {
    try {
      const validatedData = siteSettingsSchema.parse(req.body);
      const settings = await storage.createOrUpdateSiteSettings(validatedData);
      res.status(200).json(settings);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation failed", errors: error.errors });
      }
      
      console.error('Error updating site settings:', error);
      res.status(500).json({ message: "Failed to update site settings" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
