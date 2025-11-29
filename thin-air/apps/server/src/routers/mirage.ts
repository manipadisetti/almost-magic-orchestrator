import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import { db, vaporInputs } from '@thin-air/db';
import { eq } from 'drizzle-orm';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { aiRatelimit, cache } from '../lib/ratelimit';
import OpenAI from 'openai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
});

export const mirageRouter = router({
    design: publicProcedure
        .input(z.object({
            projectId: z.string(),
            model: z.enum(['gemini-2.0-flash-thinking', 'claude-3.5-sonnet']).optional(),
        }))
        .mutation(async ({ input, ctx }) => {
            // Check AI rate limit
            const { success } = await aiRatelimit.limit(ctx.ip);
            if (!success) {
                throw new Error('AI rate limit exceeded. Please wait before trying again.');
            }

            // Determine model
            const hasOpenRouterKey = !!process.env.OPENROUTER_API_KEY;
            const selectedModel = input.model || (hasOpenRouterKey ? 'claude-3.5-sonnet' : 'gemini-2.0-flash-thinking');

            // Check cache first
            const cacheKey = `mirage:${input.projectId}:${selectedModel}`;
            const cached = await cache.get<any>(cacheKey);
            if (cached) {
                return cached;
            }

            // Fetch vapor inputs
            const inputs = await db.query.vaporInputs.findMany({
                where: eq(vaporInputs.projectId, input.projectId),
            });

            if (inputs.length === 0) {
                throw new Error('No inputs found. Complete Vapour phase first.');
            }

            // Combine inputs
            const combinedContext = inputs
                .map((input, idx) => `Input ${idx + 1}:\n${input.content}`)
                .join('\n\n---\n\n');

            const prompt = `You are an expert software architect. Design a complete, production-ready architecture for an application based on these requirements:

${combinedContext}

Design the architecture with these components:

1. **Frontend** - UI framework, state management, routing, styling
2. **Backend** - API structure, authentication, business logic, middleware
3. **Database** - Schema design, relationships, indexes, migrations
4. **Services** - Third-party integrations, APIs, external tools
5. **Infrastructure** - Hosting, deployment, CI/CD, monitoring

For each component, provide:
- name: Component name
- type: "frontend" | "backend" | "database" | "service" | "infrastructure"
- description: What this component does
- technologies: Array of specific technologies/tools to use
- dependencies: Array of other component names this depends on

Choose modern, production-ready technologies. Prefer:
- TypeScript over JavaScript
- PostgreSQL for relational data
- Redis for caching
- Next.js or React for frontend
- tRPC or REST for APIs
- Vercel or similar for hosting

Return ONLY a JSON array of components:
[
  {
    "name": "React Frontend",
    "type": "frontend",
    "description": "User interface built with React and TypeScript",
    "technologies": ["React 18", "TypeScript", "Tailwind CSS", "React Router"],
    "dependencies": ["REST API", "Authentication Service"]
  },
  ...
]

Only return the JSON array, no additional text.`;

            let responseText = '';

            if (selectedModel === 'claude-3.5-sonnet') {
                const completion = await openai.chat.completions.create({
                    model: 'anthropic/claude-3.5-sonnet',
                    messages: [
                        { role: 'system', content: 'You are an expert software architect.' },
                        { role: 'user', content: prompt }
                    ]
                });
                responseText = completion.choices[0].message.content || '';
            } else {
                // Use Gemini 2.0 Flash Thinking
                const model = genAI.getGenerativeModel({
                    model: 'gemini-2.0-flash-thinking-exp-1219'
                });
                const result = await model.generateContent(prompt);
                responseText = result.response.text();
            }

            let components;
            try {
                const jsonMatch = responseText.match(/\[[\s\S]*\]/);
                const jsonText = jsonMatch ? jsonMatch[0] : responseText;
                components = JSON.parse(jsonText);
            } catch (error) {
                console.error('Failed to parse AI response:', responseText);
                throw new Error('Failed to parse AI response');
            }

            // Add IDs
            const componentsWithIds = components.map((comp: any, idx: number) => ({
                id: `comp-${Date.now()}-${idx}`,
                ...comp,
            }));

            const finalResult = {
                components: componentsWithIds,
                inputCount: inputs.length,
                model: selectedModel,
            };

            // Cache for 1 hour
            await cache.set(cacheKey, finalResult, 3600);

            return finalResult;
        }),
});
