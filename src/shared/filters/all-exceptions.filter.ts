import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ApiUtil } from 'src/shared/utils/api.util';
import { I18nValidationException, I18nService, I18nContext } from 'nestjs-i18n';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    constructor(
        private readonly httpAdapterHost: HttpAdapterHost,
        private readonly i18n: I18nService
    ) { }

    catch(exception: unknown, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        let message: string | object = exception instanceof HttpException
            ? exception.getResponse()
            : 'Internal Server Error';

        if (exception instanceof I18nValidationException) {
            const validationErrors = exception.errors || [];
            const lang = I18nContext.current()?.lang || 'en';

            const formattedErrors = validationErrors.map(error => {
                const constraints = error.constraints;
                const property = error.property;
                if (!constraints) return [];

                return Object.keys(constraints).map(key => {
                    const translationKey = constraints[key];
                    const [keyPath, argsString] = translationKey.split('|');
                    const args = argsString ? JSON.parse(argsString) : {};
                    const translatedProperty = this.i18n.translate(`properties.${property}`, {
                        lang: lang,
                        defaultValue: property
                    });

                    return this.i18n.translate(keyPath, {
                        lang: lang,
                        args: { ...args, property: translatedProperty },
                    });
                });
            }).flat();

            message = {
                statusCode: httpStatus,
                message: formattedErrors,
                error: 'Bad Request'
            };
        }

        const responseBody = {
            statusCode: httpStatus,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
            message: message,
        };

        if (ApiUtil.isDevEnvironment()) {
            if (exception instanceof I18nValidationException) {
                this.logger.debug(`Validation Error in ${responseBody.path}: ${JSON.stringify(message)}`);
            } else {
                this.logger.error(`Error detected in ${responseBody.path}`);
                if (exception instanceof Error) {
                    this.logger.error(exception.message);
                    this.logger.debug(exception.stack);
                } else {
                    this.logger.error(exception);
                }
            }
        } else {
            if (httpStatus === HttpStatus.INTERNAL_SERVER_ERROR) {
                this.logger.error(`Critical Error at ${responseBody.path}: ${exception instanceof Error ? exception.message : exception}`);
            }
        }

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
