import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ClientCategoryResponseDto {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  constructor(partial: Partial<ClientCategoryResponseDto>) {
    Object.assign(this, partial);
  }
}