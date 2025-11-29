# Thin Air - Complete Architecture & Implementation Plan

**Version:** 1.0  
**Date:** 21 November 2025  
**Project:** The Zero-Spec Cognitive Foundry  
**Language:** Australian English

---

## 🎯 EXECUTIVE SUMMARY

**Thin Air** transforms unstructured human thought into fully deployed, production-grade applications. Users speak their idea, sketch a diagram, or describe their vision—Thin Air materializes it into complete software with marketing site and documentation, all deployed and ready to use.

**Tagline:** "Create software out of Thin Air."

**Core Value:** From napkin sketch to deployed application in minutes, not months.

---

## 🏗️ SYSTEM ARCHITECTURE

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      THIN AIR PLATFORM                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐ │
│  │  VAPOR   │──▶│CONDENSER │──▶│  MIRAGE  │──▶│MATERIAL  │ │
│  │          │   │          │   │          │   │  IZER    │ │
│  │ Capture  │   │ Extract  │   │ Simulate │   │ Generate │ │
│  │  Ideas   │   │ Intent   │   │ Outcomes │   │   Code   │ │
│  └──────────┘   └──────────┘   └──────────┘   └──────────┘ │
│       │              │              │              │         │
│       └──────────────┴──────────────┴──────────────┘         │
│                          │                                    │
│                    ┌──────────┐                              │
│                    │ MANIFEST │                              │
│                    │          │                              │
│                    │  Deploy  │                              │
│                    └──────────┘                              │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                    CORE SERVICES LAYER                        │
├─────────────────────────────────────────────────────────────┤
│  Gemini 3 Pro  │  PostgreSQL  │  tRPC API  │  Auth  │  Storage│
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 DATABASE SCHEMA

### Tables

**1. projects**
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'vapor', -- vapor, condenser, mirage, materializer, manifest, deployed
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**2. vapor_inputs**
```sql
CREATE TABLE vapor_inputs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- voice, text, image, pdf
  content TEXT, -- transcribed text or extracted content
  media_url TEXT, -- S3 URL for images/PDFs/audio
  metadata JSONB, -- {confidence, duration, file_size, etc}
  processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**3. intents**
```sql
CREATE TABLE intents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  intent_json JSONB NOT NULL, -- Complete Intent JSON
  confidence FLOAT, -- 0.0-1.0
  version INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**4. simulations**
```sql
CREATE TABLE simulations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  intent_id UUID REFERENCES intents(id),
  scenario VARCHAR(100), -- best_case, worst_case, most_likely
  graph_data JSONB, -- React Flow graph nodes/edges
  metrics JSONB, -- {cost, time, complexity, risk}
  created_at TIMESTAMP DEFAULT NOW()
);
```

**5. code_artifacts**
```sql
CREATE TABLE code_artifacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  intent_id UUID REFERENCES intents(id),
  file_path VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  language VARCHAR(50), -- typescript, python, sql, etc
  metadata JSONB, -- {lines, size, dependencies}
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**6. deployments**
```sql
CREATE TABLE deployments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  url VARCHAR(500), -- Deployed application URL
  status VARCHAR(50), -- pending, deploying, success, failed
  logs TEXT,
  metadata JSONB, -- {platform, region, cost}
  deployed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🎨 DESIGN SYSTEM

### Color Palette (Dark Ethereal Theme)

```css
:root {
  /* Base Colors */
  --navy-950: #0a1128;
  --navy-900: #0f172a;
  --navy-800: #1e293b;
  
  /* Accent Colors */
  --purple-500: #6366f1;
  --purple-600: #4f46e5;
  --blue-400: #60a5fa;
  --gold-500: #f59e0b;
  
  /* Semantic Colors */
  --background: var(--navy-950);
  --surface: var(--navy-900);
  --border: var(--navy-800);
  --primary: var(--purple-500);
  --accent: var(--gold-500);
  --text: #e2e8f0;
  --text-muted: #94a3b8;
}
```

### Typography

```css
/* Primary Font: Inter (clean, modern) */
font-family: 'Inter', sans-serif;

/* Headings */
h1: 3rem (48px), font-weight: 700
h2: 2.25rem (36px), font-weight: 600
h3: 1.875rem (30px), font-weight: 600
h4: 1.5rem (24px), font-weight: 500

/* Body */
body: 1rem (16px), font-weight: 400
small: 0.875rem (14px), font-weight: 400
```

### Animations

```css
/* Breathing Animation (Vapor page) */
@keyframes breathe {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}

/* Glow Effect */
@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
  50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.6); }
}

/* Shimmer (loading states) */
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}
```

---

## 🔧 TECH STACK

### Frontend
- **Framework:** React 19 + TypeScript
- **Routing:** Wouter (lightweight)
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui
- **State Management:** React Context + tRPC
- **Visualizations:**
  - React Flow (graph diagrams)
  - Recharts (charts/analytics)
