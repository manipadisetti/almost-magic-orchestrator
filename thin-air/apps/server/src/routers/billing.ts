import { router, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { db } from '../../../../packages/db/src/index';
import { coupons, couponRedemptions, licenses, users, credits } from '../../../../packages/db/src/schema';
import { eq, and, sql } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';

export const billingRouter = router({
    redeemCoupon: protectedProcedure
        .input(z.object({ code: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {
            const { code } = input;
            const userId = ctx.user.id;

            // 1. Find the coupon
            const coupon = await db.query.coupons.findFirst({
                where: eq(coupons.code, code),
            });

            if (!coupon) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Invalid coupon code.',
                });
            }

            // 2. Check validity
            if (!coupon.isActive) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'This coupon is no longer active.',
                });
            }

            if (coupon.expiresAt && new Date() > coupon.expiresAt) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'This coupon has expired.',
                });
            }

            if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'This coupon has reached its maximum usage limit.',
                });
            }

            // 3. Check if user already redeemed
            const existingRedemption = await db.query.couponRedemptions.findFirst({
                where: and(
                    eq(couponRedemptions.couponId, coupon.id),
                    eq(couponRedemptions.userId, userId)
                ),
            });

            if (existingRedemption) {
                throw new TRPCError({
                    code: 'CONFLICT',
                    message: 'You have already redeemed this coupon.',
                });
            }

            // 4. Apply Coupon Effect (Transaction)
            return await db.transaction(async (tx) => {
                // Record redemption
                await tx.insert(couponRedemptions).values({
                    couponId: coupon.id,
                    userId: userId,
                });

                // Increment usage count
                await tx
                    .update(coupons)
                    .set({ usedCount: sql`${coupons.usedCount} + 1` })
                    .where(eq(coupons.id, coupon.id));

                // Apply benefit (Credits)
                if (coupon.type === 'amount') {
                    // Add credits to user
                    await tx
                        .update(credits)
                        .set({ balance: sql`${credits.balance} + ${coupon.value}` })
                        .where(eq(credits.userId, userId));

                    // Get updated balance
                    const updatedCredits = await tx.query.credits.findFirst({
                        where: eq(credits.userId, userId),
                    });

                    return {
                        success: true,
                        message: `Coupon redeemed! Added ${coupon.value} credits.`,
                        newBalance: updatedCredits?.balance || 0,
                    };
                } else {
                    // Handle percent discount (future implementation for Stripe)
                    // For now, we only support credit grants
                    return {
                        success: true,
                        message: 'Coupon redeemed (Discount applied to next invoice).',
                        newBalance: null,
                    };
                }
            });
        }),

    activateLicense: protectedProcedure
        .input(z.object({ key: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {
            const { key } = input;
            const userId = ctx.user.id;

            // 1. Find License
            const license = await db.query.licenses.findFirst({
                where: eq(licenses.key, key),
            });

            if (!license) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Invalid license key.',
                });
            }

            // 2. Check status
            if (license.status !== 'active') {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: `License is ${license.status}.`,
                });
            }

            if (license.userId) {
                throw new TRPCError({
                    code: 'CONFLICT',
                    message: 'This license is already assigned to another user.',
                });
            }

            if (license.expiresAt && new Date() > license.expiresAt) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'This license has expired.',
                });
            }

            // 3. Assign to User
            await db
                .update(licenses)
                .set({ userId: userId, status: 'assigned' })
                .where(eq(licenses.id, license.id));

            return {
                success: true,
                message: `License activated: ${license.type.toUpperCase()}`,
            };
        }),
});
