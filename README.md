# Project Next.js 16 + Strapi CMS

Proyecto full-stack moderno que combina Next.js 16 con Strapi 5 como sistema de gestión de contenidos (CMS), implementando autenticación de usuarios y arquitectura escalable.

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Tecnologías](#tecnologías)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Comandos Disponibles](#comandos-disponibles)
- [Configuración](#configuración)
- [Estructura de Directorios](#estructura-de-directorios)
- [Funcionalidades](#funcionalidades)
- [API y Endpoints](#api-y-endpoints)
- [Características Técnicas](#características-técnicas)
- [Variables de Entorno](#variables-de-entorno)
- [Buenas Prácticas](#buenas-prácticas)
- [Troubleshooting](#troubleshooting)

## Descripción General

Este proyecto implementa una aplicación web moderna con separación entre frontend y backend:

- **Frontend**: Next.js 16 con App Router, React 19, TypeScript y Tailwind CSS
- **Backend**: Strapi 5 como headless CMS con SQLite

La aplicación incluye sistema de autenticación, gestión de contenido dinámico, y está optimizada para rendimiento con caching y Server Components.

## Tecnologías

### Frontend

#### Core
- **Next.js 16.0.3** - Framework React con Server Components y App Router
- **React 19.2.0** - Biblioteca UI con últimas características
- **TypeScript 5** - Tipado estático para JavaScript
- **Tailwind CSS 4** - Framework CSS utility-first

#### UI Components
- **Radix UI** - Componentes accesibles sin estilos
  - `@radix-ui/react-label` (2.1.8)
  - `@radix-ui/react-slot` (1.2.4)
- **Lucide React** (0.553.0) - Iconos SVG optimizados
- **class-variance-authority** (0.7.1) - Gestión de variantes de componentes
- **clsx** (2.1.1) - Utilidad para combinar classNames
- **tailwind-merge** (3.4.0) - Merge inteligente de clases Tailwind

#### Utilidades
- **qs** (6.14.0) - Query string parser para URLs complejas
- **zod** (4.1.12) - Validación de schemas TypeScript-first

#### Development
- **ESLint 9** - Linter con configuración Next.js
- **PostCSS** - Procesamiento CSS
- **tw-animate-css** (1.4.0) - Utilidades de animación para Tailwind

### Backend

#### Core
- **Strapi 5.31.0** - Headless CMS moderno
- **Better SQLite3** (12.4.1) - Base de datos embebida
- **TypeScript 5** - Tipado estático
- **Node.js** (>=20.0.0 <=24.x.x)

#### Plugins Strapi
- **@strapi/plugin-users-permissions** (5.31.0) - Sistema de autenticación
- **@strapi/plugin-cloud** (5.31.0) - Integración con Strapi Cloud

#### UI (Admin Panel)
- **React 18** - Biblioteca UI para admin panel
- **React Router DOM 6** - Routing para admin
- **Styled Components 6** - CSS-in-JS para admin panel

## Arquitectura del Proyecto

```
project-next-16-with-strapi/
├── frontend/                 # Aplicación Next.js 16
│   ├── app/                 # App Router de Next.js
│   │   ├── (auth)/         # Grupo de rutas de autenticación
│   │   │   ├── signin/     # Página de inicio de sesión
│   │   │   ├── signup/     # Página de registro
│   │   │   └── layout.tsx  # Layout para rutas de auth
│   │   ├── dashboard/      # Área protegida
│   │   ├── components/     # Componentes de página
│   │   │   ├── hero-section.tsx
│   │   │   ├── sign-in-form.tsx
│   │   │   ├── sign-up-form.tsx
│   │   │   └── form-error.tsx
│   │   ├── globals.css     # Estilos globales
│   │   ├── layout.tsx      # Layout raíz
│   │   └── page.tsx        # Página principal
│   ├── components/         # Componentes reutilizables
│   │   └── ui/            # Componentes UI base (Button, Input, etc.)
│   ├── lib/               # Utilidades y servicios
│   │   ├── strapi.ts      # Cliente API Strapi
│   │   └── utils.ts       # Funciones helper
│   ├── next.config.ts     # Configuración Next.js
│   ├── tsconfig.json      # Configuración TypeScript
│   ├── eslint.config.mjs  # Configuración ESLint
│   ├── postcss.config.mjs # Configuración PostCSS
│   └── package.json       # Dependencias frontend
│
├── backend/                # Aplicación Strapi 5
│   ├── src/
│   │   ├── api/           # Content Types y Controllers
│   │   │   └── home-page/ # Ejemplo: Content Type Home Page
│   │   ├── components/    # Componentes dinámicos Strapi
│   │   ├── admin/         # Customizaciones del admin panel
│   │   ├── extensions/    # Extensiones de plugins
│   │   └── index.ts       # Entry point
│   ├── config/            # Configuraciones Strapi
│   ├── database/          # Archivos de base de datos
│   ├── public/            # Archivos públicos
│   ├── types/             # Tipos TypeScript
│   ├── .env.example       # Variables de entorno ejemplo
│   ├── tsconfig.json      # Configuración TypeScript
│   └── package.json       # Dependencias backend
│
└── README.md              # Este archivo
```

### Arquitectura de Comunicación

```
┌─────────────────┐         ┌──────────────────┐
│   Browser       │         │   Next.js App    │
│                 │◄───────►│   (Frontend)     │
│  - React 19     │  HTTPS  │   Port: 3000     │
│  - Tailwind CSS │         │   - Server Comp. │
└─────────────────┘         │   - API Routes   │
                            └────────┬─────────┘
                                     │
                                     │ REST API
                                     │ (fetch)
                                     │
                            ┌────────▼─────────┐
                            │   Strapi CMS     │
                            │   (Backend)      │
                            │   Port: 1337     │
                            │   - REST API     │
                            │   - GraphQL      │
                            └────────┬─────────┘
                                     │
                                     │
                            ┌────────▼─────────┐
                            │   SQLite DB      │
                            │   (.tmp/data.db) │
                            └──────────────────┘
```

## Requisitos Previos

- **Node.js**: 20.0.0 o superior (hasta 24.x.x)
- **npm**: 6.0.0 o superior (o pnpm/yarn equivalente)
- **Git**: Para clonar el repositorio

## Instalación

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd project-next-16-with-strapi
```

### 2. Instalación del Backend (Strapi)

```bash
cd backend
npm install
```

Crear archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Editar `.env` y configurar las variables necesarias (ver sección Variables de Entorno).

### 3. Instalación del Frontend (Next.js)

```bash
cd ../frontend
npm install
```

Crear archivo `.env.local`:

```bash
# .env.local
STRAPI_BASE_URL=http://localhost:1337
```

### 4. Iniciar el Backend

```bash
cd backend
npm run dev
```

El admin panel de Strapi estará disponible en: `http://localhost:1337/admin`

En el primer inicio, crear un usuario administrador.

### 5. Iniciar el Frontend

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en: `http://localhost:3000`

## Comandos Disponibles

### Frontend (Next.js)

```bash
npm run dev      # Inicia servidor de desarrollo (port 3000)
npm run build    # Construye aplicación para producción
npm run start    # Inicia servidor de producción
npm run lint     # Ejecuta ESLint
```

### Backend (Strapi)

```bash
npm run dev        # Inicia Strapi en modo desarrollo (port 1337)
npm run develop    # Alias de dev
npm run build      # Construye admin panel
npm run start      # Inicia Strapi en producción
npm run strapi     # CLI de Strapi
npm console        # Consola interactiva de Strapi
npm run upgrade    # Actualiza Strapi a última versión
npm run upgrade:dry # Verifica actualizaciones sin instalar
```

## Configuración

### Next.js Config (next.config.ts)

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,  // Habilita cache de componentes
};

export default nextConfig;
```

### TypeScript Config (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "react-jsx",
    "module": "esnext",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./*"]  // Path alias para imports limpios
    },
    "strict": true
  }
}
```

### Tailwind CSS

El proyecto usa Tailwind CSS 4 con configuración automática vía PostCSS.

Personalización en `globals.css`:
- Variables CSS para temas
- Configuración de fuentes (Geist Sans y Geist Mono)
- Estilos base de Tailwind

## Estructura de Directorios

### Frontend - App Router

#### Grupos de Rutas
- `(auth)/` - Rutas de autenticación (no afecta URL)
  - `/signin` - Inicio de sesión
  - `/signup` - Registro
- `/dashboard` - Área protegida del usuario

#### Componentes
- `app/components/` - Componentes específicos de páginas
- `components/ui/` - Componentes UI reutilizables (button, input, label)

#### Servicios y Utilidades
- `lib/strapi.ts` - Cliente API para comunicación con Strapi
- `lib/utils.ts` - Funciones helper (cn, etc.)

### Backend - Strapi

#### Content Types
- `src/api/home-page/` - Ejemplo de Content Type para home page
  - `content-types/` - Definición de schema
  - `controllers/` - Lógica de negocio
  - `routes/` - Definición de rutas
  - `services/` - Servicios para operaciones

#### Componentes Dinámicos
- `src/components/` - Componentes reutilizables en Content Types
  - Ejemplo: hero-section, call-to-action, etc.

## Funcionalidades

### 1. Autenticación de Usuarios

**Registro de Usuarios** (`/signup`)
- Formulario con validación client-side
- Integración con Strapi Users & Permissions plugin
- Manejo de errores y feedback visual

**Inicio de Sesión** (`/signin`)
- Autenticación JWT
- Persistencia de sesión
- Redirección a dashboard tras login exitoso

**Implementación:**
```typescript
// lib/strapi.ts
export async function registerUserService(userData: object) {
  const res = await fetch(`${STRAPI_BASE_URL}/api/auth/local/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return await res.json();
}

export async function loginUserService(userData: object) {
  const res = await fetch(`${STRAPI_BASE_URL}/api/auth/local`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return await res.json();
}
```

### 2. Gestión de Contenido Dinámico

**Home Page con Content desde Strapi**
- Fetch de datos con Server Components
- Caching de 60 segundos para optimización
- Queries complejas con populate

**Implementación:**
```typescript
// lib/strapi.ts
export async function getHomePage() {
  'use cache'
  cacheLife({expire: 60}); // cache for 60 seconds

  const query = qs.stringify(QUERY_HOME_PAGE);
  const response = await getStrapiData(`home-page?${query}`);
  return response?.data;
}
```

### 3. Hero Section Dinámica

Componente que renderiza contenido desde Strapi:
- Imágenes con alternativeText
- Textos y títulos editables
- Links dinámicos
- Responsive design

### 4. Dashboard Protegido

Área que requiere autenticación para acceder.

### 5. Sistema de Componentes UI

Biblioteca de componentes reutilizables basada en Radix UI:
- **Button**: Múltiples variantes (default, outline, ghost, etc.)
- **Input**: Inputs accesibles con estados
- **Label**: Labels semánticos
- Totalmente tipados con TypeScript
- Accesibles (ARIA compliant)

## API y Endpoints

### Endpoints de Autenticación (Strapi)

#### Registro de Usuario
```http
POST /api/auth/local/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response 200:
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

#### Inicio de Sesión
```http
POST /api/auth/local
Content-Type: application/json

{
  "identifier": "john@example.com",
  "password": "SecurePass123"
}

Response 200:
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

### Endpoints de Contenido

#### Obtener Home Page
```http
GET /api/home-page?populate[sections][on][layout.hero-section][populate][image][fields][0]=url&populate[sections][on][layout.hero-section][populate][image][fields][1]=alternativeText&populate[sections][on][layout.hero-section][populate][link][populate]=true

Response 200:
{
  "data": {
    "id": 1,
    "title": "Welcome",
    "description": "Home page description",
    "sections": [ ... ]
  }
}
```

### Query Building con qs

El proyecto usa `qs` para construir queries complejas:

```typescript
const QUERY_HOME_PAGE = {
  populate: {
    sections: {
      on: {
        "layout.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            link: {
              populate: true,
            },
          },
        },
      },
    },
  },
};

const query = qs.stringify(QUERY_HOME_PAGE);
// Genera: ?populate[sections][on][layout.hero-section]...
```

## Características Técnicas

### Next.js 16 Features

#### 1. Server Components por Defecto
Todos los componentes son Server Components a menos que se especifique `"use client"`.

**Beneficios:**
- Cero JavaScript en cliente por defecto
- Fetch directo en componentes
- SEO mejorado

#### 2. App Router
Routing basado en sistema de archivos con layouts anidados.

#### 3. Caching con `'use cache'`
```typescript
export async function getHomePage() {
  'use cache'
  cacheLife({expire: 60});
  // Cachea resultado por 60 segundos
}
```

#### 4. Suspense para Loading States
```typescript
<Suspense fallback={<HomeContentSkeleton />}>
  <HomeContent />
</Suspense>
```

#### 5. Metadata API
```typescript
export async function generateMetadata() {
  const strapiData = await getHomePage();
  return {
    title: strapiData.title,
    description: strapiData.description,
  };
}
```

### React 19 Features

- **Actions**: Manejo simplificado de formularios
- **use() hook**: Para unwrap promises y context
- **Optimistic Updates**: UI optimista sin bibliotecas extra

### TypeScript

- **Strict mode**: Tipado estricto habilitado
- **Path aliases**: `@/*` para imports limpios
- **Type safety**: Full coverage en componentes y servicios

### Tailwind CSS 4

#### Utilidades Destacadas
- **Container queries**: Responsive basado en contenedor
- **Custom animations**: vía tw-animate-css
- **Dark mode**: Soporte incluido

#### Sistema de Diseño
```css
/* globals.css */
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  /* ... más variables */
}
```

### Patrones de Diseño

#### 1. Component Composition con Radix UI
```typescript
<Button variant="outline" size="lg" asChild>
  <a href="/dashboard">Go to Dashboard</a>
</Button>
```

#### 2. Variants con CVA
```typescript
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "bg-primary",
        outline: "border bg-background",
      },
    },
  }
)
```

#### 3. Error Handling
```typescript
try {
  const data = await getStrapiData(endpoint);
  return data;
} catch (error) {
  console.error("Error fetching data:", error);
  return null;
}
```

## Variables de Entorno

### Frontend (.env.local)

```bash
# URL base del backend Strapi
STRAPI_BASE_URL=http://localhost:1337
```

### Backend (.env)

```bash
# Host y puerto de Strapi
HOST=0.0.0.0
PORT=1337

