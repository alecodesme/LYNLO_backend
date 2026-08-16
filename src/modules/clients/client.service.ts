import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { ClientPhone } from './entities/client-phone.entity';
import { CreateClientRequestDto } from './dto/create-client-request.dto';
import { UpdateClientRequestDto } from './dto/update-client-request.dto';
import { ClientPhoneRequestDto } from './dto/client-phone-request.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
    @InjectRepository(ClientPhone)
    private readonly clientPhonesRepository: Repository<ClientPhone>,
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
    // Confirma existencia y pertenencia antes de tocar nada.
    await this.findOneByOwner(id, ownerId);

    console.log('DTO recibido en update:', dto);

    const updateResult = await this.clientsRepository.update(
      { id, userId: ownerId },
      {
        categoryId: dto.categoryId,
        name: dto.name,
        referenceName: dto.referenceName,
        address: dto.address,
        email: dto.email,
      },
    );

    console.log('Filas afectadas por el update:', updateResult.affected);

    if (dto.phones) {
      await this.replacePhones(id, dto.phones);
    }

    return this.findOneByOwner(id, ownerId);
  }

  private async replacePhones(
    clientId: string,
    phones: ClientPhoneRequestDto[],
  ): Promise<void> {
    await this.clientPhonesRepository.delete({ clientId });

    const newPhones = phones.map((phone) =>
      this.clientPhonesRepository.create({
        clientId,
        type: phone.type,
        number: phone.number,
        isPrimary: phone.isPrimary ?? false,
      }),
    );

    await this.clientPhonesRepository.save(newPhones);
  }

  async remove(id: string, ownerId: string): Promise<void> {
    const client = await this.findOneByOwner(id, ownerId);
    await this.clientsRepository.remove(client);
  }
}