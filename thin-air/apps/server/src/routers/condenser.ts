import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import { db, vaporInputs } from '@thin-air/db';
import { eq } from 'drizzle-orm';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { aiRatelimit, cache } from '../lib/ratelimit';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const condenserRouter = router({
    analyze: publicProcedure
        .input(z.object({
            projectId: z.string(),
        }))
        .mutation(async ({ input, ctx }) => {
            // Check AI rate limit
            const { success } = await aiRatelimit.limit(ctx.ip);
            if (!success) {
                throw new Error('AI rate limit exceeded. Please wait before trying again.');
            }

            // Check cache first
            const cacheKey = `condenser:${input.projectId}`;
            const cached = await cache.get<any>(cacheKey);
            if (cached) {
                return cached;
            }

            // Fetch all vapor inputs for this project
            const inputs = await db.query.vaporInputs.findMany({
                where: eq(vaporInputs.projectId, input.projectId),
                orderBy: (vaporInputs, { desc }) => [desc(vaporInputs.createdAt)],
            });

            if (inputs.length === 0) {
                throw new Error('No inputs to analyze');
            }

            // Combine all inputs into a single context
            const combinedContext = inputs
                .map((input, idx) => `Input ${idx + 1} (${input.type}):\n${input.content}`)
                .join('\n\n---\n\n');

            // Use Gemini 2.0 Flash Thinking for intelligent analysis
            const model = genAI.getGenerativeModel({
                model: 'gemini-2.0-flash-thinking-exp-1219'
            });

            const prompt = `You are an expert business analyst and software architect. Analyze the following user inputs and extract structured requirements for a software application.

${combinedContext}

Please extract and categorize requirements into:
1. **Features** - User-facing functionality
2. **Technical** - Technical requirements and constraints
3. **Design** - UI/UX requirements
4. **Business** - Business logic and rules

For each requirement, provide:
- Category (feature, technical, design, or business)
- Description (clear, concise statement)
- Priority (high, medium, or low)
- Confidence (0.0 to 1.0, how confident you are this is a real requirement)

Return your analysis as a JSON array with this structure:
[
  {
    "category": "feature",
    "description": "User authentication with email and password",
    "priority": "high",
    "confidence": 0.95
  },
  ...
]

Only return the JSON array, no additional text.`;

            const result = await model.generateContent(prompt);
            const response = result.response;
            const responseText = response.text();

            let requirements;
            try {
                // Extract JSON from response
                const jsonMatch = responseText.match(/\[[\s\S]*\]/);
                const jsonText = jsonMatch ? jsonMatch[0] : responseText;
                requirements = JSON.parse(jsonText);
            } catch (error) {
                console.error('Failed to parse Gemini response:', responseText);
                throw new Error('Failed to parse AI response');
            }

            // Add IDs to requirements
            const requirementsWithIds = requirements.map((req: any, idx: number) => ({
                id: `req-${Date.now()}-${idx}`,
                ...req,
            }));

            const resultData = {
                requirements: requirementsWithIds,
                inputCount: inputs.length,
                model: 'gemini-2.0-flash-thinking-exp',
            };

            // Cache for 1 hour
            await cache.set(cacheKey, resultData, 3600);

            return resultData;
        }),
});
