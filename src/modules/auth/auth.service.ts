import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { PayloadDTO } from './dto/auth.payload.dto';

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
}
