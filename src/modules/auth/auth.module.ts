import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { AppConfig } from 'src/config/configuration';

type JwtSignOptions = NonNullable<JwtModuleOptions['signOptions']>;


@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService): JwtModuleOptions => {
            const jwtConfig = configService.get<AppConfig['jwt']>('jwt');

            if (!jwtConfig) {
                throw new Error('No se encontro la configuracion de JWT');
            }

            return {
                secret: jwtConfig.secret,
                signOptions: {
                expiresIn: jwtConfig.expiresIn as JwtSignOptions['expiresIn'],
                },
            };
        },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}