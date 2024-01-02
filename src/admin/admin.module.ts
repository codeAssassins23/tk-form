import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { ApiService } from 'src/holding_accounts/holding.service';

@Module({
  controllers: [AdminController],
  providers: [ApiService]
})
export class AdminModule {}
