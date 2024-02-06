import { Module } from '@nestjs/common';
import { TransactionController } from './transactions.controller';
import { TransactionService } from './transactions.service';
import { TransDetailsService } from './transactions_details/transDetails.service';
import { TransDetailsController } from './transactions_details/transDetails.controller';

@Module({
  providers: [TransactionService, TransDetailsService],
  controllers: [TransactionController, TransDetailsController],
})
export class TransactionsModule {}
