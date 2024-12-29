import type { Response } from 'express';

export const staticOptions = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders(res: Response) {
    res.set('x-timestamp', Date.now().toString());
  }
};
