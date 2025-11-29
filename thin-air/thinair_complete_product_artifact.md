# ThinAir - Complete Product Artifact
**The Zero-Spec Cognitive Foundry**  
**Version:** 1.0  
**Date:** 20 November 2025  
**Language:** Australian English

---

## 🎯 Executive Summary

**ThinAir** transforms unstructured human thought into fully deployed, production-grade business ecosystems. Simply speak your idea, sketch a diagram, or describe your vision—ThinAir materialises it into a complete software application with marketing site and documentation, all deployed and ready to use.

**Tagline:** "Create software out of Thin Air."

**Core Value Proposition:** From napkin sketch to deployed application in minutes, not months.

---

## 🌟 The Problem We Solve

### Traditional Software Development is Broken

**Current Reality:**
- **Months of planning** - Requirements documents, specifications, wireframes
- **Expensive developers** - $50,000-$500,000 for a custom application
- **Technical barriers** - Non-technical founders can't build their vision
- **Lost ideas** - Brilliant concepts die because they're "too hard to build"
- **Miscommunication** - What you imagine ≠ what developers build

**The Gap:** Between having an idea and seeing it live on the internet is a chasm filled with time, money, and technical complexity.

### ThinAir Bridges That Gap

**New Reality:**
- **Minutes, not months** - Speak your idea, get a deployed app
- **Affordable** - 10-100 credits instead of $50,000+
- **No technical knowledge required** - If you can talk, you can build
- **Ideas become reality** - Stop losing brilliant concepts to complexity
- **Perfect translation** - AI understands your vision and builds exactly what you mean

---

## 🚀 How ThinAir Works

### The Five-Phase Transformation Pipeline

ThinAir takes you through five beautifully orchestrated phases, each with its own ethereal aesthetic and purpose:

```
Vapor → Condenser → Mirage → Materialiser → Manifest
 💭       🧠          🌀          ⚙️           🚀
Input   Reasoning   Visual    Generate     Deploy
```

---

## 💭 Module 1: The Vapor (Ingestion Layer)

### What It Does
Captures your raw, unstructured ideas in any format you prefer.

### The Experience
A minimalist, "breathing" drop zone with a dark, ethereal aesthetic. Glowing blues and purples pulse gently, inviting you to share your vision.

### Multi-Modal Inputs Accepted

#### 1. **Voice Input** 🎤
- **How:** Click record, speak your idea naturally
- **Technology:** Whisper API transcription with Gemini 3 Pro fallback
- **Example:** "I want to build a marketplace where local farmers can sell directly to restaurants. Restaurants should be able to browse by location, place orders, and track deliveries."
- **Processing:** Real-time transcription with waveform visualisation
- **Output:** High-accuracy text transcript with confidence scores

#### 2. **Text Input** ⌨️
- **How:** Type or paste your description
- **Technology:** Rich text editor with markdown support
- **Example:** Paste requirements from emails, notes, or documents
- **Processing:** Instant capture with auto-save
- **Output:** Structured text ready for analysis

#### 3. **Image Input** 📸
- **How:** Upload photos of sketches, diagrams, UI mockups, or screenshots
- **Technology:** Gemini 3 Pro Vision (media_resolution_high: 1120 tokens)
- **Example:** Napkin sketch of a dashboard layout, whiteboard flowchart, competitor screenshot
- **Processing:** Advanced image analysis extracting:
  - Diagram structures and relationships
  - UI layouts and components
  - Visible text (OCR)
  - Conceptual meaning
- **Output:** Detailed description capturing all visual elements

#### 4. **PDF Input** 📄
- **How:** Upload specification documents, requirements, or design files
- **Technology:** Gemini 3 Pro Document Understanding (media_resolution_medium: 560 tokens)
- **Example:** Product requirements document, technical specifications, design mockups
- **Processing:** Comprehensive document analysis extracting:
  - All text content (preserving structure)
  - Tables and data
  - Diagrams and charts
  - Document hierarchy
- **Output:** Structured analysis of entire document

### Visual Features
- **Real-time upload progress** - Animated charts (Recharts)
- **Processing status visualisation** - Not just spinners, actual progress
- **Input type distribution** - Pie chart showing your input mix
- **Session timeline** - Visual history of all inputs

### User Journey
1. **Land on Vapor page** - Breathing animation welcomes you
2. **Choose input method** - Voice, text, image, or PDF
3. **Provide your idea** - In whatever format feels natural
4. **Watch it process** - Beautiful visualisations show progress
5. **Add more context** - Layer multiple inputs for richness
6. **Complete Vapor** - Move to Condenser phase

### Credits Cost
- **Quick analysis:** 10 credits per input
- **Full processing:** Included in project cost

---

## 🧠 Module 2: The Condenser (Cognitive Core)

### What It Does
Transforms your raw inputs into a structured "Intent JSON"—the DNA of your application.

### The Experience
A "Thinking Stream" visualisation (not a progress bar) showing the AI's reasoning process in real-time. Watch as entities emerge, features crystallise, and connections form.

### The AI Reasoning Chain

#### Powered by Gemini 3 Pro (High Thinking Level)
- **Context Window:** 1 million tokens input / 64k output
- **Thinking Mode:** Deep reasoning for complex analysis
- **Orchestration:** LangChain/LangGraph for multi-step reasoning

#### The Process

**Step 1: Entity Extraction**
- **What:** Identifies core entities (users, products, services, data models)
- **How:** Semantic analysis of all inputs
- **Example:** From "farmers sell to restaurants" → Entities: Farmer, Restaurant, Product, Order
- **Output:** Entity list with confidence scores

**Step 2: Feature Extraction (Explicit)**
- **What:** Identifies features you explicitly mentioned
- **How:** Natural language understanding
- **Example:** "track deliveries" → Feature: Delivery Tracking
- **Output:** Feature list with descriptions

**Step 3: Feature Inference (Implicit)**
- **What:** Infers features you didn't mention but need
- **How:** Domain knowledge + reasoning
- **Example:** Marketplace needs → Inferred: User authentication, payment processing, search, reviews
- **Output:** Inferred features with reasoning explanations

**Step 4: Tech Stack Selection**
- **What:** Chooses optimal technologies
- **How:** Matches requirements to best-fit stack
- **Example:** Real-time updates needed → WebSockets, Next.js, PostgreSQL
- **Output:** Complete tech stack recommendation

