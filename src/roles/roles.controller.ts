import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Public()
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRol(createRoleDto);
  }
  //Prueba
  @Get()
  //@Render('index')
  async findAll() {
    const roles = await this.rolesService.findAllRoles();
    return this.rolesService.findAllRoles();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOneRol(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.updateRol(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.removeRol(+id);
  }
}
