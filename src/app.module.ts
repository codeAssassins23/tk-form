import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

/* Group different functionalities into one */
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'n0deJS0704',
      username: 'postgres',
      autoLoadEntities: true,
      database: 'bd_tkambio',
      synchronize: true,
      logging: true,
    }),
    UserModule,
    RolesModule,
    AuthModule,
    AdminModule,
  ],
  controllers: [AppController], //Routes that can have this module
  providers: [AppService], //Service that can have this module
})
export class AppModule {}
