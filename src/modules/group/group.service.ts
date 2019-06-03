import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async findAll() {
    return this.groupRepository.find();
  }

  async findOne(id: number) {
    return this.groupRepository.findOneOrFail(id);
  }

  async subscribeUser(id: number, userId: number) {
    await this.groupRepository
      .createQueryBuilder()
      .relation(Group, 'users')
      .of(id)
      .add(userId);
    return this.groupRepository
      .createQueryBuilder('group')
      .innerJoinAndSelect('group.users', 'user')
      .where('group.id = :id', { id })
      .where('user.id = :userId', { userId })
      .getOne();
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
    const group = await this.groupRepository
      .createQueryBuilder('group')
      .innerJoinAndSelect('group.users', 'user')
      .where('group.id = :id', { id })
      .getOne();
    if (!group) {
      throw new NotFoundException();
    }
    return group;
  }

  async findHabits(id: number) {
      const group = await this.groupRepository
        .createQueryBuilder('group')
        .innerJoinAndSelect('group.habits', 'habit')
        .where('group.id = :id', { id })
        .getOne();
      if (!group) {
        throw new NotFoundException();
      }
      return group;
  }
}
