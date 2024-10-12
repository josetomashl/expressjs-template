import express, { type NextFunction, type Request, type Response } from 'express';

const router = express.Router();

// Custom requests logger
router.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Type', 'application/json');
  console.log('%s %s %s %s', new Date().toJSON(), req.method, req.url, req.path);
  next();
});

export default router;
