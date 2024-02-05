import { Controller, Get, Render, Req } from '@nestjs/common';
import { RechargueService } from './rechargue.service';

@Controller('/admin')
export class RechargueController {
  constructor(private readonly rechargueService: RechargueService) {}

  @Get('/rechargue')
  @Render('rechargue/rechargue')
  async getRechargue(@Req() request: Request) {
    try {
      const user = request['user'];
      return {
        user: user,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
