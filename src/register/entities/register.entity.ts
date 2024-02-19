import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Register {
  @PrimaryGeneratedColumn()
  idRegister: number;

  @Column({ type: 'varchar', length: 255 })
  fullName: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  corporate: string;

  @Column({ type: 'varchar', length: 40 })
  phone: string;

  @Column({ type: 'varchar', length: 30 })
  country: string;

  //Empieza el primer paso del registro

  @Column({ type: 'varchar', length: 255 })
  corporateName: string;

  @Column({ type: 'varchar', length: 255 })
  tradeNameOfDBA: string;

  @Column({ type: 'varchar', length: 50 })
  state: string;

  @Column({ type: 'varchar', length: 50 })
  city: string;

  @Column({ type: 'varchar', length: 40 })
  postalCode: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'varchar', length: 255 })
  emailInfomation: string;

  @Column({ type: 'varchar', length: 40 })
  phoneInformation: string;

  @Column({ type: 'varchar', length: 255 })
  website: string;

  @Column({ type: 'varchar', length: 40 })
  TaxIdentificationNumber: string;

  @Column({ type: 'varchar', length: 255 })
  industry: string;

  @Column({ type: 'varchar', length: 255 })
  natureOfBusiness: string;

  @Column({ type: 'varchar', length: 20 })
  DateOfIncorporation: string;

  @Column({ type: 'varchar', length: 255 })
  typeOfBusiness: string;

  @Column({ type: 'varchar', length: 255 })
  isTheApplicant: string;

  //Empieza el segundo paso del registro
  @Column({ type: 'varchar', length: 255 })
  purposeOfTransactions: string;

  //Solo para mxn este campo
  @Column({ type: 'varchar', length: 40 })
  bankCodeNumber: string;

  @Column({ type: 'varchar', length: 20 })
  estimatedTradeAmount: string;

  @Column({ type: 'varchar', length: 20 })
  estimatedOfMonthlyTransaction: string;

  @Column({ type: 'varchar', length: 255 })
  currenciesNeeded: string;

  //inicia el paso 3 del registro
  @Column({ type: 'varchar', length: 45 })
  companyRegistrationFile: string;

  @Column({ type: 'varchar', length: 45 })
  TaxIdentificationVerificationFile: string;

  @Column({ type: 'varchar', length: 45 })
  beneficialOwnershipVerificationFile: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  GovernmentIssuedValidPhotoID: string;

  @Column({ type: 'varchar', length: 45 })
  proofOfAddressFile: string;

  //Empieza el tercer paso del registro para usd
  //Prueba de campos para USD
  @Column({ type: 'varchar', length: 45, nullable: true })
  preferredMethodOfFunding: string;

  @Column({ type: 'json', nullable: true })
  infoBank: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  chequeAnulado: string;

  //start four step of register
  @Column({ type: 'json', nullable: true })
  infoAuthorizedUsers: string;

  //Start five step of register
  @Column({ type: 'varchar', length: 7 })
  ManyShouldersOwn25Percent: string;

  @Column({ type: 'json', nullable: true })
  infoBeneficialOwner: string;

  //Start six step of register
  @Column({ type: 'varchar', length: 255 })
  nameAuthorizationMonex: string;

  @Column({ type: 'varchar', length: 255 })
  titlePositionAuthorizationMonex: string;

  @Column({ type: 'varchar', length: 20 })
  dateAuthorizationMonex: string;

  @Column({ type: 'varchar', length: 45 })
  uploadSignatureAuthorizationMonex: string;

  @Column({ type: 'int' })
  idLead: number;

  @Column({ type: 'varchar', select: false })
  status: string;
}
