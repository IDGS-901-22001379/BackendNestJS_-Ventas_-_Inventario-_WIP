import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client'; // <-- Tipos generados por Prisma

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  findAll(params?: { q?: string; active?: boolean }): Promise<Product[]> {
    const { q, active } = params || {};
    return this.prisma.product.findMany({
      where: {
        AND: [
          active === undefined ? {} : { active },
          !q
            ? {}
            : {
                OR: [
                  { name: { contains: q, mode: 'insensitive' } },
                  { sku: { contains: q, mode: 'insensitive' } },
                ],
              },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<Product> {
    const item = await this.prisma.product.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Product not found');
    return item;
  }

  async update(id: string, data: UpdateProductDto): Promise<Product> {
    await this.findOne(id); // valida existencia
    return this.prisma.product.update({ where: { id }, data });
  }

  async remove(id: string): Promise<Product> {
    await this.findOne(id); // valida existencia
    return this.prisma.product.delete({ where: { id } });
  }
}
