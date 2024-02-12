import { Exclude, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsEmail,
  ValidateNested,
} from 'class-validator';

class infoBankDto {
  @IsString()
  @MinLength(1, { message: 'El name debe tener al menos 1 caracteres' })
  @IsNotEmpty({ message: 'El name es requerido' })
  name: string;
}

class InfoBeneficialOwnerDto {
  @IsString()
  @MinLength(1, { message: 'El name debe tener al menos 1 caracteres' })
  @IsNotEmpty({ message: 'El name es requerido' })
  name: string;
}

class InfoAuthorizedUsersDto {
  @IsString()
  @MinLength(1, { message: 'El name debe tener al menos 1 caracteres' })
  @IsNotEmpty({ message: 'El name es requerido' })
  name: string;
}

export class createRegisterDto {
  @IsString()
  @MinLength(1, { message: 'El nombre debe tener al menos 1 caracteres' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  fullName: string;

  @IsString()
  @MinLength(1, { message: 'El email debe tener al menos 1 caracteres' })
  @IsEmail({}, { message: 'El email debe ser válido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @IsString()
  @MinLength(1, { message: 'El corporate debe tener al menos 1 caracteres' })
  @IsNotEmpty({ message: 'El nombre de la empresa es requerido' })
  corporate: string;

  @IsString()
  @MinLength(1, { message: 'El phone debe tener al menos 1 caracteres' })
  @IsNotEmpty({ message: 'El teléfono es requerido' })
  phone: string;

  @IsString()
  @MinLength(1, { message: 'El country debe tener al menos 1 caracteres' })
  @IsNotEmpty({ message: 'El país es requerido' })
  country: string;

  //Empieza el primer paso del registro
  @IsString()
  @MinLength(1, {
    message: 'El corporateName debe tener al menos 1 caracteres',
  })
  @IsNotEmpty({ message: 'El corporateName es requerido' })
  corporateName: string;

  @IsString()
  @MinLength(1, {
    message: 'El tradeNameOfDBA debe tener al menos 1 caracteres',
  })
  @IsNotEmpty({ message: 'El tradeNameOfDBA es requerido' })
  tradeNameOfDBA: string;

  @IsString()
  @MinLength(1, { message: 'El state debe tener al menos 1 caracteres' })
  @IsNotEmpty({ message: 'El state es requerido' })
  state: string;

  @IsString()
  @MinLength(1, { message: 'El city debe tener al menos 1 caracteres' })
  @IsNotEmpty({ message: 'El city es requerido' })
  city: string;

  @IsString()
  @MinLength(1, { message: 'El postalCode debe tener al menos 1 caracteres' })
  @IsNotEmpty({ message: 'El postalCode es requerido' })
  postalCode: string;

  @IsString()
  @MinLength(1, { message: 'El address debe tener al menos 1 caracteres' })
  @IsNotEmpty({ message: 'El address es requerido' })
  address: string;

  @IsString()
  @MinLength(1, {
    message: 'El emailInfomation debe tener al menos 1 caracteres',
  })
  @IsNotEmpty({ message: 'El emailInfomation es requerido' })
  emailInfomation: string;

  @IsString()
  @MinLength(1, {
    message: 'El phoneInformation debe tener al menos 1 caracteres',
  })
  @IsNotEmpty({ message: 'El phoneInformation es requerido' })
  phoneInformation: string;

  @IsString()
  @MinLength(1, { message: 'El website debe tener al menos 1 caracteres' })
  @IsNotEmpty({ message: 'El website es requerido' })
  website: string;

  @IsString()
  @MinLength(1, {
    message: 'El natureOfBusiness debe tener al menos 1 caracteres',
  })
  @IsNotEmpty({ message: 'El natureOfBusiness es requerido' })
  natureOfBusiness: string;

  @IsString()
  @MinLength(1, {
    message: 'El TaxIdentificationNumber debe tener al menos 1 caracteres',
  })
  @IsNotEmpty({ message: 'El TaxIdentificationNumber es requerido' })
  TaxIdentificationNumber: string;

  @IsString()
  @MinLength(1, { message: 'El industry debe tener al menos 1 caracteres' })
  @IsNotEmpty({ message: 'El industry es requerido' })
  industry: string;

  @IsString()
  @MinLength(1, {
    message: 'El DateOfIncorporation debe tener al menos 1 caracteres',
  })
  @IsNotEmpty({ message: 'El DateOfIncorporation es requerido' })
  DateOfIncorporation: string;

  @IsString()
  @MinLength(1, {
    message: 'El typeOfBusiness debe tener al menos 1 caracteres',
  })
  @IsNotEmpty({ message: 'El typeOfBusiness es requerido' })
  typeOfBusiness: string;

  @IsString()
  @MinLength(1, {
    message: 'El isTheApplicant debe tener al menos 1 caracteres',
  })
  @IsNotEmpty({ message: 'El isTheApplicant es requerido' })
  isTheApplicant: string;

  @IsString()
  @MinLength(1, {
    message: 'El purposeOfTransactions debe tener al menos 1 caracteres',
  })
  @IsNotEmpty({ message: 'El purposeOfTransactions es requerido' })
  purposeOfTransactions: string;

  @IsString()
  @MinLength(1, {
    message: 'El bankCodeNumber debe tener al menos 1 caracteres',
  })
  @IsNotEmpty({ message: 'El bankCodeNumber es requerido' })
  bankCodeNumber: string;

  @IsString()
  @MinLength(1, {
    message: 'El anualVolume debe tener al menos 1 caracteres',
  })
  @IsNotEmpty({ message: 'El anualVolume es requerido' })
  estimatedTradeAmount: string;

  @IsString()
  @MinLength(1, {
    message: 'El estimatedOfTransaction debe tener al menos 1 caracteres',
  })
  @IsNotEmpty({ message: 'El estimatedOfTransaction es requerido' })
  estimatedOfMonthlyTransaction: string;

  @IsString()
  @MinLength(1, {
    message: 'El estimatedOfTransaction debe tener al menos 1 caracteres',
  })
  @IsNotEmpty({ message: 'El estimatedOfTransaction es requerido' })
  currenciesNeeded: string;

  /* @IsString()
  @MinLength(1, {
    message: 'El companyRegistrationFile debe tener al menos 1 caracteres',
  })
  @IsNotEmpty({ message: 'El companyRegistrationFile es requerido' })
  companyRegistrationFile: string;

  @IsString()
  @MinLength(1, {
    message:
      'El TaxIdentificationVerificationFile debe tener al menos 1 caracteres',
  })
  @IsNotEmpty({ message: 'El TaxIdentificationVerificationFile es requerido' })
  TaxIdentificationVerificationFile: string;

  @IsString()
  @MinLength(1, {
    message:
      'El beneficialOwnershipVerificationFile debe tener al menos 1 caracteres',
  })
  @IsNotEmpty({
    message: 'El beneficialOwnershipVerificationFile es requerido',
  })
  beneficialOwnershipVerificationFile: string;

  @IsString()
  @MinLength(1, {
    message: 'El GovernmentIssuedValidPhotoID debe tener al menos 1 caracteres',
  })
  @IsNotEmpty({
    message: 'El GovernmentIssuedValidPhotoID es requerido',
  })
  GovernmentIssuedValidPhotoID: string;

  @IsString()
  @MinLength(1, {
    message: 'El proofOfAddressFile debe tener al menos 1 caracteres',
  })
  @IsNotEmpty({
    message: 'El proofOfAddressFile es requerido',
  })
  proofOfAddressFile: string; */
  //Empieza el tercer paso del registro para usd
  //Prueba de campos para USD
  @IsString()
  @MinLength(1, {
    message: 'El preferredMethodOfFunding debe tener al menos 1 caracteres',
  })
  @IsNotEmpty({
    message: 'El preferredMethodOfFunding es requerido',
  })
  preferredMethodOfFunding: string;

  @ValidateNested()
  @Type(() => infoBankDto)
  infoBank: infoBankDto;

  @ValidateNested()
  @Type(() => InfoAuthorizedUsersDto)
  infoAuthorizedUsers: InfoAuthorizedUsersDto;

  @IsString()
  @MinLength(1, {
    message: 'El ManyShouldersOwn25Percent debe tener al menos 1 caracteres',
  })
  @IsNotEmpty({
    message: 'El ManyShouldersOwn25Percent es requerido',
  })
  ManyShouldersOwn25Percent: string;

  @ValidateNested()
  @Type(() => InfoBeneficialOwnerDto)
  infoBeneficialOwner: InfoBeneficialOwnerDto;

  @IsString()
  @MinLength(1, {
    message: 'El nameAuthorizationMonex debe tener al menos 1 caracteres',
  })
  @IsNotEmpty({
    message: 'El nameAuthorizationMonex es requerido',
  })
  nameAuthorizationMonex: string;

  @IsString()
  @MinLength(1, {
    message:
      'El titlePositionAuthorizationMonex debe tener al menos 1 caracteres',
  })
  @IsNotEmpty({
    message: 'El titlePositionAuthorizationMonex es requerido',
  })
  titlePositionAuthorizationMonex: string;

  @IsString()
  @MinLength(1, {
    message: 'El dateAuthorizationMonex debe tener al menos 1 caracteres',
  })
  @IsNotEmpty({
    message: 'El dateAuthorizationMonex es requerido',
  })
  dateAuthorizationMonex: string;

  @IsString()
  @MinLength(1, {
    message:
      'El uploadSignatureAuthorizationMonex debe tener al menos 1 caracteres',
  })
  @IsNotEmpty({
    message: 'El uploadSignatureAuthorizationMonex es requerido',
  })
  uploadSignatureAuthorizationMonex: string;

  @Exclude()
  status: string;
}
