import { TransactionService } from './transactions.service';
import { Controller, Get, Render, Req } from '@nestjs/common';

@Controller('/admin')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('/transactions')
  @Render('transactions/get_transactions')
  async getTransactions(@Req() request: Request) {
    const cookies = await this.transactionService.loginAPI();
    const currencies = await this.transactionService.getCurrency(cookies);
    console.log(currencies);
    const user = request['user'];
    return {
      user: user,
    };
  }
}
