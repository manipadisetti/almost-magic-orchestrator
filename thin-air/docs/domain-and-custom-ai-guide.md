# Thin Air - Domain Setup & Custom AI Models Guide

## 🌐 Free Domain Setup (is-a-dev)

### What is is-a-dev?

**is-a-dev** is a free subdomain service for developers. You can get a professional domain like `am-thinair.is-a.dev` or `am-yourapp.is-a.dev` completely free!

**Benefits:**
- ✅ Free forever
- ✅ Professional subdomain
- ✅ SSL certificate included
- ✅ DNS management
- ✅ Perfect for development and production

---

### Step 1: Register Your Domain

**1. Fork the is-a-dev repository**

```bash
# Go to: https://github.com/is-a-dev/register
# Click "Fork" button
```

**2. Create your domain file**

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/register.git
cd register/domains

# Create your domain file (e.g., am-thinair.json)
cat > am-thinair.json << 'EOF'
{
  "owner": {
    "username": "yourusername",
    "email": "your@email.com"
  },
  "record": {
    "A": ["76.76.21.21"],
    "CNAME": "cname.vercel-dns.com"
  }
}
EOF
```

**3. Submit Pull Request**

```bash
git add domains/am-thinair.json
git commit -m "Add am-thinair.is-a.dev"
git push origin main

# Create PR on GitHub
# Wait for approval (usually 24-48 hours)
```

---

### Step 2: Configure Your Apps

**Marketing Site:**

```bash
# Update .env
NEXT_PUBLIC_SITE_DOMAIN=am-thinair.is-a.dev
NEXTAUTH_URL=https://am-thinair.is-a.dev
```

**Web App:**

```bash
# Update .env
VITE_API_URL=https://api-am-thinair.is-a.dev
```

**API Server:**

```bash
# Update .env
CORS_ORIGIN=https://am-thinair.is-a.dev
```

---

### Step 3: Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy marketing site
cd apps/marketing
vercel --prod

# Add custom domain in Vercel dashboard
# Domain: am-thinair.is-a.dev
# Vercel will provide CNAME: cname.vercel-dns.com

# Update your is-a-dev PR with the CNAME
```

---

### Multiple Subdomains Strategy

**Recommended Setup:**

```json
// am-thinair.json (Main marketing site)
{
  "record": {
    "CNAME": "cname.vercel-dns.com"
  }
}

// am-app.json (Web application)
{
  "record": {
    "CNAME": "cname.vercel-dns.com"
  }
}

// am-api.json (API server)
{
  "record": {
    "CNAME": "cname.vercel-dns.com"
  }
}

// am-docs.json (Documentation)
{
  "record": {
    "CNAME": "cname.vercel-dns.com"
  }
}
```

**Result:**
- Marketing: `am-thinair.is-a.dev`
- Web App: `am-app.is-a.dev`
- API: `am-api.is-a.dev`
- Docs: `am-docs.is-a.dev`

---

## 🤖 Custom AI Models Implementation

### Overview

Custom AI models allow you to fine-tune AI specifically for each customer's codebase, coding standards, and business domain.

**Benefits:**
- 🎯 Generates code matching customer's style
- 🏢 Understands company-specific patterns
- 🚀 Better quality outputs
- 💰 Premium pricing ($500 setup + $100/month)

---

### Architecture

```
Customer Codebase
    ↓
Upload & Analysis
    ↓
Fine-Tuning Dataset Creation
    ↓
OpenAI Fine-Tuning API
    ↓
Custom Model (gpt-4-yourcompany)
    ↓
Use in Materialiser Phase
```

---

### Step 1: Database Schema

```typescript
// packages/db/src/schema.ts

export const customModels = pgTable("custom_models", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("userId").references(() => users.id).notNull(),
    name: text("name").notNull(),
    description: text("description"),
    
    // Model details
    baseModel: text("baseModel").notNull(), // "gpt-4", "claude-3-opus"
    fineTunedModelId: text("fineTunedModelId"), // OpenAI model ID
    status: text("status").default("pending").notNull(), // pending, training, ready, failed
    
    // Training data
    trainingDataUrl: text("trainingDataUrl"),
    validationDataUrl: text("validationDataUrl"),
    
    // Metrics
    trainingTokens: integer("trainingTokens"),
    validationLoss: real("validationLoss"),
    
    // Pricing
    setupFee: integer("setupFee").default(50000), // $500 in cents
    monthlyFee: integer("monthlyFee").default(10000), // $100 in cents
    
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

export const trainingExamples = pgTable("training_examples", {
    id: uuid("id").defaultRandom().primaryKey(),
    modelId: uuid("modelId").references(() => customModels.id).notNull(),
    
    // Example data
    input: text("input").notNull(), // User requirement
    output: text("output").notNull(), // Expected code
    
    // Metadata
    category: text("category"), // "component", "api", "database"
    quality: integer("quality").default(5), // 1-10 rating
    
    createdAt: timestamp("createdAt").defaultNow().notNull(),
})
```

---

