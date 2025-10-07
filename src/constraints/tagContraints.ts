import z from 'zod';

export const createTagConstraint = z.object({
  name: z.string()
});
