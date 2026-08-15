import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { ClientPhoneRequestDto } from './client-phone-request.dto';

export class CreateClientRequestDto {
  @IsUUID('4', { message: 'La categoria del cliente no es un id valido' })
  categoryId!: string;

  @IsString({ message: 'El nombre del cliente debe ser un texto' })
  @MaxLength(200, { message: 'El nombre no puede superar los 200 caracteres' })
  name!: string;

  @IsOptional()
  @IsString({ message: 'El nombre de referencia debe ser un texto' })
  @MaxLength(150, { message: 'El nombre de referencia no puede superar los 150 caracteres' })
  referenceName?: string;

  @IsOptional()
  @IsString({ message: 'La direccion debe ser un texto' })
  @MaxLength(250, { message: 'La direccion no puede superar los 250 caracteres' })
  address?: string;

  @IsOptional()
  @IsEmail({}, { message: 'El correo del cliente no tiene un formato valido' })
  email?: string;

  @IsArray({ message: 'phones debe ser un arreglo de telefonos' })
  @ArrayMinSize(1, { message: 'Debes registrar al menos un telefono' })
  @ValidateNested({ each: true })
  @Type(() => ClientPhoneRequestDto)
  phones!: ClientPhoneRequestDto[];
}