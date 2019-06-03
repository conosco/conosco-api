import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { Repository } from 'typeorm';
import { Messages } from '../../consts/messages/messages.portuguese';
import { UserService } from '../user/user.service';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async findAll() {
    const groups = await this.groupRepository.find();
    return { message: Messages.success.GROUPS_FIND_ALL_SUCESS, data: groups };
  }
  async findOne(id: number) {
    const group = await this.groupRepository.findOneOrFail(id);
    return { message: Messages.success.GROUP_FIND_ONE_SUCESS, data: group };
  }

  async subscribeUser(id: number, userId: number) {
    await this.groupRepository
      .createQueryBuilder()
      .relation(Group, 'users')
      .of(id)
      .add(userId);

    const group = await this.groupRepository
      .createQueryBuilder('group')
      .innerJoinAndSelect('group.users', 'user')
      .where('group.id = :id', { id })
      .where('user.id = :userId', { userId })
      .getOne();

    return {
      message: Messages.success.GROUP_SUBSCRIBE_USER_SUCESS,
      data: group,
    };
  }

  async unsubscribeUser(id: number, userId: number) {
    await this.groupRepository
      .createQueryBuilder()
      .relation(Group, 'users')
      .of(id)
      .remove(userId);

    return {
      message: Messages.success.GROUP_UNSUBSCRIBE_USER_SUCESS,
    };
  }
}
