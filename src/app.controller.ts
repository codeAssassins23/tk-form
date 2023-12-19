import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  //Metodo que se ejecuta cuando se hace una peticion get a la ruta /
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('index')
  getHello(): string {
    return this.appService.getHello();
  }
}
