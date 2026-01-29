import { Controller, Get, Render, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { GetUser } from './shared/decorators/get-user.decorator';
import { Public } from './shared/decorators/public.decorator';
import { Roles } from './shared/decorators/roles.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @UseGuards(AuthGuard)
  @Render('user/home')
  getHome(@GetUser() user) {
    return { user };
  }

  @Get('admin')
  @Roles('admin')
  @UseGuards(AuthGuard)
  @Render('admin/home')
  getAdminHome(@GetUser() user) {
    return { user };
  }

  @Get('landing-page')
  @Public()
  @Render('landing-page')
  getLandingPage() {
    return { user: null };
  }
}
