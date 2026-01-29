import hbs from 'hbs';
import { join } from 'path';
import { AppModule } from './app.module';
import { I18nValidationPipe } from 'nestjs-i18n';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';

import { I18nService } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    snapshot: true,
  });

  app.useGlobalPipes(new I18nValidationPipe(
    {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }
  ));
  const httpAdapter = app.get(HttpAdapterHost);
  const i18nService = app.get<I18nService<Record<string, unknown>>>(I18nService);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, i18nService));

  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public',
  });

  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.setViewEngine('hbs');

  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));

  app.use(require('express').urlencoded({ extended: true }));
  app.use(require('cookie-parser')());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
