# Thin Air - Complete Build Instructions for Manus

**Version:** 1.0  
**Date:** 21 November 2025  
**Purpose:** Build Thin Air from scratch using crash-proof development process  
**Language:** Australian English

---

## 🎯 PROJECT OVERVIEW

**Project Name:** ThinAir  
**Tagline:** "Create software out of Thin Air."  
**Description:** Transform unstructured human thought into fully deployed, production-grade applications. From napkin sketch to deployed app in minutes.

**Core Value Proposition:** Users speak their idea, sketch a diagram, or describe their vision—ThinAir materializes it into complete software with marketing site and documentation, all deployed and ready to use.

---

## 📋 CRITICAL INSTRUCTIONS

**READ THIS FIRST - DO NOT SKIP**

### Mandatory Rules

1. **Test after EVERY change** - Run `pnpm test` after every code change
2. **Save checkpoint after EVERY phase** - Never lose work
3. **Get user approval after EVERY phase** - Don't proceed without permission
4. **Stop immediately on errors** - Revert to last checkpoint
5. **Report progress every 30 minutes** - Keep user informed
6. **Never skip steps** - Follow instructions exactly
7. **Use Australian English** - All copy, comments, documentation

### Quality Gates

**Code CANNOT proceed to next phase unless:**
- ✅ All tests passing (100%)
- ✅ TypeScript 0 errors
- ✅ Dev server running without crashes
- ✅ Manual testing complete
- ✅ Checkpoint saved
- ✅ User verified

### Communication Protocol

**After each phase:**
```
THIN AIR - PHASE [N] COMPLETE

Phase: [Phase Name]
Duration: [Hours]
Checkpoint: [Checkpoint ID]

Completed:
✅ [List all completed tasks]

Tests: [X]/[X] passing (100%)
TypeScript: 0 errors
Manual Testing: ✅ Verified

Next Phase: [Phase N+1 Name]
Estimated Time: [Hours]

Awaiting user approval to proceed.
```

---

## 🏗️ ARCHITECTURE OVERVIEW

### The Five-Phase Transformation Pipeline

```
Vapor → Condenser → Mirage → Materializer → Manifest
 💭       🧠          🌀          ⚙️           🚀
Input   Reasoning   Visual    Generate     Deploy
```

### Tech Stack

**Frontend:**
- React 19 + TypeScript
- Wouter (routing)
- Tailwind CSS 4
- shadcn/ui (components)
- React Flow (graph visualizations)
- Recharts (charts)
- Framer Motion (animations)
- Monaco Editor (code editor)

**Backend:**
- tRPC (type-safe API)
- Node.js
- Drizzle ORM
- PostgreSQL

**AI Services:**
- **Primary:** Gemini 3 Pro
  - API Key: `AIzaSyAlBuhpFHw4Dmpc8-ccLh8vrrJtdJoFrtU`
  - Context: 1M tokens input / 64k output
  - Thinking mode: Deep reasoning
- **Fallback:** ChatGPT (OpenAI GPT-4)
  - User will provide API key when needed
- **Voice:** Whisper API (OpenAI)

**Database:**
- PostgreSQL (via web-db-user template)

**Deployment:**
- Manus platform (built-in)

---

## 📊 DATABASE SCHEMA

### Create These Tables (in order)

