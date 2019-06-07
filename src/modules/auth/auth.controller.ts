import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDTO } from './dto/auth.login-email.dto';
import { UserService } from '../user/user.service';
import { ApiUseTags } from '@nestjs/swagger';
import { PayloadDTO } from './dto/auth.payload.dto';
import { RegisterDTO } from './dto/auth.register.dto';
import { RegisterFacebookDTO } from './dto/auth.register-facebook.dto';
import { ResponseTransformInterceptor } from '@kl/common/pipes/interceptors/response.pipe';
import { Messages } from '../../consts/messages/messages.portuguese';

@Controller('auth')
@ApiUseTags('auth')
@UseInterceptors(ResponseTransformInterceptor)
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const token = await this.authService.validateLogin(userDTO);
    return token;
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
    const data = await { token };
    return { data, message: Messages.success.REGISTER_SUCCESS };
  }

  @Post('registerFacebook')
  async registerFacebook(@Body() token: RegisterFacebookDTO) {}
}
