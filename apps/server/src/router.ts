import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { Context } from './context';

export const t = initTRPC.context<Context>().create();

import { vaporRouter } from './routers/vapor';

export const appRouter = t.router({
  health: t.procedure.query(() => {
    return { status: 'ok' };
  }),
  
  // Vapor (Ingestion) procedures
  vapor: vaporRouter,
  
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
