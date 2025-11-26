import express from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cors from 'cors';
import { appRouter } from './router';
import { createContext } from './context';

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Thin Air server listening at http://localhost:${port}`);
});
