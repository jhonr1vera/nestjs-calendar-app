
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

    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (token) {
      try {
        const payload = await this.jwtService.verifyAsync(token);
        const user = await this.usersService.findOneByPublicId(payload.sub);
        if (user) {
          request['user'] = user;
        }
      } catch {
        // If token is invalid, we ignore it.
      }
    }

    if (isPublic) {
      return true;
    }

    if (!request['user']) {
      throw new UnauthorizedException(this.i18nService.t("validators.UNAUTHORIZED"));
    }

    return true;
  }

  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type === 'Bearer') {
      return token;
    }

    // Check cookie
    if (request.cookies && request.cookies['access_token']) {
      return request.cookies['access_token'];
    }

    return undefined;
  }
}
