import { IsBoolean, IsEnum, IsOptional, IsString, Matches } from 'class-validator';
import { ClientPhoneType } from '../entities/client-phone.entity';

export class ClientPhoneRequestDto {
  @IsEnum(ClientPhoneType, {
    message: 'El tipo de telefono debe ser: fijo, movil o whatsapp',
  })
  type!: ClientPhoneType;

  @IsString({ message: 'El numero de telefono debe ser un texto' })
  @Matches(/^[0-9+\-\s()]{6,20}$/, {
    message: 'El numero de telefono tiene un formato invalido',
  })
  number!: string;

  @IsOptional()
  @IsBoolean({ message: 'isPrimary debe ser verdadero o falso' })
  isPrimary?: boolean;
}