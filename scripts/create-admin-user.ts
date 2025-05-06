import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { db } from "../server/db";
import { users } from "../shared/schema";
import { eq } from "drizzle-orm";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function createAdminUser() {
  try {
    console.log("Checking if admin user exists...");
    const [existingAdmin] = await db.select().from(users).where(eq(users.username, "admin"));
    
    if (existingAdmin) {
      console.log("Admin user already exists.");
      return;
    }
    
    console.log("Creating admin user...");
    const hashedPassword = await hashPassword("admin123");
    
    await db.insert(users).values({
      username: "admin",
      password: hashedPassword,
    });
    
    console.log("Admin user created successfully!");
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    process.exit();
  }
}

createAdminUser();