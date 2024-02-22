import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseFilePipeBuilder,
  Post,
  Query,
  Render,
  Req,
  Res,
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
import { Response } from 'express';
import { join } from 'path';
import { QueryDto } from './dto/query.dto';

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
  async getLeads(@Req() request: Request, @Query() queryParams: any) {
    try {
      if (queryParams.columns[0].search.value !== '') {
        const leads = await this.registerService.findAllRegisterLeadsByEmail(
          queryParams.columns[0].search.value,
        );
        return {
          data: leads,
          recordsTotal: 1,
          recordsFiltered: 1,
        };
      } else if (queryParams.columns[0].search.value === '') {
        const leads = await this.registerService.findAllRegisterLeads(
          queryParams.start,
          queryParams.length,
        );
        return {
          data: leads.leads,
          recordsTotal: leads.total,
          recordsFiltered: leads.total,
        };
      }
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
      return { user };
    } catch (error) {
      console.log(error);
    }
  }

  //Vista de registros generales tabla
  @Get('/registerList')
  @Roles('SuperAdmin')
  async registerListTable(@Req() request: Request, @Query() queryParams: any) {
    try {
      if (queryParams.columns[0].search.value !== '') {
        const register = await this.registerService.findUserRegisterByEmail(
          queryParams.columns[0].search.value,
        );
        return {
          data: register,
          recordsTotal: 1,
          recordsFiltered: 1,
        };
      } else if (queryParams.columns[0].search.value === '') {
        const register = await this.registerService.findAllRegister(
          queryParams.start,
          queryParams.length,
        );
        return {
          data: register.register,
          recordsTotal: register.total,
          recordsFiltered: register.total,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  //details leads r3gister
  @Get('/details/:id')
  @Roles('SuperAdmin')
  @Render('register/detail_leads')
  async detailsRegisters(@Req() request: Request, @Param('id') id: number) {
    try {
      const user = request['user'];
      const lead = await this.registerService.findRegisterById(id);
      if (!lead) {
        return {
          message: 'No se encontró el registro con el ID proporcionado',
          user,
        };
      }
      return { user: user, lead };
    } catch (error) {
      console.log(error);
    }
  }

  //download pdfs
  @Get('/download/:file')
  @Roles('SuperAdmin')
  async downloadFile(@Param('file') file: string, @Res() res: Response) {
    try {
      const filePath = join(__dirname, '..', '..', 'upload', 'files', file);
      res.download(filePath);
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
    const user = await this.registerService.findUserRegisterByEmail(
      createListDto.email,
    );
    console.log(user.length);
    if (user.length !== 0) {
      return { message: 'Usuario ya registrado', email: createListDto.email };
    }

    const register =
      await this.registerService.createRegisterStepOne(createListDto);
    return register;
  }

  //recoger file Acta constitutiva o licencia comercial
  @Public()
  @Post('/uploadFilesOne/:idLead')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/temp',
        filename: (req, file, cb) => {
          const idLeads = req.params.idLead;
          return cb(null, `${idLeads}-ActaConstitutiva.pdf`);
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
  ) {}

  //recoger files Cédula de identificación fiscal
  @Public()
  @Post('/uploadFilesTwo/:idLead')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/temp',
        filename: (req, file, cb) => {
          const idLeads = req.params.idLead;
          return cb(null, `${idLeads}-CedulaIdentificacion.pdf`);
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
  ) {}

  //recoger files Acta de poderes
  @Public()
  @Post('/uploadFilesThree/:idLead')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/temp',
        filename: (req, file, cb) => {
          const idLeads = req.params.idLead;
          return cb(null, `${idLeads}-actaPoderes.pdf`);
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
  ) {}

  //recoger files Identificación oficial de todos los socios y las personas autorizadas
  @Public()
  @Post('/uploadFilesFour/:idLead')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/temp',
        filename: (req, file, cb) => {
          const idLeads = req.params.idLead;
          return cb(
            null,
            `${idLeads}-IdentificacionSociosPersonasAutorizadas.pdf`,
          );
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
  ) {}

  //recoger files Comprobante de domicilio
  @Public()
  @Post('/uploadFilesFive/:idLead')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/temp',
        filename: (req, file, cb) => {
          const idLeads = req.params.idLead;
          return cb(null, `${idLeads}-comprobanteDomicilio.pdf`);
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
  ) {}

  //recoger files firma
  @Public()
  @Post('/uploadFilesSix/:idLead')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/temp',
        filename: (req, file, cb) => {
          const idLeads = req.params.idLead;
          return cb(null, `${idLeads}-firma.pdf`);
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
  ) {}

  //recoger files  cheque anulado
  @Public()
  @Post('/uploadFilethreUSD/:idLead')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/temp',
        filename: (req, file, cb) => {
          const idLeads = req.params.idLead;
          return cb(null, `${idLeads}-chequeAnulado.pdf`);
        },
      }),
    }),
  )
  async uploadFilethreUSD(
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
  ) {}

  //recoger files  situacion fiscal
  @Public()
  @Post('/uploadFileOneSituacionFiscal/:idLead')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/temp',
        filename: (req, file, cb) => {
          const idLeads = req.params.idLead;
          return cb(null, `${idLeads}-sitacionFiscal.pdf`);
        },
      }),
    }),
  )
  async uploadFileOneSituacionFiscal(
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
  ) {}

  //recoger todo los datos del form (post)
  @Public()
  @Post('/registerAll/:id')
  async registerAll(
    @Body() createRegisterDto: createRegisterDto,
    @Param('id') id: number,
  ) {
    try {
      const idActaConstitutiva = `${id}-ActaConstitutiva.pdf`;
      const idCedulaIdentificacion = `${id}-CedulaIdentificacion.pdf`;
      const idActaPoderes = `${id}-actaPoderes.pdf`;
      const idIdentificacionSociosPersonasAutorizadas = `${id}-IdentificacionSociosPersonasAutorizadas.pdf`;
      const idComprobanteDomicilio = `${id}-comprobanteDomicilio.pdf`;
      const idFirma = `${id}-firma.pdf`;
      const idChequeAnuladoUSD = `${id}-chequeAnulado.pdf`;
      const idSituacionFiscal = `${id}-sitacionFiscal.pdf`;

      const directory = './upload/temp';
      const targetDirectory = './upload/files';

      let names = {
        idActaConstitutiva,
        idCedulaIdentificacion,
        idActaPoderes,
        idIdentificacionSociosPersonasAutorizadas,
        idComprobanteDomicilio,
        idFirma,
        idChequeAnuladoUSD,
        idSituacionFiscal,
      };

      const namesFiles = await this.registerService.findFilesByIdLead(
        names,
        directory,
      );

      await this.registerService.moveFilesByIdLead(
        namesFiles,
        directory,
        targetDirectory,
      );

      function updateNamesWithFoundFiles(names, namesFiles) {
        const updatedNames = {};

        // Itera sobre los archivos encontrados
        namesFiles.forEach((file) => {
          // Extrae el ID del archivo del nombre del archivo
          const fileId = file.split('-')[0]; // Asume que el ID siempre está al inicio seguido de un guion
          const fileType = file.split('-')[1].split('.')[0]; // Extrae el tipo de archivo basado en el nombre

          // Busca la clave en el objeto `names` que coincide con el tipo de archivo
          Object.keys(names).forEach((key) => {
            if (names[key] && names[key].includes(fileType)) {
              // Actualiza el objeto `updatedNames` con el archivo encontrado
              updatedNames[key] = file;
            }
          });
        });

        return updatedNames;
      }
      // Actualiza el objeto `names` con los archivos realmente encontrados
      let namesUpdate = updateNamesWithFoundFiles(names, namesFiles);
      const register = await this.registerService.createRegisterAll(
        createRegisterDto,
        namesUpdate,
      );

      return 'Success';
    } catch (error) {
      console.log(error);
      return 'Error';
    }
  }
}