# Claves de seguridad (CAMBIAR EN PRODUCCIÓN)
APP_KEYS="key1,key2"
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret
ENCRYPTION_KEY=your-encryption-key

# Base de datos (SQLite por defecto)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

**Generar secrets seguros:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Buenas Prácticas

### 1. Seguridad

- Nunca commitear archivos `.env`
- Usar HTTPS en producción
- Validar inputs en cliente y servidor
- Implementar rate limiting en producción
- Mantener dependencias actualizadas

### 2. Performance

- Aprovechar Server Components para reducir bundle size
- Implementar Suspense para loading states
- Usar caching estratégico (60s para contenido semi-estático)
- Lazy loading de componentes pesados
- Optimizar imágenes con Next.js Image

### 3. Code Quality

- Seguir guías de ESLint configuradas
- Usar TypeScript estricto
- Componentizar código reutilizable
- Documentar funciones complejas
- Escribir tests (pendiente: Jest/Testing Library)

### 4. Git Workflow

```bash
# Estructura de commits
feat: add user authentication
fix: resolve login redirect issue
refactor: improve strapi data fetching
docs: update README with API endpoints
```

### 5. Estructura de Componentes

```
components/
├── ui/              # Componentes base reutilizables
│   ├── button.tsx
│   ├── input.tsx
│   └── label.tsx
└── features/        # Componentes de funcionalidades
    ├── auth/
    └── home/
```

