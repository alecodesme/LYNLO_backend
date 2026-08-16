import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from './config/configuration';
import { buildDatabaseConfig } from './config/database.config';
import { DatabaseModule } from './database/database.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClientCategoriesModule } from './modules/client-categories/client-categories.module';
import { ClientsModule } from './modules/clients/client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: buildDatabaseConfig,
    }),

    DatabaseModule,
    UsersModule,
    AuthModule,
    ClientCategoriesModule,
    ClientsModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}