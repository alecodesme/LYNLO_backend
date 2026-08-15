import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseHealthService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DatabaseHealthService.name);

  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.verifyDatabaseConnection();
  }

  private async verifyDatabaseConnection(): Promise<void> {
    if (!this.dataSource.isInitialized) {
      this.logger.error('La conexion a la base de datos no se inicializo');
      throw new Error('No fue posible inicializar la conexion a la base de datos');
    }

    try {
      await this.dataSource.query('SELECT 1');

      const { host, port, database } = this.dataSource.options as {
        host: string;
        port: number;
        database: string;
      };

      this.logger.log(
        `Conexion a PostgreSQL establecida correctamente -> ${host}:${port}/${database}`,
      );
    } catch (error) {
      this.logger.error('La base de datos no respondio a la consulta de verificacion', error);
      throw error;
    }
  }
}