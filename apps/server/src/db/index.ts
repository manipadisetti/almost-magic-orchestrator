import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Use DATABASE_URL environment variable for connection
const connectionString = process.env.DATABASE_URL || 
  `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

// For query purposes
const queryClient = postgres(connectionString);
export const db = drizzle(queryClient, { schema });
