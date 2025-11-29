import { router } from './trpc';
import { vaporRouter } from './routers/vapor';
import { condenserRouter } from './routers/condenser';
import { mirageRouter } from './routers/mirage';
import { materialiserRouter } from './routers/materialiser';
import { manifestRouter } from './routers/manifest';
import { audioRouter } from './routers/audio';
import { billingRouter } from './routers/billing';

export const appRouter = router({
    vapor: vaporRouter,
    condenser: condenserRouter,
    mirage: mirageRouter,
    materialiser: materialiserRouter,
    manifest: manifestRouter,
    audio: audioRouter,
    billing: billingRouter,
});

export type AppRouter = typeof appRouter;
