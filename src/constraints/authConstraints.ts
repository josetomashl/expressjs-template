import z from 'zod';

import { regex } from '../constants/regex';

export const loginConstraint = z.object({
  email: z.email(),
  password: z.string()
});

export const registerConstraint = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.email(),
  password: z
    .string()
    .min(8)
    .regex(
      regex.password,
      'La contraseña debe componerse de una combinación de 8 caracteres, usando mayúsculas, minúsculas, un número y un símbolo.'
    )
});

export const refreshTokenConstraint = z.object({
  refresh_token: z.string()
});