## Troubleshooting

### Error: Cannot connect to Strapi

**Problema:** Frontend no puede comunicarse con backend.

**Solución:**
1. Verificar que Strapi esté corriendo: `http://localhost:1337`
2. Verificar variable `STRAPI_BASE_URL` en frontend
3. Revisar CORS en Strapi (`config/middlewares.ts`)

### Error: SQLite database locked

**Problema:** Base de datos SQLite bloqueada.

**Solución:**
```bash
cd backend
rm -rf .tmp/data.db
npm run dev
```

### Error: Module not found '@/...'

**Problema:** Path alias no reconocido.

**Solución:**
1. Verificar `tsconfig.json` tiene `"@/*": ["./*"]`
2. Reiniciar servidor de desarrollo
3. Reiniciar TypeScript server en IDE

### Error: Build fails with type errors

**Problema:** Errores de tipo en build.

**Solución:**
```bash
# Limpiar cache de Next.js
rm -rf .next

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Build de nuevo
npm run build
```

### Strapi Admin Panel no carga

**Problema:** Panel admin muestra página en blanco.

**Solución:**
```bash
cd backend
rm -rf .cache build
npm run build
npm run dev
```

### Performance lenta en desarrollo

**Problema:** Servidor de desarrollo lento.

**Solución:**
1. Aumentar cache time en `getHomePage()`
2. Reducir auto-refresh en browser DevTools
3. Usar `--turbo` en Next.js: `npm run dev -- --turbo`

## Roadmap

Funcionalidades planeadas:

- [ ] Testing (Jest + React Testing Library)
- [ ] CI/CD con GitHub Actions
- [ ] Docker Compose para dev environment
- [ ] Migracion a PostgreSQL en producción
- [ ] Implementar GraphQL en Strapi
- [ ] Dark mode toggle
- [ ] Internationalization (i18n)
- [ ] PWA capabilities
- [ ] Analytics integration
- [ ] SEO optimization avanzado

## Contribución

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'feat: add amazing feature'`)
4. Push a branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## Licencia

Este proyecto es privado y no tiene licencia pública.

## Contacto

Para preguntas o soporte, contactar al equipo de desarrollo.

---

**Desarrollado con Next.js 16, React 19, Strapi 5 y TypeScript**
