import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Register {
  @PrimaryGeneratedColumn()
  idRegister: number;

  @Column({ type: 'varchar', length: 40 })
  fullName: string;

  @Column({ type: 'varchar', length: 30 })
  email: string;

  @Column({ type: 'varchar', length: 40 })
  corporate: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 15 })
  country: string;

  //Empieza el primer paso del registro

  @Column({ type: 'varchar', length: 40 })
  corporateName: string;

  @Column({ type: 'varchar', length: 40 })
  tradeNameOfDBA: string;

  @Column({ type: 'varchar', length: 40 })
  state: string;

  @Column({ type: 'varchar', length: 40 })
  city: string;

  @Column({ type: 'varchar', length: 40 })
  postalCode: string;

  @Column({ type: 'varchar', length: 40 })
  address: string;

  @Column({ type: 'varchar', length: 30 })
  emailInfomation: string;

  @Column({ type: 'varchar', length: 20 })
  phoneInformation: string;

  @Column({ type: 'varchar', length: 100 })
  website: string;

  @Column({ type: 'varchar', length: 30 })
  TaxIdentificationNumber: string;

  @Column({ type: 'varchar', length: 20 })
  industry: string;

  @Column({ type: 'varchar', length: 60 })
  natureOfBusiness: string;

  @Column({ type: 'varchar', length: 10 })
  DateOfIncorporation: string;

  @Column({ type: 'varchar', length: 50 })
  typeOfBusiness: string;

  @Column({ type: 'varchar', length: 40 })
  isTheApplicant: string;

  //Empieza el segundo paso del registro
  @Column({ type: 'varchar', length: 100 })
  purposeOfTransactions: string;

  //Solo para mxn este campo
  @Column({ type: 'varchar', length: 100 })
  bankCodeNumber: string;

  @Column({ type: 'varchar', length: 15 })
  annualVolume: string;

  @Column({ type: 'varchar', length: 15 })
  estimatedOfTransaction: string;

  @Column({ type: 'varchar', length: 15 })
  currenciesNeeded: string;

  //Empieza el tercer paso del registro
  @Column({ type: 'varchar', length: 45 })
  preferredMethodOfFunding: string;

  @Column({ type: 'json' })
  infoBank: string;

  @Column({ type: 'varchar', select: false })
  status: string;
}
