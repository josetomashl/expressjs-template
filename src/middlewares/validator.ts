import type { NextFunction, Request, Response } from 'express';
import { ZodError, type ZodObject } from 'zod';

import { SendResponse } from '@/utils/response';

export type ValidationError = Record<string, string[]>;

export function validator(schema: ZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages: ValidationError = {};
        for (const issue of error.issues) {
          const field = issue.path.join('.');
          if (!errorMessages[field]) {
            errorMessages[field] = [];
          }
          errorMessages[field].push(issue.message);
        }
        return SendResponse.validationErrors(res, errorMessages);
      }

      return SendResponse.error(res, 'Invalid request data');
    }
  };
}
