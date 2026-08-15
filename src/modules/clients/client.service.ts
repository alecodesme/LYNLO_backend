import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { ClientPhone } from './entities/client-phone.entity';
import { CreateClientRequestDto } from './dto/create-client-request.dto';
import { UpdateClientRequestDto } from './dto/update-client-request.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
  ) {}

  async create(ownerId: string, dto: CreateClientRequestDto): Promise<Client> {
    const newClient = this.clientsRepository.create({
      userId: ownerId,
      categoryId: dto.categoryId,
      name: dto.name,
      referenceName: dto.referenceName ?? null,
      address: dto.address ?? null,
      email: dto.email ?? null,
      phones: dto.phones.map((phone) => {
        const clientPhone = new ClientPhone();
        clientPhone.type = phone.type;
        clientPhone.number = phone.number;
        clientPhone.isPrimary = phone.isPrimary ?? false;
        return clientPhone;
      }),
    });

    return this.clientsRepository.save(newClient);
  }

  async findAllByOwner(ownerId: string): Promise<Client[]> {
    return this.clientsRepository.find({
      where: { userId: ownerId },
      relations: { category: true, phones: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOneByOwner(id: string, ownerId: string): Promise<Client> {
    const client = await this.clientsRepository.findOne({
      where: { id, userId: ownerId },
      relations: { category: true, phones: true },
    });

    if (!client) {
      throw new NotFoundException('Cliente no encontrado');
    }

    return client;
  }

  async update(
    id: string,
    ownerId: string,
    dto: UpdateClientRequestDto,
  ): Promise<Client> {
    const client = await this.findOneByOwner(id, ownerId);

    Object.assign(client, {
      categoryId: dto.categoryId ?? client.categoryId,
      name: dto.name ?? client.name,
      referenceName: dto.referenceName ?? client.referenceName,
      address: dto.address ?? client.address,
      email: dto.email ?? client.email,
    });

    if (dto.phones) {
      client.phones = dto.phones.map((phone) => {
        const clientPhone = new ClientPhone();
        clientPhone.type = phone.type;
        clientPhone.number = phone.number;
        clientPhone.isPrimary = phone.isPrimary ?? false;
        return clientPhone;
      });
    }

    return this.clientsRepository.save(client);
  }

  async remove(id: string, ownerId: string): Promise<void> {
    const client = await this.findOneByOwner(id, ownerId);
    await this.clientsRepository.remove(client);
  }
}