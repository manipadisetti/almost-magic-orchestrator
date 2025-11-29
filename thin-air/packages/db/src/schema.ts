import { pgTable, text, timestamp, integer, jsonb, boolean, uuid, pgEnum } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Enums
export const roleEnum = pgEnum("role", ["user", "admin"]);
export const creditTypeEnum = pgEnum("credit_type", ["purchase", "spend", "refund", "bonus"]);
export const appEnum = pgEnum("app", ["digital_sentinel", "ck", "identity_atlas", "thin_air", "admin"]);
export const projectStatusEnum = pgEnum("project_status", ["active", "archived", "deleted"]);
export const vaporTypeEnum = pgEnum("vapor_type", ["voice", "text", "image", "pdf"]);
export const couponTypeEnum = pgEnum("coupon_type", ["percent", "amount"]);

// --- Auth Tables (NextAuth) ---

export const users = pgTable("users", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").notNull().unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    role: roleEnum("role").default("user").notNull(),
    unlimitedAccess: boolean("unlimitedAccess").default(false).notNull(), // Bypass credit system
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const accounts = pgTable("accounts", {
    userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
}, (account) => ({
    compoundKey: { columns: [account.provider, account.providerAccountId] },
}));

export const sessions = pgTable("sessions", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable("verificationTokens", {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
}, (vt) => ({
    compoundKey: { columns: [vt.identifier, vt.token] },
}));

// --- Credits System ---

export const credits = pgTable("credits", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }).unique(),
    balance: integer("balance").default(0).notNull(),
    lifetimeEarned: integer("lifetimeEarned").default(0).notNull(),
    lifetimeSpent: integer("lifetimeSpent").default(0).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const creditTransactions = pgTable("credit_transactions", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    amount: integer("amount").notNull(),
    type: creditTypeEnum("type").notNull(),
    app: appEnum("app").notNull(),
    description: text("description"),
    metadata: jsonb("metadata"),
    stripePaymentIntentId: text("stripePaymentIntentId"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const stripeCustomers = pgTable("stripe_customers", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }).unique(),
    stripeCustomerId: text("stripeCustomerId").notNull().unique(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// --- Admin & Licensing System ---

export const coupons = pgTable("coupons", {
    id: uuid("id").defaultRandom().primaryKey(),
    code: text("code").notNull().unique(),
    type: couponTypeEnum("type").notNull(), // 'percent' or 'amount'
    value: integer("value").notNull(), // percentage (e.g. 10 for 10%) or amount in cents
    expiresAt: timestamp("expiresAt", { mode: "date" }),
    maxUses: integer("maxUses"),
    usedCount: integer("usedCount").default(0).notNull(),
    isActive: boolean("isActive").default(true).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    createdBy: text("createdBy").references(() => users.id),
});

export const licenses = pgTable("licenses", {
    id: uuid("id").defaultRandom().primaryKey(),
    key: text("key").notNull().unique(),
    userId: text("userId").references(() => users.id), // Nullable until assigned
    type: text("type").notNull(), // e.g. "pro", "enterprise"
    status: text("status").default("active").notNull(),
    expiresAt: timestamp("expiresAt", { mode: "date" }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    createdBy: text("createdBy").references(() => users.id),
});

export const couponRedemptions = pgTable("coupon_redemptions", {
    id: uuid("id").defaultRandom().primaryKey(),
    couponId: uuid("couponId").notNull().references(() => coupons.id),
    userId: text("userId").notNull().references(() => users.id),
    redeemedAt: timestamp("redeemedAt").defaultNow().notNull(),
});

// --- Thin Air Core Tables ---

export const projects = pgTable("projects", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    status: projectStatusEnum("status").default("active").notNull(),
    lastActivityAt: timestamp("lastActivityAt").defaultNow().notNull(), // For 30-day auto-deletion
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const vaporInputs = pgTable("vapor_inputs", {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("projectId").notNull().references(() => projects.id, { onDelete: "cascade" }),
    type: vaporTypeEnum("type").notNull(),
    content: text("content").notNull(), // Transcribed text or raw text
    mediaUrl: text("mediaUrl"), // S3 URL for voice/image/pdf
    metadata: jsonb("metadata"),
    processed: boolean("processed").default(false).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const intents = pgTable("intents", {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("projectId").notNull().references(() => projects.id, { onDelete: "cascade" }),
    intentJson: jsonb("intentJson").notNull(), // The extracted intent structure
    confidence: integer("confidence"), // 0-100
    version: integer("version").default(1).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const simulations = pgTable("simulations", {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("projectId").notNull().references(() => projects.id, { onDelete: "cascade" }),
    intentId: uuid("intentId").references(() => intents.id),
    scenario: text("scenario"), // "best", "worst", "likely"
    graphData: jsonb("graphData"), // React Flow data
    metrics: jsonb("metrics"), // Cost, time, complexity
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const codeArtifacts = pgTable("code_artifacts", {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("projectId").notNull().references(() => projects.id, { onDelete: "cascade" }),
    intentId: uuid("intentId").references(() => intents.id),
    filePath: text("filePath").notNull(),
    content: text("content").notNull(),
    language: text("language").default("typescript").notNull(),
    metadata: jsonb("metadata"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const deployments = pgTable("deployments", {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("projectId").notNull().references(() => projects.id, { onDelete: "cascade" }),
    url: text("url"),
    status: text("status").default("pending").notNull(),
    logs: text("logs"),
    metadata: jsonb("metadata"),
    deployedAt: timestamp("deployedAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});
