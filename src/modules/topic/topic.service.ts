import {
    Injectable,
  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from './topic.entity';
import { Repository } from 'typeorm';
import { TopicDTO } from './dto/topic.dto';
import { User } from '../user/user.entity';

@Injectable()
  export class TopicService {
    constructor(
      @InjectRepository(Topic)
      private readonly topicRepository: Repository<Topic>,
    ) {}

    async findAll(groupId: number) {
      return this.topicRepository.find({relations: ['user']});
    }

    async findOne(id: number) {
      return this.topicRepository.findOneOrFail(id);
    }

    async createTopic(topicDTO: TopicDTO){
    const topic =  await this.topicRepository.create(topicDTO);
    return this.topicRepository.save(topic);
    }
  }
