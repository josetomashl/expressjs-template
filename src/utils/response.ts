import type { Response } from 'express';

import { ValidationError } from '../middlewares/validator';

export class SendResponse {
  static success(res: Response, data: unknown) {
    res.status(200).json({ data });
    return;
  }

  static badRequest(res: Response, details?: string) {
    res.status(400).json({
      error: 'Bad request',
      details
    });
    return;
  }

  static unauthorized(res: Response, details?: string) {
    res.status(403).json({
      error: 'Unauthorized access',
      details
    });
    return;
  }

  static forbidden(res: Response, details?: string) {
    res.status(403).json({
      error: 'Forbidden access',
      details
    });
    return;
  }

  static notFound(res: Response, resourceName = 'Resource', details?: string) {
    res.status(404).json({
      error: `${resourceName} not found`,
      details
    });
    return;
  }

  static validationErrors(res: Response, details: ValidationError) {
    res.status(422).json({
      error: 'Validation failed',
      details
    });
    return;
  }

  static error(res: Response, error = 'Internal Server Error') {
    res.status(500).json({ error });
    return;
  }
}
