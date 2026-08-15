import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('client_categories')
export class ClientCategory {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name!: string;
}