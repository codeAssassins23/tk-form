import { Controller, Get, Render, Req, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/authRole.guard';
import { Roles } from 'src/auth/decorators/public.decorator';
import { ApiService } from 'src/holding_accounts/holding.service';

@Controller('/admin')
@UseGuards(RolesGuard)
export class AdminController {
  constructor(private readonly apiService: ApiService) {}

  @Get('/dashboard')
  @Roles('ADMIN')
  @Render('admin/index')
  async index(@Req() request: Request) {
    const cookies = await this.apiService.loginAPI();
    const user = request['user'];
    return { user: user };
  }
}