- **Animations:** Framer Motion
- **Icons:** Lucide React

### Backend
- **API:** tRPC (type-safe)
- **Runtime:** Node.js
- **Database ORM:** Drizzle
- **Authentication:** Built-in (web-db-user template)
- **File Storage:** S3 (via template helpers)

### Database
- **Primary:** PostgreSQL
- **Schema Management:** Drizzle Kit

### AI Services
- **Primary:** Gemini 3 Pro
  - Context: 1M tokens input / 64k output
  - Thinking mode: Deep reasoning
  - Vision: High resolution (1120 tokens)
- **Fallback:** ChatGPT (OpenAI GPT-4)
- **Voice:** Whisper API (transcription)

### Deployment
- **Platform:** Manus (built-in)
- **CDN:** Automatic (Manus handles)
- **SSL:** Automatic (Manus handles)

---

## 📦 MODULE SPECIFICATIONS

### Module 1: VAPOR (Idea Capture)

**Purpose:** Multi-modal input capture

**Features:**
- Voice recording + transcription (Whisper API)
- Text input (rich text editor with markdown)
- Image upload + analysis (Gemini Vision)
- PDF upload + extraction (Gemini Document Understanding)
- Real-time upload progress (Recharts)
- Session timeline visualization
- Input type distribution (pie chart)

**UI Components:**
- `VaporPage.tsx` - Main page
- `VoiceRecorder.tsx` - Voice input component
- `TextEditor.tsx` - Text input component
- `ImageUploader.tsx` - Image upload component
- `PDFUploader.tsx` - PDF upload component
- `InputTimeline.tsx` - Visual timeline
- `UploadProgress.tsx` - Progress visualization

**tRPC Endpoints:**
- `vapor.uploadVoice` - Upload voice recording
- `vapor.uploadText` - Save text input
- `vapor.uploadImage` - Upload image
- `vapor.uploadPDF` - Upload PDF
- `vapor.getInputs` - Get all inputs for project
- `vapor.deleteInput` - Delete input

**Database:**
- Stores in `vapor_inputs` table
- Media files stored in S3

---

### Module 2: CONDENSER (Intent Extraction)

**Purpose:** Transform raw inputs into structured Intent JSON

**Features:**
- "Thinking Stream" visualization (not progress bar)
- Real-time AI reasoning display
- Entity extraction
- Feature extraction (explicit + inferred)
- Tech stack recommendation
- Missing information detection
- Intent JSON editor (user can refine)
- Confidence scores for all extractions

**UI Components:**
- `CondenserPage.tsx` - Main page
- `ThinkingStream.tsx` - AI reasoning visualization
- `IntentJSONEditor.tsx` - JSON editor with syntax highlighting
- `EntityList.tsx` - Extracted entities display
- `FeatureList.tsx` - Extracted features display
- `TechStackDisplay.tsx` - Recommended stack
- `MissingInfoPrompt.tsx` - Questions for user

**tRPC Endpoints:**
- `condenser.extractIntent` - Run AI extraction
- `condenser.getIntent` - Get Intent JSON
- `condenser.updateIntent` - Update Intent JSON
- `condenser.validateIntent` - Validate completeness

**AI Integration:**
- Gemini 3 Pro with thinking mode
- Multi-step reasoning chain
- Fallback to ChatGPT if Gemini fails

**Database:**
- Stores in `intents` table
- Versioned (can track changes)

---

### Module 3: MIRAGE (Pre-Crime Simulation)

**Purpose:** Simulate outcomes before building

**Features:**
- React Flow graph visualization
- 3 scenarios: Best Case, Worst Case, Most Likely
- Interactive node exploration
- Metrics dashboard (cost, time, complexity, risk)
- Scenario comparison
- Decision tree visualization
- Risk assessment

**UI Components:**
- `MiragePage.tsx` - Main page
- `SimulationGraph.tsx` - React Flow graph
- `ScenarioSelector.tsx` - Switch between scenarios
- `MetricsDashboard.tsx` - Charts showing metrics
- `RiskAssessment.tsx` - Risk breakdown
- `ComparisonView.tsx` - Side-by-side scenarios

**tRPC Endpoints:**
- `mirage.simulate` - Run simulation
- `mirage.getSimulations` - Get all simulations
- `mirage.compareScenarios` - Compare scenarios

**AI Integration:**
- Gemini 3 Pro for outcome prediction
- Graph generation from Intent JSON
- Risk analysis

**Database:**
- Stores in `simulations` table
- Graph data as JSONB

---

### Module 4: MATERIALIZER (Code Generation)

**Purpose:** Generate production-ready code

**Features:**
- Multi-file code generation
- Syntax highlighting (Monaco Editor)
- File tree navigation
- Code preview
- Code editing (user can modify)
- Code validation (TypeScript, ESLint)
- Dependency detection
- Download as ZIP

