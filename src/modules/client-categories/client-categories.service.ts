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

  /**
   * Devuelve todas las categorias de cliente disponibles, ordenadas
   * alfabeticamente. Lo usa el frontend para poblar un selector/dropdown
   * al crear o editar un cliente.
   */
  async findAll(): Promise<ClientCategory[]> {
    return this.clientCategoriesRepository.find({
      order: { name: 'ASC' },
    });
  }
}