**Step 5: Missing Information Detection**
- **What:** Identifies gaps in your specification
- **How:** Validates completeness against domain requirements
- **Example:** "How should payments work? Stripe? PayPal? Both?"
- **Output:** List of clarifying questions (max 3)

### The Intent JSON

The "DNA" of your application—a structured representation of everything needed to build it.

**Schema:**
```json
{
  "project_name": "FarmToTable Marketplace",
  "core_type": "marketplace",
  "description": "Platform connecting local farmers with restaurants",
  
  "tech_stack": {
    "frontend": "Next.js 14 + React 19 + Tailwind CSS",
    "backend": "tRPC + Express",
    "database": "PostgreSQL + Drizzle ORM",
    "auth": "NextAuth.js",
    "payments": "Stripe",
    "realtime": "WebSockets",
    "hosting": "Vercel"
  },
  
  "entities": [
    {
      "id": "farmer",
      "label": "Farmer",
      "type": "user_role",
      "attributes": ["name", "farm_name", "location", "products"],
      "confidence": 0.98
    },
    {
      "id": "restaurant",
      "label": "Restaurant",
      "type": "user_role",
      "attributes": ["name", "location", "cuisine_type"],
      "confidence": 0.98
    },
    {
      "id": "product",
      "label": "Product",
      "type": "entity",
      "attributes": ["name", "price", "quantity", "unit", "category"],
      "confidence": 0.95
    },
    {
      "id": "order",
      "label": "Order",
      "type": "entity",
      "attributes": ["items", "total", "status", "delivery_date"],
      "confidence": 0.92
    }
  ],
  
  "features": [
    {
      "id": "browse_products",
      "label": "Browse Products by Location",
      "type": "explicit",
      "description": "Restaurants can filter farmers by proximity",
      "priority": "high",
      "reasoning": "Explicitly mentioned in input"
    },
    {
      "id": "place_order",
      "label": "Place Order",
      "type": "explicit",
      "description": "Restaurants can add products to cart and checkout",
      "priority": "high",
      "reasoning": "Core marketplace functionality"
    },
    {
      "id": "track_delivery",
      "label": "Track Delivery",
      "type": "explicit",
      "description": "Real-time delivery status updates",
      "priority": "high",
      "reasoning": "Explicitly mentioned in input"
    },
    {
      "id": "user_authentication",
      "label": "User Authentication",
      "type": "inferred",
      "description": "Secure login for farmers and restaurants",
      "priority": "critical",
      "reasoning": "Required for any marketplace with user accounts"
    },
    {
      "id": "payment_processing",
      "label": "Payment Processing",
      "type": "inferred",
      "description": "Stripe integration for secure payments",
      "priority": "critical",
      "reasoning": "Marketplace requires payment handling"
    },
    {
      "id": "search_filter",
      "label": "Search & Filter",
      "type": "inferred",
      "description": "Search products by name, category, location",
      "priority": "high",
      "reasoning": "Essential for product discovery"
    },
    {
      "id": "reviews_ratings",
      "label": "Reviews & Ratings",
      "type": "inferred",
      "description": "Restaurants can review farmers and products",
      "priority": "medium",
      "reasoning": "Builds trust in marketplace"
    }
  ],
  
  "flows": [
    {
      "from": "restaurant",
      "to": "product",
      "action": "browse",
      "description": "Restaurant browses available products"
    },
    {
      "from": "restaurant",
      "to": "order",
      "action": "create",
      "description": "Restaurant places order"
    },
    {
      "from": "order",
      "to": "farmer",
      "action": "notify",
      "description": "Farmer receives order notification"
    },
    {
      "from": "farmer",
      "to": "order",
      "action": "update_status",
      "description": "Farmer updates delivery status"
    }
  ],
  
  "missing_info": [
    "Payment flow: Should farmers be paid immediately or on delivery?",
    "Delivery logistics: Do farmers deliver or use third-party?",
    "Pricing model: Commission-based or subscription?"
  ],
  
  "database_schema": {
    "users": ["id", "email", "name", "role", "created_at"],
    "farmers": ["id", "user_id", "farm_name", "location", "bio"],
    "restaurants": ["id", "user_id", "name", "location", "cuisine_type"],
    "products": ["id", "farmer_id", "name", "price", "quantity", "unit", "category"],
    "orders": ["id", "restaurant_id", "total", "status", "delivery_date", "created_at"],
    "order_items": ["id", "order_id", "product_id", "quantity", "price"],
    "reviews": ["id", "restaurant_id", "farmer_id", "rating", "comment", "created_at"]
  },
  
  "api_endpoints": [
    "GET /api/products - List products with filters",
    "POST /api/orders - Create new order",
    "GET /api/orders/:id - Get order details",
    "PATCH /api/orders/:id/status - Update order status",
    "POST /api/reviews - Submit review"
  ]
}
```

### Visual Features
- **Thinking Stream** - Real-time AI reasoning visualisation
- **Entity extraction confidence chart** - Bar chart showing certainty levels
- **Feature inference network** - React Flow graph showing reasoning
- **Processing timeline** - Milestones as they're reached
- **Token usage tracker** - Cost transparency

### Socratic Questioning

If the AI detects missing information, it asks up to 3 clarifying questions:

**Example:**
1. "How should payments work? Should farmers be paid immediately upon order, or after delivery confirmation?"
2. "Who handles delivery logistics? Do farmers deliver themselves, or should we integrate with a third-party delivery service?"
3. "What's your pricing model? Commission per transaction, monthly subscription, or freemium?"

**User answers** → Intent JSON updated → Ready for next phase

### User Journey
1. **Watch Thinking Stream** - See AI reasoning in real-time
2. **Review extracted entities** - Verify understanding
3. **Examine inferred features** - Approve or modify
4. **Answer questions** - Clarify missing details
5. **Approve Intent JSON** - Move to Mirage phase

### Credits Cost
- **Full analysis:** 50 credits (included in project)

---

## 🌀 Module 3: The Mirage (Logic Graph UI)

### What It Does
Visualises your application's logic as an interactive, editable graph. See the relationships between entities, features, and flows—then refine them.

### The Experience
A dark, ethereal canvas with glowing nodes and animated connections. Drag, connect, edit—the graph is alive and responds to your touch. Every change updates the Intent JSON in real-time.

### The Interactive Graph

#### Powered by React Flow
- **Nodes:** Entities, features, integrations
- **Edges:** Relationships, data flows, actions
- **Layout:** Automatic hierarchical or force-directed
- **Styling:** Dark mode, glowing nodes, animated connections

