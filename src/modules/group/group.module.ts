import { Module } from '@nestjs/common';
import { Group } from './group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({ imports: [TypeOrmModule.forFeature([Group])] })
export class GroupModule {}
