import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientCategoriesService } from './client-categories.service';
import { ClientCategoriesController } from './client-categories.controller';
import { ClientCategory } from './entities/client-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientCategory])],
  controllers: [ClientCategoriesController],
  providers: [ClientCategoriesService],
  exports: [ClientCategoriesService],
})
export class ClientCategoriesModule {}