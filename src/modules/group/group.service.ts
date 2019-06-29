import {
  Injectable,
  NotFoundException,
  Body,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { Repository } from 'typeorm';
import { TopicDTO } from '../topic/dto/topic.dto';
import { TopicService } from '../topic/topic.service';
import { GroupDTO } from './dto/group.dto';
import { Messages } from '../../consts/messages/messages.portuguese';
import { HabitService } from '../habit/habit.service';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    private topicService: TopicService,
    private habitService: HabitService
  ) {}

  async findAll() {
    return this.groupRepository.find();
  }

  async findOne(arg: any) {
    return this.groupRepository.findOneOrFail(arg);
  }

  async subscribeUser(id: number, userId: number) {
    await this.groupRepository
      .createQueryBuilder()
      .relation(Group, 'users')
      .of(id)
      .add(userId);
    const subscribedUser = await this.groupRepository
    .createQueryBuilder('group')
    .innerJoinAndSelect('group.users', 'user')
    .where('group.id = :id', { id })
    .where('user.id = :userId', { userId })
    .getOne();
    return subscribedUser;
  }

  async unsubscribeUser(id: number, userId: number) {
    await this.groupRepository
      .createQueryBuilder()
      .relation(Group, 'users')
      .of(id)
      .remove(userId);
    return null;
  }

  async findUsers(id: number) {
    const group = await this.groupRepository.find({where: {id}, relations: ['users'], select: ['users']});
    if (!group) {
      throw new NotFoundException(Messages.error.NOT_FOUND);
    }
    return group;
  }

  async findTopics(id: number) {
    const groupWithTopics = await this.groupRepository.find({where: {id}, relations: ['topics', 'topics.user', 'topics.type']});
    if (!groupWithTopics) {
      throw new NotFoundException(Messages.error.NOT_FOUND);
    }
    return groupWithTopics;
  }

  async findHabits(id: number) {
      const group = await this.groupRepository
        .createQueryBuilder('group')
        .innerJoinAndSelect('group.habits', 'habit')
        .where('group.id = :id', { id })
        .getOne();
      if (!group) {
        throw new NotFoundException(Messages.error.NOT_FOUND);
      }
      return group;
  }

  async createTopic(id: number, topicDTO: TopicDTO) {
    topicDTO.groupId = Number(id);
    const topic = await this.topicService.createTopic(topicDTO);
    return topic;
  }

  async create(groupDTO: GroupDTO){
    const group =  await this.groupRepository.create(groupDTO);
    try {
      const habits = await this.habitService.findMany(groupDTO.habits);
      group.habits = habits;      
    } catch (error) {
      throw error;
    } finally {
      return this.groupRepository.save(group);
    }
  }
}
