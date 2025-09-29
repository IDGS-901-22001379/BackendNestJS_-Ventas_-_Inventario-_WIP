import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// Tipo "seguro" sin el campo password
export type SafeUser = Omit<User, 'password'>;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /* -----------------------------
     Helpers
  ------------------------------*/
  private toSafe(user: User): SafeUser {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safe } = user;
    return safe;
  }

  /* -----------------------------
     Create
  ------------------------------*/
  async create(dto: CreateUserDto): Promise<SafeUser> {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: passwordHash,
          name: dto.name ?? null,
          // role: dto.role ?? undefined, // si tu DTO trae role y lo quieres permitir
        },
      });
      return this.toSafe(user);
    } catch (err) {
      // Manejo de email único
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        throw new ConflictException('El correo ya está registrado');
      }
      throw err;
    }
  }

  /* -----------------------------
     Read
  ------------------------------*/
  async findByEmail(email: string): Promise<User | null> {
    // Para autenticación puede ser útil regresar el user completo (incl. password)
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<SafeUser> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return this.toSafe(user);
  }

  async findAll(): Promise<SafeUser[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return users.map((u) => this.toSafe(u));
  }

  /* -----------------------------
     Update (opcionales, si los necesitas)
  ------------------------------*/
  async updateName(id: string, name: string | null): Promise<SafeUser> {
    await this.ensureExists(id);
    const user = await this.prisma.user.update({
      where: { id },
      data: { name },
    });
    return this.toSafe(user);
  }

  async updatePassword(id: string, newPassword: string): Promise<void> {
    await this.ensureExists(id);
    const hash = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { id },
      data: { password: hash },
    });
  }

  /* -----------------------------
     Delete (opcional)
  ------------------------------*/
  async remove(id: string): Promise<SafeUser> {
    await this.ensureExists(id);
    const user = await this.prisma.user.delete({ where: { id } });
    return this.toSafe(user);
  }

  /* -----------------------------
     Utilidad interna
  ------------------------------*/
  private async ensureExists(id: string): Promise<void> {
    const exists = await this.prisma.user.findUnique({ where: { id }, select: { id: true } });
    if (!exists) throw new NotFoundException('User not found');
  }

  /* -----------------------------
     Ayuda para auth (opcional)
  ------------------------------*/
  async checkPassword(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
