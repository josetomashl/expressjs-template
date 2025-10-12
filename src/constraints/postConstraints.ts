import z from 'zod';

import { PostStatusEnum } from '../database/entities/Post';

export const createPostConstraint = z.object({
  title: z.string(),
  content: z.string(),
  status: z.enum(PostStatusEnum),
  tags: z.array(z.string())
});
export type CreatePostDTO = z.infer<typeof createPostConstraint>;

export const updatePostContraint = z.object({
  title: z.string(),
  content: z.string(),
  status: z.enum(PostStatusEnum),
  tags: z.array(z.string()),
  user_id: z.string().optional()
});
export type UpdatePostDTO = z.infer<typeof updatePostContraint>;
