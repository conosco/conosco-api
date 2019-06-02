import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { Repository } from 'typeorm';
import { Messages } from '../../consts/messages/messages.portuguese';
import { MESSAGES } from '@nestjs/core/constants';
import { JoinDTO } from './dto/group.join.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class GroupService {
  constructor(
    private userService: UserService,
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

  async subscribeUser(id: number, joinDTO: JoinDTO) {
    const group = await this.groupRepository.findOneOrFail(id);
    const user = await this.userService.findUserById(joinDTO.userId);
    group.users = await [user];
    await group.save();
    const groupWithUser = await this.groupRepository.find({
      relations: ['users'],
      where: { id: user.id },
    });
    return {
      message: Messages.success.GROUP_SUBSCRIBE_USER_SUCESS,
      data: groupWithUser,
    };
  }
}
