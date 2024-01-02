import { Controller, Get, Render, Req } from '@nestjs/common';
import { ApiService } from 'src/holding_accounts/holding.service';

@Controller('/admin')
export class AdminController {
  constructor(private readonly apiService: ApiService) {}

  @Get('/dashboard')
  @Render('admin/index')
  async index(@Req() request: Request) {
    const cookies = await this.apiService.loginAPI();
    const user = request['user'];
    return { user: user };
  }
}