**1. projects**
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'vapor',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);
```

**2. vapor_inputs**
```sql
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
```

**3. intents**
```sql
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
```

**4. simulations**
```sql
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
```

**5. code_artifacts**
```sql
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
```

**6. deployments**
```sql
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
```

---

## 🎨 DESIGN SYSTEM

### Color Palette (Dark Ethereal Theme)

**Add to `client/src/index.css`:**

```css
@layer base {
  :root {
    /* Base Colors - Dark Ethereal */
    --background: 210 100% 6%;  /* #0a1128 - Deep navy */
    --foreground: 210 40% 98%;  /* #e2e8f0 - Light text */
    
    --card: 222 47% 11%;  /* #0f172a - Navy card */
    --card-foreground: 210 40% 98%;
    
    --popover: 222 47% 11%;
    --popover-foreground: 210 40% 98%;
    
    --primary: 239 84% 67%;  /* #6366f1 - Purple */
    --primary-foreground: 210 40% 98%;
    
    --secondary: 217 33% 17%;  /* #1e293b - Navy secondary */
    --secondary-foreground: 210 40% 98%;
    
    --muted: 217 33% 17%;
    --muted-foreground: 215 20% 65%;  /* #94a3b8 - Muted text */
    
    --accent: 38 92% 50%;  /* #f59e0b - Gold accent */
    --accent-foreground: 222 47% 11%;
    
    --destructive: 0 84% 60%;
    --destructive-foreground: 210 40% 98%;
    
    --border: 217 33% 17%;
    --input: 217 33% 17%;
    --ring: 239 84% 67%;
    
    --radius: 0.5rem;
  }
}

/* Custom Animations */
@keyframes breathe {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(99, 102, 241, 0.6);
  }
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.animate-breathe {
  animation: breathe 3s ease-in-out infinite;
}

.animate-glow {
  animation: glow 2s ease-in-out infinite;
}

.animate-shimmer {
  animation: shimmer 2s linear infinite;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(99, 102, 241, 0.1) 50%,
    transparent 100%
  );
  background-size: 1000px 100%;
}
```

### Typography

**Add to `client/index.html`:**

```html
<!-- Google Fonts - Inter -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**Add to `client/src/index.css`:**

```css
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-family: 'Inter', sans-serif;
  }
}
```

---

## 🚀 PHASE 0: PROJECT SETUP

### Goal
Initialize project with foundation ready

### Duration
2 hours

### Tasks

**1. Initialize Project**
```bash
# Manus will use webdev_init_project tool
# Template: web-db-user
# Project Name: thinair
# Project Title: ThinAir - The Zero-Spec Cognitive Foundry
# Description: Transform unstructured human thought into fully deployed, production-grade applications. From napkin sketch to deployed app in minutes.
```

**2. Install Additional Dependencies**
```bash
pnpm add @google/generative-ai openai react-flow-renderer recharts framer-motion monaco-editor
pnpm add -D @types/react-flow-renderer
```

**3. Configure Environment Variables**

Create `.env` file:
```env
# Gemini API
GEMINI_API_KEY=AIzaSyAlBuhpFHw4Dmpc8-ccLh8vrrJtdJoFrtU

# OpenAI (fallback - user will provide)
OPENAI_API_KEY=

# Database (already configured by template)
DATABASE_URL=

# App Config
VITE_APP_TITLE=ThinAir - The Zero-Spec Cognitive Foundry
VITE_APP_LOGO=/logo.png
```

**4. Apply Dark Ethereal Theme**
- Update `client/src/index.css` with color palette above
- Add Google Fonts link to `client/index.html`
- Update `client/src/App.tsx` to use dark theme by default

**5. Create Database Schema**

Create `server/db/schema.ts` with all 6 tables (see DATABASE SCHEMA section above).

Run migration:
```bash
pnpm db:push
```

**6. Create AI Service Wrappers**

Create `server/services/gemini.ts`:
```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-3-pro",
  generationConfig: {
    maxOutputTokens: 64000,
    temperature: 0.7,
  },
});

export async function generateWithGemini(prompt: string) {
  try {
    const result = await geminiModel.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
}
```

Create `server/services/openai.ts`:
```typescript
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateWithChatGPT(prompt: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 4000,
    });
    return completion.choices[0].message.content || "";
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw error;
  }
}

export async function transcribeAudio(audioFile: File) {
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
    });
    return transcription.text;
  } catch (error) {
    console.error("Whisper API error:", error);
    throw error;
  }
}
```

