import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUsertDTO } from '../user/dto/create-user.dto';
import { LoginUsertDTO } from '../user/dto/login-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { RefreshAuthGuard } from './refresh.guard';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() { email, password }: CreateUsertDTO,
    @Res({ passthrough: true }) res,
  ) {
    const user = await this.authService.register({ email, password });
    await this.authService.setAuthTokens(res, {
      user_id: user.id,
    });

    return user;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() { email, password }: LoginUsertDTO,
    @Res({ passthrough: true }) res,
  ) {
    const user = await this.authService.login({ email, password });
    await this.authService.setAuthTokens(res, {
      user_id: user.id,
    });

    return user;
  }

  @Post('refresh')
  @UseGuards(RefreshAuthGuard)
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req, @Res() res) {
    await this.authService.tokenIsActive(
      req?.cookies?.['refresh_token'],
      req.user.refreshToken,
    );

    await this.authService.setAuthTokens(res, {
      user_id: req.user.id,
    });

    res.json({
      message: 'Token refreshed.',
    });
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req, @Res({ passthrough: true }) res) {
    await this.authService.clearAuthTokens(res, req.user.id);
    return {
      message: 'Logged out',
    };
  }
}
