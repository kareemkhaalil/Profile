import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Portfolio items
export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
  links: jsonb("links").notNull().$type<{
    preview?: string;
    github?: string;
    appStore?: string;
    playStore?: string;
  }>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const portfolioItemSchema = createInsertSchema(portfolioItems).pick({
  title: true,
  description: true,
  image: true,
  category: true,
  links: true,
});

export type PortfolioItem = typeof portfolioItems.$inferSelect;
export type InsertPortfolioItem = z.infer<typeof portfolioItemSchema>;

// Skills
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  percentage: integer("percentage").notNull(),
  type: text("type").notNull(), // 'technical' or 'soft'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const skillSchema = createInsertSchema(skills).pick({
  name: true,
  percentage: true,
  type: true,
});

export type Skill = typeof skills.$inferSelect;
export type InsertSkill = z.infer<typeof skillSchema>;

// Technologies
export const technologies = pgTable("technologies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const technologySchema = createInsertSchema(technologies).pick({
  name: true,
  icon: true,
});

export type Technology = typeof technologies.$inferSelect;
export type InsertTechnology = z.infer<typeof technologySchema>;

// Contact message schema
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof contactSchema>;

// Site settings
export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  siteTitle: text("site_title").notNull(),
  siteDescription: text("site_description").notNull(),
  primaryColor: text("primary_color").notNull(),
  socialLinks: jsonb("social_links").notNull().$type<{
    github?: string;
    linkedin?: string;
    twitter?: string;
  }>(),
  contactInfo: jsonb("contact_info").notNull().$type<{
    email?: string;
    phone?: string;
    location?: string;
  }>(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const siteSettingsSchema = createInsertSchema(siteSettings).pick({
  siteTitle: true,
  siteDescription: true,
  primaryColor: true,
  socialLinks: true,
  contactInfo: true,
});

export type SiteSettings = typeof siteSettings.$inferSelect;
export type InsertSiteSettings = z.infer<typeof siteSettingsSchema>;