#### Node Types

**1. Entity Nodes** (Purple glow)
- **Visual:** Rounded rectangles with entity icon
- **Content:** Entity name + key attributes
- **Example:** "Farmer" node showing [name, farm_name, location, products]
- **Interactions:** Click to edit attributes, drag to reposition

**2. Feature Nodes** (Blue glow)
- **Visual:** Hexagons with feature icon
- **Content:** Feature name + priority badge
- **Example:** "Browse Products" node with "HIGH" priority
- **Interactions:** Click to edit description, change priority

**3. Integration Nodes** (Green glow)
- **Visual:** Diamonds with service logo
- **Content:** Service name (Stripe, Twilio, Google Maps)
- **Example:** "Stripe" node for payment processing
- **Interactions:** Click to configure API settings

#### Edge Types

**1. Data Flow Edges** (Solid lines)
- **Visual:** Animated particles flowing along edge
- **Content:** Action label ("browse", "create", "update")
- **Example:** Restaurant → Product (browse)

**2. Relationship Edges** (Dashed lines)
- **Visual:** Subtle glow, no animation
- **Content:** Relationship type ("has_many", "belongs_to")
- **Example:** Farmer → Products (has_many)

### Bi-Directional Binding

**Graph ↔ Intent JSON**

Every change in the graph instantly updates the Intent JSON, and vice versa:

- **Add node** → New entity/feature in JSON
- **Connect nodes** → New flow in JSON
- **Edit node** → Update entity/feature properties
- **Delete node** → Remove from JSON (with confirmation)
- **Rearrange nodes** → Visual only (no JSON change)

### Editing Capabilities

#### Add Entities
1. Click "+" button or double-click canvas
2. Choose entity type (user, data model, service)
3. Name it and add attributes
4. Node appears in graph, JSON updates

#### Connect Flows
1. Drag from one node's output port
2. Drop on another node's input port
3. Label the action/relationship
4. Edge appears, flow added to JSON

#### Modify Features
1. Click feature node
2. Edit description, priority, or type
3. Changes save automatically
4. JSON updates in real-time

#### Delete Elements
1. Select node or edge
2. Press Delete or click trash icon
3. Confirmation modal appears
4. On confirm: removed from graph and JSON

### Socratic Refinement

Even after initial questioning, the Mirage can detect logical gaps:

**Example:**
- **Graph shows:** Restaurant → Order → Farmer
- **AI detects:** No notification system configured
- **Question:** "How should farmers be notified of new orders? Email, SMS, or in-app notifications?"
- **User answers** → Twilio integration node added

### Visual Features
- **Interactive node-based graph** - React Flow with custom styling
- **Minimap** - Navigate large graphs easily
- **Zoom & pan controls** - Smooth interactions
- **Node type distribution chart** - Pie chart of entity/feature/integration mix
- **Complexity metrics** - Visual indicators of app complexity
- **Missing information heatmap** - Highlights incomplete areas

### User Journey
1. **Explore the graph** - See your app's structure
2. **Verify relationships** - Check flows make sense
3. **Add missing pieces** - Drag in new entities or features
4. **Refine connections** - Adjust relationships
5. **Answer refinement questions** - Clarify any gaps
6. **Approve final structure** - Move to Materialiser phase

### Credits Cost
- **Graph generation:** Included in project cost
- **AI refinement questions:** Included

---

## ⚙️ Module 4: The Materialiser (Code Generation)

### What It Does
Generates production-grade code, tests it in a sandbox, finds errors, fixes them automatically, and repeats until perfect.

### The Experience
A "Materialisation Stream" showing real-time code generation. Watch files solidify one by one, see tests run, errors detected, and fixes applied—all autonomously.

### The Code Generation Engine

#### Powered by Gemini 3 Pro (High Thinking Level)
- **Model:** gemini-3-pro-preview
- **Thinking:** Deep reasoning for code generation
- **Context:** Full Intent JSON + tech stack + best practices
- **Output:** Complete, production-ready codebase

#### What Gets Generated

**1. Frontend (Next.js 14 + React 19)**
- **Pages:** All routes from Intent JSON
- **Components:** Reusable UI components (shadcn/ui)
- **Layouts:** Responsive, accessible designs
- **Styling:** Tailwind CSS with custom theme
- **State Management:** React hooks + tRPC
- **Forms:** Validation with Zod
- **Example files:**
  - `client/src/pages/Dashboard.tsx`
  - `client/src/pages/Products.tsx`
  - `client/src/pages/Orders.tsx`
  - `client/src/components/ProductCard.tsx`
  - `client/src/components/OrderTracking.tsx`

**2. Backend (tRPC + Express)**
- **API Routes:** All endpoints from Intent JSON
- **Database Schema:** Drizzle ORM schema
- **Authentication:** NextAuth.js setup
- **Business Logic:** CRUD operations + custom logic
- **Integrations:** Stripe, Twilio, etc.
- **Example files:**
  - `server/routers/products.ts`
  - `server/routers/orders.ts`
  - `server/db.ts`
  - `drizzle/schema.ts`

**3. Database**
- **Schema:** All tables from Intent JSON
- **Migrations:** Drizzle migrations
- **Seed Data:** Sample data for testing
- **Indexes:** Optimised queries
- **Example:**
  - `drizzle/schema.ts` (users, farmers, restaurants, products, orders, reviews)
  - `drizzle/seed.ts` (sample farmers, products)

**4. Tests**
- **Unit Tests:** Vitest for all functions
- **Integration Tests:** tRPC endpoint tests
- **E2E Tests:** Playwright for user flows
- **Example files:**
  - `server/products.test.ts`
  - `server/orders.test.ts`
  - `tests/e2e/checkout.spec.ts`

**5. Configuration**
- **Environment Variables:** `.env.example`
- **TypeScript Config:** `tsconfig.json`
- **Build Config:** `vite.config.ts`
- **Linting:** ESLint + Prettier
- **Example files:**
  - `.env.example`
  - `package.json`
  - `README.md`

### The "Pre-Crime" Simulation

**Inspired by Minority Report:** Test and fix errors before deployment.

#### The Testing Loop

**Step 1: Deploy to Sandbox**
- **Environment:** Isolated Docker container or E2B cloud sandbox
- **Setup:** Install dependencies, run migrations, start server
- **Duration:** 30-60 seconds

