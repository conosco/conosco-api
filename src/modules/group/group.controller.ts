import { Controller, UseInterceptors, Get, Param } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { ResponseTransformInterceptor } from "@kl/common/pipes/interceptors/response.pipe";
import { UserService } from "../user/user.service";
import { GroupService } from "./group.service";

@Controller('groups')
@ApiUseTags('groups')
@UseInterceptors(ResponseTransformInterceptor)
export class GroupController {
    constructor(
        private userService: UserService,
        private groupService: GroupService,
    ) { }

    @Get()
    async findAll() {
        const groups = await this.groupService.findAll();
        return groups;
    }

    @Get(':id')
    async findOne(@Param('id') id:number) {
        const group = await this.groupService.findOne(id);
        return group;

    }

}
