import { Exclude, Expose, Type } from 'class-transformer';
import { ClientPhoneType } from '../entities/client-phone.entity';

@Exclude()
class ClientPhoneResponseDto {
  @Expose()
  id!: string;

  @Expose()
  type!: ClientPhoneType;

  @Expose()
  number!: string;

  @Expose()
  isPrimary!: boolean;
}

@Exclude()
class ClientCategoryResponseDto {
  @Expose()
  id!: string;

  @Expose()
  name!: string;
}

@Exclude()
export class ClientResponseDto {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  referenceName!: string | null;

  @Expose()
  address!: string | null;

  @Expose()
  email!: string | null;

  @Expose()
  @Type(() => ClientCategoryResponseDto)
  category!: ClientCategoryResponseDto;

  @Expose()
  @Type(() => ClientPhoneResponseDto)
  phones!: ClientPhoneResponseDto[];

  @Expose()
  createdAt!: Date;

  constructor(partial: Partial<ClientResponseDto>) {
    Object.assign(this, partial);
  }
}