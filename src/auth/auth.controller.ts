import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Public } from 'src/shared/decorators/public.decorator';
import { Controller, Get, Post, Body, UseGuards, Req, Render } from '@nestjs/common';
import { Roles } from 'src/shared/decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @Public()
  register(@Body() RegisterAuthDto: RegisterAuthDto) {
    return this.authService.register(RegisterAuthDto);
  }

  @Roles('admin')
  @Post('register-admin')
  registerAdmin(@Body() RegisterAuthDto: RegisterAuthDto) {
    return this.authService.registerAdmin(RegisterAuthDto);
  }

  @Post('login')
  @Public()
  login(@Body() LoginAuthDto: LoginAuthDto) {
    return this.authService.localLogin(LoginAuthDto);
  }

  @Get('google')
  @Public()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
  }

  @Get('google-login/callback')
  @Public()
  @UseGuards(AuthGuard('google'))
  async googleLogin(@Req() req) {
    const user = req.user;
    return this.authService.googleLogin(user);
  }
}
