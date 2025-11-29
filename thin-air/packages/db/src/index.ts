import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env from root
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

let _db: ReturnType<typeof drizzle> | null = null;

function getDb() {
    if (_db) return _db;

    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        throw new Error('DATABASE_URL is missing');
    }

    const client = postgres(connectionString);
    _db = drizzle(client, { schema });
    return _db;
}

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
    get(target, prop) {
        const dbInstance = getDb();
        return (dbInstance as any)[prop];
    }
});

export * from './schema';
