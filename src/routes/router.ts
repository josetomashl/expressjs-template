import { Router, type NextFunction, type Request, type Response } from 'express';

import { environment } from '../configs/environment';
import { authenticator } from '../middlewares/authenticator';
import { authRouter } from './authRouter';
import { postsRouter } from './postsRouter';
import { tagsRouter } from './tagsRouter';
import { usersRouter } from './usersRouter';

const router = Router();

// Common json header
router.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

router.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    uptime: process.uptime(),
    timestamp: Date.now(),
    env: environment.MODE,
    memoryUsage: process.memoryUsage(),
    cpuUsage: process.cpuUsage()
  });
});

router.use('/auth', authRouter);
router.use('/users', authenticator, usersRouter);
router.use('/posts', authenticator, postsRouter);
router.use('/tags', authenticator, tagsRouter);

router.all(/.*/, (_req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route Not Found'
  });
});

export { router };