Create `server/services/ai.ts` (unified interface with fallback):
```typescript
import { generateWithGemini } from "./gemini";
import { generateWithChatGPT } from "./openai";

export async function generateText(prompt: string): Promise<string> {
  try {
    // Try Gemini first
    return await generateWithGemini(prompt);
  } catch (geminiError) {
    console.warn("Gemini failed, falling back to ChatGPT:", geminiError);
    try {
      // Fallback to ChatGPT
      return await generateWithChatGPT(prompt);
    } catch (chatGPTError) {
      console.error("Both AI services failed:", chatGPTError);
      throw new Error("AI generation failed. Please try again.");
    }
  }
}
```

**7. Create Logo**

Add Almost Magic Tech Lab logo to `client/public/logo.png` (use provided image).

**8. Update App Title**

Update `client/src/const.ts`:
```typescript
export const APP_TITLE = "ThinAir - The Zero-Spec Cognitive Foundry";
export const APP_LOGO = "/logo.png";
```

**9. Write Tests**

Create `server/services/ai.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { generateText } from "./ai";

describe("AI Service", () => {
  it("should generate text with Gemini", async () => {
    const result = await generateText("Say 'Hello World'");
    expect(result).toContain("Hello");
  });
});
```

Run tests:
```bash
pnpm test
```

**Expected:** 1/1 tests passing

**10. Manual Testing**

```bash
pnpm dev
```

- Visit http://localhost:3000
- Verify dark theme applied
- Verify logo displays
- Verify no console errors

**11. Save Checkpoint**

```
Checkpoint: "ThinAir - Phase 0 - Project Setup Complete"
Description: "Project initialized with web-db-user template. Database schema created (6 tables). Gemini + ChatGPT configured. Dark ethereal theme applied. Tests: 1/1 passing. TypeScript: 0 errors."
```

### Success Criteria

- ✅ Project initialized
- ✅ All dependencies installed
- ✅ Database schema created (6 tables)
- ✅ Gemini API configured
- ✅ ChatGPT fallback configured
- ✅ Dark ethereal theme applied
- ✅ Logo added
- ✅ Tests passing (1/1)
- ✅ TypeScript 0 errors
- ✅ Dev server running
- ✅ Checkpoint saved

### Deliverable

Foundation ready for module development

---

## 🚀 PHASE 1: VAPOR MODULE (Idea Capture)

### Goal
Multi-modal input capture working

### Duration
4-6 hours

### Features to Implement

1. Voice recording + transcription
2. Text input (rich text editor)
3. Image upload + AI analysis
4. PDF upload + extraction
5. Input timeline visualization
6. Upload progress charts

### Tasks

**1. Create Database Router**

Create `server/routers/vapor.ts`:
```typescript
import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { vaporInputs, projects } from "../db/schema";
import { eq } from "drizzle-orm";
import { generateText } from "../services/ai";
import { transcribeAudio } from "../services/openai";

export const vaporRouter = router({
  uploadVoice: protectedProcedure
    .input(z.object({
      projectId: z.string().uuid(),
      audioFile: z.any(), // File upload
    }))
    .mutation(async ({ input, ctx }) => {
      // Transcribe audio with Whisper
      const transcription = await transcribeAudio(input.audioFile);
      
      // Store in database
      const [vaporInput] = await ctx.db.insert(vaporInputs).values({
        projectId: input.projectId,
        type: "voice",
        content: transcription,
        mediaUrl: null, // Or upload to S3
        metadata: { confidence: 0.95 },
      }).returning();
      
      return vaporInput;
    }),
  
  uploadText: protectedProcedure
    .input(z.object({
      projectId: z.string().uuid(),
      text: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const [vaporInput] = await ctx.db.insert(vaporInputs).values({
        projectId: input.projectId,
        type: "text",
        content: input.text,
        metadata: {},
      }).returning();
      
      return vaporInput;
    }),
  
  uploadImage: protectedProcedure
    .input(z.object({
      projectId: z.string().uuid(),
      imageFile: z.any(),
    }))
    .mutation(async ({ input, ctx }) => {
      // Upload image to S3 (use storagePut helper)
      // Analyze with Gemini Vision
      const analysis = await generateText(`Analyze this image and describe what you see in detail.`);
      
      const [vaporInput] = await ctx.db.insert(vaporInputs).values({
        projectId: input.projectId,
        type: "image",
        content: analysis,
        mediaUrl: "s3://...", // S3 URL
        metadata: {},
      }).returning();
      
      return vaporInput;
    }),
  
  uploadPDF: protectedProcedure
    .input(z.object({
      projectId: z.string().uuid(),
      pdfFile: z.any(),
    }))
    .mutation(async ({ input, ctx }) => {
      // Upload PDF to S3
      // Extract with Gemini Document Understanding
      const extraction = await generateText(`Extract all text and structure from this PDF.`);
      
      const [vaporInput] = await ctx.db.insert(vaporInputs).values({
        projectId: input.projectId,
        type: "pdf",
        content: extraction,
        mediaUrl: "s3://...",
        metadata: {},
      }).returning();
      
      return vaporInput;
    }),
  
  getInputs: protectedProcedure
    .input(z.object({
      projectId: z.string().uuid(),
    }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.query.vaporInputs.findMany({
        where: eq(vaporInputs.projectId, input.projectId),
        orderBy: (inputs, { desc }) => [desc(inputs.createdAt)],
      });
    }),
  
  deleteInput: protectedProcedure
    .input(z.object({
      id: z.string().uuid(),
    }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.delete(vaporInputs).where(eq(vaporInputs.id, input.id));
      return { success: true };
    }),
});
```

