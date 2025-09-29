# API de Gestión de Préstamos

Backend de la aplicación de gestión de préstamos desarrollado con Node.js, Express.js y Knex.js.

## Características

- 🚀 Node.js + Express.js
- 🗄️ PostgreSQL con Knex.js
- 🔐 Autenticación JWT
- ✅ Validación con express-validator
- 🛡️ Seguridad con helmet y cors
- 📊 Logging con morgan
- 🏗️ Arquitectura MVC limpia

## Configuración

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
```bash
cp .env.example .env
# Editar .env con tu configuración
```

### 3. Configurar base de datos PostgreSQL
Asegúrate de tener PostgreSQL instalado y crea la base de datos:
```sql
CREATE DATABASE app_prestamos;
```

### 4. Ejecutar migraciones
```bash
npm run migrate
```

### 5. Ejecutar seeds (opcional)
```bash
npm run seed
```

### 6. Iniciar el servidor
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## Scripts disponibles

- `npm start` - Iniciar servidor en producción
- `npm run dev` - Iniciar servidor en desarrollo con nodemon
- `npm run migrate` - Ejecutar migraciones
- `npm run migrate:rollback` - Deshacer última migración
- `npm run seed` - Ejecutar seeds
- `npm test` - Ejecutar tests

## Estructura del proyecto

```
src/
├── config/           # Configuración de la aplicación
├── controllers/      # Controladores de la aplicación
├── middleware/       # Middlewares customizados
├── models/          # Modelos de base de datos
├── routes/          # Definición de rutas
├── app.js          # Configuración de Express
└── server.js       # Punto de entrada
migrations/         # Migraciones de base de datos
seeds/             # Seeds de base de datos
```

## API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/refresh` - Refrescar token

### Clientes
- `GET /api/clientes` - Listar clientes
- `POST /api/clientes` - Crear cliente
- `GET /api/clientes/:id` - Obtener cliente
- `PUT /api/clientes/:id` - Actualizar cliente
- `DELETE /api/clientes/:id` - Eliminar cliente

### Préstamos
- `GET /api/prestamos` - Listar préstamos
- `POST /api/prestamos` - Crear préstamo
- `GET /api/prestamos/:id` - Obtener préstamo
- `PUT /api/prestamos/:id` - Actualizar préstamo
- `DELETE /api/prestamos/:id` - Eliminar préstamo

## Configuración de entorno

Variables requeridas en `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=app_prestamos
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:8080
```