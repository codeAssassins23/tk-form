import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Leads } from './entities/leads.entity';
import { Repository } from 'typeorm';
import { Register } from './entities/register.entity';
import * as util from 'util';
import * as fs from 'fs';
import * as path from 'path';
import { MailService } from 'src/mail/email.service';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Leads)
    private readonly leadsRepository: Repository<Leads>,

    @InjectRepository(Register)
    private readonly registerRepository: Repository<Register>,

    private readonly mailService: MailService,
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

    // Enviar correo de notificación a la dirección específica después de guardar el registro
    const notificationEmail = 'customer-service@tkambio.us'; // Definir el correo al que notificar
    await this.mailService.sendRegistrationNotification(
      save,
      notificationEmail,
    );

    return save.idLead;
  }

  async findAllRegisterLeadsByEmail(email: string): Promise<any> {
    const leads = await this.leadsRepository.find({
      where: { status: '1', email: email },
    });

    leads.forEach((lead) => {
      if (lead.country === 'usd') {
        lead.country = 'Estados Unidos';
      } else if (lead.country === 'mxn') {
        lead.country = 'México';
      } else if (lead.country === 'word') {
        lead.country = 'Canada';
      }
    });

    return leads;
  }

  async findAllRegisterLeads(start: number, length: number): Promise<any> {
    const leads = await this.leadsRepository.find({
      where: { status: '1' },
      skip: start, // Cuántos registros se deben saltar
      take: length, // Cuántos registros se deben tomar
    });

    const leadsLenght = await this.leadsRepository.find({
      where: { status: '1' },
    });

    leads.forEach((lead) => {
      if (lead.country === 'usd') {
        lead.country = 'Estados Unidos';
      } else if (lead.country === 'mxn') {
        lead.country = 'México';
      } else if (lead.country === 'word') {
        lead.country = 'Canada';
      }
    });

    return { leads: leads, total: leadsLenght.length };
  }

  //registers
  async createRegisterAll(
    createRegisterDto: any,
    names: any,
  ): Promise<Register> {
    try {
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
      register.nameAuthorizationMonex =
        createRegisterDto.nameAuthorizationMonex;
      register.titlePositionAuthorizationMonex =
        createRegisterDto.titlePositionAuthorizationMonex;
      register.dateAuthorizationMonex =
        createRegisterDto.dateAuthorizationMonex;
      register.uploadSignatureAuthorizationMonex = names.idFirma;
      register.idLead = createRegisterDto.idLead;
      register.chequeAnulado = names.idChequeAnuladoUSD;
      register.situacionFiscal = names.idSituacionFiscal;

      register.status = '1';
      const save = await this.registerRepository.save(register);
      // Enviar correo de notificación a la dirección específica después de guardar el registro
      const notificationEmail = 'customer-service@tkambio.us'; // Definir el correo al que notificar
      await this.mailService.sendFinalRegistrationNotification(
        save,
        notificationEmail,
      );
      console.log(save, 'save');
      return save;
    } catch (error) {
      console.log(error, 'createRegisterAll');
    }
  }

  async findRegisterById(id: number): Promise<any> {
    try {
      let leads = await this.registerRepository.find({
        where: { idLead: id },
      });

      let lead = leads[0];

      if (lead.country === 'usd') {
        lead.country = 'Estados Unidos';
      } else if (lead.country === 'mxn') {
        lead.country = 'México';
      } else if (lead.country === 'word') {
        lead.country = 'Canada';
      }

      return lead;
    } catch (error) {
      console.log(error, 'findRegisterById');
    }
  }

  async findFilesByIdLead(
    namesFiles: object,
    directory: string,
  ): Promise<string[]> {
    try {
      const files = await this.readdir(directory);
      const namesValues = Object.values(namesFiles);
      const filteredFiles = files.filter((file) =>
        namesValues.some((name) => file.startsWith(name)),
      );
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
