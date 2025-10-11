import type { Response } from 'express';

import { ValidationError } from '../middlewares/validator';

export class SendResponse {
  static success(res: Response, data: unknown) {
    return res.status(200).json({ data });
  }

  static badRequest(res: Response, details?: string) {
    return res.status(400).json({
      error: 'Bad request',
      details
    });
  }

  static unauthorized(res: Response, details?: string) {
    return res.status(403).json({
      error: 'Unauthorized access',
      details
    });
  }

  static forbidden(res: Response, details?: string) {
    return res.status(403).json({
      error: 'Forbidden access',
      details
    });
  }

  static notFound(res: Response, resourceName = 'Resource', details?: string) {
    return res.status(404).json({
      error: `${resourceName} not found`,
      details
    });
  }

  static validationErrors(res: Response, details: ValidationError) {
    return res.status(422).json({
      error: 'Validation failed',
      details
    });
  }

  static error(res: Response, error = 'Internal Server Error') {
    return res.status(500).json({ error });
  }
}
