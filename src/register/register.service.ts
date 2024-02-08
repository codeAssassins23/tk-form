import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Leads } from './entities/leads.entity';
import { Repository } from 'typeorm';
import { Register } from './entities/register.entity';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Leads)
    private readonly leadsRepository: Repository<Leads>,

    @InjectRepository(Register)
    private readonly registerRepository: Repository<Register>,
  ) {}

  async createRegisterStepOne(createRegisterDto: any): Promise<Leads> {
    const register: Leads = new Leads();
    register.fullName = createRegisterDto.fullName;
    register.email = createRegisterDto.email;
    register.corporate = createRegisterDto.corporate;
    register.phone = createRegisterDto.phone;
    register.country = createRegisterDto.country;
    register.status = '1';
    const save = await this.leadsRepository.save(register);
    console.log(save, 'save');
    return save;
  }

  async findAllRegisterLeads(): Promise<Leads[]> {
    return this.leadsRepository.find({
      where: { status: '1' },
    });
  }

  //registers
  async createRegisterAll(createRegisterDto: any): Promise<Register> {
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
    register.natureOfBusiness = createRegisterDto.natureOfBusiness;
    register.TaxIdentificationNumber =
      createRegisterDto.TaxIdentificationNumber;
    register.industry = createRegisterDto.industry;
    register.DateOfIncorporation = createRegisterDto.DateOfIncorporation;
    register.typeOfBusiness = createRegisterDto.typeOfBusiness;
    register.isTheApplicant = createRegisterDto.isTheApplicant;
    register.purposeOfTransactions = createRegisterDto.purposeOfTransactions;
    register.bankCodeNumber = createRegisterDto.bankCodeNumber;
    register.annualVolume = createRegisterDto.annualVolume;
    register.estimatedOfTransaction = createRegisterDto.estimatedOfTransaction;
    register.currenciesNeeded = createRegisterDto.currenciesNeeded;
    register.preferredMethodOfFunding =
      createRegisterDto.preferredMethodOfFunding;
    register.infoBank = createRegisterDto.infoBank;
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
}
