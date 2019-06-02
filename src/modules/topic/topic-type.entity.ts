import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Topic } from './topic.entity';

@Entity('topic_type')
export class TopicType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'type', type: 'varchar', length: '255' })
  type: string;

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

  @OneToMany(type => Topic, topic => topic.type)
  topics: Topic[];
}