**2. Create Vapor Page**

Create `client/src/pages/Vapor.tsx`:
```typescript
import { useState } from "react";
import { useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, FileText, Image, FileUp } from "lucide-react";

export default function Vapor() {
  const { projectId } = useParams();
  const [activeInput, setActiveInput] = useState<string | null>(null);
  
  const { data: inputs, isLoading } = trpc.vapor.getInputs.useQuery({
    projectId: projectId!,
  });
  
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-bold mb-2">Vapor</h1>
        <p className="text-muted-foreground mb-8">
          Capture your ideas in any format
        </p>
        
        {/* Input Type Selector */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card
            className="p-6 cursor-pointer hover:border-primary transition-colors animate-breathe"
            onClick={() => setActiveInput("voice")}
          >
            <Mic className="w-8 h-8 mb-2 text-primary" />
            <h3 className="font-semibold">Voice</h3>
          </Card>
          
          <Card
            className="p-6 cursor-pointer hover:border-primary transition-colors"
            onClick={() => setActiveInput("text")}
          >
            <FileText className="w-8 h-8 mb-2 text-primary" />
            <h3 className="font-semibold">Text</h3>
          </Card>
          
          <Card
            className="p-6 cursor-pointer hover:border-primary transition-colors"
            onClick={() => setActiveInput("image")}
          >
            <Image className="w-8 h-8 mb-2 text-primary" />
            <h3 className="font-semibold">Image</h3>
          </Card>
          
          <Card
            className="p-6 cursor-pointer hover:border-primary transition-colors"
            onClick={() => setActiveInput("pdf")}
          >
            <FileUp className="w-8 h-8 mb-2 text-primary" />
            <h3 className="font-semibold">PDF</h3>
          </Card>
        </div>
        
        {/* Active Input Component */}
        {activeInput === "voice" && <VoiceRecorder projectId={projectId!} />}
        {activeInput === "text" && <TextEditor projectId={projectId!} />}
        {activeInput === "image" && <ImageUploader projectId={projectId!} />}
        {activeInput === "pdf" && <PDFUploader projectId={projectId!} />}
        
        {/* Input Timeline */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Input Timeline</h2>
          {inputs?.map((input) => (
            <Card key={input.id} className="p-4 mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-sm text-muted-foreground">{input.type}</span>
                  <p className="mt-1">{input.content?.substring(0, 200)}...</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    // Delete input
                  }}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**3. Create Input Components**

Create `client/src/components/VoiceRecorder.tsx`:
```typescript
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Mic, Square } from "lucide-react";
import { trpc } from "@/lib/trpc";

