import { Module } from '@nestjs/common';
import { HoldingAccounts } from './holding.controller';

@Module({
  controllers: [HoldingAccounts],
})
export class HoldingModule {}
