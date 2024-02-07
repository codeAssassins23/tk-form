import { Controller, Get, Render, Req, UseGuards } from '@nestjs/common';
import { RechargueService } from './rechargue.service';
import { RolesGuard } from 'src/auth/authRole.guard';
import { Roles } from 'src/auth/decorators/public.decorator';

@Controller('/admin')
@UseGuards(RolesGuard)
export class RechargueController {
  constructor(private readonly rechargueService: RechargueService) {}

  @Roles('ADMIN')
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
