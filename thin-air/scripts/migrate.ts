import 'dotenv/config';
import postgres from 'postgres';
import fs from 'fs';
import path from 'path';

async function runMigration() {
    console.log('🔌 Connecting to database...');
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        throw new Error('DATABASE_URL is not defined');
    }

    const sql = postgres(connectionString, { ssl: 'require' });

    try {
        console.log('📖 Reading migration file...');
        const migrationPath = path.join(process.cwd(), 'packages/db/drizzle/0001_thick_iron_monger.sql');
        const migrationSql = fs.readFileSync(migrationPath, 'utf-8');

        console.log('🚀 Executing migration...');
        // Split by statement breakpoint if needed, but postgres.js might handle it
        // The file uses --> statement-breakpoint as separator
        const statements = migrationSql.split('--> statement-breakpoint');

        for (const statement of statements) {
            const trimmed = statement.trim();
            if (trimmed) {
                await sql.unsafe(trimmed);
            }
        }

        console.log('✅ Migration completed successfully!');
    } catch (error) {
        console.error('❌ Migration failed:', error);
    } finally {
        await sql.end();
    }
}

runMigration();
