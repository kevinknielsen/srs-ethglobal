import { users, projects, investments, milestones } from "@shared/schema";
import type { 
  User, InsertUser, 
  Project, InsertProject,
  Investment, InsertInvestment,
  Milestone, InsertMilestone 
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Project operations
  getProject(id: number): Promise<Project | undefined>;
  getProjectsByArtist(artistId: number): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;

  // Investment operations
  getInvestment(id: number): Promise<Investment | undefined>;
  getInvestmentsByUser(userId: number): Promise<Investment[]>;
  getInvestmentsByProject(projectId: number): Promise<Investment[]>;
  createInvestment(investment: InsertInvestment): Promise<Investment>;

  // Milestone operations
  getMilestone(id: number): Promise<Milestone | undefined>;
  getMilestonesByProject(projectId: number): Promise<Milestone[]>;
  createMilestone(milestone: InsertMilestone): Promise<Milestone>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        username: insertUser.username ?? null // Handle optional username field
      })
      .returning();
    return user;
  }

  // Project operations
  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async getProjectsByArtist(artistId: number): Promise<Project[]> {
    return db.select().from(projects).where(eq(projects.artistId, artistId));
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db
      .insert(projects)
      .values(project)
      .returning();
    return newProject;
  }

  // Investment operations
  async getInvestment(id: number): Promise<Investment | undefined> {
    const [investment] = await db
      .select()
      .from(investments)
      .where(eq(investments.id, id));
    return investment;
  }

  async getInvestmentsByUser(userId: number): Promise<Investment[]> {
    return db
      .select()
      .from(investments)
      .where(eq(investments.userId, userId));
  }

  async getInvestmentsByProject(projectId: number): Promise<Investment[]> {
    return db
      .select()
      .from(investments)
      .where(eq(investments.projectId, projectId));
  }

  async createInvestment(investment: InsertInvestment): Promise<Investment> {
    const [newInvestment] = await db
      .insert(investments)
      .values(investment)
      .returning();
    return newInvestment;
  }

  // Milestone operations
  async getMilestone(id: number): Promise<Milestone | undefined> {
    const [milestone] = await db
      .select()
      .from(milestones)
      .where(eq(milestones.id, id));
    return milestone;
  }

  async getMilestonesByProject(projectId: number): Promise<Milestone[]> {
    return db
      .select()
      .from(milestones)
      .where(eq(milestones.projectId, projectId));
  }

  async createMilestone(milestone: InsertMilestone): Promise<Milestone> {
    const [newMilestone] = await db
      .insert(milestones)
      .values(milestone)
      .returning();
    return newMilestone;
  }
}

export const storage = new DatabaseStorage();