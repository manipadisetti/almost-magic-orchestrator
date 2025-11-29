import { initTRPC, TRPCError } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { ratelimit } from './lib/ratelimit';

export const createContext = async ({ req, res }: CreateExpressContextOptions) => {
    // Get IP address for rate limiting
    const ip = req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || '127.0.0.1';

    // Mock user for now or extract from session
    // In a real app, we'd verify the session token here
    const user = (req as any).user || null;

    return {
        req,
        res,
        ip,
        user,
    };
};

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

// Rate limiting middleware
const rateLimitMiddleware = t.middleware(async ({ ctx, next }) => {
    const { success, limit, reset, remaining } = await ratelimit.limit(ctx.ip);

    if (!success) {
        throw new TRPCError({
            code: 'TOO_MANY_REQUESTS',
            message: `Rate limit exceeded. Try again in ${Math.ceil((reset - Date.now()) / 1000)} seconds.`,
        });
    }

    return next({
        ctx: {
            ...ctx,
            rateLimit: { limit, reset, remaining },
        },
    });
});

// Auth middleware
const isAuthed = t.middleware(({ ctx, next }) => {
    if (!ctx.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next({
        ctx: {
            user: ctx.user,
        },
    });
});

// Public procedure with rate limiting
export const publicProcedure = t.procedure.use(rateLimitMiddleware);

// Protected procedure
export const protectedProcedure = t.procedure.use(rateLimitMiddleware).use(isAuthed);

// Router
export const router = t.router;
