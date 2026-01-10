
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/shared/decorators/public.decorator';
import { I18nService } from 'nestjs-i18n';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private i18nService: I18nService,
    private reflector: Reflector,
    private usersService: UsersService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(this.i18nService.t("validators.UNAUTHORIZED"));
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.usersService.findOneByPublicId(payload.sub);

      if (!user) {
        throw new UnauthorizedException(this.i18nService.t("validators.UNAUTHORIZED"));
      }

      request['user'] = user;
    } catch {
      throw new UnauthorizedException(this.i18nService.t("validators.UNAUTHORIZED"));
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
