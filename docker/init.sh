#!/bin/bash

echo "🐳 Iniciando configuración de Laravel en Docker..."

# Copiar archivo de entorno
cp .env.docker .env

# Generar clave de aplicación
php artisan key:generate --force

# Ejecutar migraciones
php artisan migrate --force

# Limpiar y optimizar cache
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "✅ Configuración completada!"