import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.isEmailUnique(createUserDto.email);
    if (!user) {
      return { message: 'El email ya existe' };
    }
    return this.userService.createUser(createUserDto);
  }

  @Get()
  findAllUser() {
    return this.userService.findAllUser();
  }

  @Get(':id')
  findOneUser(@Param('id') id: string) {
    return this.userService.findOneUser(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const test = await this.userService.updateUser(+id, updateUserDto);
    return test;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }
}
