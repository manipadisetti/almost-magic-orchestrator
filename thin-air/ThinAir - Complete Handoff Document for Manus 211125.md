# ThinAir - Complete Handoff Document for Manus

**Version:** 1.0  
**Date:** 21 November 2025  
**Purpose:** Complete specification for building ThinAir from scratch  
**Language:** Australian English  
**Author:** Manus AI

---

## 🎯 Executive Summary

**ThinAir** transforms unstructured human thought into fully deployed, production-grade applications. Users speak their idea, sketch a diagram, or describe their vision—ThinAir materialises it into complete software with marketing site and documentation, all deployed and ready to use.

**Tagline:** "Create software out of Thin Air."

**Core Value Proposition:** From napkin sketch to deployed application in minutes, not months.

**Target Users:** Entrepreneurs, product managers, founders, and innovators who have ideas but lack technical implementation resources.

---

## 🏗️ System Architecture

### The Five-Phase Transformation Pipeline

ThinAir processes user input through five distinct phases, each building upon the previous:

\`\`\`
Vapor → Condenser → Mirage → Materializer → Manifest
 💭       🧠          🌀          ⚙️           🚀
Input   Reasoning   Visual    Generate     Deploy
\`\`\`

**Phase 1: Vapor (Multi-Modal Input Capture)**
- Accepts voice recordings, text descriptions, sketches, PDFs, and diagrams
- Transcribes audio using Whisper API
- Extracts text from images and PDFs using OCR
- Stores all inputs in \`vapor_inputs\` table
- Provides real-time feedback to user during capture

**Phase 2: Condenser (Intent Extraction & Reasoning)**
- Uses Gemini 3 Pro with 1M token context window
- Deep reasoning mode enabled for complex analysis
- Extracts structured intent from unstructured inputs
- Generates Intent JSON with complete specification
- Stores in \`intents\` table with confidence scores

**Phase 3: Mirage (Visual Simulation & Forecasting)**
- Creates interactive visualisations using React Flow
- Simulates three scenarios: best case, worst case, most likely
- Generates metrics: cost, time, complexity, risk
- Allows user to explore trade-offs visually
- Stores simulation data in \`simulations\` table

**Phase 4: Materializer (Code Generation)**
- Generates complete application code from Intent JSON
- Creates frontend (React + TypeScript + Tailwind)
- Creates backend (tRPC + PostgreSQL + Drizzle ORM)
- Generates marketing website
- Generates documentation
- Stores all artifacts in \`code_artifacts\` table

**Phase 5: Manifest (Deployment)**
- Deploys to Manus platform automatically
- Provisions database and services
- Configures DNS and SSL certificates
- Runs tests and health checks
- Provides live URL to user
- Stores deployment metadata in \`deployments\` table

---

## 🔑 CRITICAL API CREDENTIALS

### Gemini 3 Pro (Primary AI Service)

**API Key:** \`AIzaSyAlBuhpFHw4Dmpc8-ccLh8vrrJtdJoFrtU\`

**Configuration:**
- Model: \`gemini-3.0-pro\`
- Context window: 1M tokens input / 64k tokens output
- Thinking mode: Deep reasoning enabled
- Temperature: 0.7 (balanced creativity and consistency)

### Almost Magic Platform SSO

**Integration:** YES - Integrate with existing Almost Magic Platform SSO
- OAuth 2.0 flow with JWT tokens
- User profile includes: \`user_id\`, \`email\`, \`name\`, \`avatar_url\`, \`subscription_tier\`

### Stripe (Full Credit System)

**Credit Pricing:**
- 1 credit = $1 AUD
- Vapor phase: 5 credits
- Condenser phase: 10 credits
- Mirage phase: 5 credits
- Materializer phase: 20 credits
- Manifest phase: 10 credits
- **Total per project: 50 credits = $50 AUD**

---

## 📊 COMPLETE DATABASE SCHEMA

### Table Creation Order (CRITICAL - Follow Exactly)

**1. projects**
\`\`\`sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'vapor',
  last_activity_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_last_activity ON projects(last_activity_at);
\`\`\`

**2. vapor_inputs**
\`\`\`sql
CREATE TABLE vapor_inputs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  content TEXT,
  media_url TEXT,
  metadata JSONB,
  processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_vapor_inputs_project_id ON vapor_inputs(project_id);
CREATE INDEX idx_vapor_inputs_type ON vapor_inputs(type);
\`\`\`

**3. intents**
\`\`\`sql
CREATE TABLE intents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  intent_json JSONB NOT NULL,
  confidence FLOAT,
  version INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_intents_project_id ON intents(project_id);
\`\`\`

**4. simulations**
\`\`\`sql
CREATE TABLE simulations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  intent_id UUID REFERENCES intents(id),
  scenario VARCHAR(100),
  graph_data JSONB,
  metrics JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_simulations_project_id ON simulations(project_id);
CREATE INDEX idx_simulations_scenario ON simulations(scenario);
\`\`\`

**5. code_artifacts**
\`\`\`sql
CREATE TABLE code_artifacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  intent_id UUID REFERENCES intents(id),
  file_path VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  language VARCHAR(50),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_code_artifacts_project_id ON code_artifacts(project_id);
CREATE INDEX idx_code_artifacts_language ON code_artifacts(language);
\`\`\`

**6. deployments**
\`\`\`sql
CREATE TABLE deployments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  url VARCHAR(500),
  status VARCHAR(50),
  logs TEXT,
  metadata JSONB,
  deployed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_deployments_project_id ON deployments(project_id);
CREATE INDEX idx_deployments_status ON deployments(status);
\`\`\`

---

## 🎨 DESIGN SYSTEM (Dark Ethereal Theme)

### Add to \`client/src/index.css\`:

\`\`\`css
@layer base {
  :root {
    --background: 210 100% 6%;
    --foreground: 210 40% 98%;
    --card: 222 47% 11%;
    --card-foreground: 210 40% 98%;
    --primary: 239 84% 67%;
    --primary-foreground: 210 40% 98%;
    --accent: 38 92% 50%;
    --accent-foreground: 222 47% 11%;
    --border: 217 33% 17%;
    --radius: 0.5rem;
  }
}

@keyframes breathe {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
  50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.6); }
}

.animate-breathe { animation: breathe 3s ease-in-out infinite; }
.animate-glow { animation: glow 2s ease-in-out infinite; }
\`\`\`

### Typography

**Font:** Inter (Google Fonts)

Add to \`client/index.html\`:
\`\`\`html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
\`\`\`

---

## 📋 30-DAY AUTO-DELETION FEATURE

**Implementation:**

1. \`last_activity_at\` column already added to projects table
2. Update on every project interaction:
\`\`\`typescript
await db.update(projects)
  .set({ last_activity_at: new Date() })
  .where(eq(projects.id, projectId));
\`\`\`

3. Create \`server/jobs/cleanup.ts\`:
\`\`\`typescript
export async function deleteInactiveProjects() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const inactiveProjects = await db.query.projects.findMany({
    where: lt(projects.last_activity_at, thirtyDaysAgo),
  });

  for (const project of inactiveProjects) {
    await db.delete(projects).where(eq(projects.id, project.id));
  }

  return { deletedCount: inactiveProjects.length };
}
\`\`\`

4. Schedule in \`server/index.ts\`:
\`\`\`typescript
setInterval(async () => {
  await deleteInactiveProjects();
}, 24 * 60 * 60 * 1000); // Daily
\`\`\`

---

## 🎯 PRIORITY BUILD ORDER

1. **Phase 0:** Project setup + database schema
2. **Phase 1:** Vapor module (multi-modal input capture)
3. **Marketing website** (at least home page)
4. **Phase 2:** Condenser module (intent extraction)
5. **Phase 3:** Mirage module (visual simulation)
6. **Phase 4:** Materializer module (code generation)
7. **Phase 5:** Manifest module (deployment)

---

## ✅ QUALITY STANDARDS

**Mandatory Rules:**
1. Test after EVERY change (\`pnpm test\`)
2. Save checkpoint after EVERY phase
3. Get user approval after EVERY phase
4. Use Australian English throughout
5. TypeScript 0 errors
6. 100% tests passing

**Communication Protocol:**
\`\`\`
THIN AIR - PHASE [N] COMPLETE

Phase: [Name]
Checkpoint: [ID]
Tests: [X]/[X] passing
TypeScript: 0 errors

Awaiting user approval.
\`\`\`

---

## 📦 DEPENDENCIES TO INSTALL

\`\`\`json
{
  "dependencies": {
    "@google/generative-ai": "^0.1.3",
    "openai": "^4.20.0",
    "react-flow-renderer": "^10.3.17",
    "recharts": "^2.10.0",
    "framer-motion": "^10.16.0",
    "@monaco-editor/react": "^4.6.0",
    "tesseract.js": "^5.0.0",
    "pdf-parse": "^1.1.1"
  }
}
\`\`\`

---

## 🚀 DEPLOYMENT

**Template:** \`web-db-user\`

**Environment Variables:**
\`\`\`bash
GEMINI_API_KEY=AIzaSyAlBuhpFHw4Dmpc8-ccLh8vrrJtdJoFrtU
OPENAI_API_KEY=<user_will_provide>
SSO_AUTH_URL=<user_will_provide>
STRIPE_SECRET_KEY=<user_will_provide>
\`\`\`

---

## 📝 SUMMARY FOR MANUS

This document contains EVERYTHING needed to build ThinAir:

✅ Complete 5-phase architecture  
✅ Database schema (6 tables, copy-paste ready)  
✅ API credentials (Gemini, Whisper, SSO, Stripe)  
✅ Design system (Dark Ethereal theme)  
✅ 30-day auto-deletion feature  
✅ Quality standards & testing requirements  
✅ Priority build order  

**Estimated Build Time:** 20-30 hours

**Key Integration:** Almost Magic Platform SSO + Full Stripe credit system

Good luck! 🚀

---

**Document Version:** 1.0  
**Last Updated:** 21 November 2025  
**Author:** Manus AI  
**Language:** Australian English
