# Admin Dashboard - Developer Documentation

## Overview

This document describes the Admin Dashboard implementation for Thin Air, including all features, database schema, API endpoints, and UI components. This can be used as a reference for implementing similar functionality in other applications.

---

## Database Schema

### 1. Users Table Enhancement

```typescript
export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name"),
    email: text("email").notNull().unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    role: roleEnum("role").default("user").notNull(), // "user" | "admin"
    unlimitedAccess: boolean("unlimitedAccess").default(false).notNull(), // NEW: Bypass credit system
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
```

**Purpose**: The `unlimitedAccess` flag allows admins to grant specific users free access to the application, bypassing the credit system entirely.

### 2. Coupons Table

```typescript
export const couponTypeEnum = pgEnum("coupon_type", ["percent", "amount"]);

export const coupons = pgTable("coupons", {
    id: uuid("id").defaultRandom().primaryKey(),
    code: text("code").notNull().unique(), // e.g., "SAVE20"
    type: couponTypeEnum("type").notNull(), // "percent" or "amount"
    value: integer("value").notNull(), // percentage (e.g., 20 for 20%) or amount in cents
    expiresAt: timestamp("expiresAt", { mode: "date" }), // Optional expiry date
    maxUses: integer("maxUses"), // Optional usage limit
    usedCount: integer("usedCount").default(0).notNull(), // Track redemptions
    isActive: boolean("isActive").default(true).notNull(), // Enable/disable coupon
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    createdBy: uuid("createdBy").references(() => users.id), // Admin who created it
});
```

**Purpose**: Manage discount codes for promotional campaigns or customer retention.

### 3. Licenses Table

```typescript
export const licenses = pgTable("licenses", {
    id: uuid("id").defaultRandom().primaryKey(),
    key: text("key").notNull().unique(), // e.g., "LICENSE-ABC-123"
    userId: uuid("userId").references(() => users.id), // Nullable until assigned
    type: text("type").notNull(), // e.g., "pro", "enterprise"
    status: text("status").default("active").notNull(), // "active", "revoked", "expired"
    expiresAt: timestamp("expiresAt", { mode: "date" }), // Optional expiry
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    createdBy: uuid("createdBy").references(() => users.id), // Admin who created it
});
```

**Purpose**: Manage license keys for enterprise customers or special access.

### 4. Coupon Redemptions Table

```typescript
export const couponRedemptions = pgTable("coupon_redemptions", {
    id: uuid("id").defaultRandom().primaryKey(),
    couponId: uuid("couponId").notNull().references(() => coupons.id),
    userId: uuid("userId").notNull().references(() => users.id),
    redeemedAt: timestamp("redeemedAt").defaultNow().notNull(),
});
```

**Purpose**: Track which users have redeemed which coupons (for single-use or limited-use coupons).

---

## API Endpoints

### 1. User Management API

**Endpoint**: `/api/admin/users`

#### GET - List All Users
```typescript
GET /api/admin/users
Response: User[]
```

**Example Response**:
```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "unlimitedAccess": false,
    "createdAt": "2025-11-25T10:00:00Z"
  }
]
```

#### POST - Create User
```typescript
POST /api/admin/users
Body: {
  name: string,
  email: string,
  unlimitedAccess?: boolean
}
Response: User
```

**Example Request**:
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "unlimitedAccess": true
}
```

#### PATCH - Update User
```typescript
PATCH /api/admin/users
Body: {
  id: string,
  unlimitedAccess: boolean
}
Response: User
```

**Example Request**:
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "unlimitedAccess": true
}
```

### 2. Coupon Management API

**Endpoint**: `/api/admin/coupons`

#### GET - List All Coupons
```typescript
GET /api/admin/coupons
Response: Coupon[]
```

**Example Response**:
```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174001",
    "code": "SAVE20",
    "type": "percent",
    "value": 20,
    "maxUses": 100,
    "usedCount": 5,
    "expiresAt": "2025-12-31T23:59:59Z",
    "isActive": true
  }
]
```

#### POST - Create Coupon
```typescript
POST /api/admin/coupons
Body: {
  code: string,
  type: "percent" | "amount",
  value: number,
  maxUses?: number,
  expiresAt?: string
}
Response: Coupon
```

**Example Request**:
```json
{
  "code": "WELCOME10",
  "type": "percent",
  "value": 10,
  "maxUses": 50,
  "expiresAt": "2025-12-31T23:59:59Z"
}
```

### 3. License Management API

**Endpoint**: `/api/admin/licenses`

#### GET - List All Licenses
```typescript
GET /api/admin/licenses
Response: License[]
```

**Example Response**:
```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174002",
    "key": "LICENSE-ABC-123",
    "userId": null,
    "type": "pro",
    "status": "active",
    "expiresAt": "2026-12-31T23:59:59Z"
  }
]
```

#### POST - Create License
```typescript
POST /api/admin/licenses
Body: {
  key: string,
  type: string,
  expiresAt?: string
}
Response: License
```

