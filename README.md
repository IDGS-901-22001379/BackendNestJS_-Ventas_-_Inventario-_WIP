# 📦 Programa Integral de Ventas

Este es un proyecto en desarrollo construido con **NestJS**, **Prisma ORM** y **PostgreSQL**.  
Actualmente se encuentra en la fase inicial, con conexión establecida a la base de datos y un sistema de **autenticación con JWT** funcional.  

El objetivo es convertirlo en una **API escalable** para la gestión integral de ventas, usuarios y otros módulos.

---

## 🚀 Tecnologías utilizadas

- [NestJS](https://nestjs.com/) — Framework backend modular.
- [Prisma ORM](https://www.prisma.io/) — ORM para la conexión con PostgreSQL.
- [PostgreSQL](https://www.postgresql.org/) — Base de datos relacional.
- [Passport + JWT](https://docs.nestjs.com/security/authentication) — Autenticación con tokens.
- [bcrypt](https://www.npmjs.com/package/bcrypt) — Hasheo de contraseñas.
- [Docker](https://www.docker.com/) — Configuración lista para contenedor de base de datos.

---

## 📂 Estructura del proyecto

ProgramaIntegralVentas/
│── api/ # Código fuente principal
│ ├── prisma/ # Configuración de Prisma y esquema de DB
│ ├── src/ # Código NestJS
│ │ ├── auth/ # Módulo de autenticación (login, register, JWT)
│ │ ├── users/ # Módulo de usuarios (CRUD)
│ │ └── app.module.ts
│ └── .env # Variables de entorno
│── docker-compose.yml # Configuración de PostgreSQL en Docker
│── package.json # Dependencias y scripts
│── pnpm-lock.yaml # Lockfile de pnpm
│── README.md # Documentación

yaml
Copiar código

---

## ⚙️ Instalación y ejecución

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/TU_USUARIO/ProgramaIntegralVentas.git
   cd ProgramaIntegralVentas/api
Instalar dependencias

bash
Copiar código
pnpm install
Levantar PostgreSQL con Docker

bash
Copiar código
docker-compose up -d
Aplicar migraciones de Prisma

bash
Copiar código
pnpm prisma migrate dev
Iniciar la API

bash
Copiar código
pnpm start:dev
🔑 Autenticación JWT
Actualmente ya están disponibles los siguientes endpoints:

Registro de usuario
POST http://localhost:3000/auth/register

Body ejemplo:

json
Copiar código
{
  "email": "admin@mail.com",
  "password": "secret123",
  "name": "Admin"
}
Login de usuario
POST http://localhost:3000/auth/login

Body ejemplo:

json
Copiar código
{
  "email": "admin@mail.com",
  "password": "secret123"
}
✅ Devuelve un token JWT.

Perfil de usuario autenticado
GET http://localhost:3000/users/me

Header:

makefile
Copiar código
Authorization: Bearer TOKEN_AQUI
📌 Estado del proyecto
🔹 Actualmente implementado:

Conexión NestJS ↔ Prisma ↔ PostgreSQL.

Autenticación con JWT (register/login).

CRUD básico de usuarios.

🔹 Próximos pasos:

Gestión de productos e inventario.

Módulos de ventas y reportes.

Roles y permisos avanzados.

Integración de dashboard analítico.

🤝 Contribución
Este proyecto sigue en desarrollo y está pensado para ser escalable.
