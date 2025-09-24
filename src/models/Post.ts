import type { RowDataPacket } from 'mysql2/promise';

export type PostStatus = 'DRAFT' | 'FINAL';

export interface Post extends RowDataPacket {
  id: string;
  user_id: string;
  // user: User;
  title: string;
  content: string;
  // tags: Tag[];
  author: string;
  status: PostStatus;
  is_removed: boolean;
  created_at: Date;
  modified_at: Date | null;
}
