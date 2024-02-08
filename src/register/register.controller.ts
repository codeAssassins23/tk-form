import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RegisterService } from './register.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/public.decorator';
import { RolesGuard } from 'src/auth/authRole.guard';
import { leadsDto } from './dto/create-leads.dto';
import { create } from 'domain';
@Controller('/')
@UseGuards(RolesGuard)
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Public()
  @Get('/register')
  @Render('register/register')
  async getRegister(@Req() request: Request) {
    try {
      const user = request['user'];
      return {
        user: user,
      };
    } catch (error) {
      console.log(error);
    }
  }

  //Para la tabla
  @Public()
  @Get('/AllLeads')
  async getLeads(@Req() request: Request) {
    try {
      const leads = await this.registerService.findAllRegisterLeads();
      return {
        data: leads,
        recordsTotal: leads.length,
        recordsFiltered: leads.length,
      };
    } catch (error) {
      console.log(error);
    }
  }

  @Public()
  @Get('/register/steps')
  @Render('register/register_stepper')
  async registerSteps(@Req() request: Request) {
    try {
      const user = request['user'];
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/Allregister')
  @Roles('SuperAdmin')
  @Render('register/get_registers')
  async registerList(@Req() request: Request) {
    try {
      const user = request['user'];
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/leads')
  @Roles('SuperAdmin')
  @Render('register/leads')
  async registerLeads(@Req() request: Request) {
    try {
      const user = request['user'];
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  //recoger datos del front (post) step 1
  @Public()
  @Post('/registerStepOne')
  async registerStepOne(@Body() createListDto: leadsDto) {
    console.log('hola desde el controlador registerStepOne');
    console.log(createListDto);

    const register =
      await this.registerService.createRegisterStepOne(createListDto);
    return register;
  }

  //recoger todo los datos del form (post)
  @Public()
  @Post('/registerAll')
  async registerAll(@Body() createRegisterDto: any) {
    console.log('hola desde el controlador registerAll');
    console.log(createRegisterDto);
    const register =
      await this.registerService.createRegisterAll(createRegisterDto);

    return register;
  }
}
