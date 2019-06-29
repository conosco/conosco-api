import { Module } from '@nestjs/common';
import { Topic } from './topic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicType } from './topic-type.entity';
import { TopicService } from './topic.service';
import { UserModule } from '../user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([Topic])],
    providers: [TopicService],
    exports: [TopicService],
})
export class TopicModule {}
