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

  @Column({ type: 'varchar', length: 40 })
  emailInfomation: string;

  @Column({ type: 'varchar', length: 20 })
  phoneInformation: string;

  @Column({ type: 'varchar', length: 100 })
  website: string;

  @Column({ type: 'varchar', length: 30 })
  TaxIdentificationNumber: string;

  @Column({ type: 'varchar', length: 40 })
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
  @Column({ type: 'varchar', length: 30 })
  bankCodeNumber: string;

  @Column({ type: 'varchar', length: 20 })
  estimatedTradeAmount: string;

  @Column({ type: 'varchar', length: 20 })
  estimatedOfMonthlyTransaction: string;

  @Column({ type: 'varchar', length: 25 })
  currenciesNeeded: string;

  //inicia el paso 3 del registro
  @Column({ type: 'varchar', length: 45 })
  companyRegistrationFile: string;

  @Column({ type: 'varchar', length: 45 })
  TaxIdentificationVerificationFile: string;

  @Column({ type: 'varchar', length: 45 })
  beneficialOwnershipVerificationFile: string;

  @Column({ type: 'varchar', length: 46 })
  GovernmentIssuedValidPhotoID: string;

  @Column({ type: 'varchar', length: 45 })
  proofOfAddressFile: string;

  //Empieza el tercer paso del registro para usd
  //Prueba de campos para USD
  @Column({ type: 'varchar', length: 45 })
  preferredMethodOfFunding: string;

  @Column({ type: 'varchar' })
  infoBank: string;

  //start four step of register
  @Column({ type: 'varchar' })
  infoAuthorizedUsers: string;

  //Start five step of register
  @Column({ type: 'varchar', length: 7 })
  ManyShouldersOwn25Percent: string;

  @Column({ type: 'varchar' })
  infoBeneficialOwner: string;

  //Start six step of register
  @Column({ type: 'varchar', length: 20 })
  nameAuthorizationMonex: string;

  @Column({ type: 'varchar', length: 20 })
  titlePositionAuthorizationMonex: string;

  @Column({ type: 'varchar', length: 20 })
  dateAuthorizationMonex: string;

  @Column({ type: 'varchar', length: 20 })
  uploadSignatureAuthorizationMonex: string;

  @Column({ type: 'int' })
  idLead: number;

  @Column({ type: 'varchar', select: false })
  status: string;
}
