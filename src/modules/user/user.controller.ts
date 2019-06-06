import {
    Controller,
    Get,
    UseInterceptors,
} from '@nestjs/common';

import { UserService } from '../user/user.service';
import { ApiUseTags } from '@nestjs/swagger';
import { ResponseTransformInterceptor } from '@kl/common/pipes/interceptors/response.pipe';

@Controller('user')
@ApiUseTags('user')
@UseInterceptors(ResponseTransformInterceptor)
export class UserController {
    constructor(
        private userService: UserService,
    ) { }

    @Get('getAllUsers')
    async getUsers() {
        const users = await this.userService.getUsers();
        // console.log("users = ", users);
        return {
            message: 'Usuários recuperados com sucesso!',
            data: users
        };
    }
}