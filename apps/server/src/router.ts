import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { Context } from './context';

const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  health: t.procedure.query(() => {
    return { status: 'ok' };
  }),
  
  // Vapor (Ingestion) procedures
  vapor: t.router({
    captureText: t.procedure
      .input(z.object({ content: z.string() }))
      .mutation(async ({ input }) => {
        // Store the text input
        return { id: 'temp-id', status: 'captured' };
      }),
  }),
  
  // Condenser (Reasoning) procedures
  condenser: t.router({
    analyzeRequirements: t.procedure
      .input(z.object({ inputId: z.string() }))
      .mutation(async ({ input }) => {
        // Generate Intent JSON
        return { 
          status: 'analyzed',
          intentJson: { 
            appType: 'placeholder',
            components: []
          }
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
