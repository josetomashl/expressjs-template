import { Router, type NextFunction, type Request, type Response } from 'express';

import { environment } from '@/configs/environment';
import { authenticator } from '@/middlewares/authenticator';
import { logger } from '@/middlewares/logger';
import { authRouter } from './authRouter';
import { postsRouter } from './postsRouter';
import { usersRouter } from './usersRouter';

const router = Router();

// Common json header
router.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Custom requests logger
router.use(logger);

router.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    uptime: process.uptime(),
    timestamp: Date.now(),
    env: environment.MODE,
    memoryUsage: process.memoryUsage(),
    availableMemory: process.availableMemory,
    cpuUsage: process.cpuUsage(),
    versions: process.versions
  });
});

router.use('/auth', authRouter);
router.use('/users', authenticator, usersRouter);
router.use('/posts', authenticator, postsRouter);
// TODO: tags router, controller, service & repository

router.all(/.*/, (_req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route Not Found'
  });
});

export { router };
