import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUsertDTO } from '../user/dto/create-user.dto';
import { LoginUsertDTO } from '../user/dto/login-user.dto';
import { UserService } from '../user/user.service';
import bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async register(user: Pick<CreateUsertDTO, 'email' | 'password'>) {
    return this.userService.create(user);
  }

  async login({ email, password }: LoginUsertDTO) {
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }

  generateTokens(payload: [token: string]) {
    const token = this.jwtService.sign(payload);
    return [token];
  }

  setAuthTokens(res, payload): { accessToken: string } {
    const [accessToken] = this.generateTokens(payload);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      domain: this.configService.get('DOMAIN'),
      expires: new Date(
        Date.now() + this.configService.get('JWT_EXPIRATION_SECRET') * 1000,
      ),
    });

    return { accessToken };
  }

  clearAuthTokens(res) {
    res.clearCookie('access_token', {
      httpOnly: true,
      domain: this.configService.get('DOMAIN'),
    });
  }
}
