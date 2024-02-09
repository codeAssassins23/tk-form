import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Query,
  Render,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RegisterService } from './register.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/public.decorator';
import { RolesGuard } from 'src/auth/authRole.guard';
import { leadsDto } from './dto/create-leads.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@Controller('/')
@UseGuards(RolesGuard)
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  //registro de usuario incial
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

  //Para la tabla de leads
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

  //registro de usuario si pasa el formulario inicial, se le redirige a este formulario
  @Public()
  @Get('/register/steps/:id')
  @Render('register/register_stepper')
  async registerSteps(@Req() request: Request) {
    try {
      const user = request['user'];
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  //Vista de registros generales
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

  //vista de registros de leads
  @Get('/leads')
  @Roles('SuperAdmin')
  @Render('register/leads')
  async registerLeads(@Param('id') id: number, @Req() request: Request) {
    try {
      const user = request['user'];
      return { user: user, id: id };
    } catch (error) {
      console.log(error);
    }
  }

  //recoger datos del front (post) step 1
  @Public()
  @Post('/registerStepOne')
  async registerStepOne(@Body() createListDto: leadsDto) {
    const register =
      await this.registerService.createRegisterStepOne(createListDto);
    return register;
  }

  //recoger files
  @Public()
  @Post('/uploadFilesOne')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/temp',
        filename: (req, file, cb) => {
          const idLeads = Math.floor(Math.random() * 100) + 1;
          return cb(null, `${idLeads}ActaConstitutiva.pdf`);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'pdf',
        })

        .addMaxSizeValidator({
          maxSize: 20000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file.filename);
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