**Step 2: Automated Testing (Playwright)**
- **Scenarios:** Generated from Intent JSON flows
- **Example tests:**
  1. Navigate to /signup → Fill form → Submit → Verify database
  2. Login as restaurant → Browse products → Add to cart → Checkout → Verify order created
  3. Login as farmer → View orders → Update status → Verify notification sent
- **Duration:** 2-5 minutes

**Step 3: Error Detection**
- **Capture:** Screenshots, console logs, network requests
- **Analyse:** Identify failures (404s, crashes, validation errors)
- **Classify:** Critical, high, medium, low priority
- **Example errors:**
  - "404 on /api/products - endpoint not registered"
  - "TypeError: Cannot read property 'map' of undefined"
  - "Database constraint violation: foreign key mismatch"

**Step 4: Auto-Fix (Gemini 3 Pro)**
- **Input:** Error message + stack trace + relevant code
- **Reasoning:** High thinking level for complex debugging
- **Output:** Fixed code with explanation
- **Example fix:**
  ```typescript
  // Error: Cannot read property 'map' of undefined
  // Fix: Add null check
  - {products.map(p => <ProductCard product={p} />)}
  + {products?.map(p => <ProductCard product={p} />) || <EmptyState />}
  ```

**Step 5: Re-Deploy & Re-Test**
- **Apply fixes** → Re-deploy to sandbox → Re-run tests
- **Repeat** until all tests pass (max 3 iterations)
- **Fallback:** If still failing after 3 attempts, flag for manual review

### The Materialisation Stream UI

**Real-time status updates** (not a progress bar):

```
🌫️  Materialising auth.ts...
    ✓ Generated authentication logic (1,234 lines)
    ✓ Added NextAuth.js configuration
    ✓ Created login/signup pages

🌫️  Connecting Stripe API...
    ✓ Installed Stripe SDK
    ✓ Created payment intent endpoint
    ✓ Added webhook handler

🌫️  Building product catalogue...
    ✓ Generated ProductCard component
    ✓ Created product listing page
    ✓ Added search and filter logic

🧪  Testing in sandbox...
    ⏳ Deploying to isolated environment...
    ✓ Dependencies installed (45 packages)
    ✓ Database migrated (7 tables)
    ✓ Server started on port 3000

🧪  Running automated tests...
    ✓ Signup flow (2.3s)
    ✓ Login flow (1.8s)
    ✓ Browse products (3.1s)
    ❌ Checkout flow (failed)
       Error: Stripe API key not configured

🔧  Auto-fixing errors...
    ✓ Added STRIPE_SECRET_KEY to environment
    ✓ Updated payment intent logic
    ✓ Re-deploying...

🧪  Re-testing...
    ✓ Checkout flow (4.2s)
    ✓ Order tracking (2.9s)
    ✓ Farmer dashboard (3.5s)

✅  All tests passed! Code is production-ready.
```

### Visual Features
- **File generation timeline** - Recharts showing files created over time
- **Test execution flow** - React Flow diagram of test scenarios
- **Error/fix cycle visualisation** - Animated loop showing iterations
- **Code complexity metrics** - Lines of code, file count, test coverage
- **Sandbox resource usage** - CPU, memory, network charts

### User Journey
1. **Watch Materialisation Stream** - See code being generated
2. **Monitor testing** - Watch automated tests run
3. **See errors detected** - Understand what went wrong
4. **Watch auto-fixes** - See AI debugging in action
5. **Celebrate success** - All tests pass!
6. **Download code** - Or proceed to deployment

### Credits Cost
- **Full materialisation:** 50 credits
- **Each auto-fix iteration:** 10 credits (max 30 total)

---

## 🚀 Module 5: The Manifest (Deployment Layer)

### What It Does
Deploys your application to production, generates a marketing site, creates documentation, and hands you the keys to your new business.

### The Experience
A deployment dashboard showing three parallel streams: App deployment, Marketing site generation, and Docs creation. Watch your entire business ecosystem come to life.

### The Deployment Pipeline

#### 1. GitHub Repository Creation

**What happens:**
- Creates private GitHub repo
- Pushes all generated code
- Sets up branch protection
- Adds README with setup instructions
- Configures GitHub Actions for CI/CD

**Output:**
- **Repo URL:** `https://github.com/yourusername/farmtotable-marketplace`
- **Branches:** `main` (production), `develop` (staging)
- **Actions:** Auto-deploy on push to main

#### 2. Application Deployment (Vercel)

**What happens:**
- Connects GitHub repo to Vercel
- Configures environment variables
- Sets up custom domain (if provided)
- Deploys to production
- Configures CDN and edge functions

**Output:**
- **App URL:** `https://farmtotable-marketplace.vercel.app`
- **Custom Domain:** `https://farmtotable.com` (if configured)
- **SSL:** Automatic HTTPS
- **Performance:** Global CDN, edge caching

#### 3. Marketing Site Generation

**What happens:**
- Analyses Intent JSON to extract value propositions
- Generates compelling marketing copy
- Creates landing page with:
  - Hero section (headline + CTA)
  - Features grid (with icons)
  - How it works (step-by-step)
  - Pricing table (if applicable)
  - Testimonials section (template)
  - FAQ section
  - Footer with links
- Deploys to separate domain

**Example Marketing Copy Generated:**

**Hero Section:**
```
Headline: "Connect Local Farmers with Restaurants, Instantly"
Subheadline: "The marketplace that brings farm-fresh produce directly to your kitchen. Browse, order, and track deliveries—all in one place."
CTA: "Start Ordering Today" | "List Your Farm"
```

**Features Grid:**
```
🌍 Location-Based Discovery
Find farmers near you with real-time inventory

📦 Seamless Ordering
Add to cart, checkout, and track deliveries

💳 Secure Payments
Stripe-powered payment processing

⭐ Reviews & Ratings
Build trust with verified reviews

📱 Mobile-Friendly
Order on the go with our responsive design

🔔 Real-Time Notifications
Get instant updates on order status
```

**How It Works:**
```
For Restaurants:
1. Browse local farmers by location
2. Add products to your cart
3. Checkout securely with Stripe
4. Track delivery in real-time

For Farmers:
1. Create your farm profile
2. List your products with pricing
3. Receive orders instantly
4. Update delivery status
```

**Pricing Table:**
```
Free Tier:
- List up to 10 products
- Unlimited orders
- 5% commission per sale

Pro Tier ($29/month):
- Unlimited products
- Priority support
- 3% commission per sale
- Advanced analytics
```

