# Sistema de Gestión de Notas

<div align="center">
  <img src="public/DWISHU2HOME.png" alt="Sistema de Gestión de Notas" width="550">
</div>

Una aplicación web moderna para la gestión de notas desarrollada con Laravel y React, containerizada con Docker para un despliegue fácil y escalable.

## Características

- **Frontend Moderno**: Interfaz de usuario construida con React 18 y Tailwind CSS
- **Backend Robusto**: API REST desarrollada con Laravel 11
- **Base de Datos**: MySQL 8.0 para almacenamiento persistente
- **Containerización**: Completamente dockerizada para desarrollo y producción
- **Gestión de Estado**: Inertia.js para una experiencia SPA sin complejidad
- **Animaciones**: Implementación de motion para transiciones fluidas

### Backend
- **Laravel 11**: Framework PHP para el backend
- **MySQL 8.0**: Base de datos relacional
- **PHP 8.2**: Lenguaje de programación

### Frontend
- **React 18**: Biblioteca de JavaScript para la interfaz
- **Inertia.js**: Adaptador para crear SPAs con Laravel
- **Tailwind CSS**: Framework de CSS utilitario
- **Vite**: Herramienta de construcción y desarrollo
- **Motion**: Biblioteca de animaciones

### DevOps
- **Docker**: Containerización de la aplicación
- **Docker Compose**: Orquestación de servicios
- **Apache**: Servidor web

## Instalación y Configuración

### 1. Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd laravel-notas
```

### 2. Configurar Variables de Entorno
```bash
cp .env.example .env
```

### 3. Levantar los Servicios con Docker
```bash
docker-compose up -d
```

### 4. Acceder a la Aplicación
- **Aplicación Principal**: http://localhost:8080
- **phpMyAdmin**: http://localhost:8081
- **Base de Datos**: localhost:3307

## Servicios Docker

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| `app` | 8080 | Aplicación Laravel con React |
| `db` | 3307 | Base de datos MySQL |
| `phpmyadmin` | 8081 | Interfaz web para MySQL |

## Estructura del Proyecto

```
laravel-notas/
├── app/                    # Lógica de la aplicación Laravel
├── resources/             # Vistas React y assets
├── database/              # Migraciones y seeders
├── docker/                # Configuraciones Docker
├── public/                # Assets públicos
├── storage/               # Archivos de almacenamiento
├── docker-compose.yml     # Configuración de servicios
├── Dockerfile            # Imagen de la aplicación
└── package.json          # Dependencias de Node.js
```

## Comandos Útiles

### Desarrollo
```bash
# Levantar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f app

# Ejecutar comandos Artisan
docker-compose exec app php artisan migrate

# Instalar dependencias
docker-compose exec app composer install
docker-compose exec app npm install
```

### Producción
```bash
# Construir para producción
docker-compose -f docker-compose.yml up -d --build
```

## Base de Datos

### Credenciales por Defecto
- **Base de Datos**: `laravel_notas`
- **Usuario**: `laravel`
- **Contraseña**: `secret123`
- **Root Password**: `rootsecret123`

### Migraciones
```bash
docker-compose exec app php artisan migrate
```

## Frontend

El frontend está construido con React y utiliza:
- **Tailwind CSS** para estilos
- **Headless UI** para componentes accesibles
- **Motion** para animaciones
- **Vite** para desarrollo rápido

### Comandos de Desarrollo Frontend
```bash
# Modo desarrollo
npm run dev

# Construir para producción
npm run build
```

## Seguridad

- Variables de entorno para configuración sensible
- Validación de datos en backend y frontend
- Sanitización de entradas de usuario
- Configuración segura de Docker

## Troubleshooting

### Problemas Comunes

**Error: "Class not found"**
```bash
docker-compose exec app composer install
docker-compose exec app php artisan key:generate
```

**Assets no se actualizan**
```bash
docker-compose exec app npm run build
# o para desarrollo
npm run dev
```

**Base de datos no conecta**
```bash
docker-compose down
docker-compose up -d
docker-compose exec app php artisan migrate
```

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