export function VoiceRecorder({ projectId }: { projectId: string }) {
  const [isRecording, setIsRecording] = useState(false);
  const uploadVoice = trpc.vapor.uploadVoice.useMutation();
  
  const startRecording = () => {
    // Implement MediaRecorder API
    setIsRecording(true);
  };
  
  const stopRecording = () => {
    // Stop recording and upload
    setIsRecording(false);
  };
  
  return (
    <Card className="p-8 text-center">
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
        <Mic className="w-12 h-12 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Voice Recording</h3>
      <p className="text-muted-foreground mb-6">
        Click to start recording your idea
      </p>
      <Button
        size="lg"
        onClick={isRecording ? stopRecording : startRecording}
        className={isRecording ? "animate-glow" : ""}
      >
        {isRecording ? (
          <>
            <Square className="w-4 h-4 mr-2" />
            Stop Recording
          </>
        ) : (
          <>
            <Mic className="w-4 h-4 mr-2" />
            Start Recording
          </>
        )}
      </Button>
    </Card>
  );
}
```

Create similar components for:
- `TextEditor.tsx` (textarea with markdown support)
- `ImageUploader.tsx` (drag-drop image upload)
- `PDFUploader.tsx` (PDF file upload)

**4. Add Route**

Update `client/src/App.tsx`:
```typescript
import Vapor from "./pages/Vapor";

// Add route
<Route path="/vapor/:projectId" component={Vapor} />
```

**5. Write Tests**

Create `server/routers/vapor.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
// Test all vapor endpoints
```

**6. Manual Testing**

- Create a test project
- Navigate to `/vapor/:projectId`
- Test voice recording
- Test text input
- Test image upload
- Test PDF upload
- Verify inputs appear in timeline
- Verify delete works

**7. Save Checkpoint**

```
Checkpoint: "ThinAir - Phase 1 - Vapor Module Complete"
Description: "Vapor module implemented with 4 input types (voice, text, image, PDF). All inputs stored in database. Timeline visualization working. Tests: X/X passing. TypeScript: 0 errors."
```

### Success Criteria

- ✅ Vapor page created
- ✅ Voice recording working
- ✅ Text input working
- ✅ Image upload working
- ✅ PDF upload working
- ✅ Inputs stored in database
- ✅ Timeline visualization working
- ✅ Delete functionality working
- ✅ Tests passing
- ✅ TypeScript 0 errors
- ✅ Manual testing complete
- ✅ Checkpoint saved

### Deliverable

Working Vapor module (idea capture)

---

## 🚀 PHASE 2: CONDENSER MODULE (Intent Extraction)

### Goal
AI-powered intent extraction working

### Duration
4-6 hours

### Features to Implement

1. Thinking Stream visualization
2. Entity extraction
3. Feature extraction (explicit + inferred)
4. Tech stack recommendation
5. Intent JSON editor
6. Confidence scores

### Tasks

**1. Create Condenser Router**

Create `server/routers/condenser.ts`:
```typescript
import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { intents, vaporInputs } from "../db/schema";
import { eq } from "drizzle-orm";
import { generateText } from "../services/ai";

