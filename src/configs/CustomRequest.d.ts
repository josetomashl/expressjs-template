declare namespace Express {
  export interface Request {
    auth?: {
      userId: string | null;
    };
  }
}