### Step 2: Upload Existing Codebase

```typescript
// apps/server/src/routers/custom-models.ts

import { publicProcedure, router } from '../trpc'
import { z } from 'zod'
import { customModels, trainingExamples } from '@thin-air/db'
import { analyzeCodebase } from '../lib/ai/codebase-analyzer'

export const customModelsRouter = router({
    // Upload codebase for analysis
    uploadCodebase: publicProcedure
        .input(z.object({
            files: z.array(z.object({
                path: z.string(),
                content: z.string(),
            })),
            name: z.string(),
            description: z.string().optional(),
        }))
        .mutation(async ({ input, ctx }) => {
            // Create custom model record
            const model = await db.insert(customModels).values({
                userId: ctx.userId,
                name: input.name,
                description: input.description,
                baseModel: 'gpt-4',
                status: 'pending',
            }).returning()
            
            // Analyze codebase to extract patterns
            const patterns = await analyzeCodebase(input.files)
            
            // Create training examples
            const examples = patterns.map(pattern => ({
                modelId: model[0].id,
                input: pattern.requirement,
                output: pattern.code,
                category: pattern.category,
                quality: pattern.quality,
            }))
            
            await db.insert(trainingExamples).values(examples)
            
            return {
                modelId: model[0].id,
                examplesCreated: examples.length,
                status: 'ready_for_training',
            }
        }),
})
```

---

### Step 3: Codebase Analyzer

```typescript
// apps/server/src/lib/ai/codebase-analyzer.ts

import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
})

interface CodePattern {
    requirement: string
    code: string
    category: string
    quality: number
}

export async function analyzeCodebase(files: Array<{ path: string, content: string }>): Promise<CodePattern[]> {
    const patterns: CodePattern[] = []
    
    // Analyze each file with Claude
    for (const file of files) {
        const message = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 4096,
            messages: [{
                role: 'user',
                content: `Analyze this code file and extract reusable patterns:

File: ${file.path}

\`\`\`
${file.content}
\`\`\`

For each pattern, provide:
1. A requirement that would lead to this code
2. The code implementation
3. Category (component, api, database, util)
4. Quality score (1-10)

Return as JSON array:
[
  {
    "requirement": "Create a user authentication component",
    "code": "...",
    "category": "component",
    "quality": 9
  }
]`
            }],
        })
        
        const responseText = message.content[0].type === 'text' 
            ? message.content[0].text 
            : ''
        
        try {
            const jsonMatch = responseText.match(/\[[\s\S]*\]/)
            const jsonText = jsonMatch ? jsonMatch[0] : responseText
            const filePatterns = JSON.parse(jsonText)
            patterns.push(...filePatterns)
        } catch (error) {
            console.error('Failed to parse patterns:', error)
        }
    }
    
    return patterns
}
```

---

### Step 4: OpenAI Fine-Tuning

```typescript
// apps/server/src/lib/ai/fine-tuning.ts

import OpenAI from 'openai'
import { db, customModels, trainingExamples } from '@thin-air/db'
import { eq } from 'drizzle-orm'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function startFineTuning(modelId: string) {
    // Get training examples
    const examples = await db.query.trainingExamples.findMany({
        where: eq(trainingExamples.modelId, modelId),
    })
    
    // Convert to OpenAI format
    const trainingData = examples.map(ex => ({
        messages: [
            {
                role: 'system',
                content: 'You are a code generator that follows the company\'s coding standards and patterns.'
            },
            {
                role: 'user',
                content: ex.input
            },
            {
                role: 'assistant',
                content: ex.output
            }
        ]
    }))
    
    // Upload training file
    const trainingFile = await openai.files.create({
        file: Buffer.from(trainingData.map(d => JSON.stringify(d)).join('\n')),
        purpose: 'fine-tune',
    })
    
    // Start fine-tuning
    const fineTune = await openai.fineTuning.jobs.create({
        training_file: trainingFile.id,
        model: 'gpt-4-0613',
        hyperparameters: {
            n_epochs: 3,
        },
    })
    
    // Update model record
    await db.update(customModels)
        .set({
            fineTunedModelId: fineTune.id,
            status: 'training',
            trainingDataUrl: trainingFile.id,
        })
        .where(eq(customModels.id, modelId))
    
    return fineTune
}

export async function checkFineTuningStatus(modelId: string) {
    const model = await db.query.customModels.findFirst({
        where: eq(customModels.id, modelId),
    })
    
    if (!model?.fineTunedModelId) {
        throw new Error('No fine-tuning job found')
    }
    
    const fineTune = await openai.fineTuning.jobs.retrieve(model.fineTunedModelId)
    
    // Update status
    if (fineTune.status === 'succeeded') {
        await db.update(customModels)
            .set({
                status: 'ready',
                fineTunedModelId: fineTune.fine_tuned_model,
            })
            .where(eq(customModels.id, modelId))
    } else if (fineTune.status === 'failed') {
        await db.update(customModels)
            .set({ status: 'failed' })
            .where(eq(customModels.id, modelId))
    }
    
    return fineTune
}
```

---

### Step 5: Use Custom Model in Materialiser

```typescript
// apps/server/src/routers/materialiser.ts (updated)

