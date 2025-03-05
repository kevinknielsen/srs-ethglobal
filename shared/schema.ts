import { pgTable, text, serial, timestamp, numeric, foreignKey, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Enhanced user schema with wallet address
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  walletAddress: varchar("wallet_address", { length: 42 }).notNull().unique(),
  email: text("email").notNull(),
  username: varchar("username", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
  investments: many(investments)
}));

// Projects table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  artistId: serial("artist_id").references(() => users.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  fundingGoal: numeric("funding_goal").notNull(),
  amountRaised: numeric("amount_raised").default("0"),
  releaseDate: timestamp("release_date"),
  status: varchar("status", { length: 50 }).notNull().default("funding"),
  onchainReference: varchar("onchain_reference", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const projectsRelations = relations(projects, ({ one, many }) => ({
  artist: one(users, {
    fields: [projects.artistId],
    references: [users.id],
  }),
  investments: many(investments),
  milestones: many(milestones)
}));

// Investments table
export const investments = pgTable("investments", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").references(() => users.id),
  projectId: serial("project_id").references(() => projects.id),
  amount: numeric("amount").notNull(),
  tokenizedShares: numeric("tokenized_shares"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const investmentsRelations = relations(investments, ({ one }) => ({
  user: one(users, {
    fields: [investments.userId],
    references: [users.id],
  }),
  project: one(projects, {
    fields: [investments.projectId],
    references: [projects.id],
  }),
}));

// Milestones table
export const milestones = pgTable("milestones", {
  id: serial("id").primaryKey(),
  projectId: serial("project_id").references(() => projects.id),
  name: varchar("name", { length: 255 }).notNull(),
  payoutAmount: numeric("payout_amount"),
  status: varchar("status", { length: 50 }).notNull().default("locked"),
  proofSubmission: text("proof_submission"),
  onchainReference: varchar("onchain_reference", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const milestonesRelations = relations(milestones, ({ one }) => ({
  project: one(projects, {
    fields: [milestones.projectId],
    references: [projects.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  amountRaised: true,
  onchainReference: true,
  createdAt: true,
  updatedAt: true,
});

export const insertInvestmentSchema = createInsertSchema(investments).omit({
  id: true,
  tokenizedShares: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMilestoneSchema = createInsertSchema(milestones).omit({
  id: true,
  onchainReference: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertInvestment = z.infer<typeof insertInvestmentSchema>;
export type Investment = typeof investments.$inferSelect;

export type InsertMilestone = z.infer<typeof insertMilestoneSchema>;
export type Milestone = typeof milestones.$inferSelect;