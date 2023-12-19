import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

/* import TypeORMModule
 *and the User entity so we can use it in our user service.
 */
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