export const condenserRouter = router({
  extractIntent: protectedProcedure
    .input(z.object({
      projectId: z.string().uuid(),
    }))
    .mutation(async ({ input, ctx }) => {
      // Get all vapor inputs
      const inputs = await ctx.db.query.vaporInputs.findMany({
        where: eq(vaporInputs.projectId, input.projectId),
      });
      
      // Combine all inputs into one prompt
      const combinedInput = inputs.map(i => i.content).join("\n\n");
      
      // Extract intent with Gemini
      const prompt = `
You are an expert software architect. Analyze the following user inputs and extract a structured Intent JSON.

User Inputs:
${combinedInput}

Extract:
1. Entities (users, products, services, data models)
2. Features (explicit - mentioned by user, inferred - needed but not mentioned)
3. Tech stack (recommend optimal technologies)
4. Missing information (questions to ask user)

Return a JSON object with this structure:
{
  "project_name": "...",
  "core_type": "...",
  "description": "...",
  "tech_stack": {...},
  "entities": [...],
  "features": [...],
  "flows": [...],
  "missing_info": [...]
}
`;
      
      const intentJSON = await generateText(prompt);
      
      // Store in database
      const [intent] = await ctx.db.insert(intents).values({
        projectId: input.projectId,
        intentJson: JSON.parse(intentJSON),
        confidence: 0.85,
      }).returning();
      
      return intent;
    }),
  
  getIntent: protectedProcedure
    .input(z.object({
      projectId: z.string().uuid(),
    }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.query.intents.findFirst({
        where: eq(intents.projectId, input.projectId),
        orderBy: (intents, { desc }) => [desc(intents.createdAt)],
      });
    }),
  
  updateIntent: protectedProcedure
    .input(z.object({
      id: z.string().uuid(),
      intentJson: z.any(),
    }))
    .mutation(async ({ input, ctx }) => {
      const [updated] = await ctx.db.update(intents)
        .set({ intentJson: input.intentJson, updatedAt: new Date() })
        .where(eq(intents.id, input.id))
        .returning();
      
      return updated;
    }),
});
```

**2. Create Condenser Page**

Create `client/src/pages/Condenser.tsx`:
```typescript
import { useState } from "react";
import { useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Loader2 } from "lucide-react";

