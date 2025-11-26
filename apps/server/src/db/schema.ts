import { pgTable, serial, text, timestamp, jsonb, varchar } from 'drizzle-orm/pg-core';

export const thinairProjects = pgTable('thinair_projects', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  status: text('status').notNull().default('vapor'),
  intentJson: jsonb('intent_json'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  userId: text('user_id').notNull(),
});

export const thinairInputs = pgTable('thinair_inputs', {
  id: serial('id').primaryKey(),
  projectId: serial('project_id').references(() => thinairProjects.id),
  type: text('type').notNull(), // 'text', 'voice', 'image', 'pdf'
  content: text('content'),
  filePath: text('file_path'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const thinairArtifacts = pgTable('thinair_artifacts', {
  id: serial('id').primaryKey(),
  projectId: serial('project_id').references(() => thinairProjects.id),
  name: text('name').notNull(),
  type: text('type').notNull(), // 'code', 'asset', 'config'
  path: text('path').notNull(),
  content: text('content'),
  buildStatus: text('build_status'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const thinairDeployments = pgTable('thinair_deployments', {
  id: serial('id').primaryKey(),
  projectId: serial('project_id').references(() => thinairProjects.id),
  vercelUrl: text('vercel_url'),
  githubUrl: text('github_url'),
  deployedAt: timestamp('deployed_at').defaultNow().notNull(),
  status: text('status').notNull(),
});

export const users = pgTable('users', {
  id: varchar('id', { length: 255 }).primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: timestamp('email_verified'),
  image: varchar('image', { length: 255 }),
});
