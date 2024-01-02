import { Module } from '@nestjs/common';
import { HoldingAccounts } from './holding.controller';
import { ApiService } from './holding.service';
import { DetailHolddingAccounts } from './details/details.controller';
import { DetailService } from './details/details.service';

@Module({
  controllers: [HoldingAccounts, DetailHolddingAccounts],
  providers: [ApiService, DetailService],
})
export class HoldingModule {}
