import { db } from '../src';
import { projects, users } from '../src/schema';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const DEMO_USER_ID = "11111111-1111-1111-1111-111111111111";
const DEMO_PROJECT_ID = "00000000-0000-0000-0000-000000000000";

async function seed() {
    console.log("🌱 Seeding database...");

    try {
        // 1. Create User
        console.log("Creating Demo User...");
        await db.insert(users).values({
            id: DEMO_USER_ID,
            name: "Demo User",
            email: "demo@thinair.ai",
            role: "user",
        }).onConflictDoNothing();

        // 2. Create Project
        console.log("Creating Demo Project...");
        await db.insert(projects).values({
            id: DEMO_PROJECT_ID,
            name: "Demo Project",
            description: "A temporary project for testing Vapor module.",
            userId: DEMO_USER_ID,
        }).onConflictDoNothing();

        console.log("✅ Seed complete!");
        process.exit(0);
    } catch (e) {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    }
}

seed();
