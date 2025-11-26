import { z } from 'zod';
import { t } from '../router';
import { generateIntentJson } from '../services/ai';
import { db } from '../db';
import { thinairProjects } from '../db/schema';

export const vaporRouter = t.router({
  inhale: t.procedure
    .input(z.object({ 
      content: z.string(),
      name: z.string().optional(),
      userId: z.string()
    }))
    .mutation(async ({ input }) => {
      try {
        // Generate intent JSON using AI
        const intentJson = await generateIntentJson(input.content);
        
        // Save to database
        const [project] = await db.insert(thinairProjects)
          .values({
            name: input.name || intentJson.project_name || 'Untitled Project',
            description: input.content,
            status: 'vapor',
            intentJson,
            userId: input.userId,
            createdAt: new Date(),
            updatedAt: new Date()
          })
          .returning();
        
        return {
          success: true,
          project,
          intentJson
        };
      } catch (error) {
        console.error('Error in vapor.inhale:', error);
        throw error;
      }
    }),
});
