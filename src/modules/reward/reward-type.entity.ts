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
import { Reward } from './reward.entity';

@Entity('reward_type')
export class RewardType extends BaseEntity {
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

  @OneToMany(type => Reward, reward => reward.type)
  rewards: Reward[];
}
