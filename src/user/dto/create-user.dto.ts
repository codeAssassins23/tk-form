import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from 'src/roles/entities/role.entity';

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;

  @IsNotEmpty({ message: 'El apellido es requerido' })
  @IsString()
  @MinLength(2, { message: 'El apellido debe tener al menos 2 caracteres' })
  surname: string;

  @IsNotEmpty({ message: 'El correo electrónico es requerido' })
  @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
  email: string;

  @IsInt()
  age: number;

  @IsString()
  @IsEnum(['m', 'f', 'u'], { message: 'El género debe ser m, f o u' })
  gender: string;

  @IsNotEmpty()
  /* @Matches(passwordRegEx, {
    message: `La contraseña debe tener al menos 8 caracteres, 
    una letra mayúscula, una minúscula, 
    un número y un caracter especial`,
  }) */
  password: string;

  status: `1`;

  readonly role: Role;
}
