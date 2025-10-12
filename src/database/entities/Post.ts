import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { Tag } from './Tag';
import { User } from './User';

export enum PostStatusEnum {
  DRAFT = 'draft',
  PUBLISHED = 'published'
}

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  title!: string;

  @Column('text')
  content!: string;

  @Column({
    type: 'enum',
    enum: PostStatusEnum,
    default: PostStatusEnum.DRAFT
  })
  status!: PostStatusEnum;

  @ManyToOne(() => User, (user) => user.posts, { cascade: true })
  user!: User;

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable()
  tags!: Tag[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
