import { Controller, Get } from '@nestjs/common';
import { ClientCategoriesService } from './client-categories.service';
import { ClientCategoryResponseDto } from './dto/client-category-response.dto';

@Controller('client-categories')
export class ClientCategoriesController {
  constructor(
    private readonly clientCategoriesService: ClientCategoriesService,
  ) {}

  @Get()
  async findAll(): Promise<ClientCategoryResponseDto[]> {
    const categories = await this.clientCategoriesService.findAll();

    return categories.map(
      (category) =>
        new ClientCategoryResponseDto({
          id: category.id,
          name: category.name,
        }),
    );
  }
}