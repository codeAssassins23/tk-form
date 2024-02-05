import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { HoldingModule } from './holding_accounts/holding.module';
import { ConfigModule } from '@nestjs/config';
import { BeneficiariesModule } from './beneficiaries/beneficiaries.module';
import { TransactionsModule } from './transactions/transactions.module';
import { PaymentModule } from './payments/payments.module';
import { RechargueModule } from './rechargue/rechargue.module';

/* Group different functionalities into one */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: process.env.DATA_BASE_PASSWORD,
      username: process.env.DATA_BASE_USER,
      autoLoadEntities: true,
      database: process.env.DATA_BASE_NAME,
      synchronize: true,
      logging: true,
    }),
    UserModule,
    RolesModule,
    AuthModule,
    AdminModule,
    HoldingModule,
    BeneficiariesModule,
    TransactionsModule,
    PaymentModule,
    RechargueModule,
  ],
  controllers: [AppController], //Routes that can have this module
  providers: [AppService], //Service that can have this module
})
export class AppModule {}
