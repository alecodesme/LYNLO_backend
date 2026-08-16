import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ClientPhone } from './entities/client-phone.entity';
import { ClientsController } from './client.controller';
import { ClientsService } from './client.service';

@Module({
  imports: [TypeOrmModule.forFeature([Client, ClientPhone])],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}