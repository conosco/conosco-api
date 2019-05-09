import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { PayloadDTO } from './dto/auth.payload.dto';
import { LoginDTO } from './dto/auth.login-email.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signPayload(payload: PayloadDTO) {
    return sign(payload, process.env.TOKEN_SECRET_KEY, {
      expiresIn: process.env.TOKEN_EXPIRES_IN,
    });
  }

  async validateUser(payload: PayloadDTO) {
    return await this.userService.getUserByEmail(payload.email);
  }

  async validateLogin(loginDTO: LoginDTO) {
    const user = await this.userService.getAuthCredentials(loginDTO);

    if ((await user) == null) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isValid = await bcrypt.compareSync(loginDTO.password, user.password);

    if (await isValid) {
      return user;
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}
