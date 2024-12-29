import { z } from 'zod';
import { regex } from '../constants/regex';

export const loginConstraint = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(regex.password)
});
// export type LoginConstraintType = z.infer<typeof loginConstraint>;

export const registerConstraint = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8).regex(regex.password)
});
// export type RegisterConstraintType = z.infer<typeof registerConstraint>;
