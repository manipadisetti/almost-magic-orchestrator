import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@thin-air/server/src/router';

export const trpc = createTRPCReact<AppRouter>();
