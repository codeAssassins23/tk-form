import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leads } from './entities/leads.entity';
import { Register } from './entities/register.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Leads, Register])],
  controllers: [RegisterController],
  providers: [RegisterService],
  exports: [RegisterService],
})
export class RegisterModule {}