**UI Components:**
- `MaterializerPage.tsx` - Main page
- `CodeEditor.tsx` - Monaco Editor integration
- `FileTree.tsx` - File navigation
- `CodePreview.tsx` - Read-only preview
- `ValidationResults.tsx` - Errors/warnings display
- `DependencyList.tsx` - Package.json preview

**tRPC Endpoints:**
- `materializer.generateCode` - Generate all files
- `materializer.getFiles` - Get all code files
- `materializer.updateFile` - Update single file
- `materializer.validateCode` - Run validation
- `materializer.downloadZIP` - Get ZIP archive

**AI Integration:**
- Gemini 3 Pro for code generation
- Intent JSON → Full codebase
- Generates:
  - Frontend (React components)
  - Backend (tRPC routers)
  - Database (Drizzle schema)
  - Config files (package.json, tsconfig.json, etc)
  - Documentation (README.md)

**Database:**
- Stores in `code_artifacts` table
- One row per file

---

### Module 5: MANIFEST (Deployment)

**Purpose:** Deploy generated application

**Features:**
- Deployment preview (what will be deployed)
- Environment variable configuration
- Deployment status tracking
- Real-time logs
- Deployed URL display
- Rollback functionality
- Deployment history

**UI Components:**
- `ManifestPage.tsx` - Main page
- `DeploymentPreview.tsx` - Preview before deploy
- `EnvVarConfig.tsx` - Environment variables
- `DeploymentStatus.tsx` - Status tracker
- `DeploymentLogs.tsx` - Log viewer
- `DeployedAppCard.tsx` - Link to deployed app
- `DeploymentHistory.tsx` - Past deployments

**tRPC Endpoints:**
- `manifest.deploy` - Trigger deployment
- `manifest.getDeployment` - Get deployment status
- `manifest.getLogs` - Get deployment logs
- `manifest.rollback` - Rollback to previous version

**Deployment Strategy:**
- Package code as ZIP
- Upload to deployment service (Vercel/Railway)
- Configure environment variables
- Monitor deployment
- Return deployed URL

**Database:**
- Stores in `deployments` table
- Logs stored as TEXT

---

## 🔐 AUTHENTICATION & AUTHORIZATION

**Template:** web-db-user (includes built-in auth)

**Features:**
- User registration
- User login
- Session management
- Password hashing (bcrypt)
- User profile
- Multi-user support

**Authorization:**
- Users can only access their own projects
- All tRPC endpoints check `ctx.user.id`
- Database queries filtered by `user_id`

---

## 💾 FILE STORAGE

**Strategy:** S3 (via template helpers)

**Stored Files:**
- Voice recordings (`.mp3`, `.wav`)
- Images (`.png`, `.jpg`, `.jpeg`)
- PDFs (`.pdf`)
- Generated code (ZIP archives)

**Helpers:**
- `storagePut(key, data, contentType)` - Upload
- `storageGet(key, expiresIn)` - Get presigned URL

---

## 🎯 API INTEGRATION

### Gemini 3 Pro

**Configuration:**
```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-3-pro",
  generationConfig: {
    maxOutputTokens: 64000,
    temperature: 0.7,
  },
});
```

**Usage:**
- Intent extraction (Condenser)
- Image analysis (Vapor)
- PDF extraction (Vapor)
- Simulation (Mirage)
- Code generation (Materializer)

### ChatGPT Fallback

**Configuration:**
```typescript
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
```

**Usage:**
- Fallback when Gemini fails
- Same prompts, different API

### Whisper API

**Configuration:**
```typescript
// Use OpenAI Whisper
const transcription = await openai.audio.transcriptions.create({
  file: audioFile,
  model: "whisper-1",
});
```

**Usage:**
- Voice transcription (Vapor)

---

## 📱 NAVIGATION & ROUTING

**Routes:**
```typescript
/                    → Home (landing page)
/vapor/:projectId    → Vapor module
/condenser/:projectId → Condenser module
/mirage/:projectId   → Mirage module
/materializer/:projectId → Materializer module
/manifest/:projectId → Manifest module
/projects            → Project list
/projects/:id        → Project detail
/about               → About page
/pricing             → Pricing page
```

**Navigation Flow:**
```
Home → Create Project → Vapor → Condenser → Mirage → Materializer → Manifest → Deployed App
```

**Progress Indicator:**
- Visual stepper showing current phase
- Completed phases marked green
- Current phase highlighted
- Future phases greyed out

---

## 🧪 TESTING STRATEGY

**Unit Tests:**
- All tRPC routers
- All service functions
- All utility functions

**Integration Tests:**
- Full workflow (Vapor → Manifest)
- AI integration (Gemini, ChatGPT)
- File upload/download

**E2E Tests:**
- User can create project
- User can upload inputs
- User can generate code
- User can deploy app

