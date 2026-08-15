import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(), // revisa el metodo (ej: login)
      context.getClass(), // revisa el controller entero
    ]);

    if (isPublic) {
      return true;
    }

    // Si no es publico, delega en la estrategia 'jwt' de Passport
    // (JwtStrategy), que ya conocemos.
    return super.canActivate(context);
  }
}