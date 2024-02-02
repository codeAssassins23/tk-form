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
    const user = request['user'];
    return {
      currencies: currencies,
      user: user,
    };
  }

  @Get('/getTransactions')
  async transactionsInProgress(@Req() request: Request) {
    const cookies = await this.transactionService.loginAPI();
    const transactions = await this.transactionService.getTransactions(cookies);
    console.log();
    return {
      data: [],
      recordsTotal: 0,
      recordsFiltered: 0,
    };
  }
}
