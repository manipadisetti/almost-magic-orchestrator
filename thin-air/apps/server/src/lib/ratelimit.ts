import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Check if Redis is configured
const redisUrl = process.env.UPSTASH_REDIS_URL;
const redisToken = process.env.UPSTASH_REDIS_TOKEN;

// Initialize Redis client or use in-memory fallback
const redis = redisUrl && redisToken
    ? new Redis({ url: redisUrl, token: redisToken })
    : null;

// In-memory rate limiter for testing (when Redis is not available)
const inMemoryLimiter = {
    limit: async () => ({ success: true, limit: 100, reset: Date.now() + 10000, remaining: 100 }),
};

// Create rate limiter - 10 requests per 10 seconds
export const ratelimit = redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, "10 s"),
        analytics: true,
        prefix: "@thin-air/ratelimit",
    })
    : inMemoryLimiter as any;

// Create rate limiter for AI requests - 5 requests per minute
export const aiRatelimit = redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, "1 m"),
        analytics: true,
        prefix: "@thin-air/ai-ratelimit",
    })
    : inMemoryLimiter as any;

// Cache helper functions
export const cache = {
    async get<T>(key: string): Promise<T | null> {
        if (!redis) return null;
        try {
            const data = await redis.get(key);
            return data as T | null;
        } catch (error) {
            console.error('Cache get error:', error);
            return null;
        }
    },

    async set(key: string, value: any, expirationSeconds: number = 3600): Promise<void> {
        if (!redis) return;
        try {
            await redis.set(key, value, { ex: expirationSeconds });
        } catch (error) {
            console.error('Cache set error:', error);
        }
    },

    async del(key: string): Promise<void> {
        if (!redis) return;
        try {
            await redis.del(key);
        } catch (error) {
            console.error('Cache del error:', error);
        }
    },

    async invalidatePattern(pattern: string): Promise<void> {
        if (!redis) return;
        try {
            const keys = await redis.keys(pattern);
            if (keys.length > 0) {
                await redis.del(...keys);
            }
        } catch (error) {
            console.error('Cache invalidate error:', error);
        }
    },
};
