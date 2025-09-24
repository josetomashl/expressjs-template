import { Router, type NextFunction, type Request, type Response } from 'express';
import { authenticator } from '../middlewares/authenticator';
import { logger } from '../middlewares/logger';
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
    env: process.env.NODE_ENV,
    memoryUsage: process.memoryUsage(),
    availableMemory: process.availableMemory,
    cpuUsage: process.cpuUsage(),
    versions: process.versions
  });
});
router.use('/auth', authRouter);
router.use('/users', authenticator, usersRouter);
router.use('/posts', authenticator, postsRouter);
// Add routes here, private routes add auth middleware before passing router

router.all(/.*/, (_req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route Not Found'
  });
});

export { router };
