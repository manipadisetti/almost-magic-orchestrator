import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { Context } from './context';

export const t = initTRPC.context<Context>().create();

import { vaporRouter } from './routers/vapor';
import { mirageRouter } from './routers/mirage';

export const appRouter = t.router({
  health: t.procedure.query(() => {
    return { status: 'ok' };
  }),
  
  // Vapor (Ingestion) procedures
  vapor: vaporRouter,
  
  // Mirage (Visualization) procedures
  mirage: mirageRouter,
  
  // Condenser (Reasoning) procedures
  condenser: t.router({
    analyseRequirements: t.procedure
      .input(z.object({ inputId: z.string() }))
      .mutation(async ({ input }) => {
        // Generate Intent JSON
        return { 
          status: 'analysed',
          intentJson: { 
            appType: 'placeholder',
            components: []
          }
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
