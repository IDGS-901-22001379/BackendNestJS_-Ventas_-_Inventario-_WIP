📦 Programa Integral de Ventas
Este es un proyecto en desarrollo construido con NestJS, Prisma ORM y PostgreSQL.
Actualmente cuenta con conexión estable a la base de datos y autenticación JWT funcional.

El objetivo es convertirlo en una API escalable para la gestión integral de ventas, usuarios, productos y más módulos.

🚀 Tecnologías utilizadas

NestJS — Framework backend modular.

Prisma ORM — ORM para la conexión con PostgreSQL.

PostgreSQL — Base de datos relacional.

Passport + JWT — Autenticación con tokens.

bcrypt — Hasheo de contraseñas.

Docker — Contenedor de base de datos listo.

Swagger — Documentación interactiva.

📂 Estructura del proyecto

ProgramaIntegralVentas/
│── api/                     # Código fuente principal
│   ├── prisma/              # Configuración de Prisma y esquema de DB (schema + migrations)
│   ├── src/                 # Código NestJS
│   │   ├── auth/            # Módulo de autenticación (login, register, JWT, roles)
│   │   ├── users/           # Módulo de usuarios (servicios y DTO)
│   │   ├── products/        # Módulo de productos (CRUD + roles)
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── docker-compose.yml   # PostgreSQL en Docker
│   ├── .env                 # Variables de entorno
│   ├── package.json         # Dependencias y scripts
│   ├── pnpm-lock.yaml       # Lockfile de pnpm
│   └── README.md            # Documentación



⚙️ Instalación y ejecución

Clonar el repositorio
git clone https://github.com/TU_USUARIO/BackendNestJS_-Ventas_-_Inventario-_WIP.git
cd ProgramaIntegralVentas/api

Variables de entorno
Crear .env con al menos:
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/appdb?schema=public
JWT_SECRET=tu-secreto-largo-unico

Instalar dependencias
pnpm install

Levantar PostgreSQL con Docker
docker-compose up -d

Aplicar migraciones de Prisma
pnpm prisma migrate dev

Iniciar la API
pnpm start:dev

Base URL: http://localhost:3000/api

Swagger: http://localhost:3000/docs (usar Authorize con Bearer <token>)

🔑 Autenticación JWT
Endpoints disponibles:

Registro de usuario — POST http://localhost:3000/api/auth/register
Body ejemplo: { "email": "admin@mail.com", "password": "secret123", "name": "Admin" }

Login de usuario — POST http://localhost:3000/api/auth/login
Body ejemplo: { "email": "admin@mail.com", "password": "secret123" }
✅ Devuelve un token JWT y datos básicos del usuario.

Perfil autenticado — GET http://localhost:3000/api/users/me
Header: Authorization: Bearer TOKEN_AQUI

📦 Productos (JWT requerido; acciones de escritura requieren ADMIN)

Listar/filtrar — GET http://localhost:3000/api/products (query opcional: q, active=true|false)

Detalle — GET http://localhost:3000/api/products/:id

Crear — POST http://localhost:3000/api/products (rol ADMIN)

Actualizar — PATCH http://localhost:3000/api/products/:id (rol ADMIN)

Eliminar — DELETE http://localhost:3000/api/products/:id (rol ADMIN)

📌 Estado del proyecto

🔹 Implementado actualmente

Conexión NestJS ↔ Prisma ↔ PostgreSQL.

Autenticación con JWT (register/login).

Roles de usuario (USER/ADMIN) y guards de autorización.

CRUD base de usuarios (servicios) y productos (módulo completo).

Documentación Swagger y prefijo global /api.

🔹 Próximos pasos

Paginación/orden avanzado en productos.

Gestión de inventario (entradas/salidas).

Módulos de ventas y reportes.

Roles/permisos más granulares.

Integración de dashboard analítico.

🤝 Contribución
Proyecto en desarrollo, pensado para crecer por módulos.
