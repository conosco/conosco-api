import { Body, Controller, Post, Get } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDTO } from './dto/auth.login-email.dto';
import { UserService } from '../user/user.service';
import { ApiUseTags } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { PayloadDTO } from './dto/auth.payload.dto';
import { RegisterDTO } from './dto/auth.register.dto';

@Controller('auth')
@ApiUseTags('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.findByLogin(userDTO);
    const payload: PayloadDTO = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePic: user.profilePic,
    };
    const token = await this.authService.signPayload(payload);
    return { token };
  }

  @Post('register')
  async register(@Body() user: RegisterDTO) {
    await this.userService.create(user);
    const payload: PayloadDTO = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePic: user.profilePic,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
