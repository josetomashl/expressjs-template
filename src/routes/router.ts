import express, { type NextFunction, type Request, type Response } from 'express';
import { logger } from '../middlewares/logger';
import { authRouter } from './authRouter';

const router = express.Router();

// Common json header
router.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Custom requests logger
router.use(logger);

router.get('/status', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});
router.use('/auth', authRouter);
// Add routes here, private routes add auth middleware before passing router

export { router };
