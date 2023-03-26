import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
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

  async validateUser(userId: number) {
    return this.userService.findOne({ id: userId });
  }

  generateTokens(payload: [token: string]) {
    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: `${this.configService.get<string>(
        'JWT_EXPIRATION_REFRESH_SECRET',
      )}s`,
      secret: this.configService.get<string>('JWT_REFRESH_SECRET_TOKEN'),
    });
    return [token, refreshToken];
  }

  async tokenIsActive(token: string, hash: string): Promise<boolean> {
    const tokenIsActive = await bcrypt.compare(token, hash || '');

    if (!tokenIsActive) {
      throw new ForbiddenException();
    }

    return true;
  }

  async setAuthTokens(
    res,
    payload,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = this.generateTokens(payload);

    await this.userService.update({
      id: payload.user_id,
      refreshToken: bcrypt.hashSync(refreshToken, 8),
    });

    res
      .cookie('access_token', accessToken, {
        httpOnly: true,
        domain: this.configService.get('DOMAIN'),
        expires: new Date(
          Date.now() + this.configService.get('JWT_EXPIRATION_SECRET') * 1000,
        ),
      })
      .cookie('refresh_token', refreshToken, {
        httpOnly: true,
        domain: this.configService.get('DOMAIN'),
        expires: new Date(
          Date.now() +
            this.configService.get('JWT_REFRESH_SECRET_TOKEN') * 1000,
        ),
      });

    return { accessToken, refreshToken };
  }

  async clearAuthTokens(res, user_id: number) {
    await this.userService.update({
      id: user_id,
      refreshToken: null,
    });

    res
      .clearCookie('access_token', {
        httpOnly: true,
        domain: this.configService.get('DOMAIN'),
      })
      .clearCookie('refresh_token', {
        httpOnly: true,
        domain: this.configService.get('DOMAIN'),
      });
  }
}
