import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateClientRequestDto } from './dto/create-client-request.dto';
import { UpdateClientRequestDto } from './dto/update-client-request.dto';
import { ClientResponseDto } from './dto/client-response.dto';
import { Client } from './entities/client.entity';
import { ClientsService } from './client.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import * as authenticatedUserInterface from '../../common/interfaces/authenticated-user.interface';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @CurrentUser() user: authenticatedUserInterface.AuthenticatedUser,
    @Body() dto: CreateClientRequestDto,
  ): Promise<ClientResponseDto> {
    const client = await this.clientsService.create(user.id, dto);
    return this.toResponseDto(client);
  }

  @Get()
  async findAll(
    @CurrentUser() user: authenticatedUserInterface.AuthenticatedUser,
  ): Promise<ClientResponseDto[]> {
    const clients = await this.clientsService.findAllByOwner(user.id);
    return clients.map((client) => this.toResponseDto(client));
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: authenticatedUserInterface.AuthenticatedUser,
  ): Promise<ClientResponseDto> {
    const client = await this.clientsService.findOneByOwner(id, user.id);
    return this.toResponseDto(client);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: authenticatedUserInterface.AuthenticatedUser,
    @Body() dto: UpdateClientRequestDto,
  ): Promise<ClientResponseDto> {
    const client = await this.clientsService.update(id, user.id, dto);
    return this.toResponseDto(client);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: authenticatedUserInterface.AuthenticatedUser,
  ): Promise<void> {
    await this.clientsService.remove(id, user.id);
  }

  private toResponseDto(client: Client): ClientResponseDto {
    return new ClientResponseDto({
      id: client.id,
      name: client.name,
      referenceName: client.referenceName,
      address: client.address,
      email: client.email,
      category: client.category,
      phones: client.phones,
      createdAt: client.createdAt,
    });
  }
}