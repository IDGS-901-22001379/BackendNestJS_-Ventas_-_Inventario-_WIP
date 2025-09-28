import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

type ListParams = { q?: string; page: number; limit: number };
type ListResult<T> = { items: T[]; total: number; page: number; limit: number; pages: number };

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async list({ q, page, limit }: ListParams): Promise<ListResult<any>> {
    const where: Prisma.ProductWhereInput = q
      ? {
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { sku:  { contains: q, mode: 'insensitive' } },
          ],
        }
      : {};

    const [items, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.count({ where }),
    ]);

    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  }

  create(data: CreateProductDto) {
    return this.prisma.product.create({ data });
  }

  async findById(id: string) {
    const found = await this.prisma.product.findUnique({ where: { id } });
    if (!found) throw new NotFoundException('Product not found');
    return found;
  }

  async update(id: string, data: UpdateProductDto) {
    await this.findById(id);
    return this.prisma.product.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.product.delete({ where: { id } });
  }
}