**Testing Tools:**
- Vitest (unit + integration)
- Playwright (E2E)

---

## 📈 ANALYTICS & MONITORING

**Metrics to Track:**
- Projects created
- Inputs uploaded (by type)
- Intents generated
- Simulations run
- Code generated
- Deployments successful/failed
- Average time per phase
- User retention

**Tools:**
- Built-in analytics (Manus)
- Custom events via tRPC

---

## 🚀 DEPLOYMENT CHECKLIST

**Before Deployment:**
- [ ] All tests passing
- [ ] TypeScript 0 errors
- [ ] Environment variables set
- [ ] Database migrations applied
- [ ] S3 bucket configured
- [ ] Gemini API key set
- [ ] ChatGPT API key set (fallback)
- [ ] Whisper API configured
- [ ] Marketing pages complete
- [ ] Documentation written

**After Deployment:**
- [ ] Test deployed app
- [ ] Verify all modules work
- [ ] Check analytics tracking
- [ ] Monitor error logs
- [ ] Test AI integrations
- [ ] Verify file uploads
- [ ] Test full workflow

---

## 💰 PRICING MODEL

**Credits System:**
- Quick analysis: 10 credits per input
- Full project: 100-500 credits (based on complexity)
- Deployment: 50 credits per deployment

**Subscription Tiers:**
- **Free:** 100 credits/month
- **Pro:** $49/month (1000 credits)
- **Enterprise:** $249/month (unlimited credits)

---

## 📚 DOCUMENTATION STRUCTURE

**User Guides:**
- Getting Started
- Vapor: Capturing Ideas
- Condenser: Understanding Intent
- Mirage: Simulating Outcomes
- Materializer: Generating Code
- Manifest: Deploying Apps
- FAQ

**Developer Guides:**
- Architecture Overview
- Database Schema
- API Reference (tRPC)
- AI Integration
- Deployment Guide
- Contributing

---

## 🎯 SUCCESS METRICS

**Phase 0 Complete When:**
- ✅ Project initialized
- ✅ Database schema created
- ✅ Gemini API configured
- ✅ ChatGPT fallback configured
- ✅ Dark ethereal theme applied
- ✅ Checkpoint saved

**Phase 1 Complete When:**
- ✅ Vapor page working
- ✅ All 4 input types working (voice, text, image, PDF)
- ✅ Files uploaded to S3
- ✅ Timeline visualization working
- ✅ Tests passing
- ✅ Checkpoint saved

**Phase 2 Complete When:**
- ✅ Condenser page working
- ✅ Intent extraction working
- ✅ Thinking Stream visualization working
- ✅ Intent JSON editable
- ✅ Tests passing
- ✅ Checkpoint saved

**Phase 3 Complete When:**
- ✅ Mirage page working
- ✅ React Flow graph working
- ✅ 3 scenarios generated
- ✅ Metrics dashboard working
- ✅ Tests passing
- ✅ Checkpoint saved

**Phase 4 Complete When:**
- ✅ Materializer page working
- ✅ Code generation working
- ✅ Monaco Editor integrated
- ✅ File tree navigation working
- ✅ Code validation working
- ✅ Tests passing
- ✅ Checkpoint saved

**Phase 5 Complete When:**
- ✅ Manifest page working
- ✅ Deployment working
- ✅ Logs displayed
- ✅ Deployed URL returned
- ✅ Tests passing
- ✅ Checkpoint saved

**Phase 6 Complete When:**
- ✅ All modules integrated
- ✅ Navigation working
- ✅ Progress indicator working
- ✅ Full workflow tested
- ✅ Polish applied (animations, loading states)
- ✅ Tests passing
- ✅ Checkpoint saved

**Phase 7 Complete When:**
- ✅ README written
- ✅ User guides written
- ✅ Developer guides written
- ✅ API documentation complete
- ✅ Demo video created
- ✅ Final checkpoint saved

---

## 🔄 DEVELOPMENT WORKFLOW

**For Each Phase:**
1. Create feature branch
2. Implement features (one sub-task at a time)
3. Write tests
4. Run tests (must pass 100%)
5. Run TypeScript check (must be 0 errors)
6. Manual testing
7. Save checkpoint
8. Get user verification
9. Move to next phase

**Checkpoint Naming:**
```
ThinAir - Phase [N] - [Module Name] Complete
```

**Example:**
```
ThinAir - Phase 1 - Vapor Module Complete
```

---

## ✅ READY TO BUILD

This architecture plan provides:
- Complete database schema
- All 5 module specifications
- Tech stack decisions
- Design system
- API integrations
- Testing strategy
- Deployment checklist
- Success metrics

**Next Step:** Initialize project with `webdev_init_project`

---

**Australian English. Comprehensive architecture. Production-ready plan.** 🇦🇺
