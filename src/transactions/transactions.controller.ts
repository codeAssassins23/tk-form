import { RolesGuard } from 'src/auth/authRole.guard';
import { TransactionService } from './transactions.service';
import { Controller, Get, Render, Req, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/public.decorator';

@Controller('/admin')
@UseGuards(RolesGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Roles('ADMIN')
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

  @Roles('ADMIN')
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
