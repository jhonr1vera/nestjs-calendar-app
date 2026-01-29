import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Public } from 'src/shared/decorators/public.decorator';
import { Controller, Get, Post, Body, UseGuards, Req, Render, Res } from '@nestjs/common';
import { Roles } from 'src/shared/decorators/roles.decorator';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }


  @Get('register')
  @Public()
  @Render('auth/register')
  showRegister() {
  }

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

  @Get('login')
  @Public()
  @Render('auth/login')
  showLogin() {
  }

  @Post('login')
  @Public()
  async login(@Body() LoginAuthDto: LoginAuthDto, @Res() res: Response) {
    const token = await this.authService.localLogin(LoginAuthDto);
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600 * 1000,
    });
    return res.redirect('/');
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
  @Post('logout')
  @Public()
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return this.authService.logout();
  }
}
