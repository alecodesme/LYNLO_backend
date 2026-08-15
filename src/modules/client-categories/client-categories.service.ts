import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientCategory } from './entities/client-category.entity';

@Injectable()
export class ClientCategoriesService {
  constructor(
    @InjectRepository(ClientCategory)
    private readonly clientCategoriesRepository: Repository<ClientCategory>,
  ) {}

  async findAll(): Promise<ClientCategory[]> {
    return this.clientCategoriesRepository.find({
      order: { name: 'ASC' },
    });
  }
}