import type { NextFunction, Request, Response } from 'express';
import { ZodError, type ZodAny } from 'zod';

export function validator(schema: ZodAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages: { [key: string]: string } = {};
        for (const issue of error.issues) {
          errorMessages[issue.path.join('.')] = issue.message;
        }
        res.status(400).json({ error: 'Invalid data', details: errorMessages });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
}
