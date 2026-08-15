import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppConfig } from './configuration';


export const buildDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const database = configService.get<AppConfig['database']>('database');
  const environment = configService.get<string>('environment');

  if (!database) {
    throw new Error('No se encontro la configuracion de base de datos');
  }

  return {
    type: 'postgres',
    host: database.host,
    port: database.port,
    username: database.username,
    password: database.password,
    database: database.databaseName,
    autoLoadEntities: true,
    synchronize: environment !== 'production',
    logging: environment === 'development' ? ['error', 'warn'] : false,
  };
};