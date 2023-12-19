import { Controller, Get, Render, Req } from '@nestjs/common';

@Controller('/admin')
export class AdminController {
  @Get('/dashboard')
  @Render('admin/index')
  index(@Req() request: Request) {
    const user = request['user'];
    return { user: user };
  }
}
