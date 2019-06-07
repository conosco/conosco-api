import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PayloadDTO } from './dto/auth.payload.dto';
import { LoginDTO } from './dto/auth.login-email.dto';
import { Messages } from '../../consts/messages/messages.portuguese';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signPayload(payload: PayloadDTO) {
    return this.jwtService.sign(payload);
  }

  async validateUser(payload: PayloadDTO) {
    return await this.userService.getUserByEmail(payload.email);
  }

  async validateLogin(loginDTO: LoginDTO) {
    const user = await this.userService.getUserWithPassword(loginDTO);

    if ((await user) == null) {
      throw new UnauthorizedException(Messages.error.INVALID_CREDENTIALS);
    }

    const isValid = await bcrypt.compareSync(loginDTO.password, user.password);

    if (await isValid) {
      const payload: PayloadDTO = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePic: user.profilePic,
      };
      const token = await this.signPayload(payload);
      return {
        data: {
          token,
          name: user.firstName,
          email: user.email,
          picture: user.profilePic,
        },
        message: Messages.success.LOGIN_SUCCESS,
      };
    } else {
      throw new UnauthorizedException(Messages.error.INVALID_CREDENTIALS);
    }
  }
}
