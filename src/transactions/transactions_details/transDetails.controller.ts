import { Controller, Get, Render, Req, UseGuards } from '@nestjs/common';
import { TransDetailsService } from './transDetails.service';
import { RolesGuard } from 'src/auth/authRole.guard';
import { Roles } from 'src/auth/decorators/public.decorator';

@Controller('/admin')
@UseGuards(RolesGuard)
export class TransDetailsController {
  constructor(private readonly transDetailsService: TransDetailsService) {}

  @Roles('ADMIN')
  @Get('/transactions/details')
  @Render('transactions/detail_transactions')
  async getTransactionsDetails(@Req() request: Request) {
    const user = request['user'];
    return {
      user: user,
    };
  }
}