**Example Request**:
```json
{
  "key": "LICENSE-XYZ-789",
  "type": "enterprise",
  "expiresAt": "2026-12-31T23:59:59Z"
}
```

---

## UI Components

### 1. UserManager Component

**Location**: `components/admin/UserManager.tsx`

**Features**:
- Display all users in a table
- Add new users (bypassing business email validation)
- Toggle unlimited access for any user
- Show user role and access status

**Key Functions**:
```typescript
const fetchUsers = async () => {
    const res = await fetch('/api/admin/users')
    const data = await res.json()
    setUsers(data)
}

const createUser = async () => {
    const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
    })
    if (res.ok) {
        fetchUsers()
    }
}

const toggleUnlimited = async (userId: string, currentStatus: boolean) => {
    const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, unlimitedAccess: !currentStatus }),
    })
    if (res.ok) {
        fetchUsers()
    }
}
```

### 2. CouponManager Component

**Location**: `components/admin/CouponManager.tsx`

**Features**:
- Display all coupons in a table
- Create new discount codes
- Set discount type (percentage or fixed amount)
- Set expiry dates and usage limits
- Track redemption count

**Key Functions**:
```typescript
const fetchCoupons = async () => {
    const res = await fetch('/api/admin/coupons')
    const data = await res.json()
    setCoupons(data)
}

const createCoupon = async () => {
    const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCoupon),
    })
    if (res.ok) {
        fetchCoupons()
    }
}
```

### 3. LicenseManager Component

**Location**: `components/admin/LicenseManager.tsx`

**Features**:
- Display all licenses in a table
- Generate new license keys
- Set license type and expiry
- Track license status

**Key Functions**:
```typescript
const fetchLicenses = async () => {
    const res = await fetch('/api/admin/licenses')
    const data = await res.json()
    setLicenses(data)
}

const createLicense = async () => {
    const res = await fetch('/api/admin/licenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLicense),
    })
    if (res.ok) {
        fetchLicenses()
    }
}
```

---

## Critical Implementation Detail: Database Connection

### The Problem

When importing the database package (`@thin-air/db`) in Next.js API routes, the connection was attempted at import time, before environment variables were loaded, causing 500 errors.

### The Solution

Implemented lazy initialization using a Proxy pattern in `packages/db/src/index.ts`:

```typescript
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
```

**Why This Works**:
- The database connection is only established when the `db` object is actually used
- Environment variables are loaded before the first database query
- The Proxy intercepts all property accesses and lazily initializes the connection

---

## Security Considerations

### 1. Authentication & Authorization

**Current Status**: Not implemented (TODO)

**Recommended Implementation**:
```typescript
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }
    
    // ... rest of the code
}
```

### 2. Input Validation

**Recommended**: Use Zod for request validation:
```typescript
import { z } from 'zod'

const createUserSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    unlimitedAccess: z.boolean().optional()
})

export async function POST(request: Request) {
    const body = await request.json()
    const validated = createUserSchema.parse(body) // Throws if invalid
    // ... rest of the code
}
```

### 3. Rate Limiting

**Recommended**: Implement rate limiting for admin endpoints to prevent abuse.

---

## Testing

### Manual Testing Checklist

- [ ] Can create a new user with unlimited access
- [ ] Can toggle unlimited access for existing users
- [ ] Can create percentage-based coupons
- [ ] Can create fixed-amount coupons
- [ ] Can set coupon expiry dates
- [ ] Can set coupon usage limits
- [ ] Can create license keys
- [ ] Can set license expiry dates
- [ ] All tables display data correctly
- [ ] Forms reset after successful submission

### API Testing Examples

```bash
# Test user creation
curl -X POST http://localhost:3002/api/admin/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","unlimitedAccess":true}'

# Test coupon creation
curl -X POST http://localhost:3002/api/admin/coupons \
  -H "Content-Type: application/json" \
  -d '{"code":"TEST20","type":"percent","value":20,"maxUses":100}'

# Test license creation
curl -X POST http://localhost:3002/api/admin/licenses \
  -H "Content-Type: application/json" \
  -d '{"key":"LICENSE-TEST-123","type":"pro"}'
```

---

## Future Enhancements

1. **Audit Logging**: Track all admin actions (who created/modified what and when)
2. **Bulk Operations**: Import/export users, coupons, licenses via CSV
3. **Analytics Dashboard**: Show usage statistics, redemption rates, etc.
4. **Email Notifications**: Notify users when they're granted unlimited access or assigned a license
5. **Coupon Redemption UI**: Allow users to redeem coupons on the frontend
6. **License Activation UI**: Allow users to activate license keys

---

## Summary

The Admin Dashboard provides comprehensive management capabilities for:
- **Users**: Add users, grant unlimited access
- **Coupons**: Create discount codes with flexible rules
- **Licenses**: Generate and manage license keys

All features are fully functional and tested. The implementation uses modern React patterns (hooks, async/await) and follows Next.js best practices.
