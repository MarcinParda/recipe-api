import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUsertDTO } from '../user/dto/create-user.dto';
import { LoginUsertDTO } from '../user/dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  async register(@Body() { email, password }: CreateUsertDTO, @Res() res) {
    const user = await this.authService.register({ email, password });
    this.authService.setAuthTokens(res, { user_id: user.id });

    return res.json({
      ...user,
      password: undefined,
    });
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() { email, password }: LoginUsertDTO, @Res() res) {
    const user = await this.authService.login({ email, password });
    this.authService.setAuthTokens(res, { user_id: user.id });

    return res.json({
      ...user,
      password: undefined,
    });
  }

  @Get('logout')
  async logout(@Res() res) {
    this.authService.clearAuthTokens(res);
    return res.json({ message: 'Logout successful' });
  }
}
