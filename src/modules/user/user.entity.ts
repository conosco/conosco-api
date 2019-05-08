import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity('user')
export class User extends BaseEntity {
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @ApiModelProperty()
  @Column({ type: 'varchar', length: '255' })
  username: string;

  @IsString()
  @ApiModelProperty()
  @Column({ type: 'varchar', length: '255', unique: true })
  email: string;

  @IsString()
  @Exclude()
  @Column({ type: 'varchar', length: '255' })
  password: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: string;
}