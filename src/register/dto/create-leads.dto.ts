import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class leadsDto {
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
}
