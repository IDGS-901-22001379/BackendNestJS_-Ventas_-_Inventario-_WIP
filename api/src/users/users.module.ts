import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '../../prisma/prisma.module';
// importa UsersController si lo tienes

@Module({
  imports: [PrismaModule], // <- hace disponible PrismaService
  providers: [UsersService],
  exports: [UsersService], // <- si Auth u otros usan UsersService
  // controllers: [UsersController],
})
export class UsersModule {}
