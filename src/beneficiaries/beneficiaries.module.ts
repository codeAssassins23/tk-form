import { Module } from '@nestjs/common';
import { BeneficiariesService } from './beneficiaries.service';
import { BeneficiariesController } from './beneficiaries.controller';
import { DetailService } from './details/details.service';
import { DetailBeneficiaries } from './details/details.controller';

@Module({
  controllers: [BeneficiariesController, DetailBeneficiaries],
  providers: [BeneficiariesService, DetailService],
})
export class BeneficiariesModule {}
