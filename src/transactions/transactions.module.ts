import { Module } from '@nestjs/common';
import { TransactionController } from './transactions.controller';
import { TransactionService } from './transactions.service';

@Module({
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionsModule {}
