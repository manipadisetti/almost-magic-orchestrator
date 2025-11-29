import 'dotenv/config';
import { db } from '../packages/db/src/index';
import { coupons, licenses, users, credits } from '../packages/db/src/schema';
import { eq } from 'drizzle-orm';
import { appRouter } from '../apps/server/src/router';

async function main() {
    console.log('🧪 Starting Billing Verification...');

    // 1. Setup Test User
    const testEmail = `billing-test-${Date.now()}@example.com`;
    const [user] = await (db as any).insert(users).values({
        email: testEmail,
        name: 'Billing Tester',
        role: 'user',
    }).returning();
    console.log(`✅ Created test user: ${user.email} (${user.id})`);

    // Initialize credits for user
    await (db as any).insert(credits).values({ userId: user.id, balance: 0 });

    // 2. Create Test Coupon
    const couponCode = `TEST-${Date.now()}`;
    const [coupon] = await (db as any).insert(coupons).values({
        code: couponCode,
        type: 'amount',
        value: 50, // 50 credits
        maxUses: 1,
    }).returning();
    console.log(`✅ Created test coupon: ${coupon.code}`);

    // 3. Create Test License
    const licenseKey = `LIC-${Date.now()}`;
    const [license] = await (db as any).insert(licenses).values({
        key: licenseKey,
        type: 'pro',
        status: 'active',
    }).returning();
    console.log(`✅ Created test license: ${license.key}`);

    // 4. Mock TRPC Context
    const ctx = {
        user: { id: user.id, email: user.email, role: user.role },
        req: { headers: {}, socket: {} } as any,
        res: {} as any,
        ip: '127.0.0.1',
    };
    const caller = appRouter.createCaller(ctx);

    // 5. Verify Coupon Redemption
    console.log('\n--- Testing Coupon Redemption ---');
    try {
        const result = await caller.billing.redeemCoupon({ code: couponCode });
        console.log('✅ Coupon redeemed successfully:', result);

        if (result.newBalance !== 50) {
            console.error('❌ Error: Balance mismatch. Expected 50, got', result.newBalance);
            process.exit(1);
        }
    } catch (error) {
        console.error('❌ Coupon redemption failed:', error);
        process.exit(1);
    }

    // 6. Verify Double Redemption (Should Fail)
    console.log('\n--- Testing Double Redemption ---');
    try {
        await caller.billing.redeemCoupon({ code: couponCode });
        console.error('❌ Error: Double redemption should have failed.');
        process.exit(1);
    } catch (error: any) {
        if (error.message.includes('already redeemed')) {
            console.log('✅ Double redemption blocked correctly.');
        } else {
            console.error('❌ Unexpected error:', error);
            process.exit(1);
        }
    }

    // 7. Verify License Activation
    console.log('\n--- Testing License Activation ---');
    try {
        const result = await caller.billing.activateLicense({ key: licenseKey });
        console.log('✅ License activated successfully:', result);
    } catch (error) {
        console.error('❌ License activation failed:', error);
        process.exit(1);
    }

    // 8. Verify License Assignment in DB
    const updatedLicense = await (db as any).query.licenses.findFirst({
        where: eq(licenses.key, licenseKey),
    });

    if (updatedLicense?.userId === user.id && updatedLicense.status === 'assigned') {
        console.log('✅ License correctly assigned in DB.');
    } else {
        console.error('❌ License DB state incorrect:', updatedLicense);
        process.exit(1);
    }

    console.log('\n🎉 All Billing Tests Passed!');
    process.exit(0);
}

main().catch((err) => {
    console.error('Fatal Error:', err);
    process.exit(1);
});