**Output:**
- **Marketing URL:** `https://farmtotable-marketing.vercel.app`
- **Custom Domain:** `https://www.farmtotable.com` (if configured)

#### 4. Documentation Generation

**What happens:**
- Creates GitBook-style documentation
- Generates:
  - Getting Started guide
  - User manual (for each user role)
  - API documentation (auto-generated from tRPC)
  - Database schema documentation
  - Deployment guide
  - Troubleshooting guide
- Deploys to docs subdomain

**Example Documentation Structure:**

```
📚 FarmToTable Documentation

Getting Started
├── Introduction
├── Quick Start Guide
├── System Requirements
└── Installation

User Guides
├── For Restaurants
│   ├── Creating an Account
│   ├── Browsing Products
│   ├── Placing Orders
│   └── Tracking Deliveries
└── For Farmers
    ├── Setting Up Your Profile
    ├── Listing Products
    ├── Managing Orders
    └── Updating Delivery Status

API Reference
├── Authentication
├── Products API
├── Orders API
├── Users API
└── Webhooks

Technical Documentation
├── Database Schema
├── Architecture Overview
├── Deployment Guide
└── Environment Variables

Troubleshooting
├── Common Issues
├── Error Messages
└── Support Contact
```

**Output:**
- **Docs URL:** `https://docs.farmtotable.com`

### The Manifest Dashboard

**Three-column layout showing parallel progress:**

```
┌─────────────────┬─────────────────┬─────────────────┐
│   Application   │  Marketing Site │  Documentation  │
├─────────────────┼─────────────────┼─────────────────┤
│ ✓ GitHub repo   │ ✓ Copy written  │ ✓ Structure     │
│ ✓ Vercel setup  │ ✓ Hero section  │ ✓ User guides   │
│ ⏳ Deploying...  │ ✓ Features grid │ ✓ API docs      │
│                 │ ⏳ Deploying...  │ ⏳ Deploying...  │
└─────────────────┴─────────────────┴─────────────────┘
```

### Visual Features
- **Deployment pipeline diagram** - React Flow showing stages
- **Deployment status timeline** - Recharts showing progress
- **Resource allocation chart** - CPU, memory, bandwidth
- **Performance metrics** - Load time, Lighthouse scores
- **URL cards** - Beautiful cards with QR codes for each URL

### The Final Reveal

**Once all three deployments complete:**

```
🎉 Your Business Ecosystem is Live!

┌─────────────────────────────────────────────────┐
│  🚀 Application                                 │
│  https://farmtotable-marketplace.vercel.app     │
│  [Visit App] [View Analytics] [Manage]         │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  🌐 Marketing Site                              │
│  https://www.farmtotable.com                    │
│  [Visit Site] [Edit Copy] [View Traffic]       │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  📚 Documentation                               │
│  https://docs.farmtotable.com                   │
│  [Read Docs] [Edit Content] [Add Pages]        │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  💻 Source Code                                 │
│  https://github.com/you/farmtotable-marketplace │
│  [View Code] [Clone Repo] [Download ZIP]       │
└─────────────────────────────────────────────────┘

Share your success:
[Twitter] [LinkedIn] [Facebook] [Email]

What's next?
• Customise your marketing site
• Invite your first users
• Monitor analytics
• Scale your business
```

### User Journey
1. **Watch deployment progress** - Three parallel streams
2. **See URLs appear** - As each deployment completes
3. **Visit your app** - Click through to see it live
4. **Check marketing site** - Review generated copy
5. **Read documentation** - Verify completeness
6. **Share with the world** - Social media, email
7. **Start your business** - You're live!

### Credits Cost
- **Full deployment:** 100 credits
- **Marketing site:** Included
- **Documentation:** Included

---

## 💳 Pricing & Credits

### Credit System

**How Credits Work:**
- **Purchase credits** in packages
- **Spend credits** on ThinAir operations
- **Transparent pricing** - know costs upfront
- **No subscriptions** - pay only for what you use

### Credit Packages

| Package | Credits | Price | Cost per Credit | Best For |
|---------|---------|-------|-----------------|----------|
| **Starter** | 100 | $10 | $0.10 | Testing ThinAir |
| **Builder** | 500 | $40 | $0.08 | 2-3 projects |
| **Pro** | 2,000 | $120 | $0.06 | 10+ projects |
| **Enterprise** | 10,000 | $500 | $0.05 | Agencies |

### Operation Costs

| Operation | Credits | What You Get |
|-----------|---------|--------------|
| **Quick Analysis** | 10 | Single input processing (Vapor) |
| **Full Condensing** | 50 | Complete Intent JSON generation |
| **Materialisation** | 50 | Code generation + initial testing |
| **Auto-Fix Iteration** | 10 | Each error fix attempt (max 3) |
| **Full Deployment** | 100 | App + Marketing + Docs + GitHub |
| **Complete Project** | 160-190 | Vapor → Manifest (typical) |

### Example Project Costs

**Simple Landing Page:**
- Vapor (text input): 10 credits
- Condenser: 50 credits
- Materialiser: 50 credits
- Manifest: 100 credits
- **Total:** 210 credits ($12-21 depending on package)

**Marketplace (like FarmToTable):**
- Vapor (voice + images): 20 credits
- Condenser: 50 credits
- Materialiser: 50 credits
- Auto-fixes (2 iterations): 20 credits
- Manifest: 100 credits
- **Total:** 240 credits ($14-24 depending on package)

**Enterprise SaaS:**
- Vapor (PDFs + images + voice): 40 credits
- Condenser: 50 credits
- Materialiser: 50 credits
- Auto-fixes (3 iterations): 30 credits
- Manifest: 100 credits
- **Total:** 270 credits ($16-27 depending on package)

### Comparison to Traditional Development

| Method | Time | Cost | Technical Skill Required |
|--------|------|------|--------------------------|
| **ThinAir** | 10-30 min | $12-27 | None |
| **No-Code Tools** | 2-4 weeks | $0-$500/mo | Low |
| **Freelancer** | 4-12 weeks | $5,000-$25,000 | None (but communication overhead) |
| **Agency** | 12-24 weeks | $50,000-$500,000 | None (but heavy involvement) |
| **In-House** | 16-52 weeks | $100,000-$1M+ | High |

**ThinAir ROI:** 100-10,000x faster, 200-40,000x cheaper

---

## 🎨 Design & User Experience

### Visual Aesthetic

**Theme:** Dark, ethereal, otherworldly

