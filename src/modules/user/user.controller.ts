import {
    Controller,
    Get,
    UseInterceptors,
    Body,
    Param,
} from '@nestjs/common';

import { UserService } from '../user/user.service';
import { ApiUseTags } from '@nestjs/swagger';
import { ResponseTransformInterceptor } from '@kl/common/pipes/interceptors/response.pipe';
import { UserDTO } from './dto/user.dto';

@Controller('users')
@ApiUseTags('users')
@UseInterceptors(ResponseTransformInterceptor)
export class UserController {
    constructor(
        private userService: UserService,
    ) { }

    @Get('/')
    async getUsers() {
        const users = await this.userService.getUsers();
        return {
            message: 'Usuários recuperados com sucesso!',
            data: users
        };
    }

    @Get('/:email')
    async getUserByEmail(@Param('email') email) {
        const user = await this.userService.getUserByEmail(email);
        console.log(email)
        return {
            message: 'Usuário recuperado com sucesso!',
            data: user
        };
    }
}
