import compression, { type CompressionOptions } from 'compression';
import type { Request, Response } from 'express';

const compressionOptions: CompressionOptions = {
  filter: (req: Request, res: Response) => {
    if (req.headers['x-no-compression']) {
      // don't compress responses with this request header
      return false;
    }
    // fallback to standard filter function
    return compression.filter(req, res);
  }
};

export default compressionOptions;
