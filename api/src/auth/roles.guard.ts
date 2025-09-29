// src/auth/roles.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from './roles.decorator';
import { Role } from '@prisma/client';

// Lo que JwtStrategy.validate() pone en req.user
type AuthUser = { sub: string; email: string; role: Role };

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si NO hay @Roles en el handler/clase, no se exige rol -> permitir
    if (!required || required.length === 0) return true;

    const req = context.switchToHttp().getRequest<Request>();
    const user = req.user as AuthUser | undefined;

    // 401 si no hay usuario (token ausente/ inválido)
    if (!user) throw new UnauthorizedException();

    // 403 si hay usuario pero no cumple el rol requerido
    if (required.includes(user.role)) return true;

    throw new ForbiddenException();
  }
}
