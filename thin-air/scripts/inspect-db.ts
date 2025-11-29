import 'dotenv/config';
import postgres from 'postgres';

async function inspectSchema() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) throw new Error('DATABASE_URL is not defined');

    const sql = postgres(connectionString, { ssl: 'require' });

    try {
        const columns = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'users';
        `;
        console.log('Users table columns:', columns);
    } catch (error) {
        console.error('Inspection failed:', error);
    } finally {
        await sql.end();
    }
}

inspectSchema();
