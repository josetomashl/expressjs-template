import type { Request, Response } from 'express';

export const login = (req: Request, res: Response) => {
  res.json({ success: 'login success', info: req.body });
};

export const register = (req: Request, res: Response) => {
  res.json({ success: 'register success', info: req.body });
};
