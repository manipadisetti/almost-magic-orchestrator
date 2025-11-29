import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { aiRatelimit, cache } from '../lib/ratelimit';
import { db } from '../../../../packages/db/src/index';
import { codeArtifacts } from '../../../../packages/db/src/schema';
import { eq } from 'drizzle-orm';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const materialiserRouter = router({
    generate: publicProcedure
        .input(z.object({
            projectId: z.string(),
        }))
        .mutation(async ({ input, ctx }) => {
            // Check AI rate limit
            const { success } = await aiRatelimit.limit(ctx.ip);
            if (!success) {
                throw new Error('AI rate limit exceeded. Please wait before trying again.');
            }

            // Check cache
            const cacheKey = `materialiser:${input.projectId}`;
            const cached = await cache.get<any>(cacheKey);
            if (cached) {
                return cached;
            }

            // Get Gemini model
            const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

            // Generate code
            const prompt = `You are an expert full-stack developer. Generate a complete, production-ready application based on these requirements.

Create a modern web application with:
- Frontend: React + TypeScript + Tailwind CSS
- Backend: Node.js + Express + TypeScript
- Database: PostgreSQL with Drizzle ORM
- Authentication: JWT-based
- Testing: Vitest + Playwright

Generate the following files:

1. **Frontend Files:**
   - src/App.tsx (main app component)
   - src/pages/HomePage.tsx (landing page)
   - src/pages/DashboardPage.tsx (user dashboard)
   - src/components/Header.tsx (navigation)
   - src/components/Footer.tsx (footer)

2. **Backend Files:**
   - server/index.ts (Express server)
   - server/routes/auth.ts (authentication routes)
   - server/routes/api.ts (API routes)
   - server/middleware/auth.ts (auth middleware)

3. **Database Files:**
   - db/schema.ts (Drizzle schema)
   - db/migrations/0001_initial.sql (initial migration)

4. **Configuration Files:**
   - package.json (dependencies)
   - tsconfig.json (TypeScript config)
   - .env.example (environment variables)
   - README.md (documentation)

For each file, return JSON in this format:
{
  "files": [
    {
      "path": "src/App.tsx",
      "content": "import React from 'react'...",
      "language": "typescript"
    },
    ...
  ]
}

Make the code production-ready with:
- Proper error handling
- TypeScript types
- Comments explaining complex logic
- Security best practices
- Responsive design
- Accessibility features

Return ONLY the JSON object, no additional text.`;

            const result = await model.generateContent(prompt);
            const response = result.response;
            const text = response.text();

            // Parse JSON response
            let filesData;
            try {
                const jsonMatch = text.match(/\{[\s\S]*\}/);
                const jsonText = jsonMatch ? jsonMatch[0] : text;
                filesData = JSON.parse(jsonText);
            } catch (error) {
                console.error('Failed to parse Gemini response:', text);
                throw new Error('Failed to parse AI response');
            }

            const resultData = {
                files: filesData.files || [],
                model: 'gemini-2.0-flash-exp',
                generatedAt: new Date().toISOString(),
            };

            // Save to DB
            try {
                await db.transaction(async (tx) => {
                    // Delete existing artifacts for this project to avoid duplicates
                    await tx.delete(codeArtifacts).where(eq(codeArtifacts.projectId, input.projectId));

                    // Insert new artifacts
                    if (resultData.files.length > 0) {
                        await tx.insert(codeArtifacts).values(
                            resultData.files.map((file: any) => ({
                                projectId: input.projectId,
                                filePath: file.path,
                                content: file.content,
                                language: file.language || 'typescript',
                                metadata: { generatedBy: 'gemini-2.0-flash-exp' },
                            }))
                        );
                    }
                });
            } catch (error) {
                console.error('Failed to save artifacts to DB:', error);
                // Don't fail the request if DB save fails, just log it
            }

            // Cache for 1 hour
            await cache.set(cacheKey, resultData, 3600);

            return resultData;
        }),
});
