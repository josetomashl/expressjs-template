import z from 'zod';

export const createTagConstraint = z.object({
  name: z.string(),
  description: z.string().optional()
});

export const updateTagConstraint = z.object({
  name: z.string(),
  description: z.string().optional()
});
