import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDTO } from './dto/auth.login-email.dto';
import { UserService } from '../user/user.service';
import { ApiUseTags } from '@nestjs/swagger';
import { PayloadDTO } from './dto/auth.payload.dto';
import { RegisterDTO } from './dto/auth.register.dto';
import { RegisterFacebookDTO } from './dto/auth.register-facebook.dto';

@Controller('auth')
@ApiUseTags('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.validateLogin(userDTO);
    const payload: PayloadDTO = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePic: user.profilePic,
    };
    const token = await this.authService.signPayload(payload);
    return {
      token,
      name: user.firstName,
      email: user.email,
    };
  }

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    const user = await this.userService.create(registerDTO);
    const payload: PayloadDTO = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePic: user.profilePic,
    };
    const token = await this.authService.signPayload(payload);
    return { token };
  }

  @Post('registerFacebook')
  async registerFacebook(@Body() token: RegisterFacebookDTO) {}
}
