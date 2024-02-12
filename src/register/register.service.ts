import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Leads } from './entities/leads.entity';
import { Repository } from 'typeorm';
import { Register } from './entities/register.entity';
import * as util from 'util';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Leads)
    private readonly leadsRepository: Repository<Leads>,

    @InjectRepository(Register)
    private readonly registerRepository: Repository<Register>,
  ) {}

  private readonly readdir = util.promisify(fs.readdir);
  private readonly rename = util.promisify(fs.rename);
  async createRegisterStepOne(createRegisterDto: any): Promise<number> {
    const register: Leads = new Leads();
    register.fullName = createRegisterDto.fullName;
    register.email = createRegisterDto.email;
    register.corporate = createRegisterDto.corporate;
    register.phone = createRegisterDto.phone;
    register.country = createRegisterDto.country;
    register.status = '1';
    const save = await this.leadsRepository.save(register);
    console.log(save, 'save');
    return save.idLead;
  }

  async findAllRegisterLeads(): Promise<Leads[]> {
    return this.leadsRepository.find({
      where: { status: '1' },
    });
  }

  //registers
  async createRegisterAll(
    createRegisterDto: any,
    names: any,
  ): Promise<Register> {
    const register: Register = new Register();
    register.fullName = createRegisterDto.fullName;
    register.email = createRegisterDto.email;
    register.corporate = createRegisterDto.corporate;
    register.phone = createRegisterDto.phone;
    register.country = createRegisterDto.country;
    register.corporateName = createRegisterDto.corporateName;
    register.tradeNameOfDBA = createRegisterDto.tradeNameOfDBA;
    register.state = createRegisterDto.state;
    register.city = createRegisterDto.city;
    register.postalCode = createRegisterDto.postalCode;
    register.address = createRegisterDto.address;
    register.emailInfomation = createRegisterDto.emailInfomation;
    register.phoneInformation = createRegisterDto.phoneInformation;
    register.website = createRegisterDto.website;
    register.TaxIdentificationNumber =
      createRegisterDto.TaxIdentificationNumber;
    register.industry = createRegisterDto.industry;
    register.natureOfBusiness = createRegisterDto.natureOfBusiness;
    register.DateOfIncorporation = createRegisterDto.DateOfIncorporation;
    register.typeOfBusiness = createRegisterDto.typeOfBusiness;
    register.isTheApplicant = createRegisterDto.isTheApplicant;
    //step 2
    register.purposeOfTransactions = createRegisterDto.purposeOfTransactions;
    register.bankCodeNumber = createRegisterDto.bankCodeNumber;
    register.estimatedTradeAmount = createRegisterDto.estimatedTradeAmount;
    register.estimatedOfMonthlyTransaction =
      createRegisterDto.estimatedOfMonthlyTransaction;
    register.currenciesNeeded = createRegisterDto.currenciesNeeded;
    //paso 3
    register.companyRegistrationFile = names.idActaConstitutiva;
    register.TaxIdentificationVerificationFile = names.idCedulaIdentificacion;
    register.beneficialOwnershipVerificationFile = names.idActaPoderes;
    register.GovernmentIssuedValidPhotoID =
      names.idIdentificacionSociosPersonasAutorizadas;
    register.proofOfAddressFile = names.idComprobanteDomicilio;
    //paso 3 para USD
    register.preferredMethodOfFunding =
      createRegisterDto.preferredMethodOfFunding;
    register.infoBank = createRegisterDto.infoBank;

    //step 4
    register.infoAuthorizedUsers = createRegisterDto.infoAuthorizedUsers;
    //step 5
    register.ManyShouldersOwn25Percent =
      createRegisterDto.ManyShouldersOwn25Percent;
    register.infoBeneficialOwner = createRegisterDto.infoBeneficialOwner;
    //step 6
    register.nameAuthorizationMonex = createRegisterDto.nameAuthorizationMonex;
    register.titlePositionAuthorizationMonex =
      createRegisterDto.titlePositionAuthorizationMonex;
    register.dateAuthorizationMonex = createRegisterDto.dateAuthorizationMonex;
    register.uploadSignatureAuthorizationMonex = names.idFirma;

    register.status = '1';
    const save = await this.registerRepository.save(register);
    console.log(save, 'save');

    return save;
  }

  async findAllRegister(): Promise<Register[]> {
    return this.registerRepository.find({
      where: { status: '1' },
    });
  }

  async findFilesByIdLead(
    namesFiles: object,
    directory: string,
  ): Promise<string[]> {
    try {
      const files = await this.readdir(directory);
      console.log(files, 'files');
      const namesValues = Object.values(namesFiles);
      console.log(namesValues);
      const filteredFiles = files.filter((file) =>
        namesValues.some((name) => file.startsWith(name)),
      );
      console.log(filteredFiles, 'filteredFiles');
      return filteredFiles;
    } catch (error) {
      throw new Error(`Error al leer el directorio: ${error.message}`);
    }
  }

  async moveFilesByIdLead(
    files: string[],
    sourceDirectory: string,
    targetDirectory: string,
  ): Promise<void> {
    try {
      for (const file of files) {
        const sourcePath = path.join(sourceDirectory, file);
        const targetPath = path.join(targetDirectory, file);
        await this.rename(sourcePath, targetPath);
      }
    } catch (error) {
      throw new Error(`Error al mover los archivos: ${error.message}`);
    }
  }
}