**Colour Palette:**
- **Background:** Deep charcoal (#1a1a1a)
- **Primary:** Glowing blue (#3b82f6)
- **Secondary:** Ethereal purple (#8b5cf6)
- **Accent:** Bright cyan (#06b6d4)
- **Text:** Soft white (#f5f5f5)
- **Muted:** Grey (#6b7280)

**Typography:**
- **Headings:** Inter, bold, large
- **Body:** Inter, regular, 16px minimum
- **Code:** JetBrains Mono, monospace

**Animations:**
- **Breathing effect:** Gentle pulsing on Vapor drop zone
- **Particle flow:** Animated particles along graph edges
- **Materialisation:** Files "solidifying" from mist
- **Deployment:** Rocket launch animation

### Accessibility (Inclusion Hub Principles)

**WCAG 2.1 AA Compliant:**
- ✅ Colour contrast ratios ≥ 4.5:1
- ✅ Keyboard navigation (all interactions)
- ✅ Screen reader support (ARIA labels)
- ✅ Focus indicators (visible outlines)
- ✅ Reduced motion (respects user preference)

**Neurodiversity Support:**
- ✅ Clear, simple language (no jargon)
- ✅ Predictable layouts (consistent patterns)
- ✅ Generous spacing (reduced cognitive load)
- ✅ Visual hierarchy (easy scanning)
- ✅ Progress indicators (reduce anxiety)

**Australian English:**
- ✅ "Customise" not "Customize"
- ✅ "Materialise" not "Materialize"
- ✅ "Analyse" not "Analyze"
- ✅ "Optimise" not "Optimize"

### Responsive Design

**Breakpoints:**
- **Mobile:** 320px - 767px (single column)
- **Tablet:** 768px - 1023px (two columns)
- **Desktop:** 1024px+ (full layout)

**Mobile-First:**
- All features work on mobile
- Touch-optimised interactions
- Simplified graph on small screens
- Swipe gestures for navigation

---

## 🔧 Technical Architecture

### Tech Stack

**Frontend:**
- **Framework:** Next.js 14 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **Components:** shadcn/ui
- **Animations:** Framer Motion
- **Graph:** React Flow
- **Charts:** Recharts
- **State:** React hooks + tRPC

**Backend:**
- **API:** tRPC 11 (type-safe)
- **Server:** Express 4
- **Database:** PostgreSQL (Intelligence Hub)
- **ORM:** Drizzle ORM
- **Auth:** NextAuth.js (Almost Magic Platform SSO)
- **Storage:** MinIO (S3-compatible)
- **Queue:** RabbitMQ
- **Cache:** Redis

**AI/LLM:**
- **Primary:** Gemini 3 Pro (Google AI)
- **Secondary:** Ollama (Intelligence Hub)
- **Tertiary:** gpt-4.1-mini (fallback)
- **Orchestration:** LangChain/LangGraph
- **Framework:** Microsoft Agent Lightning

**Infrastructure:**
- **Hosting:** Vercel (app) + Vercel (marketing) + Vercel (docs)
- **Database:** Intelligence Hub (134.199.161.125:5300)
- **Redis:** Intelligence Hub (134.199.161.125:5301)
- **RabbitMQ:** Intelligence Hub (134.199.161.125:5320)
- **MinIO:** Intelligence Hub (134.199.161.125:5801)
- **Ollama:** Intelligence Hub (134.199.161.125:5501)
- **Monitoring:** Prometheus + Grafana + Uptime Kuma

### Database Schema

**ThinAir Tables:**

```sql
-- User projects
CREATE TABLE thinair_projects (
  id VARCHAR(64) PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('vapor', 'condensing', 'mirage', 'materialising', 'manifest', 'deployed'),
  raw_context TEXT,
  intent_json TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Multi-modal inputs
CREATE TABLE thinair_inputs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id VARCHAR(64) NOT NULL,
  type ENUM('voice', 'text', 'image', 'pdf'),
  content TEXT,
  file_url VARCHAR(500),
  metadata TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES thinair_projects(id)
);

-- Generated artifacts
CREATE TABLE thinair_artifacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id VARCHAR(64) NOT NULL,
  type ENUM('code', 'docs', 'marketing'),
  filename VARCHAR(255) NOT NULL,
  content TEXT,
  file_url VARCHAR(500),
  status ENUM('generating', 'testing', 'failed', 'ready'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES thinair_projects(id)
);

-- Deployments
CREATE TABLE thinair_deployments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id VARCHAR(64) NOT NULL,
  app_url VARCHAR(500),
  marketing_url VARCHAR(500),
  docs_url VARCHAR(500),
  github_repo_url VARCHAR(500),
  status ENUM('pending', 'deploying', 'deployed', 'failed'),
  metadata TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES thinair_projects(id)
);

-- Vector embeddings
CREATE TABLE thinair_embeddings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id VARCHAR(64) NOT NULL,
  content TEXT NOT NULL,
  embedding TEXT,
  metadata TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES thinair_projects(id)
);
```

### API Endpoints (tRPC)

**Projects:**
- `projects.create` - Create new project
- `projects.list` - Get user's projects
- `projects.getById` - Get project details
- `projects.updateStatus` - Update project phase
- `projects.updateIntentJson` - Update Intent JSON

**Vapor:**
- `vapor.inhaleText` - Process text input
- `vapor.inhaleVoice` - Process voice input
- `vapor.inhaleImage` - Process image input
- `vapor.inhalePdf` - Process PDF input
- `vapor.getInputs` - Get all project inputs
- `vapor.uploadFile` - Upload file to storage
- `vapor.completeVapor` - Move to Condenser

**Condenser:**
- `condenser.generateIntentJson` - Create Intent JSON
- `condenser.answerQuestions` - Update with answers
- `condenser.validateIntent` - Validate completeness
- `condenser.completeCondenser` - Move to Mirage

**Mirage:**
- `mirage.getGraph` - Get graph data
- `mirage.updateGraph` - Update graph structure
- `mirage.validateGraph` - Check logical consistency
- `mirage.completeMirage` - Move to Materialiser

**Materialiser:**
- `materialiser.generateCode` - Start code generation
- `materialiser.getStatus` - Get generation status
- `materialiser.getArtifacts` - Get generated files
- `materialiser.completeMaterialiser` - Move to Manifest

**Manifest:**
- `manifest.deploy` - Start deployment
- `manifest.getStatus` - Get deployment status
- `manifest.getUrls` - Get deployed URLs
- `manifest.completeManifest` - Finish project

### Security

**Authentication:**
- NextAuth.js with JWT tokens
- SSO with Almost Magic Platform
- Secure cookie handling (HttpOnly, SameSite)
- Email verification required

**Data Protection:**
- TLS for all connections
- Encrypted storage (MinIO)
- Secure API endpoints
- Rate limiting (100 req/min per user)

**Credits Security:**
- Atomic transactions
- Transaction logging
- Fraud prevention
- Admin-only refunds

**Code Generation Security:**
- Sandboxed execution (isolated containers)
- Input validation (Zod schemas)
- Output sanitisation (XSS prevention)
- OWASP Top 10 compliance

---

## 📊 Success Metrics

### Technical Metrics
- **Uptime:** 99.9% (8.76 hours downtime/year)
- **Response Time:** < 2 seconds (API endpoints)
- **Code Generation:** < 5 minutes (average)
- **Test Coverage:** > 80% (generated code)
- **Deployment Success:** > 95% (first attempt)

### User Metrics
- **Time to First App:** < 10 minutes (average)
- **Success Rate:** > 90% (apps work as expected)
- **User Satisfaction:** > 4.5/5 stars
- **Repeat Usage:** > 70% (users create 2+ projects)

### Business Metrics
- **Credit Conversion:** > 50% (free → paid)
- **Retention:** > 70% (monthly active users)
- **Revenue per User:** $50-200/month (average)
- **Customer Acquisition Cost:** < $20

---

## 🚀 Go-to-Market Strategy

### Target Audiences

**1. Non-Technical Founders**
- **Pain:** Can't build their own product
- **Solution:** ThinAir builds it for them
- **Message:** "Stop waiting for developers. Build it yourself."

**2. Indie Hackers**
- **Pain:** Want to launch multiple MVPs quickly
- **Solution:** ThinAir accelerates MVP creation
- **Message:** "Launch 10 ideas in the time it takes to build 1."

**3. Agencies**
- **Pain:** Client projects take too long
- **Solution:** ThinAir generates initial codebases
- **Message:** "Deliver faster. Charge more. Scale infinitely."

**4. Enterprises**
- **Pain:** Internal tools are expensive to build
- **Solution:** ThinAir creates internal tools rapidly
- **Message:** "Automate your business operations in hours, not quarters."

### Marketing Channels

**1. Product Hunt Launch**
- **Goal:** 500+ upvotes, #1 Product of the Day
- **Assets:** Demo video, screenshots, testimonials
- **Timing:** Tuesday or Wednesday

**2. Content Marketing**
- **Blog:** "How to Build a SaaS in 10 Minutes"
- **YouTube:** Screen recordings of builds
- **Twitter:** Daily tips, success stories
- **LinkedIn:** Thought leadership

**3. Community Building**
- **Discord:** ThinAir community for users
- **Reddit:** r/nocode, r/SaaS, r/startups
- **Indie Hackers:** Share journey and metrics

**4. Partnerships**
- **No-Code Tools:** Integrate with Bubble, Webflow
- **Dev Tools:** Partner with Vercel, Supabase
- **Agencies:** White-label for agencies

**5. Paid Advertising**
- **Google Ads:** "Build app without coding"
- **Facebook/Instagram:** Target entrepreneurs
- **LinkedIn Ads:** Target CTOs, product managers

### Launch Timeline

**Week 1-2: Pre-Launch**
- Build waitlist landing page
- Create demo videos
- Reach out to beta testers
- Prepare Product Hunt assets

**Week 3: Soft Launch**
- Invite 100 beta users
- Collect feedback
- Fix critical bugs
- Refine messaging

**Week 4: Public Launch**
- Product Hunt launch
- Press release
- Social media blitz
- Email waitlist

**Month 2-3: Growth**
- Content marketing ramp-up
- Community building
- Partnership outreach
- Paid ads testing

**Month 4-6: Scale**
- Expand features
- Enterprise tier
- API access
- White-label offering

---

## 📈 Roadmap

### Phase 1: MVP (Current)
- ✅ Vapor (multi-modal input)
- ✅ Condenser (Intent JSON generation)
- ✅ Mirage (graph visualisation)
- ✅ Materialiser (code generation)
- ✅ Manifest (deployment)

### Phase 2: Enhancement (Q1 2026)
- [ ] More tech stacks (Vue, Angular, Django, Rails)
- [ ] Custom styling (upload design system)
- [ ] Team collaboration (multi-user projects)
- [ ] Version control (rollback to previous versions)
- [ ] Advanced testing (load testing, security scanning)

### Phase 3: Ecosystem (Q2 2026)
- [ ] Plugin marketplace (community extensions)
- [ ] Template library (pre-built app templates)
- [ ] API access (programmatic project creation)
- [ ] White-label (agencies rebrand ThinAir)
- [ ] Enterprise features (SSO, audit logs, SLA)

### Phase 4: Intelligence (Q3 2026)
- [ ] Learning from usage (improve over time)
- [ ] Predictive features (suggest improvements)
- [ ] Auto-scaling (optimise infrastructure)
- [ ] Cost optimisation (reduce cloud spend)
- [ ] Performance tuning (auto-optimise code)

---

## 🎯 Competitive Advantage

### vs. No-Code Tools (Bubble, Webflow, Adalo)

| Feature | ThinAir | No-Code Tools |
|---------|---------|---------------|
| **Speed** | 10-30 min | 2-4 weeks |
| **Flexibility** | Full code access | Limited customisation |
| **Learning Curve** | None | Days to weeks |
| **Cost** | $12-27 per app | $0-500/month |
| **Ownership** | Full code ownership | Locked into platform |
| **Scalability** | Unlimited | Platform limits |

**ThinAir Wins:** Faster, cheaper, more flexible, no lock-in

### vs. AI Code Generators (GitHub Copilot, Cursor, Replit)

| Feature | ThinAir | AI Code Generators |
|---------|---------|-------------------|
| **Scope** | Full app | Code snippets |
| **Deployment** | Automatic | Manual |
| **Testing** | Automated | Manual |
| **Marketing** | Generated | Manual |
| **Docs** | Generated | Manual |
| **Technical Skill** | None | High |

**ThinAir Wins:** End-to-end, no technical skill required

### vs. Traditional Development (Freelancers, Agencies)

| Feature | ThinAir | Traditional Dev |
|---------|---------|-----------------|
| **Time** | 10-30 min | 4-24 weeks |
| **Cost** | $12-27 | $5,000-500,000 |
| **Iterations** | Instant | Days to weeks |
| **Communication** | None | Heavy |
| **Ownership** | Immediate | After payment |
| **Maintenance** | Self-service | Ongoing costs |

**ThinAir Wins:** 100-1000x faster, 200-40,000x cheaper

---

## 💡 Use Cases

### 1. Marketplace Platforms
**Example:** FarmToTable (farmers ↔ restaurants)
**Time:** 15 minutes
**Cost:** $18
**Features:** Product listings, orders, payments, reviews, delivery tracking

### 2. SaaS Applications
**Example:** Project management tool
**Time:** 20 minutes
**Cost:** $22
**Features:** User auth, projects, tasks, team collaboration, notifications

### 3. Internal Tools
**Example:** Employee directory
**Time:** 10 minutes
**Cost:** $14
**Features:** Employee profiles, search, org chart, contact info

### 4. E-Commerce Stores
**Example:** Handmade crafts shop
**Time:** 18 minutes
**Cost:** $20
**Features:** Product catalogue, cart, checkout, order tracking, admin panel

### 5. Community Platforms
**Example:** Local events board
**Time:** 12 minutes
**Cost:** $16
**Features:** Event listings, RSVP, comments, user profiles, notifications

### 6. Booking Systems
**Example:** Salon appointment booking
**Time:** 15 minutes
**Cost:** $18
**Features:** Service listings, calendar, bookings, reminders, payments

### 7. CRM Systems
**Example:** Real estate lead tracker
**Time:** 20 minutes
**Cost:** $22
**Features:** Contact management, pipeline, tasks, email integration, reporting

### 8. Content Platforms
**Example:** Recipe sharing site
**Time:** 12 minutes
**Cost:** $16
**Features:** Recipe posts, search, categories, ratings, user profiles

---

## 🎬 Demo Script

### 30-Second Pitch

"I'm going to build a marketplace connecting farmers with restaurants—in 10 minutes. Watch."

**[Screen recording]**

1. **Vapor (1 min):** "Here's my idea..." [speaks into microphone]
2. **Condenser (2 min):** [AI generates Intent JSON, asks 2 questions]
3. **Mirage (2 min):** [Interactive graph appears, user adds "reviews" node]
4. **Materialiser (3 min):** [Code generates, tests run, 1 error auto-fixed]
5. **Manifest (2 min):** [Three URLs appear: app, marketing, docs]

**[Opens app]** "And it works. That's ThinAir."

### 5-Minute Demo

**Act 1: The Problem (30 sec)**
"Building software is slow and expensive. Months of planning, thousands of dollars, and you still might not get what you want. What if you could just... describe your idea and have it built?"

**Act 2: The Solution (30 sec)**
"Meet ThinAir. Speak your idea, sketch a diagram, or upload a document. ThinAir builds your app, tests it, deploys it, and even creates your marketing site. In minutes."

**Act 3: The Demo (3 min)**
[Live build of marketplace]
- Vapor: Voice input
- Condenser: Intent JSON generation
- Mirage: Graph editing
- Materialiser: Code generation + testing
- Manifest: Deployment

**Act 4: The Reveal (1 min)**
[Show three URLs]
- App: Fully functional marketplace
- Marketing: Professional landing page
- Docs: Complete documentation

"From idea to deployed business in 10 minutes. That's ThinAir."

---

## 📞 Call to Action

### For Potential Users

**Try ThinAir Today**
- **Free trial:** 100 credits (build 1-2 apps)
- **No credit card required**
- **Cancel anytime**

**Get Started:**
1. Sign up at thinair.almostmagic.net.au
2. Describe your idea (voice, text, or image)
3. Watch ThinAir build it
4. Deploy to production
5. Share with the world

### For Investors

**Investment Opportunity**
- **Market:** $167B software development market
- **Traction:** [To be updated post-launch]
- **Team:** Experienced AI/SaaS builders
- **Ask:** [To be determined]

**Contact:** invest@almostmagic.net.au

### For Partners

**Partnership Opportunities**
- **Agencies:** White-label ThinAir for clients
- **Platforms:** Integrate ThinAir into your workflow
- **Affiliates:** Earn 20% recurring commission

**Contact:** partners@almostmagic.net.au

---

## 📚 Appendix

### Glossary

**Vapor:** The input phase where raw ideas are captured  
**Condenser:** The AI reasoning phase that creates Intent JSON  
**Mirage:** The visual graph phase for editing structure  
**Materialiser:** The code generation phase with auto-testing  
**Manifest:** The deployment phase creating the business ecosystem  
**Intent JSON:** Structured representation of application requirements  
**Pre-Crime:** Automated testing and error-fixing before deployment  
**Credits:** Currency used to pay for ThinAir operations  

### FAQs

**Q: Do I need to know how to code?**  
A: No. ThinAir is designed for non-technical users.

**Q: What if I don't like the generated app?**  
A: You can edit the graph in Mirage phase and regenerate.

**Q: Can I customise the generated code?**  
A: Yes. Download the code and edit it yourself or hire a developer.

**Q: What tech stack does ThinAir use?**  
A: Next.js, React, tRPC, PostgreSQL, Tailwind CSS (customisable in future).

**Q: How long does it take?**  
A: 10-30 minutes depending on complexity.

**Q: What if the tests fail?**  
A: ThinAir auto-fixes errors up to 3 times. If still failing, you get a detailed error report.

**Q: Can I deploy to my own domain?**  
A: Yes. Configure custom domains in Manifest phase.

**Q: Is my code private?**  
A: Yes. Your code is stored in your private GitHub repo.

**Q: Can I get a refund?**  
A: Yes. If ThinAir fails to generate a working app, we refund your credits.

**Q: Do you offer enterprise plans?**  
A: Yes. Contact sales@almostmagic.net.au for custom pricing.

---

## 🎉 Conclusion

**ThinAir is not just a tool—it's a paradigm shift.**

We're moving from a world where software is built by developers to a world where software is materialised by thought. Where ideas don't die because they're "too hard to build." Where anyone with a vision can create, deploy, and scale a business in minutes.

**This is the future of software development.**  
**This is ThinAir.**

---

**Ready to create software out of Thin Air?**

👉 **[Start Building Now](https://thinair.almostmagic.net.au)**

---

**Document Version:** 1.0  
**Last Updated:** 20 November 2025  
**Contact:** hello@almostmagic.net.au  
**Website:** https://thinair.almostmagic.net.au
