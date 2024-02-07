import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leads } from './entities/leads.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Leads])],
  controllers: [RegisterController],
  providers: [RegisterService],
  exports: [RegisterService],
})
export class RegisterModule {}
