# PROJECT MEMORY: Thin Air (The Zero-Spec Cognitive Foundry)
**Version:** 1.0 (Australian English)
**Status:** Phase 1 (Initialization)

## 1. The Core Vision
ThinAir transforms unstructured human thought into fully deployed software.
- **Tagline:** "Create software out of Thin Air."
- **Promise:** From napkin sketch to deployed application in minutes via a "Zero-Spec" pipeline.
- **Aesthetic:** Dark, ethereal, otherworldly (Deep charcoal #1a1a1a, Glowing blue #3b82f6).

## 2. The 5-Phase Transformation Pipeline
The application logic is strictly divided into these five phases:
1.  **Vapor (Ingestion):** Captures Voice (Whisper), Text, Images, and PDFs.
2.  **Condenser (Reasoning):** Uses **Gemini 2.0 Flash Thinking** to analyze requirements and generate an "Intent JSON".
3.  **Mirage (Visual):** An interactive node graph (React Flow) to edit the app structure bi-directionally.
4.  **Materialiser (Generation):** Uses **Gemini 2.0 Flash** to generate code, run it in a sandbox, test it (Playwright), and auto-fix errors ("Pre-Crime" simulation).
5.  **Manifest (Deployment):** Deploys to Vercel, creates a GitHub Repo, generates a Marketing Site, and generates Documentation.

## 3. Architecture: The Monorepo
We use a Monorepo structure (pnpm/Turbo) with the following applications:

### A. `apps/web` (The SaaS Platform)
- **Tech:** Next.js 14 (App Router), React 19, Tailwind 4.
- **Components:** shadcn/ui, Framer Motion.
- **State:** tRPC 11 + React Hooks.
- **Role:** The main interface for users to build their apps (The 5 Phases).

### B. `apps/server` (The API & Orchestrator)
- **Tech:** Express 4, tRPC 11.
- **Role:** Handles heavy AI orchestration (LangChain/LangGraph), File processing, and Deployment automation.
- **AI Models:**
    - **Gemini 3 Pro / 2.0 Flash Thinking:** For complex reasoning (Condenser).
    - **Gemini 2.0 Flash:** For high-volume code generation (Materialiser).
    - **Ollama:** Local fallback (Intelligence Hub).

### C. `apps/marketing` (Admin & Landing)
- **Role:** The public face of Thin Air and the Super-Admin Dashboard.
- **Features:** User management, Coupon/License management.

## 4. Database Schema (Postgres + Drizzle)
The core tables required:
- `thinair_projects`: Stores status (vapor, condensing, etc) and the `intent_json`.
- `thinair_inputs`: Stores multi-modal inputs (voice/text/image/pdf).
- `thinair_artifacts`: Stores generated code files and build status.
- `thinair_deployments`: Stores Vercel/GitHub URLs.
- `users`: Managed via NextAuth + SSO.

## 5. Infrastructure (The Intelligence Hub)
We connect to self-hosted services for cost optimization:
- **Database:** Postgres (Port 5300)
- **Cache:** Redis (Port 5301)
- **Storage:** MinIO (Port 5801)
- **Queues:** RabbitMQ (Port 5320)

## 6. Implementation Guidelines
- **Strict Typing:** All tRPC procedures must be strictly typed with Zod.
- **Accessibility:** WCAG 2.1 AA Compliant.
- **Localization:** Australian English spelling (Customise, Analyse).
