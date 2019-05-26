import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Group } from '../group/group.entity';
import { Comment } from '../comment/comment.entity';
import { TopicType } from './topic-type.entity';
import { Vote } from '../vote/vote.entity';

@Entity('topic')
export class Topic extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title', type: 'varchar', length: '255' })
  title: string;

  @Column({ name: 'text', type: 'text' })
  text: string;

  @Column({ name: 'image_url', type: 'varchar', length: '255', nullable: true })
  imageUrl: string;

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

  @ManyToOne(type => User, user => user.topics)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(type => Group, group => group.topics)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @ManyToOne(type => TopicType, type => type.topics)
  @JoinColumn({ name: 'topic_type_id' })
  type: TopicType;

  @OneToMany(type => Comment, comment => comment.topic)
  comments: Comment[];

  @OneToMany(type => Vote, vote => vote.topic)
  votes: Vote[];
}
