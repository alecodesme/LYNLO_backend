import { Exclude, Expose, Type } from 'class-transformer';
import { UserResponseDto } from '../../users/dto/user-response.dto';

/**
 * Lo que devuelve la API tras un login o registro exitoso: el token
 * que el cliente debe guardar y mandar en cada request, mas los datos
 * basicos del usuario (sin passwordHash, gracias a UserResponseDto).
 */
@Exclude()
export class AuthResponseDto {
  @Expose()
  accessToken!: string;

  @Expose()
  @Type(() => UserResponseDto)
  user!: UserResponseDto;

  constructor(partial: Partial<AuthResponseDto>) {
    Object.assign(this, partial);
  }
}