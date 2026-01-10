
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { I18nService } from 'nestjs-i18n';
import { IS_PUBLIC_KEY } from 'src/shared/decorators/public.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private readonly i18nService: I18nService) { }

    canActivate(context: ExecutionContext): boolean {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }

        let roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            roles = ['user', 'admin'];
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user || !user.role || !roles.includes(user.role.name)) {
            throw new ForbiddenException(this.i18nService.t("validators.FORBIDDEN_RESOURCE"));
        }

        return true;
    }
}
