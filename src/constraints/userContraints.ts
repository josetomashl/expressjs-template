import z from 'zod';

import { regex } from '../constants/regex';
import { RolesEnum } from '../database/entities/User';

export const createUserConstraint = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8)
    .regex(
      regex.password,
      'La contraseña debe componerse de una combinación de 8 caracteres, usando mayúsculas, minúsculas, un número y un símbolo.'
    ),
  name: z.string(),
  surname: z.string(),
  role: z.enum(RolesEnum)
});
export type CreateUserDTO = z.infer<typeof createUserConstraint>;

export const updateUserConstraint = z.object({
  email: z.email().optional(),
  password: z
    .string()
    .min(8)
    .regex(
      regex.password,
      'La contraseña debe componerse de una combinación de 8 caracteres, usando mayúsculas, minúsculas, un número y un símbolo.'
    )
    .optional(),
  name: z.string().optional(),
  surname: z.string().optional(),
  role: z.enum(RolesEnum).optional()
});
export type UpdateUserDTO = z.infer<typeof updateUserConstraint>;
