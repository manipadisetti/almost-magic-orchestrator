import { Client } from 'pg';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env from root
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

async function testConnection() {
    console.log("Testing connection to:", process.env.DATABASE_URL?.replace(/:[^:]*@/, ':****@')); // Mask password

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();
        console.log("✅ Successfully connected to PostgreSQL!");
        const res = await client.query('SELECT NOW()');
        console.log("🕒 Database Time:", res.rows[0].now);
        await client.end();
        process.exit(0);
    } catch (err) {
        console.error("❌ Connection failed:", err);
        process.exit(1);
    }
}

testConnection();
