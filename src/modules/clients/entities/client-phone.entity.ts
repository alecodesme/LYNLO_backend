import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from './client.entity';

export enum ClientPhoneType {
  FIJO = 'fijo',
  MOVIL = 'movil',
  WHATSAPP = 'whatsapp',
}

@Entity('client_phones')
export class ClientPhone {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'client_id' })
  clientId!: string;

  @ManyToOne(() => Client, (client) => client.phones, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'client_id' })
  client!: Client;

  @Column({ type: 'enum', enum: ClientPhoneType })
  type!: ClientPhoneType;

  @Column({ type: 'varchar', length: 30 })
  number!: string;

  @Column({ type: 'boolean', name: 'is_primary', default: false })
  isPrimary!: boolean;
}