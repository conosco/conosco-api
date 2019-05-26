import {
  Entity,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Topic } from '../topic/topic.entity';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.comments, { primary: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(type => Topic, topic => topic.comments, { primary: true })
  @JoinColumn({ name: 'topic_id' })
  topic: Topic;

  @Column({ name: 'text', type: 'text' })
  text: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
    select: false,
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
    select: false,
  })
  updatedAt: string;
}
