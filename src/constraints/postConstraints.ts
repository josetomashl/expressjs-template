import z from 'zod';

export const createPostConstraint = z.object({
  title: z.string(),
  author: z.string()
});

export const updatePostContraint = z.object({
  title: z.string(),
  author: z.string()
});
