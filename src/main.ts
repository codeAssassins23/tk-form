/* eslint-disable prettier/prettier */
import { BadRequestException, ValidationPipe } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import * as hbsUtils from 'hbs-utils';
import * as cookieParser from 'cookie-parser';
import {
  HttpExceptionFilter,
  UnauthorizedExceptionFilter,
} from './errors/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //Validaciones globales de los DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: false,
      exceptionFactory(errors) {
        const messages = errors.map(
          (error) => `${error} - ${Object.values(error).join(', ')}`,
        );
        console.log(messages);
        return new BadRequestException(messages);
      },
    }),
  );

  //Configuraciones para el uso de archivos estaticos y vistas
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  //Configuraciones para el uso de handlebars
  hbs.registerPartials(join(__dirname, '..', 'views/layouts'));
  hbsUtils(hbs).registerWatchedPartials(join(__dirname, '..', 'views/layouts'));
  app.setViewEngine('hbs');

  //Configuraciones para el uso de helpers
  hbs.registerHelper('ifEquals', function (value, comparator, options) {
    if (value === comparator) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  hbs.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
      case '==':
        return v1 == v2 ? options.fn(this) : options.inverse(this);
      // Puedes añadir más operadores aquí si es necesario
    }
  });

  hbs.registerHelper('isNotNull', function (value, options) {
    return value !== null ? options.fn(this) : options.inverse(this);
  });

  hbs.registerHelper('ifNotEqualsAny', function (value, options) {
    const knownValues = [
      'Individual/Propietario Único o LLC de un solo miembro',
      'Fideicomiso/Patrimonio',
      'Corporación C',
      'Corporación S',
      'Cooperativa',
      'Asociación',
      'Corporación',
    ]; // Añade todos los valores conocidos aquí
    if (!knownValues.includes(value)) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  hbs.registerHelper('isChecked', function (value, applicantValues) {
    const valuesArray = applicantValues.split(', '); // Asegúrate de que el separador coincida con cómo estás separando los valores en la cadena.
    return valuesArray.includes(value.trim()) ? 'checked' : '';
  });

  app.use(cookieParser());
  app.enableCors({
    origin: process.env.BASE_URL,
    credentials: true,
  });

  //Exception filters
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new UnauthorizedExceptionFilter(),
  );

  await app.listen(process.env.PORT || 3200);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
