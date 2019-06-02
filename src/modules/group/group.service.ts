import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Group } from "./group.entity";
import { Repository } from "typeorm";
import { Messages } from '../../consts/messages/messages.portuguese';
import { MESSAGES } from "@nestjs/core/constants";

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>,
    ) { }

    async findAll() {
        const groups = await this.groupRepository.find();
        return {message: Messages.success.GROUPS_FIND_ALL_SUCESS, data:groups};
    }
}