import { ValidationPipe } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import * as hbsUtils from 'hbs-utils';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //Validaciones globales de los DTO
  app.useGlobalPipes(new ValidationPipe());

  //Configuraciones para el uso de archivos estaticos y vistas
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  //Configuraciones para el uso de handlebars
  hbs.registerPartials(join(__dirname, '..', 'views/layouts'));
  hbsUtils(hbs).registerWatchedPartials(join(__dirname, '..', 'views/layouts'));
  app.setViewEngine('hbs');

  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3200',
    credentials: true,
  });
  await app.listen(3200);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();