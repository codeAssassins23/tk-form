import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Leads } from './entities/leads.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Leads)
    private readonly registerRepository: Repository<Leads>,
  ) {}

  async createRegisterStepOne(createRegisterDto: any): Promise<Leads> {
    const register: Leads = new Leads();
    register.fullName = createRegisterDto.fullName;
    register.email = createRegisterDto.email;
    register.corporate = createRegisterDto.corporate;
    register.phone = createRegisterDto.phone;
    register.country = createRegisterDto.country;
    register.status = '1';
    const save = await this.registerRepository.save(register);
    console.log(save, 'save');
    return save;
  }

  async findAllRegisterLeads(): Promise<Leads[]> {
    return this.registerRepository.find({
      where: { status: '1' },
    });
  }
}
