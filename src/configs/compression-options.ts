import { type CompressionOptions, filter } from 'compression';
import type { Request, Response } from 'express';

export const compressionOptions: CompressionOptions = {
  filter: (req: Request, res: Response) => {
    if (req.headers['x-no-compression']) {
      // don't compress responses with this request header
      return false;
    }
    // fallback to standard filter function
    return filter(req, res);
  }
};
