import { users, type User, type InsertUser } from "@shared/schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByPrivyId(privyUserId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserWallets(id: number, walletAddresses: string[]): Promise<User>;
}

export class DBStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByPrivyId(privyUserId: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.privyUserId, privyUserId));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async updateUserWallets(id: number, walletAddresses: string[]): Promise<User> {
    const result = await db
      .update(users)
      .set({ walletAddresses })
      .where(eq(users.id, id))
      .returning();
    return result[0];
  }
}

export const storage = new DBStorage();