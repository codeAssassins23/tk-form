import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
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
import { createRegisterDto } from './dto/create-register.dto';
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

  @Get('/details')
  @Roles('SuperAdmin')
  @Render('register/detail_leads')
  async detailsRegisters(@Req() request: Request) {
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

  //recoger file Acta constitutiva o licencia comercial
  @Public()
  @Post('/uploadFilesOne')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/temp',
        filename: (req, file, cb) => {
          const idLeads = Math.floor(Math.random() * 100) + 1;
          return cb(null, `10-ActaConstitutiva.pdf`);
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

  //recoger files Cédula de identificación fiscal
  @Public()
  @Post('/uploadFilesTwo')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/temp',
        filename: (req, file, cb) => {
          const idLeads = Math.floor(Math.random() * 100) + 1;
          return cb(null, `10-CedulaIdentificacion.pdf`);
        },
      }),
    }),
  )
  async uploadFileTwo(
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

  //recoger files Acta de poderes
  @Public()
  @Post('/uploadFilesThree')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/temp',
        filename: (req, file, cb) => {
          const idLeads = Math.floor(Math.random() * 100) + 1;
          return cb(null, `10-actaPoderes.pdf`);
        },
      }),
    }),
  )
  async uploadFileThree(
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

  //recoger files Identificación oficial de todos los socios y las personas autorizadas
  @Public()
  @Post('/uploadFilesFour')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/temp',
        filename: (req, file, cb) => {
          const idLeads = Math.floor(Math.random() * 100) + 1;
          return cb(null, `10-IdentificacionSociosPersonasAutorizadas.pdf`);
        },
      }),
    }),
  )
  async uploadFileFour(
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

  //recoger files Comprobante de domicilio
  @Public()
  @Post('/uploadFilesFive')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/temp',
        filename: (req, file, cb) => {
          const idLeads = Math.floor(Math.random() * 100) + 1;
          return cb(null, `10-comprobanteDomicilio.pdf`);
        },
      }),
    }),
  )
  async uploadFileFive(
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

  //recoger files firma
  @Public()
  @Post('/uploadFilesSix')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/temp',
        filename: (req, file, cb) => {
          const idLeads = Math.floor(Math.random() * 100) + 1;
          return cb(null, `10-firma.pdf`);
        },
      }),
    }),
  )
  async uploadFileSix(
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
  async registerAll(@Body() createRegisterDto: createRegisterDto) {
    console.log(createRegisterDto);
    const idLeads = '10';
    const idActaConstitutiva = `${idLeads}-ActaConstitutiva.pdf`;
    const idCedulaIdentificacion = `${idLeads}-CedulaIdentificacion.pdf`;
    const idActaPoderes = `${idLeads}-actaPoderes.pdf`;
    const idIdentificacionSociosPersonasAutorizadas = `${idLeads}-IdentificacionSociosPersonasAutorizadas.pdf`;
    const idComprobanteDomicilio = `${idLeads}-comprobanteDomicilio.pdf`;
    const idFirma = `${idLeads}-firma.pdf`;

    const directory = './upload/temp';
    const targetDirectory = './upload/files';

    let names = {
      idActaConstitutiva,
      idCedulaIdentificacion,
      idActaPoderes,
      idIdentificacionSociosPersonasAutorizadas,
      idComprobanteDomicilio,
      idFirma,
    };

    const namesFiles = await this.registerService.findFilesByIdLead(
      names,
      directory,
    );

    console.log(namesFiles, 'namesFiles');

    await this.registerService.moveFilesByIdLead(
      namesFiles,
      directory,
      targetDirectory,
    );

    const register = await this.registerService.createRegisterAll(
      createRegisterDto,
      names,
    );

    return register;
  }
}
