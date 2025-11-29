import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import { cache } from '../lib/ratelimit';
import Client from 'ssh2-sftp-client';
import { db } from '../../../../packages/db/src/index';
import { codeArtifacts } from '../../../../packages/db/src/schema';
import { eq } from 'drizzle-orm';
import path from 'path';

export const manifestRouter = router({
    deploy: publicProcedure
        .input(z.object({
            projectId: z.string(),
            host: z.string().min(1),
            username: z.string().min(1),
            password: z.string().min(1),
            remotePath: z.string().default('/public_html'),
        }))
        .mutation(async ({ input }) => {
            const sftp = new Client();
            try {
                // 1. Get artifacts
                const artifacts = await db.query.codeArtifacts.findMany({
                    where: eq(codeArtifacts.projectId, input.projectId),
                });

                if (artifacts.length === 0) {
                    throw new Error('No code artifacts found for this project. Please run Materialiser first.');
                }

                // 2. Connect to SFTP
                await sftp.connect({
                    host: input.host,
                    username: input.username,
                    password: input.password,
                });

                // 3. Upload files
                for (const file of artifacts) {
                    // Normalize path to posix style for SFTP
                    const normalizedFilePath = file.filePath.replace(/\\/g, '/');
                    const remoteFilePath = path.posix.join(input.remotePath, normalizedFilePath);
                    const remoteDir = path.posix.dirname(remoteFilePath);

                    // Ensure directory exists
                    if (!await sftp.exists(remoteDir)) {
                        await sftp.mkdir(remoteDir, true);
                    }

                    // Upload content
                    await sftp.put(Buffer.from(file.content), remoteFilePath);
                }

                const deploymentUrl = `http://${input.host}/${input.projectId.slice(0, 8)}`;

                const result = {
                    url: deploymentUrl,
                    status: 'success',
                    deployedAt: new Date().toISOString(),
                    platform: 'digital-pacific',
                };

                // Cache for 1 hour
                const cacheKey = `manifest:${input.projectId}`;
                await cache.set(cacheKey, result, 3600);

                return result;

            } catch (err: any) {
                console.error('Deployment failed:', err);
                throw new Error(`Deployment failed: ${err.message}`);
            } finally {
                await sftp.end();
            }
        }),
});
