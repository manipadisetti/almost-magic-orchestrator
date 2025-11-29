import 'dotenv/config';
import { db } from '../packages/db/src/index';
import { projects, vaporInputs, users } from '../packages/db/src/schema';
import { appRouter } from '../apps/server/src/router';
import { eq } from 'drizzle-orm';

async function main() {
    console.log('🧪 Starting Core Features Verification (Mirage & Materialiser)...');

    // 1. Setup Test User & Project
    const testEmail = `core-test-${Date.now()}@example.com`;
    const [user] = await (db as any).insert(users).values({
        email: testEmail,
        name: 'Core Tester',
        role: 'user',
    }).returning();
    console.log(`✅ Created test user: ${user.email}`);

    const [project] = await (db as any).insert(projects).values({
        userId: user.id,
        name: 'Verification Project',
        description: 'A test project to verify AI generation',
    }).returning();
    console.log(`✅ Created test project: ${project.name} (${project.id})`);

    // 2. Add Vapor Inputs (Requirements)
    await (db as any).insert(vaporInputs).values({
        projectId: project.id,
        type: 'text',
        content: 'I want a simple To-Do list application. Users should be able to add tasks, mark them as complete, and delete them. It should have a dark mode.',
        processed: true,
    });
    console.log('✅ Added Vapor inputs (Requirements)');

    // 3. Mock TRPC Context
    const ctx = {
        user: { id: user.id, email: user.email, role: user.role },
        req: { headers: {}, socket: {} } as any,
        res: {} as any,
        ip: '127.0.0.1', // For rate limiting
    };
    const caller = appRouter.createCaller(ctx);

    // 4. Verify Mirage (Architecture Design)
    console.log('\n--- Testing Mirage (Architecture Design) ---');
    console.log('⏳ Calling Gemini 2.0 Flash Thinking...');
    try {
        const architecture = await caller.mirage.design({ projectId: project.id });

        if (!architecture.components || architecture.components.length === 0) {
            throw new Error('Mirage returned empty components list');
        }

        console.log(`✅ Mirage Success! Generated ${architecture.components.length} components.`);
        console.log('Sample Component:', architecture.components[0].name);
    } catch (error) {
        console.error('❌ Mirage Failed:', error);
        process.exit(1);
    }

    // 5. Verify Materialiser (Code Generation)
    console.log('\n--- Testing Materialiser (Code Generation) ---');
    console.log('⏳ Calling Gemini 2.0 Flash...');
    try {
        const code = await caller.materialiser.generate({ projectId: project.id });

        if (!code.files || code.files.length === 0) {
            throw new Error('Materialiser returned empty files list');
        }

        console.log(`✅ Materialiser Success! Generated ${code.files.length} files.`);
        const appFile = code.files.find((f: any) => f.path.includes('App.tsx'));
        if (appFile) {
            console.log('✅ Found App.tsx');
        } else {
            console.warn('⚠️ App.tsx not found in generated files');
        }
    } catch (error) {
        console.error('❌ Materialiser Failed:', error);
        process.exit(1);
    }

    console.log('\n🎉 All Core Features Verified Successfully!');
    process.exit(0);
}

main().catch((err) => {
    console.error('Fatal Error:', err);
    process.exit(1);
});
