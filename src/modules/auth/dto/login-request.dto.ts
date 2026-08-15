import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @IsEmail({}, { message: 'El email no tiene un formato valido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email!: string;

  @IsString({ message: 'La contraseña debe ser un texto' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password!: string;
}