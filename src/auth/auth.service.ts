import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(createAuthDto: CreateAuthDto): Promise<any> {
    const user = await this.userService.finOneUserByEmail(createAuthDto.email);
    if (!user || user.status === '0') {
      throw new UnauthorizedException(`Credenciales invalidas`);
    }
    if (!(await bcrypt.compare(createAuthDto.password, user.password))) {
      throw new UnauthorizedException(`Credenciales invalidas`);
    }
    const payload = {
      sub: user.idUser,
      email: user.email,
      role: user.role,
      name: user.name,
      surname: user.surname,
    };
    const jwt = await this.jwtService.signAsync(payload);
    return {
      message: 'success',
      jwt,
    };
  }
}
