import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.name = createUserDto.name;
    user.surname = createUserDto.surname;
    user.age = createUserDto.age;
    user.email = createUserDto.email;
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    user.password = hashPassword;
    user.gender = createUserDto.gender;
    user.status = '1';
    user.role = createUserDto.role;
    const save_ = await this.userRepository.save(user);
    //
    delete save_.status;
    delete save_.password;
    return save_;
  }

  async findAllUser(): Promise<User[]> {
    return this.userRepository.find({
      where: { status: '1' },
      relations: ['role'],
    });
  }

  async finOneUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: email, status: '1' },
      relations: ['role'],
    });

    if (!user || user === undefined || user === null) {
      throw new NotFoundException(`Usuario no encontrado`);
    }

    return user;
  }

  async isEmailUnique(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email: email, status: '1' },
      relations: ['role'],
    });
    return !user; // Si user es null, el correo es único
  }

  async findOneUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { idUser: id, status: '1' },
      relations: ['role'],
    });

    if (!user || user === undefined || user === null) {
      throw new NotFoundException(`Usuario no encontrado`);
    }

    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const findUser = await this.userRepository.findOne({
      where: { idUser: id, status: '1' },
    });

    if (!findUser || findUser === undefined || findUser === null) {
      throw new NotFoundException(`No existe este usuario`);
    }
    let updated = Object.assign(findUser, updateUserDto); //nueva forma de crear, ahorra escribir campos

    const test = await this.userRepository.save(updated);
    return test;
  }

  /* Delete user */
  async removeUser(id: number): Promise<String> {
    // Buscar el usuario por ID
    const userToDelete = await this.userRepository.findOne({
      where: { idUser: id, status: '1' },
    });
    // Si no existe el usuario, se lanza una excepción
    if (!userToDelete) {
      throw new NotFoundException(`Usuario no existe`);
    }

    userToDelete.status = '0';
    this.userRepository.save(userToDelete);
    return 'Usuario Eliminado';
  }
}
