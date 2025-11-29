import postgres from 'postgres';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env from root
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error("❌ DATABASE_URL is missing in .env");
    process.exit(1);
}

console.log(`🔌 Connecting to: ${connectionString.replace(/:[^:]*@/, ':****@')}`);

const sql = postgres(connectionString, { ssl: 'require' });

async function test() {
    try {
        const result = await sql`SELECT NOW()`;
        console.log("✅ NEON DB CONNECTED SUCCESSFULLY!");
        console.log("🕒 Server Time:", result[0].now);
        process.exit(0);
    } catch (e) {
        console.error("❌ CONNECTION FAILED:", e);
        process.exit(1);
    }
}

test();
