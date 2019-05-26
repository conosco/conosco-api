import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { RewardType } from './reward-type.entity';

@Entity('reward')
export class Reward extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '255' })
  name: string;

  @Column({ type: 'varchar', length: '255' })
  description: string;

  @Column({ name: 'icon_url', type: 'varchar', length: '255' })
  iconUrl: string;

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

  @ManyToMany(type => User, user => user.rewards)
  users: User[];

  @ManyToOne(type => RewardType, type => type.rewards)
  @JoinColumn({ name: 'reward_type_id' })
  type: RewardType;
}
