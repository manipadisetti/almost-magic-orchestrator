import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { db } from "@thin-air/db";
import { vaporInputs } from "@thin-air/db";
import { mockGenerate } from "../lib/ai";
import { eq } from "drizzle-orm";

export const vaporRouter = router({
    create: publicProcedure
        .input(z.object({
            projectId: z.string().uuid(),
            content: z.string().min(1),
            inputType: z.enum(["text", "voice", "image", "pdf"]),
        }))
        .mutation(async ({ input }) => {
            console.log("📝 Creating Vapour Input:", input);

            // 1. Save to DB
            const [record] = await db.insert(vaporInputs).values({
                projectId: input.projectId,
                content: input.content,
                type: input.inputType,
                processed: false,
            }).returning();

            // 2. Trigger AI Processing (Mock for now)
            const aiResponse = await mockGenerate(input.content);

            // 3. Update record with AI response (simulated)
            await db.update(vaporInputs)
                .set({
                    processed: true,
                    metadata: { aiAnalysis: aiResponse }
                })
                .where(eq(vaporInputs.id, record.id));

            // 4. Auto-trigger Condenser to extract intent
            const { mockExtractIntent } = await import("../lib/condenser");
            const extractedIntent = await mockExtractIntent(input.content);

            // 5. Save intent to database
            const { intents } = await import("@thin-air/db");
            const [intentRecord] = await db.insert(intents).values({
                projectId: input.projectId,
                intentJson: extractedIntent,
                confidence: extractedIntent.confidence,
                version: 1,
            }).returning();

            return { success: true, record, aiResponse, intent: intentRecord };
        }),

    list: publicProcedure
        .input(z.object({ projectId: z.string().uuid() }))
        .query(async ({ input }) => {
            return await db.select().from(vaporInputs).where(eq(vaporInputs.projectId, input.projectId));
        }),
});
