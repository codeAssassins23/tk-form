import { Controller, Get, Render, Req } from '@nestjs/common';
import { TransDetailsService } from './transDetails.service';

@Controller('/admin')
export class TransDetailsController {
  constructor(private readonly transDetailsService: TransDetailsService) {}

  @Get('/transactions/details')
  @Render('transactions/detail_transactions')
  async getTransactionsDetails(@Req() request: Request) {
    const user = request['user'];
    return {
      user: user,
    };
  }
}
