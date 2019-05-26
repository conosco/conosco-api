import { Module } from '@nestjs/common';
import { Topic } from './topic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({ imports: [TypeOrmModule.forFeature([Topic])] })
export class TopicModule {}
