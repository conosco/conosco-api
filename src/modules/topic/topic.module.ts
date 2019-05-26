import { Module } from '@nestjs/common';
import { Topic } from './topic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicType } from './topic-type.entity';

@Module({ imports: [TypeOrmModule.forFeature([Topic, TopicType])] })
export class TopicModule {}
