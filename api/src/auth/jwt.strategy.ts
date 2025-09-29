// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Role } from '@prisma/client';

export type JwtPayload = {
  sub: string; // user id
  email: string;
  role: Role; // 'ADMIN' | 'USER'
};

type AuthUser = { sub: string; email: string; role: Role }; // lo que quedará en req.user

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
    });
  }

  // Lo que retornes aquí estará en req.user
  validate(payload: JwtPayload): AuthUser {
    // ⚠️ Deja este log solo mientras depuras
    console.log('JWT payload validate():', payload);
    return { sub: payload.sub, email: payload.email, role: payload.role };
  }
}
