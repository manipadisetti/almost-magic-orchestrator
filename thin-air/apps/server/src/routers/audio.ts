// TRPC router for Liquid-Audio integration
import { initTRPC } from "@trpc/server";
import { createRoom, joinRoom, broadcastAudio } from "../utils/audio";

const t = initTRPC.create();

export const audioRouter = t.router({
    createRoom: t.procedure.query(async () => {
        const roomId = await createRoom();
        return { roomId };
    }),
    joinRoom: t.procedure.input(z => z.object({ roomId: z.string(), userName: z.string() })).mutation(async ({ input }) => {
        const userId = await joinRoom(input.roomId, input.userName);
        return { userId };
    }),
    broadcastAudio: t.procedure.input(z => z.object({ roomId: z.string(), userId: z.string(), audioChunk: z.instanceof(Buffer) })).mutation(async ({ input }) => {
        await broadcastAudio(input.roomId, input.userId, input.audioChunk);
        return { success: true };
    })
});

export type AudioRouter = typeof audioRouter;
