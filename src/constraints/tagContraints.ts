import z from 'zod';

export const createTagConstraint = z.object({
  name: z.string().min(2, 'Tag name is required'),
  description: z.string().optional()
});
export type CreateTagDTO = z.infer<typeof createTagConstraint>;

export const updateTagConstraint = z.object({
  name: z.string().min(2, 'Tag name is required'),
  description: z.string().optional()
});
export type UpdateTagDTO = z.infer<typeof updateTagConstraint>;
