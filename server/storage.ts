import { 
  users, type User, type InsertUser,
  contactMessages, type ContactMessage, type InsertContactMessage,
  portfolioItems, type PortfolioItem, type InsertPortfolioItem,
  skills, type Skill, type InsertSkill,
  technologies, type Technology, type InsertTechnology,
  siteSettings, type SiteSettings, type InsertSiteSettings,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

// Storage interface for all database operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact message operations
  saveContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  
  // Portfolio operations
  getPortfolioItems(): Promise<PortfolioItem[]>;
  getPortfolioItem(id: number): Promise<PortfolioItem | undefined>;
  createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem>;
  updatePortfolioItem(id: number, item: Partial<InsertPortfolioItem>): Promise<PortfolioItem | undefined>;
  deletePortfolioItem(id: number): Promise<boolean>;
  
  // Skills operations
  getSkills(type?: string): Promise<Skill[]>;
  getSkill(id: number): Promise<Skill | undefined>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined>;
  deleteSkill(id: number): Promise<boolean>;
  
  // Technologies operations
  getTechnologies(): Promise<Technology[]>;
  getTechnology(id: number): Promise<Technology | undefined>;
  createTechnology(tech: InsertTechnology): Promise<Technology>;
  updateTechnology(id: number, tech: Partial<InsertTechnology>): Promise<Technology | undefined>;
  deleteTechnology(id: number): Promise<boolean>;
  
  // Site settings operations
  getSiteSettings(): Promise<SiteSettings | undefined>;
  createOrUpdateSiteSettings(settings: InsertSiteSettings): Promise<SiteSettings>;
  
  // Session store
  sessionStore: session.Store;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;
  
  constructor() {
    const PostgresSessionStore = connectPg(session);
    this.sessionStore = new PostgresSessionStore({ 
      pool,
      createTableIfMissing: true 
    });
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Contact message operations
  async saveContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [savedMessage] = await db.insert(contactMessages).values(message).returning();
    return savedMessage;
  }
  
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(contactMessages.createdAt);
  }
  
  // Portfolio operations
  async getPortfolioItems(): Promise<PortfolioItem[]> {
    return await db.select().from(portfolioItems);
  }
  
  async getPortfolioItem(id: number): Promise<PortfolioItem | undefined> {
    const [item] = await db.select().from(portfolioItems).where(eq(portfolioItems.id, id));
    return item;
  }
  
  async createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem> {
    // Ensure item.links is properly typed for the jsonb column
    const itemToInsert = {
      ...item,
      links: item.links as any
    };
    
    const [newItem] = await db.insert(portfolioItems).values(itemToInsert).returning();
    return newItem;
  }
  
  async updatePortfolioItem(id: number, item: Partial<InsertPortfolioItem>): Promise<PortfolioItem | undefined> {
    // Create update data with properly typed values for jsonb columns
    const updateData: any = { ...item };
    if (item.links) {
      updateData.links = item.links;
    }
    
    const [updatedItem] = await db
      .update(portfolioItems)
      .set(updateData)
      .where(eq(portfolioItems.id, id))
      .returning();
    return updatedItem;
  }
  
  async deletePortfolioItem(id: number): Promise<boolean> {
    const [deletedItem] = await db
      .delete(portfolioItems)
      .where(eq(portfolioItems.id, id))
      .returning();
    return !!deletedItem;
  }
  
  // Skills operations
  async getSkills(type?: string): Promise<Skill[]> {
    if (type) {
      return await db.select().from(skills).where(eq(skills.type, type));
    }
    return await db.select().from(skills);
  }
  
  async getSkill(id: number): Promise<Skill | undefined> {
    const [skill] = await db.select().from(skills).where(eq(skills.id, id));
    return skill;
  }
  
  async createSkill(skill: InsertSkill): Promise<Skill> {
    const [newSkill] = await db.insert(skills).values(skill).returning();
    return newSkill;
  }
  
  async updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined> {
    const [updatedSkill] = await db
      .update(skills)
      .set(skill)
      .where(eq(skills.id, id))
      .returning();
    return updatedSkill;
  }
  
  async deleteSkill(id: number): Promise<boolean> {
    const [deletedSkill] = await db
      .delete(skills)
      .where(eq(skills.id, id))
      .returning();
    return !!deletedSkill;
  }
  
  // Technologies operations
  async getTechnologies(): Promise<Technology[]> {
    return await db.select().from(technologies);
  }
  
  async getTechnology(id: number): Promise<Technology | undefined> {
    const [tech] = await db.select().from(technologies).where(eq(technologies.id, id));
    return tech;
  }
  
  async createTechnology(tech: InsertTechnology): Promise<Technology> {
    const [newTech] = await db.insert(technologies).values(tech).returning();
    return newTech;
  }
  
  async updateTechnology(id: number, tech: Partial<InsertTechnology>): Promise<Technology | undefined> {
    const [updatedTech] = await db
      .update(technologies)
      .set(tech)
      .where(eq(technologies.id, id))
      .returning();
    return updatedTech;
  }
  
  async deleteTechnology(id: number): Promise<boolean> {
    const [deletedTech] = await db
      .delete(technologies)
      .where(eq(technologies.id, id))
      .returning();
    return !!deletedTech;
  }
  
  // Site settings operations
  async getSiteSettings(): Promise<SiteSettings | undefined> {
    const [settings] = await db.select().from(siteSettings);
    return settings;
  }
  
  async createOrUpdateSiteSettings(settings: InsertSiteSettings): Promise<SiteSettings> {
    // First, check if any settings exist
    const existingSettings = await this.getSiteSettings();
    
    if (existingSettings) {
      // Update existing settings
      const [updatedSettings] = await db
        .update(siteSettings)
        .set({ ...settings, updatedAt: new Date() })
        .where(eq(siteSettings.id, existingSettings.id))
        .returning();
      return updatedSettings;
    } else {
      // Create new settings
      const [newSettings] = await db.insert(siteSettings).values(settings).returning();
      return newSettings;
    }
  }
}

// Export database implementation
export const storage = new DatabaseStorage();
