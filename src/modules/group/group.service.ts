import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Group } from "./group.entity";
import { Repository } from "typeorm";

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>,
    ) { }

    async findAll() {
        return await this.groupRepository.find();
    }
}