export default function Condenser() {
  const { projectId } = useParams();
  const [isExtracting, setIsExtracting] = useState(false);
  
  const { data: intent, isLoading } = trpc.condenser.getIntent.useQuery({
    projectId: projectId!,
  });
  
  const extractIntent = trpc.condenser.extractIntent.useMutation({
    onSuccess: () => setIsExtracting(false),
  });
  
  const handleExtract = () => {
    setIsExtracting(true);
    extractIntent.mutate({ projectId: projectId! });
  };
  
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container max-w-6xl">
        <h1 className="text-4xl font-bold mb-2">Condenser</h1>
        <p className="text-muted-foreground mb-8">
          AI extracts structured intent from your inputs
        </p>
        
        {!intent && !isExtracting && (
          <Card className="p-12 text-center">
            <Brain className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-semibold mb-2">Ready to Extract Intent</h3>
            <p className="text-muted-foreground mb-6">
              AI will analyze your inputs and create a structured Intent JSON
            </p>
            <Button size="lg" onClick={handleExtract}>
              Start Extraction
            </Button>
          </Card>
        )}
        
        {isExtracting && (
          <Card className="p-12">
            <ThinkingStream />
          </Card>
        )}
        
        {intent && !isExtracting && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Intent JSON</h3>
              <IntentJSONEditor intent={intent} />
            </Card>
            
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Entities</h3>
                <EntityList entities={intent.intentJson.entities} />
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Features</h3>
                <FeatureList features={intent.intentJson.features} />
              </Card>
            </div>
            
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Tech Stack</h3>
              <TechStackDisplay stack={intent.intentJson.tech_stack} />
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
```

**3. Create Thinking Stream Component**

Create `client/src/components/ThinkingStream.tsx`:
```typescript
import { useEffect, useState } from "react";
import { Card } from "./ui/card";

export function ThinkingStream() {
  const [steps, setSteps] = useState<string[]>([]);
  
  useEffect(() => {
    // Simulate thinking steps
    const thinkingSteps = [
      "Analyzing user inputs...",
      "Extracting entities...",
      "Identifying explicit features...",
      "Inferring implicit features...",
      "Recommending tech stack...",
      "Detecting missing information...",
      "Generating Intent JSON...",
    ];
    
    thinkingSteps.forEach((step, index) => {
      setTimeout(() => {
        setSteps(prev => [...prev, step]);
      }, index * 2000);
    });
  }, []);
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">AI Thinking Stream</h3>
      {steps.map((step, index) => (
        <div
          key={index}
          className="flex items-center gap-3 animate-shimmer"
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-glow" />
          <span>{step}</span>
        </div>
      ))}
    </div>
  );
}
```

**4. Create Intent JSON Editor**

Create `client/src/components/IntentJSONEditor.tsx`:
```typescript
import { useState } from "react";
import { Button } from "./ui/button";
import { trpc } from "@/lib/trpc";

export function IntentJSONEditor({ intent }: { intent: any }) {
  const [json, setJson] = useState(JSON.stringify(intent.intentJson, null, 2));
  const updateIntent = trpc.condenser.updateIntent.useMutation();
  
  const handleSave = () => {
    updateIntent.mutate({
      id: intent.id,
      intentJson: JSON.parse(json),
    });
  };
  
  return (
    <div>
      <textarea
        className="w-full h-96 p-4 font-mono text-sm bg-muted rounded-lg"
        value={json}
        onChange={(e) => setJson(e.target.value)}
      />
      <Button className="mt-4" onClick={handleSave}>
        Save Changes
      </Button>
    </div>
  );
}
```

**5. Add Route**

Update `client/src/App.tsx`:
```typescript
import Condenser from "./pages/Condenser";

<Route path="/condenser/:projectId" component={Condenser} />
```

**6. Write Tests**

Test all condenser endpoints.

**7. Manual Testing**

- Navigate to `/condenser/:projectId`
- Click "Start Extraction"
- Verify Thinking Stream displays
- Verify Intent JSON generated
- Verify entities, features, tech stack displayed
- Test editing Intent JSON
- Verify save works

**8. Save Checkpoint**

```
Checkpoint: "ThinAir - Phase 2 - Condenser Module Complete"
Description: "Condenser module implemented. AI intent extraction working with Gemini (ChatGPT fallback). Thinking Stream visualization working. Intent JSON editable. Tests: X/X passing. TypeScript: 0 errors."
```

### Success Criteria

- ✅ Condenser page created
- ✅ Intent extraction working
- ✅ Thinking Stream visualization working
- ✅ Intent JSON generated
- ✅ Intent JSON editable
- ✅ Entities displayed
- ✅ Features displayed
- ✅ Tech stack displayed
- ✅ Tests passing
- ✅ TypeScript 0 errors
- ✅ Manual testing complete
- ✅ Checkpoint saved

### Deliverable

Working Condenser module (intent extraction)

---

## 🚀 PHASE 3-7: REMAINING MODULES

**Due to length constraints, I'm providing the structure. Full implementation follows the same pattern as Phases 1-2.**

### Phase 3: Mirage (Pre-Crime Simulation)
- React Flow graph visualization
- 3 scenarios (best, worst, most likely)
- Metrics dashboard
- Scenario comparison

### Phase 4: Materializer (Code Generation)
- Monaco Editor integration
- Multi-file code generation
- File tree navigation
- Code validation

### Phase 5: Manifest (Deployment)
- Deployment preview
- Environment variable config
- Deployment status tracking
- Deployed URL display

### Phase 6: Integration & Polish
- Navigation between modules
- Progress indicator
- Full workflow testing
- Animations and loading states

### Phase 7: Documentation
- README
- User guides
- Developer guides
- API documentation

---

## ✅ FINAL CHECKLIST

**Before Marking Complete:**

- [ ] All 5 modules working
- [ ] Full workflow tested (Vapor → Manifest)
- [ ] All tests passing (100%)
- [ ] TypeScript 0 errors
- [ ] Dark ethereal theme applied
- [ ] Animations working
- [ ] AI integrations working (Gemini + ChatGPT fallback)
- [ ] Database schema complete
- [ ] Documentation written
- [ ] Final checkpoint saved

---

## 🎯 SUCCESS METRICS

**Project Complete When:**
- ✅ User can capture ideas (Vapor)
- ✅ AI extracts intent (Condenser)
- ✅ User can simulate outcomes (Mirage)
- ✅ AI generates code (Materializer)
- ✅ User can deploy app (Manifest)
- ✅ All modules integrated
- ✅ Full workflow works end-to-end
- ✅ All tests passing
- ✅ Documentation complete

---

**Australian English. Crash-proof process. Production-ready Thin Air.** 🇦🇺