import { publicProcedure, router } from '../trpc'
import { z } from 'zod'
import OpenAI from 'openai'
import { db, customModels } from '@thin-air/db'
import { eq } from 'drizzle-orm'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export const materialiserRouter = router({
    generate: publicProcedure
        .input(z.object({
            projectId: z.string(),
            useCustomModel: z.boolean().optional(),
            customModelId: z.string().optional(),
        }))
        .mutation(async ({ input, ctx }) => {
            let modelToUse = 'gpt-4'
            
            // Use custom model if requested
            if (input.useCustomModel && input.customModelId) {
                const customModel = await db.query.customModels.findFirst({
                    where: eq(customModels.id, input.customModelId),
                })
                
                if (customModel?.status === 'ready' && customModel.fineTunedModelId) {
                    modelToUse = customModel.fineTunedModelId
                }
            }
            
            // Generate code with custom or default model
            const completion = await openai.chat.completions.create({
                model: modelToUse,
                messages: [
                    {
                        role: 'system',
                        content: 'Generate production-ready code following best practices.'
                    },
                    {
                        role: 'user',
                        content: `Generate a complete application based on these requirements: ${input.projectId}`
                    }
                ],
                temperature: 0.7,
            })
            
            return {
                code: completion.choices[0].message.content,
                model: modelToUse,
                isCustomModel: modelToUse !== 'gpt-4',
            }
        }),
})
```

---

### Step 6: UI for Custom Models

```typescript
// apps/web/src/pages/CustomModelsPage.tsx

import { useState } from 'react'
import { trpc } from '../utils/trpc'

export function CustomModelsPage() {
    const [files, setFiles] = useState<File[]>([])
    
    const uploadCodebase = trpc.customModels.uploadCodebase.useMutation()
    const startTraining = trpc.customModels.startFineTuning.useMutation()
    
    const handleUpload = async () => {
        const fileContents = await Promise.all(
            files.map(async (file) => ({
                path: file.name,
                content: await file.text(),
            }))
        )
        
        const result = await uploadCodebase.mutateAsync({
            files: fileContents,
            name: 'My Company Model',
            description: 'Fine-tuned on our codebase',
        })
        
        // Start training
        await startTraining.mutateAsync({
            modelId: result.modelId,
        })
    }
    
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Custom AI Models</h1>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Upload Your Codebase</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Upload your existing codebase to train a custom AI model that understands your coding patterns.
                </p>
                
                <input
                    type="file"
                    multiple
                    onChange={(e) => setFiles(Array.from(e.target.files || []))}
                    className="mb-4"
                />
                
                <button
                    onClick={handleUpload}
                    disabled={files.length === 0}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
                >
                    Upload & Train Model ($500)
                </button>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-2">What You Get:</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>✓ AI trained on your codebase</li>
                    <li>✓ Generates code matching your style</li>
                    <li>✓ Understands your business domain</li>
                    <li>✓ Better quality outputs</li>
                    <li>✓ $100/month after setup</li>
                </ul>
            </div>
        </div>
    )
}
```

---

## 💰 Pricing Strategy

### Custom Model Pricing

**Setup Fee:** $500 (one-time)
- Codebase analysis
- Training data preparation
- Model fine-tuning
- Quality validation

**Monthly Fee:** $100
- Model hosting
- Continuous updates
- Performance monitoring
- Support

**ROI for Customers:**
- 50% better code quality
- 30% faster development
- 90% match to coding standards
- Worth $1,000+/month in developer time saved

---

## 🚀 Implementation Timeline

### Week 1: Database & Upload
- [ ] Add custom models schema
- [ ] Create upload endpoint
- [ ] Build codebase analyzer

### Week 2: Fine-Tuning
- [ ] Integrate OpenAI fine-tuning API
- [ ] Create training data formatter
- [ ] Add status monitoring

### Week 3: Integration
- [ ] Update Materialiser to use custom models
- [ ] Build UI for model management
- [ ] Add billing integration

### Week 4: Testing & Launch
- [ ] Test with sample codebases
- [ ] Beta test with 5 customers
- [ ] Public launch

---

## 📊 Success Metrics

**Target:**
- 50 custom models in first 3 months
- $50,000 setup revenue
- $5,000/month recurring

**Customer Success:**
- 90%+ satisfaction rate
- 50%+ code quality improvement
- 30%+ time savings

---

## 🎯 Next Steps

1. **Get is-a-dev domain**
   - Register `am-thinair.is-a.dev`
   - Set up DNS records
   - Deploy to Vercel

2. **Implement custom models**
   - Add database schema
   - Build codebase analyzer
   - Integrate OpenAI fine-tuning

3. **Launch beta program**
   - Find 5 pilot customers
   - Offer 50% discount
   - Gather feedback

**This will make Thin Air truly exceptional!** 🚀
