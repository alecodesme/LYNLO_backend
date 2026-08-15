import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ClientCategory } from '../../client-categories/entities/client-category.entity';
import { ClientPhone } from './client-phone.entity';

@Entity('clients')
export class Client {

    // Db fields

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 200 })
    name!: string;

    @Column({ type: 'varchar', length: 150, name: 'reference_name', nullable: true })
    referenceName!: string | null;

    @Column({ type: 'varchar', length: 250, nullable: true })
    address!: string | null;

    @Column({ type: 'varchar', length: 150, nullable: true })
    email!: string | null;

    // Relations
    @Column({ type: 'uuid', name: 'user_id' })
    userId!: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column({ type: 'uuid', name: 'category_id' })
    categoryId!: string;

    @ManyToOne(() => ClientCategory)
    @JoinColumn({ name: 'category_id' })
    category!: ClientCategory;

    @OneToMany(() => ClientPhone, (phone) => phone.client, {
        cascade: true, 
    })
    phones!: ClientPhone[]

    // timestamps
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt!: Date;
}