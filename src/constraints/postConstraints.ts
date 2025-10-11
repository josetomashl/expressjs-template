import z from 'zod';

import { PostStatusEnum } from '../database/entities/Post';

export const createPostConstraint = z.object({
  title: z.string(),
  content: z.string(),
  status: z.enum(PostStatusEnum),
  tags: z.array(z.string())
});

export const updatePostContraint = z.object({
  title: z.string(),
  content: z.string(),
  status: z.enum(PostStatusEnum),
  tags: z.array(z.string()),
  user_id: z.string().optional()
});
