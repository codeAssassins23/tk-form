import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async createRol(createRoleDto: CreateRoleDto): Promise<Role> {
    const rol: Role = new Role();
    rol.name = createRoleDto.name;
    rol.description = createRoleDto.description;
    rol.status = '1';

    const roleCreate = await this.roleRepository.save(rol);
    delete roleCreate.status;
    return roleCreate;
  }

  findAllRoles(): Promise<Role[]> {
    return this.roleRepository.find({ where: { status: '1' } });
  }

  async findOneRol(id: number): Promise<Role> {
    const rol = await this.roleRepository.findOne({
      where: { idRole: id, status: '1' },
    });
    if (!rol || rol === undefined || rol === null) {
      throw new NotFoundException(`Rol no encontrado`);
    }
    return rol;
  }

  async updateRol(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const finRol = await this.roleRepository.find({
      where: { idRole: id, status: '1' },
    });
    if (finRol.length === 0 || finRol === undefined || finRol === null) {
      throw new NotFoundException(`No existe este rol`);
    }
    const rol = this.roleRepository.create(updateRoleDto); //nueva forma de crear, ahorra escribir campos
    rol.idRole = id;
    return this.roleRepository.save(rol);
  }

  async removeRol(id: number): Promise<String> {
    const roleToDelete = await this.roleRepository.find({
      where: { idRole: id, status: '1' },
    });

    if (roleToDelete.length === 0 || !roleToDelete) {
      throw new NotFoundException(`Rol no existe`);
    }

    roleToDelete[0].status = '0';
    this.roleRepository.save(roleToDelete[0]);
    return 'Rol eliminado';
  }
}
