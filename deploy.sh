#!/bin/bash

# Script de despliegue para servidor
echo "🚀 Iniciando despliegue del proyecto GPS-Pasivo..."

# Parar contenedores existentes
echo "🛑 Parando contenedores existentes..."
docker-compose down

# Limpiar imágenes antiguas (opcional)
echo "🧹 Limpiando imágenes antiguas..."
docker system prune -f

# Construir y levantar contenedores
echo "🔨 Construyendo y levantando contenedores..."
docker-compose up --build -d

# Mostrar logs
echo "📋 Mostrando logs..."
docker-compose logs -f --tail=50
