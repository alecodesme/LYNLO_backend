import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { RegisterRequestDto } from "./dto/register-request.dto";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { JwtPayload } from "./strategies/jwt.strategy";
import { User } from "../users/entities/user.entity";
import { UserResponseDto } from "../users/dto/user-response.dto";
import { LoginRequestDto } from "./dto/login-request.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async register(dto: RegisterRequestDto) : Promise<AuthResponseDto>{
        const newUser = await this.userService.createUser({
            name: dto.name,
            email: dto.email,
            plainTextPassword: dto.password
        })

        return this.buildAuthResponse(newUser)
    }

    async login(dto: LoginRequestDto): Promise<AuthResponseDto> {
      const user = await this.userService.findByEmail(dto.email);

      if (!user) {
        throw new UnauthorizedException('Email o contraseña incorrectos');
      }

      const passwordIsValid = await this.userService.validatePassword(
        dto.password,
        user.passwordHash,
      );

      if (!passwordIsValid) {
        throw new UnauthorizedException('Email o contraseña incorrectos');
      }

      return this.buildAuthResponse(user);
    }

    private buildAuthResponse(user: User): AuthResponseDto {
      const payload: JwtPayload = { sub: user.id, email: user.email };
      const accessToken = this.jwtService.sign(payload);

      return new AuthResponseDto({
        accessToken,
        user: new UserResponseDto({
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        }),
    });
  }
}