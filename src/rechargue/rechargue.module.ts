import { Module } from '@nestjs/common';
import { RechargueService } from './rechargue.service';
import { RechargueController } from './rechargue.controller';

@Module({
  providers: [RechargueService],
  controllers: [RechargueController],
})
export class RechargueModule {}
