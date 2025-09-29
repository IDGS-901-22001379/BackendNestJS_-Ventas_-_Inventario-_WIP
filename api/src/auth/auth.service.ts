// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

type SafeUser = Omit<User, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
  ) {}

  /* Helper para ocultar el password */
  private toSafe(user: User): SafeUser {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safe } = user;
    return safe;
  }

  /* ============ Registro ============ */
  // Crea el usuario (UsersService ya hace el hash) y regresa token + usuario seguro
  async register(data: { email: string; password: string; name?: string }) {
    const safe = await this.usersService.create(data); // SafeUser (sin password)
    const payload = { sub: safe.id, email: safe.email, role: safe.role };
    const access_token = await this.jwt.signAsync(payload);
    return { access_token, user: safe };
  }

  /* ============ Validación credenciales ============ */
  async validateUser(email: string, password: string): Promise<User> {
    // Aquí necesitamos el user con password para comparar hash
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    return user; // completo (con password) para uso interno
  }

  /* ============ Login ============ */
  async login(email: string, password: string) {
    const user = await this.validateUser(email, password); // User con password
    const payload = { sub: user.id, email: user.email, role: user.role };
    const access_token = await this.jwt.signAsync(payload);
    return {
      access_token,
      user: this.toSafe(user), // SafeUser
    };
  }
}
