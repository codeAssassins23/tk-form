import { Exclude } from 'class-transformer';
import {
    IsNotEmpty,
    IsString,
    MinLength,
} from 'class-validator';


export class CreateRoleDto {
    @IsString()
    @MinLength(2, {message: 'El nombre debe tener al menos 2 caracteres'})
    @IsNotEmpty({message: 'El nombre es requerido'})
    name: string;

    @IsNotEmpty({message: 'La descripción es requerida'})
    @IsString()
    @MinLength(4, {message: 'La descripción debe tener al menos 2 caracteres'})
    description: string;

    @Exclude()
    status: `1`;
}
