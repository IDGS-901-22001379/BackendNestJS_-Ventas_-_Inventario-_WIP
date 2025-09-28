// src/prisma/seed.ts
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const email = 'admin@mail.com';

  const admin = await prisma.user.findUnique({ where: { email } });
  if (!admin) {
    await prisma.user.create({
      data: {
        email,
        name: 'Admin',
        role: Role.ADMIN,
        password: await bcrypt.hash('secret123', 10),
      },
    });
  }

  const count: number = await prisma.product.count();
  if (count === 0) {
    await prisma.product.createMany({
      data: [
        { sku: 'SKU-001', name: 'Producto A', price: 99.9, stock: 10 },
        { sku: 'SKU-002', name: 'Producto B', price: 149.5, stock: 5 },
      ],
      skipDuplicates: true,
    });
  }

  console.log('Seed ok');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    // Evita el warning del linter: no retornes la Promise aquí
    void prisma.$disconnect();
  });
