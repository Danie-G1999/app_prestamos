# Frontend - App Préstamos

Este es el frontend de la aplicación de gestión de préstamos, desarrollado con Vue.js 3 y Tailwind CSS. La aplicación está dividida en dos partes principales:

## 🌟 Estructura de la Aplicación

### 1. **Landing Page (Público)**
- Página principal con información sobre servicios de préstamos
- Calculadora de préstamos
- Información de contacto
- Completamente responsiva y optimizada para conversión

### 2. **Panel de Administración (Privado)**
- Sistema de autenticación con login/logout
- Dashboard con estadísticas en tiempo real
- Gestión completa de préstamos
- Gestión de clientes
- Reportes y análisis
- Interfaz administrativa moderna y funcional

## 🚀 Instalación y Uso

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run serve

# Construir para producción
npm run build
```

## 📁 Estructura del Proyecto

```
src/
├── assets/              # Archivos estáticos (CSS, imágenes)
├── components/          # Componentes reutilizables
│   ├── admin/          # Componentes del panel admin
│   └── public/         # Componentes públicos
├── middleware/          # Middleware de autenticación
├── router/             # Configuración de rutas
├── store/              # Estado global (Vuex)
├── views/              # Páginas principales
│   ├── admin/          # Vistas del panel administrativo
│   │   ├── AdminLayout.vue
│   │   ├── DashboardView.vue
│   │   ├── PrestamosView.vue
│   │   ├── ClientesView.vue
│   │   └── ReportesView.vue
│   └── public/         # Vistas públicas (Landing Page)
│       ├── LandingView.vue
│       ├── ServiciosView.vue
│       ├── ContactoView.vue
│       └── LoginView.vue
├── App.vue             # Componente raíz
└── main.js            # Punto de entrada
```

## 🔐 Sistema de Autenticación

### Credenciales de Prueba:
- **Email:** admin@prestafacil.com
- **Contraseña:** admin123

### Rutas Protegidas:
- `/admin/*` - Requiere autenticación
- `/login` - Solo accesible sin autenticación

## 🎨 Características del Diseño

### Landing Page:
- **Hero Section** atractivo con call-to-action
- **Características principales** destacadas
- **Tipos de préstamos** con detalles
- **Calculadora de préstamos** interactiva
- **Formulario de contacto** funcional
- **Footer completo** con información de contacto

### Panel de Administración:
- **Dashboard** con métricas clave
- **Sidebar** de navegación fijo
- **Gestión de préstamos** completa (CRUD)
- **Gestión de clientes** con filtros y búsqueda
- **Reportes** con estadísticas y gráficos
- **Sistema de estados** visual para préstamos
- **Responsive design** para todas las pantallas

## 🛠 Tecnologías Utilizadas

- ✅ **Vue.js 3** con Composition API
- ✅ **Tailwind CSS** con clases personalizadas
- ✅ **Vue Router** con guards de autenticación
- ✅ **Vuex** para gestión de estado
- ✅ **Axios** para peticiones HTTP
- ✅ **JWT** para autenticación
- ✅ **Responsive Design** mobile-first

## 🔄 Flujo de la Aplicación

1. **Landing Page** (`/`) - Página principal pública
2. **Servicios** (`/servicios`) - Información detallada de préstamos
3. **Contacto** (`/contacto`) - Formulario de contacto
4. **Login** (`/login`) - Autenticación de administradores
5. **Admin Dashboard** (`/admin`) - Panel principal (protegido)
6. **Gestión** (`/admin/prestamos`, `/admin/clientes`, `/admin/reportes`) - Módulos administrativos

## 🔧 Configuración del Proxy

El proyecto está configurado para hacer proxy de las peticiones API al backend:
- **Frontend:** `http://localhost:8080`
- **Backend API:** `http://localhost:3000`

## 📊 Estado de Desarrollo

### ✅ Completado:
- Estructura completa de rutas
- Sistema de autenticación
- Landing page responsive
- Panel de administración
- Gestión básica de préstamos y clientes
- Dashboard con estadísticas
- Sistema de reportes

### 🔄 En desarrollo:
- Integración con backend real
- Gráficos interactivos (Chart.js)
- Exportación de reportes
- Validaciones avanzadas
- Notificaciones en tiempo real

### 📈 Próximas funcionalidades:
- Calculadora avanzada de préstamos
- Sistema de notificaciones
- Módulo de pagos
- Dashboard de métricas avanzadas
- API de webhooks